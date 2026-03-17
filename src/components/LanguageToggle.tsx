import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner">
      <button
        onClick={() => setLanguage('bn')}
        className={`relative px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
          language === 'bn' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {language === 'bn' && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 bg-medical-blue rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">বাংলা</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`relative px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
          language === 'en' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        {language === 'en' && (
          <motion.div
            layoutId="activeLang"
            className="absolute inset-0 bg-medical-blue rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
