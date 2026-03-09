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

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
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

      const { data, error } = await supabase
        .from('messages')
        .insert([newMessage])
        .select();

      if (error) throw error;
      if (data) {
        setMessages(prev => [data[0], ...prev]);
      }
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages(prev => prev.filter(m => m.id !== id));
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
