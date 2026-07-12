import React from 'react';
import { logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

// Custom inline SVG icons matching Lucide design
const CompassIcon = () => (
  <svg className="w-7 h-7 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const HandshakeIcon = () => (
  <svg className="w-7 h-7 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MessageSquareIcon = () => (
  <svg className="w-7 h-7 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CrownIcon = () => (
  <svg className="w-7 h-7 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-7 h-7 text-gold-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ICON_MAP = {
  "🏗️": <CompassIcon />,
  "🤝": <HandshakeIcon />,
  "💬": <MessageSquareIcon />,
  "👑": <CrownIcon />,
  "🛡️": <ShieldIcon />,
};

const SoftSkillCard = ({ skill, index }) => (
  <div 
    data-aos="reveal-up"
    data-aos-delay={index * 100}
    className="bg-slate-950/60 border border-gold-primary/10 rounded-3xl p-6 hover:scale-[1.03] hover:bg-slate-950/80 hover:border-gold-primary/35 hover:shadow-[0_20px_45px_rgba(226,184,87,0.05)] transition-all duration-500 group flex flex-col items-center text-center justify-between min-h-[220px]"
  >
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-4 p-3.5 bg-slate-900 border border-gold-primary/10 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-amber-600/10 group-hover:via-gold-primary/10 group-hover:to-yellow-300/10 group-hover:scale-110 transition-all duration-300">
        {ICON_MAP[skill.icon] || <span className="text-3xl">{skill.icon}</span>}
      </div>
      <h3 className="text-slate-50 text-lg font-black tracking-tight mb-2 uppercase group-hover:text-gold-primary transition-colors">
        {skill.name}
      </h3>
      <p className="text-slate-400 text-sm font-medium leading-relaxed">
        {skill.desc}
      </p>
    </div>
  </div>
);

const SoftSkills = () => {
  const { portfolioMode } = usePortfolio();
  const softSkillsList = portfolioMode === 'logistics' ? logisticsData.softSkills : hrData.softSkills;
  return (
    <section className="bg-slate-primary pt-16 pb-24 px-4 sm:px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10 bg-[linear-gradient(to_right,#e2b85702_1px,transparent_1px),linear-gradient(to_bottom,#e2b85702_1px,transparent_1px)] bg-[size:60px_60px]">

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="reveal-up" className="mb-12 md:mb-16 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-50 tracking-tight mb-4 uppercase">
            Professional Traits
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Key professional traits and soft skills that enable me to coordinate cross-functional teams, lead negotiations, and direct operations.
          </p>
        </div>

        {/* Soft Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {softSkillsList.map((skill, index) => (
            <SoftSkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SoftSkills;