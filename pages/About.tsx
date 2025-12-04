import React from 'react';
import Section from '../components/Section';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
       <div className="bg-stone-900 py-16 text-center text-white">
        <h1 className="text-4xl font-serif font-bold">About Shri Mandir</h1>
      </div>

      <Section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
            <div className="md:w-1/2">
                <img src="https://picsum.photos/seed/templearchi/800/600" alt="Temple Architecture" className="rounded-3xl shadow-2xl" />
            </div>
            <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-serif font-bold text-stone-800">Our History</h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                    Established in 1985, Shri Mandir has been a beacon of spirituality for the community. 
                    What started as a small gathering in a rented hall has now blossomed into a magnificent 
                    architectural marvel, serving thousands of devotees every month.
                </p>
                <p className="text-stone-600 leading-relaxed text-lg">
                    Our mission is to preserve the rich traditions of Sanatana Dharma while providing a 
                    peaceful sanctuary for modern souls seeking solace.
                </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-800">Our Priests</h2>
            <div className="w-24 h-1 bg-saffron-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg text-center pb-6">
                    <img src={`https://picsum.photos/seed/person${i}/400/400`} alt="Priest" className="w-full h-64 object-cover" />
                    <h3 className="text-xl font-bold text-stone-800 mt-4">Pandit Name {i}</h3>
                    <p className="text-saffron-600 text-sm font-bold uppercase">Senior Archak</p>
                    <p className="text-stone-500 text-sm px-4 mt-2">Expert in Vedic rituals and Astrology with 20+ years of experience.</p>
                </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;