import React from 'react';
import { softSkillsList } from '../data/portfolioData';

const SoftSkillCard = ({ skill, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-slate-950/60 border border-gold-primary/10 rounded-3xl p-6 hover:scale-[1.03] hover:bg-slate-950/80 hover:border-gold-primary/35 hover:shadow-[0_20px_45px_rgba(226,184,87,0.05)] transition-all duration-500 group flex flex-col items-center text-center justify-between min-h-[220px]"
  >
    <div className="flex flex-col items-center">
      <div className="text-4xl mb-4 p-3 bg-slate-900 border border-gold-primary/10 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-amber-600/10 group-hover:via-gold-primary/10 group-hover:to-yellow-300/10 group-hover:scale-110 transition-all duration-300">
        {skill.icon}
      </div>
      <h3 className="text-white text-lg font-black tracking-tight mb-2 uppercase group-hover:text-gold-primary transition-colors">
        {skill.name}
      </h3>
      <p className="text-slate-400 text-sm font-medium leading-relaxed">
        {skill.desc}
      </p>
    </div>
  </div>
);

const SoftSkills = () => {
  return (
    <section className="bg-[#0b0f19] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10 bg-[linear-gradient(to_right,#e2b85702_1px,transparent_1px),linear-gradient(to_bottom,#e2b85702_1px,transparent_1px)] bg-[size:60px_60px]">

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Core Competencies
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
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