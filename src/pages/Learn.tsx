import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Trophy, Users } from "lucide-react";

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
  is_featured: boolean;
}

interface UserCourse {
  course_id: string;
  progress_percentage: number;
  enrolled_at: string;
}

const Learn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data || []);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching user progress:', error);
    } else {
      setUserCourses(data || []);
    }
    setLoading(false);
  };

  const getUserCourseProgress = (courseId: string) => {
    return userCourses.find(uc => uc.course_id === courseId);
  };

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
          <h1 className="text-4xl font-heading text-primary mb-4">Learn to Code</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master programming skills through interactive courses and hands-on projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const userProgress = getUserCourseProgress(course.id);
            const isEnrolled = !!userProgress;
            const progressPercentage = userProgress?.progress_percentage || 0;
            
            return (
              <Card key={course.id} className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-2xl mb-2">{course.emoji}</div>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">{course.title}</CardTitle>
                  <CardDescription className="text-sm">{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.total_lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration_hours}h
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      {course.xp_reward} XP
                    </div>
                  </div>

                  {isEnrolled && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary font-semibold">{progressPercentage}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  <Button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className={`w-full ${isEnrolled 
                      ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    } shadow-adventure transition-adventure`}
                  >
                    {isEnrolled 
                      ? (progressPercentage === 100 ? 'Review Course' : 'Continue Learning')
                      : 'Start Course'
                    }
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {courses.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses available</h3>
            <p className="text-muted-foreground">Check back soon for new learning content!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Learn;