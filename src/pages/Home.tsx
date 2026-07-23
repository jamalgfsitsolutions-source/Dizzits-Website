import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Star, Paperclip } from "lucide-react";
import {
  ArrowUpRight,
  GlobeIcon,
} from "../components/Icons";
import { ContactForm } from '../components/ContactForm';
import { services } from '../data/services';
import pulseStudioImg from "../assets/images/pulse_studio_website_mockup_1784589258167.jpg";

gsap.registerPlugin(ScrollTrigger);

const sharedMotion = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

interface HomeProps {
  onOpenContact: () => void;
}

export function Home({ onOpenContact }: HomeProps) {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const rockRef = useRef<HTMLImageElement>(null);
  const servicesVideoRef = useRef<HTMLVideoElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const processCardsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const statsCardsRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLElement>(null);
  const bentoCardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLHeadingElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const faqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary depending on scope and complexity. A standard website might take 4-6 weeks, while a complex web application could take 3-6 months. We'll provide a detailed timeline during our kickoff." },
    { q: "What is your pricing structure?", a: "We price our projects based on value, scope, and resources required. We offer both fixed-price contracts for well-defined scopes and retainer models for ongoing product development." },
    { q: "Do you offer post-launch support?", a: "Absolutely. We offer tailored maintenance and support packages to ensure your digital product stays secure, updated, and continues to perform optimally." },
    { q: "What technologies do you specialize in?", a: "Our core stack includes React, Next.js, Node.js, and TypeScript. However, we are technology-agnostic and will always choose the right tool for your specific business requirements." },
  ];

  useGSAP(() => {
    // Hero Parallax and Fade out on scroll
    gsap.to(heroContentRef.current, {
      y: 150,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Background graphics parallax
    if (servicesRef.current) {
      gsap.to('.services-bg-graphic-1', {
        y: -400,
        rotation: 90,
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to('.services-bg-graphic-2', {
        y: -600,
        rotation: -90,
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to('.services-bg-graphic-3', {
        y: 500,
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Services Sticky Card Stack Animation
    if (servicesRef.current) {
      const cards = gsap.utils.toArray('.service-panel');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      cards.forEach((card: any, i) => {
        if (i > 0) {
          tl.fromTo(card, 
            { yPercent: 100 },
            { yPercent: 0, ease: "none" }
          );
          tl.to(cards[i-1] as Element, {
            scale: 0.9,
            opacity: 0,
            filter: "blur(10px)",
            ease: "none"
          }, "<");
        }
      });
    }

    // About Section Text Animation
    if (aboutTextRef.current) {
      const words = gsap.utils.toArray('.about-word');
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: aboutTextRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        }
      });
    }

    // Hero Section Text Animation
    if (heroTextRef.current) {
      const words = gsap.utils.toArray('.hero-word');
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.8,
        delay: 0.2,
        onComplete: () => {
          gsap.to(words[words.length - 1] as HTMLElement, {
            opacity: 0.2,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            ease: "power1.inOut"
          });
        }
      });
    }

    // Portfolio Horizontal Scroll Animation
    if (portfolioRef.current && trackRef.current) {
      const getScrollAmount = () => {
        let trackWidth = trackRef.current?.scrollWidth || 0;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: portfolioRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      // Animate individual cards as they scroll horizontally into view
      const cards = gsap.utils.toArray('.portfolio-card');
      cards.forEach((card: any) => {
        gsap.fromTo(card, 
          { y: 300, opacity: 0 }, // start further down
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 95%", // Start when left edge of card enters viewport
              end: "left 20%",   // End when it reaches 20% from the left
              scrub: 1,          // Map directly to scroll position!
            }
          }
        );
      });
    }

    // Process Cards Animation
    if (processCardsRef.current) {
      const pCards = gsap.utils.toArray(processCardsRef.current.children);
      gsap.fromTo(
        pCards,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Stats Cards Animation
    if (statsCardsRef.current) {
      const sCards = gsap.utils.toArray(statsCardsRef.current.children);
      gsap.fromTo(
        sCards,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Bento Box Animation
    if (bentoCardsRef.current) {
      const bCards = gsap.utils.toArray(bentoCardsRef.current.children);
      gsap.fromTo(
        bCards,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // CTA Animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        {
          scale: 0.9,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Footer Animation
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, { scope: container });

  return (
    <div ref={container} className="w-full bg-black text-white selection:bg-white/30 relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[40vh] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30vh] bg-white/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Navbar handled in App Layout */}
      {/* Hero Section */}
      <section ref={heroRef} id="home" className="min-h-[110vh] overflow-hidden bg-black relative flex flex-col">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/publichero-video.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 mask-fade scale-[1.35]"
        />
        
        <div className="relative z-10 flex flex-col h-full min-h-[110vh]">
          <div ref={heroContentRef} className="flex-1 flex flex-col justify-between pt-[180px] pb-20 px-8 md:px-12 lg:px-20 z-10 w-full h-full max-w-[1600px] mx-auto">
            {/* Top Left Text */}
            <div className="flex flex-col items-start w-full">
              <h1
                ref={heroTextRef}
                className="text-6xl sm:text-7xl md:text-[90px] lg:text-[110px] font-medium leading-[0.9] tracking-tight text-white mb-10 md:mb-16"
              >
                {"Designed to mean intention."
                  .split(" ")
                  .map((word, i) => (
                    <React.Fragment key={i}>
                      <span className="hero-word opacity-20">{word}</span>
                      {i === 1 ? <br /> : (i !== 3 && " ")}
                    </React.Fragment>
                  ))}
              </h1>

              <motion.button
                {...sharedMotion}
                transition={{ ...sharedMotion.transition, delay: 0.4 }}
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center gap-4 text-xs md:text-[11px] font-bold tracking-[0.2em] uppercase text-white pb-2 border-b border-white/30 hover:border-white transition-colors"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full mt-auto gap-12 md:gap-0">
              
              {/* Bottom Left */}
              <motion.div
                {...sharedMotion}
                transition={{ ...sharedMotion.transition, delay: 0.6 }}
                className="hidden md:block w-1/3"
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <ArrowRight className="w-3 h-3 transform rotate-90" />
                </div>
              </motion.div>

              {/* Bottom Center */}
              <motion.div
                {...sharedMotion}
                transition={{ ...sharedMotion.transition, delay: 0.7 }}
                className="flex flex-col items-center text-center w-full md:w-1/3"
              >
                <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white leading-relaxed">
                  Hold to <span className="text-sm">💥</span> Blast<br/>
                  Dare <span className="text-sm">⚡</span> to touch the lines.
                </p>
              </motion.div>

              {/* Bottom Right */}
              <motion.div
                {...sharedMotion}
                transition={{ ...sharedMotion.transition, delay: 0.8 }}
                className="flex flex-col items-start md:items-end w-full md:w-1/3"
              >
                <div className="flex items-center border border-white/10 rounded-sm overflow-hidden mb-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center p-4 border-r border-white/10 min-w-[80px]">
                    <GlobeIcon className="w-5 h-5 mb-2 opacity-70" />
                    <span className="text-[9px] font-bold tracking-wider uppercase opacity-70">EST. 2012</span>
                  </div>
                  <div className="p-4 flex items-center">
                    <p className="text-[10px] font-bold tracking-widest uppercase leading-snug">
                      14+ Years Shaping<br/>Digital Direction.
                    </p>
                  </div>
                </div>
                
                <p className="text-sm md:text-base text-white/70 max-w-[300px] text-left md:text-right leading-relaxed font-light">
                  Websites, AI products, brands, and systems built for clarity, scale and impact.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <section className="py-12 bg-[#020202] border-t border-b border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mb-8">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-body text-center md:text-left">Trusted by innovative companies worldwide</p>
        </div>
        <div className="relative flex overflow-hidden w-full">
          <div className="flex w-max min-w-full shrink-0 animate-marquee items-center gap-16 md:gap-32 px-8">
            {[
              "VERTEX", "AURA", "NEXUS", "PULSE", "ECHO", "LUMI", "NOVA", "QUANTA",
              "VERTEX", "AURA", "NEXUS", "PULSE", "ECHO", "LUMI", "NOVA", "QUANTA",
              "VERTEX", "AURA", "NEXUS", "PULSE", "ECHO", "LUMI", "NOVA", "QUANTA"
            ].map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center shrink-0">
                <span className="text-2xl md:text-4xl font-heading tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors duration-300 select-none">
                  {logo}
                </span>
              </div>
            ))}
          </div>
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative min-h-screen bg-[#020202] text-white flex flex-col justify-center py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
          
          {/* Abstract Wireframe Shape 1 */}
          <svg className="absolute top-[10%] left-[45%] w-[400px] h-[500px] opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
             <path d="M50 10 L80 90 L20 90 Z" />
             <path d="M50 30 L70 80 L30 80 Z" />
             <path d="M50 50 L60 70 L40 70 Z" />
             <line x1="20" y1="90" x2="50" y2="10" />
             <line x1="80" y1="90" x2="50" y2="10" />
          </svg>
          
          {/* Glowing Shape */}
          <div className="absolute bottom-[20%] left-[25%] w-[80px] h-[200px] bg-gradient-to-t from-[#FF4D00] to-[#FFA000] blur-[4px] opacity-80" style={{ transform: 'rotate(-20deg) skewX(20deg)' }}></div>
          <div className="absolute bottom-[25%] left-[22%] w-[120px] h-[40px] bg-gradient-to-r from-[#FF4D00] to-[#FFA000] blur-[4px] opacity-80" style={{ transform: 'rotate(-20deg) skewX(20deg)' }}></div>

          {/* Random Dots/Particles */}
          <div className="absolute top-[30%] left-[10%] w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-[60%] left-[80%] w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="absolute top-[80%] left-[40%] w-1 h-1 bg-[#FF4D00]/60 rounded-full"></div>
          <div className="absolute top-[20%] right-[20%] w-1 h-1 bg-white/40 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full h-full flex flex-col justify-between">
          
          {/* Top Label */}
          <div className="mb-20 md:mb-32">
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-bold text-white/70">About</span>
          </div>

          {/* Main Heading */}
          <div className="mb-32 md:mb-40 flex justify-center px-4">
            <h2 ref={aboutTextRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-medium leading-[1.05] tracking-tight text-center max-w-[1400px]">
              {"Dizzits is an independent digital studio crafting meaningful brand experiences through strategy, design, and technology."
                .split(" ")
                .map((word, i) => (
                  <React.Fragment key={i}>
                    <span className="about-word opacity-20">{word}</span>
                    {i !== 14 && " "}
                  </React.Fragment>
                ))}
            </h2>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/10 mb-16 relative">
            <div className="absolute top-1/2 left-[65%] w-2 h-2 border border-white/30 transform -translate-y-1/2 rotate-45 hidden md:block"></div>
          </div>

          {/* Bottom Content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20 pb-10">
            {/* Left Text */}
            <div className="w-full md:w-1/3">
              <p className="text-[11px] md:text-[13px] font-bold tracking-[0.1em] uppercase leading-relaxed text-white/80">
                We design for longevity<br/>
                clarity first, craft always,<br/>
                built to scale.
              </p>
            </div>

            {/* Right Text & Link */}
            <div className="w-full md:w-[45%] flex flex-col gap-10">
              <p className="text-sm md:text-lg text-white/70 leading-relaxed font-light">
                Our mission is to make technology feel human by designing digital products that are intuitive, purposeful, and meaningful to people.
              </p>
              
              <a href="#" className="group inline-flex items-center gap-4 text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:text-white/70 transition-colors w-fit">
                More About Us
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Capabilities Section */}
      <section ref={servicesRef} id="services" className="relative bg-[#050505] text-white overflow-hidden h-screen">
        
        {/* Background Animation (Fog & Particles) */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full h-full">
          {services.map((service, idx) => (
            <div key={idx} className="service-panel absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-20 overflow-hidden will-change-transform bg-black">
              
              {/* Full-bleed background image with heavy overlay for readability */}
              <div className="absolute inset-0 z-0">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover scale-105 opacity-80" />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm md:bg-black/60 md:backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-black/80 to-transparent"></div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 h-full">
                  
                  {/* Left Text */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-bold text-white/50 mb-6 block">Our Services / 0{idx + 1}</span>
                    <h2 className="text-5xl sm:text-6xl md:text-[70px] lg:text-[80px] font-bold leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 text-white drop-shadow-2xl">
                      {service.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h2>
                    <p className="text-base md:text-xl text-white/80 max-w-md font-light leading-relaxed drop-shadow-md">
                      {service.desc}
                    </p>
                  </div>

                  {/* Right Glass Card */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-full max-w-md liquid-glass p-8 md:p-12 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-2xl bg-white/5 flex flex-col hover:bg-white/10 transition-colors duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 text-white">{service.rightHeading}</h3>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10">
                        {service.desc}
                      </p>
                      <Link to={`/services/${service.slug}`} className="group flex items-center gap-4 uppercase tracking-widest text-[11px] font-bold text-white w-fit mt-auto bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300">
                        Explore Service
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section (Horizontal Scroll) */}
      <section ref={portfolioRef} id="work" className="bg-neutral-950 relative h-screen overflow-hidden flex items-center">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-900/10 blur-[150px] pointer-events-none z-0" />
        <div className="relative z-10 w-full h-full flex items-center">
          <div ref={trackRef} className="flex h-[70vh] md:h-[80vh] items-center gap-10 px-[10vw] w-max">
            
            {/* Title Block */}
            <div className="portfolio-card w-[80vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center h-full pr-10">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-12">
                Selected work <br/> explorations
              </h2>
              <div className="flex items-center gap-2 text-sm font-light uppercase tracking-widest border-b border-white/20 pb-2 w-max hover:border-white transition-colors cursor-pointer group">
                VIEW ALL PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Project Cards */}
            {[
              { title: "Pulse Studio", category: "Fintech Platform", description: "A motion-led studio website showcasing\nartists, projects, and culture.", img: pulseStudioImg },
              { title: "Domus Immobilien Kultur", category: "Real Estate", description: "Premium real estate and architectural\nshowcase platform.", img: "/domus-project.jpg" },
              { title: "Nexus Health", category: "Mobile Application", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" },
              { title: "Aura Dynamics", category: "Web Experience", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" },
            ].map((work, idx) => (
              <div key={idx} className="portfolio-card w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 h-full group cursor-pointer flex flex-col justify-center">
                <div className="relative overflow-hidden rounded-[1rem] aspect-[4/3] mb-6 border border-white/5 w-full">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="liquid-glass px-4 py-2 rounded-full">
                      <span className="text-xs font-bold">View Case Study</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-4">
                  <div>
                    <h3 className="font-heading text-3xl mb-2 group-hover:text-blue-400 transition-colors duration-300">{work.title}</h3>
                    {work.description ? (
                      <p className="text-sm font-body text-white/70 max-w-sm leading-relaxed whitespace-pre-line">{work.description}</p>
                    ) : (
                      <p className="text-[12px] font-body text-white/50 uppercase tracking-widest">{work.category}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-body font-medium text-white/70 uppercase tracking-widest border-b border-white/40 pb-1 hover:text-white hover:border-white transition-colors duration-300">
                    EXPLORE PROJECT <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}

            {/* End Card */}
            <div className="portfolio-card w-[80vw] md:w-[50vw] flex-shrink-0 flex flex-col justify-center h-full pl-10 md:pl-20 border-l border-white/10 ml-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-12">
                Discover our complete collection of digital experiences, brands, and platforms.
              </h2>
              <div className="flex items-center gap-2 text-sm font-light uppercase tracking-widest border-b border-white/20 pb-2 w-max hover:border-white transition-colors cursor-pointer group">
                VIEW ALL PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section ref={processRef} id="process" className="py-24 md:py-32 px-4 md:px-8 lg:px-20 bg-[#111111] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="flex flex-col items-center text-center mb-24 md:mb-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              <span className="text-sm font-semibold tracking-wide text-white">Our Process</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Our Process Is the Most<br className="hidden md:block"/> Convenient for Our Partners!
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              We streamline UI/UX design and web development with a structured, hassle-free approach. From research to launch, we ensure a smooth journey and high-quality digital products for our clients.
            </p>
          </div>

          <div ref={processCardsRef} className="relative flex flex-col gap-24 md:gap-16 lg:gap-24">
            {[
              {
                step: "1",
                title: "Kickoff Call & Project Discovery",
                desc: "We start by understanding your business, goals, and audience. This helps us plan the entire project with clear objectives and measurable results.",
                img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "2",
                title: "Research and UX Strategy",
                desc: "We analyze user behavior, competitors, and industry trends. This allows us to define an effective structure and feature set for your website.",
                img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "3",
                title: "Wireframing & Prototyping",
                desc: "Our team creates wireframes and interactive prototypes to ensure a seamless user experience (UX).",
                img: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "4",
                title: "UI Design and Visual Identity",
                desc: "We create polished user interfaces that reflect your brand identity. Our designs follow UX best practices for usability and engagement.",
                img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "5",
                title: "Website Development",
                desc: "Our developers build your website using clean, optimized code. We ensure it works perfectly across devices and delivers fast load times.",
                img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "6",
                title: "Testing and Quality Assurance",
                desc: "We conduct thorough testing across browsers and devices. Our team checks for bugs, performance issues, and ensures top-quality user experience.",
                img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
              },
              {
                step: "7",
                title: "Launch, Optimization, and Support",
                desc: "We launch your website, monitor performance, and provide ongoing support. This ensures your site stays fast, secure, and fully optimized.",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              }
            ].map((process, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={idx} className={`relative flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center w-full group py-12`}>
                  {/* Text Content */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start md:pl-20' : 'md:items-start md:pr-20'} relative z-20`}>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight relative group-hover:text-green-400 transition-colors duration-500">
                      {process.title}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed transition-opacity duration-500 group-hover:opacity-100">
                      {process.desc}
                    </p>
                  </div>
                  
                  {/* Image container for hover effect */}
                  <div className="hidden md:flex md:w-1/2 items-center justify-center relative z-10 perspective-1000">
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img 
                          src={process.img} 
                          alt={process.title}
                          className={`w-3/4 max-h-[300px] object-cover rounded-xl shadow-2xl transition-all duration-700 ease-out
                                     opacity-0 scale-90 translate-y-10 group-hover:opacity-60 group-hover:scale-100 group-hover:translate-y-0
                                     ${isEven ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'}`}
                        />
                     </div>
                  </div>
                  
                  {/* Large Background Number */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'md:left-auto md:right-[10%]' : 'md:right-auto md:left-[10%]'} text-[180px] md:text-[250px] lg:text-[350px] font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-700 pointer-events-none z-0 leading-none select-none left-1/2 -translate-x-1/2 md:translate-x-0`}>
                    {process.step}
                  </div>
                  
                  {/* Connecting Arrow (skip for last item) */}
                  {idx < 6 && (
                    <div className="hidden md:block absolute top-[90%] left-1/2 -translate-x-1/2 w-32 h-32 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none z-0">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="text-green-500 overflow-visible">
                        <path 
                          d={isEven 
                            ? "M 90 10 Q 50 80, 10 90" 
                            : "M 10 10 Q 50 80, 90 90"} 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeDasharray="4 4" 
                        />
                        <polygon 
                          points={isEven ? "10,90 15,85 15,95" : "90,90 85,85 85,95"} 
                          fill="currentColor" 
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 border-y border-white/5 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[400px] bg-blue-900/10 blur-[150px] pointer-events-none z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
          <div ref={statsCardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { number: "40+", label: "Industry Awards" },
              { number: "250+", label: "Projects Delivered" },
              { number: "15", label: "Global Partners" },
              { number: "99%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="font-heading italic text-5xl md:text-6xl text-white mb-2">{stat.number}</h3>
                <p className="text-[11px] font-body text-white/50 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto & Values Section */}
      <section ref={bentoRef} id="manifesto" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="relative z-10 max-w-[1400px] mx-auto">

          {/* Large Manifesto Statement */}
          <div className="mb-24 md:mb-36">
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-bold text-white/40 block mb-12">Our Manifesto</span>
            <h2 className="text-4xl md:text-6xl lg:text-[80px] font-light leading-[1.1] tracking-tight text-white/90 max-w-[1200px]">
              We partner with ambitious brands to create digital products that
              <span className="text-white italic font-heading"> define categories</span>,
              not follow them.
            </h2>
          </div>

          {/* Thin Divider */}
          <div className="w-full h-px bg-white/10 mb-20 md:mb-28"></div>

          {/* Core Values Grid */}
          <div ref={bentoCardsRef}>
            <div className="flex flex-col md:flex-row justify-between items-start mb-16">
              <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-bold text-white/40 mb-6 md:mb-0">Core Values</span>
              <p className="text-white/50 text-sm md:text-base max-w-md font-light leading-relaxed">
                The principles that guide every decision we make and every pixel we place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-white/10">
              {[
                {
                  num: "01",
                  title: "Clarity First",
                  desc: "We strip away the unnecessary. Every element serves a purpose, every interaction tells a story."
                },
                {
                  num: "02",
                  title: "Craft Always",
                  desc: "Obsessive attention to detail. From typography to transitions, we sweat the small stuff."
                },
                {
                  num: "03",
                  title: "Built to Scale",
                  desc: "Design systems that grow with you. Flexible foundations that support your ambitions."
                },
                {
                  num: "04",
                  title: "Human Centered",
                  desc: "Technology should feel invisible. We design for people first, platforms second."
                }
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="group py-10 md:py-14 md:px-8 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 last:border-b-0 cursor-pointer"
                >
                  <span className="text-[11px] text-white/20 font-body tracking-widest block mb-8 group-hover:text-blue-500/60 transition-colors duration-500">{value.num}</span>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4 group-hover:text-white transition-colors duration-500 leading-tight">{value.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-[#0a0a0a] relative border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-white/50 text-lg">Everything you need to know about working with us.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/10 bg-white/[0.02] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/[0.04]"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-medium text-white/90">{faq.q}</h3>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 bg-white/10' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div 
                  className={`px-6 md:px-8 overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === idx ? 'max-h-48 pb-6 md:pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-[#0f0f0f] relative border-t border-white/5">
        <div ref={ctaRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/50 mb-4 font-body">Contact Me</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-none">
                Get In Touch
              </h2>
            </div>
            <a href="mailto:info@dizzits.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-colors text-sm font-light">
              Mail me at: info@dizzits.com
            </a>
          </div>

          {/* Form */}
          <ContactForm className="space-y-12" />
        </div>
      </section>

      {/* Footer handled in App Layout */}
    </div>
  );
}

