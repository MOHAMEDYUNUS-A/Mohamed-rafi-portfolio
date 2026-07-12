import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const LOAD_DURATION = 2400; // ms

const getBusinessSectorText = (prog) => {
  if (prog < 35) return "Connecting 3PL & Chemical Logistics Networks";
  if (prog >= 35 && prog < 70) return "Mobilizing Enterprise Manpower Solutions";
  return "Integrating Intelligent Robotic Automation Systems";
};

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
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen z-[100000] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#07090f] via-[#0b0f19] to-[#030508]"
        >
          {/* Atmospheric ambient glows */}
          <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] pointer-events-none rounded-full blur-[140px] opacity-15 bg-gold-primary preloader-glow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] pointer-events-none rounded-full blur-[140px] opacity-10 bg-amber-600 preloader-glow"
            style={{ animationDelay: '-4s', animationDirection: 'reverse' }}
          />

          {/* Golden Circular Progress Ring */}
          <div className="relative flex items-center justify-center select-none">
            <svg className="w-28 h-28 md:w-36 md:h-36" viewBox="0 0 100 100">
              {/* Back track circle */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(226, 184, 87, 0.05)"
                strokeWidth="2.5"
              />
              {/* Animated Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#preloader-gold)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * progress) / 100}
                transform="rotate(-90 50 50)"
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <defs>
                <linearGradient id="preloader-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5d061" />
                  <stop offset="50%" stopColor="#e2b857" />
                  <stop offset="100%" stopColor="#c5a85c" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central pulsing Monogram R */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                transition={{
                  scale: { repeat: Infinity, duration: 2.0, ease: 'easeInOut' },
                  opacity: { duration: 0.5 }
                }}
                className="text-gold-primary text-3xl md:text-4.5xl font-black font-serif italic tracking-tighter"
              >
                R
              </motion.span>
            </div>
          </div>

          {/* Brand Name Text animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <h2 className="text-white text-lg md:text-xl font-bold tracking-[0.3em] uppercase select-none">
              MOHAMED RAFI<span className="text-gold-primary">.</span>
            </h2>
          </motion.div>

          {/* Cycling Taglines */}
          <div className="h-8 mt-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={getBusinessSectorText(progress)}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="text-gold-primary/80 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-center px-6 max-w-md select-none"
              >
                {getBusinessSectorText(progress)}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Live Progress Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-slate-500 text-xs font-mono font-bold tracking-widest"
          >
            <span className="text-gold-primary tabular-nums">{progress}</span>
            <span className="text-slate-600">%</span>
          </motion.div>

          <style>{`
            .preloader-glow { animation: preloader-drift 10s ease-in-out infinite; }
            @keyframes preloader-drift {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50%      { transform: translate(3%, -3%) scale(1.08); }
            }
            @media (prefers-reduced-motion: reduce) {
              .preloader-glow { animation: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;