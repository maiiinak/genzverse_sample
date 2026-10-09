import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── MASCOT CONFIG ────────────────────────────────────────────────────────────
// To replace the mascot art later: just swap MASCOT_SVG with your own SVG/img.
// Everything else (dragging, speech, moods) is handled by the wrapper.
// ─────────────────────────────────────────────────────────────────────────────

const MASCOT_SVG = ({ mood }) => {
  const eyeY = mood === 'annoyed' ? 58 : mood === 'happy' ? 56 : 57;
  const mouthPath = mood === 'annoyed'
    ? 'M 38 70 Q 50 65 62 70'
    : mood === 'happy'
    ? 'M 38 68 Q 50 76 62 68'
    : 'M 40 69 Q 50 73 60 69';
  const eyebrowLeft = mood === 'annoyed' ? 'M 33 52 L 44 55' : 'M 33 53 L 44 52';
  const eyebrowRight = mood === 'annoyed' ? 'M 56 55 L 67 52' : 'M 56 52 L 67 53';
  const blushOpacity = mood === 'happy' ? 0.5 : 0;

  return (
    <svg viewBox="0 0 100 120" width="72" height="86" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="95" rx="20" ry="14" fill="#ffe600" />
      {/* Tail */}
      <path d="M 68 92 Q 88 78 80 65 Q 74 57 68 68" stroke="#ffe600" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Head */}
      <circle cx="50" cy="55" r="28" fill="#ffe600" />
      {/* Ears */}
      <polygon points="22,32 16,12 36,26" fill="#ffe600" />
      <polygon points="24,30 20,16 34,26" fill="#ff9999" />
      <polygon points="78,32 84,12 64,26" fill="#ffe600" />
      <polygon points="76,30 80,16 66,26" fill="#ff9999" />
      {/* Face */}
      {/* Blush */}
      <circle cx="33" cy="65" r="7" fill="#ff9999" opacity={blushOpacity} />
      <circle cx="67" cy="65" r="7" fill="#ff9999" opacity={blushOpacity} />
      {/* Eyebrows */}
      <path d={eyebrowLeft} stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d={eyebrowRight} stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <circle cx="38" cy={eyeY} r="5" fill="#000" />
      <circle cx="62" cy={eyeY} r="5" fill="#000" />
      <circle cx="39.5" cy={eyeY - 1.5} r="1.5" fill="#fff" />
      <circle cx="63.5" cy={eyeY - 1.5} r="1.5" fill="#fff" />
      {/* Nose */}
      <ellipse cx="50" cy="64" rx="3" ry="2" fill="#000" />
      {/* Whiskers */}
      <line x1="20" y1="62" x2="40" y2="64" stroke="#000" strokeWidth="1.2" opacity="0.6" />
      <line x1="20" y1="66" x2="40" y2="66" stroke="#000" strokeWidth="1.2" opacity="0.6" />
      <line x1="60" y1="64" x2="80" y2="62" stroke="#000" strokeWidth="1.2" opacity="0.6" />
      <line x1="60" y1="66" x2="80" y2="66" stroke="#000" strokeWidth="1.2" opacity="0.6" />
      {/* Mouth */}
      <path d={mouthPath} stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="35" cy="106" rx="9" ry="6" fill="#ffe600" />
      <ellipse cx="65" cy="106" rx="9" ry="6" fill="#ffe600" />
    </svg>
  );
};

const IDLE_LINES = [
  "Psst... hover over the text!",
  "I rate your scroll 10/10.",
  "Gen Z runs this campus.",
  "Brands love us. Students love us more.",
  "200+ colleges? We got the plug.",
  "Click me. I dare you.",
  "No bots here. Just real ones.",
  "Samsung? Dell? We know them personally.",
  "Campus > everything.",
  "I'm watching you scroll...",
];

const ANNOYED_LINES = [
  "Bro. STOP.",
  "I'm literally vibrating rn.",
  "You do this at home??",
  "Ok fine. I quit.",
  "This is harassment.",
  "I am DONE.",
];

const HAPPY_LINES = [
  "Yes yes yes!",
  "More! Do it again!",
  "We love an engaged user!",
  "That's the vibe.",
];

export default function Mascot() {
  const [pos, setPos] = useState({ x: 24, y: null });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const [mood, setMood] = useState('idle');
  const [speech, setSpeech] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mascotRef = useRef(null);
  const speechTimer = useRef(null);
  const idleTimer = useRef(null);
  const clickResetTimer = useRef(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  // Set bottom position after mount
  useEffect(() => {
    setPos(p => ({ ...p, y: window.innerHeight - 120 }));
    setMounted(true);
  }, []);

  // Idle speech bubbles
  useEffect(() => {
    const scheduleIdle = () => {
      idleTimer.current = setTimeout(() => {
        if (mood === 'idle') {
          showLine(IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)], 'idle');
        }
        scheduleIdle();
      }, 8000 + Math.random() * 7000);
    };
    scheduleIdle();
    return () => clearTimeout(idleTimer.current);
  }, [mood]);

  const showLine = useCallback((text, newMood = 'idle') => {
    clearTimeout(speechTimer.current);
    setSpeech(text);
    setShowSpeech(true);
    setMood(newMood);
    speechTimer.current = setTimeout(() => {
      setShowSpeech(false);
      setMood('idle');
    }, 3000);
  }, []);

  const handleClick = () => {
    const newCount = clicks + 1;
    setClicks(newCount);

    clearTimeout(clickResetTimer.current);
    clickResetTimer.current = setTimeout(() => setClicks(0), 4000);

    if (newCount >= 6) {
      showLine(ANNOYED_LINES[Math.floor(Math.random() * ANNOYED_LINES.length)], 'annoyed');
      setClicks(0);
    } else if (newCount >= 3) {
      showLine(HAPPY_LINES[Math.floor(Math.random() * HAPPY_LINES.length)], 'happy');
    } else {
      showLine(IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)], 'happy');
    }
  };

  // Drag logic
  const handlePointerDown = (e) => {
    e.preventDefault();
    const rect = mascotRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - 90, clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 110, clientY - dragOffset.y)),
      });
    };

    const onUp = () => setIsDragging(false);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, dragOffset]);

  if (!mounted || pos.y === null) return null;

  // Speech bubble position — above mascot if near bottom, else below
  const nearBottom = pos.y > window.innerHeight - 200;

  return (
    <div
      ref={mascotRef}
      className="fixed z-[9999] select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        transition: isDragging ? 'none' : 'filter 0.2s',
        filter: isDragging ? 'drop-shadow(0 8px 20px rgba(255,230,0,0.6))' : 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {/* Speech Bubble */}
      {showSpeech && (
        <div
          className="absolute font-mono-code text-[11px] font-bold text-black bg-[#ffe600] px-3 py-1.5 rounded-xl max-w-[160px] text-center leading-tight shadow-lg z-10 border-2 border-black"
          style={{
            bottom: nearBottom ? '90px' : 'auto',
            top: nearBottom ? 'auto' : '90px',
            left: pos.x > window.innerWidth / 2 ? 'auto' : '0',
            right: pos.x > window.innerWidth / 2 ? '0' : 'auto',
            animation: 'fadeInUp 0.2s ease-out',
          }}
        >
          {speech}
          {/* Tail */}
          <div
            className="absolute w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              ...(nearBottom
                ? { borderTop: '8px solid #ffe600', bottom: '-8px', left: '20px' }
                : { borderBottom: '8px solid #ffe600', top: '-8px', left: '20px' }),
            }}
          />
        </div>
      )}

      {/* Mascot Body */}
      <div
        className="relative"
        style={{
          animation: mood === 'annoyed' ? 'mascotShake 0.4s ease-in-out' : mood === 'happy' ? 'mascotBounce 0.5s ease-in-out' : 'mascotIdle 3s ease-in-out infinite',
        }}
      >
        <MASCOT_SVG mood={mood} />
      </div>
    </div>
  );
}
