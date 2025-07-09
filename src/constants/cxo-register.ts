import type { ExpertiseOption, AvailabilityOption } from "@/types/cxo-register";

export const expertiseOptions: ExpertiseOption[] = [
  { id: "cfo", label: "Chief Financial Officer (CFO)" },
  { id: "cmo", label: "Chief Marketing Officer (CMO)" },
  { id: "cto", label: "Chief Technology Officer (CTO)" },
  { id: "coo", label: "Chief Operating Officer (COO)" },
  { id: "cio", label: "Chief Information Officer (CIO)" },
  { id: "cdo", label: "Chief Data Officer (CDO)" },
  { id: "chro", label: "Chief Human Resources Officer (CHRO)" },
  { id: "cso", label: "Chief Strategy Officer (CSO)" },
];

export const availabilityOptions: AvailabilityOption[] = [
  { value: "full-time", label: "Full-time (40+ hours/week)" },
  { value: "part-time", label: "Part-time (20-40 hours/week)" },
  { value: "hourly", label: "Hourly consultation" },
  { value: "project", label: "Project-based" },
];