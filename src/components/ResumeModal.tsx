import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, Github, Linkedin } from 'lucide-react';
import { sound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#080D1B] rounded-3xl border border-[#176BFF]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Controls */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-[#050505]/80">
          <div className="flex items-center gap-3">
            <span className="font-tech font-bold text-white text-base sm:text-lg">
              IBRAHIM BHARPET // CURRICULUM VITAE
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono-tech text-[#00D9FF] px-2 py-0.5 rounded bg-[#00D9FF]/10">
              FIRST YEAR CSE (AI)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#176BFF] hover:bg-[#2563EB] text-white text-xs font-mono-tech flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200 font-sans">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-tech font-extrabold text-white tracking-wide">
                IBRAHIM BHARPET
              </h1>
              <p className="text-sm font-mono-tech text-[#00D9FF] mt-1 font-semibold">
                Aspiring AI & Software Developer
              </p>
              <p className="text-xs text-slate-400 mt-1">
                JOY University • B.Tech Computer Science and Engineering (Artificial Intelligence)
              </p>
            </div>
            <div className="text-xs font-mono-tech text-slate-300 space-y-1">
              <p>Email: <a href="mailto:ibrahimbharpet@gmail.com" className="text-[#00D9FF] hover:underline">ibrahimbharpet@gmail.com</a></p>
              <p>GitHub: <a href="https://github.com/ibrahim2659-gif" target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline">github.com/ibrahim2659-gif</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/ibrahim-bharpet-4b01a7441/" target="_blank" rel="noreferrer" className="text-[#00D9FF] hover:underline">linkedin.com/in/ibrahim-bharpet-4b01a7441</a></p>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#00D9FF] font-bold mb-2">
              Career Objective
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              I am an aspiring AI and Software Developer passionate about artificial intelligence, Python programming, and web development. I enjoy exploring emerging technologies, building creative projects, and developing practical solutions. My goal is to become a skilled software engineer and AI developer.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#176BFF] font-bold mb-3">
              Education & Academic Background
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-sm">JOY University</h3>
                  <span className="text-xs font-mono-tech text-slate-400">2026 – 2030 (Expected)</span>
                </div>
                <p className="text-xs font-mono-tech text-[#00D9FF] mt-0.5">
                  B.Tech in Computer Science and Engineering (Artificial Intelligence)
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Status: First Year Student • Focus: Computer Science Foundations, AI & Machine Learning Specialization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-sm">NxtWave Academy</h3>
                  <span className="text-xs font-mono-tech text-slate-400">Active Intensive</span>
                </div>
                <p className="text-xs font-mono-tech text-violet-300 mt-0.5">
                  Software Engineering & Full Stack Technical Training
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Industry-aligned training in programming fundamentals, computational thinking, and software architectures.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#8B5CF6] font-bold mb-3">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-mono-tech text-xs text-white font-semibold">Python</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Core syntax, algorithms, OOP, game logic scripting, API backend exploration.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-mono-tech text-xs text-white font-semibold">Artificial Intelligence</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Local open-source LLMs, Ollama, Gemma 3 1B, vector storage with ChromaDB, AI app concepts.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-mono-tech text-xs text-white font-semibold">Web Development</h4>
                <p className="text-xs text-slate-300 mt-1">
                  HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, responsive interfaces.
                </p>
              </div>
            </div>
          </div>

          {/* Project Concepts */}
          <div>
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-emerald-400 font-bold mb-3">
              Projects & Engineering Concepts
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">Ganesha and the Moon</h4>
                  <span className="text-[10px] font-mono-tech text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">Python Game Concept</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  An educational game concept inspired by traditional mythology exploring third-person interactive storytelling in Python for PC and Android.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">AI-Powered Customer Support App</h4>
                  <span className="text-[10px] font-mono-tech text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded">In Development Concept</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Intelligent support application designed to provide automated assistance, smart question answering, and modern chat UI.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">Local Open-Source AI Assistant</h4>
                  <span className="text-[10px] font-mono-tech text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 rounded">Learning Project</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Hands-on learning project exploring locally running AI models with Ollama, Gemma 3 1B, FastAPI, and ChromaDB vector persistence.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
