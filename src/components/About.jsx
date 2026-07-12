import React from 'react';
import { personalInfo, logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import rafiPhoto from '../assets/about/Rafi image.png'; // User's uploaded picture

const About = () => {
  const { portfolioMode } = usePortfolio();
  const aboutContent = portfolioMode === 'logistics' ? logisticsData.about : hrData.about;
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden font-sans pt-24 pb-36 px-6 md:px-12 bg-gradient-to-br from-slate-primary via-slate-darker to-slate-dark border-y border-gold-primary/10"
    >
      {/* Executive grid accent pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(226,184,87,0.015)_25%,transparent_25%,transparent_50%,rgba(226,184,87,0.015)_50%,rgba(226,184,87,0.015)_75%,transparent_75%,transparent)] bg-[size:40px_40px] pointer-events-none" />

      {/* Gold atmospheric glows */}
      <div className="glow-orb absolute -top-1/3 -right-1/4 w-[60%] h-[60%] pointer-events-none rounded-full blur-[130px] opacity-[var(--glow-opacity-15)] bg-gold-primary z-0" />
      <div
        className="glow-orb absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] pointer-events-none rounded-full blur-[130px] opacity-[var(--glow-opacity-10)] bg-gold-dark z-0"
        style={{ animationDelay: '-4s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start relative z-10">
        {/* Left Side: ID Badge with Left-Reveal animation */}
        <div data-aos="reveal-right" data-aos-delay="100" className="flex flex-col items-center w-full md:w-[320px] shrink-0 mt-8 md:mt-0">
          <div className="id-badge relative flex justify-center w-full" style={{ transformOrigin: 'top center' }}>
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-2.5 h-40 bg-slate-900 transform -translate-x-1/2 shadow-inner z-0" />
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-5 h-12 bg-amber-700/80 rounded border border-amber-600 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]" />

            {/* Badge Card with Gold glow and corporate design */}
            <div className="bg-slate-950 w-full max-w-[270px] rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-gold-primary/30 relative z-20 overflow-hidden flex flex-col items-center">
              
              {/* Gold glowing stripes */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gold-primary/10 blur-xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gold-dark/10 blur-xl pointer-events-none" />

              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-slate-950 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center border-t border-x border-gold-primary/20">
                <div className="w-8 h-2 bg-black/50 rounded-full shadow-inner" />
              </div>
              
              {/* Image Container using the real Rafi image */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-slate-900 border border-gold-primary/20 shadow-inner mt-2 mb-4 relative group">
                <img
                  src={rafiPhoto}
                  alt={personalInfo.name}
                  loading="eager"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* ID Details */}
              <div className="w-full flex flex-col items-center text-center font-mono">
                <h4 className="text-slate-50 font-black tracking-wider text-[13px] uppercase">
                  {personalInfo.firstName}
                </h4>
                <p className="text-gold-primary text-[8px] font-bold tracking-widest uppercase mt-0.5">
                  {portfolioMode === 'logistics' ? 'Logistics & Automation' : 'HR & Workforce Services'}
                </p>

                {/* Simulated Barcode */}
                <div className="mt-4 w-full flex flex-col items-center gap-1.5 opacity-85">
                  <div className="flex items-center gap-[2.2px] h-6 w-fit bg-white/5 px-2 py-1 rounded-sm">
                    <div className="w-[1px] h-full bg-gold-primary/70" />
                    <div className="w-[2px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-gold-primary/70" />
                    <div className="w-[3px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-white/35" />
                    <div className="w-[2px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-gold-primary/70" />
                    <div className="w-[4px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-white/20" />
                    <div className="w-[2px] h-full bg-gold-primary/70" />
                    <div className="w-[1px] h-full bg-gold-primary/70" />
                  </div>
                  <span className="text-[7.5px] text-white/45 tracking-[0.25em]">HQ: JUBAIL, KSA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Info Content with Right-Reveal animation */}
        <div data-aos="reveal-left" data-aos-delay="200" className="flex-1 text-slate-50 mt-8 md:mt-0 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] tracking-tight">
            {aboutContent.heading}
          </h2>
          
          <p
            className="text-lg font-medium mb-10 leading-relaxed text-slate-300 animate-fade-in"
            dangerouslySetInnerHTML={{ __html: aboutContent.bio }}
          />

          {/* Strategic Competencies Badge Matrix */}
          <div>
            <h4 className="text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">Core Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
              {aboutContent.techStack.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 text-xs font-semibold rounded-full bg-slate-900 border border-gold-primary/15 text-slate-300 hover:border-gold-primary hover:text-slate-50 transition-all duration-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ID badge animation styles */}
      <style>{`
        .id-badge {
          animation: badge-drop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                     badge-swing 4.5s ease-in-out 1.1s infinite;
        }
        .id-badge:hover {
          animation-play-state: paused;
          transform: rotate(0deg) translateY(0);
        }

        @keyframes badge-drop {
          0%   { transform: translateY(-260px) rotate(0deg); opacity: 0; }
          55%  { transform: translateY(12px) rotate(-4deg);  opacity: 1; }
          75%  { transform: translateY(-6px) rotate(3deg); }
          100% { transform: translateY(0) rotate(-3deg); }
        }

        @keyframes badge-swing {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(5deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .id-badge {
            animation: none;
            transform: rotate(-3deg);
            opacity: 1;
          }
        }

        .glow-orb { animation: orb-drift 14s ease-in-out infinite; }
        @keyframes orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-orb { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default About;