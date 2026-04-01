import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Hospital Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/image/logo.png" 
                alt="Sherpur Ever Care Hospital" 
                className="h-12 w-auto"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="font-bold text-xl text-white">{t('nav.brand')}</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1B14LFimHq/" target="_blank" rel="noopener noreferrer" className="hover:text-medical-blue transition-colors"><Facebook size={20} /></a>
              <a href="http://wa.me/8801891773078" target="_blank" rel="noopener noreferrer" className="hover:text-medical-blue transition-colors"><MessageCircle size={20} /></a>
              <a href="https://www.instagram.com/mustafizurraba?igsh=MXA2NHRnN3ZtaHhnZw==&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer" className="hover:text-medical-blue transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('footer.quick_links')}</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">{t('nav.doctors')}</Link></li>
              <li><Link to="/blood-bank" className="hover:text-white transition-colors">{t('nav.blood_bank')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/appointment" className="hover:text-white transition-colors">{t('hero.book')}</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">{t('footer.admin')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('nav.services')}</h3>
            <ul className="space-y-4">
              <li className="hover:text-white transition-colors">{t('services.emergency')}</li>
              <li className="hover:text-white transition-colors">{t('services.icu_title')}</li>
              <li className="hover:text-white transition-colors">{t('services.surgery')}</li>
              <li className="hover:text-white transition-colors">{t('services.maternity')}</li>
              <li className="hover:text-white transition-colors">{t('services.diagnostics')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('footer.contact_info')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-medical-blue shrink-0 mt-1" size={18} />
                <span className="text-sm">
                  {t('contact.location_desc')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-medical-blue shrink-0" size={18} />
                <span className="text-sm">01891-773078</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-medical-blue shrink-0" size={18} />
                <span className="text-sm">evercarehospital815@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} {t('hero.title')}. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
            <Link to="/admin/dashboard" className="hover:text-white">{t('footer.admin')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
