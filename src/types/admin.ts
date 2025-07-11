export interface Stats {
  totalCXOs: number;
  totalRequests: number;
  activeProjects: number;
  completedProjects: number;
}

export interface CXO {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: "Active" | "Pending" | "Inactive";
}

export interface BusinessRequest {
  id: number;
  company: string;
  requirement: string;
  budget: string;
  status: "Open" | "In Progress" | "Completed" | "Closed";
  date: string;
}
