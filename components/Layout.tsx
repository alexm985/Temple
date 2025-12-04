import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Music, Pause, Play } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, AUDIO_SRC } from '../constants';

interface LayoutProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ language, setLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(AUDIO_SRC));
  const t = TRANSLATIONS[language].nav;
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Audio handling
  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    if (isPlaying) {
      audio.play().catch(e => console.log("Audio play failed (interaction needed)", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/about', label: t.about },
    { path: '/services', label: t.services },
    { path: '/festivals', label: t.festivals },
    { path: '/gallery', label: t.gallery },
    { path: '/donate', label: t.donate },
    { path: '/contact', label: t.contact },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-2 border-saffron-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-saffron-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl font-display">ॐ</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-saffron-800">Lakshmi Narayan Temple</h1>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider hover:text-saffron-600 transition-colors relative whitespace-nowrap ${
                    isActive ? 'text-saffron-600 after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-saffron-600' : 'text-stone-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-stone-600 hover:text-saffron-600 ml-2"
              aria-label="Toggle Language"
            >
              <Globe size={20} />
              <span className="uppercase font-bold text-xs">{language}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="text-stone-600 hover:text-saffron-600"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-saffron-800"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-saffron-50 border-t border-saffron-100 absolute w-full left-0 top-full shadow-lg">
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-medium ${isActive ? 'text-saffron-700' : 'text-stone-600'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating Audio Player */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-white/90 backdrop-blur border border-saffron-200 rounded-full shadow-xl flex items-center justify-center text-saffron-700 hover:bg-saffron-50 transition-all group"
          aria-label="Toggle Bhajan Audio"
          title="Play/Pause Bhajan"
        >
          {isPlaying ? (
            <span className="flex gap-1">
                <span className="block w-1 h-4 bg-saffron-600 animate-[pulse_1s_infinite]"></span>
                <span className="block w-1 h-6 bg-saffron-600 animate-[pulse_1.2s_infinite]"></span>
                <span className="block w-1 h-3 bg-saffron-600 animate-[pulse_0.8s_infinite]"></span>
            </span>
          ) : (
            <Music size={20} className="group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-saffron-50 pt-16 pb-8 border-t-4 border-saffron-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-saffron-600 rounded-full flex items-center justify-center text-white">
                  <span className="text-3xl font-display">ॐ</span>
                </div>
                <h2 className="text-2xl font-display font-bold text-saffron-400">Lakshmi Narayan Temple</h2>
              </div>
              <p className="text-stone-400 leading-relaxed text-sm">
                Where devotion becomes a way of life. Join our spiritual family rooted in Sanatan Dharma.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-serif font-bold text-saffron-200 mb-6">Quick Links</h3>
              <ul className="space-y-3 text-stone-300">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <NavLink to={link.path} className="hover:text-saffron-400 transition-colors text-sm">
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-saffron-200 mb-6">Temple Hours</h3>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Morning</span>
                  <span className="font-mono text-saffron-400">5:00 AM - 12:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Evening</span>
                  <span className="font-mono text-saffron-400">4:00 PM - 9:00 PM</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Aarti</span>
                  <span className="font-mono text-saffron-400">6:30 AM / 7:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-saffron-200 mb-6">Contact</h3>
              <address className="not-italic text-stone-300 text-sm space-y-3">
                <p>108 Devotion Path, Spiritual City</p>
                <p>State, ZIP 12345</p>
                <p className="pt-2">
                  <a href="tel:+1234567890" className="hover:text-saffron-400 block">+1 (234) 567-890</a>
                  <a href="mailto:info@lakshminarayan.com" className="hover:text-saffron-400 block">info@lakshminarayan.com</a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-stone-800 text-stone-500 text-xs">
            &copy; {new Date().getFullYear()} Lakshmi Narayan Temple Trust. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;