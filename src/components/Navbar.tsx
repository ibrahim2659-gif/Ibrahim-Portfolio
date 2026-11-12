import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Github, 
  Linkedin,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onOpenResumeModal: () => void;
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleMotion,
  onOpenResumeModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
      <nav
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel-glow bg-[#050505]/85 border-[#176BFF]/30 shadow-[0_10px_35px_-10px_rgba(5,5,5,0.9)]'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Brand Monogram */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#176BFF] via-[#8B5CF6] to-[#00D9FF] p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#080D1B] rounded-[10px] flex items-center justify-center">
              <span className="font-tech font-bold text-xs text-[#00D9FF] tracking-wider">IB</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-tech font-bold text-sm text-white tracking-wide group-hover:text-[#00D9FF] transition-colors">
              IBRAHIM BHARPET
            </span>
            <span className="text-[10px] font-mono-tech text-slate-400">
              AI & SOFTWARE DEV // 2030
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#080D1B]/60 p-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#176BFF] via-[#00D9FF] to-[#8B5CF6] rounded-full shadow-[0_0_8px_#00D9FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Actions & Utility Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick();
            }}
            title={soundEnabled ? 'Mute Interface Audio' : 'Enable Sci-Fi Audio FX'}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-[#176BFF]/20 border-[#176BFF]/60 text-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => {
              onToggleMotion();
              sound.playClick();
            }}
            title={reducedMotion ? 'Enable Full 3D Motion' : 'Reduced Motion Accessibility'}
            className={`p-2 rounded-lg border transition-all cursor-pointer hidden sm:flex ${
              reducedMotion
                ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/60 text-violet-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            aria-label="Toggle Motion"
          >
            {reducedMotion ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/ibrahim2659-gif"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub: ibrahim2659-gif"
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#00D9FF]/40 transition-all cursor-pointer"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href="https://www.linkedin.com/in/ibrahim-bharpet-4b01a7441/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#176BFF]/40 transition-all cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>

          {/* Resume Quick Trigger Button */}
          <button
            onClick={onOpenResumeModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#176BFF] to-[#8B5CF6] text-white text-xs font-mono-tech tracking-wider shadow-[0_0_15px_rgba(23,107,255,0.4)] hover:brightness-110 transition cursor-pointer"
          >
            <FileText size={14} />
            <span>RESUME</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white lg:hidden cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto glass-panel-glow bg-[#050505]/95 rounded-2xl p-4 border border-[#176BFF]/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`p-2.5 rounded-lg text-left text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  activeSection === item.id
                    ? 'bg-[#176BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono-tech text-slate-400">
              IBRAHIM BHARPET // CSE (AI)
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="px-3 py-1.5 rounded bg-[#176BFF] text-white text-xs font-mono-tech flex items-center gap-1.5"
            >
              <FileText size={14} />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
