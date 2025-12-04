import React, { useState } from 'react';
import Section from '../components/Section';
import { Heart } from 'lucide-react';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState(101);
  
  return (
    <Section className="min-h-screen bg-stone-50">
       <div className="bg-stone-900 py-16 text-center text-white mb-12">
        <h1 className="text-4xl font-serif font-bold">Support Us</h1>
        <p className="text-stone-300 mt-2">Your contribution helps sustain the temple and community services.</p>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-t-4 border-saffron-500">
            <div className="text-center mb-10">
                <Heart size={48} className="mx-auto text-saffron-600 mb-4 animate-pulse" fill="currentColor" />
                <h2 className="text-2xl font-bold text-stone-800">Make a Donation</h2>
                <p className="text-stone-500 text-sm mt-2">All donations are tax-deductible.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {[21, 51, 101, 251, 501, 1001].map((val) => (
                    <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${amount === val ? 'border-saffron-600 bg-saffron-50 text-saffron-700' : 'border-stone-200 text-stone-500 hover:border-saffron-300'}`}
                    >
                        ${val}
                    </button>
                ))}
            </div>

            <div className="mb-8">
                <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Or Enter Custom Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-saffron-500 outline-none text-xl font-bold text-stone-800"
                    />
                </div>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-saffron-600 to-red-600 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all">
                Proceed to Pay ${amount}
            </button>
            <p className="text-xs text-center text-stone-400 mt-4">Secure payment via Stripe (Mock)</p>
        </div>
      </div>
    </Section>
  );
};

export default Donate;