import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UserPlus, Search, MessageSquare, Handshake, Shield, Star, Clock, DollarSign, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const forCXOs = [
    {
      step: "1",
      title: "Register & Verify",
      description: "Create your professional profile with credentials, experience, and expertise areas.",
      icon: UserPlus,
    },
    {
      step: "2", 
      title: "Get Matched",
      description: "Our platform matches you with businesses seeking your specific skills and availability.",
      icon: Search,
    },
    {
      step: "3",
      title: "Connect & Engage",
      description: "Connect directly with businesses, discuss requirements, and negotiate terms.",
      icon: MessageSquare,
    },
    {
      step: "4",
      title: "Start Working",
      description: "Begin your fractional CXO engagement and make an immediate impact.",
      icon: Handshake,
    },
  ];

  const forBusinesses = [
    {
      step: "1",
      title: "Post Requirements",
      description: "Describe your executive needs, budget, timeline, and specific challenges.",
      icon: UserPlus,
    },
    {
      step: "2",
      title: "Review Matches",
      description: "We curate and present qualified CXOs who match your requirements.",
      icon: Search,
    },
    {
      step: "3",
      title: "Interview & Select",
      description: "Interview candidates and select the best fit for your organization.",
      icon: MessageSquare,
    },
    {
      step: "4",
      title: "Onboard & Scale",
      description: "Onboard your fractional CXO and start scaling your business.",
      icon: Handshake,
    },
  ];

  const benefits = [
    {
      title: "Vetted Professionals",
      description: "All CXOs are thoroughly screened and verified for experience and credentials.",
      icon: Shield,
    },
    {
      title: "Quality Matches",
      description: "Our intelligent matching system ensures the best fit for your specific needs.",
      icon: Star,
    },
    {
      title: "Fast Deployment",
      description: "Find and onboard executive talent in days, not months.",
      icon: Clock,
    },
    {
      title: "Cost Effective",
      description: "Access C-level expertise at a fraction of the cost of full-time executives.",
      icon: DollarSign,
    },
  ];

  const ProcessStep = ({ step, title, description, icon: Icon, isLast = false }: {
    step: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isLast?: boolean;
  }) => (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
            {step}
          </div>
        </div>
        <div className="ml-6 flex-1">
          <div className="flex items-center mb-2">
            <Icon className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/30 transform -translate-x-0.5" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            How CXO Connect
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Works</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We simplify the process of connecting businesses with fractional C-level executives. Here's how our platform creates perfect matches for both sides.
          </p>
        </div>
      </section>

      {/* For CXOs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                For <span className="text-primary">CXOs</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our exclusive network of fractional executives and expand your impact across multiple organizations.
              </p>
              <div className="space-y-8">
                {forCXOs.map((item, index) => (
                  <ProcessStep
                    key={item.step}
                    {...item}
                    isLast={index === forCXOs.length - 1}
                  />
                ))}
              </div>
              <div className="mt-8">
                <Button variant="professional" size="lg" asChild>
                  <Link to="/cxo-register">
                    Join as CXO <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:mt-16">
              <Card className="shadow-professional">
                <CardHeader>
                  <CardTitle className="text-2xl">Benefits for CXOs</CardTitle>
                  <CardDescription>Why top executives choose our platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Flexible Engagement</h4>
                        <p className="text-sm text-muted-foreground">Choose your preferred engagement model and schedule</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Premium Rates</h4>
                        <p className="text-sm text-muted-foreground">Command top-tier compensation for your expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Quality Clients</h4>
                        <p className="text-sm text-muted-foreground">Work with vetted, growth-oriented businesses</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Network Growth</h4>
                        <p className="text-sm text-muted-foreground">Expand your professional network and influence</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* For Businesses Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1">
              <Card className="shadow-professional">
                <CardHeader>
                  <CardTitle className="text-2xl">Benefits for Businesses</CardTitle>
                  <CardDescription>Why companies trust us for executive talent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Immediate Impact</h4>
                        <p className="text-sm text-muted-foreground">Experienced executives ready to contribute from day one</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Cost Efficiency</h4>
                        <p className="text-sm text-muted-foreground">Access C-level talent without full-time executive costs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Scalable Solution</h4>
                        <p className="text-sm text-muted-foreground">Adjust engagement level as your business grows</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div>
                        <h4 className="font-semibold text-foreground">Risk Mitigation</h4>
                        <p className="text-sm text-muted-foreground">Test executive fit before long-term commitments</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                For <span className="text-success">Businesses</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Find the right executive leadership to accelerate your business growth and transformation.
              </p>
              <div className="space-y-8">
                {forBusinesses.map((item, index) => (
                  <ProcessStep
                    key={item.step}
                    {...item}
                    isLast={index === forBusinesses.length - 1}
                  />
                ))}
              </div>
              <div className="mt-8">
                <Button variant="success" size="lg" asChild>
                  <Link to="/request">
                    Post Requirement <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Trust & Quality Assurance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We maintain the highest standards to ensure successful matches and professional relationships.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="text-center group hover:shadow-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our platform today and experience the power of fractional executive leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/cxo-register">
                Join as CXO <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/request">
                Find a CXO <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;