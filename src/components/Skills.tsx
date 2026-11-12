import React, { useState } from 'react';
import { 
  Code2, 
  Brain, 
  Globe, 
  Terminal, 
  Layers, 
  Sparkles, 
  Check, 
  Workflow, 
  Cpu,
  Database
} from 'lucide-react';
import { sound } from '../utils/audio';

interface SkillDomain {
  id: string;
  title: string;
  categoryTag: string;
  tagline: string;
  themeColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  summary: string;
  focusAreas: string[];
  keyTools: string[];
  inProgressExploration: string[];
}

const skillData: SkillDomain[] = [
  {
    id: 'python',
    title: 'Python Programming',
    categoryTag: 'CORE FOUNDATION',
    tagline: 'Versatile Scripting & Algorithmic Logic',
    themeColor: '#176BFF',
    borderColor: 'border-[#176BFF]/40',
    glowColor: 'shadow-[0_0_25px_rgba(23,107,255,0.25)]',
    icon: <Code2 className="text-[#176BFF]" size={28} />,
    summary: 'Building strong computational foundations, object-oriented concepts, and practical scripting for algorithms, game mechanics, and backend APIs.',
    focusAreas: [
      'Core Syntax & Data Structures',
      'Object-Oriented Programming (OOP)',
      'Algorithmic Thinking & Problem Solving',
      'File Handling & Modular Architecture',
    ],
    keyTools: ['Python 3.x', 'FastAPI', 'Pygame / Game Loops', 'Virtual Environments'],
    inProgressExploration: ['Data structures refinement', 'Game mechanics in Python', 'Local API routing'],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    categoryTag: 'SPECIALIZATION',
    tagline: 'Intelligent Systems & Local LLM Exploration',
    themeColor: '#8B5CF6',
    borderColor: 'border-[#8B5CF6]/40',
    glowColor: 'shadow-[0_0_25px_rgba(139,92,246,0.25)]',
    icon: <Brain className="text-[#8B5CF6]" size={28} />,
    summary: 'Specializing in B.Tech CSE (AI), investigating local open-source models, vector embeddings, and autonomous support app architectures.',
    focusAreas: [
      'Foundations of Artificial Intelligence',
      'Local Open-Source LLMs (Ollama)',
      'Lightweight Models (Gemma 3 1B)',
      'Vector Databases & Embeddings (ChromaDB)',
    ],
    keyTools: ['Ollama Framework', 'Gemma 3 1B', 'ChromaDB', 'Prompt Engineering'],
    inProgressExploration: ['Local inference pipelines', 'AI customer support assistant logic', 'RAG principles'],
  },
  {
    id: 'web',
    title: 'Web Development',
    categoryTag: 'FULL STACK ECOSYSTEM',
    tagline: 'Modern, Interactive & Responsive Experiences',
    themeColor: '#00D9FF',
    borderColor: 'border-[#00D9FF]/40',
    glowColor: 'shadow-[0_0_25px_rgba(0,217,255,0.25)]',
    icon: <Globe className="text-[#00D9FF]" size={28} />,
    summary: 'Creating interactive user interfaces and web applications using modern component-driven libraries and responsive design paradigms.',
    focusAreas: [
      'Modern Responsive Web Layouts',
      'Component Architecture (React & TS)',
      'Modern Styling (Tailwind CSS)',
      'Client-Server API Communication',
    ],
    keyTools: ['HTML5 / Modern CSS', 'JavaScript & TypeScript', 'React & Vite', 'Tailwind CSS'],
    inProgressExploration: ['3D WebGL / Three.js integration', 'State management patterns', 'RESTful API integration'],
  },
];

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const displayedSkills = activeTab === 'all' 
    ? skillData 
    : skillData.filter(s => s.id === activeTab);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span className="text-xs font-mono-tech tracking-widest text-[#8B5CF6] uppercase">
              // TECHNICAL STACK
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
            Technical <span className="bg-gradient-to-r from-[#8B5CF6] via-[#176BFF] to-[#00D9FF] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
            Core competencies cultivated through academic study at JOY University and NxtWave training.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-[#080D1B] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
          {['all', 'python', 'ai', 'web'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#176BFF] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(23,107,255,0.4)] font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'all' ? 'All Skills' : tab === 'python' ? 'Python' : tab === 'ai' ? 'AI' : 'Web'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayedSkills.map((skill) => {
          const isHovered = hoveredCard === skill.id;

          return (
            <div
              key={skill.id}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredCard(skill.id);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-panel rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between group ${skill.borderColor} ${
                isHovered ? `${skill.glowColor} -translate-y-2` : 'hover:border-white/20'
              }`}
            >
              {/* Subtle holographic cyber grid texture */}
              <div className="absolute inset-0 cyber-dots-bg opacity-30 rounded-3xl pointer-events-none" />

              <div>
                {/* Card Header & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-[#080D1B] border border-white/10 group-hover:scale-105 transition-transform">
                    {skill.icon}
                  </div>
                  <span className="text-[10px] font-mono-tech tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase">
                    {skill.categoryTag}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-tech font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-xs font-mono-tech text-slate-400 mt-1 mb-4">
                  {skill.tagline}
                </p>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {skill.summary}
                </p>

                {/* Core Focus Areas */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 block">
                    Core Focus Areas:
                  </span>
                  {skill.focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: skill.themeColor }} />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Tools and In-Progress Modules */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block mb-2">
                    Key Tools & Libraries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.keyTools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#050505]/80 border border-white/10 text-[11px] font-mono-tech text-slate-300 hover:text-white transition"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Training Focus Indicator */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Workflow size={13} className="text-[#00D9FF]" />
                    <span>Curriculum Focus</span>
                  </span>
                  <span className="text-white font-medium">JOY Univ & NxtWave</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Honest Commitment Banner (Aligning with prompt requirements) */}
      <div className="mt-12 glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00D9FF]/10 text-[#00D9FF]">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-tech font-semibold text-white">
              Continuous Learning & Project-Driven Evolution
            </p>
            <p className="text-xs text-slate-400 font-mono-tech">
              Focusing on building practical skills rather than inflated claims. Real projects in active progress.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono-tech text-[#00D9FF] bg-[#00D9FF]/10 px-3 py-1.5 rounded-lg border border-[#00D9FF]/20 flex-shrink-0">
          First Year Engineering Foundations
        </div>
      </div>
    </section>
  );
};
