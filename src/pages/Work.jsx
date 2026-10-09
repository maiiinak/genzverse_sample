import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/caseStudies';

const FILTERS = ['ALL', 'DIGITAL', 'CREATOR', 'CAMPUS', 'GAMING', 'FOOD & BEVERAGE', 'SPORTS', 'ACTIVATION', 'AWARENESS'];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.category.toUpperCase() === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* HERO */}
      <section className="pt-32 pb-16 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1 border border-neutral-700 font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 rounded">
            // SELECTED WORK
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none mb-4">
            WE DON'T JUST REACH GEN Z.<br />
            <span className="text-[#0066ff]">WE MOVE THEM.</span>
          </h1>
          <p className="font-mono-code text-sm text-gray-400 max-w-xl">
            Campaigns, activations, creators and student-led execution across India.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { num: '18', label: 'Campaigns Executed' },
              { num: '5,000+', label: 'Verified Actions (Top)' },
              { num: '200+', label: 'Campuses Activated' },
              { num: 'Pan India', label: 'Coverage' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl border border-neutral-800 bg-black">
                <div className="font-bebas text-4xl text-[#0066ff] leading-none mb-0.5">{stat.num}</div>
                <div className="font-mono-code text-[9px] text-gray-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-6 px-4 sm:px-6 border-b border-neutral-900 sticky top-[60px] bg-[#0a0a0a]/95 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-2 rounded-lg font-mono-code text-[10px] font-bold uppercase border transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066ff] ${
                  activeFilter === filter
                    ? 'bg-[#0066ff] text-white border-[#0066ff]'
                    : 'bg-black text-gray-400 border-neutral-800 hover:border-white hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY GRID */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-20 text-center font-mono-code text-sm text-gray-600">No campaigns in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((study) => (
                <div
                  key={study.id}
                  className="group p-5 rounded-2xl border border-neutral-800 bg-black hover:border-[#0066ff] hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <span className="font-display font-black text-lg text-white leading-tight">{study.brand}</span>
                      <span className="shrink-0 px-2 py-0.5 rounded bg-[#0066ff] text-white font-mono-code text-[9px] font-bold uppercase">
                        {study.category}
                      </span>
                    </div>
                    <p className="font-mono-code text-xs text-gray-400 leading-relaxed mb-5">{study.tagline}</p>
                    <div className="mb-4">
                      <div className="font-bebas text-5xl text-[#0066ff] leading-none">{study.metric}</div>
                      <div className="font-mono-code text-[10px] text-gray-500 uppercase">{study.metricLabel}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
                    <span className="font-mono-code text-[9px] text-gray-600 uppercase">{study.territory}</span>
                    <Link
                      to={`/work/${study.slug}`}
                      className="font-mono-code text-[10px] font-bold text-[#0066ff] group-hover:underline uppercase focus:outline-none focus:ring-2 focus:ring-[#0066ff] rounded"
                    >
                      VIEW CASE STUDY →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16 px-4 sm:px-6 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono-code text-[10px] text-gray-500 uppercase mb-1">// READY TO RUN A CAMPAIGN?</div>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
              WANT TO LAUNCH YOUR OWN?
            </h2>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-8 py-4 bg-[#0066ff] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#0066ff] hover:bg-white hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            START A CAMPAIGN →
          </Link>
        </div>
      </section>
    </div>
  );
}
