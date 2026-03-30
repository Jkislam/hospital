import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Heart, User, Activity, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS, SERVICES } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

import { useDoctors } from '../context/DoctorContext';
import { useBloodBank } from '../context/BloodBankContext';

export default function Navbar() {
  const { t } = useLanguage();
  const { doctors } = useDoctors();
  const { donors } = useBloodBank();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.doctors'), path: '/doctors' },
    { name: t('nav.blood_bank') || 'Blood Bank', path: '/blood-bank' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src="/image/logo.png" 
              alt="Sherpur Ever Care Hospital" 
              className="h-12 w-auto"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('flex-row');
              }}
            />
            <div className="flex flex-col max-w-[150px] xs:max-w-none">
              <span className={`font-bold text-lg sm:text-xl leading-none ${scrolled ? 'text-medical-blue' : 'text-slate-900'}`}>
                Sherpur Ever Care
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Hospital
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageToggle />
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-medical-blue ${
                  location.pathname === link.path ? 'text-medical-blue' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Emergency Button */}
            <a 
              href="tel:01891773078" 
              className="flex items-center gap-2 bg-medical-blue text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              <Phone size={18} />
              <span>{t('hero.emergency')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1 shrink-0">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-medical-blue hover:bg-slate-100' : 'text-medical-blue bg-white/80 shadow-sm'} focus:outline-none`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    location.pathname === link.path 
                      ? 'bg-medical-light text-medical-blue' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a 
                  href="tel:01891773078" 
                  className="flex items-center justify-center gap-2 w-full bg-medical-blue text-white px-5 py-3 rounded-xl font-semibold"
                >
                  <Phone size={18} />
                  <span>Emergency Call</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
