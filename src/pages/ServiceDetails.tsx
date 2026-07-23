import React, { useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { services } from '../data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from '../components/Icons';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ServiceDetails() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!service) return;

    // Reveal animations
    const tl = gsap.timeline();
    tl.from('.hero-content > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });

    // Parallax on image
    gsap.to('.hero-bg', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Feature cards fade in
    gsap.from('.feature-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top 70%',
      }
    });
  }, { scope: container });

  if (!service) {
    return <Navigate to="/" />;
  }

  return (
    <div ref={container} className="bg-black min-h-screen text-white pt-24">
      {/* Hero Section */}
      <section className="hero-section relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src={service.img} alt={service.title} className="hero-bg w-full h-[130%] object-cover -top-[15%] absolute" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full hero-content text-center flex flex-col items-center mt-12">
          <span className="uppercase tracking-[0.2em] text-[12px] font-bold text-white/50 mb-6 block">Our Services</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-6">{service.title}</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-light">{service.desc}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative bg-black">
        <div className="lg:col-span-8">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-blue-400">Overview</h2>
          <p className="text-lg text-white/70 leading-relaxed font-light mb-16">
            {service.extendedDesc}
          </p>

          <h2 className="text-3xl md:text-4xl font-light mb-8 text-blue-400 features-section">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {service.features.map((feat, i) => (
              <div key={i} className="feature-card liquid-glass p-8 rounded-[2rem] border border-white/10 hover:bg-white/[0.05] transition-colors">
                <Star className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">{feat.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-light mb-8 text-blue-400">Our Process</h2>
          <div className="space-y-8">
            {service.process.map((proc, i) => (
              <div key={i} className="flex gap-8 group cursor-pointer border-b border-white/10 pb-8 last:border-b-0">
                <div className="text-5xl font-black text-white/20 group-hover:text-blue-500/50 transition-colors">{proc.step}</div>
                <div>
                  <h3 className="text-2xl font-medium mb-2 group-hover:text-blue-400 transition-colors">{proc.title}</h3>
                  <p className="text-white/60 leading-relaxed">{proc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 liquid-glass-strong p-8 rounded-[2rem] border border-white/20 shadow-2xl flex flex-col items-start gap-6 bg-[#050505]">
            <h3 className="text-2xl font-medium">Ready to elevate your {service.rightHeading.toLowerCase()}?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Partner with us to build something extraordinary. We're ready to bring your vision to life.
            </p>
            <Link to="/#contact" className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors duration-300 w-full justify-center">
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
