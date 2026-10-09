import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDENT_PILLARS } from '../data/services';
import { STUDENT_PAYOUTS, formatINR } from '../data/payouts';
import { VERIFIED_FAQS } from '../data/faqs';

export default function Students() {
  const [activeOpportunity, setActiveOpportunity] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const top3 = STUDENT_PAYOUTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1 border border-[#e8006f] font-mono-code text-[10px] font-bold text-[#e8006f] uppercase tracking-widest mb-6 rounded">
            // FOR STUDENTS
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none mb-6">
                TURN CAMPUS<br />
                INTO <span className="text-[#e8006f]">OPPORTUNITY.</span>
              </h1>
              <p className="font-mono-code text-sm text-gray-400 leading-relaxed mb-8">
                Join a student-first ecosystem built around paid opportunities, brand campaigns, creators, events and career growth. Completely free to join.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/join-now"
                  className="px-6 py-4 bg-[#e8006f] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-white"
                >
                  JOIN GENZVERSE →
                </Link>
                <Link
                  to="/payouts"
                  className="px-6 py-4 bg-transparent text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-white hover:border-[#e8006f] hover:text-[#e8006f] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-[#e8006f]"
                >
                  SEE STUDENT EARNINGS →
                </Link>
              </div>
            </div>
            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '1,00,000+', label: 'Campus Ambassadors', pink: true },
                { num: '2,000+', label: 'Student Creators', pink: false },
                { num: '50+', label: 'Cities Covered', pink: false },
                { num: '₹1,69,107', label: 'Highest Verified Payout', pink: true },
              ].map((stat, i) => (
                <div key={i} className={`p-5 rounded-xl border ${stat.pink ? 'border-[#e8006f] bg-[#e8006f]/5' : 'border-neutral-800 bg-black'}`}>
                  <div className={`font-bebas text-4xl leading-none mb-1 ${stat.pink ? 'text-[#e8006f]' : 'text-white'}`}>{stat.num}</div>
                  <div className="font-mono-code text-[9px] text-gray-400 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// HOW IT WORKS</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-10">THREE SIMPLE STEPS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'APPLY FREE', body: 'Submit your college and social details in under 60 seconds. Zero fees, zero complications. Joining Genzverse is always 100% free.' },
              { num: '02', title: 'GET MATCHED', body: 'Our ops team reviews your profile and matches you with campaigns from Samsung, Royal Enfield, Dell, EatSure and more.' },
              { num: '03', title: 'EARN & GROW', body: 'Complete your missions, earn directly to your UPI account, and build a verified portfolio of real brand work.' },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-2xl border border-neutral-800 bg-black hover:border-[#e8006f] transition-colors">
                <div className="font-bebas text-6xl text-[#e8006f] leading-none mb-3">{step.num}</div>
                <h3 className="font-display font-black text-base uppercase text-white mb-2">{step.title}</h3>
                <p className="font-mono-code text-xs text-gray-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIVE OPPORTUNITIES — Accordion */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// WHAT YOU CAN DO</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-8">FIVE PILLARS</h2>
          <div className="space-y-0">
            {STUDENT_PILLARS.map((pillar) => (
              <div key={pillar.num} className="border-b border-neutral-900">
                <button
                  onClick={() => setActiveOpportunity(activeOpportunity === pillar.num ? null : pillar.num)}
                  aria-expanded={activeOpportunity === pillar.num}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded group"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-bebas text-4xl text-neutral-700 group-hover:text-[#e8006f] transition-colors">{pillar.num}</span>
                    <div>
                      <div className="font-display font-black text-lg uppercase text-white group-hover:text-[#e8006f] transition-colors">{pillar.title}</div>
                      <div className="font-mono-code text-[10px] text-gray-500">{pillar.summary}</div>
                    </div>
                  </div>
                  <span className={`font-mono-code text-xl text-[#e8006f] shrink-0 transition-transform ml-4 ${activeOpportunity === pillar.num ? 'rotate-45' : ''}`}>+</span>
                </button>
                {activeOpportunity === pillar.num && (
                  <div className="pb-6 pl-16 pr-4">
                    <p className="font-mono-code text-xs text-gray-300 leading-relaxed mb-3">{pillar.desc}</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#e8006f]/10 border border-[#e8006f]/30 font-mono-code text-[10px] text-[#e8006f] font-bold uppercase">
                      {pillar.highlight}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HALL OF FAME */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">// VERIFIED PAYOUTS</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-8">
            STUDENTS WHO <span className="text-[#e8006f]">MADE IT HAPPEN.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {top3.map((student, i) => (
              <div key={student.rank} className={`p-6 rounded-2xl border-2 ${i === 0 ? 'border-[#e8006f] bg-[#e8006f]/5' : 'border-neutral-800 bg-black'}`}>
                <div className={`font-bebas text-7xl leading-none mb-2 ${i === 0 ? 'text-[#e8006f]' : 'text-neutral-700'}`}>0{student.rank}</div>
                <div className="font-display font-black text-xl text-white mb-1">{student.name}</div>
                <div className="font-bebas text-3xl text-[#e8006f] mb-1">{formatINR(student.amount)}</div>
                <div className="font-mono-code text-[10px] text-gray-500 uppercase mb-3">{student.city}</div>
                <span className="inline-block px-2 py-0.5 rounded bg-[#e8006f] text-white font-mono-code text-[9px] font-black uppercase">
                  VERIFIED PAYOUT
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/payouts"
            className="inline-block font-mono-code text-xs font-bold text-[#e8006f] border border-[#e8006f]/40 px-5 py-2.5 rounded-xl hover:bg-[#e8006f]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#e8006f] uppercase"
          >
            VIEW FULL LEADERBOARD →
          </Link>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="py-20 px-4 sm:px-6 border-b border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">// ZERO FEES TO JOIN</div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white mb-4">
            READY TO <span className="text-[#e8006f]">GET IN?</span>
          </h2>
          <p className="font-mono-code text-sm text-gray-400 mb-8">
            Opportunities, campaigns, creators, experiences — built around student life.
          </p>
          <Link
            to="/join-now"
            className="inline-block px-10 py-5 bg-[#e8006f] text-white font-display font-black text-base uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            JOIN THE COMMUNITY →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">// COMMON QUESTIONS</div>
          <div className="space-y-0">
            {VERIFIED_FAQS.map((faq, i) => (
              <div key={i} className="border-b border-neutral-900">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  aria-expanded={activeFaq === i}
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded"
                >
                  <span className="font-display font-bold text-sm text-white pr-4">{faq.q}</span>
                  <span className={`font-mono-code text-xl text-[#e8006f] shrink-0 transition-transform ${activeFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {activeFaq === i && (
                  <div className="pb-5">
                    <p className="font-mono-code text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
