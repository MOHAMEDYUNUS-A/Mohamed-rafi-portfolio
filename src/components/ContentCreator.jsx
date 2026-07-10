import React from 'react';
import { contentCreation, socialLinks } from '../data/portfolioData';

// Import GPCA Logo image for the Global Network section
import gpcaLogo from '../assets/AWARDS/GPCA.jpeg';

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const CreatorIcon = ({ icon, title }) => {
  if (title.toLowerCase().includes('gpca')) {
    return <img src={gpcaLogo} alt="GPCA logo" className="w-full h-full object-contain" />;
  }
  return <span className="text-3xl">{icon}</span>;
};

const CreatorCard = ({ category, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-slate-950/50 backdrop-blur-md border border-gold-primary/10 rounded-3xl p-8 hover:scale-[1.02] hover:border-gold-primary/30 hover:shadow-[0_20px_50px_rgba(226,184,87,0.05)] transition-all duration-500 group flex flex-col justify-between"
  >
    <div>
      <div className="flex justify-between items-start mb-6">
        {/* Real image thumbnail or icon in a gold border container */}
        <span className="w-16 h-16 bg-slate-900 border border-gold-primary/15 rounded-2xl flex items-center justify-center p-1 group-hover:bg-gradient-to-br group-hover:from-amber-600/10 group-hover:via-gold-primary/10 group-hover:to-yellow-300/10 group-hover:scale-110 transition-all duration-300 overflow-hidden shrink-0">
          <CreatorIcon icon={category.icon} title={category.title} />
        </span>
        <span className="text-gold-primary/50 text-xs font-mono font-bold tracking-widest uppercase py-1 px-2.5 border border-gold-primary/15 rounded-full select-none">
          {category.stats}
        </span>
      </div>
      
      <h3 className="text-white text-xl md:text-2xl font-black mb-3 tracking-tight group-hover:text-gold-primary transition-colors text-left">
        {category.title}
      </h3>
      
      <p className="text-slate-305 text-sm md:text-base leading-relaxed mb-6 font-semibold text-left">
        {category.description}
      </p>
    </div>

    <div className="pt-4 border-t border-gold-primary/15 flex items-center justify-between text-xs font-mono tracking-wider font-bold text-slate-400 group-hover:text-gold-primary transition-colors">
      <span>Read Insights</span>
      <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  </div>
);

const ContentCreator = () => {
  return (
    <section id="creator" className="bg-[#080c14] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10 bg-[linear-gradient(to_right,#e2b85702_1px,transparent_1px),linear-gradient(to_bottom,#e2b85702_1px,transparent_1px)] bg-[size:80px_80px]">
      
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            {contentCreation.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight uppercase">
            {contentCreation.heading}
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {contentCreation.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {contentCreation.categories.map((category) => (
            <a 
              key={category.title}
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <CreatorCard category={category} index={0} />
            </a>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div data-aos="fade-up" data-aos-delay="400" className="mt-16 flex justify-center">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(226,184,87,0.35)] transition-all duration-500 group"
          >
            <LinkedInIcon />
            <span>Follow My Network Updates</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ContentCreator;