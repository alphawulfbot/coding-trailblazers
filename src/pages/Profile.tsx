import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import Footer from '@/components/Footer.tsx';
import { User, Upload, Camera, Trophy, Zap, Calendar, Target } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface ProfileData {
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  xp: number;
  level: number;
  streak_days: number;
  last_activity_at: string;
  privacy_settings: {
    profile_visible: boolean;
    show_stats: boolean;
  };
}

const Profile = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<ProfileData>({
    defaultValues: {
      username: '',
      display_name: '',
      bio: '',
      avatar_url: '',
      xp: 0,
      level: 1,
      streak_days: 0,
      last_activity_at: '',
      privacy_settings: {
        profile_visible: true,
        show_stats: false
      }
    }
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        // Safely handle privacy_settings JSON data
        const privacySettings = data.privacy_settings as any;
        const profileData = {
          ...data,
          privacy_settings: {
            profile_visible: privacySettings?.profile_visible ?? true,
            show_stats: privacySettings?.show_stats ?? false
          }
        };
        setProfile(profileData);
        form.reset(profileData);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Update local state
      const updatedProfile = { ...profile, avatar_url: publicUrl } as ProfileData;
      setProfile(updatedProfile);
      form.setValue('avatar_url', publicUrl);

      toast({
        title: "Success",
        description: "Profile picture updated successfully!"
      });

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProfileData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          display_name: data.display_name,
          bio: data.bio,
          privacy_settings: data.privacy_settings
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });

      fetchProfile(); // Refresh profile data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-20 w-20 bg-muted rounded-full mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Profile Header */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">Your Adventure Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage 
                      src={profile?.avatar_url || ''} 
                      alt={profile?.display_name || 'Profile'} 
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-heading">
                      {profile?.display_name?.charAt(0) || profile?.username?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute -bottom-2 -right-2 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-adventure shadow-adventure"
                  >
                    {isUploading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </label>
                  
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-heading text-foreground">
                    {profile?.display_name || profile?.username || 'Adventure Seeker'}
                  </h2>
                  <p className="text-muted-foreground">
                    {profile?.bio || 'Ready to conquer the coding realm!'}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary/10 rounded-lg p-4 text-center border border-secondary/20">
                  <Zap className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-secondary">{profile?.xp || 0}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                
                <div className="bg-accent/10 rounded-lg p-4 text-center border border-accent/20">
                  <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-accent">{profile?.level || 1}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4 text-center border border-primary/20">
                  <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{profile?.streak_days || 0}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 text-center border border-muted">
                  <Calendar className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm font-bold text-foreground">
                    {profile?.last_activity_at ? 
                      new Date(profile.last_activity_at).toLocaleDateString() : 
                      'Today'
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">Last Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-heading text-primary">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Username</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="display_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter display name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Tell us about your coding journey..." 
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Privacy Settings */}
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="text-lg font-heading text-primary">Privacy Settings</h3>
                    <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
                    
                    <FormField
                      control={form.control}
                      name="privacy_settings.profile_visible"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Profile Visibility</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Allow others to view your basic profile information
                            </div>
                          </div>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-border"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="privacy_settings.show_stats"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Show Statistics</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Allow others to see your XP, level, and streak data
                            </div>
                          </div>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-border"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                  
                </form>
              </Form>
            </CardContent>
          </Card>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;