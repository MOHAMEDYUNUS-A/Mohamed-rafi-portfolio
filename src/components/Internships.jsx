import React, { useEffect, useRef, useState } from 'react';
import { internshipsList } from '../data/portfolioData';

// Fires once when the card scrolls into view — same lightweight pattern used
// in the Skills section, so tags/skills can cascade in instead of appearing
// all at once with the card.
const useInViewOnce = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
};

const InternshipCard = ({ intern, index }) => {
  const [ref, isInView] = useInViewOnce({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className="group relative bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#8b6cf7]/30 hover:bg-black/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 flex flex-col justify-between"
    >
      {/* Corner glow on hover, consistent with the Skills cards */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#22d3ee]/0 group-hover:bg-[#22d3ee]/10 blur-[50px] transition-all duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <span className="text-white/40 text-xs font-mono font-bold tracking-widest uppercase">
            {intern.duration}
          </span>
          <span className="internship-badge bg-white/10 text-white text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-white/15">
            Internship
          </span>
        </div>
        <h3 className="text-white text-2xl font-black mb-1 tracking-tight">{intern.role}</h3>
        <p className="text-[#c9bdfb] text-sm font-black tracking-wide mb-6 uppercase">
          {intern.organization}
        </p>

        {/* Skills gained */}
        <div className="mb-6">
          <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">Skills Gained:</h4>
          <ul className="text-white/90 text-sm font-medium space-y-1 pl-4 list-disc">
            {intern.skills.map((skill, i) => (
              <li
                key={i}
                className="reveal-item"
                style={{
                  transitionDelay: `${i * 90}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Technologies used */}
      <div className="relative pt-4 border-t border-white/10">
        <h4 className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {intern.tech.map((t, i) => (
            <span
              key={t}
              className="reveal-item px-3 py-1 text-xs font-mono font-bold text-white bg-white/10 rounded-full border border-white/10 hover:bg-[#8b6cf7]/25 hover:border-[#8b6cf7]/40 transition-all"
              style={{
                transitionDelay: `${i * 70}ms`,
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(6px)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Internships = () => {
  return (
    <section className="bg-gradient-to-br from-[#4338ca] via-[#6d5bf5] to-[#22b8cf] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Ambient drifting glow orbs — same visual language as the rest of the site */}
      <div className="absolute top-10 -left-1/4 w-[55%] h-[55%] pointer-events-none rounded-full blur-[130px] opacity-20 bg-[#22d3ee] internship-orb" />
      <div
        className="absolute -bottom-1/4 right-0 w-[45%] h-[45%] pointer-events-none rounded-full blur-[130px] opacity-20 bg-[#8b6cf7] internship-orb"
        style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            Work Experience
          </h2>
          <p className="text-indigo-50/90 text-base md:text-lg font-semibold max-w-lg mx-auto">
            Practical internships where I applied engineering principles and built real-world assets.
          </p>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {internshipsList.map((intern, index) => (
            <InternshipCard key={intern.organization} intern={intern} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative stars */}
      <div className="absolute bottom-10 left-10 text-white/40 animate-pulse z-10">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>

      <style>{`
        .internship-orb { animation: internship-orb-drift 15s ease-in-out infinite; }
        @keyframes internship-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.1); }
        }

        .internship-badge { animation: badge-glow 2.4s ease-in-out infinite; }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(139,108,247,0); }
          50%      { box-shadow: 0 0 12px rgba(139,108,247,0.55); }
        }

        .reveal-item { transition: opacity 0.5s ease-out, transform 0.5s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .internship-orb, .internship-badge { animation: none; }
          .reveal-item { transition: none; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Internships;