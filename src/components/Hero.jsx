import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { personalInfo, socialLinks, logisticsData, hrData } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { motion, useScroll, useTransform } from "framer-motion";
import rafiBgRemoved from '../assets/about/rafi bg removed.png'; // User's background removed photo

const Hero = () => {
  const { portfolioMode } = usePortfolio();
  const heroContent = portfolioMode === 'logistics' ? logisticsData.hero : hrData.hero;
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Scroll-linked background parallax and fade
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.96]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ambient cursor-reactive spotlight
  const handleMouseMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setSpot({ x: px, y: py });
      setTilt({
        x: (px - 50) / 50,
        y: (py - 50) / 50,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const triggerCvDownload = async (e, href) => {
    e.preventDefault();
    try {
      const response = await fetch(href);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "Mohamed Rafi Niyaz Deen-CV.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Blob download failed, falling back to direct link", err);
      const link = document.createElement('a');
      link.href = href;
      link.download = "Mohamed Rafi Niyaz Deen-CV.pdf";
      link.target = "_blank";
      link.click();
    }
  };

  // Ambient floating gold particles
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.8,
        duration: 13 + Math.random() * 13,
        delay: Math.random() * -20,
        drift: (Math.random() - 0.5) * 50,
        opacity: 0.15 + Math.random() * 0.4,
      })),
    []
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen pt-14 pb-14 lg:pt-16 lg:pb-16 overflow-hidden bg-slate-dark flex items-center border-b border-gold-primary/15"
      aria-label={`${personalInfo.name} portfolio hero section`}
    >
      {/* Premium Looping Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.22] mix-blend-screen pointer-events-none"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-glowing-gold-particles-on-black-background-40013-large.mp4" type="video/mp4" />
      </video>

      {/* Background Interactive grid */}
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e2b85702_1px,transparent_1px),linear-gradient(to_bottom,#e2b85702_1px,transparent_1px)] bg-[size:60px_60px] transition-transform duration-700 pointer-events-none opacity-40"
        style={{
          transform: `translate(${tilt.x * 5}px, ${tilt.y * 3}px)`,
        }}
      />

      {/* Cursor-reactive ambient gold spotlight */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(800px circle at ${spot.x}% ${spot.y}%, rgba(226,184,87,0.11), transparent 55%)`,
        }}
      />

      {/* Floating ambient gold particles */}
      <div className="absolute inset-0 z-[7] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="gold-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Luxury atmospheric overlays */}
      <div className="absolute inset-0 z-10 bg-slate-dark/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-dark via-slate-dark/30 to-transparent" />
      
      {/* Auroral glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] z-[8] pointer-events-none rounded-full blur-[140px] opacity-[var(--glow-opacity-10)] bg-gold-primary" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] z-[8] pointer-events-none rounded-full blur-[140px] opacity-[var(--glow-opacity-10)] bg-gold-dark" />

      {/* Content Container Grid */}
      <div className="relative z-20 px-6 pt-3 pb-8 md:pt-4 md:pb-12 lg:pt-5 lg:pb-16 lg:px-12 max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Left-aligned Text Content (7 Column width on desktop) */}
          <motion.div 
            style={isMobile ? {} : { opacity, y, scale }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Mobile Avatar Badge - visible only on mobile/tablet. Uses object-top to prevent clipping */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.82, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 2.2 }}
              className="lg:hidden w-28 h-28 rounded-full border-2 border-gold-primary/30 p-1 bg-slate-950/80 shadow-[0_0_20px_rgba(226,184,87,0.35)] mb-8 flex items-center justify-center relative overflow-hidden"
            >
              <img
                src={rafiBgRemoved}
                alt="Mohamed Rafi"
                className="w-full h-full object-cover object-top rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* Main Name Heading - word delays sync to preloader load duration */}
            <h1 className="text-slate-50 text-[44px] leading-[1.05] md:text-[68px] lg:text-[76px] font-black mb-6 tracking-tight drop-shadow-[0_12px_40px_rgba(0,0,0,0.65)] select-none">
              <span className="block overflow-hidden py-1">
                {/* Mohamed Rafi (Large bold size) */}
                <span
                  className="word-reveal inline-block"
                  style={{ animationDelay: '2.3s' }}
                >
                  Mohamed Rafi
                </span>
                
                {/* Niyaz Deen (Reduced size, block alignment on new line) */}
                <span
                  className="word-reveal block text-[26px] md:text-[44px] lg:text-[48px] font-extrabold text-slate-350 tracking-tight mt-2.5"
                  style={{ animationDelay: '2.5s' }}
                >
                  Niyaz Deen
                  <span className="text-gold-primary pulse-dot inline-block ml-1">.</span>
                </span>
              </span>
            </h1>

            {/* Elegant Animated Decorative Sweep Line */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-gold-primary to-transparent mb-7 opacity-80 animate-width-sweep" />

            {/* Elegant Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 2.6 }}
              className="text-xl md:text-3xl font-extrabold tracking-wide mb-6 bg-gradient-to-r from-slate-50 via-slate-350 to-gold-primary bg-clip-text text-transparent drop-shadow-sm font-sans uppercase text-left"
            >
              {personalInfo.title}
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 2.7 }}
              className="text-slate-300 text-base md:text-lg font-medium mb-10 max-w-2xl leading-relaxed drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)] text-left"
            >
              {heroContent.subtitle}
            </motion.p>

            {/* Social Network Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 2.8 }}
              className="flex items-center justify-start gap-4 mb-10"
            >
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-gold-primary transition-colors duration-300 flex items-center gap-2.5 text-xs font-black uppercase tracking-widest group border border-gold-primary/10 px-5 py-2 rounded-full bg-slate-950/40 hover:bg-slate-950/80 hover:border-gold-primary/30 shadow-inner"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5 group-hover:scale-110 transition-transform text-gold-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn Corporate Profile</span>
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 2.9 }}
              className="flex flex-row flex-wrap items-center justify-start gap-5 w-full"
            >
              <a
                href={heroContent.ctaPrimary.href}
                className="shine-btn relative overflow-hidden px-8 py-4 text-sm md:text-base rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-black hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_15px_40px_rgba(226,184,87,0.3)] cursor-pointer"
              >
                <span className="relative z-10 uppercase tracking-wider">{heroContent.ctaPrimary.text}</span>
              </a>

              <a
                href={heroContent.ctaResume.href}
                onClick={(e) => triggerCvDownload(e, heroContent.ctaResume.href)}
                download="Mohamed Rafi Niyaz Deen-CV.pdf"
                className="shine-btn relative overflow-hidden px-8 py-4 text-sm md:text-base rounded-full bg-slate-950 border border-gold-primary/35 text-gold-primary font-black hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all duration-300 flex items-center gap-2 shadow-inner transform hover:-translate-y-1 cursor-pointer"
              >
                <svg
                  className="relative z-10 w-4 h-4 bounce-arrow"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="relative z-10 uppercase tracking-wider">{heroContent.ctaResume.text}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Background Removed Picture - hidden on mobile, visible on desktop (5 Column width on desktop) */}
          <div className="hidden lg:flex lg:col-span-5 w-full justify-center items-end lg:h-full relative mt-10 lg:mt-0 select-none overflow-visible">
            {/* Light golden aura effect behind the portrait */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(226,184,87,0.24)_0%,rgba(226,184,87,0.05)_65%,transparent_100%)] blur-[50px] pointer-events-none animate-pulse-glow" />

            {/* Picture container with Right Reveal slide-in animation triggered post preloader */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.35 }}
              className="relative w-full max-w-[320px] lg:max-w-[400px] flex items-end justify-center z-10"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
              }}
            >
              <img
                src={rafiBgRemoved}
                alt="Mohamed Rafi"
                className="w-full h-auto max-h-[80vh] lg:max-h-[85vh] object-contain drop-shadow-[0_20px_50px_rgba(226,184,87,0.22)] hover:scale-[1.015] transition-transform duration-500"
              />
            </motion.div>
          </div>

        </div>

      </div>

      {/* Styling for Gold particles drift, word reveal, gold glows, and sweeps */}
      <style>{`
        .gold-particle {
          position: absolute;
          bottom: -10px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(226,184,87,0.85) 0%, rgba(226,184,87,0) 80%);
          animation-name: float-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes float-up {
          0%   { transform: translate(0, 0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translate(var(--drift), -110vh); opacity: 0; }
        }

        .word-reveal {
          opacity: 0;
          transform: translateY(115%) rotate(1.5deg);
          animation: word-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes word-in {
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        .pulse-dot { animation: dot-pulse 2s ease-in-out infinite; }
        @keyframes dot-pulse {
          0%, 100% { text-shadow: 0 0 0px rgba(226,184,87,0.0); transform: scale(1); }
          50%      { text-shadow: 0 0 18px rgba(226,184,87,0.95); transform: scale(1.3); }
        }

        .shine-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.35) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: 0.75s;
        }
        .shine-btn:hover::before {
          left: 150%;
        }

        .bounce-arrow {
          animation: bounce-arrow 1.8s infinite;
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }

        @keyframes width-sweep {
          0% { width: 0px; opacity: 0; }
          100% { width: 96px; opacity: 0.8; }
        }
        .animate-width-sweep {
          animation: width-sweep 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards 2.5s;
        }

        @keyframes pulse-glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.82; }
          50%      { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gold-particle, .word-reveal, .pulse-dot, .bounce-arrow, .animate-width-sweep, .animate-pulse-glow { animation: none; }
          .word-reveal { opacity: 1; transform: none; }
          .animate-width-sweep { width: 96px; opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Hero;