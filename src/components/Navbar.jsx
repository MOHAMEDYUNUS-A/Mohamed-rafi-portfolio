import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const CONTACT_MAILTO = (email) =>
  `mailto:${email}?subject=Business Connection – Portfolio&body=Hello Mr. Mohamed Rafi,%0D%0A%0D%0AI came across your executive portfolio and would like to connect to discuss potential synergy and opportunities.%0D%0A%0D%0ALooking forward to hearing from you.%0D%0ABest Regards,`;

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
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

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-4 sm:px-6">
      {/* Floating Capsule Nav Container */}
      <div 
        className={`max-w-5xl mx-auto px-6 md:px-8 py-3 rounded-full flex justify-between items-center transition-all duration-500 border ${
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-gold-primary/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)] scale-[0.98]' 
            : 'bg-[#080c14]/40 backdrop-blur-md border-gold-primary/10'
        }`}
      >
        {/* Left Logo Name */}
        <a href="#home" className="text-white text-lg sm:text-xl font-black tracking-tight whitespace-nowrap group text-left">
          <span>Mohamed</span>
          <span className="bg-gradient-to-r from-amber-500 to-gold-primary bg-clip-text text-transparent group-hover:brightness-110 ml-1">
            Rafi
          </span>
          <span className="text-gold-primary">.</span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={label}
                href={href}
                className={`relative group font-bold tracking-wide text-xs uppercase transition-colors duration-300 ${
                  isActive ? 'text-gold-primary' : 'text-slate-350 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-gold-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden md:block">
          <a
            href={CONTACT_MAILTO(personalInfo.emails.primary)}
            className="relative overflow-hidden px-5 py-2 rounded-full bg-slate-900 border border-gold-primary/30 text-gold-primary font-bold text-xs uppercase tracking-wider hover:border-gold-primary hover:bg-gold-primary hover:text-black transition-all duration-300 backdrop-blur-md hire-shine cursor-pointer shadow-sm"
          >
            <span className="relative z-10">Contact Me</span>
          </a>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none p-1.5 cursor-pointer" aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={MOBILE_MENU_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-4 right-4 mt-2 overflow-hidden bg-slate-950/95 backdrop-blur-xl shadow-2xl border border-gold-primary/20 rounded-3xl z-40"
          >
            <div className="flex flex-col px-6 py-5 space-y-4 text-left">
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  variants={MOBILE_LINK_VARIANTS}
                  href={href}
                  onClick={closeMenu}
                  className="text-slate-300 hover:text-gold-primary font-bold text-base border-b border-slate-900 pb-2 transition-colors uppercase tracking-wider text-left"
                >
                  {label}
                </motion.a>
              ))}
              <motion.div variants={MOBILE_LINK_VARIANTS} className="pt-2">
                <a
                  href={CONTACT_MAILTO(personalInfo.emails.primary)}
                  onClick={closeMenu}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-400 text-black font-bold uppercase tracking-wider hover:brightness-110 transition-all w-full text-center shadow-lg cursor-pointer"
                >
                  Contact Me
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
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          transition: left 0.75s ease;
        }
        .hire-shine:hover::before { left: 130%; }
      `}</style>
    </nav>
  );
};

export default Navbar;