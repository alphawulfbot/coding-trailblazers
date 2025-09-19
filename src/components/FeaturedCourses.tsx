import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Trophy, Sparkles, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { additionalCourses } from "@/data/additionalCourses";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_hours: number;
  total_lessons: number;
  xp_reward: number;
  emoji: string;
  gradient: string;
  is_featured: boolean;
}

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const { data } = await supabase
          .from('courses')
          .select('*')
          .eq('is_featured', true)
          .order('created_at');

        // Combine database courses with additional courses
        const allCourses = [...(data || []), ...additionalCourses];
        setCourses(allCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to additional courses if database fails
        setCourses(additionalCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-primary/20 text-primary";
    }
  };

  const handleStartCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl mb-6 text-foreground">
              Featured
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent ml-3">
                Adventures
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Embark on these epic coding quests and become a programming legend
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-courses" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl mb-6 text-foreground">
            Featured
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent ml-3">
              Adventures
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Embark on these epic coding quests and become a programming legend
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="group relative overflow-hidden gradient-card border-0 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() => handleStartCourse(course.id)}
              role="article"
              aria-label={`Course: ${course.title}`}
            >
              {/* Gradient Overlay */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${course.gradient}`} />
              
              <CardHeader className="pb-4 relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl group-hover:animate-bounce-subtle group-hover:scale-110 transition-transform duration-300">
                    {course.emoji}
                  </div>
                  <Badge className={`${getDifficultyColor(course.difficulty)} animate-pulse`}>
                    <Zap className="h-3 w-3 mr-1" />
                    {course.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-adventure">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration_hours}h
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {course.total_lessons} lessons
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    4.8
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    {course.xp_reward} XP
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-accent font-medium">
                    🏆 Learn & Earn
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 group/button relative overflow-hidden"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartCourse(course.id);
                    }}
                    aria-label={`Start ${course.title} course`}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      <Zap className="h-3 w-3 group-hover/button:animate-bounce" />
                      Start Quest
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${course.gradient} opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse`}
                    style={{ width: `${Math.random() * 40 + 10}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/auth')}
            className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6"
            aria-label="Explore all available courses"
          >
            🗺️ Explore All Adventures
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;