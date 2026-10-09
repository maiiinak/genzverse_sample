import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

const TARGET_BADGES = [
  { label: 'GZ', bg: '#ffe600', text: '#000000' },
  { label: '100', bg: '#ffffff', text: '#000000' },
  { label: 'VIP', bg: '#ffe600', text: '#000000' },
  { label: 'FEST', bg: '#111111', text: '#ffe600', border: 'border-[#ffe600]' },
  { label: 'CAMPUS', bg: '#ffffff', text: '#000000' },
];

export default function MiniGame({ onOpenCampaignModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [nodes, setNodes] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score >= 8) {
        setGameWon(true);
        soundFx.success();
        confetti({
          particleCount: 60,
          spread: 80,
          colors: ['#ffe600', '#ffffff'],
        });
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  const startGame = () => {
    soundFx.laser();
    setScore(0);
    setTimeLeft(15);
    setGameWon(false);
    setIsPlaying(true);
    spawnNodes();
  };

  const spawnNodes = () => {
    const list = [];
    for (let i = 0; i < 5; i++) {
      const badge = TARGET_BADGES[Math.floor(Math.random() * TARGET_BADGES.length)];
      list.push({
        id: Math.random(),
        badge,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        size: Math.random() * 10 + 44,
      });
    }
    setNodes(list);
  };

  const popNode = (id) => {
    soundFx.pop();
    setScore((prev) => prev + 1);
    setNodes((prev) => prev.filter((n) => n.id !== id));

    setTimeout(() => {
      const badge = TARGET_BADGES[Math.floor(Math.random() * TARGET_BADGES.length)];
      setNodes((prev) => [
        ...prev,
        {
          id: Math.random(),
          badge,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          size: Math.random() * 10 + 44,
        },
      ]);
    }, 150);
  };

  return (
    <section id="minigame" className="relative py-16 px-4 sm:px-6 z-10 bg-[#050505]">
      <div className="max-w-3xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-[#ffe600] font-mono-code text-xs font-bold mb-3 border border-neutral-700">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>CAMPUS REFLEX ARENA</span>
          </div>

          <h3 className="font-display font-black text-xl sm:text-3xl uppercase text-white mb-2">
            TARGET THE <span className="text-[#ffe600]">HYPE NODES</span>
          </h3>
          <p className="text-gray-400 font-mono-code text-xs max-w-md mx-auto mb-5">
            Click at least 8 nodes within 15 seconds to unlock priority campaign access.
          </p>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 font-mono-code text-xs text-gray-300">
              TIME: <span className="font-display font-bold text-sm text-[#ffe600]">{timeLeft}s</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 font-mono-code text-xs text-gray-300">
              SCORE: <span className="font-display font-bold text-sm text-white">{score}</span>
            </div>
          </div>

          <div className="relative w-full h-72 rounded-xl bg-neutral-950 border border-dashed border-neutral-800 overflow-hidden mb-5 flex items-center justify-center">
            {!isPlaying && !gameWon && (
              <button
                onClick={startGame}
                className="px-6 py-3 bg-[#ffe600] text-black font-display font-black text-xs uppercase tracking-wider rounded-lg border border-black hover:bg-white transition-colors"
              >
                START CHALLENGE
              </button>
            )}

            {isPlaying && (
              <>
                {nodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => popNode(n.id)}
                    className={`absolute rounded-xl flex items-center justify-center font-mono-code font-black text-xs transition-transform active:scale-75 ${
                      n.badge.border || 'border border-black'
                    }`}
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      width: `${n.size}px`,
                      height: `${n.size}px`,
                      backgroundColor: n.badge.bg,
                      color: n.badge.text,
                    }}
                  >
                    {n.badge.label}
                  </button>
                ))}
              </>
            )}

            {gameWon && (
              <div className="p-5 text-center">
                <Trophy className="w-10 h-10 text-[#ffe600] mx-auto mb-2 animate-bounce" />
                <h4 className="font-display font-bold text-lg text-white mb-1">RECORD QUALIFIED</h4>
                <p className="font-mono-code text-xs text-gray-400 mb-4">
                  Score {score} achieved. Priority access unlocked.
                </p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.laser();
                      onOpenCampaignModal();
                    }}
                    className="px-4 py-2 bg-[#ffe600] text-black font-display font-black text-xs uppercase rounded-lg border border-black"
                  >
                    SUBMIT INQUIRY
                  </button>
                  <button
                    onClick={startGame}
                    className="px-3.5 py-2 bg-neutral-900 text-gray-300 font-mono-code text-xs rounded-lg border border-neutral-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    RETRY
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
