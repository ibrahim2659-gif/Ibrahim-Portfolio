import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Heart, 
  ShieldCheck 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Academic Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-tech font-bold text-white text-base tracking-wide">
              IBRAHIM BHARPET
            </span>
            <span className="text-[10px] font-mono-tech text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/30">
              CLASS OF 2030
            </span>
          </div>
          <p className="text-xs font-mono-tech text-slate-400">
            JOY University • B.Tech Computer Science & Engineering (Artificial Intelligence)
          </p>
          <p className="text-xs font-mono-tech text-[#8B5CF6]">
            "Learn. Build. Innovate."
          </p>
        </div>

        {/* Social Icons & Back To Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ibrahim2659-gif"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-[#00D9FF]/30 transition cursor-pointer"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/ibrahim-bharpet-4b01a7441/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-[#176BFF]/30 transition cursor-pointer"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="mailto:ibrahimbharpet@gmail.com"
            title="Email Ibrahim"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-[#8B5CF6]/30 transition cursor-pointer"
          >
            <Mail size={18} />
          </a>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            title="Return to Top"
            className="p-2.5 rounded-xl bg-[#176BFF]/20 hover:bg-[#176BFF]/40 text-[#00D9FF] border border-[#176BFF]/40 transition cursor-pointer"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>

      {/* Bottom Legal & Tech Directive */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech text-slate-400 gap-2 text-center">
        <div>
          © {new Date().getFullYear()} Ibrahim Bharpet. Designed with 3D WebGL, Three.js & React.
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>PORTFOLIO SYSTEM: ONLINE // REAL-TIME RENDERING</span>
        </div>
      </div>
    </footer>
  );
};
