import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Clock, Star, Users, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_hours: number;
  total_lessons: number;
  xp_reward: number;
  emoji: string;
  color: string;
  gradient: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order_index: number;
  xp_reward: number;
  duration_minutes: number;
  is_completed?: boolean;
}

interface UserCourse {
  progress_percentage: number;
  enrolled_at: string;
}

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;

      try {
        // Fetch course details
        const { data: courseData } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (courseData) {
          setCourse(courseData);
        }

        // Fetch lessons for this course
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index');

        if (lessonsData) {
          setLessons(lessonsData);
        }

        // If user is authenticated, fetch their progress
        if (user) {
          const { data: userCourseData } = await supabase
            .from('user_courses')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', courseId)
            .single();

          if (userCourseData) {
            setUserCourse(userCourseData);
          }

          // Fetch lesson progress
          const { data: progressData } = await supabase
            .from('user_lesson_progress')
            .select('lesson_id, is_completed')
            .eq('user_id', user.id);

          if (progressData) {
            const completedLessons = new Set(
              progressData.filter(p => p.is_completed).map(p => p.lesson_id)
            );
            
            setLessons(prev => prev.map(lesson => ({
              ...lesson,
              is_completed: completedLessons.has(lesson.id)
            })));
          }
        }

      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  const handleEnrollCourse = async () => {
    if (!user || !course) {
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_courses')
        .insert({
          user_id: user.id,
          course_id: course.id,
          progress_percentage: 0
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to enroll in course",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success!",
          description: "You're now enrolled in this course"
        });
        
        setUserCourse({
          progress_percentage: 0,
          enrolled_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
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

  if (!course) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = lessons.filter(l => l.is_completed).length;
  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl">{course.emoji}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-heading text-primary mb-2">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Badge variant="outline">{course.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration_hours}h
                </div>
                <div className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  {course.total_lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {course.xp_reward} XP
                </div>
              </div>
            </div>
          </div>

          {/* Progress and Enrollment */}
          {userCourse ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {lessons.length} lessons completed
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleEnrollCourse}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-adventure"
            >
              🚀 Start Learning
            </Button>
          )}
        </div>

        {/* Lessons List */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {lessons.length} lessons to master {course.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {lesson.is_completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span>{lesson.duration_minutes} min</span>
                        <span>{lesson.xp_reward} XP</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleStartLesson(lesson.id)}
                    variant={lesson.is_completed ? "outline" : "default"}
                    disabled={!userCourse}
                    aria-label={`${lesson.is_completed ? 'Review' : 'Start'} lesson: ${lesson.title}`}
                  >
                    {lesson.is_completed ? "Review" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CoursePage;