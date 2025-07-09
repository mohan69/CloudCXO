import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Briefcase, CheckCircle, Star, TrendingUp, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-business.jpg";

const Home = () => {
  const stats = [
    { label: "Active CXOs", value: "500+", icon: Users },
    { label: "Successful Matches", value: "1,200+", icon: CheckCircle },
    { label: "Client Satisfaction", value: "98%", icon: Star },
    { label: "Average ROI", value: "3.2x", icon: TrendingUp },
  ];

  const cxoRoles = [
    { role: "Chief Financial Officer", abbr: "CFO", description: "Financial strategy and planning" },
    { role: "Chief Marketing Officer", abbr: "CMO", description: "Marketing and brand strategy" },
    { role: "Chief Technology Officer", abbr: "CTO", description: "Technology leadership" },
    { role: "Chief Operating Officer", abbr: "COO", description: "Operations optimization" },
    { role: "Chief Information Officer", abbr: "CIO", description: "Information systems strategy" },
    { role: "Chief Data Officer", abbr: "CDO", description: "Data strategy and analytics" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Connect with
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Elite CXOs</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Access fractional C-level executives who bring enterprise-grade expertise to scale your business. From CFOs to CTOs, find the right executive talent for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="professional" size="lg" asChild>
                  <Link to="/request">
                    Find a CXO <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/cxo-register">
                    Join as Executive
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Professional business meeting"
                className="rounded-2xl shadow-hover w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CXO Roles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Executive Expertise Across All Functions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our network includes seasoned executives across all C-level functions, ready to provide strategic leadership for your business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cxoRoles.map((role, index) => (
              <Card key={role.abbr} className="group hover:shadow-hover transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">{role.abbr}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-lg">{role.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{role.description}</CardDescription>
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
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have accelerated their growth with our fractional CXO network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/request">
                Post Your Requirement <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20" asChild>
              <Link to="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;