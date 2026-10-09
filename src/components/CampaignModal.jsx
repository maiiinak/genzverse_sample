import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';

export default function CampaignModal({ isOpen, onClose, defaultType = 'Brand' }) {
  const [tab, setTab] = useState(defaultType);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    organization: '',
  });

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-black border-2 border-[#ffe600] brutal-shadow-white max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            soundFx.pop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-900 border border-neutral-700 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-[#ffe600] mx-auto mb-3 animate-bounce" />
            <h3 className="font-display font-black text-xl text-white mb-1">PROPOSAL TRANSMITTED</h3>
            <p className="font-mono-code text-xs text-gray-300 mb-5">
              Our campus squad will review your details and initiate coordination.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-5 py-2 bg-[#ffe600] text-black font-display font-bold text-xs uppercase rounded-lg border border-black"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <span className="inline-block px-2.5 py-0.5 bg-[#ffe600] text-black font-mono-code font-bold text-[10px] uppercase rounded mb-2">
                OFFICIAL PORTAL
              </span>
              <h3 className="font-display font-black text-xl text-white uppercase">
                {tab === 'Brand' ? 'LAUNCH BRAND CAMPAIGN' : 'JOIN STUDENT SQUAD'}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5">
              <button
                onClick={() => {
                  soundFx.pop();
                  setTab('Brand');
                }}
                className={`p-2 rounded-lg font-mono-code text-xs font-bold border transition-all ${
                  tab === 'Brand'
                    ? 'bg-[#ffe600] text-black border-black font-black'
                    : 'bg-neutral-900 text-gray-400 border-neutral-700'
                }`}
              >
                Brand / Agency
              </button>
              <button
                onClick={() => {
                  soundFx.pop();
                  setTab('Student');
                }}
                className={`p-2 rounded-lg font-mono-code text-xs font-bold border transition-all ${
                  tab === 'Student'
                    ? 'bg-[#ffe600] text-black border-black font-black'
                    : 'bg-neutral-900 text-gray-400 border-neutral-700'
                }`}
              >
                Student Squad
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono-code text-xs">
              <div>
                <label className="block text-gray-300 font-bold uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase mb-1">Preferred Contact Handle / ID *</label>
                <input
                  type="text"
                  required
                  placeholder="Email or phone or social handle"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold uppercase mb-1">
                  {tab === 'Brand' ? 'Brand or Agency Name *' : 'College & Year *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tab === 'Brand' ? 'e.g. Dell / Consumer Brand' : 'e.g. BITS Pilani, 3rd Year'}
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-[#ffe600] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#ffe600] hover:bg-[#fff04d] text-black font-display font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black brutal-shadow-white flex items-center justify-center gap-2 transition-all"
              >
                <span>{tab === 'Brand' ? 'SUBMIT BRIEF' : 'SUBMIT APPLICATION'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
