import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface MessageContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'status' | 'created_at'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  loading: boolean;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured) {
        setMessages([]);
        return;
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch failed for messages:', error.message);
        setMessages([]);
        return;
      }
      setMessages(data || []);
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.warn('Network error: Failed to fetch from Supabase. Using empty messages.');
      } else {
        console.error('Error fetching messages:', error);
      }
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const addMessage = async (messageData: Omit<Message, 'id' | 'status' | 'created_at'>) => {
    try {
      const newMessage = {
        ...messageData,
        status: 'unread',
        created_at: new Date().toISOString()
      };

      if (!isSupabaseConfigured) {
        const mockMessage = { ...newMessage, id: Math.random().toString(36).substr(2, 9) };
        setMessages(prev => [mockMessage as Message, ...prev]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('messages')
          .insert([newMessage])
          .select();

        if (error) throw error;
        if (data) {
          setMessages(prev => [data[0], ...prev]);
        }
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          const mockMessage = { ...newMessage, id: Math.random().toString(36).substr(2, 9) };
          setMessages(prev => [mockMessage as Message, ...prev]);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      if (!isSupabaseConfigured) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
        return;
      }

      try {
        const { error } = await supabase
          .from('messages')
          .update({ status: 'read' })
          .eq('id', id);

        if (error) throw error;
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      if (!isSupabaseConfigured) {
        setMessages(prev => prev.filter(m => m.id !== id));
        return;
      }

      try {
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setMessages(prev => prev.filter(m => m.id !== id));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.warn('Network error: Failed to fetch from Supabase. Using local state.');
          setMessages(prev => prev.filter(m => m.id !== id));
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, markAsRead, deleteMessage, loading }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
