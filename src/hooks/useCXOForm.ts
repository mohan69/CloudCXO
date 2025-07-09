import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { CXOFormData } from "@/types/cxo-register";

export const useCXOForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CXOFormData>({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    linkedinProfile: "",
    expertise: [],
    availability: "",
    experience: "",
    bio: "",
    profilePicture: null,
    resume: null,
  });

  const handleExpertiseChange = (expertiseId: string, checked: boolean) => {
    console.log('Expertise change:', expertiseId, checked);
    setFormData(prev => {
      const newExpertise = checked 
        ? [...prev.expertise, expertiseId]
        : prev.expertise.filter(id => id !== expertiseId);
      console.log('New expertise array:', newExpertise);
      return {
        ...prev,
        expertise: newExpertise
      };
    });
  };

  const handleFileUpload = (field: 'profilePicture' | 'resume', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.expertise.length) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Submitted!",
      description: "Your CXO profile has been submitted for review. We'll contact you within 24 hours.",
    });

    console.log("CXO Registration Data:", formData);
  };

  return {
    formData,
    setFormData,
    handleExpertiseChange,
    handleFileUpload,
    handleSubmit,
  };
};