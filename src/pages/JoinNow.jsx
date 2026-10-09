import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const INITIAL = {
  // Step 1
  name: '', age: '', college: '', year: '1st Year', city: '',
  // Step 2
  stream: '', phone: '', email: '', instagram: '', superpower: 'Campus Ambassador',
  heard: 'Instagram', why: '',
};

function validate1(data) {
  const errs = {};
  if (!data.name.trim() || data.name.trim().length < 2) errs.name = 'Full name must be at least 2 characters.';
  const age = Number(data.age);
  if (!data.age || isNaN(age) || age < 15 || age > 30) errs.age = 'Age must be between 15 and 30.';
  if (!data.college.trim()) errs.college = 'College or university name is required.';
  if (!data.city.trim()) errs.city = 'City is required.';
  return errs;
}

function validate2(data) {
  const errs = {};
  if (!data.phone || !/^\d{10}$/.test(data.phone)) errs.phone = 'WhatsApp number must be exactly 10 digits.';
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address.';
  return errs;
}

function FieldError({ id, msg }) {
  if (!msg) return null;
  return <p id={`${id}-error`} className="mt-1 font-mono-code text-[10px] text-red-400" role="alert">{msg}</p>;
}

export default function JoinNow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => {
    setData((d) => ({ ...d, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const errs = validate1(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate2(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass = (id) =>
    `w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white font-mono-code text-xs outline-none focus:ring-1 transition-colors ${
      errors[id] ? 'border-red-500 focus:ring-red-500' : 'border-neutral-700 focus:border-[#e8006f] focus:ring-[#e8006f]'
    }`;

  const labelClass = 'block font-mono-code text-[10px] font-bold text-gray-400 uppercase mb-1.5';

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-lg w-full text-center">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-0 mb-12">
            {['APPLICATION SUBMITTED', 'TEAM REVIEW', 'WHATSAPP ONBOARDING'].map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#e8006f] text-white font-bebas text-lg flex items-center justify-center">{i + 1}</div>
                  <div className="font-mono-code text-[8px] text-gray-500 uppercase text-center max-w-[80px]">{label}</div>
                </div>
                {i < 2 && <div className="w-10 sm:w-16 h-px bg-[#e8006f]/40 mx-1 mb-5" />}
              </React.Fragment>
            ))}
          </div>

          <div className="p-8 rounded-2xl border-2 border-[#e8006f] bg-[#e8006f]/5">
            <div className="font-bebas text-7xl text-[#e8006f] leading-none mb-3">DONE.</div>
            <h1 className="font-display font-black text-2xl uppercase text-white mb-3">APPLICATION RECEIVED!</h1>
            <p className="font-mono-code text-sm text-gray-400 leading-relaxed mb-8">
              You have successfully registered on our portal. Our student leaders and operations team review applications daily and will reach out to you via WhatsApp shortly!
            </p>
            <a
              href="https://wa.me/919316106151"
              target="_blank"
              rel="noreferrer"
              className="w-full block py-4 bg-[#e8006f] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors text-center focus:outline-none focus:ring-2 focus:ring-white"
            >
              PING US ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">

        {/* Progress Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-[#e8006f]' : 'bg-neutral-800'}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-[#e8006f]' : 'bg-neutral-800'}`} />
          <span className="font-mono-code text-[10px] text-gray-500 uppercase shrink-0">STEP {step} / 2</span>
        </div>

        <div className="font-mono-code text-[10px] font-bold text-[#e8006f] uppercase tracking-widest mb-3">
          {step === 1 ? '// ABOUT YOU' : '// YOUR SUPERPOWER'}
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-2">
          {step === 1 ? 'JOIN THE ECOSYSTEM.' : 'ALMOST DONE.'}
        </h1>
        <p className="font-mono-code text-xs text-gray-500 mb-8">
          {step === 1 ? 'Joining Genzverse is completely free. No fees, ever.' : 'Just a few more details so we can match you to the right campaigns.'}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleNext} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name *</label>
              <input id="name" type="text" autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} className={inputClass('name')} aria-describedby={errors.name ? 'name-error' : undefined} required />
              <FieldError id="name" msg={errors.name} />
            </div>
            <div>
              <label htmlFor="age" className={labelClass}>Age *</label>
              <input id="age" type="number" min={15} max={30} value={data.age} onChange={(e) => set('age', e.target.value)} className={inputClass('age')} aria-describedby={errors.age ? 'age-error' : undefined} required />
              <FieldError id="age" msg={errors.age} />
            </div>
            <div>
              <label htmlFor="college" className={labelClass}>College / University Name *</label>
              <input id="college" type="text" autoComplete="organization" value={data.college} onChange={(e) => set('college', e.target.value)} className={inputClass('college')} aria-describedby={errors.college ? 'college-error' : undefined} required />
              <FieldError id="college" msg={errors.college} />
            </div>
            <div>
              <label htmlFor="year" className={labelClass}>College Year</label>
              <select id="year" value={data.year} onChange={(e) => set('year', e.target.value)} className={inputClass('year')}>
                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'PhD'].map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>City *</label>
              <input id="city" type="text" autoComplete="address-level2" value={data.city} onChange={(e) => set('city', e.target.value)} className={inputClass('city')} aria-describedby={errors.city ? 'city-error' : undefined} required />
              <FieldError id="city" msg={errors.city} />
            </div>
            <button type="submit" className="w-full py-4 bg-[#e8006f] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white">
              NEXT →
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="stream" className={labelClass}>Subjects / Stream of Study</label>
              <input id="stream" type="text" value={data.stream} onChange={(e) => set('stream', e.target.value)} className={inputClass('stream')} placeholder="e.g. Computer Science, MBA, Commerce..." />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>WhatsApp Number *</label>
              <input id="phone" type="tel" inputMode="numeric" maxLength={10} value={data.phone} onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))} className={inputClass('phone')} aria-describedby={errors.phone ? 'phone-error' : undefined} placeholder="10 digits without country code" required />
              <FieldError id="phone" msg={errors.phone} />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email ID *</label>
              <input id="email" type="email" autoComplete="email" inputMode="email" value={data.email} onChange={(e) => set('email', e.target.value)} className={inputClass('email')} aria-describedby={errors.email ? 'email-error' : undefined} required />
              <FieldError id="email" msg={errors.email} />
            </div>
            <div>
              <label htmlFor="instagram" className={labelClass}>Instagram Handle</label>
              <input id="instagram" type="text" value={data.instagram} onChange={(e) => set('instagram', e.target.value)} className={inputClass('instagram')} placeholder="@yourhandle" />
            </div>
            <div>
              <label htmlFor="superpower" className={labelClass}>Primary Superpower</label>
              <select id="superpower" value={data.superpower} onChange={(e) => set('superpower', e.target.value)} className={inputClass('superpower')}>
                {['Campus Ambassador', 'Content Creator', 'Esports & Gaming', 'Social Media', 'Community Building', 'Research & Analytics', 'Event Management'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="heard" className={labelClass}>How did you hear about us?</label>
              <select id="heard" value={data.heard} onChange={(e) => set('heard', e.target.value)} className={inputClass('heard')}>
                {['Instagram', 'LinkedIn', 'Friend Referral', 'College WhatsApp Group', 'Google Search', 'Other'].map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="why" className={labelClass}>Why do you want to join Genzverse?</label>
              <textarea id="why" rows={3} value={data.why} onChange={(e) => set('why', e.target.value)} className={`${inputClass('why')} resize-none`} placeholder="Tell us what excites you most about joining..." />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex-none px-6 py-4 bg-transparent text-white font-display font-black text-sm uppercase rounded-xl border-2 border-neutral-700 hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                BACK
              </button>
              <button type="submit" className="flex-1 py-4 bg-[#e8006f] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                SUBMIT APPLICATION
              </button>
            </div>
          </form>
        )}

        {/* Zero fee reassurance */}
        <div className="mt-6 p-4 rounded-xl border border-neutral-900 bg-black">
          <p className="font-mono-code text-[10px] text-gray-600 text-center">
            Joining Genzverse is 100% free. We never charge registration, membership, or verification fees.
          </p>
        </div>
      </div>
    </div>
  );
}
