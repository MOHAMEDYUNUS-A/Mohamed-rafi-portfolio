import React from 'react';
import { personalInfo, socialLinks, footerContent } from '../data/portfolioData';

const SocialIcon = ({ href, label, path }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/5 text-[#a3a3a3] hover:text-white hover:border-gold-primary/45 hover:bg-gradient-to-br hover:from-amber-600/10 hover:via-gold-primary/10 hover:to-yellow-300/10 hover:scale-105 transition-all duration-350 shadow-md"
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
  return (
    <footer className="relative bg-[#07090f] text-[#a3a3a3] py-20 px-6 md:px-12 w-full font-sans text-xs flex flex-col justify-between min-h-[45vh] overflow-hidden border-t border-gold-primary/10">

      {/* Signature top glowing line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/0 via-gold-primary/40 to-yellow-350/0" />

      {/* Grid and ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2b85701_1px,transparent_1px),linear-gradient(to_bottom,#e2b85701_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-gold-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between gap-12">
        {/* Top Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full pb-10 border-b border-white/5 font-medium text-left">
          <div className="flex flex-col gap-2">
            <span className="text-gold-primary/50 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">Core Focus</span>
            {footerContent.taglines.map((line, i) => (
              <p key={i} className="text-white/80 hover:text-gold-primary transition-colors duration-300 font-semibold">{line}</p>
            ))}
          </div>
          
          <div className="flex flex-col gap-2 md:items-center text-left md:text-center">
            <span className="text-gold-primary/50 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">Education & Credential</span>
            <p className="text-white/80 max-w-xs font-semibold leading-relaxed">{footerContent.credential}</p>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-gold-primary hover:text-gold-light font-bold transition-colors mt-2"
            >
              Explore Operations Records →
            </a>
          </div>
          
          <div className="flex flex-col gap-2 md:items-end text-left md:text-right">
            <span className="text-gold-primary/50 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1">Availability</span>
            <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-350 text-[10.5px] font-black tracking-widest uppercase shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Active Executive BD
            </p>
            <p className="text-white/40 font-mono mt-1 text-[11px]">KSA Resident · Transferable Iqama</p>
          </div>
        </div>

        {/* Middle Watermark Name */}
        <div className="relative w-full flex justify-center items-center py-6 select-none overflow-hidden">
          <h2 className="text-[12vw] leading-none font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-600/[0.025] via-gold-primary/[0.055] to-yellow-450/[0.025] hover:from-amber-600/[0.055] hover:via-gold-primary/[0.085] hover:to-yellow-450/[0.055] transition-all duration-700 w-full text-center">
            MOHAMED RAFI
          </h2>
        </div>

        {/* Bottom Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full items-center pt-8 border-t border-white/5 font-medium text-left">
          <div className="flex flex-col gap-2">
            <a
              href="#contact"
              className="text-white hover:text-gold-primary transition-colors font-bold text-sm uppercase tracking-wider"
            >
              Start Corporate Discussion
            </a>
            <p className="text-slate-500 text-[10px] font-semibold leading-normal">
              {footerContent.copyright.replace('Tailwind', 'Tailwind v4')}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 md:items-center">
            <a
              href={`mailto:${personalInfo.emails.primary}`}
              className="text-slate-350 hover:text-white font-mono text-sm transition-colors font-semibold"
            >
              {personalInfo.emails.primary}
            </a>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <SocialIcon
                href={socialLinks.linkedin}
                label="LinkedIn"
                path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3 md:items-end text-left md:text-right">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300 group cursor-pointer font-bold uppercase tracking-wider text-[11px] text-slate-400"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;