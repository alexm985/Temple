import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Heart, Star, Sparkles, Mail, ChevronLeft, ChevronRight, Play, Bell } from 'lucide-react';
import Section from '../components/Section';
import { Language } from '../types';
import { TRANSLATIONS, FESTIVALS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  language: Language;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Helper to format date for display
  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  // Filter only upcoming festivals or specific ones mentioned in the brief
  const highlightFestivals = FESTIVALS.filter(f => ['1', '2', '3'].includes(f.id));

  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/seed/templehero/1920/1080',
      title: 'Lakshmi Narayan Temple',
      subtitle: t.hero.subtitle,
      ctaPrimary: { text: t.hero.cta, link: '/services' },
      ctaSecondary: { text: language === 'en' ? 'About Us' : 'हमारे बारे में', link: '/about' }
    },
    {
      id: 2,
      image: 'https://picsum.photos/seed/festival2024/1920/1080',
      title: language === 'en' ? 'Celebrate Divine Moments' : 'दिव्य क्षणों का जश्न मनाएं',
      subtitle: language === 'en' ? 'Immerse yourself in the joy of our vibrant festivals and ancient rituals.' : 'हमारे जीवंत त्योहारों और प्राचीन अनुष्ठानों के आनंद में डूब जाएं।',
      ctaPrimary: { text: language === 'en' ? 'View Calendar' : 'कैलेंडर देखें', link: '/festivals' },
      ctaSecondary: { text: language === 'en' ? 'Gallery' : 'दीर्घा', link: '/gallery' }
    },
    {
      id: 3,
      image: 'https://picsum.photos/seed/seva2024/1920/1080',
      title: language === 'en' ? 'Service is Devotion' : 'सेवा ही भक्ति है',
      subtitle: language === 'en' ? 'Join our growing spiritual family through Seva and compassion.' : 'सेवा और करुणा के माध्यम से हमारे बढ़ते आध्यात्मिक परिवार में शामिल हों।',
      ctaPrimary: { text: language === 'en' ? 'Volunteer' : 'स्वयंसेवक बनें', link: '/contact' },
      ctaSecondary: { text: language === 'en' ? 'Donate Now' : 'दान करें', link: '/donate' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      {/* Hero Section with Slider */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-stone-900">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Background Image with Zoom Effect */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${slides[currentSlide].image}")` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "linear" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-900/90"></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6 max-w-5xl"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-[2px] w-12 bg-saffron-400/80"></span>
                  <span className="text-saffron-300 font-display tracking-[0.3em] uppercase text-sm md:text-base">
                    {language === 'en' ? 'Welcome to' : 'स्वागत है'}
                  </span>
                  <span className="h-[2px] w-12 bg-saffron-400/80"></span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-white drop-shadow-2xl leading-[1.1] tracking-wide">
                  {slides[currentSlide].title === 'Lakshmi Narayan Temple' ? (
                    <>
                      Lakshmi Narayan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron-200 via-gold-400 to-saffron-200">Temple</span>
                    </>
                  ) : slides[currentSlide].title}
                </h1>
                
                <p className="text-lg md:text-2xl font-serif italic text-stone-200 max-w-3xl mx-auto leading-relaxed opacity-90">
                  {slides[currentSlide].subtitle}
                </p>

                <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link 
                    to={slides[currentSlide].ctaPrimary.link}
                    className="group relative px-10 py-4 bg-gradient-to-r from-saffron-600 to-red-600 text-white font-bold rounded-full shadow-[0_0_25px_rgba(234,88,12,0.4)] overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.6)]"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-lg tracking-wide uppercase">
                      {slides[currentSlide].ctaPrimary.text} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-saffron-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link 
                    to={slides[currentSlide].ctaSecondary.link}
                    className="px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/40 text-white font-bold rounded-full hover:bg-white/15 transition-all text-lg tracking-wide uppercase hover:border-saffron-300"
                  >
                    {slides[currentSlide].ctaSecondary.text}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-saffron-600 hover:border-saffron-600 transition-all group"
        >
          <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-saffron-600 hover:border-saffron-600 transition-all group"
        >
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Dots Pagination */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-12 bg-saffron-500' : 'w-3 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <Section className="bg-stone-50 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-stone-800 mb-6">A Sanctuary of Bhakti, Seva, and Community</h2>
          <div className="w-32 h-1.5 bg-saffron-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 font-serif">
            Rooted in <span className="text-saffron-700 font-bold">Sanatan Dharma</span>, our temple welcomes all who seek spiritual connection, inner peace, and community belonging. Whether you come to offer a prayer, participate in seva, or celebrate our vibrant festivals, every visit is a step closer to the Divine.
          </p>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed font-serif">
             We invite you to explore our temple’s offerings, be part of our growing spiritual family, and immerse yourself in the timeless values of Bhakti (devotion) and Seva (service).
          </p>
        </div>
      </Section>

      {/* Live Darshan Section (Restored) */}
      <Section className="bg-stone-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-saffron-400 font-bold uppercase tracking-widest text-sm mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron-500"></span>
                </span>
                Live from the Sanctum
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">{t.sections.live_darshan}</h2>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-saffron-600 hover:bg-saffron-700 rounded-full font-bold transition-all shadow-lg shadow-saffron-600/20">
              <Bell size={18} />
              <span>Get Notifications</span>
            </button>
          </div>

          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
            {/* Placeholder Image for Offline State */}
            <img 
              src="https://picsum.photos/seed/deity/1920/1080" 
              alt="Live Darshan Placeholder" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 mb-6 cursor-pointer hover:bg-saffron-600 hover:border-saffron-500 hover:scale-110 transition-all duration-300">
                <Play size={32} className="text-white fill-white ml-1" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Live Stream Offline</h3>
              <p className="text-stone-300 font-mono">Next Aarti: 6:30 PM EST</p>
              <div className="mt-8 flex gap-4">
                 <div className="text-center px-6 py-3 bg-black/50 rounded-xl border border-white/10 backdrop-blur-md">
                    <span className="block text-2xl font-bold text-saffron-400">04</span>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Hours</span>
                 </div>
                 <div className="text-center px-6 py-3 bg-black/50 rounded-xl border border-white/10 backdrop-blur-md">
                    <span className="block text-2xl font-bold text-saffron-400">12</span>
                    <span className="text-xs text-stone-400 uppercase tracking-wider">Mins</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Upcoming Highlights */}
      <Section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-saffron-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2 mb-2">
                <Sparkles size={16} /> Celebrations of Faith
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-stone-800">Upcoming Highlights</h2>
              <p className="text-stone-500 mt-3 font-serif italic text-lg">Experience the joy of shared devotion through our events.</p>
            </div>
            <Link to="/festivals" className="group text-saffron-700 font-bold flex items-center gap-2 transition-all border border-saffron-200 px-8 py-3 rounded-full hover:bg-saffron-50 hover:shadow-md">
              View Full Calendar <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightFestivals.map((fest) => (
              <div key={fest.id} className="bg-stone-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-stone-100 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={`https://picsum.photos/seed/fest${fest.id}/600/400`} 
                    alt={fest.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-stone-800 mb-3 group-hover:text-saffron-700 transition-colors leading-tight">{fest.title}</h3>
                  <p className="text-stone-500 leading-relaxed mb-6 flex-grow">{fest.description}</p>
                  <Link to="/festivals" className="mt-auto text-sm font-bold text-saffron-600 uppercase tracking-widest flex items-center gap-2 group/btn">
                    Learn More <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Join Community */}
      <Section className="bg-stone-900 text-white relative overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-saffron-100">Join Our Spiritual Family</h2>
            <p className="text-saffron-200 mt-4 text-xl max-w-2xl mx-auto font-serif italic">Discover opportunities to grow in faith, serve with purpose, and build lasting connections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-saffron-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-saffron-600 transition-colors">
                 <Heart size={32} className="text-saffron-400 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Offer Seva</h3>
              <p className="text-stone-400 mb-8 leading-relaxed">Contribute your time and skills to the temple operations and community service.</p>
              <Link to="/contact" className="inline-block px-8 py-3 border border-saffron-500/50 text-saffron-400 rounded-full font-bold hover:bg-saffron-600 hover:text-white transition-all uppercase text-sm tracking-wider">
                Volunteer
              </Link>
            </div>

            <div className="group bg-gradient-to-b from-saffron-900/50 to-stone-900 border border-saffron-500/30 p-10 rounded-3xl shadow-2xl hover:border-saffron-500 transition-all duration-300 hover:-translate-y-4">
              <div className="w-20 h-20 bg-saffron-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-saffron-600/30">
                 <Star size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Become a Member</h3>
              <p className="text-stone-300 mb-8 leading-relaxed">Stay connected through newsletters, exclusive events, and community updates.</p>
              <Link to="/contact" className="inline-block px-8 py-3 bg-saffron-600 text-white rounded-full font-bold hover:bg-saffron-700 transition-all uppercase text-sm tracking-wider shadow-lg">
                Join Today
              </Link>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-saffron-600/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-saffron-600 transition-colors">
                 <Users size={32} className="text-saffron-400 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Community Events</h3>
              <p className="text-stone-400 mb-8 leading-relaxed">Participate in satsangs, cultural programs, and educational workshops.</p>
              <Link to="/festivals" className="inline-block px-8 py-3 border border-saffron-500/50 text-saffron-400 rounded-full font-bold hover:bg-saffron-600 hover:text-white transition-all uppercase text-sm tracking-wider">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="bg-saffron-50 border-t border-saffron-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Mail size={48} className="mx-auto text-saffron-600 mb-6" />
          <h2 className="text-3xl font-display font-bold text-stone-800 mb-4">Stay Connected</h2>
          <p className="text-stone-600 mb-8">Receive updates on events, seva opportunities, and temple news directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white"
            />
            <button className="px-8 py-4 bg-stone-900 text-white font-bold rounded-full hover:bg-stone-800 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;