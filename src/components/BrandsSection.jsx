import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { soundFx } from '../utils/audio';
import MagneticText from './MagneticText';
import Brand3DDeviceViewer from './Brand3DDeviceViewer';

const BRAND_STUDIES = [
  {
    id: 'samsung',
    brand: 'SAMSUNG',
    tagline: 'Galaxy Campus Creator Squad',
    category: 'Creator Collabs',
    stats: [
      { label: 'Campus Creators', val: '240+' },
      { label: 'UGC Impressions', val: '18.4M' },
    ],
    description:
      'Deployed student creators across premier engineering colleges to showcase Galaxy flagship devices during inter-college festivals.',
  },
  {
    id: 'dell',
    brand: 'DELL ALIENWARE',
    tagline: 'Inter-College Esports Battleground',
    category: 'Esports & Tech',
    stats: [
      { label: 'Tournament Entries', val: '8,200+' },
      { label: 'Live Fest Footfall', val: '65,000+' },
    ],
    description:
      'Executed high-voltage Alienware gaming arenas inside top college auditoriums with live student shoutcasters and inter-college tournaments.',
  },
  {
    id: 'royalenfield',
    brand: 'ROYAL ENFIELD',
    tagline: 'Hunter 350 Campus Takeovers',
    category: 'Campus Takeovers',
    stats: [
      { label: 'Test Rides Booked', val: '14,800+' },
      { label: 'Campuses Covered', val: '65+' },
    ],
    description:
      'Transformed festival arenas into custom garage zones featuring student showcases and on-spot campus test rides.',
  },
  {
    id: 'eatsure',
    brand: 'EATSURE',
    tagline: 'Midnight Exam Cravings Campaign',
    category: 'Creator Collabs',
    stats: [
      { label: 'App Installs', val: '42,000+' },
      { label: 'Midnight Orders', val: '89,000+' },
    ],
    description:
      'Activated hostel networks and study hubs during mid-terms with hyper-local campus food discount drops.',
  },
  {
    id: 'asus',
    brand: 'ASUS ROG',
    tagline: 'Campus Gaming Guilds & Hubs',
    category: 'Esports & Tech',
    stats: [
      { label: 'Active Guilds', val: '45 Campuses' },
      { label: 'Discord Members', val: '28,000+' },
    ],
    description:
      'Established official ROG student chapters run by verified campus leads conducting weekly gaming sessions and workshops.',
  },
  {
    id: 'gemini',
    brand: 'GEMINI AI',
    tagline: 'Student Developer Societies',
    category: 'Campus Takeovers',
    stats: [
      { label: 'Hackathons Sponsored', val: '30+' },
      { label: 'API Keys Activated', val: '19,500+' },
    ],
    description:
      'Empowered campus coding clubs with developer masterclasses, hackathon bounties, and student ambassador networks across India.',
  },
];

export default function BrandsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Campus Takeovers', 'Esports & Tech', 'Creator Collabs'];

  const filtered = activeFilter === 'All'
    ? BRAND_STUDIES
    : BRAND_STUDIES.filter((b) => b.category === activeFilter);

  return (
    <section id="brands" className="relative py-20 px-4 sm:px-6 z-10 bg-[#050505]/95">
      {/* High-Contrast Yellow Ticker Marquee */}
      <div className="w-full overflow-hidden bg-[#ffe600] py-3 border-y-2 border-black mb-16 brutal-shadow-black">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-display font-black text-black text-base uppercase tracking-wider">
          <span>SAMSUNG</span>
          <span>//</span>
          <span>DELL ALIENWARE</span>
          <span>//</span>
          <span>ROYAL ENFIELD</span>
          <span>//</span>
          <span>EATSURE</span>
          <span>//</span>
          <span>ASUS ROG</span>
          <span>//</span>
          <span>GEMINI AI</span>
          <span>//</span>
          <span>200+ COLLEGES</span>
          <span>//</span>
          <span>INDIA'S #1 STUDENT NETWORK</span>
          <span>//</span>
          <span>SAMSUNG</span>
          <span>//</span>
          <span>DELL ALIENWARE</span>
          <span>//</span>
          <span>ROYAL ENFIELD</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#ffe600] font-mono-code text-xs text-[#ffe600] font-bold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>GLOBAL BRAND PARTNERS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            <MagneticText tag="span" className="block">TRUSTED BY THE</MagneticText>
            <MagneticText tag="span" className="block text-[#ffe600]" intensity={1.2}>INDUSTRY LEADERS</MagneticText>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.pop();
                  setActiveFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg font-mono-code text-xs font-bold uppercase transition-all ${
                  activeFilter === cat
                    ? 'bg-[#ffe600] text-black border-2 border-black brutal-shadow-white'
                    : 'bg-black text-gray-300 border border-gray-700 hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study) => (
            <div
              key={study.id}
              onClick={() => soundFx.pop()}
              className="p-5 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-lg text-white">
                    {study.brand}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffe600] text-black font-mono-code text-[10px] font-black uppercase">
                    VERIFIED
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-[#ffe600] mb-2">
                  {study.tagline}
                </h3>

                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* 3D Interactive Device / Laptop / Asset Viewport */}
                <Brand3DDeviceViewer brandId={study.id} />
              </div>

              <div className="pt-3 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-2 text-center">
                  {study.stats.map((s, idx) => (
                    <div key={idx} className="p-1.5 rounded-lg bg-neutral-950 border border-gray-800">
                      <div className="font-display font-bold text-xs text-white">
                        {s.val}
                      </div>
                      <div className="font-mono-code text-[9px] text-gray-400 font-bold uppercase">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
