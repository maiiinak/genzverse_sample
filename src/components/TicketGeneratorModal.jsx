import React, { useState } from 'react';
import { X, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

const BADGES = ['MAIN CHARACTER', 'CAMPUS LEAD', 'HUSTLE SQUAD', 'AI BUILDER', 'FEST COORDINATOR'];

export default function TicketGeneratorModal({ isOpen, onClose }) {
  const [userName, setUserName] = useState('Ananya Sen');
  const [college, setCollege] = useState('IIT Bombay');
  const [selectedBadge, setSelectedBadge] = useState(BADGES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    soundFx.coin();
    setCopied(true);
    navigator.clipboard?.writeText?.(window.location.href);
    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#ffe600', '#ffffff'],
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-black border-2 border-[#ffe600] brutal-shadow-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            soundFx.pop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-[#ffe600] text-black font-mono-code font-black text-xs uppercase rounded-md mb-2">
            OFFICIAL CARNIVAL CREDENTIAL
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
            GENZVERSE <span className="text-[#ffe600]">VIP PASS GENERATOR</span>
          </h3>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-[#ffe600] brutal-shadow-white mb-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4">
            <div>
              <div className="font-display font-black text-lg text-[#ffe600] tracking-wider">
                GENZVERSE FESTIVAL PASS
              </div>
              <div className="font-mono-code text-[11px] text-gray-300 font-bold">
                PAN-INDIA 2026 // ACCESS LEVEL: ALL-ARENA VIP
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#ffe600] text-black font-mono-code text-[10px] font-black uppercase">
              {selectedBadge}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs">
            <div>
              <span className="text-gray-500 uppercase block text-[10px]">Pass Holder</span>
              <span className="font-bold text-white text-sm sm:text-base">{userName || 'Your Name'}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase block text-[10px]">Campus Hub</span>
              <span className="font-bold text-[#ffe600] text-sm sm:text-base">{college || 'Your College'}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase block text-[10px]">Pass ID</span>
              <span className="font-bold text-white text-sm sm:text-base">#GZ-2026-X99</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-dashed border-neutral-800 flex items-center justify-between">
            <div className="font-mono-code text-[9px] text-gray-600 tracking-widest uppercase">
              ||| | ||||| || |||| ||| |||||| || | ||| |||||
            </div>
            <span className="font-mono-code text-[10px] text-[#ffe600] font-bold">
              VERIFIED GENZVERSE PASS
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono-code text-xs text-gray-300 font-bold uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono-code text-xs focus:border-[#ffe600] outline-none"
              />
            </div>
            <div>
              <label className="block font-mono-code text-xs text-gray-300 font-bold uppercase mb-1">
                College / Organization
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white font-mono-code text-xs focus:border-[#ffe600] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono-code text-xs text-gray-300 font-bold uppercase mb-1">
              Select Your Credential Badge
            </label>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    soundFx.pop();
                    setSelectedBadge(b);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono-code text-[11px] font-bold border transition-all ${
                    selectedBadge === b
                      ? 'bg-[#ffe600] text-black border-black font-black'
                      : 'bg-neutral-950 text-gray-300 border-neutral-700 hover:border-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-[#ffe600] text-black font-display font-black text-xs uppercase rounded-xl border-2 border-black brutal-shadow-white hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'PASS LINK COPIED' : 'SHARE VIP PASS'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.pop();
              onClose();
            }}
            className="px-6 py-3 bg-neutral-900 text-gray-300 font-mono-code text-xs font-bold uppercase rounded-xl border border-neutral-700 hover:border-white"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
