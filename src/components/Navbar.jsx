import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

// Hoisted outside the component — these never depend on props/state,
// so there's no reason to recreate them on every render.
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HIRE_ME_MAILTO = (email) =>
  `mailto:${email}?subject=Hiring Inquiry – Portfolio&body=Hello Mohamed Yunus,%0D%0A%0D%0AI came across your portfolio and would like to discuss an opportunity with you.%0D%0A%0D%0ALooking forward to hearing from you.%0D%0ABest Regards,`;

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: 'easeInOut', staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeInOut' } },
};

const MOBILE_LINK_VARIANTS = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const tickingRef = useRef(false);

  // Throttled via rAF so the scroll handler never runs more than once per frame.
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently in view instead of
  // a second scroll listener doing manual offset math.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navClasses = useMemo(() => {
    if (isOpen) return 'bg-[#0d0b1f]/95 backdrop-blur-xl py-4';
    if (isScrolled) return 'bg-[#0d0b1f]/60 backdrop-blur-xl py-4 shadow-[0_8px_30px_rgba(13,11,31,0.35)]';
    return 'bg-transparent py-6';
  }, [isOpen, isScrolled]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left Side: Logo/Name */}
        <a href="#home" className="text-white text-2xl font-black tracking-tight whitespace-nowrap group">
          {personalInfo.brandName}
          <span className="bg-gradient-to-r from-[#8b6cf7] to-[#22d3ee] bg-clip-text text-transparent group-hover:animate-pulse">
            .
          </span>
        </a>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={label}
                href={href}
                className={`relative group font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#8b6cf7] to-[#22d3ee] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right Side: CTA Button */}
        <div className="hidden md:block">
          <a
            href={HIRE_ME_MAILTO(personalInfo.emails.primary)}
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:border-[#8b6cf7]/60 hover:shadow-[0_0_20px_rgba(139,108,247,0.35)] transition-all duration-300 backdrop-blur-md hire-shine"
          >
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none p-2" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full overflow-hidden bg-[#0d0b1f]/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  variants={MOBILE_LINK_VARIANTS}
                  href={href}
                  onClick={closeMenu}
                  className="text-white/85 hover:text-white font-bold text-lg border-b border-white/10 pb-2 transition-colors"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div variants={MOBILE_LINK_VARIANTS} className="pt-2 pb-2">
                <a
                  href={HIRE_ME_MAILTO(personalInfo.emails.primary)}
                  onClick={closeMenu}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#8b6cf7] to-[#22d3ee] text-white font-black hover:brightness-110 transition-all w-full text-center shadow-lg"
                >
                  Hire Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hire-shine::before {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
        }
        .hire-shine:hover::before { left: 130%; }
      `}</style>
    </nav>
  );
};

export default Navbar;