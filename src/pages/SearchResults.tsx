import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search as SearchIcon, User, Activity, ArrowRight, Clock, Calendar } from 'lucide-react';
import { SERVICES } from '../constants';
import { useDoctors } from '../context/DoctorContext';
import { useLanguage } from '../context/LanguageContext';

export default function SearchResults() {
  const { doctors } = useDoctors();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const { t } = useLanguage();

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(query) || 
    doc.specialty.toLowerCase().includes(query)
  );

  const filteredServices = SERVICES.filter(ser => 
    ser.title.toLowerCase().includes(query) || 
    ser.desc.toLowerCase().includes(query)
  );

  const hasResults = filteredDoctors.length > 0 || filteredServices.length > 0;

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
              <SearchIcon size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{t('search.results.title')}</h1>
          </div>
          <p className="text-slate-600">
            {t('search.results.showing')} <span className="font-bold text-medical-blue">"{query}"</span>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!hasResults ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="text-slate-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('search.results.none.title')}</h2>
            <p className="text-slate-500 mb-8">{t('search.results.none.subtitle')}</p>
            <Link to="/" className="btn-primary">{t('nav.home')}</Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Doctors Results */}
            {filteredDoctors.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <User className="text-medical-blue" size={24} />
                  <h2 className="text-2xl font-bold text-slate-900">{t('search.results.doctors')} ({filteredDoctors.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDoctors.map((doctor, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-6 flex gap-4 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                    >
                      <img 
                        src={doctor.img} 
                        alt={doctor.name} 
                        className="w-24 h-24 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-medical-blue">{doctor.name}</h3>
                        <p className="text-medical-blue text-sm font-medium mb-3">{t(doctor.specialty)}</p>
                        <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                          <Clock size={14} />
                          <span>{doctor.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Calendar size={14} />
                          <span>{doctor.days}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Results */}
            {filteredServices.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Activity className="text-medical-blue" size={24} />
                  <h2 className="text-2xl font-bold text-slate-900">{t('search.results.services')} ({filteredServices.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <h3 className="font-bold text-xl mb-2">{t(service.title)}</h3>
                      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{t(service.desc)}</p>
                      <Link to="/services" className="text-medical-blue font-semibold text-sm flex items-center gap-1">
                        {t('search.results.view_details')} <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
