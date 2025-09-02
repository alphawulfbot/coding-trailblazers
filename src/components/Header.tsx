import { Button } from "@/components/ui/button";
import { Menu, Search, Sun } from "lucide-react";
import treasureLogo from "@/assets/treasure-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={treasureLogo} 
            alt="Code Hunt Logo" 
            className="w-8 h-8 pixel-perfect animate-bounce-subtle"
          />
          <h1 className="font-heading text-lg text-primary">Code Hunt</h1>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Button variant="ghost" className="text-foreground hover:text-primary transition-adventure">
            Learn
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary transition-adventure">
            Practice
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary transition-adventure">
            Build
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary transition-adventure">
            Community
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary transition-adventure">
            Pricing
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="default" className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-adventure">
            Sign Up
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;