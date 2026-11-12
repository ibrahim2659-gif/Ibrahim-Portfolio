import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Code, 
  Mail, 
  Github, 
  Linkedin,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ResumeSectionProps {
  onOpenModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenModal }) => {
  const [copied, setCopied] = useState(false);

  const handleDownloadOrPrint = () => {
    sound.playClick();
    // Attempt to download local resume PDF if available, otherwise open print view
    const link = document.createElement('a');
    link.href = '/Ibrahim_Bharpet_Resume.pdf';
    link.download = 'Ibrahim_Bharpet_Resume.pdf';
    
    // Check if the file exists or trigger print dialog
    fetch('/Ibrahim_Bharpet_Resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          link.click();
        } else {
          // Open formatted print dialog for full resume document
          window.print();
        }
      })
      .catch(() => {
        window.print();
      });
  };

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('ibrahimbharpet@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
          <span className="text-xs font-mono-tech tracking-widest text-[#00D9FF] uppercase">
            // CURRICULUM VITAE
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
          Explore My <span className="bg-gradient-to-r from-[#00D9FF] to-[#176BFF] bg-clip-text text-transparent">Resume</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
          Verified academic credentials, specialized AI curriculum, and technical project roadmap.
        </p>
      </div>

      {/* Modern Glassmorphic Resume Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Actions & PDF Upload Guide (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-5 border border-[#176BFF]/30 shadow-2xl">
            <div className="flex items-center gap-3 text-white">
              <div className="p-3 rounded-2xl bg-[#176BFF]/20 text-[#00D9FF]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-tech font-bold text-lg">Official CV Document</h3>
                <p className="text-xs font-mono-tech text-slate-400">PDF & Print Ready</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Access Ibrahim's verified qualifications formatted for recruitment, internship opportunities, and collaborative research teams.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDownloadOrPrint}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#176BFF] to-[#8B5CF6] text-white font-tech font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(23,107,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenModal();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3 px-5 rounded-xl glass-panel text-white font-tech font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:border-[#00D9FF] hover:bg-white/5 transition-all cursor-pointer"
              >
                <Printer size={15} className="text-[#00D9FF]" />
                <span>View Fullscreen Preview</span>
              </button>
            </div>

            {/* PDF Upload Integration Note (As required by prompt) */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2">
              <span className="font-mono-tech text-[#00D9FF] font-semibold block uppercase">
                // PDF File Integration Ready:
              </span>
              <p className="text-[11px] font-mono-tech text-slate-400 leading-normal">
                Configured to automatically link to <code className="text-white bg-black/40 px-1 py-0.5 rounded">/Ibrahim_Bharpet_Resume.pdf</code> once your uploaded document is present, with instantaneous print layout fallback.
              </p>
            </div>
          </div>

          {/* Quick Contact Micro-Card */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 block">
              Direct Contact Channels:
            </span>
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-200">
              <span className="truncate">ibrahimbharpet@gmail.com</span>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00D9FF] transition cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Professional Resume Document Preview (8 cols) */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden text-slate-200 print:bg-white print:text-black">
            
            {/* Document Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-tech font-bold text-white tracking-wide">
                    IBRAHIM BHARPET
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-tech text-[#00D9FF] mt-0.5">
                    Aspiring AI & Software Developer
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs font-mono-tech text-slate-400 space-y-0.5">
                  <p>ibrahimbharpet@gmail.com</p>
                  <p>JOY University • CSE (AI)</p>
                  <p>Class of 2030</p>
                </div>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#00D9FF] mb-2 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                <span>Career Objective</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                I am an aspiring AI and Software Developer passionate about artificial intelligence, Python programming, and web development. I enjoy exploring emerging technologies, building creative projects, and developing practical solutions. My goal is to become a skilled software engineer and AI developer.
              </p>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#176BFF] mb-3 font-semibold flex items-center gap-2">
                <GraduationCap size={15} />
                <span>Education & Academic Credentials</span>
              </h4>
              
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#050505]/60 border border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-tech font-bold text-sm text-white">JOY University</span>
                    <span className="text-xs font-mono-tech text-slate-400">2026 – 2030 (Expected)</span>
                  </div>
                  <p className="text-xs font-mono-tech text-[#00D9FF]">
                    B.Tech Computer Science and Engineering (Artificial Intelligence)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Current Status: First Year Student
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#050505]/60 border border-white/5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-tech font-bold text-sm text-white">NxtWave Academy</span>
                    <span className="text-xs font-mono-tech text-slate-400">Active Trainee</span>
                  </div>
                  <p className="text-xs font-mono-tech text-violet-300">
                    Comprehensive Software & Full Stack Programming Training
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#8B5CF6] mb-3 font-semibold flex items-center gap-2">
                <Code size={15} />
                <span>Technical Proficiencies</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <span className="text-xs font-mono-tech text-white font-semibold block mb-1">
                    Python
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Core syntax, algorithms, data structures, game logic, scripting.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <span className="text-xs font-mono-tech text-white font-semibold block mb-1">
                    Artificial Intelligence
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Ollama, Gemma 3 1B, ChromaDB vector databases, AI support concepts.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <span className="text-xs font-mono-tech text-white font-semibold block mb-1">
                    Web Development
                  </span>
                  <p className="text-[11px] text-slate-400">
                    HTML5, Modern CSS, JavaScript, TypeScript, React, Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Project Concepts & Development Roadmap */}
            <div>
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-emerald-400 mb-3 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Featured Project Concepts & Learning Roadmaps</span>
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-tech font-semibold text-xs text-white">
                      Ganesha and the Moon
                    </span>
                    <span className="text-[10px] font-mono-tech text-amber-300">
                      Python Game Concept
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Story-driven educational game exploring interactive 3D gameplay direction in Python for PC and Android.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-tech font-semibold text-xs text-white">
                      AI-Powered Customer Support App
                    </span>
                    <span className="text-[10px] font-mono-tech text-violet-300">
                      In Development Concept
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Intelligent assistance chatbot application with smart question answering and automated customer assistance.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#050505]/60 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="font-tech font-semibold text-xs text-white">
                      Local Open-Source AI Assistant
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#00D9FF]">
                      Learning Project
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Local inference architecture exploring Ollama, Gemma 3 1B, FastAPI, and ChromaDB vector persistence.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
