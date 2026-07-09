import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { skillsContent } from '../data/portfolioData';

const TagCard = ({ number, title, text, className, aosDelay, aosType, pathLength, containerRef, floatDelay }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    // Trigger when the line tip is 50px into the card
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div
      ref={ref}
      data-aos={aosType || "fade-up"}
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 relative flex flex-col items-center z-10 ${className}`}
    >
      {/* Ambient glow ring that blooms in when the scroll-line reaches this card */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 blur-xl pointer-events-none"
        initial={false}
        animate={{ opacity: isActive ? 0.45 : 0, scale: isActive ? 1 : 0.9 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      <motion.div
        tabIndex={0}
        role="group"
        aria-label={`Step ${number}: ${title}`}
        className={`w-full rounded-[2rem] p-2 relative flex flex-col items-center transition-colors duration-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-400/50 ${
          isActive
            ? 'bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 border border-violet-300/40 shadow-[0_20px_50px_rgba(139,92,246,0.4)]'
            : 'bg-white border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
        }`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay || 0 }}
        whileHover={{ scale: 1.04, rotate: 1 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* The hole punch, spins gently when the card becomes active */}
        <motion.div
          aria-hidden="true"
          className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center"
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        >
          <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
        </motion.div>

        {/* Inner container, pops slightly the moment it activates */}
        <motion.div
          className={`w-full h-full rounded-[1.5rem] mt-8 p-8 flex flex-col min-h-[220px] transition-colors duration-700 ${
            isActive ? 'bg-black/15 backdrop-blur-sm' : 'bg-[#f4f4f4]'
          }`}
          animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className={`text-xl font-bold mb-2 font-serif italic transition-colors duration-700 ${
            isActive ? 'text-white/70' : 'text-gray-400'
          }`}>{number}</span>
          
          <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-700 ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}>{title}</h3>
          
          <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
            isActive ? 'text-white/80' : 'text-gray-500'
          }`}>
            {text}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="process"
      ref={containerRef}
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto relative md:h-[1350px]">
        
        {/* Header Content */}
        <motion.div
          data-aos="fade-up"
          className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            {skillsContent.badge}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            {skillsContent.heading}
            {/* Hand-drawn arrow, draws itself in once in view */}
            <svg className="absolute -bottom-10 right-10 w-12 h-12 text-violet-500" fill="none" viewBox="0 0 24 24">
              <motion.path
                d="M4 4 Q 10 10 15 15 M 15 15 L 10 15 M 15 15 L 15 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            {skillsContent.description}
          </p>
        </motion.div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[1350px] pointer-events-none z-0" 
          viewBox="0 0 1000 1350" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          {/* Faint background path (optional guide) */}
          <path 
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="2" 
            strokeDasharray="8 10" 
          />

          {/* Mask to reveal the dashed path based on scroll */}
          <mask id="path-mask">
            <motion.path 
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>

          {/* The actual dashed line that gets revealed, now tinted with the site gradient */}
          <path 
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="3" 
            strokeDasharray="8 10" 
            mask="url(#path-mask)"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Mobile Animated Vertical Dashed Line */}
        <svg 
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            vectorEffect="non-scaling-stroke"
          />
          <mask id="path-mask-mobile">
            <motion.path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="white" 
              strokeWidth="4" 
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path 
            d="M 2,0 L 2,100" 
            fill="none" 
            stroke="url(#line-gradient)" 
            strokeWidth="4" 
            strokeDasharray="4 6" 
            mask="url(#path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Cards Container */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          
          {skillsContent.cards.map((card, index) => {
            const positions = [
              "md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6",
              "md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6",
              "md:absolute md:top-[700px] md:right-[5%] lg:right-[15%] rotate-1 md:rotate-3",
              "md:absolute md:top-[1050px] md:left-[15%] lg:left-[25%] -rotate-1 md:-rotate-3",
            ];
            const aosTypes = ["fade-left", "fade-right", "fade-left", "fade-right"];
            const aosDelays = ["100", "200", "300", "400"];

            return (
              <TagCard 
                key={card.number}
                number={card.number}
                title={card.title}
                text={card.text}
                className={positions[index]}
                aosType={aosTypes[index]}
                aosDelay={aosDelays[index]}
                pathLength={pathLength}
                containerRef={containerRef}
                floatDelay={index * 0.4}
              />
            );
          })}

          {/* Hand-drawn end text, springs in with a little wiggle */}
          <motion.div
            className="hidden md:block absolute top-[1250px] left-[60%] font-['Caveat',cursive] text-3xl text-violet-600"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.2 }}
          >
            {skillsContent.endText}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Services;