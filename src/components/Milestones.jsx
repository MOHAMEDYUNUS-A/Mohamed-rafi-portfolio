import React from 'react';
import { logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const MilestoneItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 w-full group">
      {/* Timeline line dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-amber-500 via-gold-primary to-yellow-300 rounded-full border-4 border-slate-950 z-30 shadow-[0_0_15px_rgba(226,184,87,0.6)] group-hover:scale-125 transition-transform duration-300" />

      {/* Card Content Side */}
      <div 
        data-aos={isEven ? "reveal-right" : "reveal-left"}
        className={`w-full md:w-[45%] pl-12 md:pl-0 ${
          isEven ? 'md:text-right md:order-1' : 'md:text-left md:order-2'
        }`}
      >
        <div className="bg-slate-950/60 backdrop-blur-md border border-gold-primary/15 rounded-2xl p-6 hover:border-gold-primary/35 hover:shadow-[0_15px_35px_rgba(226,184,87,0.06)] transition-all duration-500">
          <div className={`flex flex-wrap gap-2 items-center mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="bg-gold-primary/10 text-gold-primary text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-gold-primary/25">
              {item.badge}
            </span>
          </div>
          
          <h3 className="text-slate-50 text-xl font-black mb-1 tracking-tight group-hover:text-gold-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-gold-primary to-yellow-300 text-xs font-bold font-mono tracking-wider uppercase mb-4">
            {item.role}
          </p>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>

      {/* Spacing spacer for desktop */}
      <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-2' : 'md:order-1'}`} />
    </div>
  );
};

const Milestones = () => {
  const { portfolioMode } = usePortfolio();
  const milestones = portfolioMode === 'logistics' ? logisticsData.milestones : hrData.milestones;
  return (
    <section id="milestones" className="bg-slate-secondary pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10 bg-[linear-gradient(to_right,#e2b85703_1px,transparent_1px),linear-gradient(to_bottom,#e2b85703_1px,transparent_1px)] bg-[size:80px_80px]">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        
        {/* Header */}
        <div data-aos="reveal-up" className="mb-20 text-center">
          <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-sm text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm">
            Milestones
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-50 tracking-tight mb-4 uppercase">
            Strategic Accomplishments
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            A history of key operations milestones, multi-million-dollar project management, and high-impact recoveries.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative w-full">
          {/* Vertical central line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-amber-600 via-gold-primary to-amber-300/10" />

          {/* Timeline Items */}
          <div className="w-full">
            {milestones.map((item, index) => (
              <MilestoneItem key={item.title + index} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Milestones;
