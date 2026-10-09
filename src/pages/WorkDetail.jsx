import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CASE_STUDIES } from '../data/caseStudies';

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const study = CASE_STUDIES.find((s) => s.slug === id);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="font-bebas text-8xl text-[#0066ff] mb-4">404</div>
        <h1 className="font-display font-black text-4xl text-white uppercase mb-2">WRONG CAMPUS.</h1>
        <p className="font-mono-code text-sm text-gray-400 mb-8">That case study doesn't exist or has been archived.</p>
        <Link
          to="/work"
          className="px-6 py-3 bg-[#0066ff] text-white font-display font-bold text-sm uppercase rounded-xl hover:bg-white hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          BACK TO ALL WORK →
        </Link>
      </div>
    );
  }

  const currentIdx = CASE_STUDIES.findIndex((s) => s.slug === id);
  const nextStudy = CASE_STUDIES[(currentIdx + 1) % CASE_STUDIES.length];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono-code text-[10px] text-gray-500 uppercase mb-10">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/work" className="hover:text-white transition-colors">Work</Link>
          <span>/</span>
          <span className="text-[#0066ff]">{study.brand}</span>
        </div>

        {/* Case Study Header */}
        <div className="mb-12 pb-12 border-b border-neutral-900">
          <div className="flex flex-wrap gap-3 items-center mb-5">
            <span className="px-3 py-1 rounded bg-[#0066ff] text-white font-mono-code text-[10px] font-bold uppercase">
              {study.category}
            </span>
            <span className="px-3 py-1 rounded border border-neutral-700 text-gray-400 font-mono-code text-[10px] uppercase">
              {study.territory}
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
            {study.brand}
          </h1>
          <p className="font-display text-lg sm:text-xl text-[#0066ff] font-bold mb-4">{study.title}</p>
          <p className="font-mono-code text-sm text-gray-400 leading-relaxed max-w-2xl">{study.tagline}</p>
        </div>

        {/* Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-xl border-2 border-[#0066ff] bg-[#0066ff]/5">
            <div className="font-bebas text-5xl text-[#0066ff] leading-none mb-1">{study.metric}</div>
            <div className="font-mono-code text-[10px] text-gray-400 uppercase">{study.metricLabel}</div>
          </div>
          {study.secondaryMetric && (
            <div className="p-5 rounded-xl border border-neutral-800 bg-black">
              <div className="font-bebas text-5xl text-white leading-none mb-1">{study.secondaryMetric.split(' ')[0]}</div>
              <div className="font-mono-code text-[10px] text-gray-400 uppercase">{study.secondaryMetric.split(' ').slice(1).join(' ')}</div>
            </div>
          )}
          <div className="p-5 rounded-xl border border-neutral-800 bg-black">
            <div className="font-bebas text-5xl text-neutral-500 leading-none mb-1">{study.territory}</div>
            <div className="font-mono-code text-[10px] text-gray-400 uppercase">Territory</div>
          </div>
        </div>

        {/* Case Study Body */}
        <div className="space-y-10 mb-16">
          {[
            { label: '01 / OBJECTIVE', content: study.objective },
            { label: '02 / WHAT WE DID', content: study.whatWeDid },
            { label: '03 / EXECUTION', content: study.execution },
            { label: '04 / RESULT', content: study.result },
          ].map((section) => (
            <div key={section.label} className="grid grid-cols-12 gap-4 py-8 border-b border-neutral-900">
              <div className="col-span-12 sm:col-span-3">
                <div className="font-mono-code text-[10px] font-bold text-[#0066ff] uppercase tracking-widest">{section.label}</div>
              </div>
              <div className="col-span-12 sm:col-span-9">
                <p className="font-mono-code text-sm text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Slot — ready for client photos */}
        <div className="mb-16 rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-900/30 flex items-center justify-center" style={{ minHeight: '300px' }}>
          <div className="text-center p-8">
            <div className="font-mono-code text-[10px] text-gray-600 uppercase tracking-widest mb-2">// CAMPAIGN IMAGES</div>
            <p className="font-mono-code text-xs text-gray-600">
              Real campaign photos for {study.brand} will be placed here.
            </p>
          </div>
        </div>

        {/* Navigation between case studies */}
        <div className="pt-8 border-t border-neutral-900 flex items-center justify-between">
          <button
            onClick={() => navigate('/work')}
            className="font-mono-code text-xs font-bold text-gray-400 hover:text-white uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
          >
            ← ALL WORK
          </button>
          <Link
            to={`/work/${nextStudy.slug}`}
            className="flex flex-col items-end group"
          >
            <span className="font-mono-code text-[9px] text-gray-500 uppercase mb-1">Next Case Study</span>
            <span className="font-display font-black text-sm text-white group-hover:text-[#0066ff] transition-colors uppercase">
              {nextStudy.brand} →
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
