import React from 'react';
import { personalInfo, socialLinks, logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const SocialIcon = ({ href, label, path }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-800/60 text-[#8e8e8e] hover:text-slate-50 hover:border-gold-primary/40 hover:bg-gradient-to-br hover:from-amber-600/10 hover:via-gold-primary/10 hover:to-yellow-300/10 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const { portfolioMode } = usePortfolio();
  const footerContent = portfolioMode === 'logistics' ? logisticsData.footer : hrData.footer;

  return (
    <footer className="relative bg-slate-darker text-slate-400 py-20 px-6 md:px-12 w-full font-sans text-xs flex flex-col justify-between min-h-[48vh] overflow-hidden border-t border-gold-primary/10">

      {/* Luxury gold glowing top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-600/0 via-gold-primary/30 to-yellow-350/0" />

      {/* Mesh lines pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2b85701_1px,transparent_1px),linear-gradient(to_bottom,#e2b85701_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-gold-primary/[0.012] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between gap-16">
        
        {/* Top Info Grid - Flexbox to center vertical dividers */}
        <div className="flex flex-col md:flex-row gap-10 w-full pb-10 border-b border-gold-primary/15 font-medium text-left">
          {/* Column 1 */}
          <div className="flex-1 flex flex-col gap-2.5">
            <span className="text-gold-primary/40 text-[9.5px] font-mono font-bold tracking-[0.25em] uppercase mb-1">Core Focus</span>
            {footerContent.taglines.map((line, i) => (
              <p key={i} className="text-slate-200/90 hover:text-gold-primary transition-colors duration-300 font-semibold text-sm leading-snug">{line}</p>
            ))}
          </div>
          
          {/* Column 2 */}
          <div className="flex-1 flex flex-col gap-2.5 md:items-center text-left md:text-center border-y md:border-y-0 md:border-x border-gold-primary/15 py-6 md:py-0 md:px-8">
            <span className="text-gold-primary/40 text-[9.5px] font-mono font-bold tracking-[0.25em] uppercase mb-1">Education & Credential</span>
            <p className="text-slate-300/80 max-w-xs font-semibold leading-relaxed text-sm">{footerContent.credential}</p>
            <a
              href="#projects"
              className="inline-flex items-center gap-1 text-gold-primary hover:text-gold-light font-bold transition-colors mt-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              Explore Operations Records →
            </a>
          </div>
          
          {/* Column 3 */}
          <div className="flex-1 flex flex-col gap-2.5 md:items-end text-left md:text-right">
            <span className="text-gold-primary/40 text-[9.5px] font-mono font-bold tracking-[0.25em] uppercase mb-1">Availability</span>
            <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Executive BD
            </p>
            <p className="text-slate-550 font-mono mt-1 text-[10.5px]">KSA Resident · Transferable Iqama</p>
          </div>
        </div>

        {/* Large Luxury Text Watermark */}
        <div className="relative w-full flex justify-center items-center py-6 select-none overflow-hidden footer-watermark-wrapper">
          <h2 className="text-[7.5vw] font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-400/[0.04] via-gold-primary/[0.08] to-slate-400/[0.04] w-full text-center leading-none footer-pulse">
            MOHAMED RAFI
          </h2>
        </div>

        {/* Bottom copyright and actions */}
        <div className="flex flex-col md:flex-row justify-between gap-10 w-full items-center pt-8 border-t border-gold-primary/15 font-medium text-left">
          
          {/* Copyright link */}
          <div className="flex-1 flex flex-col gap-2">
            <a
              href="#contact"
              className="text-slate-200 hover:text-gold-primary transition-colors font-bold text-sm uppercase tracking-wider cursor-pointer"
            >
              Start Corporate Discussion
            </a>
            <p className="text-slate-500 text-[9.5px] font-mono">
              {footerContent.copyright.replace('Tailwind', 'Tailwind v4')}
            </p>
          </div>
          
          {/* Mail & Socials */}
          <div className="flex-1 flex flex-col gap-3.5 md:items-center">
            <a
              href={`mailto:${personalInfo.emails.primary}`}
              className="text-slate-350 hover:text-slate-100 font-mono text-sm transition-colors font-semibold"
            >
              {personalInfo.emails.primary}
            </a>
            <div className="flex items-center gap-3">
              <SocialIcon
                href={socialLinks.linkedin}
                label="LinkedIn"
                path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </div>
          </div>
          
          {/* Scroll To Top button */}
          <div className="flex-1 flex flex-col gap-3.5 md:items-end text-left md:text-right">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="relative inline-flex items-center justify-center p-3.5 rounded-full border border-slate-800/80 hover:border-gold-primary/60 text-slate-500 hover:text-gold-primary hover:bg-gold-primary/5 transition-all duration-300 group cursor-pointer"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer-pulse {
          animation: footer-text-glow 6s ease-in-out infinite;
        }
        @keyframes footer-text-glow {
          0%, 100% { filter: drop-shadow(0 0 0px transparent); opacity: 0.85; }
          50%      { filter: drop-shadow(0 0 4px rgba(226,184,87,0.15)); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-pulse { animation: none; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;