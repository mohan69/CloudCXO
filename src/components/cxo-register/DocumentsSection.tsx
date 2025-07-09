import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";
import type { CXOFormData } from "@/types/cxo-register";

interface DocumentsSectionProps {
  handleFileUpload: (field: 'profilePicture' | 'resume', file: File | null) => void;
}

export const DocumentsSection = ({ handleFileUpload }: DocumentsSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Documents & Media
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload your professional photo</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload('profilePicture', e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Resume/CV</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload your resume (PDF/DOC)</p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};