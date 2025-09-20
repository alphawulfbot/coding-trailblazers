import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, Sun, Moon, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchModal from "./SearchModal";
import treasureLogo from "@/assets/treasure-logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/')}
        >
          <img 
            src={treasureLogo} 
            alt="Code Hunt Logo" 
            className="w-8 h-8 pixel-perfect animate-bounce-subtle"
          />
          <h1 className="font-heading text-lg text-primary">Code Hunt</h1>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-adventure"
            onClick={() => navigate('/learn')}
          >
            Learn
          </Button>
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-adventure"
            onClick={() => navigate('/tutorials')}
          >
            Tutorials
          </Button>
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-adventure"
            onClick={() => navigate('/practice')}
          >
            Practice
          </Button>
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-adventure"
            onClick={() => navigate('/build')}
          >
            Build
          </Button>
          <Button 
            variant="ghost" 
            className="text-foreground hover:text-primary transition-adventure"
            onClick={() => navigate('/community')}
          >
            Community
          </Button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-adventure"
              onClick={() => navigate('/auth')}
            >
              Sign Up
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;