import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Info, 
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { useDoctors } from '../context/DoctorContext';
import { useMessages } from '../context/MessageContext';

export default function DoctorDetail() {
  const { id } = useParams();
  const { getDoctorById } = useDoctors();
  const { addMessage } = useMessages();
  const doctor = getDoctorById(id || '');
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  if (!doctor) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
        <Link to="/doctors" className="btn-primary">Back to Doctors</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to context (Supabase)
      await addMessage({
        ...formData,
        doctor_name: doctor.name
      });

      // Simulate booking
      setIsBooked(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/doctors" className="inline-flex items-center gap-2 text-medical-blue font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to All Doctors
        </Link>

        {isBooked ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-12 text-center shadow-2xl border border-emerald-100 max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Appointment Requested!</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. 
              We have received your request for <span className="font-bold text-slate-900">{doctor.name}</span>. 
              Our team will call you at <span className="font-bold text-slate-900">{formData.phone}</span> shortly to confirm.
            </p>
            <button 
              onClick={() => setIsBooked(false)}
              className="px-8 py-4 bg-medical-blue text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-medical-blue/20"
            >
              Book Another Appointment
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Doctor Info Column */}
            <div className="lg:col-span-8 space-y-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-medical-blue/5 rounded-bl-[5rem] -z-0"></div>
                
                <div className="flex flex-col md:flex-row gap-10 relative z-10">
                  <div className="shrink-0">
                    <div className="relative">
                      <img 
                        src={doctor.img} 
                        alt={doctor.name} 
                        className="w-56 h-56 rounded-3xl object-cover shadow-2xl ring-8 ring-slate-50"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-lg border border-slate-100">
                        <CheckCircle2 size={24} className="text-emerald-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-4 py-1.5 bg-medical-blue/10 text-medical-blue rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      Verified Specialist
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{doctor.name}</h1>
                    <p className="text-medical-blue text-xl font-semibold mb-8">{doctor.specialty}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                        <GraduationCap size={24} className="text-medical-blue shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Education</p>
                          <p className="text-sm font-semibold text-slate-700 leading-snug">{doctor.education}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                        <Briefcase size={22} className="text-medical-blue shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Chamber No</p>
                          <p className="text-sm font-semibold text-slate-700 leading-snug">{doctor.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                        <Clock size={22} className="text-medical-blue shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Visiting Time</p>
                          <p className="text-sm font-semibold text-slate-700 leading-snug">{doctor.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                        <Calendar size={22} className="text-medical-blue shrink-0 mt-1" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Visiting Days</p>
                          <p className="text-sm font-semibold text-slate-700 leading-snug">{doctor.days}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                      <Info size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">About Doctor</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {doctor.bio}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                      <CreditCard size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Consultation Fees</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 text-sm font-medium">Visiting Fee</span>
                      <span className="text-xl font-bold text-medical-blue">{doctor.fees}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center italic">
                      * Fees are subject to change based on hospital policy.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Booking Form Column */}
            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-32"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Book Appointment</h3>
                  <p className="text-slate-500 text-sm">Fill the form to request a visit.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Patient Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/5 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="01632-196797"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/5 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Preferred Date</label>
                    <input 
                      required
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/5 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Message (Optional)</label>
                    <textarea 
                      placeholder="Briefly describe your problem"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/5 outline-none transition-all text-sm resize-none"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-medical-blue text-white py-4 rounded-2xl font-bold text-lg mt-4 hover:bg-blue-700 transition-all shadow-lg shadow-medical-blue/20 flex items-center justify-center gap-2">
                    Confirm Booking
                  </button>
                  
                  <div className="relative flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-slate-100"></div>
                    <span className="flex-shrink mx-4 text-slate-300 text-[10px] font-bold uppercase tracking-widest">or</span>
                    <div className="flex-grow border-t border-slate-100"></div>
                  </div>

                  <a 
                    href="http://wa.me/8801891773078" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-md"
                  >
                    <MessageCircle size={24} />
                    WhatsApp
                  </a>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
