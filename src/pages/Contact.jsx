import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VERIFIED_FAQS } from '../data/faqs';

// Verified contact info from official site
const CONTACT_INFO = {
  phone: '93161-06151',
  whatsapp: '+91 9316106151',
  whatsappLink: 'https://wa.me/919316106151',
  email: 'info@genzverse.space',
  instagram: 'https://instagram.com/genzverse.io',
  linkedin: 'https://linkedin.com/company/genzverse',
  hq: 'Surat, Gujarat',
};

export default function Contact() {
  const [formData, setFormData] = useState({ type: 'Brand Campaign', name: '', organization: '', phone: '', email: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) errs.name = 'Name is required (min 2 characters)';
    if (!formData.organization.trim()) errs.organization = 'Brand or college name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'A valid email address is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const field = (id, label, type = 'text', required = false, extra = {}) => (
    <div>
      <label htmlFor={id} className="block font-mono-code text-[10px] font-bold text-gray-400 uppercase mb-1.5">
        {label}{required && ' *'}
      </label>
      <input
        id={id}
        type={type}
        value={formData[id]}
        required={required}
        onChange={(e) => { setFormData({ ...formData, [id]: e.target.value }); setErrors({ ...errors, [id]: '' }); }}
        className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white font-mono-code text-xs outline-none focus:ring-1 transition-colors ${errors[id] ? 'border-red-500 focus:ring-red-500' : 'border-neutral-700 focus:border-[#0066ff] focus:ring-[#0066ff]'}`}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        {...extra}
      />
      {errors[id] && <p id={`${id}-error`} className="mt-1 font-mono-code text-[10px] text-red-400">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="mb-16">
          <div className="inline-block px-3 py-1 border border-neutral-700 font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-5 rounded">
            // CONTACT GENZVERSE
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none mb-4">
            LET'S BUILD<br /><span className="text-[#0066ff]">SOMETHING MOVING.</span>
          </h1>
          <p className="font-mono-code text-sm text-gray-400 max-w-lg">
            Two doors: one for brands ready to reach Gen Z, one for students ready to join the squad. Pick yours.
          </p>
        </div>

        {/* Dual Path Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          <Link to="/join-now" className="group p-6 rounded-2xl border border-neutral-800 bg-black hover:border-[#e8006f] transition-all">
            <div className="font-mono-code text-[9px] text-gray-500 uppercase mb-3">// FOR STUDENTS</div>
            <h2 className="font-display font-black text-xl text-white uppercase mb-2 group-hover:text-[#e8006f] transition-colors">Join the Ecosystem</h2>
            <p className="font-mono-code text-xs text-gray-400 mb-4 leading-relaxed">Earn through brand campaigns, ambassador programs, creator opportunities, and more. Completely free.</p>
            <span className="font-mono-code text-[10px] font-bold text-[#e8006f] uppercase">JOIN NOW →</span>
          </Link>
          <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noreferrer" className="group p-6 rounded-2xl border border-neutral-800 bg-black hover:border-[#0066ff] transition-all">
            <div className="font-mono-code text-[9px] text-gray-500 uppercase mb-3">// FOR BRANDS</div>
            <h2 className="font-display font-black text-xl text-white uppercase mb-2 group-hover:text-[#0066ff] transition-colors">Let's Build a Campaign</h2>
            <p className="font-mono-code text-xs text-gray-400 mb-4 leading-relaxed">Reach 1,00,000+ campus ambassadors across 200+ universities. Tell us your goals.</p>
            <span className="font-mono-code text-[10px] font-bold text-[#0066ff] uppercase">WHATSAPP US →</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">// SEND US A MESSAGE</div>
            {submitted ? (
              <div className="p-8 rounded-2xl border-2 border-[#0066ff] bg-[#0066ff]/5 text-center">
                <div className="font-bebas text-6xl text-[#0066ff] mb-2">SENT.</div>
                <h3 className="font-display font-black text-xl text-white uppercase mb-2">MESSAGE RECEIVED</h3>
                <p className="font-mono-code text-xs text-gray-400 mb-6">Our team will get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#0066ff] text-white font-display font-bold text-xs uppercase rounded-lg hover:bg-white hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Type Toggle */}
                <div>
                  <div className="font-mono-code text-[10px] font-bold text-gray-400 uppercase mb-2">I am a: *</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Brand Campaign', 'Student Inquiry'].map((t) => (
                      <button
                        key={t} type="button"
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={`py-2.5 rounded-lg font-mono-code text-[10px] font-bold uppercase border transition-all focus:outline-none focus:ring-2 focus:ring-[#0066ff] ${formData.type === t ? 'bg-[#0066ff] text-white border-[#0066ff]' : 'bg-neutral-900 text-gray-400 border-neutral-700 hover:border-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {field('name', 'Full Name', 'text', true, { autoComplete: 'name' })}
                {field('organization', 'Brand / College Name', 'text', true, { autoComplete: 'organization' })}
                {field('email', 'Email Address', 'email', true, { autoComplete: 'email', inputMode: 'email' })}

                <div>
                  <label htmlFor="notes" className="block font-mono-code text-[10px] font-bold text-gray-400 uppercase mb-1.5">Message / Campaign Brief</label>
                  <textarea
                    id="notes" rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us your objectives, target universities, timeline or budget..."
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] rounded-lg text-white font-mono-code text-xs outline-none resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0066ff] text-white font-display font-black text-sm uppercase tracking-wider rounded-xl border-2 border-[#0066ff] hover:bg-white hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  SEND MESSAGE →
                </button>
              </form>
            )}
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">// DIRECT CHANNELS</div>

            <a
              href={CONTACT_INFO.whatsappLink} target="_blank" rel="noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl border border-neutral-800 bg-black hover:border-[#0066ff] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0066ff] flex items-center justify-center shrink-0 font-mono-code text-[10px] font-black text-white">WA</div>
              <div>
                <div className="font-mono-code text-[9px] text-gray-500 uppercase mb-0.5">WhatsApp (Fastest Response)</div>
                <div className="font-display font-bold text-sm text-white group-hover:text-[#0066ff] transition-colors">{CONTACT_INFO.whatsapp}</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-800 bg-black">
              <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 font-mono-code text-[10px] font-black text-white">@</div>
              <div>
                <div className="font-mono-code text-[9px] text-gray-500 uppercase mb-0.5">Email</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="font-display font-bold text-sm text-white hover:text-[#0066ff] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-800 bg-black">
              <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 font-mono-code text-[10px] font-black text-white">HQ</div>
              <div>
                <div className="font-mono-code text-[9px] text-gray-500 uppercase mb-0.5">Headquarters</div>
                <div className="font-display font-bold text-sm text-white">{CONTACT_INFO.hq}</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-lg border border-neutral-800 bg-black hover:border-[#e8006f] transition-colors text-center font-mono-code text-[10px] text-gray-400 hover:text-[#e8006f]">INSTAGRAM</a>
              <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-lg border border-neutral-800 bg-black hover:border-[#0066ff] transition-colors text-center font-mono-code text-[10px] text-gray-400 hover:text-[#0066ff]">LINKEDIN</a>
            </div>
          </div>
        </div>

        {/* FAQ — inline on contact page */}
        <div className="border-t border-neutral-900 pt-16">
          <div className="font-mono-code text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">// FREQUENTLY ASKED</div>
          <div className="space-y-0">
            {VERIFIED_FAQS.map((faq, i) => (
              <div key={i} className="border-b border-neutral-900">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none focus:ring-2 focus:ring-[#0066ff] rounded"
                >
                  <span className="font-display font-bold text-sm text-white pr-4">{faq.q}</span>
                  <span className={`font-mono-code text-lg text-[#0066ff] shrink-0 transition-transform ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqOpen === i && (
                  <div className="pb-5">
                    <p className="font-mono-code text-xs text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
