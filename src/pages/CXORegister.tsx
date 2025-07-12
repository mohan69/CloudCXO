import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckCircle, AlertTriangle } from "lucide-react";
import { useCXOForm } from "@/hooks/useCXOForm";
import { PersonalInfoSection } from "@/components/cxo-register/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/components/cxo-register/ProfessionalInfoSection";
import { DocumentsSection } from "@/components/cxo-register/DocumentsSection";

const CXORegister = () => {
  const {
    formData,
    setFormData,
    isSubmitting,
    submissionStatus,
    handleExpertiseChange,
    handleFileUpload,
    handleSubmit,
  } = useCXOForm();

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <Card className="w-full max-w-lg text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl mb-2">Registration Submitted!</CardTitle>
          <CardDescription>
            Thank you for joining our network. Your profile has been submitted for review. We will get back to you within 24-48 hours.
          </CardDescription>
        </Card>
      </div>
    );
  }

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
          </Header>
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
                {submissionStatus === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-destructive mb-4 p-3 bg-destructive/10 rounded-md">
                    <AlertTriangle className="w-4 h-4" />
                    <p>Submission failed. Please try again.</p>
                  </div>
                )}
                <Button type="submit" variant="professional" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
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