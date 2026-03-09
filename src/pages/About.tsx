import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Eye, Award, CheckCircle2, Users } from 'lucide-react';

export default function About() {
  const content: Record<string, string> = {};

  return (
    <div className="pt-24">
      {/* Page Header */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            About Sherpur Ever Care Hospital
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Dedicated to providing excellence in healthcare through innovation, compassion, and commitment to our community.
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
              <h2 className="text-3xl font-bold mb-6 text-slate-900">{content.about_title || 'Our Story & Commitment'}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {content.about_text || 'Sherpur Ever Care Hospital was established with a vision to bring world-class healthcare to the people of Sherpur. We understand that health is the most valuable asset, and we are here to protect it.'}
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                From our humble beginnings, we have grown into a multi-specialty facility equipped with the latest medical technology. Our team of doctors, nurses, and support staff work tirelessly to ensure that every patient receives personalized and effective treatment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Advanced Diagnostic Tools',
                  '24/7 Emergency Support',
                  'Expert Specialist Doctors',
                  'Compassionate Nursing Staff',
                  'Modern Operation Theaters',
                  'Clean & Safe Environment'
                ].map((item, idx) => (
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
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To provide high-quality, cost-effective healthcare services with compassion and respect for the dignity of every patient. We strive to improve the health of our community through excellence in clinical care and education.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="bg-medical-light w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                <Eye className="text-medical-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted healthcare provider in the region, recognized for our clinical excellence, patient-centered approach, and commitment to the well-being of the society we serve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-slate-600">We prioritize your health and comfort above everything else.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Excellence</h4>
              <p className="text-slate-500 text-sm">We are committed to the highest standards of medical practice and patient safety.</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Trust</h4>
              <p className="text-slate-500 text-sm">Built on years of reliable service and successful patient outcomes.</p>
            </div>
            <div className="text-center p-8">
              <div className="bg-medical-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-medical-blue" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Compassion</h4>
              <p className="text-slate-500 text-sm">We treat every patient like family, with empathy and personalized attention.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
