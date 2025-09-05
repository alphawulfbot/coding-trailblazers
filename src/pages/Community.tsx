import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Users, 
  Trophy, 
  Heart, 
  Star, 
  ExternalLink, 
  Plus,
  Zap,
  Crown,
  Award,
  Send
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Community = () => {
  const { user } = useAuth();
  const [userXP, setUserXP] = useState(0);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');

  const REQUIRED_XP_FOR_COMMUNITY_CREATION = 500;

  const stats = [
    { label: "Active Learners", value: "15,247", icon: Users },
    { label: "Code Reviews", value: "8,432", icon: MessageCircle },
    { label: "Projects Shared", value: "3,891", icon: Trophy },
    { label: "Helpful Votes", value: "42,156", icon: Heart }
  ];

  const discussions = [
    {
      id: 1,
      title: "How to optimize React performance with useMemo?",
      author: "Sarah Chen",
      authorLevel: "Advanced",
      avatar: "/placeholder.svg",
      replies: 23,
      likes: 45,
      views: 312,
      category: "React",
      timeAgo: "2 hours ago",
      isPinned: true
    },
    {
      id: 2,
      title: "Best practices for REST API design in 2024",
      author: "Mike Johnson",
      authorLevel: "Expert",
      avatar: "/placeholder.svg",
      replies: 18,
      likes: 32,
      views: 187,
      category: "Backend",
      timeAgo: "4 hours ago",
      isPinned: false
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox - Complete comparison guide",
      author: "Emma Wilson",
      authorLevel: "Intermediate",
      avatar: "/placeholder.svg",
      replies: 15,
      likes: 28,
      views: 156,
      category: "CSS",
      timeAgo: "6 hours ago",
      isPinned: false
    },
    {
      id: 4,
      title: "TypeScript generics made simple with examples",
      author: "Alex Rodriguez",
      authorLevel: "Advanced", 
      avatar: "/placeholder.svg",
      replies: 31,
      likes: 67,
      views: 423,
      category: "TypeScript",
      timeAgo: "1 day ago",
      isPinned: false
    }
  ];

  const categories = [
    { name: "General", count: 156, color: "bg-blue-500" },
    { name: "React", count: 89, color: "bg-cyan-500" },
    { name: "JavaScript", count: 124, color: "bg-yellow-500" },
    { name: "TypeScript", count: 67, color: "bg-blue-600" },
    { name: "CSS", count: 78, color: "bg-pink-500" },
    { name: "Backend", count: 45, color: "bg-green-500" },
    { name: "Career", count: 34, color: "bg-purple-500" },
    { name: "Projects", count: 92, color: "bg-orange-500" }
  ];

  const topContributors = [
    { name: "Alex Rodriguez", xp: 2450, posts: 127, level: "Expert", avatar: "/placeholder.svg" },
    { name: "Jamie Liu", xp: 1890, posts: 89, level: "Advanced", avatar: "/placeholder.svg" },
    { name: "Taylor Swift", xp: 1567, posts: 76, level: "Advanced", avatar: "/placeholder.svg" },
    { name: "Jordan Kim", xp: 1234, posts: 63, level: "Intermediate", avatar: "/placeholder.svg" },
    { name: "Casey Johnson", xp: 998, posts: 52, level: "Intermediate", avatar: "/placeholder.svg" }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-orange-600';
      case 'expert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const canCreateCommunity = userXP >= REQUIRED_XP_FOR_COMMUNITY_CREATION;

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    // In a real app, this would save to database
    toast.success("Post created successfully!");
    setNewPostTitle('');
    setNewPostContent('');
  };

  // Simulate user XP (in real app, this would come from database)
  useEffect(() => {
    if (user) {
      setUserXP(750); // Example XP - in real app would fetch from database
    }
  }, [user]);

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
            <Card key={index} className="text-center border shadow-card hover:shadow-adventure transition-adventure">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="create">Create Community</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Discussions */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Recent Discussions</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <DialogDescription>
                          Share your knowledge or ask a question to help the community grow.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Post title..."
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                        />
                        <select 
                          className="w-full p-2 border rounded-md bg-background"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          {categories.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                        <Textarea
                          placeholder="Write your post content..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          rows={4}
                        />
                        <Button onClick={handleCreatePost} className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Create Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="border shadow-card hover:shadow-adventure transition-adventure">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {discussion.isPinned && <Crown className="h-4 w-4 text-yellow-500" />}
                            <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                              {discussion.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                            <span>by</span>
                            <span className={`font-medium ${getLevelColor(discussion.authorLevel)}`}>
                              {discussion.author}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.authorLevel}
                            </Badge>
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                            <Badge variant="secondary" className="ml-auto">
                              {discussion.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {discussion.likes} likes
                            </span>
                            <span className="flex items-center gap-1">
                              👁️ {discussion.views} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Community Sidebar */}
              <div className="space-y-6">
                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-foreground">Join Our Discord</CardTitle>
                    <CardDescription>
                      Connect with 15,000+ learners in real-time chat
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
                    <CardTitle className="text-foreground">Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>• Be respectful and constructive</p>
                    <p>• Share knowledge freely and help others</p>
                    <p>• Keep discussions on-topic</p>
                    <p>• No spam, self-promotion, or harmful content</p>
                    <p>• Use proper tags and categories</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="border shadow-card hover:shadow-adventure transition-adventure cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} discussions</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Card className="border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Trophy className="h-5 w-5" />
                  Top Contributors This Month
                </CardTitle>
                <CardDescription>
                  Most helpful and active community members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-adventure">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contributor.avatar} />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{contributor.name}</span>
                        <Badge variant="outline" className={`text-xs ${getLevelColor(contributor.level)}`}>
                          {contributor.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contributor.posts} posts • {contributor.xp} XP
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {index < 3 && <Award className="h-5 w-5 text-primary" />}
                      <div className="text-right">
                        <div className="font-semibold text-primary">{contributor.xp}</div>
                        <div className="text-xs text-muted-foreground">XP</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-8">
            <Card className="border shadow-card max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-foreground">
                  <Users className="h-6 w-6" />
                  Create Your Own Community
                </CardTitle>
                <CardDescription>
                  Start a specialized community for your interests or expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-muted/20 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">XP Requirement</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      You need <strong>{REQUIRED_XP_FOR_COMMUNITY_CREATION} XP</strong> to create a community
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-primary">{userXP}</span>
                      <span className="text-muted-foreground">/ {REQUIRED_XP_FOR_COMMUNITY_CREATION} XP</span>
                    </div>
                    <div className="w-full max-w-xs mx-auto">
                      <div className="bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((userXP / REQUIRED_XP_FOR_COMMUNITY_CREATION) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {canCreateCommunity ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        Congratulations! You can now create communities.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border">
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h3 className="font-semibold mb-2">Study Group</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a focused learning group for specific topics
                          </p>
                          <Button className="w-full">Create Study Group</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="border">
                        <CardContent className="p-4 text-center">
                          <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h3 className="font-semibold mb-2">Project Team</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Organize collaborative projects with other developers
                          </p>
                          <Button className="w-full">Create Project Team</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Keep learning and participating to earn more XP!
                      </p>
                      <div className="space-y-2 text-sm">
                        <p>• Complete coding challenges: <strong>+50-100 XP</strong></p>
                        <p>• Build projects: <strong>+200-500 XP</strong></p>
                        <p>• Help others in discussions: <strong>+10-25 XP</strong></p>
                        <p>• Share your projects: <strong>+75-150 XP</strong></p>
                      </div>
                      <Button 
                        onClick={() => window.location.href = '/learn'}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Start Learning to Earn XP
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;