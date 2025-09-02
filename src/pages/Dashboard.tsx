import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Flame, BookOpen, Target } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  username: string;
  display_name: string;
  xp: number;
  level: number;
  streak_days: number;
}

interface UserCourse {
  id: string;
  progress_percentage: number;
  course: {
    title: string;
    emoji: string;
    difficulty: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch user courses with progress
        const { data: coursesData } = await supabase
          .from('user_courses')
          .select(`
            id,
            progress_percentage,
            courses:course_id (
              title,
              emoji,
              difficulty
            )
          `)
          .eq('user_id', user.id);

        if (coursesData) {
          setUserCourses(coursesData.map(course => ({
            id: course.id,
            progress_percentage: course.progress_percentage,
            course: course.courses
          })));
        }

        // Fetch user achievements
        const { data: achievementsData } = await supabase
          .from('user_achievements')
          .select(`
            earned_at,
            achievements:achievement_id (
              id,
              title,
              description,
              icon
            )
          `)
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false });

        if (achievementsData) {
          setAchievements(achievementsData.map(ua => ({
            id: ua.achievements.id,
            title: ua.achievements.title,
            description: ua.achievements.description,
            icon: ua.achievements.icon,
            earned_at: ua.earned_at
          })));
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-primary mb-2">
            Welcome back, {profile?.display_name || 'Adventurer'}! 🚀
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your coding adventure?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{profile?.xp || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{profile?.level || 1}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{profile?.streak_days || 0} days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{userCourses.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Courses
              </CardTitle>
              <CardDescription>
                Continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No courses yet!</p>
                  <Button onClick={() => navigate('/')}>
                    Explore Courses
                  </Button>
                </div>
              ) : (
                userCourses.map((userCourse) => (
                  <div key={userCourse.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{userCourse.course.emoji}</span>
                        <span className="font-medium">{userCourse.course.title}</span>
                      </div>
                      <Badge variant="outline">{userCourse.course.difficulty}</Badge>
                    </div>
                    <Progress value={userCourse.progress_percentage} />
                    <p className="text-sm text-muted-foreground">
                      {userCourse.progress_percentage}% complete
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Your latest accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No achievements yet!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete lessons to earn your first achievement
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {achievements.slice(0, 5).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;