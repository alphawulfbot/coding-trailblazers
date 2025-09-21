import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer.tsx';
import { 
  Play, 
  Clock, 
  Zap, 
  CheckCircle, 
  BookOpen, 
  Code, 
  Palette, 
  Database,
  Lightbulb,
  Target,
  Trophy,
  Star
} from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: any;
  difficulty: string;
  category: string;
  tags: string[];
  duration_minutes: number;
  xp_reward: number;
  order_index: number;
}

interface TutorialProgress {
  tutorial_id: string;
  is_completed: boolean;
  progress_data: any;
}

const categoryIcons: Record<string, any> = {
  'Web Development': Code,
  'Programming Basics': BookOpen,
  'Design': Palette,
  'Database': Database,
  'Problem Solving': Lightbulb,
  'Languages': BookOpen
};

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-secondary text-secondary-foreground',
  'Intermediate': 'bg-primary text-primary-foreground',
  'Advanced': 'bg-accent text-accent-foreground'
};

const Tutorials = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [progress, setProgress] = useState<Record<string, TutorialProgress>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);

  useEffect(() => {
    fetchTutorials();
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchTutorials = async () => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .eq('is_published', true)
        .contains('tags', ['type:language'])
        .order('order_index');

      if (error) throw error;
      setTutorials(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load tutorials',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_tutorial_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap = data.reduce((acc, item) => {
        acc[item.tutorial_id] = item;
        return acc;
      }, {} as Record<string, TutorialProgress>);

      setProgress(progressMap);
    } catch (error: any) {
      console.error('Error fetching progress:', error);
    }
  };

  const startTutorial = async (tutorialId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create or update progress
      const { error } = await supabase
        .from('user_tutorial_progress')
        .upsert({
          user_id: user.id,
          tutorial_id: tutorialId,
          progress_data: { started_at: new Date().toISOString() }
        });

      if (error) throw error;

      setExpandedTutorial(tutorialId);
      toast({
        title: "Tutorial Started!",
        description: "Your progress will be tracked automatically"
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to start tutorial",
        variant: "destructive"
      });
    }
  };

  const completeTutorial = async (tutorialId: string, xpReward: number) => {
    if (!user) return;

    try {
      // Update tutorial progress
      const { error: progressError } = await supabase
        .from('user_tutorial_progress')
        .upsert({
          user_id: user.id,
          tutorial_id: tutorialId,
          is_completed: true,
          progress_data: { completed_at: new Date().toISOString() }
        });

      if (progressError) throw progressError;

      // Update user XP by fetching current XP first and updating
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('xp')
        .eq('user_id', user.id)
        .single();
        
      const newXP = (currentProfile?.xp || 0) + xpReward;
      
      const { error: xpError } = await supabase
        .from('profiles')
        .update({ xp: newXP })
        .eq('user_id', user.id);

      if (xpError) throw xpError;

      // Update local state
      setProgress(prev => ({
        ...prev,
        [tutorialId]: { ...prev[tutorialId], is_completed: true }
      }));

      toast({
        title: "Tutorial Completed! 🎉",
        description: `You earned ${xpReward} XP!`
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to complete tutorial",
        variant: "destructive"
      });
    }
  };

  const categories = ['All', ...Array.from(new Set(tutorials.map(t => t.category)))];
  const filteredTutorials = selectedCategory === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  const completedCount = Object.values(progress).filter(p => p.is_completed).length;
  const completionRate = tutorials.length > 0 ? (completedCount / tutorials.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-heading text-primary mb-4">
              Programming Language Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master programming languages with interactive tutorials. Learn the fundamentals and build your coding foundation!
            </p>
            
            {user && (
              <Card className="max-w-md mx-auto bg-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedCount}/{tutorials.length} completed
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Category Filter */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="All">All Tutorials</TabsTrigger>
              <TabsTrigger value="Languages">Languages</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => {
              const isCompleted = progress[tutorial.id]?.is_completed;
              const isExpanded = expandedTutorial === tutorial.id;
              const CategoryIcon = categoryIcons[tutorial.category] || BookOpen;
              
              return (
                <Card 
                  key={tutorial.id} 
                  className="group relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-5 w-5 text-primary" />
                        <Badge variant="outline">{tutorial.category}</Badge>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tutorial.description}</p>
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

                    <Badge className={difficultyColors[tutorial.difficulty]}>
                      <Zap className="h-3 w-3 mr-1" />
                      {tutorial.difficulty}
                    </Badge>

                    <div className="space-y-2">
                      <Button 
                        onClick={() => startTutorial(tutorial.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                        disabled={isCompleted}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {isCompleted ? 'Completed' : 'Start Tutorial'}
                      </Button>
                      
                      {!isCompleted && isExpanded && (
                        <Button 
                          onClick={() => completeTutorial(tutorial.id, tutorial.xp_reward)}
                          variant="outline"
                          className="w-full"
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Complete Tutorial
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tutorials available</h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory === 'All' ? 'Check back soon for new tutorials!' : `No ${selectedCategory.toLowerCase()} tutorials available.`}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory('All')}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                View All Tutorials
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tutorials;