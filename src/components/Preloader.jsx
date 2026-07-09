import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const LOAD_DURATION = 2200; // ms — matches the water-fill + shutter timing below

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / LOAD_DURATION) * 100));
      setProgress(pct);

      if (elapsed < LOAD_DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOAD_DURATION);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen z-[100000] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#4338ca] via-[#6d5bf5] to-[#22b8cf]"
        >
          {/* Ambient drifting glow orbs — same language as the rest of the site */}
          <div className="absolute -top-1/3 -left-1/4 w-[60%] h-[60%] pointer-events-none rounded-full blur-[130px] opacity-25 bg-[#22d3ee] preloader-orb" />
          <div
            className="absolute -bottom-1/3 -right-1/4 w-[55%] h-[55%] pointer-events-none rounded-full blur-[130px] opacity-20 bg-[#8b6cf7] preloader-orb"
            style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
          />

          {/* Slowly rotating conic ring behind the logo for a subtle "engine warming up" feel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full preloader-ring"
          />

          {/* Logo Container */}
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative text-5xl md:text-7xl font-black tracking-tighter"
          >
            {/* Background text */}
            <div className="text-white/15 flex select-none">
              {personalInfo.brandName.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
              <span>.</span>
            </div>

            {/* Foreground text */}
            <div className="absolute top-0 left-0 text-white flex select-none">
              {personalInfo.brandName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 12,
                    delay: index * 0.05 + 0.2
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: personalInfo.brandName.length * 0.05 + 0.3 }}
                className="text-[#22d3ee]"
              >
                .
              </motion.span>
            </div>
          </motion.div>

          {/* Role / tagline — dynamically displays personalInfo.title */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: personalInfo.brandName.length * 0.05 + 0.5 }}
            className="mt-4 text-white/70 text-xs md:text-sm font-bold tracking-[0.35em] uppercase text-center px-4"
          >
            {personalInfo.title}
          </motion.p>

          {/* Progress bar synced to the actual load timer */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="mt-8 w-40 md:w-56 h-[3px] rounded-full bg-white/15 overflow-hidden origin-center"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#8b6cf7] to-[#22d3ee]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </motion.div>

          {/* Live percentage counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-white/50 text-[11px] font-bold tracking-widest tabular-nums"
          >
            {progress}%
          </motion.span>

          <style>{`
            .preloader-orb { animation: preloader-drift 12s ease-in-out infinite; }
            @keyframes preloader-drift {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50%      { transform: translate(5%, -5%) scale(1.1); }
            }

            .preloader-ring {
              background: conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(139, 108, 247, 0.55) 90deg,
                transparent 180deg,
                rgba(34, 211, 238, 0.55) 270deg,
                transparent 360deg
              );
              mask: radial-gradient(closest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
              -webkit-mask: radial-gradient(closest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
              animation: preloader-spin 3.5s linear infinite;
            }
            @keyframes preloader-spin {
              to { transform: rotate(360deg); }
            }

            @media (prefers-reduced-motion: reduce) {
              .preloader-orb, .preloader-ring { animation: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;