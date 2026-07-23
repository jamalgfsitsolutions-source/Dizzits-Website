import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f0f0f] pt-24 pb-8 px-8 md:px-16 lg:px-20 text-white relative overflow-hidden flex flex-col">
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/publicfooter-video.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-15"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* Top Row: Let's Connect & Email */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 pb-12 border-b border-white/10">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8 md:mb-0">Let's Connect</h2>
          <a href="mailto:info@dizzits.com" className="text-3xl md:text-5xl font-light tracking-tight border-b-2 border-white pb-2 hover:text-white/70 transition-colors">
            info@dizzits.com
          </a>
        </div>

        {/* Middle Row: Menu, Socials, Local Time */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 relative z-10">
          <div>
            <h4 className="text-[13px] text-white/50 mb-6 font-light">Menu</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Work', 'Process', 'Testimonials', 'Contact'].map((link) => {
                const hash = link === 'Home' ? '#home' : `#${link.toLowerCase()}`;
                return (
                  <li key={link}>
                    <a href={`/${hash}`} onClick={(e) => handleNavClick(e, hash)} className="text-sm font-light hover:text-white/70 transition-colors">
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] text-white/50 mb-6 font-light">Socials</h4>
            <ul className="space-y-3">
              {['Twitter (X)', 'LinkedIn', 'Layers', 'Behance'].map((social) => (
                <li key={social}>
                  <a href="#" className="text-sm font-light hover:text-white/70 transition-colors">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 md:pl-12">
            <h4 className="text-[13px] text-white/50 mb-6 font-light">Local Time</h4>
            <p className="text-sm font-light">09:41:26 (GMT -7)</p>
          </div>
        </div>

        {/* Huge Text: Dizzits */}
        <div className="w-full relative mt-auto z-0 -mb-6 md:-mb-12 lg:-mb-20 flex justify-center md:justify-end">
          <div className="relative inline-block">
            <h1 className="text-[25vw] md:text-[20vw] leading-none font-medium tracking-tighter text-[#E5E5E5] hover:text-blue-600 transition-colors duration-500 cursor-pointer">
              Dizzits
            </h1>
          </div>
        </div>

        {/* Bottom Row: Copyright & Back to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 md:pt-16 text-[13px] text-white/50 z-10 relative">
          <p>&copy; Dizzits 2026</p>
          <button onClick={handleBackToTop} className="hover:text-white transition-colors flex items-center gap-2 mt-4 sm:mt-0 font-light">
            Back to top <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
