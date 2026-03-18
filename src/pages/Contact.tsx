import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, User } from 'lucide-react';
import { useMessages } from '../context/MessageContext';
import { useStaff } from '../context/StaffContext';

export default function Contact() {
  const { addMessage } = useMessages();
  const { staff } = useStaff();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      // Save to context (Supabase)
      await addMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        message: formData.message
      });
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-24">
      <Helmet>
        <title>Contact Us | Sherpur Ever Care Hospital | শেরপুর এভারকেয়ার হাসপাতাল</title>
        <meta name="description" content="Contact Sherpur Ever Care Hospital (শেরপুর এভারকেয়ার হাসপাতাল) for appointments and emergency care. Find our address, phone number, and location in Sherpur." />
        <meta name="keywords" content="Contact Sherpur hospital, Sherpur Ever Care Hospital location, hospital phone number Sherpur, শেরপুর এভারকেয়ার হাসপাতাল যোগাযোগ" />
        <link rel="canonical" href="http://sherpurevarcarehospital.com/contact" />
      </Helmet>
      {/* Page Header */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Contact Us
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Have questions or need medical assistance? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-slate-900">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-medical-light p-4 rounded-2xl text-medical-blue">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Our Location</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Nurjahan Villa, Narayanpur,<br />
                      Sherpur Sadar Hospital Road,<br />
                      Sherpur, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-medical-light p-4 rounded-2xl text-medical-blue">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Phone Number</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Emergency: 01891-773078<br />
                      Help Desk: 01891-773078
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-medical-light p-4 rounded-2xl text-medical-blue">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Email Address</h4>
                    <p className="text-slate-600 leading-relaxed">
                      evercarehospital815@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-medical-light p-4 rounded-2xl text-medical-blue">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Working Hours</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Emergency: 24/7<br />
                      OPD: 08:00 AM - 08:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will contact you shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                        placeholder="01891-773078"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Booking Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    {formState === 'submitting' ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>

                  <div className="relative flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-sm font-medium uppercase tracking-wider">or</span>
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
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              Management Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Meet the dedicated leaders of Sherpur Ever Care Hospital.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {staff.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-medium text-sm">Sherpur Ever Care Hospital Management</p>
                  </div>
                </div>
                <div className="p-8 text-center bg-white">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-medical-blue font-semibold uppercase tracking-wider text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.705647568582!2d90.0150!3d25.0150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAwJzU0LjAiTiA5MMKwMDAnNTQuMCJF!5e0!3m2!1sen!2sbd!4v1625000000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Hospital Location"
        ></iframe>
      </section>
    </div>
  );
}
