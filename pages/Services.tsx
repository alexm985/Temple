import React, { useState } from 'react';
import { Clock, Check } from 'lucide-react';
import Section from '../components/Section';
import { SERVICES, TRANSLATIONS } from '../constants';
import { Language, PoojaService } from '../types';

interface ServicesProps {
  language: Language;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const [selectedService, setSelectedService] = useState<PoojaService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', date: '', priest: 'Any' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  
  const t = TRANSLATIONS[language];

  const handleBookClick = (service: PoojaService) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setSubmitStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1000);
  };

  return (
    <>
      <div className="bg-stone-900 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">{t.sections.services_title}</h1>
        <p className="text-stone-300 mt-4 max-w-2xl mx-auto">Perform sacred rituals with authenticity and devotion.</p>
      </div>

      <Section className="bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                   <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white font-bold flex items-center gap-2">
                      <Clock size={16} className="text-saffron-400" /> {service.duration}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">{service.title}</h3>
                  <p className="text-stone-500 text-sm mb-6 flex-grow">{service.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-stone-800">${service.price}</span>
                    <button 
                      onClick={() => handleBookClick(service)}
                      className="px-4 py-2 bg-saffron-600 text-white rounded-lg font-bold hover:bg-saffron-700 transition-colors"
                    >
                      {t.actions.book_now}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Booking Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <div className="bg-saffron-600 p-6 text-white relative">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-2xl font-serif font-bold mb-1">Book {selectedService.title}</h3>
              <p className="text-saffron-100 text-sm">Fill details to schedule your pooja.</p>
            </div>
            
            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-800 mb-2">Booking Confirmed!</h4>
                  <p className="text-stone-500 mb-6">May Lord Ganesha bless you. We will contact you shortly.</p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Devotee Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Date</label>
                        <input 
                        required
                        type="date" 
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Time</label>
                        <select className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none">
                            <option>Morning</option>
                            <option>Evening</option>
                        </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Preferred Priest</label>
                    <select 
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none"
                      value={formData.priest}
                      onChange={e => setFormData({...formData, priest: e.target.value})}
                    >
                      <option>Any Available</option>
                      <option>Pandit Sharma Ji</option>
                      <option>Shastri Verma Ji</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-saffron-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Confirm Booking (${selectedService.price})
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;