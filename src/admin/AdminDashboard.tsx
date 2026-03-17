import React, { useState } from 'react';
import { useDoctors } from '../context/DoctorContext';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { useStaff } from '../context/StaffContext';
import { motion, AnimatePresence } from 'motion/react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Users, 
  Search, 
  MoreVertical,
  ExternalLink,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Shield,
  Droplets,
  MapPin
} from 'lucide-react';
import DoctorForm from './DoctorForm';
import StaffForm from './StaffForm';
import BloodDonorForm from './BloodDonorForm';
import { Doctor, StaffMember, BloodDonor } from '../types';
import { useBloodBank } from '../context/BloodBankContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { doctors, deleteDoctor, loading: doctorsLoading } = useDoctors();
  const { messages, markAsRead, deleteMessage, loading: messagesLoading } = useMessages();
  const { staff, deleteStaff, loading: staffLoading } = useStaff();
  const { donors, deleteDonor, loading: donorsLoading } = useBloodBank();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'doctors' | 'messages' | 'staff' | 'blood-bank'>('doctors');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | undefined>(undefined);
  const [editingStaff, setEditingStaff] = useState<StaffMember | undefined>(undefined);
  const [editingDonor, setEditingDonor] = useState<BloodDonor | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.phone.includes(searchQuery)
  );

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDonors = donors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setEditingStaff(undefined);
    setEditingDonor(undefined);
    setIsFormOpen(true);
  };

  const handleEditStaff = (member: StaffMember) => {
    setEditingStaff(member);
    setEditingDoctor(undefined);
    setEditingDonor(undefined);
    setIsFormOpen(true);
  };

  const handleEditDonor = (donor: BloodDonor) => {
    setEditingDonor(donor);
    setEditingDoctor(undefined);
    setEditingStaff(undefined);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingDoctor(undefined);
    setEditingStaff(undefined);
    setEditingDonor(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteStaff = async (id: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to remove this staff member?')) return;
    
    const toastId = toast.loading('Removing management member...');
    try {
      await deleteStaff(id);
      toast.success('Management member removed successfully', { id: toastId });
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`, { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this doctor profile?')) return;

    const toastId = toast.loading('Deleting doctor profile...');
    try {
      await deleteDoctor(id);
      toast.success('Doctor deleted successfully', { id: toastId });
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`, { id: toastId });
    }
  };

  const handleDeleteDonor = async (id: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this donor?')) return;

    const toastId = toast.loading('Deleting donor...');
    try {
      await deleteDonor(id);
      toast.success('Donor deleted successfully', { id: toastId });
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`, { id: toastId });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    const toastId = toast.loading('Deleting message...');
    try {
      await deleteMessage(id);
      toast.success('Message deleted successfully', { id: toastId });
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Toaster position="top-right" />
      {/* Top Quick Navigation */}
      <nav className="bg-slate-900 text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-8 text-sm font-bold">
          <Link to="/" className="hover:text-medical-blue transition-colors">Home</Link>
          <Link to="/about" className="hover:text-medical-blue transition-colors">About</Link>
          <Link to="/contact" className="hover:text-medical-blue transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Sidebar/Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-medical-blue rounded-xl flex items-center justify-center text-white">
                <Users size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Doctor Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/doctors" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-medical-blue transition-colors">
                <ExternalLink size={16} />
                View Site
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'doctors' ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            <Users size={20} />
            Doctors
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'staff' ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            <Shield size={20} />
            Management
          </button>
          <button 
            onClick={() => setActiveTab('blood-bank')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'blood-bank' ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            <Droplets size={20} />
            Blood Bank
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === 'messages' ? 'bg-medical-blue text-white shadow-lg shadow-medical-blue/20' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
          >
            <MessageSquare size={20} />
            Messages & Bookings
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={
                activeTab === 'doctors' ? "Search doctors..." : 
                activeTab === 'staff' ? "Search management..." : 
                activeTab === 'blood-bank' ? "Search donors..." :
                "Search messages..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-medical-blue/10 focus:border-medical-blue transition-all shadow-sm"
            />
          </div>
          
          {activeTab !== 'messages' && (
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 bg-medical-blue text-white px-6 py-3 rounded-2xl font-bold hover:bg-medical-blue/90 transition-all shadow-lg shadow-medical-blue/20 w-full md:w-auto justify-center"
            >
              <Plus size={20} />
              {activeTab === 'doctors' ? 'Add New Doctor' : 
               activeTab === 'staff' ? 'Add New Management' : 'Add New Donor'}
            </button>
          )}
        </div>

        {activeTab === 'doctors' ? (
          /* Doctors Table */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={doctor.img} 
                            alt={doctor.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{doctor.name}</div>
                            <div className="text-xs text-slate-500">{doctor.education}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-medical-blue/10 text-medical-blue">
                          {doctor.specialty}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm text-slate-700 font-medium">{doctor.days}</div>
                        <div className="text-xs text-slate-500">{doctor.time}</div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(doctor)}
                            className="p-2 rounded-lg text-slate-400 hover:text-medical-blue hover:bg-medical-blue/10 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(doctor.id);
                            }}
                            className="relative z-10 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDoctors.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate-500">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                            <Search size={32} />
                          </div>
                          <p className="text-lg font-medium">No doctors found matching your search.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'blood-bank' ? (
          /* Blood Bank Management */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Donor</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={donor.img || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'} 
                            alt={donor.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <div className="font-bold text-slate-900">{donor.name}</div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 font-bold border border-red-100">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-slate-600 text-sm">
                          <MapPin size={14} className="mr-2 text-slate-400" />
                          {donor.address}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-slate-600 text-sm">
                          <Phone size={14} className="mr-2 text-slate-400" />
                          {donor.phone}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditDonor(donor)}
                            className="p-2 rounded-lg text-slate-400 hover:text-medical-blue hover:bg-medical-blue/10 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDonor(donor.id);
                            }}
                            className="relative z-10 p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDonors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                            <Search size={32} />
                          </div>
                          <p className="text-lg font-medium">No donors found matching your search.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'staff' ? (
          /* Staff Management */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((member) => (
              <motion.div 
                layout
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group"
              >
                <div className="relative h-64">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Desktop Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 lg:group-hover:opacity-100 transition-opacity hidden lg:flex items-center justify-center gap-4 z-20">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStaff(member);
                      }}
                      className="bg-white text-slate-900 p-3 rounded-xl font-bold flex items-center gap-2 hover:bg-medical-blue hover:text-white transition-all shadow-lg cursor-pointer"
                    >
                      <Edit2 size={18} /> Edit
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStaff(member.id);
                      }}
                      className="bg-white text-red-600 p-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-lg cursor-pointer"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-medical-blue font-semibold uppercase tracking-wider text-xs">{member.role}</p>
                  </div>
                  
                  <div className="flex lg:hidden items-center justify-center gap-3 pt-4 border-t border-slate-100 relative z-10">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStaff(member);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-medical-blue hover:text-white transition-all cursor-pointer"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStaff(member.id);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Messages List */
          <div className="space-y-6">
            {filteredMessages.map((message) => (
              <motion.div 
                layout
                key={message.id}
                className={`bg-white p-6 rounded-3xl border transition-all ${message.status === 'unread' ? 'border-medical-blue ring-1 ring-medical-blue/20' : 'border-slate-200'}`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">{message.name}</h3>
                      {message.status === 'unread' && (
                        <span className="px-2 py-0.5 bg-medical-blue text-white text-[10px] font-bold rounded-full uppercase tracking-wider">New</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {message.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={16} className="text-medical-blue" />
                          {message.email}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={16} className="text-medical-blue" />
                        {message.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={16} className="text-medical-blue" />
                        Booking: {new Date(message.date).toLocaleDateString()}
                      </div>
                      {message.doctor_name && (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users size={16} className="text-medical-blue" />
                          Doctor: <span className="font-bold text-slate-900">{message.doctor_name}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-sm leading-relaxed">
                      {message.message}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <Clock size={12} />
                      Received: {new Date(message.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex lg:flex-col justify-end gap-2">
                    {message.status === 'unread' && (
                      <button 
                        onClick={async () => await markAsRead(message.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-xs font-bold hover:bg-green-100 transition-all"
                      >
                        <CheckCircle size={16} />
                        Mark Read
                      </button>
                    )}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="relative z-10 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="bg-white rounded-3xl p-20 text-center border border-slate-200">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <MessageSquare size={32} />
                  </div>
                  <p className="text-lg font-medium text-slate-500">No messages or bookings found.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && editingDoctor && (
          <DoctorForm 
            doctor={editingDoctor} 
            onClose={() => setIsFormOpen(false)} 
          />
        )}
        {isFormOpen && editingStaff && (
          <StaffForm 
            member={editingStaff} 
            onClose={() => setIsFormOpen(false)} 
          />
        )}
        {isFormOpen && editingDonor && (
          <BloodDonorForm 
            donor={editingDonor} 
            onClose={() => setIsFormOpen(false)} 
          />
        )}
        {isFormOpen && !editingDoctor && !editingStaff && !editingDonor && (
          activeTab === 'doctors' ? (
            <DoctorForm onClose={() => setIsFormOpen(false)} />
          ) : activeTab === 'staff' ? (
            <StaffForm onClose={() => setIsFormOpen(false)} />
          ) : (
            <BloodDonorForm onClose={() => setIsFormOpen(false)} />
          )
        )}
      </AnimatePresence>
    </div>
  );
}
