import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LanguageTutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  xp_reward: number;
  tags: string[];
  content: {
    sections: TutorialSection[];
  };
  isCompleted?: boolean;
  progress?: number;
}

interface TutorialSection {
  type: 'theory' | 'code' | 'exercise';
  title: string;
  content: string;
  code?: string;
  exercise?: string;
  solution?: string;
  duration: number;
}

interface UserProgress {
  tutorial_id: string;
  is_completed: boolean;
  progress_data: {
    completed_sections: number[];
    current_section: number;
  };
}

const Tutorials = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [tutorials, setTutorials] = useState<LanguageTutorial[]>([]);
  const [userProgress, setUserProgress] = useState<Map<string, UserProgress>>(new Map());
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  // Load tutorials from Supabase
  useEffect(() => {
    const loadTutorials = async () => {
      try {
        const { data: tutorialsData, error: tutorialsError } = await supabase
          .from('tutorials')
          .select('*')
          .eq('category', 'language')
          .eq('is_published', true)
          .order('order_index');

        if (tutorialsError) {
          console.error('Error loading tutorials:', tutorialsError);
          return;
        }

        setTutorials((tutorialsData || []).map(tutorial => ({
          ...tutorial,
          content: tutorial.content as unknown as { sections: TutorialSection[] }
        })));

        // Load user progress if authenticated
        if (user) {
          const { data: progressData } = await supabase
            .from('user_tutorial_progress')
            .select('*')
            .eq('user_id', user.id);

          if (progressData) {
            const progressMap = new Map();
            progressData.forEach(progress => {
              progressMap.set(progress.tutorial_id, progress);
            });
            setUserProgress(progressMap);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTutorials();
  }, [user]);

  const languages = ['All', ...Array.from(new Set(tutorials.map(t => {
    const mainTag = t.tags?.[0] || 'Programming';
    return mainTag;
  })))];

  const filteredTutorials = selectedLanguage === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.tags?.includes(selectedLanguage));

  const completedCount = Array.from(userProgress.values()).filter(p => p.is_completed).length;
  const completionRate = tutorials.length > 0 ? (completedCount / tutorials.length) * 100 : 0;

  const startTutorial = async (tutorialId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return;
    }

    setExpandedTutorial(expandedTutorial === tutorialId ? null : tutorialId);
    
    // Initialize progress if not exists
    if (!userProgress.has(tutorialId)) {
      const { error } = await supabase
        .from('user_tutorial_progress')
        .insert({
          user_id: user.id,
          tutorial_id: tutorialId,
          progress_data: { completed_sections: [], current_section: 0 }
        });

      if (!error) {
        setUserProgress(prev => new Map(prev.set(tutorialId, {
          tutorial_id: tutorialId,
          is_completed: false,
          progress_data: { completed_sections: [], current_section: 0 }
        })));
      }
    }

    toast({
      title: "Tutorial Started!",
      description: "Work through the sections to complete this tutorial"
    });
  };

  const completeSection = async (tutorialId: string, sectionIndex: number) => {
    if (!user) return;

    const progress = userProgress.get(tutorialId);
    if (!progress) return;

    const completedSections = [...progress.progress_data.completed_sections];
    if (!completedSections.includes(sectionIndex)) {
      completedSections.push(sectionIndex);
    }

    const tutorial = tutorials.find(t => t.id === tutorialId);
    const totalSections = tutorial?.content?.sections?.length || 0;
    const isCompleted = completedSections.length === totalSections;

    const updatedProgress = {
      ...progress,
      progress_data: {
        completed_sections: completedSections,
        current_section: Math.min(sectionIndex + 1, totalSections - 1)
      },
      is_completed: isCompleted
    };

    const { error } = await supabase
      .from('user_tutorial_progress')
      .update({
        progress_data: updatedProgress.progress_data,
        is_completed: isCompleted,
        completed_at: isCompleted ? new Date().toISOString() : null
      })
      .eq('user_id', user.id)
      .eq('tutorial_id', tutorialId);

    if (!error) {
      setUserProgress(prev => new Map(prev.set(tutorialId, updatedProgress)));
      
      if (isCompleted && tutorial) {
        // Award XP
        const { error: xpError } = await supabase
          .from('profiles')
          .update({ 
            xp: (user as any).xp + tutorial.xp_reward 
          })
          .eq('user_id', user.id);

        toast({
          title: "Tutorial Completed! 🎉",
          description: `You earned ${tutorial.xp_reward} XP!`
        });
      } else {
        toast({
          title: "Section Completed!",
          description: "Great progress! Keep going."
        });
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-primary text-primary-foreground';
      case 'advanced': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'javascript': return '🟨';
      case 'python': return '🐍';
      case 'react': return '⚛️';
      case 'css': return '🎨';
      case 'html': return '🌐';
      case 'programming': return '💻';
      case 'variables': return '📦';
      case 'functions': return '⚙️';
      case 'components': return '🧩';
      case 'styling': return '🎨';
      case 'data types': return '📊';
      default: return '📚';
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'exercise': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const calculateProgress = (tutorialId: string, tutorial: LanguageTutorial) => {
    const progress = userProgress.get(tutorialId);
    if (!progress) return 0;
    
    const totalSections = tutorial.content?.sections?.length || 0;
    const completedSections = progress.progress_data.completed_sections.length;
    return totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading tutorials...</p>
          </div>
        </main>
        <Footer />
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
              Master programming languages step by step with interactive tutorials and hands-on exercises!
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

          {/* Language Filter */}
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              {languages.map((language) => (
                <TabsTrigger key={language} value={language} className="text-xs">
                  {language === 'All' ? 'All' : `${getLanguageIcon(language)} ${language}`}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => {
              const progress = userProgress.get(tutorial.id);
              const isCompleted = progress?.is_completed || false;
              const isExpanded = expandedTutorial === tutorial.id;
              const progressPercent = calculateProgress(tutorial.id, tutorial);
              const mainLanguage = tutorial.tags?.[0] || 'Programming';
              
              return (
                <Card 
                  key={tutorial.id} 
                  className="group relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getLanguageIcon(mainLanguage)}</span>
                        <Badge variant="outline">{mainLanguage}</Badge>
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

                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      <Zap className="h-3 w-3 mr-1" />
                      {tutorial.difficulty}
                    </Badge>

                    {/* Progress Bar */}
                    {user && progressPercent > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                      </div>
                    )}

                    {/* Tutorial Sections */}
                    {isExpanded && tutorial.content?.sections && (
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">Tutorial Sections:</h4>
                          <span className="text-xs text-muted-foreground">
                            {progress?.progress_data.completed_sections.length || 0}/{tutorial.content.sections.length} completed
                          </span>
                        </div>
                        {tutorial.content.sections.map((section, index) => {
                          const isCompleted = progress?.progress_data.completed_sections.includes(index) || false;
                          const isCurrent = progress?.progress_data.current_section === index;
                          
                          return (
                            <div 
                              key={index} 
                              className={`p-3 rounded-lg border transition-colors ${
                                isCompleted ? 'bg-green-50 border-green-200' : 
                                isCurrent ? 'bg-primary/10 border-primary/20' : 
                                'bg-muted/50 border-muted'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getSectionIcon(section.type)}
                                  <span className="font-medium text-sm">{section.title}</span>
                                  {isCompleted && <CheckCircle className="h-3 w-3 text-green-500" />}
                                </div>
                                <span className="text-xs text-muted-foreground">{section.duration}min</span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{section.content}</p>
                              
                              {section.code && (
                                <pre className="mt-2 p-2 bg-background rounded text-xs overflow-x-auto border">
                                  <code>{section.code.slice(0, 150)}...</code>
                                </pre>
                              )}
                              
                              {section.exercise && (
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs border border-blue-200">
                                  <strong>Exercise:</strong> {section.exercise}
                                </div>
                              )}

                              {user && !isCompleted && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-2"
                                  onClick={() => completeSection(tutorial.id, index)}
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button 
                        onClick={() => startTutorial(tutorial.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                        disabled={isCompleted}
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                        {isCompleted ? 'Completed ✓' : isExpanded ? 'Collapse' : 'Start Tutorial'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

              {filteredTutorials.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No tutorials available</h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedLanguage === 'All' ? 'Check back soon for new tutorials!' : `No ${selectedLanguage} tutorials available.`}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedLanguage('All')}
                    className="border border-primary/30 text-primary hover:bg-primary/10"
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