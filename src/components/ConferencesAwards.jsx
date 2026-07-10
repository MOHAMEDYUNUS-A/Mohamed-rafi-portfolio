import React, { memo } from 'react';
import { certificates } from '../data/portfolioData';

// Import real uploaded award certificate and GPCA forum images
import awardCertImage from '../assets/AWARDS/award_certificate.png';
import gpcaImage from '../assets/AWARDS/GPCA.jpeg';

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

// Custom helper to return the correct award/forum image dynamically
const CredentialThumbnail = ({ name, fallbackIcon }) => {
  const normName = name.toLowerCase();
  
  if (normName.includes('gpca') || normName.includes('supply chain')) {
    return <img src={gpcaImage} alt="GPCA Forum logo" className="w-full h-full object-contain" />;
  }
  if (normName.includes('award') || normName.includes('supplier') || normName.includes('employee')) {
    return <img src={awardCertImage} alt="Appreciation Award Certificate" className="w-full h-full object-cover" />;
  }
  if (normName.includes('maritime') || normName.includes('logistics')) {
    return <img src={gpcaImage} alt="Maritime Summit logo" className="w-full h-full object-contain" />;
  }
  
  return <span className="text-xl">{fallbackIcon}</span>;
};

const AchievementCard = memo(({ cert, aosDelay }) => (
  <div
    data-aos="zoom-in"
    data-aos-delay={aosDelay}
    className="relative bg-slate-950/50 backdrop-blur-sm rounded-2xl p-6 border border-gold-primary/10 hover:border-gold-primary/30 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(226,184,87,0.06)] transition-all duration-500 cursor-default group overflow-hidden"
  >
    {/* top accent line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/0 via-gold-primary/60 to-yellow-400/0 group-hover:via-gold-primary transition-all duration-500" />

    <div className="flex items-center gap-5 text-left">
      {/* Real image thumbnail container instead of vector emojis */}
      <div className="w-16 h-16 bg-white border border-gold-primary/15 rounded-xl overflow-hidden flex items-center justify-center p-1 group-hover:border-gold-primary/45 group-hover:scale-105 transition-all duration-300 shrink-0 shadow-inner">
        <CredentialThumbnail name={cert.name} fallbackIcon={cert.icon} />
      </div>
      
      <div>
        <h3 className="text-white font-bold text-base leading-tight mb-2 group-hover:text-gold-primary transition-colors">
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
  return (
    <section id="credentials" className="bg-[#080c14] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10">

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div data-aos="fade-up" className="mb-14 md:mb-16 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Credentials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Awards & Conferences
          </h2>
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
            Corporate recognition and key industrial supply chain summits attended across the GCC.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {certificates.featured.map((cert, index) => (
            <AchievementCard
              key={cert.name}
              cert={cert}
              aosDelay={String((index + 1) * 100)}
            />
          ))}
        </div>

        {/* View LinkedIn Profile CTA */}
        <div data-aos="fade-up" data-aos-delay="500" className="flex justify-center">
          <a
            href={certificates.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-bold text-base hover:scale-105 hover:shadow-[0_10px_40px_rgba(226,184,87,0.35)] transition-all duration-300 group"
          >
            <DocumentIcon />
            <span>Connect on LinkedIn</span>
            <ArrowIcon />
          </a>
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
