import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Heart, Search, User, Activity, HeartPulse } from 'lucide-react';
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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{type: 'doctor' | 'service', title: string, id?: string}[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
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

  const handleSearch = (e: React.FormEvent | string, id?: string, type?: string) => {
    const query = typeof e === 'string' ? e : searchQuery;
    if (typeof e !== 'string') e.preventDefault();
    
    if (id && typeof e === 'string') {
      if (type === 'donor') {
        navigate('/blood-bank');
      } else {
        navigate(`/doctors/${id}`);
      }
      setShowSearch(false);
      setSearchQuery('');
      setSuggestions([]);
      return;
    }

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const docSuggestions = doctors
        .filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
        .map(d => ({ type: 'doctor' as const, title: d.name, id: d.id }));
      
      const donorSuggestions = donors
        .filter(d => d.name.toLowerCase().includes(q) || d.bloodGroup.toLowerCase().includes(q))
        .map(d => ({ type: 'donor' as const, title: `${d.name} (${d.bloodGroup})`, id: d.id }));
      
      const serSuggestions = SERVICES
        .filter(s => s.title.toLowerCase().includes(q))
        .map(s => ({ type: 'service' as const, title: s.title }));
      
      setSuggestions([...docSuggestions, ...donorSuggestions, ...serSuggestions].slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, doctors, donors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setShowSearch(false);
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
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-none ${scrolled ? 'text-medical-blue' : 'text-slate-900'}`}>
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
            
            {/* Search Bar Desktop */}
            <div className="relative flex items-center" ref={searchRef}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/10 text-slate-900'}`}
              >
                <Search size={20} />
              </button>
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 240 }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-full mr-2"
                  >
                    <form onSubmit={handleSearch} className="relative">
                      <input 
                        type="text" 
                        placeholder="Search doctors..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-1.5 rounded-full border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none text-sm bg-white"
                        autoFocus
                      />
                      
                      {/* Suggestions Dropdown */}
                      <AnimatePresence>
                        {suggestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                          >
                            {suggestions.map((s, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleSearch(s.title, s.id, s.type)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 transition-colors border-b border-slate-50 last:border-0"
                              >
                                {s.type === 'doctor' ? (
                                  <User size={14} className="text-medical-blue" />
                                ) : s.type === 'donor' ? (
                                  <HeartPulse size={14} className="text-red-600" />
                                ) : (
                                  <Activity size={14} className="text-medical-blue" />
                                )}
                                <span className="truncate">{s.title}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-slate-600 hover:text-medical-blue"
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-medical-blue focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 py-3"
          >
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search doctors, services..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-medical-blue outline-none text-sm"
                  autoFocus
                />
              </form>

              {/* Mobile Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 bg-white rounded-xl overflow-hidden border border-slate-100"
                  >
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSearch(s.title, s.id, s.type)}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50 last:border-0"
                      >
                        {s.type === 'doctor' ? (
                          <User size={16} className="text-medical-blue" />
                        ) : s.type === 'donor' ? (
                          <HeartPulse size={16} className="text-red-600" />
                        ) : (
                          <Activity size={16} className="text-medical-blue" />
                        )}
                        <span>{s.title}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
