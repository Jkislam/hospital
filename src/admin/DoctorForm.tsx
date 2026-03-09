import React, { useState, useEffect } from 'react';
import { useDoctors } from '../context/DoctorContext';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { X, Save, Image as ImageIcon, Briefcase, GraduationCap, Clock, Calendar, DollarSign, FileText, Upload } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorFormProps {
  doctor?: Doctor;
  onClose: () => void;
}

export default function DoctorForm({ doctor, onClose }: DoctorFormProps) {
  const { addDoctor, updateDoctor } = useDoctors();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Doctor>({
    id: '',
    name: '',
    specialty: '',
    time: '',
    days: '',
    img: '',
    education: '',
    experience: '',
    bio: '',
    fees: ''
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    }
  }, [doctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, img: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.img) {
      alert('Please provide a doctor image (URL or Upload)');
      return;
    }

    setLoading(true);
    try {
      if (doctor) {
        await updateDoctor(formData);
        toast.success('Doctor profile updated successfully');
      } else {
        const { id, ...doctorData } = formData;
        await addDoctor(doctorData);
        toast.success('New doctor added successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{doctor ? 'Edit Doctor Profile' : 'Add New Doctor'}</h2>
            <p className="text-sm text-slate-500">Enter the details for the medical professional</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-grow overflow-y-auto p-8">
          <form id="doctor-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-medical-blue uppercase tracking-wider">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Dr. John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Specialty</label>
                  <input 
                    type="text" 
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Cardiologist"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Doctor Image</label>
                  <div className="space-y-4">
                    {/* Preview */}
                    {formData.img && (
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                        <img 
                          src={formData.img} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, img: '' }))}
                          className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-lg text-red-500 hover:bg-white transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                      {/* URL Input */}
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="url" 
                          name="img"
                          value={formData.img.startsWith('data:') ? '' : formData.img}
                          onChange={handleChange}
                          placeholder="Paste image URL here..."
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="h-px flex-grow bg-slate-200"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase">OR</span>
                        <div className="h-px flex-grow bg-slate-200"></div>
                      </div>

                      {/* File Upload */}
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-medical-blue/30 transition-all cursor-pointer group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-slate-400 group-hover:text-medical-blue transition-colors" />
                          <p className="mb-2 text-sm text-slate-500">
                            <span className="font-bold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-400 uppercase font-medium">PNG, JPG or WebP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-medical-blue uppercase tracking-wider">Professional Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Education</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      placeholder="e.g. MBBS, MD (Cardiology)"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Experience</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 15+ Years"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Consultation Fees</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 1000 BDT"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-medical-blue uppercase tracking-wider">Schedule</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Available Days</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="days"
                      value={formData.days}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Sat, Mon, Wed"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Available Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 10 AM - 2 PM"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-sm font-bold text-medical-blue uppercase tracking-wider">Biography</h3>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Doctor's Bio</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe the doctor's background, achievements, and approach to care..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4 sticky bottom-0 z-10">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="doctor-form"
            disabled={loading}
            className="flex items-center gap-2 bg-medical-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-medical-blue/90 transition-all shadow-lg shadow-medical-blue/20 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? 'Saving...' : (doctor ? 'Update Profile' : 'Save Doctor')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
