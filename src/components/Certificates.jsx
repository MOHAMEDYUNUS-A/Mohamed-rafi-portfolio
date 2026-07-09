import React, { memo } from 'react';
import { certificates } from '../data/portfolioData';

// Single source of truth for the decorative star glyph — avoids
// duplicating the same <path> markup for every star instance.
const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
  </svg>
);

// Positions/sizes driven by data instead of hand-written duplicate JSX blocks.
const DECORATIVE_STARS = [
  { className: 'absolute top-16 left-6 md:left-16 w-12 h-12', delay: '0s' },
  { className: 'absolute bottom-20 right-8 md:right-24 w-14 h-14', delay: '1.5s' },
];

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Memoized so re-renders of the parent (e.g. from unrelated state)
// don't re-render every card in the grid.
const CertificateCard = memo(({ cert, aosDelay }) => (
  <div
    data-aos="zoom-in"
    data-aos-delay={aosDelay}
    className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-violet-400/40 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(139,92,246,0.18)] transition-all duration-500 cursor-default group overflow-hidden"
  >
    {/* top accent line, brightens on hover */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500/0 via-violet-500/60 to-cyan-400/0 group-hover:via-violet-400 transition-all duration-500" />

    <div className="flex items-start gap-4">
      <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl text-xl bg-gradient-to-br from-indigo-500/15 via-violet-500/15 to-cyan-400/15 border border-white/10 group-hover:border-violet-400/40 group-hover:scale-110 transition-all duration-300">
        {cert.icon}
      </span>
      <div>
        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:via-violet-300 group-hover:to-cyan-300 transition-colors">
          {cert.name}
        </h3>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">
          {cert.issuer}
        </p>
      </div>
    </div>
  </div>
));
CertificateCard.displayName = 'CertificateCard';

const Certificates = () => {
  return (
    <section className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">

      {/* Ambient gradient glows for depth */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div data-aos="fade-up" className="mb-14 md:mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 mb-4 tracking-tight uppercase">
            Certifications
          </h2>
          <p className="text-white/50 text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
            Industry-recognized certifications that validate my technical expertise.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-14">
          {certificates.featured.map((cert, index) => (
            <CertificateCard
              key={cert.name}
              cert={cert}
              aosDelay={String((index + 1) * 100)}
            />
          ))}
        </div>

        {/* View All Certificates CTA */}
        <div data-aos="fade-up" data-aos-delay="700" className="flex justify-center">
          <a
            href={certificates.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 text-black font-bold text-base hover:scale-105 hover:shadow-[0_10px_40px_rgba(139,92,246,0.35)] transition-all duration-300 group"
          >
            <DocumentIcon />
            View All Certificates
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Decorative stars, rendered from a data array instead of repeated JSX */}
      {DECORATIVE_STARS.map((star, i) => (
        <div
          key={i}
          className={`${star.className} text-violet-400 opacity-25 animate-pulse`}
          style={{ animationDelay: star.delay }}
        >
          <StarIcon className="w-full h-full" />
        </div>
      ))}
    </section>
  );
};

export default Certificates;