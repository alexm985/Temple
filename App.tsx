import React, { useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import About from './pages/About';
import Festivals from './pages/Festivals';
import AiPriest from './components/AiPriest';
import { Language } from './types';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50">
    <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout language={language} setLanguage={setLanguage} />}>
            <Route index element={<Home language={language} />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services language={language} />} />
            <Route path="festivals" element={<Festivals language={language} />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="donate" element={<Donate />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
        <AiPriest language={language} />
      </Suspense>
    </Router>
  );
};

export default App;