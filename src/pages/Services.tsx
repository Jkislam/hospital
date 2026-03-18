import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Activity, 
  HeartPulse, 
  Syringe, 
  Baby, 
  Microscope, 
  Truck, 
  Pill,
  Stethoscope
} from 'lucide-react';
import { SERVICES } from '../constants';

export default function Services() {
  const services = SERVICES.map((s, i) => {
    const icons = [
      <Activity size={32} />, 
      <HeartPulse size={32} />, 
      <Syringe size={32} />, 
      <Baby size={32} />, 
      <Microscope size={32} />, 
      <Pill size={32} />, 
      <Truck size={32} />, 
      <Stethoscope size={32} />
    ];
    return { ...s, icon: icons[i] || <Activity size={32} /> };
  });

  return (
    <div className="pt-24">
      <Helmet>
        <title>Our Services | Sherpur Ever Care Hospital | শেরপুর এভারকেয়ার হাসপাতাল</title>
        <meta name="description" content="Explore the specialized medical services at Sherpur Ever Care Hospital (শেরপুর এভারকেয়ার হাসপাতাল), including emergency care, diagnostics, surgery, and maternity." />
        <meta name="keywords" content="Sherpur hospital services, medical diagnostics Sherpur, surgery Sherpur, maternity care Sherpur, শেরপুর এভারকেয়ার হাসপাতাল সার্ভিস" />
        <link rel="canonical" href="http://sherpurevarcarehospital.com/services" />
      </Helmet>
      {/* Page Header */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Our Medical Services
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We provide a wide range of specialized healthcare services with a focus on patient safety and clinical excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-medical-light text-medical-blue w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-medical-blue group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-medical-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Emergency Medical Assistance?</h2>
          <p className="text-xl mb-10 opacity-90">Our emergency team is ready 24/7 to help you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:01891773078" className="bg-white text-medical-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all">
              Call Now: 01891-773078
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-medical-blue transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
