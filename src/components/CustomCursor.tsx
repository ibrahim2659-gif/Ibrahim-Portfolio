import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports primary touch
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, select, [role="button"], .clickable');
        setIsPointer(!!clickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth trailing ring
    let frameId: number;
    const loop = () => {
      setTrailing((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(frameId);
    };
  }, [pos.x, pos.y]);

  if (isTouch || !enabled) return null;

  return (
    <>
      {/* Central Cyber Point */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-75 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicking ? '6px' : isPointer ? '10px' : '5px',
          height: isClicking ? '6px' : isPointer ? '10px' : '5px',
          backgroundColor: isPointer ? '#00D9FF' : '#176BFF',
          boxShadow: isPointer ? '0 0 10px #00D9FF' : '0 0 8px #176BFF',
        }}
      />

      {/* Outer Holographic Reticle Ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-150"
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          width: isPointer ? '44px' : isClicking ? '26px' : '32px',
          height: isPointer ? '44px' : isClicking ? '26px' : '32px',
          borderColor: isPointer ? 'rgba(0, 217, 255, 0.7)' : 'rgba(139, 92, 246, 0.45)',
          transform: `translate(-50%, -50%) rotate(${pos.x * 0.5}deg)`,
        }}
      >
        {/* Reticle notch markers */}
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00D9FF] rounded-full opacity-60"></span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#8B5CF6] rounded-full opacity-60"></span>
      </div>
    </>
  );
};
