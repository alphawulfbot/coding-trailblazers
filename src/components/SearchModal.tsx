import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Code, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'lesson' | 'page';
  path: string;
  icon: React.ElementType;
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const allSearchableItems: SearchResult[] = [
    {
      id: "learn",
      title: "Learn",
      description: "Browse all courses and start learning",
      type: "page",
      path: "/learn",
      icon: BookOpen
    },
    {
      id: "practice",
      title: "Practice",
      description: "Interactive coding challenges",
      type: "page", 
      path: "/practice",
      icon: Code
    },
    {
      id: "build",
      title: "Build",
      description: "Create real-world projects",
      type: "page",
      path: "/build", 
      icon: Code
    },
    {
      id: "community",
      title: "Community",
      description: "Connect with other learners",
      type: "page",
      path: "/community",
      icon: Users
    },
    {
      id: "pricing",
      title: "Pricing",
      description: "View subscription plans",
      type: "page",
      path: "/pricing",
      icon: DollarSign
    }
  ];

  useEffect(() => {
    if (query.trim() === "") {
      setResults(allSearchableItems.slice(0, 5));
    } else {
      const filtered = allSearchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8));
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onOpenChange(false);
    setQuery("");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-primary text-primary-foreground';
      case 'lesson': return 'bg-secondary text-secondary-foreground'; 
      case 'page': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Search className="h-5 w-5" />
            Search Code Hunt
          </DialogTitle>
          <DialogDescription>
            Find courses, lessons, and pages quickly
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6">
          <Input
            placeholder="Search for courses, lessons, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto px-6 pb-6">
          <div className="space-y-2">
            {results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found</p>
              </div>
            ) : (
              results.map((result) => (
                <div
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-adventure group"
                >
                  <result.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-adventure">
                        {result.title}
                      </h4>
                      <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                        {result.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;