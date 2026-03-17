import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { X, Upload, Check, Droplets, User, Phone, MapPin } from 'lucide-react';
import { BloodDonor } from '../types';
import { useBloodBank } from '../context/BloodBankContext';

interface BloodDonorFormProps {
  donor?: BloodDonor;
  onClose: () => void;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function BloodDonorForm({ donor, onClose }: BloodDonorFormProps) {
  const { addDonor, updateDonor } = useBloodBank();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<BloodDonor, 'id'>>({
    name: donor?.name || '',
    bloodGroup: donor?.bloodGroup || 'A+',
    address: donor?.address || '',
    phone: donor?.phone || '',
    img: donor?.img || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'
  });
  const [imagePreview, setImagePreview] = useState<string>(donor?.img || formData.img);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, img: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (donor) {
        await updateDonor(donor.id, formData);
        toast.success('Donor information updated successfully');
      } else {
        await addDonor(formData);
        toast.success('New donor added successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save donor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{donor ? 'Edit Donor' : 'Add New Donor'}</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Blood Bank Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto p-8 space-y-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="relative group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-slate-100 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                >
                  <Upload size={24} />
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-xs text-slate-400 font-medium">Click image to upload new photo</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <User size={16} className="text-medical-blue" />
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 outline-none transition-all"
                  placeholder="Enter donor name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Droplets size={16} className="text-medical-blue" />
                  Blood Group
                </label>
                <select 
                  required
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 outline-none transition-all bg-white"
                >
                  {BLOOD_GROUPS.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone size={16} className="text-medical-blue" />
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 outline-none transition-all"
                  placeholder="e.g. 01700-000000"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-medical-blue" />
                  Address / Location
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 outline-none transition-all"
                  placeholder="e.g. Sherpur Sadar"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (Optional)</label>
                <input 
                  type="text" 
                  value={formData.img.startsWith('data:') ? '' : formData.img}
                  onChange={(e) => {
                    setFormData({ ...formData, img: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/10 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-100 bg-slate-50 shrink-0">
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 bg-medical-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-medical-blue/90 transition-all shadow-lg shadow-medical-blue/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Check size={20} />
                {loading ? 'Saving...' : (donor ? 'Save Changes' : 'Add Donor')}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
