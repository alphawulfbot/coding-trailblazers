import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Star } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: any;
  order_index: number;
  xp_reward: number;
  duration_minutes: number;
  course_id: string;
}

interface Exercise {
  type: string;
  prompt: string;
  solution: string;
}

const LessonPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId || !user) {
        navigate('/auth');
        return;
      }

      try {
        // Fetch lesson details
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .single();

        if (lessonData) {
          setLesson(lessonData);
        }

        // Check if lesson is completed
        const { data: progressData } = await supabase
          .from('user_lesson_progress')
          .select('is_completed')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .single();

        if (progressData) {
          setIsCompleted(progressData.is_completed);
        }

      } catch (error) {
        console.error('Error fetching lesson data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lessonId, user, navigate]);

  const handleCompleteLesson = async () => {
    if (!user || !lesson) return;

    try {
      // Update lesson progress
      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          is_completed: true,
          xp_earned: lesson.xp_reward,
          completed_at: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Update user XP
      const { data: profileData } = await supabase
        .from('profiles')
        .select('xp')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            xp: profileData.xp + lesson.xp_reward,
            last_activity_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (profileError) throw profileError;
      }

      // Update course progress
      const { data: courseProgress } = await supabase
        .from('user_lesson_progress')
        .select('is_completed')
        .eq('user_id', user.id)
        .in('lesson_id', await getCourseSteps(lesson.course_id));

      if (courseProgress) {
        const completedCount = courseProgress.filter(p => p.is_completed).length;
        const totalLessons = courseProgress.length;
        const progressPercentage = Math.round((completedCount / totalLessons) * 100);

        await supabase
          .from('user_courses')
          .update({ progress_percentage: progressPercentage })
          .eq('user_id', user.id)
          .eq('course_id', lesson.course_id);
      }

      setIsCompleted(true);
      
      toast({
        title: "Lesson Complete! 🎉",
        description: `You earned ${lesson.xp_reward} XP!`
      });

    } catch (error) {
      console.error('Error completing lesson:', error);
      toast({
        title: "Error",
        description: "Failed to complete lesson",
        variant: "destructive"
      });
    }
  };

  const getCourseSteps = async (courseId: string) => {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', courseId);
    
    return lessons?.map(l => l.id) || [];
  };

  const handleBackToCourse = () => {
    if (lesson) {
      navigate(`/course/${lesson.course_id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const exercise = lesson.content?.exercises?.[0] as Exercise;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToCourse}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Button>
          
          {isCompleted && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </Badge>
          )}
        </div>

        {/* Lesson Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-primary mb-2">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{lesson.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {lesson.xp_reward} XP
            </div>
            <div>
              Lesson {lesson.order_index}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none text-foreground">
                <p className="text-base leading-relaxed">
                  {lesson.content?.content || "Welcome to this lesson!"}
                </p>
              </div>

              {/* Code Example */}
              {lesson.content?.codeExample && (
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Code Example:</h4>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto border">
                    <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                      {lesson.content.codeExample.replace(/\\n/g, '\n')}
                    </code>
                  </pre>
                </div>
              )}

              {/* Key Points */}
              {lesson.content?.keyPoints && (
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Points:</h4>
                  <ul className="space-y-2">
                    {lesson.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-1">•</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Exercise */}
          {exercise && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Practice Exercise
                </CardTitle>
                <CardDescription>
                  Try the exercise below to practice what you've learned
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium mb-2">Challenge:</p>
                  <p>{exercise.prompt}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Code:</label>
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your code here..."
                    className="font-mono min-h-[200px] bg-background"
                    aria-label="Code editor for practice exercise"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </Button>
                </div>

                {showSolution && (
                  <div className="p-4 bg-muted rounded-lg border">
                    <p className="font-medium mb-2 text-foreground">Solution:</p>
                    <pre className="font-mono text-sm whitespace-pre-wrap text-foreground">
                      {exercise.solution.replace(/\\n/g, '\n')}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Complete Lesson */}
          <div className="flex justify-end">
            <Button
              onClick={handleCompleteLesson}
              disabled={isCompleted}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label={isCompleted ? "Lesson already completed" : "Mark lesson as complete"}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  Complete Lesson
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;