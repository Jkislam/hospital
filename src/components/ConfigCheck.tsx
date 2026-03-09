import React from 'react';
import { AlertCircle } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ConfigCheck({ children }: { children: React.ReactNode }) {
  const isLocalhost = import.meta.env.VITE_SUPABASE_URL?.includes('localhost');

  if (!isSupabaseConfigured || isLocalhost) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            {isLocalhost ? 'Localhost URL Detected' : 'Supabase Not Configured'}
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {isLocalhost 
              ? 'You are using a localhost URL for Supabase. This will not work in the preview environment. Please use your actual Supabase project URL.'
              : 'It looks like your Supabase environment variables are missing or incorrect. Please ensure you have set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'}
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl text-left text-sm font-mono text-slate-500 mb-8">
            # .env.example<br/>
            VITE_SUPABASE_URL=your_url<br/>
            VITE_SUPABASE_ANON_KEY=your_key
          </div>
          <p className="text-xs text-slate-400 italic">
            Once configured, the "Failed to fetch" error should disappear.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
