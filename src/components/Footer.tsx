import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageCircle, Youtube } from "lucide-react";
import treasureLogo from "@/assets/treasure-logo.png";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 backdrop-blur">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={treasureLogo} 
                alt="Code Hunt Logo" 
                className="w-8 h-8 pixel-perfect"
              />
              <h3 className="font-heading text-lg text-primary">Code Hunt</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              The most fun and beginner-friendly way to learn programming. Start your coding adventure today!
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Learn</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Python Adventure
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Web Development
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Data Science
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Mobile Development
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Game Development
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Community</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Discord Server
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                GitHub Projects
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Student Showcase
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Code Reviews
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Mentorship
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Privacy Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Terms of Service
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-adventure">
                Pricing
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Code Hunt. All rights reserved. Made with ❤️ for aspiring developers.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🌟 Join 50,000+ adventurers</span>
            <span>•</span>
            <span>🏆 1M+ XP earned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;