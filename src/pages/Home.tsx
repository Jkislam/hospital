import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function Home() {
  const { doctors } = useDoctors();
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

  const handleSearch = (e: React.FormEvent | string, id?: string) => {
    const query = typeof e === 'string' ? e : searchQuery;
    if (typeof e !== 'string') e.preventDefault();
    
    if (id && typeof e === 'string') {
      navigate(`/doctors/${id}`);
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
      
      const serSuggestions = SERVICES
        .filter(s => s.title.toLowerCase().includes(q))
        .map(s => ({ type: 'service' as const, title: s.title }));
      
      setSuggestions([...docSuggestions, ...serSuggestions].slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

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
    { icon: <Activity className="text-medical-blue" />, title: 'Emergency Care', desc: '24/7 immediate medical attention for all types of emergencies.' },
    { icon: <HeartPulse className="text-medical-blue" />, title: 'Diagnostics', desc: '24-hour USG, anomaly scans, echocardiograms, digital X-rays, and ECG.' },
    { icon: <Syringe className="text-medical-blue" />, title: 'Surgery', desc: '24-hour major and minor surgeries, normal deliveries, and C-sections.' },
    { icon: <Baby className="text-medical-blue" />, title: 'Maternity', desc: '24-hour normal deliveries and cesarean sections with expert care.' },
  ];

  const doctorsPreview = doctors.slice(0, 3);

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentBgIndex}
              src={backgroundImages[currentBgIndex]} 
              alt="Hospital Background" 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
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
                  TRUSTED HEALTHCARE IN SHERPUR
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                  Sherpur <span className="text-medical-blue">Ever Care</span> Hospital
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Providing compassionate, high-quality medical services with state-of-the-art facilities and expert medical professionals in Sherpur.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link to="/contact" className="btn-primary flex items-center justify-center gap-2">
                    Book Appointment <ArrowRight size={18} />
                  </Link>
                  <a href="tel:01632196797" className="btn-outline flex items-center justify-center gap-2">
                    <Phone size={18} /> Emergency Call
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
                      placeholder="Search doctors or services..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue outline-none transition-all"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 bg-medical-blue text-white px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Search
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
                            onClick={() => handleSearch(s.title, s.id)}
                            className="w-full px-6 py-3 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                          >
                            {s.type === 'doctor' ? (
                              <div className="bg-blue-50 p-2 rounded-lg text-medical-blue">
                                <User size={16} />
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
                  <p className="text-sm text-slate-500">Emergency Support</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-medical-blue">10+</p>
                  <p className="text-sm text-slate-500">Expert Doctors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-medical-blue">1k+</p>
                  <p className="text-sm text-slate-500">Happy Patients</p>
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
                    alt="Medical Team" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="/image/hero-2.jpg" 
                    alt="Hospital Equipment" 
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
                <h3 className="font-bold text-lg mb-2">Quality Care</h3>
                <p className="text-slate-500 text-sm">We maintain the highest standards of medical excellence.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-medical-light p-3 rounded-xl">
                <Clock className="text-medical-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">24/7 Service</h3>
                <p className="text-slate-500 text-sm">Our emergency and ICU services are available round the clock.</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-medical-light p-3 rounded-xl">
                <Users className="text-medical-blue" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                <p className="text-slate-500 text-sm">Dedicated professionals with years of specialized experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Short Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
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
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-medical-light rounded-full -z-10"></div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">About Our Hospital</span>
              <h2 className="section-title">Providing Advanced Healthcare Solutions</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Sherpur Ever Care Hospital is a leading healthcare provider in Sherpur district. Located at Narayanpur, we offer a wide range of medical services from routine check-ups to complex surgeries and intensive care.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our facility is equipped with modern diagnostic tools and a team of highly qualified doctors and nurses dedicated to your well-being.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-medical-blue font-bold tracking-widest uppercase text-sm mb-4 block">Our Specializations</span>
            <h2 className="section-title">Comprehensive Medical Services</h2>
            <p className="text-slate-600">We offer a wide range of specialized medical services to meet all your healthcare needs under one roof.</p>
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
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline">View All Services</Link>
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
                    alt={doctor.name} 
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
                    <p className="text-slate-500 text-sm">01632-196797</p>
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
