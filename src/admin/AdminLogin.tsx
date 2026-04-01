import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || t('admin.login.error_invalid'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Quick Navigation */}
      <nav className="bg-slate-900 text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-8 text-sm font-bold">
          <Link to="/" className="hover:text-medical-blue transition-colors">{t('nav.home')}</Link>
          <Link to="/about" className="hover:text-medical-blue transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="hover:text-medical-blue transition-colors">{t('nav.contact')}</Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-medical-blue/10 text-medical-blue mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('admin.login.title')}</h1>
          <p className="text-slate-500">{t('admin.login.subtitle')}</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('admin.login.email_label')}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all"
                placeholder="admin@evercare.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t('admin.login.password_label')}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-medical-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-medical-blue/90 transition-all shadow-lg shadow-medical-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('admin.login.signing_in') : t('admin.login.sign_in')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            {t('admin.login.restricted')}
          </p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
