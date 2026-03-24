import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Youtube,
  Heart,
  Users,
  BookOpen,
  Music,
  Star,
  Cake,
  ShieldCheck,
  ExternalLink,
  Quote,
  Plus,
  HandHelping,
  Copy,
  Check,
  Smartphone,
  Library,
  Search,
  ArrowUp,
  Edit,
  Trash2,
  PlusCircle,
  Save,
  Upload
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  LEADERSHIP, 
  REGULAR_SCHEDULE, 
  BIRTHDAYS, 
  ANNUAL_AGENDA
} from './constants';

// --- Helper Functions ---

const getMonthName = (monthIndex) => {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return months[monthIndex];
};

const isBirthdayInCurrentWeek = (month, day) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const bdayDate = new Date(currentYear, month, day);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return bdayDate >= startOfWeek && bdayDate <= endOfWeek;
};

const isEventInCurrentWeek = (eventString) => {
  const match = eventString.match(/^(\d{2})\/(\d{2})/);
  if (!match) return false;
  
  const day = parseInt(match[1]);
  const month = parseInt(match[2]) - 1;
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const eventDate = new Date(currentYear, month, day);
  
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return eventDate >= startOfWeek && eventDate <= endOfWeek;
};

const CrossIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2v20M8 8h8" />
  </svg>
);

// --- Components ---

const Navbar = ({ onAdminClick, isAdmin, onLogout }: { onAdminClick: () => void, isAdmin: boolean, onLogout: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INÍCIO', href: '#home' },
    { name: 'Agenda', href: '#monthly-agenda' },
    { name: 'Avisos', href: '#monthly-announcements' },
    { name: 'Liderança', href: '#leadership' },
    { name: 'Dízimos', href: '#giving' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-church-blue rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <CrossIcon size={28} />
          </div>
          <div className="flex flex-col">
            <span className={cn("font-serif text-xl leading-none transition-colors", isScrolled ? "text-church-blue" : "text-white")}>Igreja Presbiteriana</span>
            <span className={cn("text-[10px] uppercase tracking-[0.3em] font-bold transition-colors", isScrolled ? "text-church-gold" : "text-church-gold")}>Várzea do Poço</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all hover:text-church-gold relative group",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-church-gold transition-all group-hover:w-full" />
            </a>
          ))}
          
          {isAdmin ? (
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-md flex items-center gap-2"
            >
              Sair Admin
            </button>
          ) : (
            <button 
              onClick={onAdminClick}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all hover:text-church-gold relative group",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              Administrador
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-church-gold transition-all group-hover:w-full" />
            </button>
          )}

          <a href="#contact" className="px-6 py-2.5 bg-church-red text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-church-red/90 transition-all shadow-md">
            Visite-nos
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn("xl:hidden p-2 rounded-lg transition-colors", isScrolled ? "text-church-blue" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 xl:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-serif text-church-blue border-b border-slate-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center bg-church-blue">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-church-blue via-church-blue/80 to-white" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl py-12">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-church-gold font-medium tracking-[0.3em] uppercase text-sm mb-4 block"
        >
          Bem-vindo à
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-[0.9]"
        >
          Igreja Presbiteriana <br />
          <span className="italic">de Várzea do Poço</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Anunciando o Reino de Deus e servindo à comunidade com amor e fidelidade às Escrituras.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#monthly-agenda" className="w-full sm:w-auto px-8 py-4 bg-church-red text-white rounded-full font-semibold hover:bg-church-red/90 transition-all flex items-center justify-center gap-2 shadow-lg">
            AGENDA DO MÊS <ChevronRight size={18} />
          </a>
          <a href="#monthly-birthdays" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all">
            ANIVERSARIANTES DO MÊS
          </a>
          <a href="https://script.google.com/macros/s/AKfycbxltiBSW-TkOr3pmPwANW_g4Futtu_MqIX2nwk3lYr6-Ak2Ic5QmGnPTR5AV3F74aR7/exec" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-church-gold text-white rounded-full font-semibold hover:bg-church-gold/90 transition-all flex items-center justify-center gap-2 shadow-lg">
            TESOURARIA IPVP <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const YouTubeCourse = () => {
  return (
    <section id="youtube-course" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-church-gold/10 text-church-gold font-bold text-[10px] uppercase tracking-widest mb-4"
          >
            <Youtube size={14} /> Treinamento
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl text-church-blue font-serif mb-4"
          >
            Curso: Preparando-se para servir melhor ao Senhor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Assista aos nossos vídeos sobre como fazer liturgias, estudos, visitas e cultos.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-church-beige/50 bg-slate-100 mb-10"
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/yAu3BtPWi4s"
            title="Curso: Preparando-se para servir melhor ao Senhor"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <a 
            href="https://www.youtube.com/@IPBVARZEADOPOCO" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-4 bg-church-red text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-church-red/90 transition-all shadow-xl hover:scale-105"
          >
            <Youtube size={24} /> ACESSE NOSSO CANAL NO YOUTUBE
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const VerseOfTheDay = () => {
  // Highlight April (month index 3) as requested
  const currentMonth = 3;
  const monthData = ANNUAL_AGENDA.find(m => m.month === currentMonth);
  
  const displayVerse = monthData?.verse || "(Sl 119:105) Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.";
  const displayTheme = monthData?.theme || "Versículo do Dia";
  
  // Extract verse text and reference from the string "(Ref) Text" or "Text (Ref)"
  const verseMatch = displayVerse.match(/\(([^)]+)\)\s*(.*)/) || displayVerse.match(/(.*)\s*\(([^)]+)\)/);
  const verseText = verseMatch ? (verseMatch[1].includes('.') || verseMatch[1].includes(':') ? verseMatch[2] : verseMatch[1]) : displayVerse;
  const verseRef = verseMatch ? (verseMatch[1].includes('.') || verseMatch[1].includes(':') ? verseMatch[1] : verseMatch[2]) : "";

  return (
    <section className="py-8 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-church-beige/30 rounded-[2rem] p-6 md:p-10 border border-church-gold/20 shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 text-church-blue group-hover:scale-110 transition-transform duration-700">
            <BookOpen size={150} />
          </div>
          <div className="w-20 h-20 rounded-3xl bg-church-blue text-white flex items-center justify-center shrink-0 shadow-lg relative z-10">
            <BookOpen size={40} />
          </div>
          <div className="relative z-10 text-center md:text-left flex-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-church-gold mb-4">Versículo do Mês</h3>
            <p className="text-2xl md:text-3xl font-serif text-church-blue leading-tight italic mb-4">"{verseText.trim()}"</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">— {verseRef}</p>
          </div>
          <div className="relative z-10">
            <a 
              href="https://www.bible.com/pt/bible/129/1PE.1.16.NVI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-church-blue font-bold text-sm hover:text-church-gold transition-colors group/link"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover/link:bg-church-gold group-hover/link:text-white transition-colors">
                <ExternalLink size={20} />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SpiritualResources = () => (
  <section id="resources" className="py-10 px-6 bg-church-beige">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Crescimento</span>
        <h2 className="text-3xl md:text-4xl text-church-blue font-serif mb-4">Recursos para Crescimento Espiritual</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm">Ferramentas e documentos para auxiliar sua caminhada com Cristo.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="https://www.bible.com/pt/bible/211/JHN.1.NTLH" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-8 bg-white hover:bg-church-blue/5 rounded-[2.5rem] transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl bg-church-blue/5 flex items-center justify-center text-church-blue mb-6 group-hover:scale-110 transition-transform">
            <BookOpen size={28} />
          </div>
          <h5 className="font-serif text-2xl text-church-blue mb-3">Bíblia Online</h5>
          <p className="text-slate-500 mb-6">Acesse a Palavra de Deus em diversas versões e idiomas.</p>
          <div className="mt-auto flex items-center gap-2 text-church-blue font-bold text-xs uppercase tracking-widest">
            Acessar Agora <ExternalLink size={14} />
          </div>
        </a>

        <a href="https://www.bible.com/pt/reading-plans" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-8 bg-white hover:bg-church-blue/5 rounded-[2.5rem] transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl bg-church-blue/5 flex items-center justify-center text-church-blue mb-6 group-hover:scale-110 transition-transform">
            <Calendar size={28} />
          </div>
          <h5 className="font-serif text-2xl text-church-blue mb-3">Planos de Leitura</h5>
          <p className="text-slate-500 mb-6">Organize sua leitura bíblica diária com planos temáticos.</p>
          <div className="mt-auto flex items-center gap-2 text-church-blue font-bold text-xs uppercase tracking-widest">
            Ver Planos <ExternalLink size={14} />
          </div>
        </a>

        <a href="https://ipcuiaba.com.br/noticias/118538/hinario-novo-cantico" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-8 bg-white hover:bg-church-blue/5 rounded-[2.5rem] transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl bg-church-blue/5 flex items-center justify-center text-church-blue mb-6 group-hover:scale-110 transition-transform">
            <Music size={28} />
          </div>
          <h5 className="font-serif text-2xl text-church-blue mb-3">Novo Cântico</h5>
          <p className="text-slate-500 mb-6">Acesse as letras e partituras do nosso hinário oficial.</p>
          <div className="mt-auto flex items-center gap-2 text-church-blue font-bold text-xs uppercase tracking-widest">
            Abrir Hinário <ExternalLink size={14} />
          </div>
        </a>

        <a href="https://drive.google.com/drive/folders/1NlippJmh36vxHQRFnPI8ivxSUfCHPP5D?usp=drive_link" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-8 bg-white hover:bg-church-blue/5 rounded-[2.5rem] transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl bg-church-blue/5 flex items-center justify-center text-church-blue mb-6 group-hover:scale-110 transition-transform">
            <Library size={28} />
          </div>
          <h5 className="font-serif text-2xl text-church-blue mb-3">Estudos Bíblicos</h5>
          <p className="text-slate-500 mb-6">Acesse o material de estudos ministrados em nossa igreja.</p>
          <div className="mt-auto flex items-center gap-2 text-church-blue font-bold text-xs uppercase tracking-widest">
            Ver Material <ExternalLink size={14} />
          </div>
        </a>

        <a href="https://www.monergismo.com/textos/credos/cfw.htm" target="_blank" rel="noopener noreferrer" className="group flex flex-col p-8 bg-white hover:bg-church-blue/5 rounded-[2.5rem] transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl bg-church-blue/5 flex items-center justify-center text-church-blue mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} />
          </div>
          <h5 className="font-serif text-2xl text-church-blue mb-3">Confissão de Fé</h5>
          <p className="text-slate-500 mb-6">Conheça os fundamentos doutrinários de nossa fé reformada.</p>
          <div className="mt-auto flex items-center gap-2 text-church-blue font-bold text-xs uppercase tracking-widest">
            Ler Documento <ExternalLink size={14} />
          </div>
        </a>
      </div>
    </div>
  </section>
);

const MonthlyBirthdays = ({ birthdays, onUpdate, isAdmin }: { birthdays: typeof BIRTHDAYS, onUpdate: (data: typeof BIRTHDAYS) => void, isAdmin: boolean }) => {
  // Highlight April (month index 3) as requested
  const currentMonthIndex = 3;
  const [isEditing, setIsEditing] = useState(false);
  const [editList, setEditList] = useState(birthdays);

  const monthBirthdays = useMemo(() => {
    return birthdays.filter(b => b.month === currentMonthIndex).sort((a, b) => a.day - b.day);
  }, [currentMonthIndex, birthdays]);

  const formatName = (name: string) => {
    const parts = name.split(' ');
    if (parts.length <= 2) return name;
    return `${parts[0]} ${parts[1]}`;
  };

  const handleSave = () => {
    onUpdate(editList);
    setIsEditing(false);
  };

  const addBirthday = () => {
    setEditList([...editList, { month: currentMonthIndex, day: 1, name: "Novo Nome" }]);
  };

  const removeBirthday = (index: number) => {
    const globalIndex = birthdays.findIndex(b => b === monthBirthdays[index]);
    if (globalIndex !== -1) {
      const newList = [...birthdays];
      newList.splice(globalIndex, 1);
      onUpdate(newList);
    }
  };

  return (
    <section id="monthly-birthdays" className="py-10 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => {
                setEditList(birthdays);
                setIsEditing(!isEditing);
              }}
              className="flex items-center gap-2 text-church-gold font-bold text-xs uppercase tracking-widest hover:underline"
            >
              <Edit size={14} /> {isEditing ? 'Cancelar' : 'Editar Aniversariantes'}
            </button>
          </div>
        )}

        {isEditing ? (
          <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-church-gold/20 shadow-xl">
            <h3 className="text-2xl font-serif text-church-blue mb-6">Editar Aniversariantes de {getMonthName(currentMonthIndex)}</h3>
            <div className="space-y-4 mb-8">
              {editList.filter(b => b.month === currentMonthIndex).map((b, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-church-beige/30 p-3 rounded-xl border border-church-gold/10">
                  <input 
                    type="number" 
                    value={b.day} 
                    onChange={(e) => {
                      const newList = [...editList];
                      const itemIndex = editList.findIndex(item => item === b);
                      newList[itemIndex].day = parseInt(e.target.value) || 1;
                      setEditList(newList);
                    }}
                    className="w-14 p-2 rounded-lg border border-church-gold/20 text-center font-bold text-sm"
                    min="1" max="31"
                  />
                  <input 
                    type="text" 
                    value={b.name} 
                    onChange={(e) => {
                      const newList = [...editList];
                      const itemIndex = editList.findIndex(item => item === b);
                      newList[itemIndex].name = e.target.value;
                      setEditList(newList);
                    }}
                    className="flex-1 p-2 rounded-lg border border-church-gold/20 text-sm"
                  />
                  <button 
                    onClick={() => {
                      const newList = [...editList];
                      const itemIndex = editList.findIndex(item => item === b);
                      newList.splice(itemIndex, 1);
                      setEditList(newList);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={addBirthday}
                className="flex items-center gap-2 px-6 py-2 bg-church-blue text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-church-blue/90"
              >
                <PlusCircle size={14} /> Adicionar
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-2 bg-church-gold text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-church-gold/90"
              >
                <Save size={14} /> Salvar
              </button>
            </div>
          </div>
        ) : (
          <>
            {monthBirthdays.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-6 md:p-10 border border-church-gold/20 shadow-xl flex flex-col items-center gap-6 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 text-church-red group-hover:scale-110 transition-transform duration-700">
                  <Cake size={120} />
                </div>
                <div className="w-16 h-16 rounded-full bg-church-red/10 text-church-red flex items-center justify-center shrink-0 shadow-inner relative z-10">
                  <Cake size={32} />
                </div>
                <div className="relative z-10 text-center flex-1 w-full">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-church-gold mb-2">Aniversariantes do Mês</h3>
                  <h2 className="text-2xl md:text-3xl font-serif text-church-blue mb-6">Celebrando a Vida em <span className="italic">{getMonthName(currentMonthIndex)}</span></h2>
                  
                  <div className="flex flex-wrap gap-3 justify-center">
                    {monthBirthdays.map((b, idx) => (
                      <div key={idx} className="px-5 py-2 bg-church-beige rounded-xl border border-church-gold/10 flex items-center gap-2 shadow-sm hover:scale-105 transition-transform">
                        <span className="w-7 h-7 rounded-full bg-church-gold text-white flex items-center justify-center font-bold text-[10px]">{b.day}</span>
                        <span className="text-lg text-church-blue font-serif font-bold">{formatName(b.name)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 pt-2">
                  <a 
                    href="#birthdays" 
                    className="px-8 py-3 bg-church-gold text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-church-gold/90 transition-all shadow-lg inline-block"
                  >
                    Ver Todos do Ano
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-10 bg-white rounded-[2rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-serif italic text-sm">Nenhum aniversariante este mês.</p>
                <a href="#birthdays" className="text-church-gold font-bold text-[10px] uppercase tracking-widest mt-4 inline-block hover:underline">Ver Agenda Completa</a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const MonthlyAgenda = ({ agenda, onUpdate, isAdmin }: { agenda: typeof ANNUAL_AGENDA, onUpdate: (data: typeof ANNUAL_AGENDA) => void, isAdmin: boolean }) => {
  // Highlight April (month index 3) as requested
  const currentMonthIndex = 3;
  const [isEditing, setIsEditing] = useState(false);
  const [editEvents, setEditEvents] = useState<string[]>([]);

  const monthAgenda = useMemo(() => {
    return agenda.find(m => m.month === currentMonthIndex);
  }, [currentMonthIndex, agenda]);

  useEffect(() => {
    if (monthAgenda) {
      setEditEvents(monthAgenda.events);
    }
  }, [monthAgenda]);

  const handleSave = () => {
    const newList = [...agenda];
    const monthIdx = newList.findIndex(m => m.month === currentMonthIndex);
    if (monthIdx !== -1) {
      newList[monthIdx] = { ...newList[monthIdx], events: editEvents };
      onUpdate(newList);
    }
    setIsEditing(false);
  };

  return (
    <section id="monthly-agenda" className="py-8 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-church-gold font-bold text-xs uppercase tracking-widest hover:underline"
            >
              <Edit size={14} /> {isEditing ? 'Cancelar' : 'Editar Agenda'}
            </button>
          </div>
        )}

        {isEditing ? (
          <div className="bg-church-blue rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
            <h3 className="text-3xl font-serif text-church-gold mb-8 uppercase tracking-widest">Editar Agenda de {monthAgenda?.name}</h3>
            <div className="space-y-4 mb-8">
              {editEvents.map((event, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <textarea 
                    value={event} 
                    onChange={(e) => {
                      const newEvents = [...editEvents];
                      newEvents[idx] = e.target.value;
                      setEditEvents(newEvents);
                    }}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-lg"
                    rows={1}
                  />
                  <button 
                    onClick={() => {
                      const newEvents = [...editEvents];
                      newEvents.splice(idx, 1);
                      setEditEvents(newEvents);
                    }}
                    className="text-church-gold hover:text-white"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setEditEvents([...editEvents, "Novo Evento"])}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/30"
              >
                <PlusCircle size={16} /> Adicionar Evento
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-10 py-3 bg-church-gold text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-church-gold/90"
              >
                <Save size={16} /> Salvar Agenda
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-church-blue rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Calendar size={150} />
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-4 text-church-gold">
                  <Calendar size={32} />
                  <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest">Agenda do Mês</h3>
                </div>
                <div className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/10 font-bold text-sm">
                  {monthAgenda?.name}
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {monthAgenda?.events.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-church-gold/20 flex items-center justify-center text-church-gold shrink-0 group-hover:scale-110 transition-transform">
                      <Calendar size={20} />
                    </div>
                    <span className="text-lg font-medium leading-snug">{event}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <a 
                  href="#agenda" 
                  className="inline-flex items-center gap-3 text-church-gold font-bold text-lg hover:underline group"
                >
                  Acessar Agenda do Ano Completa <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const MonthlyAnnouncements = ({ announcements, onUpdate, isAdmin }: { announcements: any[], onUpdate: (data: any[]) => void, isAdmin: boolean }) => {
  // Highlight April (month index 3) as requested
  const currentMonthIndex = 3;
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const monthData = useMemo(() => {
    return announcements.find(m => m.month === currentMonthIndex);
  }, [currentMonthIndex, announcements]);

  useEffect(() => {
    if (monthData) {
      setEditData(JSON.parse(JSON.stringify(monthData)));
    }
  }, [monthData]);

  const handleSave = () => {
    const newList = [...announcements];
    const monthIdx = newList.findIndex(m => m.month === currentMonthIndex);
    if (monthIdx !== -1) {
      newList[monthIdx] = editData;
      onUpdate(newList);
    }
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...editData };
        newData.announcements[idx].image = reader.result as string;
        setEditData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="monthly-announcements" className="py-8 px-6 bg-church-beige/30">
      <div className="max-w-5xl mx-auto">
        {isAdmin && (
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-church-gold font-bold text-xs uppercase tracking-widest hover:underline"
            >
              <Edit size={14} /> {isEditing ? 'Cancelar' : 'Editar Avisos'}
            </button>
          </div>
        )}

        {isEditing && editData ? (
          <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-church-gold/20 shadow-2xl">
            <h3 className="text-2xl font-serif text-church-blue mb-6 uppercase tracking-widest">Editar Avisos de {editData.name}</h3>
            <div className="space-y-6 mb-8">
              {editData.announcements.map((announcement: any, idx: number) => (
                <div key={idx} className="space-y-3 p-4 bg-church-beige/20 rounded-xl border border-church-gold/10">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-church-blue text-sm">Aviso #{idx + 1}</h4>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={announcement.isWeekly} 
                          onChange={(e) => {
                            const newData = { ...editData };
                            newData.announcements[idx].isWeekly = e.target.checked;
                            setEditData(newData);
                          }}
                          className="w-4 h-4 rounded border-church-gold/20 text-church-gold focus:ring-church-gold"
                        />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-church-blue">Evento da Semana</span>
                      </label>
                      <button 
                        onClick={() => {
                          const newData = { ...editData };
                          newData.announcements.splice(idx, 1);
                          setEditData(newData);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <textarea 
                    value={announcement.text} 
                    onChange={(e) => {
                      const newData = { ...editData };
                      newData.announcements[idx].text = e.target.value;
                      setEditData(newData);
                    }}
                    className="w-full p-3 rounded-lg border border-church-gold/20 focus:ring-2 focus:ring-church-gold/50 outline-none text-sm"
                    rows={2}
                    placeholder="Texto do aviso..."
                  />
                  <div className="flex flex-col gap-3">
                    {announcement.image && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-church-gold/20">
                        <img src={announcement.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => {
                            const newData = { ...editData };
                            newData.announcements[idx].image = null;
                            setEditData(newData);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center justify-center gap-2 px-5 py-2 bg-church-blue/10 text-church-blue rounded-lg font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-church-blue/20 transition-all">
                      <Upload size={14} />
                      {announcement.image ? 'Trocar Imagem' : 'Subir Foto/Arte'}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const newData = { ...editData };
                  newData.announcements.push({ text: "", image: null, isWeekly: false });
                  setEditData(newData);
                }}
                className="flex items-center gap-2 px-5 py-2 bg-church-blue text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-church-blue/90"
              >
                <PlusCircle size={14} /> Adicionar
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-2 bg-church-gold text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-church-gold/90"
              >
                <Save size={14} /> Salvar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Weekly Events Section */}
            {monthData?.announcements.some((a: any) => a.isWeekly) && (
              <div>
                <div className="text-center mb-8">
                  <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Destaques</span>
                  <h2 className="text-3xl md:text-4xl text-church-blue font-serif mb-2">Eventos da Semana</h2>
                  <p className="text-slate-500 text-sm">Programação especial de segunda a domingo</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {monthData.announcements.filter((a: any) => a.isWeekly).map((announcement: any, idx: number) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-church-gold/10 group"
                    >
                      {announcement.image && (
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={announcement.image} 
                            alt="Evento" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-church-gold/10 flex items-center justify-center text-church-gold shrink-0">
                            <Star size={20} />
                          </div>
                          <p className="text-slate-700 text-lg font-serif leading-relaxed italic">
                            "{announcement.text}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* General Announcements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 border border-church-gold/20 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-5 text-church-blue">
                <Star size={150} />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                  <div className="flex items-center gap-4 text-church-blue">
                    <Star size={32} className="text-church-gold" />
                    <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest">Avisos da Igreja</h3>
                  </div>
                  <div className="px-5 py-1.5 bg-church-blue/5 rounded-full border border-church-blue/10 font-bold text-church-blue text-xs">
                    {monthData?.name}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {monthData?.announcements.filter((a: any) => !a.isWeekly).length > 0 ? (
                    monthData.announcements.filter((a: any) => !a.isWeekly).map((announcement: any, idx: number) => (
                      <div key={idx} className="bg-church-beige/20 rounded-2xl overflow-hidden border border-church-gold/10 flex flex-col hover:shadow-lg transition-all group">
                        {announcement.image && (
                          <div className="aspect-video w-full overflow-hidden">
                            <img 
                              src={announcement.image} 
                              alt="Aviso" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <p className="text-slate-700 text-base leading-relaxed font-medium">
                            {announcement.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 italic text-slate-400 font-serif text-sm">
                      Nenhum aviso registrado para este mês.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

const Identity = () => (
  <section id="identity" className="py-10 px-6 bg-church-beige/30">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-church-blue flex flex-col items-center justify-center p-8 text-center relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C5A059 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white mb-8 shadow-lg backdrop-blur-sm">
              <ShieldCheck size={48} />
            </div>
            <h3 className="text-3xl font-serif text-white mb-6">Fiel à Palavra, <br /> <span className="italic text-church-gold">Atenta ao Mundo</span></h3>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              "Onde não há visão, o povo perece; mas o que guarda a lei, esse é bem-aventurado." <br />
              <span className="text-church-gold mt-4 block font-serif text-lg">— Provérbios 29:18</span>
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-church-blue rounded-3xl p-8 text-white hidden lg:flex flex-col justify-end shadow-2xl border-4 border-white">
            <span className="text-4xl font-serif font-bold">IPB</span>
            <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] mt-2 font-bold">Fidelidade à Palavra de Deus</p>
          </div>
        </div>
        
        <div>
          <span className="text-church-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Nossa Identidade</span>
          <h2 className="text-4xl md:text-5xl text-church-blue mb-8 leading-tight font-serif">
            Uma Igreja Reformada, <br />
            <span className="italic">Sempre se Reformando</span>
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>
              A Igreja Presbiteriana de Várzea do Poço é uma comunidade cristã federada à Igreja Presbiteriana do Brasil (IPB). Nossa fé está alicerçada nas Escrituras Sagradas e nos símbolos de fé de Westminster.
            </p>
            
            <blockquote className="border-l-4 border-church-gold pl-6 py-4 my-10 bg-white rounded-r-2xl shadow-sm">
              <Quote className="text-church-gold/40 mb-2" size={24} />
              <p className="italic text-church-blue font-serif text-2xl leading-tight">"A glória de Deus deve ser o fim último de todas as nossas ações."</p>
              <footer className="text-sm font-bold text-slate-400 mt-4 uppercase tracking-widest">— João Calvino</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Leadership = ({ data, onUpdate, isAdmin }: { data: typeof LEADERSHIP, onUpdate: (data: any) => void, isAdmin: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<typeof LEADERSHIP>(JSON.parse(JSON.stringify(data)));

  useEffect(() => {
    setEditData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...editData };
        const parts = path.split('.');
        if (parts.length === 1) {
          (newData as any)[parts[0]].image = reader.result;
        } else {
          (newData as any)[parts[0]][parseInt(parts[1])].image = reader.result;
        }
        setEditData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const LeaderCard = ({ leader, role, path, isEditable }: { leader: any, role: string, path: string, isEditable: boolean, key?: any }) => (
    <motion.div 
      whileHover={isEditable ? {} : { y: -2 }}
      className={cn(
        "group bg-white p-3 rounded-xl shadow-sm border border-slate-100 transition-all flex items-center gap-3",
        !isEditable && "hover:border-church-gold/30"
      )}
    >
      <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-church-blue/5 border border-slate-100">
        {leader.image ? (
          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-church-blue/20">
            <Users size={24} />
          </div>
        )}
        {isEditable && (
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <Upload size={14} className="text-white" />
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, path)} />
          </label>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {isEditable ? (
          <div className="space-y-1">
            <input 
              type="text" 
              value={leader.name} 
              onChange={(e) => {
                const newData = { ...editData };
                const parts = path.split('.');
                if (parts.length === 1) (newData as any)[parts[0]].name = e.target.value;
                else (newData as any)[parts[0]][parseInt(parts[1])].name = e.target.value;
                setEditData(newData);
              }}
              className="w-full text-xs font-serif text-church-blue border-b border-slate-100 focus:border-church-gold outline-none bg-transparent"
              placeholder="Nome"
            />
            <input 
              type="text" 
              value={leader.phone} 
              onChange={(e) => {
                const newData = { ...editData };
                const parts = path.split('.');
                if (parts.length === 1) (newData as any)[parts[0]].phone = e.target.value;
                else (newData as any)[parts[0]][parseInt(parts[1])].phone = e.target.value;
                setEditData(newData);
              }}
              className="w-full text-[9px] text-church-gold border-b border-slate-100 focus:border-church-gold outline-none bg-transparent"
              placeholder="Telefone"
            />
          </div>
        ) : (
          <>
            <h4 className="text-sm font-serif text-church-blue mb-0 truncate">{leader.name}</h4>
            <p className="text-[8px] text-slate-400 uppercase tracking-widest mb-1">{role}</p>
            <a 
              href={`https://wa.me/55${leader.phone?.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-church-gold font-bold text-[9px] hover:underline"
            >
              <Phone size={8} /> {leader.phone}
            </a>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="leadership" className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div className="text-left">
            <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Liderança</span>
            <h2 className="text-3xl md:text-4xl text-church-blue font-serif">Conselho e Junta Diaconal</h2>
          </div>
          {isAdmin && (
            <button 
              onClick={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              className="flex items-center gap-2 px-5 py-2 bg-church-blue/5 text-church-blue rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-church-blue hover:text-white transition-all border border-church-blue/10"
            >
              {isEditing ? <><Save size={12} /> Salvar</> : <><Edit size={12} /> Editar</>}
            </button>
          )}
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Pastor */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-church-blue border-b border-church-gold/20 pb-4">
              <ShieldCheck size={24} className="text-church-gold" />
              <h3 className="text-xl font-serif uppercase tracking-widest">Pastor</h3>
            </div>
            <LeaderCard 
              leader={isEditing ? editData.pastor : data.pastor} 
              role="Pastor" 
              path="pastor" 
              isEditable={isEditing} 
            />
          </div>

          {/* Elders */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-church-blue border-b border-church-gold/20 pb-4">
              <Users size={24} className="text-church-gold" />
              <h3 className="text-xl font-serif uppercase tracking-widest">Presbíteros</h3>
            </div>
            <div className="space-y-4">
              {(isEditing ? editData.elders : data.elders).map((elder, i) => (
                <LeaderCard 
                  key={i} 
                  leader={elder} 
                  role="Governo e Disciplina" 
                  path={`elders.${i}`} 
                  isEditable={isEditing} 
                />
              ))}
            </div>
          </div>

          {/* Deacons */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-church-blue border-b border-church-gold/20 pb-4">
              <HandHelping size={24} className="text-church-gold" />
              <h3 className="text-xl font-serif uppercase tracking-widest">Diáconos</h3>
            </div>
            <div className="space-y-4">
              {(isEditing ? editData.deacons : data.deacons).map((deacon, i) => (
                <LeaderCard 
                  key={i} 
                  leader={deacon} 
                  role="Misericórdia" 
                  path={`deacons.${i}`} 
                  isEditable={isEditing} 
                />
              ))}
            </div>
          </div>

          {/* Societies */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-church-blue border-b border-church-gold/20 pb-4">
              <Star size={24} className="text-church-gold" />
              <h3 className="text-xl font-serif uppercase tracking-widest">Sociedades</h3>
            </div>
            <div className="space-y-4">
              {(isEditing ? editData.societies : data.societies).map((society, i) => (
                <LeaderCard 
                  key={i} 
                  leader={society} 
                  role="Presidente" 
                  path={`societies.${i}`} 
                  isEditable={isEditing} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhotoGallery = () => {
  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-church-blue to-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Instagram size={150} />
          </div>
          <div className="relative z-10">
            <span className="text-church-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Nossa Comunhão</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Acompanhe nossa galeria no Instagram</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto">
              Veja fotos de nossos cultos, eventos e momentos de comunhão diretamente em nossa rede social oficial.
            </p>
            <a 
              href="https://www.instagram.com/ipvarzeapoco?igsh=cm80M3lnNHR1bWJ3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-church-blue rounded-full font-bold text-sm uppercase tracking-widest hover:bg-church-gold hover:text-white transition-all shadow-lg"
            >
              <Instagram size={20} /> Seguir no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Schedule = () => {
  return (
    <section id="schedule" className="py-10 bg-church-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-church-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Programação Regular</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Horários de Cultos e Atividades</h2>
        </div>

        <div className="space-y-3">
          {REGULAR_SCHEDULE.map((event, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 10 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-church-gold/20 flex items-center justify-center text-church-gold shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-serif text-white/90">{event.name}</h4>
                  <p className="text-church-gold font-bold text-xs uppercase tracking-widest">{event.day}</p>
                </div>
              </div>
              <div className="text-2xl font-serif text-white/70">{event.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnnualAgenda = ({ agenda }: { agenda: typeof ANNUAL_AGENDA }) => {
  // Default to April (month index 3) as requested
  const [selectedMonth, setSelectedMonth] = useState<number | null>(3);
  
  const currentMonthData = useMemo(() => {
    if (selectedMonth === null) return null;
    return agenda.find(m => m.month === selectedMonth);
  }, [selectedMonth, agenda]);

  return (
    <section id="agenda" className="py-10 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Calendário Oficial 2026</span>
          <h2 className="text-3xl md:text-4xl text-church-blue font-serif mb-4">Agenda do Ano</h2>
          <p className="text-slate-500 font-medium text-xs">CLIQUE NO MÊS PARA SABER A AGENDA DO ANO</p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          {agenda.map((m) => (
            <button
              key={m.month}
              onClick={() => setSelectedMonth(m.month)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                selectedMonth === m.month 
                  ? "bg-church-blue text-white border-church-blue shadow-md" 
                  : "bg-white text-church-blue border-slate-200 hover:border-church-gold"
              )}
            >
              {m.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedMonth !== null && currentMonthData && (
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-church-beige/30 rounded-[2.5rem] p-8 md:p-12 border border-church-gold/10"
            >
              <div className="mb-8 border-b border-church-gold/20 pb-6">
                <h3 className="text-3xl font-serif text-church-blue mb-2">{currentMonthData.name}</h3>
                <p className="text-church-gold font-bold uppercase tracking-widest text-sm mb-4">{currentMonthData.theme}</p>
                <p className="text-slate-600 italic font-serif">"{currentMonthData.verse}"</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentMonthData.events.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <Calendar size={18} className="text-church-gold shrink-0 mt-1" />
                    <span className="text-slate-700 font-medium">{event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Birthdays = ({ birthdays }: { birthdays: typeof BIRTHDAYS }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const filteredBirthdays = useMemo(() => {
    if (!searchTerm && selectedMonth === null) return [];
    
    return birthdays.filter(b => {
      const matchesName = b.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMonth = selectedMonth === null || b.month === selectedMonth;
      return matchesName && matchesMonth;
    }).sort((a, b) => a.month - b.month || a.day - b.day);
  }, [searchTerm, selectedMonth, birthdays]);

  const hasFilter = searchTerm !== '' || selectedMonth !== null;

  return (
    <section id="birthdays" className="py-10 px-6 bg-church-beige/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Comunhão</span>
          <h2 className="text-3xl md:text-4xl text-church-blue font-serif mb-4">Busca de Aniversariantes</h2>
          <p className="text-slate-500 text-sm">Encontre as datas de nascimento de nossos membros e congregados.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl mb-10 border border-church-gold/10 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-church-gold/50 transition-all"
            />
          </div>
          <select 
            value={selectedMonth ?? ''} 
            onChange={(e) => setSelectedMonth(e.target.value === '' ? null : Number(e.target.value))}
            className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-church-gold/50 transition-all font-medium text-slate-600"
          >
            <option value="">Selecione um Mês</option>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>{getMonthName(i)}</option>
            ))}
          </select>
        </div>

        {hasFilter ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBirthdays.map((b, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-church-gold/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-church-beige text-church-gold flex items-center justify-center font-bold text-xs">
                    {b.day}
                  </div>
                  <div>
                    <h4 className="font-serif text-church-blue font-bold">{b.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{getMonthName(b.month)}</p>
                  </div>
                </div>
                <Cake size={16} className="text-church-red opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
            {filteredBirthdays.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-400 italic">
                Nenhum resultado encontrado para sua busca.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-serif italic">Use os campos acima para pesquisar aniversariantes de outros meses.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const Ministries = () => {
  const ministries = [
    { title: 'SAF - Sociedade Auxiliadora Feminina', color: 'bg-church-red' },
    { title: 'UPH - União Presbiteriana de Homens', color: 'bg-church-blue' },
    { title: 'UMP - União de Mocidade Presbiteriana', color: 'bg-slate-800' },
    { title: 'UCP - União de Crianças Presbiterianas', color: 'bg-church-gold' },
  ];

  return (
    <section id="ministries" className="py-10 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Nossos Ministérios</span>
          <h2 className="text-2xl font-serif text-church-blue">Sociedades Internas</h2>
        </div>

        <div className="space-y-3">
          {ministries.map((m, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 10 }}
              className={cn("p-4 rounded-xl text-white font-serif text-lg font-bold shadow-md flex items-center justify-between", m.color)}
            >
              <span>{m.title}</span>
              <Users size={20} className="opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Giving = () => {
  const [copied, setCopied] = useState(false);
  const cnpj = "03.507.028/0001-08";
  const pixKey = "03507028000108";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="giving" className="py-10 px-6 bg-church-beige/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-church-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-church-blue">
            <Heart size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Generosidade</span>
              <h2 className="text-3xl font-serif text-church-blue mb-2">Dízimos e Ofertas</h2>
              <p className="text-slate-500 italic font-serif text-base">"Cada um contribua segundo propôs no seu coração..." (2Co 9:7)</p>
            </div>

            <div className="space-y-8">
              <div className="bg-church-blue text-white p-8 rounded-[2rem] shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-church-gold">
                    <Smartphone size={24} />
                  </div>
                  <h4 className="text-xl font-serif">Chave PIX (CNPJ)</h4>
                </div>
                
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 mb-6 flex items-center justify-between">
                  <span className="text-xl font-mono tracking-wider">{cnpj}</span>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-church-gold"
                    title="Copiar PIX"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                  <p className="flex flex-col"><span className="text-[10px] uppercase opacity-50">Banco</span> <span className="text-white font-bold">SICOOB</span></p>
                  <p className="flex flex-col"><span className="text-[10px] uppercase opacity-50">Agência</span> <span className="text-white font-bold">3289</span></p>
                  <p className="flex flex-col col-span-2"><span className="text-[10px] uppercase opacity-50">Conta Corrente</span> <span className="text-white font-bold">118524</span></p>
                </div>
              </div>

              <div className="p-6 bg-church-gold/5 rounded-2xl border border-church-gold/10">
                <h5 className="font-bold text-church-blue mb-2">Por que contribuir?</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sua fidelidade nos dízimos e ofertas sustenta a pregação do evangelho, a manutenção da igreja e nossas ações de misericórdia.
                </p>
                <div className="flex items-center gap-4 text-church-blue mt-4">
                  <div className="w-10 h-10 rounded-full bg-church-blue/5 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-xs font-medium">Transação segura e identificada em nome da Igreja Presbiteriana de Várzea do Poço.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', subject: 'Dúvida Geral', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*${formData.subject}*%0AOlá! Meu nome é ${formData.name}.%0AContato: ${formData.contact}%0A%0A*Mensagem:* ${formData.message}`;
    window.open(`https://wa.me/5574999829797?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nome Completo</label>
          <input 
            type="text" required placeholder="Seu nome"
            className="w-full px-4 py-3 rounded-xl bg-church-beige/50 border border-slate-100 focus:border-church-blue focus:ring-1 focus:ring-church-blue outline-none transition-all"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Contato</label>
            <input 
              type="text" required placeholder="(74) 00000-0000"
              className="w-full px-4 py-3 rounded-xl bg-church-beige/50 border border-slate-100 focus:border-church-blue focus:ring-1 focus:ring-church-blue outline-none transition-all"
              value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Motivo</label>
            <select 
              className="w-full px-4 py-3 rounded-xl bg-church-beige/50 border border-slate-100 focus:border-church-blue outline-none transition-all"
              value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="Dúvida Geral">Dúvida Geral</option>
              <option value="Quero Visitar">Quero Visitar</option>
              <option value="Pedido de Oração">Pedido de Oração 🙏</option>
              <option value="Aconselhamento">Aconselhamento</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Mensagem</label>
          <textarea 
            required rows={4} placeholder="Como podemos ajudar?"
            className="w-full px-4 py-3 rounded-xl bg-church-beige/50 border border-slate-100 focus:border-church-blue focus:ring-1 focus:ring-church-blue outline-none transition-all resize-none"
            value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        <button type="submit" className="w-full py-4 bg-church-blue text-white rounded-xl font-bold hover:bg-church-blue/90 transition-all flex items-center justify-center gap-2 shadow-lg">
          Enviar via WhatsApp
        </button>
      </form>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-10 px-6 bg-church-beige/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-church-gold font-semibold tracking-widest uppercase text-[10px] mb-2 block">Fale Conosco</span>
          <h2 className="text-3xl md:text-4xl text-church-blue font-serif">Envie uma Mensagem</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-slate-600 mb-8 text-lg">Estamos prontos para ouvir você, orar por suas necessidades e tirar suas dúvidas.</p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] relative bg-church-blue">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C5A059 1px, transparent 0)', backgroundSize: '32px 32px' }} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.1),transparent_70%)]" />
              
              <div className="absolute inset-0 flex items-center justify-center flex-col p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-church-gold/20 flex items-center justify-center text-church-gold mb-6">
                  <MapPin size={40} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-3">Localização</h3>
                <p className="text-white/60 mb-8 max-w-xs">R. Durval Gama, 17, Várzea do Poço - BA. No coração da nossa cidade.</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=R.+Durval+Gama,+17,+Várzea+do+Poço+-+BA,+44715-000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-church-gold text-white rounded-full font-bold hover:bg-church-gold/90 transition-all shadow-lg"
                >
                  Ver no Google Maps
                </a>
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="https://www.instagram.com/ipvarzeapoco?igsh=cm80M3lnNHR1bWJ3" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-church-blue text-white flex items-center justify-center hover:bg-church-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@IPVP" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-church-blue text-white flex items-center justify-center hover:bg-church-gold transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-church-gold rounded-full flex items-center justify-center text-white">
                <CrossIcon size={28} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-tight">IP Várzea do Poço</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Igreja Presbiteriana do Brasil</span>
              </div>
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed">
              Uma igreja comprometida com a pregação fiel da Palavra de Deus e o serviço amoroso à nossa cidade.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#home" className="hover:text-church-gold transition-colors">Início</a></li>
              <li><a href="#identity" className="hover:text-church-gold transition-colors">Identidade</a></li>
              <li><a href="#schedule" className="hover:text-church-gold transition-colors">Programação</a></li>
              <li><a href="#agenda" className="hover:text-church-gold transition-colors">Agenda 2026</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Contato</h4>
            <ul className="space-y-4 text-white/50">
              <li className="flex items-center gap-3">
                <Phone size={16} /> 
                <a href="https://wa.me/5574999829797" target="_blank" rel="noopener noreferrer" className="hover:text-church-gold transition-colors">
                  (74) 99982-9797
                </a>
              </li>
              <li className="flex items-center gap-3">
                <BookOpen size={16} /> 
                <a href="mailto:ipbvpoco@gmail.com" className="hover:text-church-gold transition-colors">
                  ipbvpoco@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3"><MapPin size={16} /> Várzea do Poço, BA</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/30">
          <p>© {new Date().getFullYear()} Igreja Presbiteriana de Várzea do Poço. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

const SpeedDialButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-white text-church-blue rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-100"
            title="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            <a href="https://script.google.com/macros/s/AKfycbxltiBSW-TkOr3pmPwANW_g4Futtu_MqIX2nwk3lYr6-Ak2Ic5QmGnPTR5AV3F74aR7/exec" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 bg-church-blue text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
               title="TESOURARIA IPVP">
              <Library size={20} />
            </a>
            <a href="https://www.instagram.com/ipvarzeapoco?igsh=cm80M3lnNHR1bWJ3" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
               title="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.youtube.com/@IPBVARZEADOPOCO" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
               title="YouTube">
              <Youtube size={20} />
            </a>
            <a href="https://wa.me/5574999829797" target="_blank" rel="noopener noreferrer" 
               className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
               title="WhatsApp">
              <Phone size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-slate-800 text-white rotate-45" : "bg-church-gold text-white hover:bg-church-gold/90"
        )}
      >
        <Plus size={32} />
      </button>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (pass: string) => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2933') {
      onLogin(password);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full shadow-2xl border border-church-gold/20 relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-church-blue">
          <X size={24} />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-church-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-serif text-church-blue mb-2">Acesso Restrito</h3>
          <p className="text-slate-500 text-sm">Digite a senha de administrador para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-full px-6 py-4 rounded-2xl bg-slate-50 border outline-none transition-all text-center text-lg font-bold tracking-widest",
                error ? "border-red-500 ring-4 ring-red-500/10" : "border-slate-200 focus:border-church-blue focus:ring-4 focus:ring-church-blue/10"
              )}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 text-center font-bold">Senha incorreta. Tente novamente.</p>}
          </div>
          <button type="submit" className="w-full py-4 bg-church-blue text-white rounded-2xl font-bold hover:bg-church-blue/90 transition-all shadow-lg uppercase tracking-widest text-sm">
            Entrar no Sistema
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [birthdays, setBirthdays] = useState<any[]>(BIRTHDAYS);
  const [agenda, setAgenda] = useState<any[]>(ANNUAL_AGENDA);
  const [announcements, setAnnouncements] = useState<any[]>(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      month: i,
      name: getMonthName(i),
      announcements: []
    }));
  });
  const [leadershipData, setLeadershipData] = useState<typeof LEADERSHIP>(() => {
    const saved = localStorage.getItem('church_leadership');
    return saved ? JSON.parse(saved) : LEADERSHIP;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Initial load and polling
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        console.log("Server health check:", data);
      } catch (e) {
        console.error("Server health check failed:", e);
      }
    };
    checkHealth();

    const fetchData = async () => {
      try {
        const endpoints = ['birthdays', 'agenda', 'announcements', 'gallery', 'leadership'];
        const results = await Promise.all(
          endpoints.map(async (id) => {
            try {
              const res = await fetch(`/api/data/${id}`);
              if (!res.ok) {
                const text = await res.text();
                console.error(`Fetch failed for ${id}: ${res.status} ${res.statusText}. Body: ${text.substring(0, 100)}`);
                return null;
              }
              return await res.json();
            } catch (e) {
              console.error(`Error processing ${id}:`, e);
              return null;
            }
          })
        );

        const [bData, aData, annData, leadData] = results;

        if (bData) setBirthdays(bData);
        if (aData) setAgenda(aData);
        if (annData) setAnnouncements(annData);
        if (leadData) setLeadershipData(leadData);
      } catch (error) {
        console.error("Global error fetching data:", error);
        // Fallback to localStorage if API fails
        const savedB = localStorage.getItem('church_birthdays');
        const savedA = localStorage.getItem('church_agenda');
        const savedAnn = localStorage.getItem('church_announcements');
        const savedLead = localStorage.getItem('church_leadership');
        if (savedB) setBirthdays(JSON.parse(savedB));
        if (savedA) setAgenda(JSON.parse(savedA));
        if (savedAnn) setAnnouncements(JSON.parse(savedAnn));
        if (savedLead) setLeadershipData(JSON.parse(savedLead));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Sync state to API and localStorage
  const updateBirthdays = async (newData: any[]) => {
    setBirthdays(newData);
    localStorage.setItem('church_birthdays', JSON.stringify(newData));
    try {
      const res = await fetch('/api/data/birthdays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Save birthdays failed: ${res.status}. Body: ${text.substring(0, 100)}`);
      }
    } catch (e) { console.error("Error saving birthdays:", e); }
  };

  const updateAgenda = async (newData: any[]) => {
    setAgenda(newData);
    localStorage.setItem('church_agenda', JSON.stringify(newData));
    try {
      const res = await fetch('/api/data/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Save agenda failed: ${res.status}. Body: ${text.substring(0, 100)}`);
      }
    } catch (e) { console.error("Error saving agenda:", e); }
  };

  const updateAnnouncements = async (newData: any[]) => {
    setAnnouncements(newData);
    localStorage.setItem('church_announcements', JSON.stringify(newData));
    try {
      const res = await fetch('/api/data/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Save announcements failed: ${res.status}. Body: ${text.substring(0, 100)}`);
      }
    } catch (e) { console.error("Error saving announcements:", e); }
  };

  const updateLeadership = async (newData: any) => {
    setLeadershipData(newData);
    localStorage.setItem('church_leadership', JSON.stringify(newData));
    try {
      const res = await fetch('/api/data/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Save leadership failed: ${res.status}. Body: ${text.substring(0, 100)}`);
      }
    } catch (e) { console.error("Error saving leadership:", e); }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-church-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-church-blue font-serif italic">Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-church-gold/30">
      <Navbar 
        onAdminClick={() => setShowLogin(true)} 
        isAdmin={isAdmin} 
        onLogout={() => setIsAdmin(false)} 
      />
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={() => {
          setIsAdmin(true);
          setShowLogin(false);
        }} 
      />

      <main>
        <Hero />
        <YouTubeCourse />
        <VerseOfTheDay />
        <SpiritualResources />
        <MonthlyBirthdays birthdays={birthdays} onUpdate={updateBirthdays} isAdmin={isAdmin} />
        <Birthdays birthdays={birthdays} />
        <MonthlyAgenda agenda={agenda} onUpdate={updateAgenda} isAdmin={isAdmin} />
        <Identity />
        <Schedule />
        <Leadership data={leadershipData} onUpdate={updateLeadership} isAdmin={isAdmin} />
        <Ministries />
        <AnnualAgenda agenda={agenda} />
        <Giving />
        <ContactSection />
      </main>
      <Footer />
      <SpeedDialButton />
    </div>
  );
}