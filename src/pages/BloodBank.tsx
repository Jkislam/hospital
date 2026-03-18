import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, Droplets, Search } from 'lucide-react';
import { useBloodBank } from '../context/BloodBankContext';
import { useLanguage } from '../context/LanguageContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function BloodBank() {
  const { donors, loading } = useBloodBank();
  const { t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDonors = donors.filter(donor => {
    const matchesGroup = selectedGroup ? donor.bloodGroup === selectedGroup : true;
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         donor.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <Helmet>
        <title>Blood Bank | Sherpur Ever Care Hospital | শেরপুর এভারকেয়ার হাসপাতাল</title>
        <meta name="description" content="Find blood donors in Sherpur at Sherpur Ever Care Hospital (শেরপুর এভারকেয়ার হাসপাতাল). Search by blood group and connect with donors to save lives." />
        <meta name="keywords" content="Sherpur blood bank, blood donors Sherpur, find blood Sherpur, শেরপুর ব্লাড ব্যাংক, রক্তদাতা শেরপুর" />
        <link rel="canonical" href="http://sherpurevarcarehospital.com/blood-bank" />
      </Helmet>
      {/* Page Header */}
      <section className="bg-white py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-50 text-red-500 rounded-3xl mb-6 shadow-inner"
          >
            <Droplets size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {t('blood_bank.title') || 'Blood Bank'}
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('blood_bank.desc') || 'Find blood donors in Sherpur. Every drop counts. Your donation can save a life.'}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 md:py-12 bg-white shadow-sm border-b border-slate-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedGroup(null)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedGroup === null 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Groups
              </button>
              {BLOOD_GROUPS.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedGroup === group 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDonors.map((donor, idx) => (
                <motion.div 
                  key={donor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative shrink-0">
                        <img 
                          src={donor.img || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'} 
                          alt={donor.name} 
                          className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-slate-50"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg border-2 border-white text-xs">
                          {donor.bloodGroup}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-red-500 transition-colors">{donor.name}</h3>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin size={14} />
                          <span className="text-xs font-medium">{donor.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Blood Group</span>
                        <span className="text-lg font-black text-red-500">{donor.bloodGroup}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <a 
                        href={`tel:${donor.phone}`} 
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                      >
                        <Phone size={18} /> Call
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Donors Found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-24 bg-red-500 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Become a Life Saver</h2>
          <p className="text-xl mb-12 opacity-90 leading-relaxed">
            Register as a blood donor today and help us maintain a steady supply of blood for those in need in Sherpur.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:01891773078" className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              Contact Help Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
