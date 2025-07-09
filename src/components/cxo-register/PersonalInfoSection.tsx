import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ExternalLink } from "lucide-react";
import type { CXOFormData } from "@/types/cxo-register";

interface PersonalInfoSectionProps {
  formData: CXOFormData;
  setFormData: React.Dispatch<React.SetStateAction<CXOFormData>>;
}

export const PersonalInfoSection = ({ formData, setFormData }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <User className="w-5 h-5" />
        Personal Information
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinProfile">LinkedIn Profile URL</Label>
        <div className="relative">
          <Input
            id="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
            placeholder="https://linkedin.com/in/johndoe"
          />
          <ExternalLink className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};