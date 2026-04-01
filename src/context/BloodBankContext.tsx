import React, { createContext, useContext, useState, useEffect } from 'react';
import { BloodDonor } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BLOOD_DONORS } from '../constants';

interface BloodBankContextType {
  donors: BloodDonor[];
  addDonor: (donor: Omit<BloodDonor, 'id'>) => Promise<void>;
  updateDonor: (id: string, donor: Partial<BloodDonor>) => Promise<void>;
  deleteDonor: (id: string) => Promise<void>;
  loading: boolean;
}

const BloodBankContext = createContext<BloodBankContextType | undefined>(undefined);

export const BloodBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured) {
        setDonors(BLOOD_DONORS);
        return;
      }

      const { data, error } = await supabase
        .from('blood_donors')
        .select('*')
        .order('name');

      if (error) {
        console.warn('Supabase fetch failed for donors, using fallback data:', error.message);
        setDonors(BLOOD_DONORS);
        return;
      }
      
      setDonors(data || []);
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn('Network error: Failed to fetch from Supabase. Using fallback data.');
      } else {
        console.error('Error fetching blood donors:', error);
      }
      setDonors(BLOOD_DONORS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const isUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  const addDonor = async (donorData: Omit<BloodDonor, 'id'>) => {
    try {
      if (!isSupabaseConfigured) {
        const newDonor = { ...donorData, id: Math.random().toString(36).substr(2, 9) };
        setDonors(prev => [...prev, newDonor]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blood_donors')
          .insert([donorData])
          .select();

        if (error) throw error;
        if (data) {
          setDonors(prev => [...prev, data[0]]);
        }
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          const newDonor = { ...donorData, id: Math.random().toString(36).substr(2, 9) };
          setDonors(prev => [...prev, newDonor]);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error adding blood donor:', error);
      throw error;
    }
  };

  const updateDonor = async (id: string, donorData: Partial<BloodDonor>) => {
    try {
      if (!isSupabaseConfigured || !isUUID(id)) {
        // If Supabase is not configured or the ID is a mock ID (like 'donor-1'),
        // we update the local state. If Supabase is configured, we also try to 
        // save it as a NEW record to the database to "persist" the change.
        if (isSupabaseConfigured && !isUUID(id)) {
          const currentDonor = donors.find(d => d.id === id);
          if (currentDonor) {
            const { id: _, ...newData } = { ...currentDonor, ...donorData };
            await addDonor(newData);
            // Remove the mock donor from local state since it's now in the DB
            setDonors(prev => prev.filter(d => d.id !== id));
            return;
          }
        }
        
        setDonors(prev => prev.map(d => d.id === id ? { ...d, ...donorData } : d));
        return;
      }

      try {
        const { error } = await supabase
          .from('blood_donors')
          .update(donorData)
          .eq('id', id);

        if (error) throw error;
        setDonors(prev => prev.map(d => d.id === id ? { ...d, ...donorData } : d));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setDonors(prev => prev.map(d => d.id === id ? { ...d, ...donorData } : d));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error updating blood donor:', error);
      throw error;
    }
  };

  const deleteDonor = async (id: string) => {
    try {
      if (!isSupabaseConfigured || !isUUID(id)) {
        setDonors(prev => prev.filter(d => d.id !== id));
        return;
      }

      try {
        const { error } = await supabase
          .from('blood_donors')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setDonors(prev => prev.filter(d => d.id !== id));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setDonors(prev => prev.filter(d => d.id !== id));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting blood donor:', error);
      throw error;
    }
  };

  return (
    <BloodBankContext.Provider value={{ donors, addDonor, updateDonor, deleteDonor, loading }}>
      {children}
    </BloodBankContext.Provider>
  );
};

export const useBloodBank = () => {
  const context = useContext(BloodBankContext);
  if (!context) {
    throw new Error('useBloodBank must be used within a BloodBankProvider');
  }
  return context;
};
