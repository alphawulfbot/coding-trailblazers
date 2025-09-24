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
  Palette,
  Plus,
  TrendingUp,
  Award,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio, PortfolioProject } from "@/hooks/usePortfolio";
import { PortfolioProjectCard } from "@/components/portfolio/PortfolioProjectCard";
import { ProjectForm } from "@/components/portfolio/ProjectForm";
import { Skeleton } from "@/components/ui/skeleton";

const Build = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { projects, stats, loading, createProject } = usePortfolio();
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | undefined>();
  const [publicProjects, setPublicProjects] = useState<PortfolioProject[]>([]);
  const [loadingPublic, setLoadingPublic] = useState(false);
  

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

  // Load featured public projects for inspiration
  useEffect(() => {
    const loadPublicProjects = async () => {
      setLoadingPublic(true);
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('is_public', true)
          .eq('featured', true)
          .order('views_count', { ascending: false })
          .limit(6);

        if (error) throw error;
        setPublicProjects(data || []);
      } catch (error) {
        console.error('Error loading public projects:', error);
      } finally {
        setLoadingPublic(false);
      }
    };

    loadPublicProjects();
  }, []);

  const handleCreateProject = () => {
    setEditingProject(undefined);
    setShowProjectForm(true);
  };

  const handleEditProject = (project: PortfolioProject) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleProjectFormClose = () => {
    setShowProjectForm(false);
    setEditingProject(undefined);
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

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="mt-8">
            <div className="text-center py-16">
              <Rocket className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Project Builder Coming Soon</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Interactive project builder with step-by-step guidance is currently in development.
              </p>
              <Button onClick={() => handleCreateProject()} size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add to Portfolio Instead
              </Button>
            </div>
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

              {loading ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Card key={i} className="text-center">
                        <CardContent className="p-4">
                          <Skeleton className="h-8 w-16 mx-auto mb-2" />
                          <Skeleton className="h-4 w-24 mx-auto" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Portfolio Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="text-center border shadow-card">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary">
                          {stats?.total_projects || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Projects Created</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center border shadow-card">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary">
                          {stats?.total_lines_of_code?.toLocaleString() || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Lines of Code</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center border shadow-card">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary">
                          {stats?.technologies_mastered?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Technologies Mastered</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center border shadow-card">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary">
                          {stats?.code_quality_score?.toFixed(1) || '0.0'}%
                        </div>
                        <div className="text-sm text-muted-foreground">Code Quality Score</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-center mb-8">
                    <Button 
                      onClick={handleCreateProject}
                      className="bg-primary hover:bg-primary/90 shadow-adventure"
                      size="lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Project
                    </Button>
                  </div>

                  {/* User's Projects */}
                  {user && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Your Projects</h3>
                        <div className="text-sm text-muted-foreground">
                          {projects.length} project{projects.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      {projects.length === 0 ? (
                        <Card className="border-dashed">
                          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <Rocket className="h-16 w-16 text-muted-foreground mb-4" />
                            <h4 className="text-lg font-semibold mb-2">No projects yet</h4>
                            <p className="text-muted-foreground mb-4">
                              Create your first project to get started with your portfolio
                            </p>
                            <Button onClick={handleCreateProject}>
                              <Plus className="h-4 w-4 mr-2" />
                              Create Your First Project
                            </Button>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {projects.map((project) => (
                            <PortfolioProjectCard
                              key={project.id}
                              project={project}
                              isOwner={true}
                              onEdit={handleEditProject}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

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
                            <span className={stats?.github_connected ? "text-green-600" : "text-muted-foreground"}>
                              {stats?.github_connected ? "✓ Connected" : "Not Connected"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Public Repos</span>
                            <span>{stats?.github_repos_count || 0}</span>
                          </div>
                        </div>
                        <Button className="w-full" variant="outline">
                          <Github className="h-4 w-4 mr-2" />
                          {stats?.github_connected ? "View GitHub Profile" : "Connect GitHub"}
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
                            <span>Team Projects</span>
                            <span>{stats?.team_projects_count || 0}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Completed Collabs</span>
                            <span>{Math.floor((stats?.team_projects_count || 0) * 0.7)}</span>
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
                            <span>{stats?.live_deployments_count || 0}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Uptime</span>
                            <span className="text-green-600">{stats?.uptime_percentage || 99.9}%</span>
                          </div>
                        </div>
                        <Button className="w-full" variant="outline">
                          <Rocket className="h-4 w-4 mr-2" />
                          Deploy New Project
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Featured Projects from Community */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Featured Community Projects</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </Badge>
                    </div>
                    
                    {loadingPublic ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                          <Card key={i} className="border shadow-card">
                            <CardHeader>
                              <Skeleton className="h-6 w-3/4" />
                              <Skeleton className="h-4 w-full" />
                            </CardHeader>
                            <CardContent>
                              <Skeleton className="h-20 w-full" />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : publicProjects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {publicProjects.map((project) => (
                          <PortfolioProjectCard
                            key={project.id}
                            project={project}
                            isOwner={false}
                            showStats={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                          <Award className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            No featured projects available yet. Be the first to showcase your work!
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Call to Action */}
                  <div className="text-center bg-muted/50 rounded-lg p-8">
                    <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Ready to Build Your Portfolio?</h3>
                    <p className="text-muted-foreground mb-4">
                      Start building projects and let your code speak for itself
                    </p>
                    <Button size="lg" className="shadow-adventure" onClick={handleCreateProject}>
                      <Hammer className="h-4 w-4 mr-2" />
                      Start Building
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Project Form Modal */}
            <ProjectForm
              project={editingProject}
              open={showProjectForm}
              onClose={handleProjectFormClose}
              onSuccess={() => {
                // Portfolio hook automatically updates via real-time subscription
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Build;