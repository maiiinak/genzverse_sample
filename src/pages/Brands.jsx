import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CAPABILITIES } from '../data/services';
import { CASE_STUDIES } from '../data/caseStudies';

const BRAND_CLIENTS = [
  'Samsung', 'Dell Alienware', 'Asus ROG', 'Royal Enfield',
  'EatSure', 'Gemini AI', 'HP Omen', 'Bombay Shaving Co.',
  'ITC Yippee!', 'ISPL', 'Jio Blast', 'Sunrise Spices',
  'Coffee King', 'Super Sandwich', 'District App', 'Zuno',
];

const FEATURED = CASE_STUDIES.slice(0, 6);

export default function Brands() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1 border border-[#0066ff] font-mono-code text-[10px] font-bold text-[#0066ff] uppercase tracking-widest mb-6 rounded">
            // FOR BRANDS & MARKETING TEAMS
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none mb-6">
                YOUR BRAND.<br />
                <span className="text-[#0066ff]">THEIR CULTURE.</span>
              </h1>
              <p className="font-mono-code text-sm text-gray-400 leading-relaxed mb-8">
                We give brands direct access to 1,00,000+ campus ambassadors, 2,000+ verified student creators, and on-ground activation networks across 200+ Indian universities. Zero bots. Zero fake metrics. Real student reach.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="px-6 py-4 bg-[#0066ff] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#0066ff] hover:bg-white hover:text-[#0066ff] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-white"
                >
                  START A CAMPAIGN
                </Link>
                <Link
                  to="/work"
                  className="px-6 py-4 bg-transparent text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-white hover:border-[#0066ff] hover:text-[#0066ff] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
                >
                  SEE OUR WORK
                </Link>
              </div>
            </div>

            {/* Stats Side */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '1,00,000+', label: 'Campus Ambassadors', accent: true },
                { num: '2,000+', label: 'Verified Creators', accent: false },
                { num: '200+', label: 'Colleges Pan-India', accent: false },
                { num: '18', label: 'Brand Campaigns', accent: true },
              ].map((stat, i) => (
                <div key={i} className={`p-5 rounded-xl border ${stat.accent ? 'border-[#0066ff] bg-[#0066ff]/5' : 'border-neutral-800 bg-black'}`}>
                  <div className={`font-bebas text-4xl ${stat.accent ? 'text-[#0066ff]' : 'text-white'} leading-none mb-1`}>{stat.num}</div>
                  <div className="font-mono-code text-[10px] text-gray-400 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// WHAT WE DO</div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white">
              SIX PILLARS OF<br/><span className="text-[#0066ff]">YOUTH REACH</span>
            </h2>
          </div>

          <div className="space-y-0">
            {BRAND_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.num}
                className="grid grid-cols-12 gap-4 py-6 border-b border-neutral-900 hover:bg-neutral-900/30 transition-colors group px-2"
              >
                <div className="col-span-1 font-bebas text-5xl text-neutral-700 group-hover:text-[#0066ff] transition-colors">
                  {cap.num}
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase group-hover:text-[#0066ff] transition-colors">
                    {cap.title}
                  </h3>
                </div>
                <div className="col-span-6 sm:col-span-5 flex items-center">
                  <p className="font-mono-code text-xs text-gray-400 leading-relaxed">{cap.desc}</p>
                </div>
                <div className="col-span-12 sm:col-span-2 flex items-center justify-start sm:justify-end">
                  <span className="inline-block px-2.5 py-1 rounded border border-[#0066ff]/40 bg-[#0066ff]/5 font-mono-code text-[9px] text-[#0066ff] font-bold uppercase">
                    {cap.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Wall */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// BRANDS WE'VE MOVED</div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white">
              INDUSTRY LEADERS<br/><span className="text-[#0066ff]">TRUST US</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {BRAND_CLIENTS.map((brand) => (
              <div
                key={brand}
                className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-black hover:border-[#0066ff] hover:text-[#0066ff] transition-colors font-display font-bold text-sm text-gray-300 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// RECENT WORK</div>
              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-white">
                PROVEN RESULTS
              </h2>
            </div>
            <Link
              to="/work"
              className="font-mono-code text-xs font-bold text-[#0066ff] hover:underline uppercase"
            >
              VIEW ALL 18 CAMPAIGNS →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((study) => (
              <div
                key={study.id}
                className="p-5 rounded-2xl border border-neutral-800 bg-black hover:border-[#0066ff] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-base text-white">{study.brand}</span>
                  <span className="px-2 py-0.5 rounded bg-[#0066ff] text-white font-mono-code text-[9px] font-bold uppercase">{study.category}</span>
                </div>
                <p className="font-mono-code text-xs text-gray-400 mb-4 leading-relaxed">{study.tagline}</p>
                <div className="mb-4">
                  <div className="font-bebas text-4xl text-[#0066ff]">{study.metric}</div>
                  <div className="font-mono-code text-[10px] text-gray-500 uppercase">{study.metricLabel}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[9px] text-gray-600 uppercase">{study.territory}</span>
                  <Link
                    to={`/work/${study.slug}`}
                    className="font-mono-code text-[10px] font-bold text-[#0066ff] hover:underline uppercase"
                  >
                    VIEW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">// READY TO REACH GEN Z?</div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white mb-4">
            LET'S BUILD<br/><span className="text-[#0066ff]">SOMETHING MOVING.</span>
          </h2>
          <p className="font-mono-code text-sm text-gray-400 mb-8">
            Tell us about your brand and target audience. Our team will put together a custom campus strategy within 48 hours.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-[#0066ff] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#0066ff] hover:bg-white hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            START A CAMPAIGN →
          </Link>
        </div>
      </section>
    </div>
  );
}
