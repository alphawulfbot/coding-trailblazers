import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroLandscape from "@/assets/hero-landscape.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroLandscape}
          alt="Adventure Landscape"
          className="w-full h-full object-cover pixel-perfect"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
            ⭐ START YOUR
          </Badge>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-glow">
              Coding
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-glow">
              Adventure
            </span>
          </h1>
        </div>

        <p className="text-lg md:text-xl text-foreground/90 font-medium mb-8 max-w-2xl mx-auto drop-shadow-md">
          Learn coding the fun way—earn XP, unlock worlds, and collect badges at your pace!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/auth?redirect=/learn')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-adventure animate-glow px-8 py-6 text-lg font-semibold"
            aria-label="Start your coding adventure - Sign up or log in"
          >
            🚀 Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/courses')}
            className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            aria-label="View all available courses"
          >
            🎮 View Adventures
          </Button>
        </div>

        {/* Supported By */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">SUPPORTED BY</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-muted-foreground font-semibold">GitHub</div>
            <div className="text-muted-foreground font-semibold">DevCommunity</div>
            <div className="text-muted-foreground font-semibold">CodeAcademy</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;