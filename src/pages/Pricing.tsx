import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Rocket, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      icon: Star,
      features: [
        "Access to basic courses",
        "Community forums",
        "Basic progress tracking",
        "Mobile app access",
        "Certificate of completion"
      ],
      limitations: [
        "Limited to 3 courses per month",
        "No advanced projects",
        "Standard support"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Unlock your full potential",
      icon: Zap,
      features: [
        "Unlimited course access",
        "Advanced project building",
        "Priority community support",
        "Personalized learning path",
        "Code review & feedback",
        "Industry certifications",
        "Offline course downloads",
        "1-on-1 mentorship sessions"
      ],
      limitations: [],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Team", 
      price: "$49",
      period: "per month",
      description: "Perfect for teams and organizations",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Bulk user management",
        "Advanced analytics",
        "Custom learning paths",
        "White-label options",
        "Dedicated support",
        "SSO integration",
        "API access"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-primary mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start learning for free, upgrade when you're ready to accelerate your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative border shadow-card hover:shadow-adventure transition-adventure ${
                plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <plan.icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure' 
                      : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  } transition-adventure`}
                  onClick={() => {
                    if (!user) {
                      navigate('/auth');
                    } else {
                      console.log(`Selected plan: ${plan.name}`);
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-xs text-muted-foreground">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading text-center text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. No questions asked.</p>
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Pro plan comes with a 14-day free trial. No credit card required to start.</p>
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and company purchase orders for team plans.</p>
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Do you offer student discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes! Students get 50% off Pro plans with a valid student email address.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;