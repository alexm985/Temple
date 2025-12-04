import React from 'react';
import Section from '../components/Section';

const images = [
  'https://picsum.photos/seed/temple1/800/600',
  'https://picsum.photos/seed/temple2/800/600',
  'https://picsum.photos/seed/temple3/800/800', // tall
  'https://picsum.photos/seed/temple4/800/600',
  'https://picsum.photos/seed/temple5/800/600',
  'https://picsum.photos/seed/temple6/800/800', // tall
  'https://picsum.photos/seed/temple7/800/600',
  'https://picsum.photos/seed/temple8/800/600',
];

const Gallery: React.FC = () => {
  return (
    <Section className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-16 text-center text-white mb-12">
        <h1 className="text-4xl font-serif font-bold">Temple Gallery</h1>
        <p className="text-stone-300 mt-2">Glimpses of divinity and architecture.</p>
      </div>
      
      <div className="container mx-auto px-4 pb-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <div key={i} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md">
              <img 
                src={src} 
                alt="Temple Moment" 
                loading="lazy"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-display text-lg tracking-wider border-b border-saffron-500 pb-1">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Gallery;