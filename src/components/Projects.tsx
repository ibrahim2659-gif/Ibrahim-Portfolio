import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Sparkles, 
  Terminal, 
  Gamepad2, 
  Bot, 
  Server,
  Layers,
  Info
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { ProjectVisual } from './3d/ProjectVisual';
import { ProjectModal } from './ProjectModal';
import { sound } from '../utils/audio';

const projectsList: ProjectItem[] = [
  {
    id: 'project-01',
    number: 'PROJECT 01',
    title: 'Ganesha and the Moon',
    category: 'Python Game Development',
    statusBadge: 'GAME CONCEPT',
    statusType: 'concept',
    description: 'An educational game concept inspired by the traditional story of Lord Ganesha and the Moon. The concept explores storytelling through interactive gameplay.',
    features: [
      'Python-based game concept.',
      'Story-driven gameplay.',
      'PC and Android game vision.',
      'Third-person 3D game direction.',
    ],
    technologies: ['Python', 'Game Loops', 'Interactive Storytelling', '3D Scene Direction'],
    plannedFeatures: [
      'Dialogue tree architecture',
      'Atmospheric celestial soundtrack integration',
      'Multi-platform export pipeline (PC & Android)',
    ],
    architectureNotes: 'Initial conceptualization focuses on building core game mechanics in Python, testing narrative state management, and prototyping third-person asset directions.',
    githubPlaceholderText: 'Repository in early concept stage. Repository link will be attached once initial prototype commits are published.',
    themeColor: '#00D9FF',
    iconName: 'Gamepad2',
  },
  {
    id: 'project-02',
    number: 'PROJECT 02',
    title: 'AI-Powered Customer Support App',
    category: 'Artificial Intelligence / Application Development',
    statusBadge: 'IN DEVELOPMENT CONCEPT',
    statusType: 'in-development',
    description: 'An AI-powered customer support application concept designed to help users receive intelligent assistance and improve customer support experiences.',
    features: [
      'AI-powered chatbot.',
      'Automated customer assistance.',
      'Interactive user interface.',
      'Smart question answering.',
    ],
    technologies: ['Artificial Intelligence', 'Natural Language Processing', 'Web Application', 'Intelligent UI'],
    plannedFeatures: [
      'Intent classification logic',
      'Contextual multi-turn dialogue buffer',
      'Escalation routing algorithm for human agents',
    ],
    architectureNotes: 'Focused on creating an intuitive, accessible chat interface connected to intelligent question answering pipelines for frictionless customer satisfaction.',
    githubPlaceholderText: 'App concept in active development. Official repository link will be linked when public code releases begin.',
    themeColor: '#8B5CF6',
    iconName: 'Bot',
  },
  {
    id: 'project-03',
    number: 'PROJECT 03',
    title: 'Local Open-Source AI Assistant',
    category: 'Local AI / Python',
    statusBadge: 'LEARNING PROJECT',
    statusType: 'learning',
    description: 'A learning project exploring locally running open-source AI models using Ollama and Python.',
    features: [
      'Run AI models locally.',
      'Interact with an AI assistant.',
      'Explore local API integration.',
      'Experiment with AI-powered applications.',
    ],
    technologies: ['Python', 'Ollama', 'Gemma 3 1B', 'FastAPI', 'ChromaDB'],
    plannedFeatures: [
      'Vector memory integration with ChromaDB',
      'Local fast API endpoints with FastAPI',
      'Optimized low-latency inference on consumer hardware',
    ],
    architectureNotes: 'Hands-on exploration of privacy-first, on-device artificial intelligence using lightweight Gemma 3 1B model running through Ollama orchestration and Python FastAPI.',
    githubPlaceholderText: 'Learning project codebase being structured. Repository link will be published upon completing initial API benchmarks.',
    themeColor: '#176BFF',
    iconName: 'Server',
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#176BFF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
            <span className="text-xs font-mono-tech tracking-widest text-[#00D9FF] uppercase">
              // PORTFOLIO SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
            My <span className="bg-gradient-to-r from-[#00D9FF] via-[#176BFF] to-[#8B5CF6] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
            Real concepts, prototypes, and learning projects reflecting my passion for AI, Python, and software development.
          </p>
        </div>

        {/* Ethical Transparency Note */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300">
          <Info size={14} className="text-[#00D9FF]" />
          <span>Accurately marked as Concepts & Learning Projects</span>
        </div>
      </div>

      {/* 3D Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projectsList.map((project) => {
          return (
            <div
              key={project.id}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#176BFF]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2.5 shadow-xl relative overflow-hidden"
            >
              {/* Card Header & Badges */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tech text-[#00D9FF] tracking-wider font-semibold">
                    {project.number}
                  </span>
                  <span className={`text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full border ${
                    project.statusType === 'concept'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : project.statusType === 'learning'
                      ? 'bg-[#176BFF]/10 border-[#176BFF]/30 text-[#00D9FF]'
                      : 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-violet-300'
                  }`}>
                    {project.statusBadge}
                  </span>
                </div>

                {/* Procedural 3D Visual */}
                <div className="mb-5 transition-transform duration-300 group-hover:scale-[1.02]">
                  <ProjectVisual projectId={project.id} />
                </div>

                {/* Category & Title */}
                <span className="text-[11px] font-mono-tech uppercase text-slate-400 tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-tech font-bold text-white group-hover:text-[#00D9FF] transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-2 mb-6">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#176BFF] mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Technologies & Action Trigger */}
              <div className="pt-5 border-t border-white/10 space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#050505] border border-white/10 text-[11px] font-mono-tech text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Project Action Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setSelectedProject(project);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-2.5 px-4 rounded-xl glass-panel-glow text-white text-xs font-mono-tech tracking-wider uppercase flex items-center justify-center gap-2 group/btn hover:border-[#00D9FF] hover:bg-white/5 transition-all cursor-pointer"
                >
                  <span>Explore Concept Architecture</span>
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-[#00D9FF]" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
