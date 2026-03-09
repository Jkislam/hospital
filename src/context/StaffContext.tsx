import React, { createContext, useContext, useState, useEffect } from 'react';
import { StaffMember } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface StaffContextType {
  staff: StaffMember[];
  updateStaff: (id: string, updatedStaff: Partial<StaffMember>) => Promise<void>;
  addStaff: (newMember: Omit<StaffMember, 'id'>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  loading: boolean;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured) {
        setStaff([]);
        return;
      }

      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('name');

      if (error) throw error;
      setStaff(data || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const updateStaff = async (id: string, updatedStaff: Partial<StaffMember>) => {
    try {
      const { error } = await supabase
        .from('staff')
        .update(updatedStaff)
        .eq('id', id);

      if (error) throw error;
      setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updatedStaff } : s));
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error;
    }
  };

  const addStaff = async (newMember: Omit<StaffMember, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('staff')
        .insert([newMember])
        .select();

      if (error) throw error;
      if (data) {
        setStaff(prev => [...prev, data[0]]);
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      throw error;
    }
  };

  const deleteStaff = async (id: string) => {
    try {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setStaff(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting staff:', error);
      throw error;
    }
  };

  return (
    <StaffContext.Provider value={{ staff, updateStaff, addStaff, deleteStaff, loading }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
