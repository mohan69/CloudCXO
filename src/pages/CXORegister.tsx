import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { useCXOForm } from "@/hooks/useCXOForm";
import { PersonalInfoSection } from "@/components/cxo-register/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/components/cxo-register/ProfessionalInfoSection";
import { DocumentsSection } from "@/components/cxo-register/DocumentsSection";

const CXORegister = () => {
  const {
    formData,
    setFormData,
    handleExpertiseChange,
    handleFileUpload,
    handleSubmit,
  } = useCXOForm();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Join Our Elite CXO Network</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with businesses seeking your expertise. Register as a fractional CXO and expand your impact across multiple organizations.
          </p>
        </div>

        <Card className="shadow-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              CXO Registration Form
            </CardTitle>
            <CardDescription>
              Complete your profile to start receiving opportunities from businesses seeking executive leadership.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <PersonalInfoSection 
                formData={formData}
                setFormData={setFormData}
              />

              <ProfessionalInfoSection 
                formData={formData}
                setFormData={setFormData}
                handleExpertiseChange={handleExpertiseChange}
              />

              <DocumentsSection 
                handleFileUpload={handleFileUpload}
              />

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <Button type="submit" variant="professional" size="lg" className="w-full md:w-auto">
                  Submit Registration
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  By registering, you agree to our terms of service and privacy policy. Your profile will be reviewed within 24 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CXORegister;