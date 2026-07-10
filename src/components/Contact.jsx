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

const FloatingField = ({ id, name, label, type = 'text', required, textarea }) => {
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
        className={`peer w-full bg-transparent border-b border-slate-700 pt-4 pb-2 text-base focus:outline-none transition-colors font-medium rounded-none text-white focus:border-gold-primary ${
          textarea ? 'resize-none min-h-[100px]' : ''
        }`}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-4 text-slate-400 text-sm sm:text-base font-medium pointer-events-none transition-all duration-300 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-gold-primary peer-[:not(:placeholder-shown)]:-top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-350"
      >
        {label}
      </label>
      <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gradient-to-r from-amber-600 via-gold-primary to-yellow-300 scale-x-0 origin-left peer-focus:scale-x-100 transition-transform duration-500" />
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    const form = formRef.current;
    const firstName = form.querySelector('#firstName')?.value || '';
    const lastName = form.querySelector('#lastName')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const message = form.querySelector('#message')?.value || '';

    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const isConfigured = 
      emailjsConfig.serviceId && 
      emailjsConfig.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailjsConfig.templateId && 
      emailjsConfig.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailjsConfig.publicKey && 
      emailjsConfig.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    if (!isConfigured) {
      const mailtoLink = `mailto:${personalInfo.emails.primary}?subject=Portfolio Contact from ${firstName} ${lastName}&body=${encodeURIComponent(`From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`)}`;
      window.open(mailtoLink, '_blank');
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

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
    <section ref={ref} id="contact" className="bg-[#080c14] w-full min-h-screen relative overflow-hidden pt-24 pb-32 px-6 md:px-12 border-t border-gold-primary/10 flex items-center">
      
      {/* Background drifting glow accents */}
      <div className="absolute top-1/4 left-10 w-[32rem] h-[32rem] bg-gold-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[26rem] h-[26rem] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Huge Background Contact Text - elegant layout */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter select-none scale-y-[1.5] origin-top text-transparent bg-clip-text bg-gradient-to-r from-amber-600/10 via-gold-primary/10 to-yellow-300/10 opacity-70"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          CONTACT
        </h1>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Two-Column Grid: Splits contact information and email message form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Corporate Office Info & Details */}
          <div data-aos="fade-right" className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-block border border-gold-primary/20 rounded-full px-5 py-1.5 text-xs text-gold-primary font-bold mb-6 shadow-sm bg-slate-900/50 backdrop-blur-sm uppercase tracking-widest">
              Get In Touch
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-[1.1]">
              Let's Align On <br className="hidden md:block" />
              Your Next Venture
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base font-semibold leading-relaxed mb-10 max-w-sm">
              Inquire about technical logistics consulting, workforce outsourcing deals, intralogistics system sizing, or joint venture facilitation.
            </p>

            {/* Structured Contact Details List */}
            <div className="flex flex-col gap-6 w-full mb-10">
              {/* Location Detail */}
              <div className="flex items-center gap-4 text-left">
                <span className="w-11 h-11 rounded-xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center text-gold-primary text-lg">
                  📍
                </span>
                <div>
                  <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Location</h4>
                  <p className="text-white text-sm font-black uppercase">Al-Jubail, Eastern Province, KSA</p>
                </div>
              </div>

              {/* Email Detail */}
              <div className="flex items-center gap-4 text-left">
                <span className="w-11 h-11 rounded-xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center text-gold-primary text-lg">
                  ✉️
                </span>
                <div>
                  <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Email</h4>
                  <a href={`mailto:${personalInfo.emails.primary}`} className="text-white text-sm font-black hover:text-gold-primary transition-colors uppercase">
                    {personalInfo.emails.primary}
                  </a>
                </div>
              </div>

              {/* Iqama Status Detail */}
              <div className="flex items-center gap-4 text-left">
                <span className="w-11 h-11 rounded-xl bg-gold-primary/10 border border-gold-primary/15 flex items-center justify-center text-gold-primary text-lg">
                  🆔
                </span>
                <div>
                  <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Iqama Status</h4>
                  <p className="text-white text-sm font-black uppercase">Transferable Iqama (No. 2529781821)</p>
                </div>
              </div>
            </div>

            {/* Social Network Link */}
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-slate-950/80 border border-gold-primary/20 text-white px-5 py-3 rounded-full hover:bg-gold-primary hover:text-black hover:border-gold-primary hover:shadow-[0_10px_25px_rgba(226,184,87,0.25)] transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Right Column: Contact Message Form Panel */}
          <div data-aos="fade-left" className="lg:col-span-7 w-full bg-slate-950/60 backdrop-blur-md border border-gold-primary/15 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle inner sheen */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,184,87,0.04),transparent_55%)] pointer-events-none" />

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="relative flex flex-col gap-10 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                <FloatingField id="firstName" name="first_name" label="First Name" required />
                <FloatingField id="lastName" name="last_name" label="Last Name" />
              </div>
              
              <FloatingField id="email" name="user_email" label="Email Address" type="email" required />
              
              <FloatingField id="message" name="message" label="Type your message here" textarea required />

              {/* GOSI / Contact Permission check */}
              <div className="flex items-start gap-4 text-xs font-semibold text-slate-355 text-left">
                <input 
                  type="checkbox" 
                  id="permission" 
                  className="mt-1 w-4 h-4 rounded-sm border-gold-primary/30 bg-transparent text-black focus:ring-gold-primary focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer transition-transform duration-200 checked:scale-110" 
                  style={{ accentColor: "#e2b857" }}
                  required
                />
                <label htmlFor="permission" className="cursor-pointer leading-snug">
                  I give permission to contact me at this email address to discuss business opportunities.
                </label>
              </div>

              {/* Submit Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-4 border-t border-gold-primary/10">
                <p className="text-slate-500 text-[11px] font-mono leading-normal max-w-[280px] text-left">
                  Your message goes directly to my secure inbox. Responses typically take 24-48 hours.
                </p>
                
                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={status === 'idle' ? { scale: 1.04 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                  animate={status === 'error' ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={status === 'error' ? { duration: 0.4 } : { type: 'spring', stiffness: 300, damping: 20 }}
                  className={`px-8 py-3.5 rounded-full border border-gold-primary/45 text-white font-bold flex items-center justify-center gap-3 duration-300 group whitespace-nowrap self-start sm:self-auto cursor-pointer ${
                    status === 'sending' 
                      ? 'opacity-50 cursor-not-allowed bg-slate-900/50' 
                      : status === 'success'
                      ? 'bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]'
                      : status === 'error'
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'hover:bg-gold-primary hover:text-black hover:border-gold-primary hover:shadow-[0_10px_30px_rgba(226,184,87,0.25)]'
                  }`}
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : status === 'success' ? (
                    <span>Sent Successfully ✓</span>
                  ) : status === 'error' ? (
                    <span>Failed — Retry</span>
                  ) : 'Send Message'}
                  
                  {status === 'idle' && (
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </motion.button>
              </div>

            </motion.form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;