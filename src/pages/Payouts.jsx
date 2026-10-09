import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDENT_PAYOUTS, formatINR, TOTAL_PAYOUTS_DISBURSED } from '../data/payouts';

export default function Payouts() {
  const [sortBy, setSortBy] = useState('rank');
  const [search, setSearch] = useState('');

  const sorted = [...STUDENT_PAYOUTS]
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'city') return a.city.localeCompare(b.city);
      return a.rank - b.rank;
    });

  const top3 = STUDENT_PAYOUTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 border border-[#e8006f] font-mono-code text-[10px] font-bold text-[#e8006f] uppercase tracking-widest mb-5 rounded">
            // VERIFIED PAYOUT LEADERBOARD
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none mb-4">
            REAL WORK.<br />
            <span className="text-[#e8006f]">REAL PAYOUTS.</span>
          </h1>
          <p className="font-mono-code text-sm text-gray-400 max-w-lg mx-auto">
            Verified student payouts, ranked by amount. Every rupee listed here was earned by a real student through a real Genzverse campaign.
          </p>
        </div>

        {/* Total Disbursed Banner */}
        <div className="p-5 rounded-2xl border-2 border-[#e8006f] bg-black mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-mono-code text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total Disbursed to Students</div>
            <div className="font-bebas text-5xl text-[#e8006f]">{formatINR(TOTAL_PAYOUTS_DISBURSED)}</div>
          </div>
          <div className="text-right">
            <div className="font-mono-code text-[10px] text-gray-400 uppercase tracking-widest mb-1">Verified Earners</div>
            <div className="font-bebas text-5xl text-white">{STUDENT_PAYOUTS.length}</div>
          </div>
          <div className="text-right">
            <div className="font-mono-code text-[10px] text-gray-400 uppercase tracking-widest mb-1">Highest Single Payout</div>
            <div className="font-bebas text-5xl text-white">{formatINR(STUDENT_PAYOUTS[0].amount)}</div>
          </div>
        </div>

        {/* Top 3 Hall of Fame */}
        <div className="mb-16">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-5">// TOP EARNERS</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {top3.map((student, i) => (
              <div
                key={student.rank}
                className={`p-5 rounded-2xl border-2 ${i === 0 ? 'border-[#e8006f] bg-[#e8006f]/5' : 'border-neutral-800 bg-black'}`}
              >
                <div className={`font-bebas text-6xl ${i === 0 ? 'text-[#e8006f]' : 'text-white'} leading-none mb-2`}>
                  0{student.rank}
                </div>
                <div className="font-display font-black text-xl text-white mb-0.5">{student.name}</div>
                <div className="font-bebas text-3xl text-[#e8006f] mb-1">{formatINR(student.amount)}</div>
                <div className="font-mono-code text-[10px] text-gray-400 uppercase">{student.city}</div>
                <div className="mt-3 inline-block px-2 py-0.5 rounded bg-[#e8006f] text-white font-mono-code text-[9px] font-black uppercase">
                  VERIFIED PAYOUT
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="search"
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-[#e8006f] focus:ring-1 focus:ring-[#e8006f] rounded-lg text-white font-mono-code text-xs outline-none"
          />
          <div className="flex gap-2">
            {[['rank', 'BY RANK'], ['amount', 'BY AMOUNT'], ['city', 'BY CITY']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setSortBy(val)}
                className={`px-3 py-2 rounded-lg font-mono-code text-[10px] font-bold uppercase border transition-all focus:outline-none focus:ring-2 focus:ring-[#e8006f] ${sortBy === val ? 'bg-[#e8006f] text-white border-[#e8006f]' : 'bg-black text-gray-400 border-neutral-700 hover:border-white'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="rounded-2xl border border-neutral-800 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-0 bg-neutral-900 border-b border-neutral-800 px-4 py-3">
            <div className="col-span-1 font-mono-code text-[9px] text-gray-500 uppercase font-bold">#</div>
            <div className="col-span-4 font-mono-code text-[9px] text-gray-500 uppercase font-bold">Name</div>
            <div className="col-span-3 font-mono-code text-[9px] text-gray-500 uppercase font-bold">Payout</div>
            <div className="col-span-2 font-mono-code text-[9px] text-gray-500 uppercase font-bold">City</div>
            <div className="col-span-2 font-mono-code text-[9px] text-gray-500 uppercase font-bold hidden sm:block">Status</div>
          </div>

          {sorted.map((student, idx) => (
            <div
              key={student.rank}
              className={`grid grid-cols-12 gap-0 px-4 py-3.5 border-b border-neutral-900 hover:bg-neutral-900/50 transition-colors ${idx % 2 === 0 ? 'bg-black' : 'bg-[#0a0a0a]'}`}
            >
              <div className="col-span-1 font-bebas text-xl text-gray-600">{String(student.rank).padStart(2, '0')}</div>
              <div className="col-span-4">
                <div className="font-display font-bold text-sm text-white">{student.name}</div>
                <div className="font-mono-code text-[9px] text-gray-500">{student.role}</div>
              </div>
              <div className="col-span-3">
                <div className="font-bebas text-xl text-[#e8006f]">{formatINR(student.amount)}</div>
              </div>
              <div className="col-span-2">
                <div className="font-mono-code text-[10px] text-gray-400">{student.city}</div>
              </div>
              <div className="col-span-2 hidden sm:flex items-center">
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#e8006f]/10 border border-[#e8006f]/30 font-mono-code text-[8px] text-[#e8006f] font-bold uppercase">
                  Verified
                </span>
              </div>
            </div>
          ))}

          {sorted.length === 0 && (
            <div className="py-12 text-center font-mono-code text-sm text-gray-500">No results found.</div>
          )}
        </div>

        {/* Mobile: stacked cards for small screens - shown only on xs */}
        <div className="mt-6 sm:hidden space-y-3">
          {sorted.map((student) => (
            <div key={student.rank + '-mob'} className="p-4 rounded-xl border border-neutral-800 bg-black">
              <div className="flex items-center justify-between mb-1">
                <div className="font-display font-bold text-white">{student.name}</div>
                <div className="font-bebas text-lg text-[#e8006f]">{formatINR(student.amount)}</div>
              </div>
              <div className="flex items-center justify-between font-mono-code text-[9px] text-gray-500">
                <span>{student.city}</span>
                <span className="text-[#e8006f]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-black border-2 border-[#e8006f] text-center">
          <div className="font-mono-code text-[10px] text-gray-500 uppercase mb-3">// ZERO FEES TO JOIN</div>
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white mb-2">
            YOUR NAME COULD BE <span className="text-[#e8006f]">ON THIS LIST.</span>
          </h2>
          <p className="font-mono-code text-sm text-gray-400 mb-6">
            Joining Genzverse is 100% free. Start earning through real brand campaigns.
          </p>
          <Link
            to="/join-now"
            className="inline-block px-8 py-4 bg-[#e8006f] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            JOIN THE COMMUNITY
          </Link>
        </div>
      </div>
    </div>
  );
}
