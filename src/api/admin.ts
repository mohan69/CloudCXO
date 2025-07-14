import { supabase, Stats, CXO, BusinessRequest, SUPABASE_CONFIGURED } from '@/lib/supabase';

// Fallback data for when Supabase is not configured
const FALLBACK_STATS: Stats = {
  total_cxos: 24,
  total_requests: 156,
  active_projects: 42,
  completed_projects: 89
};

const FALLBACK_CXOS: CXO[] = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    expertise: 'Technology', 
    experience: '15 years', 
    status: 'Active',
    created_at: '2024-01-15T00:00:00Z'
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    email: 'michael@example.com', 
    expertise: 'Marketing', 
    experience: '12 years', 
    status: 'Pending',
    created_at: '2024-01-14T00:00:00Z'
  },
  { 
    id: '3', 
    name: 'Emily Rodriguez', 
    email: 'emily@example.com', 
    expertise: 'Operations', 
    experience: '18 years', 
    status: 'Active',
    created_at: '2024-01-13T00:00:00Z'
  }
];

const FALLBACK_BUSINESS_REQUESTS: BusinessRequest[] = [
  { 
    id: '1', 
    company: 'TechCorp Inc', 
    requirement: 'Digital Transformation Strategy', 
    budget: '$50,000', 
    status: 'Open', 
    date: '2024-01-15',
    created_at: '2024-01-15T00:00:00Z'
  },
  { 
    id: '2', 
    company: 'Growth Solutions', 
    requirement: 'Marketing Automation Setup', 
    budget: '$25,000', 
    status: 'In Progress', 
    date: '2024-01-14',
    created_at: '2024-01-14T00:00:00Z'
  },
  { 
    id: '3', 
    company: 'Innovation Labs', 
    requirement: 'Product Strategy Review', 
    budget: '$75,000', 
    status: 'Completed', 
    date: '2024-01-13',
    created_at: '2024-01-13T00:00:00Z'
  }
];

export const getStats = async (): Promise<Stats> => {
  // Always return fallback data first, try Supabase if configured
  if (!SUPABASE_CONFIGURED) {
    console.log('Using fallback stats data (Supabase not configured)');
    return FALLBACK_STATS;
  }

  try {
    // Get total CXOs
    const { count: totalCXOs, error: cxoError } = await supabase
      .from('cxos')
      .select('*', { count: 'exact', head: true });

    if (cxoError) throw cxoError;

    // Get total requests
    const { count: totalRequests, error: requestError } = await supabase
      .from('business_requests')
      .select('*', { count: 'exact', head: true });

    if (requestError) throw requestError;

    // Get active projects (In Progress status)
    const { count: activeProjects, error: activeError } = await supabase
      .from('business_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'In Progress');

    if (activeError) throw activeError;

    // Get completed projects
    const { count: completedProjects, error: completedError } = await supabase
      .from('business_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Completed');

    if (completedError) throw completedError;

    return {
      total_cxos: totalCXOs || 0,
      total_requests: totalRequests || 0,
      active_projects: activeProjects || 0,
      completed_projects: completedProjects || 0,
    };
  } catch (error) {
    console.error('Error fetching stats from Supabase, using fallback:', error);
    return FALLBACK_STATS;
  }
};

export const getCXOs = async (): Promise<CXO[]> => {
  // Always return fallback data first, try Supabase if configured
  if (!SUPABASE_CONFIGURED) {
    console.log('Using fallback CXO data (Supabase not configured)');
    return FALLBACK_CXOS;
  }

  try {
    const { data, error } = await supabase
      .from('cxos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || FALLBACK_CXOS;
  } catch (error) {
    console.error('Error fetching CXOs from Supabase, using fallback:', error);
    return FALLBACK_CXOS;
  }
};

export const getBusinessRequests = async (): Promise<BusinessRequest[]> => {
  // Always return fallback data first, try Supabase if configured
  if (!SUPABASE_CONFIGURED) {
    console.log('Using fallback business requests data (Supabase not configured)');
    return FALLBACK_BUSINESS_REQUESTS;
  }

  try {
    const { data, error } = await supabase
      .from('business_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || FALLBACK_BUSINESS_REQUESTS;
  } catch (error) {
    console.error('Error fetching business requests from Supabase, using fallback:', error);
    return FALLBACK_BUSINESS_REQUESTS;
  }
};

// Function to add a new CXO
export const addCXO = async (cxo: Omit<CXO, 'id' | 'created_at' | 'updated_at'>): Promise<CXO | null> => {
  if (!SUPABASE_CONFIGURED) {
    console.warn('Cannot add CXO: Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('cxos')
      .insert([cxo])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error adding CXO:', error);
    return null;
  }
};

// Function to add a new business request
export const addBusinessRequest = async (request: Omit<BusinessRequest, 'id' | 'created_at' | 'updated_at'>): Promise<BusinessRequest | null> => {
  if (!SUPABASE_CONFIGURED) {
    console.warn('Cannot add business request: Supabase not configured');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('business_requests')
      .insert([request])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error adding business request:', error);
    return null;
  }
};
