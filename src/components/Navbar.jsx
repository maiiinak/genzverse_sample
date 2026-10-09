import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/students', label: 'Students' },
  { to: '/brands', label: 'Brands' },
  { to: '/payouts', label: 'Payouts' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Trap focus in open menu
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll('a, button');
      if (focusable.length) focusable[0].focus();
    }
  }, [menuOpen]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-900 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded"
            aria-label="Genzverse Home"
          >
            <div className="w-9 h-9 bg-[#e8006f] text-white font-display font-black text-xl flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform">
              G
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-wider text-white block leading-none">
                GENZVERSE
              </span>
              <span className="font-mono-code text-[8px] font-bold text-gray-500 tracking-widest uppercase">
                India's #1 Student Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded font-mono-code text-[11px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066ff] ${
                  isActive(link.to)
                    ? 'text-white bg-neutral-900'
                    : 'text-gray-400 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/join-now"
              className="px-4 py-2 bg-[#e8006f] text-white font-display font-black text-[11px] uppercase tracking-wider rounded-lg border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white flex items-center gap-1.5"
            >
              JOIN NOW <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border border-neutral-700 text-gray-300 hover:text-white hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#e8006f]"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col pt-24 px-6 pb-8"
        >
          <nav className="flex flex-col gap-2 flex-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-4 border-b font-display font-black text-2xl uppercase tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-[#e8006f] rounded ${
                  isActive(link.to)
                    ? 'text-[#e8006f] border-[#e8006f]/20'
                    : 'text-white border-neutral-900 hover:text-[#e8006f]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6">
            <Link
              to="/join-now"
              className="w-full py-4 bg-[#e8006f] text-white font-display font-black text-base uppercase tracking-wider rounded-xl text-center border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              JOIN THE COMMUNITY →
            </Link>
            <Link
              to="/contact"
              className="w-full py-4 bg-transparent text-white font-display font-black text-base uppercase tracking-wider rounded-xl text-center border-2 border-white hover:border-[#0066ff] hover:text-[#0066ff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
            >
              START A CAMPAIGN
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
