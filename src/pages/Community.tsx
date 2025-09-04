import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Trophy, Heart, Star, ExternalLink } from "lucide-react";

const Community = () => {
  const stats = [
    { label: "Active Learners", value: "10,000+", icon: Users },
    { label: "Code Reviews", value: "5,000+", icon: MessageCircle },
    { label: "Projects Shared", value: "2,500+", icon: Trophy },
    { label: "Helpful Votes", value: "25,000+", icon: Heart }
  ];

  const discussions = [
    {
      id: 1,
      title: "How to optimize React performance?",
      author: "Sarah Chen",
      avatar: "/placeholder.svg",
      replies: 23,
      likes: 45,
      category: "React",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for API design",
      author: "Mike Johnson", 
      avatar: "/placeholder.svg",
      replies: 18,
      likes: 32,
      category: "Backend",
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - When to use what?",
      author: "Emma Wilson",
      avatar: "/placeholder.svg", 
      replies: 15,
      likes: 28,
      category: "CSS",
      timeAgo: "6 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-primary mb-4">Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow learners, share knowledge, and grow together
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border shadow-card">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Discussions */}
          <div className="lg:col-span-2">
            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <MessageCircle className="h-5 w-5" />
                  Recent Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-adventure">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={discussion.avatar} />
                      <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                        {discussion.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.timeAgo}</span>
                        <Badge variant="outline" className="ml-auto">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {discussion.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Community Sidebar */}
          <div className="space-y-6">
            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Join Our Discord</CardTitle>
                <CardDescription>
                  Connect with learners in real-time chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Top Contributors</CardTitle>
                <CardDescription>
                  This week's most helpful community members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Alex Rodriguez', 'Jamie Liu', 'Taylor Swift'].map((name, index) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-sm">{name}</span>
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Be respectful and helpful</p>
                <p>• Share knowledge freely</p>
                <p>• Keep discussions on-topic</p>
                <p>• No spam or self-promotion</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12 p-8 border rounded-lg bg-muted/20">
          <Users className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Community Features Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're building forums, code reviews, mentorship programs, 
            and more ways to connect with fellow developers.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Community;