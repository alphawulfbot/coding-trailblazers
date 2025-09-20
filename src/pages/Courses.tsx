import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Trophy, Star, Search, Filter, Sparkles, Zap, Crown } from "lucide-react";
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
  color?: string;
}

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedDifficulty]);

  const fetchCourses = async () => {
    try {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .order('created_at');

      // Combine database courses with additional courses
      const allCourses = [...(data || []), ...additionalCourses];
      setCourses(allCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(additionalCourses);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(course =>
        course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "intermediate": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  const handleStartCourse = (courseId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/course/${courseId}`);
  };

  const isPremium = (courseId: string) => {
    return ['ai-ml-intro', 'cybersecurity-basics', 'blockchain-crypto'].includes(courseId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-muted rounded-xl"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Explore the world of
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Codedevs
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers mastering coding through gamified learning experiences
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-muted"
              />
            </div>
            
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-0 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() => handleStartCourse(course.id)}
            >
              {/* Premium Badge */}
              {isPremium(course.id) && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-black border-0 px-2 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    PREMIUM
                  </Badge>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${course.gradient}`} />
              
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardHeader className="pb-4 relative z-10">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:animate-bounce-subtle group-hover:scale-110 transition-transform duration-300">
                    {course.emoji}
                  </div>
                  <Badge className={`${getDifficultyColor(course.difficulty)} animate-pulse`}>
                    <Zap className="h-3 w-3 mr-1" />
                    {course.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-all duration-300">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration_hours}h</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.total_lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    <span>{course.xp_reward} XP</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className={`w-full bg-gradient-to-r ${course.gradient} text-white border-0 hover:scale-105 hover:shadow-lg transition-all duration-300 group/button relative overflow-hidden`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartCourse(course.id);
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 group-hover/button:animate-bounce" />
                    {user ? 'Start Adventure' : 'Join to Start'}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700" />
                </Button>

                {/* Progress Bar Animation */}
                <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-1 rounded-full bg-gradient-to-r ${course.gradient} opacity-50 group-hover:opacity-100 transition-all duration-500`}
                    style={{ width: `${Math.random() * 40 + 20}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search terms or filters</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedDifficulty("all");
              }}
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Join the Club Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🏆</div>
            <h2 className="font-heading text-3xl md:text-5xl mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Join the Club
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with thousands of developers, share your progress, and unlock exclusive content. 
              Start your coding adventure today!
            </p>
            
            {!user && (
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold shadow-2xl"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started Now
              </Button>
            )}
            
            {user && (
              <div className="space-y-4">
                <p className="text-primary font-semibold">Welcome back, {user.email}! 🎉</p>
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  Continue Learning
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;