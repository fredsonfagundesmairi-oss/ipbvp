import React, { useEffect, useState, useMemo } from 'react';
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
  Upload,
  Calculator // Adicionado para o botão da tesouraria
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
          {/* BOTÃO TESOURARIA - ATUALIZADO */}
          <a 
            href="https://script.google.com/macros/s/AKfycbxltiBSW-TkOr3pmPwANW_g4Futtu_MqIX2nwk3lYr6-Ak2Ic5QmGnPTR5AV3F74aR7/exec" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto px-8 py-4 bg-[#064e3b] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#065f46] transition-all flex items-center justify-center gap-3 shadow-2xl border border-green-700/50"
          >
            <Calculator size={20} /> TESOURARIA
          </a>

          <a href="#monthly-agenda" className="w-full sm:w-auto px-8 py-4 bg-church-red text-white rounded-full font-semibold hover:bg-church-red/90 transition-all flex items-center justify-center gap-2 shadow-lg">
            AGENDA DO MÊS <ChevronRight size={18} />
          </a>
          <a href="#monthly-birthdays" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all">
            ANIVERSARIANTES
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ... O restante do código continua exatamente como o original que você enviou ...
// [Para economizar espaço, mantenha todo o restante das funções: YouTubeCourse, VerseOfTheDay, etc.]