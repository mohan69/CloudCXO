export interface CXOFormData {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedinProfile: string;
  expertise: string[];
  availability: string;
  experience: string;
  bio: string;
  profilePicture: File | null;
  resume: File | null;
}

export interface ExpertiseOption {
  id: string;
  label: string;
}

export interface AvailabilityOption {
  value: string;
  label: string;
}