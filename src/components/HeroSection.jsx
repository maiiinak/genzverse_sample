import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';
import MagneticText from './MagneticText';

// ─── IMAGE PLACEHOLDER ──────────────────────────────────────────────────────
// Replace this component's inner content when you have real photos/assets.
// The slot accepts a label so you know what goes there in production.
function ImgSlot({ label = 'IMAGE', className = '', aspectRatio = '4/3' }) {
  return (
    <div
      className={`img-placeholder rounded-2xl overflow-hidden relative ${className}`}
      style={{ aspectRatio }}
    >
      <div className="flex flex-col items-center gap-2 text-center px-4">
        <div className="w-8 h-px bg-[#333]" />
        <span className="text-[#444] font-mono-code text-[10px] font-bold">{label}</span>
        <div className="w-8 h-px bg-[#333]" />
      </div>
    </div>
  );
}

export default function HeroSection({ onOpenCampaignModal, onOpenAmbassadorModal }) {
  return (
    <section className="relative min-h-screen pt-28 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Top Tagline Banner ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black border-2 border-[#ffe600] font-mono-code text-xs font-bold text-[#ffe600] brutal-shadow-white">
            <span className="w-2 h-2 rounded-full bg-[#ffe600] animate-ping shrink-0" />
            <span>INDIA'S #1 STUDENT MARKETING ECOSYSTEM</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black border-2 border-white font-mono-code text-xs font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            <span>200+ CAMPUSES ACROSS INDIA</span>
          </div>
        </div>

        {/* ── Main Hero Grid: 50/50 on Desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">

          {/* LEFT — Hero Copy */}
          <div className="flex flex-col justify-center">
            {/* Main Headline with Magnetic Effect */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.02] mb-6">
              <MagneticText tag="span" className="block text-white">WE BUILD</MagneticText>
              <MagneticText tag="span" className="block text-[#ffe600] glow-yellow" intensity={1.4}>
                CAMPUS MOVEMENTS
              </MagneticText>
            </h1>

            <p className="text-gray-300 font-mono-code text-sm leading-relaxed mb-7 border-l-4 border-[#ffe600] pl-4">
              Direct on-ground activations, creator networks, and verified student actions for global brands across 200+ Indian universities.
            </p>

            {/* Trust Points */}
            <div className="space-y-2.5 mb-8 font-mono-code text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffe600] shrink-0" />
                <span>Zero bot traffic — 100% verified campus reach</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffe600] shrink-0" />
                <span>Inter-college festival sponsorships and on-ground stunts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffe600] shrink-0" />
                <span>Over ₹1,69,107+ paid to top student ambassadors</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { soundFx.laser(); onOpenCampaignModal(); }}
                className="flex-1 py-4 bg-[#ffe600] hover:bg-white text-black font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-black brutal-shadow-white flex items-center justify-center gap-2 transition-colors"
              >
                <span>LAUNCH BRAND CAMPAIGN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { soundFx.pop(); onOpenAmbassadorModal(); }}
                className="flex-1 py-4 bg-black hover:bg-neutral-900 text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-white brutal-shadow-yellow flex items-center justify-center gap-2 transition-colors"
              >
                <span>JOIN STUDENT SQUAD</span>
              </button>
            </div>
          </div>

          {/* RIGHT — Image / Mascot / Asset Slot */}
          {/* REPLACE THIS SLOT with your 3D mascot or hero photo later */}
          <div className="flex flex-col gap-4">
            <ImgSlot
              label="HERO MASCOT / 3D ASSET — REPLACE ME"
              className="w-full"
              aspectRatio="1/1"
            />
          </div>
        </div>

        {/* ── Bottom Metrics Bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white overflow-hidden">
          {[
            { val: '200+', label: 'Colleges Pan-India', yellow: true },
            { val: '₹1.69L+', label: 'Top Student Payout', yellow: false },
            { val: '50M+', label: 'Organic Student Reach', yellow: true },
            { val: '100%', label: 'Verified Actions', yellow: false },
          ].map((stat, i, arr) => (
            <div
              key={i}
              className={`p-5 text-center ${i < arr.length - 1 ? 'border-r border-neutral-800' : ''}`}
            >
              <MagneticText
                tag="div"
                className={`font-display font-black text-2xl sm:text-3xl ${stat.yellow ? 'text-[#ffe600]' : 'text-white'}`}
                intensity={0.6}
              >
                {stat.val}
              </MagneticText>
              <div className="font-mono-code text-[10px] text-gray-400 font-bold uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
