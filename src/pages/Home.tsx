import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Stethoscope,
  Activity,
  HeartPulse,
  Syringe,
  Baby,
  Microscope,
  Truck,
  MapPin,
  Search,
  User
} from 'lucide-react';
import { DOCTORS as STATIC_DOCTORS, SERVICES } from '../constants';
import { useDoctors } from '../context/DoctorContext';
import { useBloodBank } from '../context/BloodBankContext';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const { doctors } = useDoctors();
  const { donors } = useBloodBank();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{type: 'doctor' | 'service', title: string, id?: string}[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1504813184591-01592fd03cfd?auto=format&fit=crop&q=80&w=1920"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent | string, id?: string, type?: string) => {
    const query = typeof e === 'string' ? e : searchQuery;
    if (typeof e !== 'string') e.preventDefault();
    
    if (id && typeof e === 'string') {
      if (type === 'donor') {
        navigate('/blood-bank');
      } else {
        navigate(`/doctors/${id}`);
      }
      setSearchQuery('');
      setSuggestions([]);
      return;
    }

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
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
      
      setSuggestions([...docSuggestions, ...donorSuggestions, ...serSuggestions].slice(0, 5));
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
  const servicesPreview = [
    { icon: <Activity className="text-medical-blue" />, title: t('services.emergency'), desc: t('services.emergency_desc') },
    { icon: <HeartPulse className="text-medical-blue" />, title: t('services.diagnostics'), desc: t('services.diagnostics_desc') },
    { icon: <Syringe className="text-medical-blue" />, title: t('services.surgery'), desc: t('services.surgery_desc') },
    { icon: <Baby className="text-medical-blue" />, title: t('services.maternity'), desc: t('services.maternity_desc') },
  ];

  const doctorsPreview = doctors.slice(0, 3);
  const donorsPreview = donors.slice(0, 3);

  const interiorImages = [
    "https://images.unsplash.com/photo-1586773860418-d3b97978c65c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800"
  ];
  const [currentInteriorIndex, setCurrentInteriorIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInteriorIndex((prev) => (prev + 1) % interiorImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Sherpur Ever Care Hospital | Best Hospital in Sherpur | শেরপুর এভারকেয়ার হাসপাতাল</title>
        <meta name="description" content="Sherpur Ever Care Hospital (শেরপুর এভারকেয়ার হাসপাতাল) is the best hospital in Sherpur providing 24/7 emergency care, specialized doctors, and modern medical facilities. Visit the leading Sherpur hospital for quality healthcare." />
        <meta name="keywords" content="Sherpur hospital, Best Hospital in Sherpur, Sherpur Ever Care Hospital, শেরপুর এভারকেয়ার হাসপাতাল, Sherpur medical services, emergency care Sherpur" />
        <link rel="canonical" href="http://sherpurevarcarehospital.com/" />
        
        {/* JSON-LD Schema for Hospital */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Sherpur Ever Care Hospital",
            "alternateName": "শেরপুর এভারকেয়ার হাসপাতাল",
            "url": "http://sherpurevarcarehospital.com/",
            "logo": "http://sherpurevarcarehospital.com/logo.png",
            "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920",
            "description": "Sherpur Ever Care Hospital is the leading healthcare provider in Sherpur district, offering 24/7 emergency care, diagnostics, surgery, and maternity services.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Nurjahan Villa, Narayanpur, Sherpur Sadar Hospital Road",
              "addressLocality": "Sherpur",
              "addressRegion": "Mymensingh",
              "postalCode": "2100",
              "addressCountry": "BD"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "25.0194",
              "longitude": "90.0125"
            },
            "telephone": "+8801891773078",
            "openingHours": "Mo-Su 00:00-23:59",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+8801891773078",
              "contactType": "emergency",
              "areaServed": "BD",
              "availableLanguage": ["Bengali", "English"]
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentBgIndex}
              src={backgroundImages[currentBgIndex]} 
              alt="Sherpur Ever Care Hospital - শেরপুর এভারকেয়ার হাসপাতাল - Sherpur Hospital - শেরপুর এভার কেয়ার" 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              // @ts-ignore
              fetchPriority="high"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-medical-light text-medical-blue rounded-full text-sm font-bold tracking-wide mb-6">
                  {t('hero.badge')}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                  {t('hero.title')}
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t('hero.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/contact" className="btn-primary flex items-center justify-center gap-2">
                    {t('hero.book')} <ArrowRight size={18} />
                  </Link>
                  <a href="tel:01891773078" className="btn-outline flex items-center justify-center gap-2">
                    <Phone size={18} /> {t('hero.emergency')}
                  </a>
                </div>

                {/* Search Bar in Hero */}
                <div className="relative max-w-md" ref={searchRef}>
                  <form onSubmit={handleSearch} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="text-slate-400" size={20} />
                    </div>
                    <input 
                      type="text" 
                      placeholder={t('hero.search_placeholder')} 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 bg-medical-blue text-white px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {t('hero.search_btn')}
                    </button>
                  </form>

                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                      >
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSearch(s.title, s.id, s.type)}
                            className="w-full px-6 py-3 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                          >
                            {s.type === 'doctor' ? (
                              <div className="bg-blue-50 p-2 rounded-lg text-medical-blue">
                                <User size={16} />
                              </div>
                            ) : s.type === 'donor' ? (
                              <div className="bg-red-50 p-2 rounded-lg text-red-600">
                                <HeartPulse size={16} />
                              </div>
                            ) : (
                              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                                <Activity size={16} />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
                              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{s.type}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-100 pt-8"
              >
                <div>
                  <p className="text-3xl font-bold text-medical-blue">24/7</p>
                  <p className="text-sm text-slate-500">{t('hero.stat.emergency')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-medical-blue">10+</p>
                  <p className="text-sm text-slate-500">{t('hero.stat.doctors')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-medical-blue">1k+</p>
                  <p className="text-sm text-slate-500">{t('hero.stat.patients')}</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <img 
                    src="/image/hero-1.jpg" 
                    alt="Sherpur Ever Care Hospital Medical Team - শেরপুর এভারকেয়ার হাসপাতাল ডাক্তার" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="/image/hero-2.jpg" 
                    alt="Sherpur Ever Care Hospital Equipment - শেরপুর এভারকেয়ার হাসপাতাল সরঞ্জাম" 
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="/image/hero-3.jpg" 
                    alt="Patient Care" 
                    className="rounded-2xl shadow-lg w-full h-48 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="/image/hero-4.jpg" 
                    alt="Surgery Room" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504813184591-01592fd03cfd?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-medical-light rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-medical-light p-3 rounded-xl">
                <ShieldCheck className="text-medical-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t('features.quality_title')}</h3>
                <p className="text-slate-500 text-sm">{t('features.quality_desc')}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-medical-light p-3 rounded-xl">
                <Clock className="text-medical-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t('features.service_title')}</h3>
                <p className="text-slate-500 text-sm">{t('features.service_desc')}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-medical-light p-3 rounded-xl">
                <Users className="text-medical-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t('features.team_title')}</h3>
                <p className="text-slate-500 text-sm">{t('features.team_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Short Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-20">
            {/* Circular Images Slider - Positioned between sections */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative z-10 w-full aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentInteriorIndex}
                    src={interiorImages[currentInteriorIndex]} 
                    alt="Hospital Interior" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-medical-blue text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block">
                <p className="text-4xl font-bold mb-1">1+</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>

            <div className="text-center max-w-3xl">
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">{t('about.badge')}</span>
              <h2 className="section-title">{t('about.title')}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('about.desc1')}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t('about.desc2')}
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                {t('about.more')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">{t('services.badge')}</span>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className="text-slate-600">{t('services.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesPreview.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="card"
              >
                <div className="bg-medical-light w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="text-medical-blue font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  {t('services.more')} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline">{t('services.view_all')}</Link>
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">Meet Our Experts</span>
              <h2 className="section-title">Qualified Medical Professionals</h2>
              <p className="text-slate-600">Our team consists of highly experienced specialists dedicated to providing the best patient care.</p>
            </div>
            <Link to="/doctors" className="btn-outline mb-2">View All Doctors</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctorsPreview.map((doctor, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={doctor.img} 
                    alt={`Sherpur Ever Care Hospital - ${doctor.name}`} 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <Link to={`/doctors/${doctor.id}`} className="w-full bg-white text-medical-blue py-3 rounded-xl font-bold text-center">
                      View Profile & Book
                    </Link>
                  </div>
                </div>
                <Link to={`/doctors/${doctor.id}`}>
                  <h3 className="font-bold text-xl mb-1 hover:text-medical-blue transition-colors">{doctor.name}</h3>
                </Link>
                <p className="text-medical-blue font-medium text-sm mb-2">{doctor.specialty}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={16} />
                  <span>{doctor.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Bank Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">Save Lives</span>
              <h2 className="section-title">Our Blood Donors</h2>
              <p className="text-slate-600">Connect with voluntary blood donors in our community. Your contribution can save a life.</p>
            </div>
            <Link to="/blood-bank" className="btn-outline mb-2">View All Donors</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donorsPreview.map((donor, idx) => (
              <div key={idx} className="group">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={donor.img || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'} 
                    alt={`Blood Donor - ${donor.name} - Sherpur Ever Care Hospital`} 
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <a href={`tel:${donor.phone}`} className="w-full bg-white text-red-600 py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2">
                      <Phone size={18} /> Call Donor
                    </a>
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                    {donor.bloodGroup}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-1">{donor.name}</h3>
                <p className="text-red-600 font-medium text-sm mb-2">Blood Group: {donor.bloodGroup}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin size={16} />
                  <span>{donor.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-medical-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-blue-100">Real feedback from people who trusted us with their health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="italic mb-8 text-blue-50">
                  "The care I received at Sherpur Ever Care Hospital was exceptional. The doctors were very attentive and the facilities were top-notch."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-400"></div>
                  <div>
                    <p className="font-bold">Patient Name {i}</p>
                    <p className="text-xs text-blue-200">Recovered Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview & Map */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">Find Us</span>
              <h2 className="section-title">Visit Our Hospital</h2>
              <p className="text-slate-600 mb-8">
                We are conveniently located in the heart of Sherpur. Visit us for any medical assistance or consultation.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Location</h4>
                    <p className="text-slate-500 text-sm">Nurjahan Villa, Narayanpur, Sherpur Sadar Hospital Road, Sherpur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone Number</h4>
                    <p className="text-slate-500 text-sm">01891-773078</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn-primary">Get Directions</Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.705647568582!2d90.0150!3d25.0150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAwJzU0LjAiTiA5MMKwMDAnNTQuMCJF!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Hospital Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
