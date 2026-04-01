import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doctor } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { DOCTORS } from '../constants';

interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, 'id'>) => Promise<void>;
  updateDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;
  getDoctorById: (id: string) => Doctor | undefined;
  loading: boolean;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured) {
        setDoctors(DOCTORS);
        return;
      }

      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name');

      if (error) {
        // If Supabase is configured but fails (e.g. project deleted/inactive), 
        // we log it as a warning and use constants as fallback.
        console.warn('Supabase fetch failed, using fallback data:', error.message);
        setDoctors(DOCTORS);
        return;
      }
      
      setDoctors(data || []);
    } catch (error) {
      // Handle network errors like "Failed to fetch"
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn('Network error: Failed to fetch from Supabase. Using fallback data.');
      } else {
        console.error('Error fetching doctors:', error);
      }
      setDoctors(DOCTORS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const isUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const addDoctor = async (doctorData: Omit<Doctor, 'id'>) => {
    try {
      if (!isSupabaseConfigured) {
        const newDoctor = { ...doctorData, id: Math.random().toString(36).substr(2, 9) };
        setDoctors(prev => [...prev, newDoctor as Doctor]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('doctors')
          .insert([doctorData])
          .select();

        if (error) throw error;
        if (data) {
          setDoctors(prev => [...prev, data[0]]);
        }
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          const newDoctor = { ...doctorData, id: Math.random().toString(36).substr(2, 9) };
          setDoctors(prev => [...prev, newDoctor as Doctor]);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      throw error;
    }
  };

  const updateDoctor = async (updatedDoctor: Doctor) => {
    try {
      if (!isSupabaseConfigured || !isUUID(updatedDoctor.id)) {
        // Handle mock ID by inserting as new if Supabase is configured
        if (isSupabaseConfigured && !isUUID(updatedDoctor.id)) {
          const { id: _, ...doctorData } = updatedDoctor;
          await addDoctor(doctorData);
          setDoctors(prev => prev.filter(d => d.id !== updatedDoctor.id));
          return;
        }
        setDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
        return;
      }

      try {
        const { error } = await supabase
          .from('doctors')
          .update(updatedDoctor)
          .eq('id', updatedDoctor.id);

        if (error) throw error;
        setDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setDoctors(prev => prev.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw error;
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      if (!isSupabaseConfigured || !isUUID(id)) {
        setDoctors(prev => prev.filter(d => d.id !== id));
        return;
      }

      try {
        const { error } = await supabase
          .from('doctors')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setDoctors(prev => prev.filter(d => d.id !== id));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setDoctors(prev => prev.filter(d => d.id !== id));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  };

  const getDoctorById = (id: string) => {
    return doctors.find(d => d.id === id);
  };

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor, updateDoctor, deleteDoctor, getDoctorById, loading }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctors must be used within a DoctorProvider');
  }
  return context;
};
