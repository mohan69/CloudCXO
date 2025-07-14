import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback for when Supabase is not configured
const SUPABASE_CONFIGURED = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('your-project') && 
  !supabaseAnonKey.includes('your-anon-key');

let supabase: any = null;

if (SUPABASE_CONFIGURED) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase not configured. Using fallback authentication.');
  // Create a mock client for development
  supabase = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
}

export { supabase, SUPABASE_CONFIGURED };

// Database Types
export interface Stats {
  total_cxos: number
  total_requests: number
  active_projects: number
  completed_projects: number
}

export interface CXO {
  id: string
  name: string
  email: string
  expertise: string
  experience: string
  status: 'Active' | 'Pending' | 'Inactive'
  created_at?: string
  updated_at?: string
}

export interface BusinessRequest {
  id: string
  company: string
  requirement: string
  budget: string
  status: 'Open' | 'In Progress' | 'Completed' | 'Closed'
  date: string
  created_at?: string
  updated_at?: string
}