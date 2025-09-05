import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Hammer, 
  Rocket, 
  Github, 
  Users, 
  Play, 
  CheckCircle, 
  Clock, 
  Star,
  Code,
  Database,
  Palette
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Build = () => {
  const { user } = useAuth();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const projects = [
    {
      id: 1,
      title: "Todo App",
      description: "Build a full-stack todo application with React and Supabase",
      tech: ["React", "Supabase", "TypeScript"],
      difficulty: "Beginner",
      duration: "2-3 hours",
      xp: 200,
      icon: "📝",
      status: "available",
      steps: [
        "Set up project structure",
        "Create todo components",
        "Implement CRUD operations", 
        "Add user authentication",
        "Deploy to production"
      ],
      completedSteps: 0
    },
    {
      id: 2,
      title: "Chat Application", 
      description: "Create a real-time chat app with authentication",
      tech: ["React", "WebSockets", "Node.js"],
      difficulty: "Intermediate",
      duration: "4-6 hours",
      xp: 350, 
      icon: "💬",
      status: "available",
      steps: [
        "Design chat interface",
        "Set up WebSocket connection",
        "Implement message system",
        "Add user presence",
        "Create chat rooms"
      ],
      completedSteps: 0
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Build a complete online store with payment integration",
      tech: ["React", "Stripe", "Database"],
      difficulty: "Advanced",
      duration: "1-2 weeks",
      xp: 500,
      icon: "🛒",
      status: "available",
      steps: [
        "Product catalog setup",
        "Shopping cart functionality",
        "Payment integration",
        "Order management",
        "Admin dashboard"
      ],
      completedSteps: 0
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React components and state management",
      type: "Frontend",
      duration: "1 hour",
      icon: <Code className="h-6 w-6" />
    },
    {
      id: 2, 
      title: "Database Design",
      description: "Master relational database design and SQL queries",
      type: "Backend",
      duration: "45 mins",
      icon: <Database className="h-6 w-6" />
    },
    {
      id: 3,
      title: "UI/UX Principles", 
      description: "Design beautiful and user-friendly interfaces",
      type: "Design",
      duration: "30 mins",
      icon: <Palette className="h-6 w-6" />
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

  const startProject = (projectId: number) => {
    setActiveProject(projectId);
  };

  const currentProject = projects.find(p => p.id === activeProject);

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

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-8">
            {!activeProject ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure"
                  >
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
                          <Clock className="h-4 w-4" />
                          {project.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.xp} XP
                        </div>
                      </div>

                      <Progress value={(project.completedSteps / project.steps.length) * 100} />
                      <p className="text-xs text-muted-foreground">
                        {project.completedSteps}/{project.steps.length} steps completed
                      </p>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                        onClick={() => startProject(project.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {project.completedSteps > 0 ? 'Continue Project' : 'Start Project'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border shadow-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{currentProject?.icon}</span>
                          {currentProject?.title}
                        </CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setActiveProject(null)}
                        >
                          Back to Projects
                        </Button>
                      </div>
                      <CardDescription>{currentProject?.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Project Steps</h3>
                          <Badge className={getDifficultyColor(currentProject?.difficulty || '')}>
                            {currentProject?.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          {currentProject?.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                              <div className="flex-shrink-0">
                                {index < (currentProject?.completedSteps || 0) ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${index < (currentProject?.completedSteps || 0) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                  {step}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Step {index + 1}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="border shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Completion</span>
                          <span>{Math.round(((currentProject?.completedSteps || 0) / (currentProject?.steps.length || 1)) * 100)}%</span>
                        </div>
                        <Progress value={((currentProject?.completedSteps || 0) / (currentProject?.steps.length || 1)) * 100} />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>XP Reward:</span>
                          <span className="font-semibold">{currentProject?.xp} XP</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{currentProject?.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Steps:</span>
                          <span>{currentProject?.completedSteps}/{currentProject?.steps.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Technologies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {currentProject?.tech.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tutorials" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="border shadow-card hover:shadow-adventure transition-adventure">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {tutorial.icon}
                      <Badge variant="outline">{tutorial.type}</Badge>
                    </div>
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tutorial.duration}
                      </span>
                    </div>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Start Tutorial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-8">
            <div className="text-center py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Github className="h-5 w-5" />
                      GitHub Integration
                    </CardTitle>
                    <CardDescription>
                      All your projects automatically sync to your GitHub repository
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Connect GitHub
                    </Button>
                  </CardContent>
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
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Find Team Members
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="max-w-md mx-auto">
                <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Build Your Portfolio</h3>
                <p className="text-muted-foreground">
                  Complete projects to showcase your skills and build an impressive developer portfolio.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Build;