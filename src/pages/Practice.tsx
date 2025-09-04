import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Zap, Target, Star } from "lucide-react";

const Practice = () => {
  const challenges = [
    {
      id: 1,
      title: "Array Manipulation",
      description: "Master array methods and data transformation",
      difficulty: "Beginner",
      xp: 50,
      icon: "🎯",
      color: "bg-secondary"
    },
    {
      id: 2,
      title: "String Algorithms",
      description: "Pattern matching and string manipulation techniques",
      difficulty: "Intermediate", 
      xp: 75,
      icon: "🧵",
      color: "bg-primary"
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Implement and work with complex data structures",
      difficulty: "Advanced",
      xp: 100,
      icon: "🏗️",
      color: "bg-accent"
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-primary mb-4">Practice Challenges</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharpen your coding skills with interactive challenges and coding puzzles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-2xl mb-2">{challenge.icon}</div>
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{challenge.title}</CardTitle>
                <CardDescription className="text-sm">{challenge.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    Interactive
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    {challenge.xp} XP
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Challenge
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 p-8 border rounded-lg bg-muted/20">
          <Star className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Practice Mode Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're building an amazing practice platform with coding challenges, 
            interactive exercises, and real-time feedback.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Practice;