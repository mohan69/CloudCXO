import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Clock, DollarSign, Mail, Phone, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessRequest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    cxoType: "",
    duration: "",
    engagement: "",
    budget: "",
    description: "",
    requirements: [] as string[],
    timeline: "",
    anonymous: false,
  });

  const cxoTypes = [
    { value: "cfo", label: "Chief Financial Officer (CFO)" },
    { value: "cmo", label: "Chief Marketing Officer (CMO)" },
    { value: "cto", label: "Chief Technology Officer (CTO)" },
    { value: "coo", label: "Chief Operating Officer (COO)" },
    { value: "cio", label: "Chief Information Officer (CIO)" },
    { value: "cdo", label: "Chief Data Officer (CDO)" },
    { value: "chro", label: "Chief Human Resources Officer (CHRO)" },
    { value: "cso", label: "Chief Strategy Officer (CSO)" },
    { value: "multiple", label: "Multiple Roles" },
  ];

  const engagementTypes = [
    { value: "hourly", label: "Hourly Consultation" },
    { value: "part-time", label: "Part-time (20-40 hrs/week)" },
    { value: "full-time", label: "Full-time (40+ hrs/week)" },
    { value: "project", label: "Project-based" },
    { value: "retainer", label: "Monthly Retainer" },
  ];

  const budgetRanges = [
    { value: "under-5k", label: "Under $5,000/month" },
    { value: "5k-10k", label: "$5,000 - $10,000/month" },
    { value: "10k-25k", label: "$10,000 - $25,000/month" },
    { value: "25k-50k", label: "$25,000 - $50,000/month" },
    { value: "50k-plus", label: "$50,000+/month" },
    { value: "discuss", label: "Open to Discussion" },
  ];

  const timelineOptions = [
    { value: "immediate", label: "Immediate (within 1 week)" },
    { value: "short", label: "Short-term (1-4 weeks)" },
    { value: "medium", label: "Medium-term (1-3 months)" },
    { value: "long", label: "Long-term (3+ months)" },
  ];

  const requirementOptions = [
    { id: "strategy", label: "Strategic Planning" },
    { id: "operations", label: "Operations Optimization" },
    { id: "fundraising", label: "Fundraising & Investment" },
    { id: "digital", label: "Digital Transformation" },
    { id: "growth", label: "Growth & Scaling" },
    { id: "restructuring", label: "Business Restructuring" },
    { id: "compliance", label: "Compliance & Governance" },
    { id: "team", label: "Team Building & Leadership" },
  ];

  const handleRequirementChange = (requirementId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      requirements: checked 
        ? [...prev.requirements, requirementId]
        : prev.requirements.filter(id => id !== requirementId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.contactName || !formData.email || !formData.cxoType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Requirement Submitted!",
      description: "Your request has been posted. We'll match you with qualified CXOs within 48 hours.",
    });

    console.log("Business Request Data:", formData);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Ideal CXO</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your business needs and we'll connect you with experienced C-level executives who can drive your company forward.
          </p>
        </div>

        <Card className="shadow-professional">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Business Requirement Form
            </CardTitle>
            <CardDescription>
              Provide details about your executive needs to get matched with the right CXO talent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company & Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Your Company Inc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Person *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      placeholder="John Smith"
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
                      placeholder="john@company.com"
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
                </div>
              </div>

              {/* CXO Requirements */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Executive Requirements
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cxoType">Type of CXO Needed *</Label>
                    <Select value={formData.cxoType} onValueChange={(value) => setFormData(prev => ({ ...prev, cxoType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select CXO type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cxoTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="engagement">Engagement Type</Label>
                    <Select value={formData.engagement} onValueChange={(value) => setFormData(prev => ({ ...prev, engagement: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select engagement type" />
                      </SelectTrigger>
                      <SelectContent>
                        {engagementTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Specific Requirements</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {requirementOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.requirements.includes(option.id)}
                          onCheckedChange={(checked) => handleRequirementChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="text-sm font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your specific needs, challenges, and what you're looking to achieve with this CXO engagement..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Budget & Timeline
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Privacy Option */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.anonymous}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, anonymous: checked as boolean }))}
                  />
                  <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                    Post this requirement anonymously (company name will be hidden from CXOs)
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <Button type="submit" variant="professional" size="lg" className="w-full md:w-auto">
                  Submit Requirement
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  By submitting this form, you agree to our terms of service. We'll connect you with qualified CXOs within 48 hours.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessRequest;