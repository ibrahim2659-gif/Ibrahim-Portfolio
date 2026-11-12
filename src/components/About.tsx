import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Lightbulb, 
  Rocket, 
  Terminal, 
  BookOpen, 
  Compass, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/audio';

export const About: React.FC = () => {
  // 3D card tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth angle bounds
    const angleX = -((y - centerY) / centerY) * 10;
    const angleY = ((x - centerX) / centerX) * 10;
    setRotateX(angleX);
    setRotateY(angleY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#176BFF]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#176BFF]" />
          <span className="text-xs font-mono-tech tracking-widest text-[#176BFF] uppercase">
            // PROFILE DIRECTIVE
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
          About <span className="bg-gradient-to-r from-[#176BFF] to-[#00D9FF] bg-clip-text text-transparent">Me</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
          Academic foundation at JOY University, engineering mindset, and continuous innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Interactive 3D Holographic Profile Card (5 cols) */}
        <div 
          className="lg:col-span-5 perspective-[1000px] w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="w-full glass-panel-glow rounded-3xl p-6 sm:p-8 transition-transform duration-200 ease-out relative overflow-hidden"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Holographic light gradient highlight */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00D9FF]/10 to-transparent pointer-events-none"
              style={{
                transform: 'translateZ(20px)',
              }}
            />

            {/* Profile Avatar & Hologram Grid */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-5">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#176BFF] via-[#8B5CF6] to-[#00D9FF] p-[2px] shadow-[0_0_30px_rgba(23,107,255,0.4)]">
                  <div className="w-full h-full bg-[#080D1B] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                    {/* Futuristic stylized monogram badge */}
                    <span className="font-tech font-extrabold text-3xl text-white tracking-wider">
                      IB
                    </span>
                    {/* Cyber scanline */}
                    <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
                  </div>
                </div>
                <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#176BFF] text-white text-[10px] font-mono-tech tracking-widest shadow-[0_0_10px_#176BFF]">
                  AI SPECIALIST
                </span>
              </div>

              <h3 className="font-tech font-bold text-2xl text-white">Ibrahim Bharpet</h3>
              <p className="text-xs font-mono-tech text-[#00D9FF] mt-1">
                Aspiring AI & Software Developer
              </p>
              <p className="text-xs text-slate-400 font-mono-tech mt-0.5">
                JOY University • B.Tech CSE (AI) • Class of 2030
              </p>

              {/* Verified Training Badge */}
              <div className="mt-4 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-xs font-mono-tech text-slate-300">
                  NxtWave Technical Training
                </span>
              </div>

              {/* 3D Holographic Stat Chips */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10 text-left">
                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-slate-400 block">CURRENT YEAR</span>
                  <span className="text-sm font-tech font-semibold text-white">1st Year Engineering</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-slate-400 block">GRADUATION</span>
                  <span className="text-sm font-tech font-semibold text-[#8B5CF6]">2030 Cohort</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-slate-400 block">SPECIALIZATION</span>
                  <span className="text-sm font-tech font-semibold text-[#00D9FF]">Artificial Intelligence</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050505]/70 border border-white/5">
                  <span className="text-[10px] font-mono-tech text-slate-400 block">LOCATION</span>
                  <span className="text-sm font-tech font-semibold text-white">India</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Exact Provided Biography & Career Objective (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Biography Block */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div className="flex items-center gap-2 text-sm font-mono-tech text-[#00D9FF]">
              <Terminal size={16} />
              <span>STORY & PHILOSOPHY</span>
            </div>

            {/* Exactly as requested in user prompt */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              "I'm <span className="text-white font-semibold">Ibrahim Bharpet</span>, a first-year B.Tech Computer Science and Engineering student specializing in <span className="text-[#00D9FF] font-medium">Artificial Intelligence</span> at <span className="text-white font-medium">JOY University</span>."
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              "I am passionate about <span className="text-[#176BFF] font-medium">Python programming</span>, <span className="text-[#8B5CF6] font-medium">Artificial Intelligence</span>, and <span className="text-[#00D9FF] font-medium">Web Development</span>. Through my academic learning and <span className="text-white font-medium">NxtWave training</span>, I am continuously improving my technical and problem-solving skills."
            </p>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal italic border-l-2 border-[#8B5CF6] pl-4 py-1">
              "I believe in learning through building projects, experimenting with new technologies, and transforming creative ideas into practical applications."
            </p>
          </div>

          {/* Career Objective Card */}
          <div className="glass-panel-purple rounded-3xl p-6 sm:p-8 border border-[#8B5CF6]/30 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-violet-300 mb-3 uppercase tracking-wider">
              <Compass size={16} />
              <span>Career Objective</span>
            </div>

            {/* Exactly as requested in user prompt */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              "I am an aspiring AI and Software Developer passionate about artificial intelligence, Python programming, and web development. I enjoy exploring emerging technologies, building creative projects, and developing practical solutions. My goal is to become a skilled software engineer and AI developer."
            </p>

            {/* Core Values / Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#176BFF]" />
                <span>Learn Deeply</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                <span>Build Practically</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                <span>Innovate Constantly</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
