import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  Sparkles, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Compass,
  Gamepad2,
  Bot,
  HardDrive
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-glow bg-[#080D1B]/95 rounded-3xl p-6 sm:p-8 border border-[#176BFF]/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header Badge & Number */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-mono-tech text-[#00D9FF] px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30">
            {project.number}
          </span>
          <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-300">
            {project.category}
          </span>
          <span className={`text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full border ${
            project.statusType === 'concept'
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : project.statusType === 'learning'
              ? 'bg-[#176BFF]/10 border-[#176BFF]/30 text-[#00D9FF]'
              : 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30 text-violet-300'
          }`}>
            {project.statusBadge}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-tech font-bold text-white mb-3">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-base text-slate-300 leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Technologies Grid */}
        <div className="mb-8">
          <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Cpu size={14} className="text-[#00D9FF]" />
            <span>Technologies & Stack:</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#050505] border border-white/10 text-xs font-mono-tech text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Core & Planned Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#050505]/70 border border-white/5 space-y-3">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#00D9FF] flex items-center gap-2">
              <CheckCircle2 size={15} />
              <span>Key Features & Vision</span>
            </h4>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-1.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.plannedFeatures && (
            <div className="p-5 rounded-2xl bg-[#050505]/70 border border-white/5 space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#8B5CF6] flex items-center gap-2">
                <Clock size={15} />
                <span>Planned Next Steps</span>
              </h4>
              <ul className="space-y-2">
                {project.plannedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Architecture Notes */}
        {project.architectureNotes && (
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 space-y-2">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Terminal size={14} className="text-[#176BFF]" />
              <span>Architectural Insight & Developer Notes:</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-mono-tech leading-relaxed">
              {project.architectureNotes}
            </p>
          </div>
        )}

        {/* Repository Transparency Banner (As strictly requested by user) */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Github size={20} className="text-amber-400 flex-shrink-0" />
            <p className="text-xs font-mono-tech text-amber-200">
              {project.githubPlaceholderText}
            </p>
          </div>
          <a
            href="https://github.com/ibrahim2659-gif"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[#050505] border border-white/10 text-xs font-mono-tech text-white hover:border-[#00D9FF] transition flex-shrink-0 flex items-center gap-1.5"
          >
            <span>Follow Ibrahim's GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
