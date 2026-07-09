import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { emailjsConfig, personalInfo, socialLinks } from '../data/portfolioData';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Floating label field — label rides on top of the input, animates up/shrinks
// on focus or once filled, and a gradient underline sweeps in on focus.
const FloatingField = ({ as = 'input', id, name, label, type = 'text', required, textarea }) => {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <motion.div variants={fieldVariants} className="relative">
      <Tag
        type={textarea ? undefined : type}
        id={id}
        name={name}
        placeholder=" "
        required={required}
        rows={textarea ? 4 : undefined}
        className={`peer w-full bg-transparent border-b border-white/25 pt-4 pb-2 text-lg focus:outline-none transition-colors font-medium rounded-none ${
          textarea ? 'resize-none min-h-[120px]' : ''
        }`}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-4 text-white/50 text-lg font-medium pointer-events-none transition-all duration-300 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white/70"
      >
        {label}
      </label>
      <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 scale-x-0 origin-left peer-focus:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // Prevent duplicate submissions

    setStatus('sending');

    const form = formRef.current;
    const firstName = form.querySelector('#firstName')?.value || '';
    const lastName = form.querySelector('#lastName')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    // Validate inputs
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // Check if EmailJS is configured (checking both placeholder values and falsy states)
    const isConfigured = 
      emailjsConfig.serviceId && 
      emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId && 
      emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey && 
      emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    if (!isConfigured) {
      // EmailJS not configured — fallback to prefilled mailto
      const mailtoLink = `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
      window.open(mailtoLink, '_blank');
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    // EmailJS integration
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      {/* Ambient gradient glows behind the big text */}
      <div className="absolute -top-32 left-1/4 w-[32rem] h-[32rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-[26rem] h-[26rem] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter select-none scale-y-[1.6] origin-top text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-[length:200%_100%]"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", animation: 'shimmer 8s linear infinite' }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-700 to-cyan-700 overflow-hidden"
        >
          {/* Subtle inner sheen for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
            <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90">
              Reach Me
            </div>
            {/* Instagram Quick Link */}
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white hover:text-violet-700 border border-white/20 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              DM on Instagram
            </a>
          </div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative flex flex-col gap-12 md:gap-16 w-full"
          >
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <FloatingField id="firstName" name="first_name" label="First Name" required />
                <FloatingField id="lastName" name="last_name" label="Last Name" />
                <FloatingField id="email" name="user_email" label="Email" type="email" required />
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <FloatingField id="message" name="message" label="Type your message here" textarea required />
              </div>
            </div>

            {/* Bottom Section */}
            <motion.div variants={fieldVariants} className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer transition-transform duration-200 checked:scale-110" 
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  Your message will be sent directly to my inbox. I typically respond within 24-48 hours.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For urgent inquiries, reach me at <a href={`mailto:${personalInfo.emails.primary}`} className="underline hover:text-white transition-colors">{personalInfo.emails.primary}</a>
                  </p>
                  
                  <motion.button 
                    type="submit" 
                    disabled={status === 'sending'}
                    whileHover={status === 'idle' ? { scale: 1.05 } : {}}
                    whileTap={status === 'idle' ? { scale: 0.96 } : {}}
                    animate={status === 'error' ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                    transition={status === 'error' ? { duration: 0.4 } : { type: 'spring', stiffness: 300, damping: 20 }}
                    className={`px-8 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-3 duration-300 group whitespace-nowrap self-start sm:self-auto ${
                      status === 'sending' 
                        ? 'opacity-50 cursor-not-allowed bg-white/10' 
                        : status === 'success'
                        ? 'bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]'
                        : status === 'error'
                        ? 'bg-rose-600 border-rose-500 text-white'
                        : 'hover:bg-white hover:text-violet-700 hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)]'
                    }`}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        Sent Successfully ✓
                      </span>
                    ) : status === 'error' ? (
                      <span className="flex items-center gap-2">
                        Failed — Try Again
                      </span>
                    ) : 'Send Message'}
                    
                    {status === 'idle' && (
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;