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
  'Problem Solving': Lightbulb
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
        .order('order_index');

      if (error) throw error;

      // If no tutorials exist, create sample data
      if (!data || data.length === 0) {
        await createSampleTutorials();
        return;
      }

      setTutorials(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load tutorials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createSampleTutorials = async () => {
    const sampleTutorials = [
      {
        title: "HTML Basics: Your First Webpage",
        description: "Learn the fundamentals of HTML by building your first webpage from scratch.",
        content: {
          sections: [
            {
              type: "theory",
              title: "What is HTML?",
              content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages."
            },
            {
              type: "practice",
              title: "Create a Basic HTML Structure",
              code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>`,
              task: "Copy this code and save it as 'index.html'"
            },
            {
              type: "quiz",
              question: "What does HTML stand for?",
              options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
              correct: 0
            }
          ]
        },
        difficulty: "Beginner",
        category: "Web Development",
        tags: ["HTML", "basics", "beginner"],
        duration_minutes: 20,
        xp_reward: 25,
        order_index: 1
      },
      {
        title: "CSS Styling: Make It Beautiful",
        description: "Add colors, fonts, and layouts to your HTML using CSS.",
        content: {
          sections: [
            {
              type: "theory",
              title: "Introduction to CSS",
              content: "CSS (Cascading Style Sheets) is used to style and layout web pages."
            },
            {
              type: "practice",
              title: "Add Some Style",
              code: `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
}

h1 {
    color: #2c3e50;
    text-align: center;
}`,
              task: "Add this CSS to style your HTML page"
            }
          ]
        },
        difficulty: "Beginner",
        category: "Web Development", 
        tags: ["CSS", "styling", "design"],
        duration_minutes: 25,
        xp_reward: 30,
        order_index: 2
      },
      {
        title: "JavaScript Variables & Functions",
        description: "Learn to store data and create reusable code with JavaScript variables and functions.",
        content: {
          sections: [
            {
              type: "theory",
              title: "Variables in JavaScript",
              content: "Variables are containers for storing data values. In JavaScript, you can create variables using let, const, or var."
            },
            {
              type: "practice",
              title: "Create Your First Variables",
              code: `let playerName = "CodeHunter";
const maxLevel = 100;
let currentXP = 0;

function gainXP(points) {
    currentXP += points;
    console.log(\`\${playerName} gained \${points} XP!\`);
}

gainXP(25);`,
              task: "Try running this code in your browser console"
            }
          ]
        },
        difficulty: "Beginner",
        category: "Programming Basics",
        tags: ["JavaScript", "variables", "functions"],
        duration_minutes: 30,
        xp_reward: 35,
        order_index: 3
      },
      {
        title: "Responsive Design Fundamentals",
        description: "Make your websites look great on all devices with responsive design techniques.",
        content: {
          sections: [
            {
              type: "theory",
              title: "What is Responsive Design?",
              content: "Responsive design ensures your website works well on all screen sizes and devices."
            },
            {
              type: "practice",
              title: "Mobile-First CSS",
              code: `/* Mobile styles first */
.container {
    padding: 1rem;
    width: 100%;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        padding: 2rem;
    }
}`,
              task: "Apply these responsive styles to your webpage"
            }
          ]
        },
        difficulty: "Intermediate",
        category: "Web Development",
        tags: ["CSS", "responsive", "mobile"],
        duration_minutes: 40,
        xp_reward: 50,
        order_index: 4
      },
      {
        title: "Problem Solving with Algorithms",
        description: "Learn to think like a programmer by solving problems step by step.",
        content: {
          sections: [
            {
              type: "theory",
              title: "What is an Algorithm?",
              content: "An algorithm is a step-by-step procedure for solving a problem or completing a task."
            },
            {
              type: "practice",
              title: "FizzBuzz Challenge",
              code: `// Print numbers 1-15, but:
// - If divisible by 3: print "Fizz"
// - If divisible by 5: print "Buzz"  
// - If divisible by both: print "FizzBuzz"

for (let i = 1; i <= 15; i++) {
    if (i % 15 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}`,
              task: "Run this algorithm and understand how it works"
            }
          ]
        },
        difficulty: "Intermediate",
        category: "Problem Solving",
        tags: ["algorithms", "logic", "programming"],
        duration_minutes: 35,
        xp_reward: 45,
        order_index: 5
      }
    ];

    try {
      const { data: insertedTutorials, error } = await supabase
        .from('tutorials')
        .insert(sampleTutorials)
        .select();
      
      if (error) {
        console.error('Error inserting tutorials:', error);
        toast({
          title: "Error",
          description: "Failed to create sample tutorials",
          variant: "destructive"
        });
        return;
      }

      if (insertedTutorials && insertedTutorials.length > 0) {
        setTutorials(insertedTutorials);
        toast({
          title: "Success!",
          description: "Sample tutorials created successfully"
        });
      }
    } catch (error: any) {
      console.error('Error creating sample tutorials:', error);
      toast({
        title: "Error",
        description: "Failed to create sample tutorials",
        variant: "destructive"
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
              Interactive Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn by doing with our interactive coding tutorials. Complete challenges, earn XP, and level up your skills!
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
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tutorials Grid */}
            <TabsContent value={selectedCategory} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map((tutorial) => {
                  const IconComponent = categoryIcons[tutorial.category] || BookOpen;
                  const isCompleted = progress[tutorial.id]?.is_completed;
                  const isExpanded = expandedTutorial === tutorial.id;

                  return (
                    <Card 
                      key={tutorial.id} 
                      className={`transition-adventure hover:shadow-adventure border-border/50 ${
                        isCompleted ? 'bg-secondary/5 border-secondary/20' : ''
                      } ${isExpanded ? 'col-span-full' : ''}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <IconComponent className="h-8 w-8 text-primary mb-2" />
                          {isCompleted && (
                            <CheckCircle className="h-6 w-6 text-secondary" />
                          )}
                        </div>
                        
                        <CardTitle className="text-lg font-heading leading-tight">
                          {tutorial.title}
                        </CardTitle>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={difficultyColors[tutorial.difficulty] || 'bg-muted'}>
                            {tutorial.difficulty}
                          </Badge>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {tutorial.duration_minutes}m
                          </div>
                          
                          <div className="flex items-center text-sm text-secondary">
                            <Zap className="h-4 w-4 mr-1" />
                            {tutorial.xp_reward} XP
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tutorial.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {tutorial.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Tutorial Content (when expanded) */}
                        {isExpanded && tutorial.content?.sections && (
                          <div className="mt-6 space-y-6 border-t border-border pt-6">
                            {tutorial.content.sections.map((section: any, index: number) => (
                              <div key={index} className="space-y-3">
                                <h4 className="font-heading text-primary">{section.title}</h4>
                                
                                {section.type === 'theory' && (
                                  <div className="bg-muted/50 rounded-lg p-4">
                                    <p className="text-sm leading-relaxed">{section.content}</p>
                                  </div>
                                )}
                                
                                {section.type === 'practice' && (
                                  <div className="space-y-3">
                                    <div className="bg-card border rounded-lg p-4">
                                      <pre className="text-xs overflow-x-auto">
                                        <code>{section.code}</code>
                                      </pre>
                                    </div>
                                    <p className="text-sm text-accent font-medium">
                                      <Target className="h-4 w-4 inline mr-1" />
                                      {section.task}
                                    </p>
                                  </div>
                                )}
                                
                                {section.type === 'quiz' && (
                                  <div className="space-y-3">
                                    <p className="font-medium">{section.question}</p>
                                    <div className="space-y-2">
                                      {section.options.map((option: string, optIndex: number) => (
                                        <Button
                                          key={optIndex}
                                          variant="outline"
                                          size="sm"
                                          className="w-full text-left justify-start"
                                          onClick={() => {
                                            if (optIndex === section.correct) {
                                              toast({
                                                title: "Correct! 🎉",
                                                description: "Great job!"
                                              });
                                            } else {
                                              toast({
                                                title: "Try again",
                                                description: "That's not quite right",
                                                variant: "destructive"
                                              });
                                            }
                                          }}
                                        >
                                          {option}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            <div className="flex gap-3 pt-4 border-t border-border">
                              <Button
                                onClick={() => setExpandedTutorial(null)}
                                variant="outline"
                              >
                                Minimize
                              </Button>
                              
                              {!isCompleted && (
                                <Button
                                  onClick={() => completeTutorial(tutorial.id, tutorial.xp_reward)}
                                  className="bg-secondary hover:bg-secondary/90"
                                >
                                  <Trophy className="h-4 w-4 mr-2" />
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        {!isExpanded && (
                          <Button 
                            onClick={() => startTutorial(tutorial.id)}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-adventure"
                            disabled={!user}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {isCompleted ? 'Review' : 'Start Tutorial'}
                          </Button>
                        )}
                        
                        {!user && (
                          <p className="text-xs text-muted-foreground text-center">
                            Sign in to track your progress
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {filteredTutorials.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading text-foreground mb-2">No tutorials found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later for new content.
                </p>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tutorials;