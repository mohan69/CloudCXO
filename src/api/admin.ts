import { supabase, Stats, CXO, BusinessRequest } from '@/lib/supabase';

export const getStats = async (): Promise<Stats> => {
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
    console.error('Error fetching stats:', error);
    // Return fallback data if database is not set up yet
    return {
      total_cxos: 0,
      total_requests: 0,
      active_projects: 0,
      completed_projects: 0,
    };
  }
};

export const getCXOs = async (): Promise<CXO[]> => {
  try {
    const { data, error } = await supabase
      .from('cxos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching CXOs:', error);
    // Return fallback data if database is not set up yet
    return [
      { 
        id: '1', 
        name: 'Sarah Johnson', 
        email: 'sarah@example.com', 
        expertise: 'Technology', 
        experience: '15 years', 
        status: 'Active' 
      },
      { 
        id: '2', 
        name: 'Michael Chen', 
        email: 'michael@example.com', 
        expertise: 'Marketing', 
        experience: '12 years', 
        status: 'Pending' 
      },
      { 
        id: '3', 
        name: 'Emily Rodriguez', 
        email: 'emily@example.com', 
        expertise: 'Operations', 
        experience: '18 years', 
        status: 'Active' 
      }
    ];
  }
};

export const getBusinessRequests = async (): Promise<BusinessRequest[]> => {
  try {
    const { data, error } = await supabase
      .from('business_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching business requests:', error);
    // Return fallback data if database is not set up yet
    return [
      { 
        id: '1', 
        company: 'TechCorp Inc', 
        requirement: 'Digital Transformation Strategy', 
        budget: '$50,000', 
        status: 'Open', 
        date: '2024-01-15' 
      },
      { 
        id: '2', 
        company: 'Growth Solutions', 
        requirement: 'Marketing Automation Setup', 
        budget: '$25,000', 
        status: 'In Progress', 
        date: '2024-01-14' 
      },
      { 
        id: '3', 
        company: 'Innovation Labs', 
        requirement: 'Product Strategy Review', 
        budget: '$75,000', 
        status: 'Completed', 
        date: '2024-01-13' 
      }
    ];
  }
};

// Function to add a new CXO
export const addCXO = async (cxo: Omit<CXO, 'id' | 'created_at' | 'updated_at'>): Promise<CXO | null> => {
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
