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
            className="bg-white rounded-3xl p-12 text-center shadow-xl border border-emerald-100 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Requested!</h2>
            <p className="text-slate-600 mb-8">
              Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. 
              We have received your request for <span className="font-bold text-slate-900">{doctor.name}</span>. 
              Our team will call you at <span className="font-bold text-slate-900">{formData.phone}</span> shortly to confirm.
            </p>
            <button 
              onClick={() => setIsBooked(false)}
              className="btn-primary"
            >
              Book Another Appointment
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Doctor Info Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8"
              >
                <div className="shrink-0">
                  <img 
                    src={doctor.img} 
                    alt={doctor.name} 
                    className="w-48 h-48 rounded-2xl object-cover shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{doctor.name}</h1>
                  <p className="text-medical-blue text-xl font-semibold mb-6">{doctor.specialty}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <GraduationCap size={20} className="text-medical-blue" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Education</p>
                        <p className="text-sm font-medium">{doctor.education}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Briefcase size={20} className="text-medical-blue" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Experience</p>
                        <p className="text-sm font-medium">{doctor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock size={20} className="text-medical-blue" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Visiting Time</p>
                        <p className="text-sm font-medium">{doctor.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={20} className="text-medical-blue" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Visiting Days</p>
                        <p className="text-sm font-medium">{doctor.days}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Info size={24} className="text-medical-blue" />
                  <h2 className="text-2xl font-bold text-slate-900">About Doctor</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {doctor.bio}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={24} className="text-medical-blue" />
                  <h2 className="text-2xl font-bold text-slate-900">Consultation Fees</h2>
                </div>
                <div className="flex items-center justify-between bg-slate-50 p-6 rounded-2xl">
                  <span className="text-slate-600 font-medium">Visiting Fee</span>
                  <span className="text-2xl font-bold text-medical-blue">{doctor.fees}</span>
                </div>
              </motion.div>
            </div>

            {/* Booking Form Column */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 sticky top-32"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Appointment</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="01632-196797"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
                    <input 
                      required
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                    <textarea 
                      placeholder="Briefly describe your problem"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 text-lg mt-4">
                    Confirm Booking
                  </button>
                  
                  <div className="relative flex items-center justify-center my-4">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-sm font-medium">or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  <a 
                    href="http://wa.me/8801891773078" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#128C7E] transition-all shadow-md"
                  >
                    <MessageCircle size={24} />
                    Message on WhatsApp
                  </a>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    By clicking confirm, you agree to our terms of service and privacy policy.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
