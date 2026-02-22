import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. NAVBAR ("The Floating Island") ---
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
      <div className="font-sans font-bold text-lg tracking-tight">Apex.</div>
      <div className="hidden md:flex items-center gap-8 font-serif italic text-[1.1rem]">
        <a href="#philosophy" className="link-hover hover:text-accent transition-colors">Philosophy</a>
        <a href="#features" className="link-hover hover:text-accent transition-colors">Method</a>
        <a href="#protocol" className="link-hover hover:text-accent transition-colors">Protocol</a>
      </div>
      <button className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-5 py-2 rounded-full font-sans font-medium text-sm flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_5px_15px_rgba(6,182,212,0.3)]">
        <span className="relative z-10 block">Consultation</span>
      </button>
    </nav>
  );
};

// --- 2. HERO SECTION ("The Opening Shot") ---
const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 md:pb-32 px-6 md:px-16 bg-white">
      <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2600&auto=format&fit=crop"
          alt="Abstract clinical environment"
          className="w-full h-full object-cover opacity-30 mix-blend-multiply filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl text-primary">
        <h1 className="flex flex-col gap-1 md:gap-2">
          <span className="hero-element font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter text-primary">Dentistry is the</span>
          <span className="hero-element font-serif italic text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-accent font-medium">Art of Precision.</span>
        </h1>
        <p className="hero-element mt-10 md:mt-12 font-mono text-sm md:text-base text-primary/70 max-w-md">
          Apex Dental Studio — Advanced, pain-free cosmetic and general dentistry tailored to your biological profile.
        </p>
        <div className="hero-element mt-10 flex gap-4">
          <button className="magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-semibold flex items-center gap-2 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] border border-white/20">
            <span className="relative z-10 block">Book Your Free Consultation</span>
            <ChevronRight className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 3. FEATURES ("Interactive Functional Artifacts") ---
const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Smile Architecture', desc: 'Symmetrical alignment mapping' },
    { id: 2, title: 'Veneer Crafting', desc: 'Porcelain master-level finishes' },
    { id: 3, title: 'Tissue Sculpting', desc: 'Harmonious gum line contours' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px] relative overflow-hidden group">
      <div>
        <h3 className="font-sans font-bold text-xl text-primary tracking-tight">Cosmetic Specialists</h3>
        <p className="font-serif italic text-dark/60 mt-2 text-lg">Award-winning precision</p>
      </div>
      <div className="relative h-48 mt-8 perspective-1000">
        {items.map((item, index) => {
          const isTop = index === 0;
          return (
            <div
              key={item.id}
              className={`absolute inset-x-0 bottom-0 bg-white border border-primary/10 rounded-2xl p-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
              style={{
                transform: `translateY(-${index * 15}px) scale(${1 - index * 0.05})`,
                opacity: 1 - index * 0.3,
                zIndex: 10 - index
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isTop ? 'bg-primary text-background' : 'bg-background text-primary/50'}`}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-primary">{item.title}</div>
                  <div className="font-mono text-[10px] text-dark/50 mt-1">{item.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "Atmosphere: Calm\nAcoustics: Dampened\nAromatherapy: Active\nAnxiety levels optimizing...";

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.charAt(i);
        setText(currentText);
        i++;
      } else {
        setTimeout(() => { i = 0; currentText = ''; setText(''); }, 3000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-sans font-bold text-xl text-primary tracking-tight">Spa-Like Environment</h3>
          <p className="font-serif italic text-dark/60 mt-2 text-lg">Stress-free experience</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase text-primary font-semibold tracking-wider">Live Feed</span>
        </div>
      </div>
      <div className="bg-[#EAE8E2] rounded-2xl p-5 mt-8 h-48 font-mono text-sm text-primary flex items-start break-words whitespace-pre-wrap border border-primary/5 shadow-inner">
        <span>{text}</span>
        <span className="w-2 h-4 bg-accent inline-block ml-1 animate-[pulse_1s_infinite]"></span>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      gsap.set('.cursor-svg', { x: 20, y: 150, opacity: 0 });
      gsap.set('.calendar-cell-active', { backgroundColor: 'transparent', color: '#1A1A1A' });
      gsap.set('.save-btn', { scale: 1 });

      tl.to('.cursor-svg', { opacity: 1, duration: 0.3 })
        .to('.cursor-svg', { x: 175, y: 100, duration: 1, ease: 'power2.inOut' })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.calendar-cell-active', { backgroundColor: '#CC5833', color: '#FFF', duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.cursor-svg', { x: 200, y: 130, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1 }, '<')
        .to('.cursor-svg', { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, duration: 0.1 }, '<')
        .to('.cursor-svg', { opacity: 0, duration: 0.3, delay: 0.5 });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between h-[360px]" ref={svgRef}>
      <div>
        <h3 className="font-sans font-bold text-xl text-primary tracking-tight">Transparent Pricing</h3>
        <p className="font-serif italic text-dark/60 mt-2 text-lg">Upfront, always</p>
      </div>

      <div className="relative h-48 w-full mt-8 border border-primary/10 rounded-2xl p-4 bg-white select-none">
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-center font-mono text-[10px] text-dark/40">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`h-8 rounded-lg flex items-center justify-center font-sans text-xs ${i === 10 ? 'calendar-cell-active bg-primary/5 text-dark' : 'bg-primary/5 text-dark'}`}>
              {i + 10}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <div className="save-btn bg-primary text-background px-4 py-1.5 rounded-full font-mono text-[10px] uppercase shadow-sm">Review Cost</div>
        </div>

        <svg
          className="cursor-svg absolute top-0 left-0 w-6 h-6 z-10 pointer-events-none drop-shadow-md"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#1A1A1A' }}
        >
          <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" className="fill-white" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-16 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  );
};

// --- 4. PHILOSOPHY ("The Manifesto") ---
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-32 md:py-56 px-6 md:px-16 bg-offWhite text-primary overflow-hidden shadow-[inset_0_20px_40px_rgba(0,0,0,0.02)]">
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop"
          alt="Clinical architecture texture"
          className="w-full h-full object-cover filter grayscale"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8 md:gap-16 items-center text-center">
        <p className="phil-line font-mono text-sm md:text-base text-primary/60 uppercase tracking-widest max-w-md">
          Most dentistry focuses on: rapid volume.
        </p>
        <h2 className="flex flex-col gap-2 items-center">
          <span className="phil-line font-sans font-bold text-3xl md:text-5xl tracking-tight">We focus on:</span>
          <span className="phil-line font-serif italic text-6xl md:text-[8rem] mt-2 block leading-none">Precision <span className="text-accent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">comfort.</span></span>
        </h2>
      </div>
    </section>
  );
};

// --- 5. PROTOCOL ("Sticky Stacking Archive") ---
// --- 5. PROTOCOL ("Sticky Stacking Archive") ---
const Protocol = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        // Pin the card (pinSpacing: false allows the next card to slide over it, except the last one)
        ScrollTrigger.create({
          trigger: card,
          start: 'top 10%',
          end: '+=100%',
          pin: true,
          pinSpacing: i === cardsRef.current.length - 1,
        });

        // The exit animation for the underlying card triggers exactly when the next card enters the viewport
        const nextCard = cardsRef.current[i + 1];
        if (nextCard) {
          gsap.to(card, {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.2, // Clean fade
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 90%',
              end: 'top 10%',
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      num: '01',
      title: 'Digital Consultation',
      desc: '3D spatial mapping of your oral architecture in a relaxed environment.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2600&auto=format&fit=crop', // relatable to spatial mapping/clinical
      RenderVisual: () => (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <g className="animate-[spin_15s_linear_infinite]" style={{ transformOrigin: 'center' }}>
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            <polygon points="50,20 80,40 80,60 50,80 20,60 20,40" fill="rgba(255,255,255,0.1)" stroke="#0F172A" strokeWidth="0.5" className="opacity-80" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#06B6D4" strokeWidth="0.5" strokeDasharray="2 4" />
          </g>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Precision Blueprint',
      desc: 'Transparent outlining of timeline, biological impact, and clear costs.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2600&auto=format&fit=crop', // relatable to blueprint/architecture
      RenderVisual: () => (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-30">
            {Array.from({ length: 36 }).map((_, idx) => (
              <div key={idx} className="border border-slate-400 rounded-[2px]"></div>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_#06B6D4] animate-[scan_3s_ease-in-out_infinite]" style={{ animationDirection: 'alternate' }}></div>
          <style>{`@keyframes scan { from { top: 0; } to { top: 100%; } }`}</style>
        </div>
      )
    },
    {
      num: '03',
      title: 'Guided Transformation',
      desc: 'Silent execution under profound anesthetic protocol. Zero discomfort.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2600&auto=format&fit=crop', // relatable to tranquil hospital/transformation
      RenderVisual: () => (
        <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
          <path d="M0,50 L50,50 L60,20 L75,90 L90,10 L105,70 L115,50 L200,50"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            strokeDashoffset="400"
            className="animate-[pulseWave_3s_linear_infinite]"
          />
          <style>{`@keyframes pulseWave { 0% { stroke-dashoffset: 400; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -400; } }`}</style>
        </svg>
      )
    }
  ];

  return (
    <section ref={containerRef} id="protocol" className="py-24 md:py-32 px-6 pb-64 bg-background overflow-visible">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-24 relative">
        <div className="text-center relative z-0 mb-12">
          <h2 className="font-sans font-bold text-primary text-4xl md:text-5xl tracking-tight">Clinical Protocol</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-primary/50 mt-6">A systematic methodology for comfort.</p>
        </div>

        <div className="w-full relative mt-12 flex flex-col gap-[30vh]">
          {protocols.map((p, i) => (
            <div
              key={p.num}
              ref={el => cardsRef.current[i] = el}
              className={`w-full min-h-[60vh] md:min-h-[70vh] bg-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row border border-slate-100 shadow-[0_-10px_50px_rgba(15,23,42,0.06)] origin-top`}
              style={{ zIndex: i + 1 }}
            >
              <div className="flex-1 flex flex-col justify-center gap-6 pr-8 z-10">
                <span className="font-mono text-accent text-xl font-bold">[{p.num}]</span>
                <h3 className="font-sans font-bold text-3xl md:text-5xl text-primary tracking-tight leading-tight">{p.title}</h3>
                <p className="font-serif italic text-primary/70 text-xl md:text-2xl leading-relaxed max-w-lg mt-4">{p.desc}</p>
              </div>
              <div className="flex-1 min-h-[250px] md:min-h-[400px] relative bg-offWhite rounded-[2rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-inner z-10">
                {/* Descriptive Background Image */}
                <img src={p.image} className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
                {/* 2.5D Animated SVG Overlay */}
                <div className="relative z-20 w-full h-full p-8 flex items-center justify-center">
                  <p.RenderVisual />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. CTA / PRICING ---
const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-16 container mx-auto">
      <div className="bg-primary/5 rounded-[3rem] overflow-hidden relative p-12 md:p-24 flex flex-col items-center text-center shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-primary/10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>

        <h2 className="relative z-10 font-serif italic text-5xl md:text-[5rem] text-primary leading-none">Begin the process.</h2>
        <p className="relative z-10 font-sans mt-8 text-primary/80 max-w-xl text-lg">
          Experience dentistry engineered for those who demand precision and absolute comfort.
        </p>

        <div className="relative z-10 mt-12 w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[2rem] p-8 border border-white shadow-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-primary/60 mb-6 font-bold">Initial Assessment</div>
          <div className="font-sans text-primary text-4xl tracking-tight font-bold mb-8">Complimentary</div>

          <button className="w-full magnetic-button bg-gradient-to-r from-accent to-[#0ea5e9] text-white px-8 py-4 rounded-full font-sans font-bold text-lg mb-4 shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(6,182,212,0.3)] hover:brightness-110 transition-all">
            <span className="relative z-10">Schedule Online</span>
          </button>
          <button className="w-full magnetic-button bg-white/50 text-primary border border-primary/10 px-8 py-4 rounded-full font-sans font-semibold hover:bg-white transition-all shadow-sm">
            <span className="relative z-10">Call Studio</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 7. FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-primary text-white rounded-t-[4rem] px-6 md:px-16 py-16 md:py-24 mt-24 shadow-[0_-20px_50px_rgba(15,23,42,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8">

        <div className="max-w-sm">
          <div className="font-sans font-bold text-3xl tracking-tight mb-4 text-white">Apex.</div>
          <p className="font-serif italic text-white/70 text-lg">
            Advanced, pain-free cosmetic and general dentistry.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 font-sans text-sm">
          <div className="flex flex-col gap-4 text-white/70">
            <div className="text-white font-semibold font-mono text-xs uppercase tracking-widest mb-2">Practice</div>
            <a href="#philosophy" className="link-hover hover:text-accent transition-colors">Philosophy</a>
            <a href="#protocol" className="link-hover hover:text-accent transition-colors">Methodology</a>
            <a href="#features" className="link-hover hover:text-accent transition-colors">Patient Stories</a>
          </div>
          <div className="flex flex-col gap-4 text-white/70">
            <div className="text-white font-semibold font-mono text-xs uppercase tracking-widest mb-2">Legal</div>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Accessibility</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-white/40">© {new Date().getFullYear()} Apex Dental Studio. All rights reserved.</p>

        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#06B6D4] animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
