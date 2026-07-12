import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { logisticsData, hrData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const TimelineCard = ({ number, title, text, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="group relative flex gap-6 md:gap-8 items-start w-full"
    >
      {/* Timeline Indicator Dot */}
      <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-gold-primary flex items-center justify-center shadow-[0_0_10px_rgba(226,184,87,0.3)] z-20 group-hover:scale-125 transition-transform duration-300">
        <div className="w-1.5 h-1.5 bg-gold-primary rounded-full" />
      </div>

      {/* Card Content Panel */}
      <div className="flex-1 bg-slate-950/60 backdrop-blur-md border border-gold-primary/10 hover:border-gold-primary/35 rounded-3xl p-6 sm:p-8 hover:bg-slate-950/95 hover:-translate-y-1 transition-all duration-400 text-left relative overflow-hidden shadow-lg">
        {/* Subtle auroral back-glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-primary/5 rounded-full blur-xl group-hover:bg-gold-primary/10 transition-colors pointer-events-none" />

        {/* Step number badge */}
        <span className="inline-block bg-gold-primary/10 text-gold-primary text-xs font-mono font-black tracking-widest uppercase py-1 px-3.5 rounded-full border border-gold-primary/20 mb-4 select-none">
          Step {number}
        </span>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-50 group-hover:text-gold-primary transition-colors mb-3 tracking-tight">
          {title}
        </h3>

        {/* Body Paragraph */}
        <p className="text-slate-355 text-sm leading-relaxed font-semibold">
          {text}
        </p>

        {/* Interactive bottom indicator line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-gold-primary group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { portfolioMode } = usePortfolio();
  const skillsContent = portfolioMode === 'logistics' ? logisticsData.skills : hrData.skills;
  const containerRef = useRef(null);

  // Scroll target for drawing the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001
  });

  return (
    <section 
      id="process"
      ref={containerRef}
      className="bg-slate-primary pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-gold-primary/10"
    >
      {/* Background drifting glow orbs */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-gold-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 h-80 bg-amber-600/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Layout Grid: 12-columns, collapses to 1-column on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title Block (5 columns wide) */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start text-left"
          >
            {/* Badge */}
            <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-xs text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm uppercase tracking-widest">
              {skillsContent.badge}
            </div>

            {/* Heading without bottom arrow */}
            <h2 className="text-3.5xl md:text-5xl font-black text-slate-50 leading-[1.1] mb-6 tracking-tight relative uppercase">
              {skillsContent.heading}
            </h2>

            {/* Paragraph description */}
            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed max-w-md">
              {skillsContent.description}
            </p>
          </motion.div>

          {/* Right Column: Responsive Vertical Timeline (7 columns wide) */}
          <div className="lg:col-span-7 flex flex-col gap-10 relative pl-6 sm:pl-8 ml-2 sm:ml-4">
            
            {/* Interactive Vertical Timeline Track Line - drawn automatically on scroll */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-slate-900 pointer-events-none z-0">
              <motion.div
                style={{ scaleY }}
                className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-amber-600 via-gold-primary to-slate-900 origin-top shadow-[0_0_8px_rgba(226,184,87,0.4)]"
              />
            </div>

            {/* List of Step Cards */}
            {skillsContent.cards.map((card, index) => (
              <TimelineCard
                key={card.number}
                number={card.number}
                title={card.title}
                text={card.text}
                index={index}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;