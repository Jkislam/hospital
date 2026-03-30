import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const features = [
    t('about_page_why_excellence'),
    t('feat_emergency'),
    t('feat_expert'),
    t('feat_nursing'),
    t('feat_ot'),
    t('feat_environment')
  ];

  return (
    <div className="pt-24">
      <Helmet>
        <title>About Us | Sherpur Ever Care Hospital | শেরপুর এভারকেয়ার হাসপাতাল</title>
        <meta name="description" content="Learn about Sherpur Ever Care Hospital (শেরপুর এভারকেয়ার হাসপাতাল), our mission, vision, and the team dedicated to providing the best healthcare services in Sherpur." />
        <meta name="keywords" content="About Sherpur Ever Care Hospital, Sherpur hospital history, best medical team Sherpur, শেরপুর এভারকেয়ার হাসপাতাল সম্পর্কে" />
        <link rel="canonical" href="http://sherpurevarcarehospital.com/about" />
      </Helmet>
      {/* Page Header */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {t('about_page_title')}
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('about_page_subtitle')}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img 
                src="/image/about-main.jpg" 
                alt="Medical Team" 
                className="rounded-3xl shadow-2xl"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"; }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">{t('about_page_story_title')}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t('about_page_story_desc1')}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t('about_page_story_desc2')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="text-medical-blue" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="bg-medical-light w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                <Target className="text-medical-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('about_page_mission_title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('about_page_mission_desc')}
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="bg-medical-light w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="text-medical-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('about_page_vision_title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('about_page_vision_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('about_page_why_title')}</h2>
            <p className="text-slate-600">{t('about_page_why_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('about_page_why_excellence')}</h4>
              <p className="text-slate-500 text-sm">{t('about_page_why_excellence_desc')}</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('about_page_why_trust')}</h4>
              <p className="text-slate-500 text-sm">{t('about_page_why_trust_desc')}</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">{t('about_page_why_compassion')}</h4>
              <p className="text-slate-500 text-sm">{t('about_page_why_compassion_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
