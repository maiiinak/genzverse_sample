import React, { useState } from 'react';
import { Flame, Megaphone, Target, Cpu, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';
import MagneticText from './MagneticText';

const SERVICES = [
  {
    id: 'activations',
    title: 'Campus Activations & Sponsorships',
    tagline: 'High-Voltage Experiential College Fest Takeovers',
    icon: Flame,
    features: [
      'High-Footfall Experiential Festival Booths',
      'Inter-College Fest Title Sponsorships',
      'Flash Mobs & Campus Stunts',
      'Full Pan-India College Admin Permissions',
    ],
    metric: '65,000+ Avg Footfall',
  },
  {
    id: 'influencers',
    title: 'Gen Z Influencer Campaigns',
    tagline: 'Hyper-Local Campus Creators with Peer Followings',
    icon: Megaphone,
    features: [
      '500+ Verified Campus Micro-Creators',
      'Authentic Video Reviews & Unboxings',
      'Campus WhatsApp & Discord Community Blasts',
      'Peer-to-Peer Conversion Tactics',
    ],
    metric: '10x Higher Engagement',
  },
  {
    id: 'verified-actions',
    title: 'Targeted Verified Actions',
    tagline: 'Guaranteed App Installs, Signups & Registrations',
    icon: Target,
    features: [
      'Verified College ID Authentication',
      'Live Proof-of-Work Dashboards',
      'Pay-for-Performance Milestones',
      'Hostel-by-Hostel Direct Onboarding',
    ],
    metric: '99.4% Student Accuracy',
  },
  {
    id: 'community-hubs',
    title: 'Student Community Hubs',
    tagline: 'Year-Round Branded Societies on Campus',
    icon: Cpu,
    features: [
      'Campus Ambassador Leadership Network',
      'Monthly Branded Workshops & Hackathons',
      'Exclusive Swag & Early Access Hardware',
      'Direct Pipeline to Top Engineering Talent',
    ],
    metric: 'Permanent Campus Presence',
  },
];

export default function ServicesSection({ onOpenCampaignModal }) {
  const [collegesCount, setCollegesCount] = useState(25);

  const calculateEstimate = () => {
    const baseReach = collegesCount * 18000;
    const baseActions = collegesCount * 450;
    return {
      reach: (baseReach / 1000).toFixed(0) + 'K+',
      actions: baseActions.toLocaleString('en-IN') + '+',
      fests: Math.min(collegesCount, 15),
    };
  };

  const estimates = calculateEstimate();

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 z-10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#ffe600] font-mono-code text-xs text-[#ffe600] font-bold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            <MagneticText tag="span" className="block">FOUR PILLARS OF</MagneticText>
            <MagneticText tag="span" className="block text-[#ffe600]" intensity={1.2}>STUDENT REACH</MagneticText>
          </h2>
          <p className="mt-2 text-gray-300 font-mono-code text-xs sm:text-sm">
            Everything your brand needs to achieve massive engagement across the Indian student demographic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {SERVICES.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-black border-2 border-neutral-800 hover:border-[#ffe600] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#ffe600] text-black flex items-center justify-center font-bold">
                      <IconComponent className="w-5 h-5 text-black" />
                    </div>
                    <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 font-mono-code text-[10px] text-gray-300 font-bold">
                      {srv.metric}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    {srv.title}
                  </h3>
                  <div className="font-mono-code text-xs text-[#ffe600] font-bold uppercase mb-4">
                    // {srv.tagline}
                  </div>

                  <div className="space-y-2 mb-6">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#ffe600] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundFx.laser();
                    onOpenCampaignModal();
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#ffe600] text-black font-display font-black text-xs uppercase tracking-wider border-2 border-black brutal-shadow-white flex items-center justify-center gap-2 hover:bg-white transition-colors"
                >
                  <span>DEPLOY SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Reach Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono-code text-[11px] font-bold text-[#ffe600] uppercase block mb-1">
                // LIVE INTERACTIVE ESTIMATOR
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-white mb-2">
                PROJECT YOUR CAMPUS IMPACT
              </h3>
              <p className="text-gray-400 text-xs font-mono-code mb-5">
                Drag the slider to calculate guaranteed student impressions and verified actions based on campus volume.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center font-mono-code text-xs font-bold text-gray-300">
                  <span>TARGET CAMPUSES:</span>
                  <span className="text-[#ffe600] font-display font-bold text-base">{collegesCount} COLLEGES</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={collegesCount}
                  onChange={(e) => {
                    setCollegesCount(Number(e.target.value));
                    soundFx.pop();
                  }}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ffe600]"
                />
                <div className="flex justify-between text-[10px] font-mono-code text-gray-500">
                  <span>5 Colleges (Tier-1)</span>
                  <span>50 Colleges (Metro Hubs)</span>
                  <span>150+ Colleges (Pan-India)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="space-y-2 mb-4 font-mono-code text-xs">
                <div className="flex justify-between items-center p-2 rounded bg-black">
                  <span className="text-gray-400">Projected Reach:</span>
                  <span className="font-display font-bold text-sm text-[#ffe600]">{estimates.reach}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-black">
                  <span className="text-gray-400">Verified Actions:</span>
                  <span className="font-display font-bold text-sm text-white">{estimates.actions}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-black">
                  <span className="text-gray-400">College Fests:</span>
                  <span className="font-display font-bold text-sm text-[#ffe600]">{estimates.fests} Fests</span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.laser();
                  onOpenCampaignModal();
                }}
                className="w-full py-2.5 bg-[#ffe600] text-black font-display font-black text-xs uppercase tracking-wider rounded-lg border border-black hover:bg-white transition-colors"
              >
                REQUEST PROPOSAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
