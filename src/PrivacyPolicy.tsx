import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(24px)', color: '#0F172A', borderColor: 'rgba(255,255,255,0.8)', duration: 0.3 }),
        onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', color: '#0F172A', borderColor: 'transparent', duration: 0.3 })
      });
      gsap.set(navRef.current, { color: '#0F172A', backgroundColor: 'transparent', borderColor: 'transparent' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[3rem] w-[90%] max-w-4xl border border-transparent shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
    >
      <a href="/" className="font-sans text-lg font-bold tracking-tight">ATL Perio Group</a>
      <div className="hidden md:flex items-center gap-8 font-serif italic text-[1.1rem]">
        <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">Philosophy</a>
        <a href="/#features" className="transition-colors link-hover hover:text-accent">Method</a>
        <a href="/#protocol" className="transition-colors link-hover hover:text-accent">Protocol</a>
      </div>
      <button
        onClick={() => window.open("https://book.modento.io/atlanta-periodontal-group", "_blank")}
        className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-5 py-2 rounded-full font-sans font-medium text-sm flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_5px_15px_rgba(6,182,212,0.3)]"
      >
        <span className="relative z-10 block">Consultation</span>
      </button>
    </nav>
  );
};

const TermsOfService = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.terms-section', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section ref={containerRef} className="max-w-4xl px-6 pt-40 pb-24 mx-auto md:px-16">
        <h1 className="mb-4 font-sans text-4xl font-bold tracking-tight md:text-5xl text-primary">Terms of Service</h1>
        <p className="mb-12 font-mono text-sm text-primary/60">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-8">
          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Acceptance of Terms</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              By accessing and using the Atlanta Periodontal Group website and services, you agree to comply with these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Medical Disclaimer</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              The information provided on this website is for general informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for medical diagnosis and treatment. No doctor-patient relationship is established through your use of this website.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Appointment Scheduling</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              Appointment requests made through our scheduling platform are not confirmed until you receive a confirmation from our office. We reserve the right to reschedule appointments based on provider availability and clinical urgency.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Cancellation Policy</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              We require at least 24 hours' notice for appointment cancellations. Late cancellations or no-shows may be subject to a fee. This policy allows us to serve all patients effectively.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Intellectual Property</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              All content on this website, including text, images, graphics, and logos, is the property of Atlanta Periodontal Group and may not be reproduced, distributed, or used without prior written permission.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Limitation of Liability</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              To the fullest extent permitted by law, Atlanta Periodontal Group shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or our services.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Governing Law</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              These Terms are governed by the laws of the State of Georgia. Any disputes shall be resolved in the courts of Fulton County, Georgia.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="mb-3 font-sans text-2xl font-bold text-primary">Contact Us</h2>
            <p className="font-serif text-lg leading-relaxed text-primary/70">
              For questions about these Terms of Service, contact us at:
            </p>
            <div className="p-6 mt-4 border bg-primary/5 rounded-2xl border-primary/10">
              <p className="font-sans text-primary"><strong>Atlanta Periodontal Group</strong></p>
              <p className="font-serif text-primary/70">Phone: <a href="tel:+17709945678" className="text-accent hover:underline">(770) 994-5678</a></p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white rounded-t-[4rem] px-6 md:px-16 py-16 md:py-24 mt-24 shadow-[0_-20px_50px_rgba(15,23,42,0.1)]">
      <div className="flex flex-col justify-between gap-16 mx-auto max-w-7xl md:flex-row md:gap-8">
        <div className="max-w-sm">
          <div className="mb-4 font-sans text-3xl font-bold tracking-tight text-white">ATL Perio Group</div>
          <p className="font-serif text-lg italic text-white/70">Atlanta's best Periodontist.</p>
        </div>
        <div className="grid grid-cols-2 gap-12 font-sans text-sm">
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Practice</div>
            <a href="/#philosophy" className="transition-colors link-hover hover:text-accent">Philosophy</a>
            <a href="/#protocol" className="transition-colors link-hover hover:text-accent">Methodology</a>
            <a href="https://www.google.com/search?q=Atlanta-Periodontal-Group#reviews" className="transition-colors link-hover hover:text-accent">Patient Reviews</a>
          </div>
          <div className="flex flex-col gap-4 text-white/70">
            <div className="mb-2 font-mono text-xs font-semibold tracking-widest text-white uppercase">Legal</div>
            <a href="/privacy" className="transition-colors hover:text-accent">Privacy Policy</a>
            <a href="/terms" className="transition-colors hover:text-accent">Terms of Service</a>
            <a href="/accessibility" className="transition-colors hover:text-accent">Accessibility</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 pt-8 mx-auto mt-24 border-t max-w-7xl border-white/10 md:flex-row">
        <p className="font-mono text-xs text-white/40">© {new Date().getFullYear()} ATL Perio Group. All rights reserved.</p>
        <div className="flex items-center gap-3 px-4 py-2 border rounded-full shadow-inner bg-white/5 border-white/10">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#06B6D4] animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default TermsOfService;