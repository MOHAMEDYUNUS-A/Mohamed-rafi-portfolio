import React, { memo } from 'react';
import { logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
  </svg>
);

const DECORATIVE_STARS = [
  { className: 'absolute top-16 left-6 md:left-16 w-12 h-12', delay: '0s' },
  { className: 'absolute bottom-20 right-8 md:right-24 w-14 h-14', delay: '1.5s' },
];

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Vector Gold icons to replace images
const TrophyIcon = () => (
  <svg className="w-6 h-6 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a15 15 0 0 1 6 12H6a15 15 0 0 1 6-12Z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-6 h-6 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
  </svg>
);

const ScrollIcon = () => (
  <svg className="w-6 h-6 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const getCredentialIcon = (name) => {
  const normName = name.toLowerCase();
  if (normName.includes('award') || normName.includes('appreciation') || normName.includes('best employee')) {
    return <TrophyIcon />;
  }
  if (normName.includes('gpca') || normName.includes('supply chain')) {
    return <GlobeIcon />;
  }
  if (normName.includes('summit') || normName.includes('maritime') || normName.includes('conference')) {
    return <AwardIcon />;
  }
  return <ScrollIcon />;
};

const AchievementCard = memo(({ cert, aosDelay }) => (
  <div
    data-aos="reveal-zoom"
    data-aos-delay={aosDelay}
    className="relative bg-slate-950/50 backdrop-blur-sm rounded-2xl p-6 border border-gold-primary/10 hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(226,184,87,0.06)] transition-all duration-500 cursor-default group overflow-hidden"
  >
    {/* top accent line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/0 via-gold-primary/60 to-yellow-400/0 group-hover:via-gold-primary transition-all duration-500" />

    <div className="flex items-center gap-5 text-left">
      {/* Icon Badge Container */}
      <div className="w-14 h-14 bg-slate-900 border border-gold-primary/15 rounded-xl flex items-center justify-center p-1.5 group-hover:bg-gradient-to-br group-hover:from-amber-600/10 group-hover:via-gold-primary/10 group-hover:to-yellow-300/10 group-hover:scale-105 group-hover:border-gold-primary/45 transition-all duration-300 shrink-0 shadow-inner">
        {getCredentialIcon(cert.name)}
      </div>
      
      <div>
        <h3 className="text-slate-50 font-bold text-base leading-tight mb-1 group-hover:text-gold-primary transition-colors">
          {cert.name}
        </h3>
        <p className="text-gold-primary text-xs font-black uppercase tracking-wider mb-2">
          {cert.issuer} {cert.issuedDate ? `· ${cert.issuedDate}` : ''}
        </p>
        {cert.description && (
          <p className="text-slate-400 text-sm font-semibold leading-relaxed mt-1">
            {cert.description}
          </p>
        )}
      </div>
    </div>
  </div>
));
AchievementCard.displayName = 'AchievementCard';

const ConferencesAwards = () => {
  const { portfolioMode } = usePortfolio();
  const certificates = portfolioMode === 'logistics' ? logisticsData.certificates : hrData.certificates;

  return (
    <section id="credentials" className="bg-slate-dark pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10">

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Split screen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky info panel) */}
          <div
            data-aos="reveal-right"
            className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start text-left"
          >
            <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-xs text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm uppercase tracking-widest">
              Credentials
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-50 leading-[1.1] mb-6 tracking-tight uppercase">
              Awards &amp; <br />Conferences
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed mb-8 max-w-sm">
              Recognized with corporate awards for collections recovery and operational excellence, and a regular delegate at industrial petrochemical and supply chain summits in the GCC.
            </p>

            {/* Split metrics dashboard */}
            <div className="flex gap-8 items-center pt-6 border-t border-gold-primary/10 w-full max-w-sm">
              <div>
                <h4 className="text-3xl font-black text-gold-primary tracking-tight font-serif italic">15+</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">Years GRC Compliance</p>
              </div>
              <div className="w-[1px] h-10 bg-gold-primary/20" />
              <div>
                <h4 className="text-3xl font-black text-gold-primary tracking-tight font-serif italic">03+</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-1">GCC Summit Honors</p>
              </div>
            </div>
          </div>

          {/* Right Column (Scrollable redesigned awards card list) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {certificates.featured.map((cert, index) => (
              <AchievementCard
                key={cert.name}
                cert={cert}
                aosDelay={String((index + 1) * 100)}
              />
            ))}
            
            {/* View LinkedIn Profile CTA */}
            <div data-aos="reveal-up" data-aos-delay="400" className="flex justify-start mt-6 pl-2">
              <a
                href={certificates.viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-bold text-base hover:scale-105 hover:shadow-[0_10px_40px_rgba(226,184,87,0.35)] transition-all duration-300 group cursor-pointer"
              >
                <DocumentIcon />
                <span>Connect on LinkedIn</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
          
        </div>
        
      </div>

      {/* Decorative stars */}
      {DECORATIVE_STARS.map((star, i) => (
        <div
          key={i}
          className={`${star.className} text-gold-primary opacity-15 animate-pulse`}
          style={{ animationDelay: star.delay }}
        >
          <StarIcon className="w-full h-full" />
        </div>
      ))}
    </section>
  );
};

export default ConferencesAwards;
