import React, { useEffect, useRef } from 'react';

interface ProjectVisualProps {
  projectId: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ projectId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = 200);

    let frameId = 0;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.02;

      if (projectId === 'project-01') {
        // Ganesha and the Moon: Stylized Celestial Lunar Glow & Orbital Horizon
        const cx = width / 2;
        const cy = height / 2;

        // Dark space gradient
        const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
        bgGrad.addColorStop(0, '#0d1b33');
        bgGrad.addColorStop(1, '#050505');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Twinkling stars
        for (let i = 0; i < 30; i++) {
          const sx = (i * 37) % width;
          const sy = (i * 53) % height;
          const a = 0.3 + 0.5 * Math.sin(angle * 2 + i);
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
          ctx.fillRect(sx, sy, 1.5, 1.5);
        }

        // Luminous Lunar Crescent
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.sin(angle * 0.5) * 0.1);

        // Moon Outer Glow
        ctx.shadowColor = '#00D9FF';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.fillStyle = '#0a192f';
        ctx.fill();

        // Crescent cutout
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(-10, -8, 44, 0, Math.PI * 2);
        ctx.fillStyle = '#00D9FF';
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Orbital Golden/Cyan Rings
        ctx.strokeStyle = 'rgba(23, 107, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 22, angle * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      } else if (projectId === 'project-02') {
        // AI Customer Support App: Holographic Neural Assistant Network
        const cx = width / 2;
        const cy = height / 2;

        const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
        bgGrad.addColorStop(0, '#130d2e');
        bgGrad.addColorStop(1, '#050505');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Interconnected Neural Nodes
        const nodes = [
          { x: cx, y: cy, r: 24, col: '#8B5CF6' },
          { x: cx - 65, y: cy - 35, r: 12, col: '#00D9FF' },
          { x: cx + 65, y: cy - 30, r: 14, col: '#176BFF' },
          { x: cx - 55, y: cy + 40, r: 11, col: '#C084FC' },
          { x: cx + 60, y: cy + 45, r: 13, col: '#00D9FF' },
        ];

        // Draw connections
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)';
        for (let i = 1; i < nodes.length; i++) {
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].y);
          ctx.lineTo(nodes[i].x, nodes[i].y);
          ctx.stroke();
        }

        // Draw Nodes
        nodes.forEach((n, idx) => {
          ctx.save();
          ctx.shadowColor = n.col;
          ctx.shadowBlur = 15;
          ctx.fillStyle = n.col;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + Math.sin(angle * 2 + idx) * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Pulsing Wave Ring
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const pulseR = 30 + (Math.sin(angle * 3) + 1) * 18;
        ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Local Open-Source AI Assistant (Ollama & Gemma 3 1B)
        const cx = width / 2;
        const cy = height / 2;

        const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
        bgGrad.addColorStop(0, '#071b28');
        bgGrad.addColorStop(1, '#050505');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Futuristic Silicon Chip / Vector Grid
        ctx.save();
        ctx.translate(cx, cy);

        // Rotating Isometric Hex / Vector Ring
        ctx.shadowColor = '#00D9FF';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = '#00D9FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 + angle * 0.8;
          const x = Math.cos(a) * 44;
          const y = Math.sin(a) * 44;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner Core Processor
        ctx.fillStyle = '#080D1B';
        ctx.strokeStyle = '#176BFF';
        ctx.lineWidth = 2;
        ctx.fillRect(-22, -22, 44, 44);
        ctx.strokeRect(-22, -22, 44, 44);

        // Terminal Prompt Indicator
        ctx.fillStyle = '#00D9FF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('> GEMMA', 0, 0);

        ctx.restore();

        // Data Streams
        ctx.strokeStyle = 'rgba(23, 107, 255, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const lx = 30 + i * 70;
          ctx.beginPath();
          ctx.moveTo(lx, 20);
          ctx.lineTo(lx, 180);
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [projectId]);

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#050505] border border-white/5">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
    </div>
  );
};
