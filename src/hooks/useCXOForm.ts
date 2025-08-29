import { useState } from "react";

// Define the shape of the form data
interface CXOFormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  // Professional Info
  role: string;
  experience: string;
  expertise: string[];
  bio: string;
  // Documents
  resume: File | null;
  photo: File | null;
}

const initialFormData: CXOFormData = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  role: "CFO",
  experience: "10-15 years",
  expertise: [],
  bio: "",
  resume: null,
  photo: null,
};

export const useCXOForm = () => {
  const [formData, setFormData] = useState<CXOFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const handleExpertiseChange = (expertiseValue: string) => {
    setFormData((prev) => {
      const newExpertise = prev.expertise.includes(expertiseValue)
        ? prev.expertise.filter((e) => e !== expertiseValue)
        : [...prev.expertise, expertiseValue];
      return { ...prev, expertise: newExpertise };
    });
  };

  const handleFileUpload = (file: File, field: "resume" | "photo") => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit handler triggered.");

    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log("State set to: isSubmitting=true");

    try {
        console.log("Submitting CXO Registration Data:", formData);
        // Send to backend
        const resp = await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          console.error('Registration failed', err);
          setSubmissionStatus('error');
          return;
        }
        const data = await resp.json();
        console.log('Registration saved:', data);
        setSubmissionStatus('success');
      console.log("State set to: submissionStatus=success");
    } catch (error) {
      console.error("An error occurred during submission:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
      console.log("State set to: isSubmitting=false");
    }
  };

  return {
    formData, setFormData, isSubmitting, submissionStatus,
    handleExpertiseChange, handleFileUpload, handleSubmit,
  };
};