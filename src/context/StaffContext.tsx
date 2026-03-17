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

  const isUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const updateStaff = async (id: string, updatedStaff: Partial<StaffMember>) => {
    try {
      if (!isSupabaseConfigured || !isUUID(id)) {
        if (isSupabaseConfigured && !isUUID(id)) {
          const currentMember = staff.find(s => s.id === id);
          if (currentMember) {
            const { id: _, ...newData } = { ...currentMember, ...updatedStaff };
            await addStaff(newData);
            setStaff(prev => prev.filter(s => s.id !== id));
            return;
          }
        }
        setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updatedStaff } : s));
        return;
      }

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
      if (!isSupabaseConfigured) {
        const member = { ...newMember, id: Math.random().toString(36).substr(2, 9) };
        setStaff(prev => [...prev, member]);
        return;
      }

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
      if (!isSupabaseConfigured || !isUUID(id)) {
        setStaff(prev => prev.filter(s => s.id !== id));
        return;
      }

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
