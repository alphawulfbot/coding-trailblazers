import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Trophy } from "lucide-react";

const FeaturedCourses = () => {
  const courses = [
    {
      title: "Python Adventure",
      description: "Start your coding journey with the friendliest programming language",
      image: "🐍",
      difficulty: "Beginner",
      duration: "4 weeks",
      students: "12,450",
      rating: 4.9,
      xp: 2500,
      badges: 8,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Web Development Quest",
      description: "Build amazing websites with HTML, CSS, and JavaScript",
      image: "🌐",
      difficulty: "Beginner",
      duration: "6 weeks", 
      students: "8,230",
      rating: 4.8,
      xp: 3200,
      badges: 12,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "React Kingdom",
      description: "Master the art of building interactive user interfaces",
      image: "⚛️",
      difficulty: "Intermediate",
      duration: "5 weeks",
      students: "6,180",
      rating: 4.9,
      xp: 4100,
      badges: 10,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Data Science Expedition",
      description: "Explore the world of data analysis and machine learning",
      image: "📊",
      difficulty: "Intermediate",
      duration: "8 weeks",
      students: "4,920",
      rating: 4.7,
      xp: 5000,
      badges: 15,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Mobile Development Saga",
      description: "Create mobile apps that users love with React Native",
      image: "📱",
      difficulty: "Advanced",
      duration: "7 weeks",
      students: "3,650",
      rating: 4.8,
      xp: 4800,
      badges: 13,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Game Development Epic",
      description: "Build your own games from scratch using Unity and C#",
      image: "🎮",
      difficulty: "Advanced",
      duration: "10 weeks",
      students: "2,890",
      rating: 4.9,
      xp: 6500,
      badges: 20,
      color: "from-red-500 to-orange-500"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-primary/20 text-primary";
    }
  };

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
          {courses.map((course, index) => (
            <Card key={index} className="group relative overflow-hidden gradient-card border-0 hover:scale-105 transition-adventure cursor-pointer">
              {/* Gradient Overlay */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${course.color}`} />
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl group-hover:animate-bounce-subtle">
                    {course.image}
                  </div>
                  <Badge className={getDifficultyColor(course.difficulty)}>
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
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    {course.xp} XP
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-accent font-medium">
                    🏆 {course.badges} Badges
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Quest
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${course.color} opacity-70`}
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
            className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-6"
          >
            🗺️ Explore All Adventures
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;