import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import heroVideo from "../assets/hero video/yusuf-hero.mp4";
import { heroContent, personalInfo, socialLinks } from "../data/portfolioData";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  // Ambient cursor-reactive spotlight + subtle video parallax tilt (throttled via rAF)
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
        x: (px - 50) / 50, // -1 .. 1
        y: (py - 50) / 50,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const toggleVideo = async (e) => {
    e.stopPropagation();

    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Video play error:", error);
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Ambient floating particles — deterministic random spread, generated once
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 10 + Math.random() * 14,
        delay: Math.random() * -20,
        drift: (Math.random() - 0.5) * 60,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    []
  );

  const greetingWords = heroContent.greeting.trim().split(" ");
  const titleWords = personalInfo.title.trim().split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen h-[100dvh] min-h-[640px] md:min-h-[720px] overflow-hidden bg-black"
      aria-label={`${personalInfo.name} portfolio hero section`}
    >
      {/* Background Video — single transform pipeline: outer div handles cursor tilt (translate only),
          inner Ken Burns class handles the slow zoom (scale only). Kept separate so they never compound
          into an over-zoomed / cropped frame. */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0 hero-video-wrap overflow-hidden"
        style={{
          transform: `translate(${tilt.x * -8}px, ${tilt.y * -6}px)`,
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <video
          ref={videoRef}
          onEnded={handleVideoEnded}
          playsInline
          preload="metadata"
          className="hero-video w-full h-full object-cover object-center"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Cursor-reactive ambient spotlight */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${spot.x}% ${spot.y}%, rgba(129,90,238,0.18), transparent 60%)`,
        }}
      />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 z-[7] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
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

      {/* Premium cinematic overlay — indigo-tinted duotone instead of flat black */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0714]/85 via-[#0d0b1c]/50 to-[#0a0714]/15" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0714]/60 via-transparent to-[#120b26]/30" />
      {/* Soft aurora glow for atmosphere */}
      <div className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] z-[8] pointer-events-none rounded-full blur-[120px] opacity-30 bg-[#6d5bf5]" />
      <div className="absolute -bottom-1/3 right-0 w-[55%] h-[55%] z-[8] pointer-events-none rounded-full blur-[130px] opacity-20 bg-[#22d3ee]" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 px-6 pb-16 md:pb-[7%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">
        {/* Left Side: Text and Buttons with dynamic opacity while video plays */}
        <div className={`flex flex-col items-start text-left max-w-3xl w-full transition-all duration-700 origin-left ${
          isPlaying ? "opacity-10 pointer-events-none blur-[4px] scale-[0.98]" : "opacity-100"
        }`}>
          {/* Main Heading — clean name and greeting */}
          <h1 className="text-white text-[44px] leading-[1.05] md:text-[76px] lg:text-[86px] font-black mb-4 tracking-[-2px] drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]">
            <span className="block overflow-hidden">
              {greetingWords.map((word, i) => (
                <span
                  key={i}
                  className="word-reveal inline-block mr-[0.28em]"
                  style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                >
                  {word}
                  {i === greetingWords.length - 1 && (
                    <span className="text-[#7c6bf0] pulse-dot inline-block">.</span>
                  )}
                </span>
              ))}
            </span>
          </h1>

          {/* Elegant Tagline — clean, professional gradient tagline for role */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
            className="text-lg md:text-2xl font-extrabold tracking-wide mb-6 bg-gradient-to-r from-white via-[#c9bdfb] to-[#22d3ee] bg-clip-text text-transparent drop-shadow-sm font-sans"
          >
            {personalInfo.title}
          </motion.div>

          {/* Subheading with interactive JS fade-up */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="text-white/80 text-sm md:text-base font-medium mb-6 max-w-xl leading-relaxed drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Hero inline socials — placed cleanly above the buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#8b6cf7] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </motion.div>

          {/* Buttons with dynamic stagger delay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            {/* Primary Button */}
            <a
              href={heroContent.ctaPrimary.href}
              className="shine-btn relative overflow-hidden px-5 py-3 md:px-7 md:py-3 text-sm md:text-base rounded-full bg-white text-black font-extrabold hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-[0_15px_40px_rgba(0,0,0,0.28)]"
            >
              <span className="relative z-10">{heroContent.ctaPrimary.text}</span>
            </a>

            {/* Resume Download Button */}
            <a
              href={heroContent.ctaResume.href}
              download
              className="shine-btn relative overflow-hidden px-5 py-3 md:px-7 md:py-3 text-sm md:text-base rounded-full bg-white/10 border border-white/50 text-white font-extrabold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
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
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="relative z-10">{heroContent.ctaResume.text}</span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Play Video Button with breathing rings */}
        <button
          type="button"
          data-aos="zoom-in"
          data-aos-delay="600"
          className="mt-8 md:mt-0 flex flex-row md:flex-col items-center gap-2 md:gap-3 cursor-pointer group self-start md:self-auto"
          onClick={toggleVideo}
          aria-label={isPlaying ? "Pause portfolio reel" : "Play portfolio reel"}
        >
          <span className="relative w-16 h-16 md:w-24 md:h-24 flex justify-center items-center">
            {!isPlaying && (
              <>
                <span className="absolute inset-0 rounded-full border border-[#8b6cf7]/50 ring-pulse" />
                <span
                  className="absolute inset-0 rounded-full border border-[#22d3ee]/50 ring-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </>
            )}
            <span className="relative w-full h-full rounded-full border border-white/35 bg-black/35 backdrop-blur-xl flex justify-center items-center group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#6d5bf5] group-hover:to-[#22d3ee] transition-all duration-500 shadow-[0_18px_55px_rgba(0,0,0,0.38)] group-hover:shadow-[0_0_45px_rgba(139,108,247,0.55)]">
              {!isPlaying ? (
                <svg
                  className="w-6 h-6 md:w-9 md:h-9 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 md:w-9 md:h-9 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </span>
          </span>

          <span className="text-white text-[10px] md:text-xs font-black tracking-[0.25em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            {!isPlaying ? "Play Reel" : "Pause"}
          </span>
        </button>
      </div>



      {/* Component-scoped animation styles */}
      <style>{`
        .hero-video-wrap {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .hero-video {
          animation: kenburns 26s ease-in-out infinite alternate;
          backface-visibility: hidden;
          transform-origin: center center;
        }
        @keyframes kenburns {
          0%   { transform: scale(1.04); }
          100% { transform: scale(1.11); }
        }

        .particle {
          position: absolute;
          bottom: -10px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0));
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
          transform: translateY(115%) rotate(2deg);
          animation: word-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes word-in {
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        .title-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #c9bdfb 35%, #8b6cf7 55%, #22d3ee 78%, #ffffff 100%);
          background-size: 240% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: word-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                     shine-sweep 7s ease-in-out 1.5s infinite;
        }
        @keyframes shine-sweep {
          0%   { background-position: 0% center; }
          50%  { background-position: 100% center; }
          100% { background-position: 0% center; }
        }

        .pulse-dot { animation: dot-pulse 2s ease-in-out infinite; }
        @keyframes dot-pulse {
          0%, 100% { text-shadow: 0 0 0px rgba(139,108,247,0.0); transform: scale(1); }
          50%      { text-shadow: 0 0 16px rgba(139,108,247,0.9); transform: scale(1.25); }
        }

        .shine-btn::before {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
        }
        .shine-btn:hover::before { left: 130%; }

        .bounce-arrow { animation: arrow-bounce 1.6s ease-in-out infinite; }
        @keyframes arrow-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }

        .ring-pulse { animation: ring-out 2.4s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; }
        @keyframes ring-out {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        .scroll-dot { animation: scroll-dot-move 2s ease-in-out infinite; }
        @keyframes scroll-dot-move {
          0%   { top: 0.5rem; opacity: 1; }
          70%  { opacity: 0.4; }
          100% { top: 1.6rem; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video, .particle, .word-reveal, .title-gradient,
          .pulse-dot, .shine-btn::before, .bounce-arrow, .ring-pulse, .scroll-dot {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;