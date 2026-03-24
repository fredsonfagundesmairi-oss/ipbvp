import React, { useEffect, useState } from 'react';

function App() {
  const [dados, setDados] = useState<any>(null);
  const [mesAtual, setMesAtual] = useState("");

  useEffect(() => {
    // Descobre o mês atual (ex: "02", "03")
    const hoje = new Date();
    const m = String(hoje.getMonth() + 1).padStart(2, '0');
    setMesAtual(m);

    // Busca os dados do arquivo JSON
    fetch('./dados.json')
      .then(res => res.json())
      .then(data => setDados(data));
  }, []);

  if (!dados) return <div className="p-10 text-center text-blue-900 font-bold">Carregando portal da IPVP...</div>;

  const infoMes = dados.programacao_anual[mesAtual];
  const listaNiver = dados.aniversariantes.filter((n: any) => n.data.endsWith(`/${mesAtual}`));

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Cabeçalho dinâmico */}
      <header className="bg-blue-900 text-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold uppercase">{dados.igreja}</h1>
        <p className="mt-2 opacity-80">{dados.pastor}</p>
        <div className="mt-6 bg-blue-800 p-4 rounded-lg inline-block max-w-2xl">
          <h2 className="text-xl font-semibold text-yellow-400">TEMA DE {infoMes?.mes.toUpperCase()}:</h2>
          <p className="text-lg italic mt-1">"{infoMes?.tema}"</p>
          <p className="mt-2 text-sm font-bold text-yellow-200">{infoMes?.versiculo}</p>
        </div>
      </header>

      {/* NOVO: Atalho Rápido para Tesouraria */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <a 
          href="https://script.google.com/macros/s/AKfycbxltiBSW-TkOr3pmPwANW_g4Futtu_MqIX2nwk3lYr6-Ak2Ic5QmGnPTR5AV3F74aR7/exec"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-green-900 hover:bg-green-800 text-white p-5 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] border-2 border-green-700"
        >
          <span className="text-3xl">📟</span>
          <span className="text-xl font-bold uppercase tracking-wider">Tesouraria</span>
        </a>
      </div>

      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        
        {/* Seção Agenda */}
        <section className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600">
          <h3 className="text-2xl font-bold mb-4 flex items-center">📅 Agenda de {infoMes?.mes}</h3>
          <ul className="space-y-4">
            {infoMes?.eventos.map((ev: any, i: number) => (
              <li key={i} className="flex gap-4 border-b pb-2 last:border-0">
                <span className="bg-blue-100 text-blue-800 font-bold p-2 rounded min-w-[60px] text-center h-fit">{ev.dia}</span>
                <span className="text-gray-700 pt-1">{ev.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Seção Aniversariantes */}
        <section className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
          <h3 className="text-2xl font-bold mb-4 flex items-center">🎂 Aniversariantes do Mês</h3>
          {listaNiver.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {listaNiver.map((n: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <span className="font-medium">{n.nome}</span>
                  <span className="text-yellow-700 font-bold">{n.data.split('/')[0]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhum aniversariante registrado para este mês.</p>
          )}
        </section>

      </main>

      <footer className="mt-12 p-8 bg-gray-200 text-center text-sm text-gray-600 border-t border-gray-300">
        <p>© 2026 IPVP - Portal desenvolvido pelo Pastor Fredson Fagundes Cerqueira (ADS Mackenzie)</p>
      </footer>
    </div>
  );
}

export default App;