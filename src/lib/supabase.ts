import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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