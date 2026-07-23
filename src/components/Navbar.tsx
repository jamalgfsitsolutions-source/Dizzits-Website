import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from './Icons';
import { services } from '../data/services';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
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
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center px-8 lg:px-12 pointer-events-none">
      {/* Left */}
      <Link to="/" className="liquid-glass rounded-full px-4 py-2 flex items-center justify-center pointer-events-auto">
        <img src="/logo.png" alt="Dizzits Logo" className="h-5 w-auto" />
      </Link>

      {/* Center */}
      <div className="hidden md:flex liquid-glass rounded-full px-2 py-1.5 items-center gap-1 pointer-events-auto">
        {["Home", "About", "Services", "Work", "Process"].map((link) => {
          const hash = link === 'Home' ? '#home' : `#${link.toLowerCase()}`;
          
          if (link === 'Services') {
            return (
              <div key={link} className="relative group">
                <a
                  href={`/${hash}`}
                  onClick={(e) => handleNavClick(e, hash)}
                  className="flex items-center gap-1 px-4 py-2 text-[11px] uppercase tracking-widest font-body opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {link}
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                </a>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl flex flex-col pointer-events-auto z-[200]">
                  {services.map(s => (
                    <Link 
                      key={s.slug} 
                      to={`/services/${s.slug}`} 
                      className="px-5 py-3.5 text-[10px] tracking-wider uppercase hover:bg-white/10 hover:text-blue-400 transition-colors border-b border-white/5 last:border-0 text-white/60 font-medium"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <a
              key={link}
              href={`/${hash}`}
              onClick={(e) => handleNavClick(e, hash)}
              className="px-4 text-[11px] uppercase tracking-widest font-body opacity-80 hover:opacity-100 transition-opacity"
            >
              {link}
            </a>
          );
        })}
        <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-colors duration-300 ml-2">
          Start a Project
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right */}
      <div className="h-10 w-10"></div>
    </nav>
  );
}

