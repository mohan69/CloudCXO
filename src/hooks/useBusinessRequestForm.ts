import { useState } from "react";

interface BusinessRequestFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  cxoType: string;
  duration: string;
  engagement: string;
  budget: string;
  description: string;
  requirements: string[];
  timeline: string;
  anonymous: boolean;
}

const initialFormData: BusinessRequestFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  cxoType: "",
  duration: "",
  engagement: "",
  budget: "",
  description: "",
  requirements: [],
  timeline: "",
  anonymous: false,
};

export const useBusinessRequestForm = () => {
  const [formData, setFormData] =
    useState<BusinessRequestFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const handleRequirementChange = (requirementId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      requirements: checked
        ? [...prev.requirements, requirementId]
        : prev.requirements.filter((id) => id !== requirementId),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    if (!formData.contactName || !formData.email || !formData.cxoType) {
      setSubmissionStatus("error");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting Business Request:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission failed", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData, setFormData, isSubmitting, submissionStatus,
    handleRequirementChange, handleSubmit,
  };
};