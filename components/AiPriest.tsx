import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToPandit } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface AiPriestProps {
  language: Language;
}

const AiPriest: React.FC<AiPriestProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language].sections;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToPandit(messages.concat(userMsg), userMsg.text);

    const botMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-saffron-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 transition-transform border-2 border-white"
          aria-label="Chat with Pandit AI"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-saffron-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron-600 to-red-700 p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold font-serif text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-yellow-300" />
                  {t.ai_priest_title}
                </h3>
                <p className="text-xs text-saffron-100 opacity-90">{t.ai_priest_desc}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="text-center text-stone-400 mt-12 text-sm px-8">
                  <div className="w-16 h-16 bg-saffron-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🙏</span>
                  </div>
                  <p>{language === 'en' ? "Namaste! I am your AI spiritual guide. Ask me about rituals, mantras, or the history of our temple." : "नमस्ते! मैं आपका एआई आध्यात्मिक मार्गदर्शक हूं। मुझसे अनुष्ठानों, मंत्रों या हमारे मंदिर के इतिहास के बारे में पूछें।"}</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-saffron-600 text-white rounded-br-none'
                        : 'bg-white text-stone-700 border border-stone-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-stone-200 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-stone-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'en' ? "Ask a spiritual question..." : "एक आध्यात्मिक प्रश्न पूछें..."}
                  className="flex-1 border border-stone-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-saffron-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-saffron-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiPriest;