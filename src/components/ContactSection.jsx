import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import MagneticText from './MagneticText';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    notes: '',
    category: 'Brand Campaign',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.success();
    confetti({
      particleCount: 50,
      spread: 70,
      colors: ['#ffe600', '#ffffff'],
    });
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="relative pt-16 pb-10 px-4 sm:px-6 z-10 bg-[#050505]">
      {/* High-Contrast Ticker Marquee */}
      <div className="w-full overflow-hidden bg-black py-2.5 border-y-2 border-[#ffe600] mb-14">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-display font-black text-white text-xs sm:text-sm uppercase tracking-wider">
          <span className="text-[#ffe600]">200+ COLLEGES PAN-INDIA</span>
          <span>//</span>
          <span>CAMPUS MOVEMENTS</span>
          <span>//</span>
          <span className="text-[#ffe600]">ZERO BOT TRAFFIC</span>
          <span>//</span>
          <span>AUTHENTIC STUDENT ACTIVATIONS</span>
          <span>//</span>
          <span className="text-[#ffe600]">200+ COLLEGES PAN-INDIA</span>
          <span>//</span>
          <span>CAMPUS MOVEMENTS</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-[#ffe600] font-mono-code text-xs text-[#ffe600] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TRANSMIT DISPATCH</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
              <MagneticText tag="span" className="block">INITIATE A</MagneticText>
              <MagneticText tag="span" className="block text-[#ffe600]" intensity={1.3}>CAMPUS TAKEOVER</MagneticText>
            </h2>

            <p className="text-gray-300 font-mono-code text-xs sm:text-sm leading-relaxed mb-6">
              Connect directly with our campus operations network to plan custom festival sponsorships, creator campaigns, or student community guilds.
            </p>

            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-gray-300 font-mono-code text-xs">
              <MapPin className="w-4 h-4 text-[#ffe600] shrink-0" />
              <span>Coverage: 200+ Premier Engineering, Management & Arts Colleges Across India</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#ffe600] mx-auto mb-3 animate-bounce" />
                  <h3 className="font-display font-black text-xl text-white mb-1">TRANSMISSION SENT</h3>
                  <p className="font-mono-code text-xs text-gray-300 max-w-sm mx-auto mb-5">
                    Your campaign brief has been delivered to our campus coordination squad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 bg-[#ffe600] text-black font-display font-bold text-xs uppercase rounded-lg border border-black"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 font-mono-code text-xs">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {['Brand Campaign', 'Student Squad'].map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => {
                          soundFx.pop();
                          setFormData({ ...formData, category: cat });
                        }}
                        className={`p-2 rounded-lg font-bold border transition-all ${
                          formData.category === cat
                            ? 'bg-[#ffe600] text-black border-black font-black'
                            : 'bg-neutral-900 text-gray-400 border-neutral-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold uppercase mb-1">
                      Brand / College Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Dell / IIT Delhi / Startup"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold uppercase mb-1">
                      Campaign Goals & Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify your target universities, student timeline, or goals..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ffe600] hover:bg-[#fff04d] text-black font-display font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black brutal-shadow-white flex items-center justify-center gap-2 transition-all mt-2"
                  >
                    <span>TRANSMIT CAMPAIGN INQUIRY</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-code text-[11px] text-gray-500">
          <div>© 2026 GENZVERSE. India's Leading Student Marketing Ecosystem.</div>
          <button
            onClick={() => {
              soundFx.warp();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#ffe600] hover:underline uppercase"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
