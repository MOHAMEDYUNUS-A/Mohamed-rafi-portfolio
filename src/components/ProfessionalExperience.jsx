import React, { useEffect, useRef, useState } from 'react';
import { logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

// Import real corporate logo image files uploaded in assets
import workforceLogo from '../assets/Workforce.png';
import techpulseLogo from '../assets/techpulse global.png';
import wrLogisticsLogo from '../assets/wr logistics.jpg';
import schmidtLogo from '../assets/schmidt.jpg';
import jaddarahLogo from '../assets/jaddarah.jpg';
import plusmaxLogo from '../assets/plusmax.jpg';
import coastlineLogo from '../assets/coastline.jpg';

// Custom component to render the company logo image dynamically
const CompanyLogo = ({ name }) => {
  const normName = name.toLowerCase();

  if (normName.includes('workforce saudia')) {
    return <img src={workforceLogo} alt="Workforce Saudia Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('techpulse')) {
    return <img src={techpulseLogo} alt="TechPulse Global Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('wr logistics')) {
    return <img src={wrLogisticsLogo} alt="WR Logistics Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('schmidt')) {
    return <img src={schmidtLogo} alt="Schmidt ME Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('jaddarah')) {
    return <img src={jaddarahLogo} alt="Jaddarah Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('plus max')) {
    return <img src={plusmaxLogo} alt="Plus Max Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }
  if (normName.includes('coastline')) {
    return <img src={coastlineLogo} alt="Coastline Logo" loading="eager" className="w-full h-full object-contain rounded-xl" />;
  }

  // Fallback generic business building icon
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gold-primary" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21M9 7H11M9 11H11M9 15H11M13 7H15M13 11H15M13 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const useInViewOnce = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
};

const ExperienceCard = ({ exp, index }) => {
  const [ref, isInView] = useInViewOnce({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      data-aos="reveal-up"
      data-aos-delay={index * 100}
      className="group relative bg-slate-950/60 backdrop-blur-md border border-gold-primary/15 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.01] hover:border-gold-primary/40 hover:bg-slate-950/80 hover:shadow-[0_20px_50px_rgba(226,184,87,0.05)] transition-all duration-500 flex flex-col justify-between mobile-optimized"
    >
      {/* Corner glow on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-primary/0 group-hover:bg-gold-primary/5 blur-[50px] transition-all duration-500 pointer-events-none" />

      <div className="relative">
        {/* Header container with Company Logo & Status info */}
        <div className="flex justify-between items-start mb-6 gap-4">
          {/* Company Logo wrapper using uploaded real logos - made larger */}
          <div className="w-20 h-20 bg-white border border-gold-primary/15 rounded-2xl flex items-center justify-center p-1 group-hover:border-gold-primary/40 group-hover:scale-105 transition-all duration-300 shadow-inner shrink-0 overflow-hidden">
            <CompanyLogo name={exp.organization} />
          </div>
          
          {/* Duration & status badge stacked */}
          <div className="flex flex-col items-end gap-1.5 text-right">
            <span className="text-slate-400 text-xs font-mono font-bold tracking-wider uppercase">
              {exp.duration}
            </span>
            <span className="experience-badge bg-gold-primary/10 text-gold-primary text-[9px] font-black tracking-widest uppercase py-0.5 px-2.5 rounded-full border border-gold-primary/20">
              {exp.tech[2] || "Corporate"}
            </span>
          </div>
        </div>

        <h3 className="text-slate-50 text-2xl font-black mb-1 tracking-tight group-hover:text-gold-primary transition-colors">{exp.role}</h3>
        <p className="text-gold-light text-sm font-black tracking-wide mb-6 uppercase">
          {exp.organization}
        </p>

        {/* Core Achievements/Responsibilities Summary */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
          {exp.description}
        </p>

        {/* Skills gained */}
        <div className="mb-6">
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Focus Areas:</h4>
          <ul className="text-slate-200 text-sm font-medium space-y-1.5 pl-4 list-disc">
            {exp.skills.map((skill, i) => (
              <li
                key={i}
                className="reveal-item"
                style={{
                  transitionDelay: `${i * 70}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0)' : 'translateX(-8px)',
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Locations and Tags */}
      <div className="relative pt-4 border-t border-gold-primary/15">
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t, i) => (
            <span
              key={t}
              className="reveal-item px-3 py-1 text-xs font-mono font-bold text-slate-300 bg-slate-900 rounded-full border border-gold-primary/10 hover:bg-gold-primary/15 hover:border-gold-primary/30 transition-all cursor-default"
              style={{
                transitionDelay: `${i * 70}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(4px)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfessionalExperience = () => {
  const { portfolioMode } = usePortfolio();
  const internshipsList = portfolioMode === 'logistics' ? logisticsData.experience : hrData.experience;
  return (
    <section id="experience" className="bg-slate-dark pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10">
      {/* Ambient drifting glow orbs */}
      <div className="absolute top-10 -left-1/4 w-[55%] h-[55%] pointer-events-none rounded-full blur-[130px] opacity-[var(--glow-opacity-10)] bg-gold-primary experience-orb" />
      <div
        className="absolute -bottom-1/4 right-0 w-[45%] h-[45%] pointer-events-none rounded-full blur-[130px] opacity-[var(--glow-opacity-5)] bg-amber-600 experience-orb"
        style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div data-aos="reveal-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Timeline
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-4 tracking-tight uppercase">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            15+ years of strategic leadership, commercial management, and operations facilitation across GCC and Asia.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {internshipsList.map((exp, index) => (
            <ExperienceCard key={exp.organization + index} exp={exp} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .experience-orb { animation: experience-orb-drift 15s ease-in-out infinite; }
        @keyframes experience-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.1); }
        }

        .experience-badge { animation: badge-glow 2.4s ease-in-out infinite; }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(226,184,87,0); }
          50%      { box-shadow: 0 0 12px rgba(226,184,87,0.35); }
        }

        .reveal-item { transition: opacity 0.5s ease-out, transform 0.5s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .experience-orb, .experience-badge { animation: none; }
          .reveal-item { transition: none; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ProfessionalExperience;
