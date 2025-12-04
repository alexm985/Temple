import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Section from '../components/Section';

const Contact: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-stone-900 py-16 text-center text-white">
        <h1 className="text-4xl font-serif font-bold">Visit Us</h1>
      </div>

      <Section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Info Side */}
            <div className="p-8 md:p-12 space-y-10">
              <div>
                <h2 className="text-3xl font-serif font-bold text-stone-800 mb-6">Get in Touch</h2>
                <p className="text-stone-600 leading-relaxed">
                  We welcome you to visit the temple for Darshan. For specific pooja bookings or large group visits, please contact the office.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron-50 text-saffron-600 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">Address</h4>
                    <p className="text-stone-600 text-sm">108 Spiritual Path, Divine City, State 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron-50 text-saffron-600 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">Phone</h4>
                    <p className="text-stone-600 text-sm">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron-50 text-saffron-600 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">Email</h4>
                    <p className="text-stone-600 text-sm">contact@shrimandir.com</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-saffron-50 text-saffron-600 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">Timings</h4>
                    <p className="text-stone-600 text-sm">Mon-Sun: 5:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Side (Placeholder) */}
            <div className="bg-stone-200 relative min-h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98513068459418!3d40.75889607932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1626359045625!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;