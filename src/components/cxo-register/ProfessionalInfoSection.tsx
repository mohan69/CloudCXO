import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { expertiseOptions, availabilityOptions } from "@/constants/cxo-register";
import type { CXOFormData } from "@/types/cxo-register";

interface ProfessionalInfoSectionProps {
  formData: CXOFormData;
  setFormData: React.Dispatch<React.SetStateAction<CXOFormData>>;
  handleExpertiseChange: (expertiseId: string, checked: boolean) => void;
}

export const ProfessionalInfoSection = ({ 
  formData, 
  setFormData, 
  handleExpertiseChange 
}: ProfessionalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Briefcase className="w-5 h-5" />
        Professional Information
      </h3>

      <div className="space-y-4">
        <Label className="text-base font-medium">Areas of Expertise *</Label>
        <div className="grid md:grid-cols-2 gap-3">
          {expertiseOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.expertise.includes(option.id)}
                onCheckedChange={(checked) => {
                  console.log('Checkbox clicked:', option.id, checked);
                  handleExpertiseChange(option.id, !!checked);
                }}
              />
              <Label 
                htmlFor={option.id} 
                className="text-sm font-normal cursor-pointer select-none"
                onClick={() => {
                  console.log('Label clicked:', option.id);
                  const isCurrentlyChecked = formData.expertise.includes(option.id);
                  handleExpertiseChange(option.id, !isCurrentlyChecked);
                }}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability *</Label>
        <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select your availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Executive Experience</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
          placeholder="15+ years"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Professional Summary</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          placeholder="Brief overview of your executive experience, key achievements, and leadership philosophy..."
          rows={4}
        />
      </div>
    </div>
  );
};