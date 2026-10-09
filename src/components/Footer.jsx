import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Navigate: [
    { to: '/', label: 'Home' },
    { to: '/work', label: 'Work' },
    { to: '/students', label: 'Students' },
    { to: '/brands', label: 'Brands' },
    { to: '/payouts', label: 'Payouts' },
    { to: '/contact', label: 'Contact' },
  ],
  Join: [
    { to: '/join-now', label: 'Apply as Student' },
    { to: '/students', label: 'Student Opportunities' },
    { to: '/payouts', label: 'Payout Leaderboard' },
  ],
  Brands: [
    { to: '/brands', label: 'Brand Solutions' },
    { to: '/work', label: 'Case Studies' },
    { to: '/contact', label: 'Start a Campaign' },
  ],
};

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/genzverse.io' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/genzverse' },
  { label: 'WhatsApp', href: 'https://wa.me/919316106151' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-900 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded" aria-label="Genzverse">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[#e8006f] text-white font-display font-black text-xl flex items-center justify-center rounded-lg">G</div>
                <span className="font-display font-black text-xl tracking-wider text-white">GENZVERSE</span>
              </div>
            </Link>
            <p className="font-mono-code text-xs text-gray-500 leading-relaxed mb-5 max-w-xs">
              Student-First Marketing Ecosystem. Youth-led Campaign Force. Connecting India's campus to global brands since May 2024.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded border border-neutral-800 bg-black hover:border-[#e8006f] hover:text-[#e8006f] font-mono-code text-[9px] uppercase text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#e8006f]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <div className="font-mono-code text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-mono-code text-[11px] text-gray-400 hover:text-white transition-colors focus:outline-none focus:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Large Watermark */}
        <div className="overflow-hidden py-4 border-y border-neutral-900 mb-6">
          <div className="font-display font-black text-[80px] sm:text-[120px] text-neutral-900 leading-none tracking-tighter select-none whitespace-nowrap">
            GENZVERSE
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-code text-[10px] text-gray-600">
            © 2024-{new Date().getFullYear()} Genzverse. India's Leading Student Marketing Ecosystem. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono-code text-[10px] text-gray-700 uppercase tracking-widest">Surat, Gujarat — HQ</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono-code text-[10px] font-bold text-[#e8006f] hover:underline uppercase focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded"
            >
              Back to Top
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
