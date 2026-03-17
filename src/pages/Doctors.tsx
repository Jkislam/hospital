import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Phone, MessageCircle } from 'lucide-react';
import { useDoctors } from '../context/DoctorContext';

export default function Doctors() {
  const { doctors } = useDoctors();

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
            Our Specialist Doctors
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Meet our team of highly qualified and experienced medical professionals dedicated to your health and recovery.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {doctors.map((doctor, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-[350px] overflow-hidden">
                  <img 
                    src={doctor.img} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"; }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <Link to={`/doctors/${doctor.id}`} className="w-full bg-white text-medical-blue py-3 rounded-xl font-bold text-center">
                      View Profile & Book
                    </Link>
                  </div>
                </div>
                <div className="p-8">
                  <Link to={`/doctors/${doctor.id}`}>
                    <h3 className="text-2xl font-bold mb-1 text-slate-900 hover:text-medical-blue transition-colors">{doctor.name}</h3>
                  </Link>
                  <p className="text-medical-blue font-semibold mb-6">{doctor.specialty}</p>
                  
                  <div className="space-y-3 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock size={18} className="text-medical-blue" />
                      <span className="text-sm font-medium">{doctor.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar size={18} className="text-medical-blue" />
                      <span className="text-sm font-medium">{doctor.days}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <a href="tel:01891773078" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-medical-blue text-medical-blue font-bold hover:bg-medical-blue hover:text-white transition-all">
                      <Phone size={18} /> Call for Info
                    </a>
                    <a 
                      href="http://wa.me/8801891773078" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all shadow-sm"
                    >
                      <MessageCircle size={18} /> WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Can't find the right specialist?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Contact our help desk for assistance in finding the right doctor for your specific health needs.
          </p>
          <a href="/contact" className="btn-primary">Contact Help Desk</a>
        </div>
      </section>
    </div>
  );
}
