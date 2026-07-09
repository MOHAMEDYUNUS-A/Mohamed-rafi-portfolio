import React from 'react';
import { leadershipList } from '../data/portfolioData';

const LeadershipItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 w-full group">
      {/* Timeline line dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 rounded-full border-4 border-black z-30 shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover:scale-125 transition-transform duration-300" />

      {/* Card Content Side */}
      <div 
        data-aos={isEven ? "fade-right" : "fade-left"}
        className={`w-full md:w-[45%] pl-12 md:pl-0 ${
          isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'
        }`}
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 hover:shadow-[0_15px_35px_rgba(139,92,246,0.15)] transition-all duration-500">
          <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-400/20 text-violet-300 text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-violet-400/30">
              {item.badge}
            </span>
          </div>
          
          <h3 className="text-white text-xl font-black mb-1 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-violet-400 group-hover:to-cyan-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 text-xs font-bold font-mono tracking-wider uppercase mb-4">
            {item.role}
          </p>
          <p className="text-white/60 text-sm leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>

      {/* Spacing spacer for desktop */}
      <div className="hidden md:block w-[45%] order-2" />
    </div>
  );
};

const Leadership = () => {
  return (
    <section className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Activities
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Leadership & Engagement
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Coordinating events, leading team operations, and participating in tech summits.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative w-full">
          {/* Vertical central line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-400/20" />

          {/* Timeline Items */}
          <div className="w-full">
            {leadershipList.map((item, index) => (
              <LeadershipItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Leadership;