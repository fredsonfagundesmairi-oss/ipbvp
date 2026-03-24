import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("church.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS church_data (
    id TEXT PRIMARY KEY,
    content TEXT
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.get("/api/data/:id", (req, res) => {
    const { id } = req.params;
    try {
      console.log(`Fetching data for: ${id}`);
      const row = db.prepare("SELECT content FROM church_data WHERE id = ?").get(id) as { content: string } | undefined;
      if (row) {
        res.json(JSON.parse(row.content));
      } else {
        res.json(null);
      }
    } catch (error) {
      console.error(`Error fetching data for ${id}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/data/:id", (req, res) => {
    const { id } = req.params;
    try {
      const content = JSON.stringify(req.body);
      console.log(`Saving data for: ${id}, size: ${content.length} bytes`);
      db.prepare("INSERT OR REPLACE INTO church_data (id, content) VALUES (?, ?)").run(id, content);
      res.json({ success: true });
    } catch (error) {
      console.error(`Error saving data for ${id}:`, error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
