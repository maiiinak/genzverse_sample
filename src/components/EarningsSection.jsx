import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, IndianRupee } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function EarningsSection({ onOpenAmbassadorModal }) {
  const [role, setRole] = useState('Fest Ambassador');
  const [hours, setHours] = useState(8);

  const calculateStudentEarning = () => {
    let multiplier = 1200;
    if (role === 'Content Creator') multiplier = 2400;
    if (role === 'Community Lead') multiplier = 3200;

    const baseMonthly = hours * multiplier * 4;
    const festBonuses = hours > 10 ? 35000 : 15000;
    return Math.min(baseMonthly + festBonuses, 185000);
  };

  const estimatedEarnings = calculateStudentEarning();

  return (
    <section id="earnings" className="relative py-20 px-4 sm:px-6 z-10 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#ffe600] font-mono-code text-xs text-[#ffe600] font-bold mb-3">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>STUDENT OPPORTUNITIES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            EARN WHILE YOU LEARN // <br />
            <span className="text-[#ffe600]">₹1,60,000+ TOP PAYOUT</span>
          </h2>
          <p className="mt-2 text-gray-300 font-mono-code text-xs sm:text-sm">
            Join the creator force. Earn competitive payouts collaborating directly with Dell, Samsung, Royal Enfield, and EatSure.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mb-5">
                STUDENT PAYOUT ESTIMATOR
              </h3>

              <div className="space-y-3 mb-5">
                <label className="font-mono-code text-xs font-bold text-gray-300 uppercase">
                  Select Role:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Fest Ambassador', 'Content Creator', 'Community Lead'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        soundFx.pop();
                        setRole(r);
                      }}
                      className={`p-2.5 rounded-lg font-mono-code text-xs font-bold uppercase border transition-all ${
                        role === r
                          ? 'bg-[#ffe600] text-black border-black font-black'
                          : 'bg-neutral-900 text-gray-300 border-neutral-700 hover:border-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center font-mono-code text-xs font-bold text-gray-300">
                  <span>Weekly Commitment:</span>
                  <span className="text-[#ffe600] font-display font-bold text-sm">{hours} Hours / Week</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="2"
                  value={hours}
                  onChange={(e) => {
                    setHours(Number(e.target.value));
                    soundFx.pop();
                  }}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ffe600]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code text-gray-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffe600]" />
                  <span>Instant UPI Transfers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffe600]" />
                  <span>Verified Work Certificate</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-neutral-950 border border-neutral-800 text-center">
              <span className="inline-block px-3 py-1 bg-[#ffe600] text-black font-display font-black text-xs uppercase rounded mb-3">
                ESTIMATED POTENTIAL
              </span>

              <div className="font-display font-black text-3xl sm:text-4xl text-white my-3">
                INR {estimatedEarnings.toLocaleString('en-IN')}*
              </div>

              <p className="text-[10px] font-mono-code text-gray-500 mb-5">
                *Based on active brand missions and performance milestones.
              </p>

              <button
                onClick={() => {
                  soundFx.pop();
                  onOpenAmbassadorModal();
                }}
                className="w-full py-3 bg-[#ffe600] text-black font-display font-black text-xs uppercase tracking-wider rounded-lg border border-black hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>APPLY TO STUDENT SQUAD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="font-display font-black text-2xl text-[#ffe600] mb-1">01</div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Claim Your Spot</h4>
            <p className="text-gray-400 text-xs font-mono-code">
              Submit your college and social details in 60 seconds.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="font-display font-black text-2xl text-white mb-1">02</div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Pick Missions</h4>
            <p className="text-gray-400 text-xs font-mono-code">
              Choose active campaigns from Samsung, Dell, and tech societies.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="font-display font-black text-2xl text-[#ffe600] mb-1">03</div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Direct Transfers</h4>
            <p className="text-gray-400 text-xs font-mono-code">
              Receive verified payouts directly to your UPI account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
