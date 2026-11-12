import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Sparkles, 
  Cpu, 
  Code, 
  Terminal, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HeroScene3D } from './3d/HeroScene3D';
import { sound } from '../utils/audio';

interface HeroProps {
  reducedMotion: boolean;
  onExploreWork: () => void;
  onDownloadResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  reducedMotion,
  onExploreWork,
  onDownloadResume,
}) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic ambient energy glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#176BFF]/15 via-[#8B5CF6]/15 to-[#00D9FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Futuristic Typography & Action Directives (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Cyber Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#080D1B]/80 border border-[#00D9FF]/30 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(0,217,255,0.3)]">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
              <span className="text-xs font-mono-tech tracking-wider text-slate-200">
                AI & SOFTWARE DEVELOPER // <span className="text-[#00D9FF] font-semibold">CLASS OF 2030</span>
              </span>
            </div>

            {/* Name with 3D Holographic Gradient & Clean Readability */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-tech font-extrabold tracking-tight text-white leading-none">
                IBRAHIM{' '}
                <span className="bg-gradient-to-r from-[#00D9FF] via-[#176BFF] to-[#8B5CF6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(23,107,255,0.4)]">
                  BHARPET
                </span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="text-lg sm:text-2xl font-tech font-medium text-slate-200">
                  Aspiring AI & Software Developer
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#176BFF]/15 border border-[#176BFF]/40 text-[#00D9FF] text-xs font-mono-tech">
                  JOY UNIVERSITY
                </span>
              </div>
            </div>

            {/* Cinematic Taglines */}
            <div className="space-y-2 max-w-xl">
              <blockquote className="text-xl sm:text-2xl font-tech text-white/90 italic border-l-2 border-[#176BFF] pl-4 py-0.5">
                "Turning Ideas Into Intelligent Solutions."
              </blockquote>
              <p className="text-sm sm:text-base text-slate-400 font-mono-tech pl-4 flex items-center gap-2">
                <span className="text-[#8B5CF6] font-semibold">TAGLINE:</span>
                <span className="text-slate-200">"Learn. Build. Innovate."</span>
              </p>
            </div>

            {/* Concise Mission / Bio Preview */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              First-year B.Tech Computer Science and Engineering (Artificial Intelligence) student 
              exploring modern Python programming, local AI architectures, and interactive web technologies.
              Trained through academic rigor and NxtWave.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              {/* Explore My Work Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onExploreWork();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#176BFF] via-[#2563EB] to-[#8B5CF6] text-white font-tech font-semibold text-sm tracking-wide shadow-[0_0_25px_rgba(23,107,255,0.45)] hover:shadow-[0_0_35px_rgba(0,217,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explore My Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Download My Resume Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onDownloadResume();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel-glow text-white font-tech font-medium text-sm tracking-wide hover:border-[#00D9FF] hover:bg-white/5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={16} className="text-[#00D9FF]" />
                <span>Download My Resume</span>
              </button>
            </div>

            {/* Verified Social Icons & Quick Stats */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/ibrahim2659-gif"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/50 text-slate-300 hover:text-white transition group cursor-pointer text-xs font-mono-tech"
                >
                  <Github size={15} className="text-[#00D9FF]" />
                  <span>github/ibrahim2659-gif</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ibrahim-bharpet-4b01a7441/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#176BFF]/50 text-slate-300 hover:text-white transition group cursor-pointer text-xs font-mono-tech"
                >
                  <Linkedin size={15} className="text-[#8B5CF6]" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                <span>Open for Collaboration & Projects</span>
              </div>
            </div>

          </div>

          {/* Right Column: Holographic 3D Object & Developer Portrait Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            
            {/* Interactive 3D Holographic AI Core Canvas */}
            <div className="w-full relative">
              <HeroScene3D reducedMotion={reducedMotion} />
            </div>

            {/* Futuristic Developer Identity HUD Card */}
            <div className="w-full mt-4 glass-panel rounded-2xl p-4 border border-[#176BFF]/30 hover:border-[#00D9FF]/40 transition-all shadow-xl">
              <div className="flex items-center gap-4">
                {/* Developer Hologram Avatar Placeholder */}
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#176BFF] via-[#8B5CF6] to-[#00D9FF] p-[2px] flex-shrink-0">
                  <div className="w-full h-full bg-[#080D1B] rounded-[10px] flex items-center justify-center overflow-hidden relative">
                    {/* Futuristic stylized initials & terminal icon */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#176BFF]/30 to-transparent" />
                    <span className="font-tech font-extrabold text-lg text-white tracking-wider z-10">IB</span>
                    {/* Scanning laser line */}
                    <div className="absolute inset-x-0 h-[2px] bg-[#00D9FF] top-0 animate-[bounce_3s_infinite] opacity-70" />
                  </div>
                </div>

                {/* Developer Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-tech font-bold text-sm text-white truncate">Ibrahim Bharpet</h3>
                    <span className="text-[10px] font-mono-tech text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded border border-[#00D9FF]/30">
                      CSE (AI)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono-tech truncate">
                    JOY University • Class of 2030
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono-tech mt-0.5 truncate">
                    NxtWave Academy Trainee
                  </p>
                </div>
              </div>

              {/* Real-time Technical Focus Indicators */}
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#050505]/60 rounded-lg py-1 px-1.5 border border-white/5">
                  <span className="block text-[10px] font-mono-tech text-slate-400">FOCUS</span>
                  <span className="text-xs font-mono-tech font-semibold text-[#00D9FF]">Python</span>
                </div>
                <div className="bg-[#050505]/60 rounded-lg py-1 px-1.5 border border-white/5">
                  <span className="block text-[10px] font-mono-tech text-slate-400">DOMAIN</span>
                  <span className="text-xs font-mono-tech font-semibold text-[#8B5CF6]">AI & ML</span>
                </div>
                <div className="bg-[#050505]/60 rounded-lg py-1 px-1.5 border border-white/5">
                  <span className="block text-[10px] font-mono-tech text-slate-400">PLATFORM</span>
                  <span className="text-xs font-mono-tech font-semibold text-[#176BFF]">Web Dev</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
