import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hammer, Rocket, Github, Users } from "lucide-react";

const Build = () => {
  const projects = [
    {
      id: 1,
      title: "Todo App",
      description: "Build a full-stack todo application with React and Supabase",
      tech: ["React", "Supabase", "TypeScript"],
      difficulty: "Beginner",
      duration: "2-3 hours",
      icon: "📝"
    },
    {
      id: 2,
      title: "Chat Application", 
      description: "Create a real-time chat app with authentication",
      tech: ["React", "WebSockets", "Node.js"],
      difficulty: "Intermediate",
      duration: "4-6 hours", 
      icon: "💬"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Build a complete online store with payment integration",
      tech: ["React", "Stripe", "Database"],
      difficulty: "Advanced",
      duration: "1-2 weeks",
      icon: "🛒"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-primary text-primary-foreground';
      case 'advanced': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-primary mb-4">Build Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create real-world applications and build your portfolio with guided projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-2xl mb-2">{project.icon}</div>
                  <Badge className={getDifficultyColor(project.difficulty)}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Hammer className="h-4 w-4" />
                    Project
                  </div>
                  <div className="flex items-center gap-1">
                    <Rocket className="h-4 w-4" />
                    {project.duration}
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Github className="h-5 w-5" />
                Portfolio Integration
              </CardTitle>
              <CardDescription>
                All your projects automatically sync to your GitHub and portfolio
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5" />
                Collaborative Building
              </CardTitle>
              <CardDescription>
                Work together with other learners on group projects
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mt-12 p-8 border rounded-lg bg-muted/20">
          <Hammer className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Project Builder Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're creating an incredible project-based learning experience with step-by-step 
            guidance, code reviews, and portfolio integration.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Build;