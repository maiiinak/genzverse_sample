import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Mascot from './components/Mascot';
import ScrollToTop from './components/ScrollToTop';

// Lazy-load pages for performance (code splitting)
const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const Students = lazy(() => import('./pages/Students'));
const Brands = lazy(() => import('./pages/Brands'));
const Payouts = lazy(() => import('./pages/Payouts'));
const JoinNow = lazy(() => import('./pages/JoinNow'));
const Contact = lazy(() => import('./pages/Contact'));

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
      <div className="font-bebas text-[120px] leading-none text-neutral-900 select-none">404</div>
      <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-white mb-3 -mt-6">WRONG CAMPUS.</h1>
      <p className="font-mono-code text-sm text-gray-500 mb-8">Looks like this page missed the campaign briefing.</p>
      <a
        href="/"
        className="px-6 py-3 bg-[#e8006f] text-white font-display font-bold text-sm uppercase rounded-xl border-2 border-[#e8006f] hover:bg-white hover:text-[#e8006f] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
      >
        BACK TO GENZVERSE →
      </a>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="font-mono-code text-xs text-gray-600 uppercase tracking-widest animate-pulse">Loading...</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e8006f] selection:text-white overflow-x-hidden antialiased">

        {/* Global 2D Mascot — draggable, reactive, speechy */}
        <Mascot />

        {/* Subtle Editorial Background Grid */}
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

        {/* App Shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Skip to content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#e8006f] focus:text-white focus:font-bold focus:rounded"
          >
            Skip to content
          </a>

          <Navbar />

          <main id="main-content" className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Core pages */}
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:id" element={<WorkDetail />} />
                <Route path="/students" element={<Students />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/payouts" element={<Payouts />} />
                <Route path="/join-now" element={<JoinNow />} />
                <Route path="/contact" element={<Contact />} />

                {/* Legacy /zine routes — redirect to /work to fix broken routing */}
                <Route path="/zine" element={<Work />} />
                <Route path="/zine/:id" element={<WorkDetail />} />

                {/* Real 404 — never silently render homepage for unknown routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
