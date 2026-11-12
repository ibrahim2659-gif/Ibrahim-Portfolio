import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  Code,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { EducationItem } from '../types/portfolio';
import { sound } from '../utils/audio';

const educationData: EducationItem[] = [
  {
    institution: 'JOY University',
    degree: 'B.Tech in Computer Science and Engineering',
    specialization: 'Artificial Intelligence',
    period: '2026 – 2030 (Expected)',
    status: 'Currently in 1st Year',
    type: 'academic',
    location: 'Tamil Nadu, India',
    description: 'Pursuing a comprehensive engineering degree with a dedicated specialization in Artificial Intelligence. Developing rigorous fundamentals in computer science, algorithmic foundations, mathematical concepts for AI, and software engineering methodologies.',
    highlights: [
      'Specialized AI & Machine Learning curriculum trajectory',
      'Data structures and computational logic fundamentals',
      'Active focus on project-based engineering challenges',
      'Collaborative peer coding and technology exploration',
    ],
  },
  {
    institution: 'NxtWave Intensive Training',
    degree: 'Professional Software & Tech Training',
    specialization: 'Full Stack & Modern Developer Foundations',
    period: 'Ongoing Academy Training',
    status: 'Active Industry Training',
    type: 'training',
    location: 'Online / Industry Cohort',
    description: 'Enrolled in specialized developer training focused on practical, hands-on software development skills, full-stack programming, algorithmic problem solving, and building production-ready applications.',
    highlights: [
      'Intensive hands-on Python and programming fundamentals',
      'Modern web technologies and responsive UI engineering',
      'Industry-standard problem-solving and coding practice',
      'Practical software development project simulations',
    ],
  },
];

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#176BFF]" />
          <span className="text-xs font-mono-tech tracking-widest text-[#176BFF] uppercase">
            // ACADEMIC & PROFESSIONAL PATHWAY
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
          Education & <span className="bg-gradient-to-r from-[#176BFF] via-[#8B5CF6] to-[#00D9FF] bg-clip-text text-transparent">Training</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
          Structured learning combining academic degree excellence with practical industry-grade software training.
        </p>
      </div>

      {/* Futuristic Timeline Container */}
      <div className="relative border-l-2 border-[#176BFF]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {educationData.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Glowing Milestone Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#080D1B] border-2 border-[#00D9FF] flex items-center justify-center shadow-[0_0_15px_#00D9FF] group-hover:scale-110 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
            </div>

            {/* Content Glass Panel */}
            <div 
              onMouseEnter={() => sound.playHover()}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#00D9FF]/40 transition-all duration-300 shadow-xl group-hover:-translate-y-1"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#080D1B] border border-white/10 text-[#00D9FF]">
                    {item.type === 'academic' ? <GraduationCap size={22} /> : <Terminal size={22} />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-tech font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                      {item.institution}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono-tech text-[#8B5CF6]">
                      {item.degree} {item.specialization && `• ${item.specialization}`}
                    </p>
                  </div>
                </div>

                {/* Period & Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-slate-300">
                    <Calendar size={12} className="text-[#00D9FF]" />
                    <span>{item.period}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#176BFF]/15 border border-[#176BFF]/30 text-xs font-mono-tech text-[#00D9FF] font-medium">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 block">
                  Key Curriculum & Practical Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.highlights.map((high, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 size={14} className="text-[#00D9FF] flex-shrink-0" />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
