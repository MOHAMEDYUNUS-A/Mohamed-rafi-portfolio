import React, { useState, useEffect, useRef } from 'react';
import { technicalSkills } from '../data/portfolioData';

// --- Helpers -------------------------------------------------------------

// Runs once when the referenced element scrolls into view. Shared by every
// SkillCard so we don't attach a dozen scroll listeners — each card gets its
// own lightweight IntersectionObserver instead, which is disconnected the
// moment it fires since we only need the "has it appeared yet" transition.
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

const proficiencyLabel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 50) return 'Proficient';
  return 'Familiar';
};

// --- Sub-components --------------------------------------------------------

const SkillProgress = ({ name, level, animate, delay }) => {
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    if (!animate) return;

    // Count the number up in step with the bar's own CSS width transition,
    // so the "72%" label and the bar visually finish together.
    const duration = 900;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setDisplayLevel(Math.round(progress * level));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animate, level, delay]);

  return (
    <div className="mb-5 group/skill">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-white text-sm font-semibold tracking-wide">{name}</span>
        <span className="flex items-center gap-2">
          <span className="hidden group-hover/skill:inline text-white/40 text-[10px] font-bold uppercase tracking-wider transition-opacity">
            {proficiencyLabel(level)}
          </span>
          <span className="text-[#22d3ee] text-xs font-bold font-mono tabular-nums w-9 text-right">
            {displayLevel}%
          </span>
        </span>
      </div>
      <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div
          className="relative h-full bg-gradient-to-r from-[#6d5bf5] to-[#22d3ee] rounded-full transition-[width] duration-[900ms] ease-out"
          style={{ width: animate ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
        >
          {/* Shimmer sweep across the filled portion once it lands */}
          <span className="absolute inset-0 skill-shimmer" />
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }) => {
  const [ref, isInView] = useInViewOnce({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:border-[#8b6cf7]/40 hover:shadow-[0_20px_50px_rgba(139,108,247,0.15)] transition-all duration-500"
    >
      {/* Corner glow that only appears on hover — subtle depth cue */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#22d3ee]/0 group-hover:bg-[#22d3ee]/10 blur-[50px] transition-all duration-500 pointer-events-none" />

      <h3 className="relative text-white text-lg font-black tracking-tight mb-6 pb-2 border-b border-white/10 uppercase flex items-center justify-between">
        {category.title}
        <span className="text-[10px] text-white/30 font-mono normal-case tracking-normal">
          {category.skills.length} skills
        </span>
      </h3>
      <div className="relative">
        {category.skills.map((skill, skillIndex) => (
          <SkillProgress
            key={skill.name}
            name={skill.name}
            level={skill.level}
            animate={isInView}
            delay={skillIndex * 120}
          />
        ))}
      </div>
    </div>
  );
};

const TechnicalSkills = () => {
  return (
    <section
      id="skills"
      className="bg-[#0a0a12] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* Background glow — drifting instead of static, matching the rest of the site */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#6d5bf5]/10 rounded-full blur-[120px] pointer-events-none skill-orb" />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[120px] pointer-events-none skill-orb"
        style={{ animationDelay: '-6s', animationDirection: 'reverse' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            Technical Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            My Skillset
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A comprehensive overview of my programming languages, frameworks, databases, and engineering concepts.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {technicalSkills.categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .skill-orb { animation: skill-orb-drift 14s ease-in-out infinite; }
        @keyframes skill-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(4%, -4%) scale(1.1); }
        }

        .skill-shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: skill-shimmer-sweep 2.2s ease-in-out infinite;
        }
        @keyframes skill-shimmer-sweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-orb, .skill-shimmer { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default TechnicalSkills;