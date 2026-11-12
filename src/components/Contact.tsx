import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Sparkles, 
  Terminal, 
  MessageSquare,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('ibrahimbharpet@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill out all required fields before transmitting.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setStatusMessage('Please provide a valid email address.');
      return;
    }

    // Prepare real email mailto dispatch
    const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ibrahim,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}\n\nBest regards,\n${formData.name}`
    );
    const mailtoUrl = `mailto:ibrahimbharpet@gmail.com?subject=${subject}&body=${body}`;

    // Open user's mail client directly
    window.location.href = mailtoUrl;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00D9FF', '#176BFF', '#8B5CF6'],
      });
    } catch {
      // Confetti fallback
    }

    // Set real, honest status: dispatch initiated via email client
    setStatus('success');
    setStatusMessage(
      `Email dispatch initiated for Ibrahim (ibrahimbharpet@gmail.com). If your default mail client didn't open automatically, you can also copy the formatted message draft below.`
    );
  };

  const handleCopyDraft = () => {
    sound.playClick();
    const draft = `To: ibrahimbharpet@gmail.com\nFrom: ${formData.name} <${formData.email}>\nSubject: Collaboration Inquiry\n\n${formData.message}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#176BFF]/15 to-[#8B5CF6]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
          <span className="text-xs font-mono-tech tracking-widest text-[#00D9FF] uppercase">
            // COMMUNICATION PROTOCOL
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-tight">
          Let's Build Something <span className="bg-gradient-to-r from-[#00D9FF] via-[#176BFF] to-[#8B5CF6] bg-clip-text text-transparent">Amazing Together.</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400 font-mono-tech max-w-xl">
          Whether you have an inquiry, project collaboration, or mentorship opportunity, feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Contact Details & Verified Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Direct Contact Card */}
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 space-y-6 border border-[#176BFF]/30 shadow-2xl">
            <h3 className="text-xl font-tech font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-[#00D9FF]" />
              <span>Direct Coordinates</span>
            </h3>

            {/* Email Channel */}
            <div className="p-4 rounded-2xl bg-[#050505]/70 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
                Primary Email Channel:
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href="mailto:ibrahimbharpet@gmail.com"
                  className="text-sm font-mono-tech text-white hover:text-[#00D9FF] transition truncate"
                >
                  ibrahimbharpet@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#00D9FF] transition cursor-pointer flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Verified Social Profiles */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-wider block">
                Developer Profiles:
              </span>

              {/* GitHub */}
              <a
                href="https://github.com/ibrahim2659-gif"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#050505]/70 border border-white/10 hover:border-[#00D9FF]/40 text-slate-200 hover:text-white transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#00D9FF]">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="font-tech font-semibold text-sm block">GitHub Repository</span>
                    <span className="text-xs font-mono-tech text-slate-400">@ibrahim2659-gif</span>
                  </div>
                </div>
                <ExternalLink size={15} className="text-slate-400 group-hover:text-[#00D9FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ibrahim-bharpet-4b01a7441/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#050505]/70 border border-white/10 hover:border-[#8B5CF6]/40 text-slate-200 hover:text-white transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-[#8B5CF6]">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="font-tech font-semibold text-sm block">LinkedIn Network</span>
                    <span className="text-xs font-mono-tech text-slate-400">Ibrahim Bharpet</span>
                  </div>
                </div>
                <ExternalLink size={15} className="text-slate-400 group-hover:text-[#8B5CF6] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Availability Badge */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono-tech text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span>Available for Python, AI & Web collaborations</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative">
            <h3 className="text-xl sm:text-2xl font-tech font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#176BFF]" />
              <span>Send a Message</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono-tech text-slate-400 mb-6">
              Dispatches directly to Ibrahim Bharpet's official inbox with full message draft support.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                  Your Name <span className="text-[#00D9FF]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#050505]/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition font-mono-tech text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                  Your Email Address <span className="text-[#00D9FF]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#050505]/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition font-mono-tech text-sm"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono-tech uppercase tracking-wider text-slate-300 mb-2">
                  Message <span className="text-[#00D9FF]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your project, idea, or questions..."
                  className="w-full px-4 py-3 rounded-xl bg-[#050505]/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] transition font-mono-tech text-sm resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                onMouseEnter={() => sound.playHover()}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#176BFF] via-[#2563EB] to-[#8B5CF6] text-white font-tech font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(23,107,255,0.4)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
              >
                <Send size={16} />
                <span>Send Message to Ibrahim</span>
              </button>

              {/* Status Banner */}
              {status !== 'idle' && (
                <div
                  className={`p-4 rounded-xl border text-xs font-mono-tech space-y-2.5 animate-in fade-in duration-200 ${
                    status === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {status === 'success' ? (
                      <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="leading-relaxed">{statusMessage}</p>
                  </div>

                  {status === 'success' && (
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedDraft ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copiedDraft ? 'Draft Copied to Clipboard!' : 'Copy Formatted Draft'}</span>
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
