import { Stats, CXO, BusinessRequest } from '@/types/admin';

// Sample data for immediate functionality
const SAMPLE_STATS: Stats = {
  total_cxos: 24,
  total_requests: 156,
  active_projects: 42,
  completed_projects: 89
};

const SAMPLE_CXOS: CXO[] = [
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

const SAMPLE_BUSINESS_REQUESTS: BusinessRequest[] = [
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return SAMPLE_STATS;
};

export const getCXOs = async (): Promise<CXO[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return SAMPLE_CXOS;
};

export const getBusinessRequests = async (): Promise<BusinessRequest[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return SAMPLE_BUSINESS_REQUESTS;
};

// Function to add a new CXO (placeholder for now)
export const addCXO = async (cxo: Omit<CXO, 'id' | 'created_at' | 'updated_at'>): Promise<CXO | null> => {
  console.log('Add CXO called:', cxo);
  // In a real implementation, this would save to database
  return null;
};

// Function to add a new business request (placeholder for now)
export const addBusinessRequest = async (request: Omit<BusinessRequest, 'id' | 'created_at' | 'updated_at'>): Promise<BusinessRequest | null> => {
  console.log('Add business request called:', request);
  // In a real implementation, this would save to database
  return null;
};
