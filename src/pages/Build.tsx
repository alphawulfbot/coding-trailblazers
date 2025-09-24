import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const navigate = useNavigate();
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

  // Project building tutorials - completely separate from main tutorials page
  const buildTutorials = [
    {
      id: 'build-1',
      title: 'Todo App with Authentication',
      description: 'Build a full-stack todo app with user authentication',
      category: 'Full Stack',
      difficulty: 'Beginner',
      duration_minutes: 45,
      xp_reward: 80,
      tags: ['react', 'supabase', 'authentication'],
      steps: [
        'Set up React project with Vite',
        'Configure Supabase authentication',
        'Create todo CRUD operations',
        'Style with Tailwind CSS',
        'Deploy to production'
      ]
    },
    {
      id: 'build-2', 
      title: 'Real-time Chat Application',
      description: 'Create a chat app with real-time messaging',
      category: 'Real-time',
      difficulty: 'Intermediate',
      duration_minutes: 60,
      xp_reward: 120,
      tags: ['react', 'websockets', 'realtime'],
      steps: [
        'Design chat interface',
        'Set up WebSocket connections',
        'Implement message broadcasting',
        'Add user presence indicators',
        'Create chat rooms'
      ]
    },
    {
      id: 'build-3',
      title: 'Portfolio Website Generator',
      description: 'Build a tool that generates portfolio websites',
      category: 'Tools',
      difficulty: 'Intermediate', 
      duration_minutes: 50,
      xp_reward: 100,
      tags: ['react', 'templates', 'generator'],
      steps: [
        'Create template system',
        'Build form for user data',
        'Generate dynamic layouts',
        'Export functionality',
        'Preview and customization'
      ]
    },
    {
      id: 'build-4',
      title: 'E-commerce Dashboard',
      description: 'Create an admin dashboard for online stores',
      category: 'Business',
      difficulty: 'Advanced',
      duration_minutes: 90,
      xp_reward: 150,
      tags: ['react', 'charts', 'dashboard'],
      steps: [
        'Design dashboard layout',
        'Integrate analytics charts',
        'Build product management',
        'Add order tracking',
        'Implement user roles'
      ]
    },
    {
      id: 'build-5',
      title: 'Weather App with Maps',
      description: 'Build a weather app with interactive maps',
      category: 'APIs',
      difficulty: 'Beginner',
      duration_minutes: 35,
      xp_reward: 70,
      tags: ['apis', 'maps', 'weather'],
      steps: [
        'Set up weather API',
        'Integrate map component',
        'Display weather data',
        'Add location search',
        'Implement forecasts'
      ]
    },
    {
      id: 'build-6',
      title: 'Social Media Dashboard',
      description: 'Create a dashboard to manage multiple social accounts',
      category: 'Social',
      difficulty: 'Advanced',
      duration_minutes: 75,
      xp_reward: 140,
      tags: ['apis', 'social', 'automation'],
      steps: [
        'Connect social APIs',
        'Build unified interface',
        'Schedule posts',
        'Analytics integration',
        'Multi-account management'
      ]
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
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-heading text-primary mb-2">Project Building Tutorials</h2>
                <p className="text-muted-foreground">
                  Step-by-step guides to build real-world applications from scratch
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buildTutorials.map((tutorial) => {
                  const categoryIcons = {
                    'Full Stack': <Code className="h-6 w-6" />,
                    'Real-time': <Database className="h-6 w-6" />,
                    'Tools': <Palette className="h-6 w-6" />,
                    'Business': <Users className="h-6 w-6" />,
                    'APIs': <Rocket className="h-6 w-6" />,
                    'Social': <Github className="h-6 w-6" />
                  };

                  return (
                    <Card key={tutorial.id} className="border shadow-card hover:shadow-adventure transition-adventure">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          {categoryIcons[tutorial.category] || <Code className="h-6 w-6" />}
                          <Badge variant="outline">{tutorial.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {tutorial.duration_minutes} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {tutorial.xp_reward} XP
                          </div>
                        </div>

                        <Badge className={getDifficultyColor(tutorial.difficulty)}>
                          {tutorial.difficulty}
                        </Badge>

                        {/* Steps Preview */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">What you'll build:</p>
                          <div className="space-y-1">
                            {tutorial.steps.slice(0, 3).map((step, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CheckCircle className="h-3 w-3" />
                                <span>{step}</span>
                              </div>
                            ))}
                            {tutorial.steps.length > 3 && (
                              <div className="text-xs text-muted-foreground pl-5">
                                +{tutorial.steps.length - 3} more steps...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {tutorial.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => {
                            // For now, show a toast indicating this is a demo 
                            // In a real app, this would start the tutorial
                            alert(`Starting "${tutorial.title}" tutorial - This is a demo!`);
                          }}
                        >
                          <Hammer className="h-4 w-4 mr-2" />
                          Start Building
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-8">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Portfolio Header */}
              <div className="text-center">
                <h2 className="text-3xl font-heading text-primary mb-4">Developer Portfolio</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Showcase your coding journey and achievements to potential employers and clients
                </p>
              </div>

              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary">1,250</div>
                    <div className="text-sm text-muted-foreground">Lines of Code</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Code Quality Score</div>
                  </CardContent>
                </Card>
              </div>

              {/* Integration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Github className="h-5 w-5" />
                      GitHub Portfolio
                    </CardTitle>
                    <CardDescription>
                      Sync your projects to GitHub and showcase your commit history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Repository Status</span>
                        <span className="text-green-600">✓ Connected</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Public Repos</span>
                        <span>12</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      View GitHub Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Users className="h-5 w-5" />
                      Team Projects
                    </CardTitle>
                    <CardDescription>
                      Collaborate on group projects and build team experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Active Teams</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Completed Collabs</span>
                        <span>5</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Find Team Members
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Rocket className="h-5 w-5" />
                      Live Deployments
                    </CardTitle>
                    <CardDescription>
                      Deploy your projects and share live demos with the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Live Projects</span>
                        <span>8</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Uptime</span>
                        <span className="text-green-600">99.9%</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy New Project
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Projects */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Featured Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "E-commerce Dashboard",
                      description: "Full-stack React app with real-time analytics",
                      tech: ["React", "Node.js", "MongoDB"],
                      image: "🛒",
                      status: "Live",
                      views: "1.2k"
                    },
                    {
                      title: "Chat Application",
                      description: "Real-time messaging with WebSocket integration",
                      tech: ["React", "Socket.io", "Express"],
                      image: "💬",
                      status: "Live",
                      views: "856"
                    }
                  ].map((project, index) => (
                    <Card key={index} className="border shadow-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{project.image}</div>
                            <div>
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                              <CardDescription>{project.description}</CardDescription>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{project.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{project.views} views</span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              View Code
                            </Button>
                            <Button size="sm">
                              Live Demo
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-muted/50 rounded-lg p-8">
                <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Ready to Build Your Portfolio?</h3>
                <p className="text-muted-foreground mb-4">
                  Start building projects and let your code speak for itself
                </p>
                <Button size="lg" className="shadow-adventure">
                  <Hammer className="h-4 w-4 mr-2" />
                  Start Building
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Build;