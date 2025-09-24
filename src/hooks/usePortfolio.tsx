import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface PortfolioProject {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  status: string;
  views_count: number;
  likes_count: number;
  featured: boolean;
  is_public: boolean;
  project_type: string;
  lines_of_code: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export type CreatePortfolioProject = {
  title: string;
  description?: string | null;
  tech_stack: string[];
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
  status: 'development' | 'completed' | 'live' | 'archived';
  featured: boolean;
  is_public: boolean;
  project_type: 'web' | 'mobile' | 'desktop' | 'api' | 'cli' | 'other';
  lines_of_code: number;
  completion_percentage: number;
}

export interface PortfolioStats {
  id: string;
  user_id: string;
  total_projects: number;
  completed_projects: number;
  total_lines_of_code: number;
  technologies_mastered: string[];
  code_quality_score: number;
  github_connected: boolean;
  github_username?: string;
  github_repos_count: number;
  team_projects_count: number;
  live_deployments_count: number;
  total_views: number;
  total_likes: number;
  uptime_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectLike {
  id: string;
  project_id: string;
  user_id: string;
  liked_at: string;
}

export const usePortfolio = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [stats, setStats] = useState<PortfolioStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());

  // Fetch user's portfolio projects
  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio projects",
        variant: "destructive",
      });
    }
  };

  // Fetch portfolio stats
  const fetchStats = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('portfolio_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch user's likes
  const fetchUserLikes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('project_likes')
        .select('project_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setUserLikes(new Set(data?.map(like => like.project_id) || []));
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

  // Fetch public projects (for browsing)
  const fetchPublicProjects = async (limit = 20) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_public', true)
        .order('views_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching public projects:', error);
      return [];
    }
  };

  // Create new project
  const createProject = async (projectData: CreatePortfolioProject) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert({
          ...projectData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchProjects();
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
      return null;
    }
  };

  // Update project
  const updateProject = async (projectId: string, updates: Partial<PortfolioProject>) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .update(updates)
        .eq('id', projectId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchProjects();
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete project
  const deleteProject = async (projectId: string) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchProjects();
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  // Toggle project like
  const toggleProjectLike = async (projectId: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.rpc('toggle_project_like', {
        project_uuid: projectId,
        user_uuid: user.id
      });

      if (error) throw error;
      
      // Update local likes state
      const newLikes = new Set(userLikes);
      if (data) {
        newLikes.add(projectId);
      } else {
        newLikes.delete(projectId);
      }
      setUserLikes(newLikes);
      
      return data;
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to toggle like",
        variant: "destructive",
      });
      return false;
    }
  };

  // Increment project views
  const incrementProjectViews = async (projectId: string) => {
    try {
      await supabase.rpc('increment_project_views', {
        project_uuid: projectId,
        viewer_uuid: user?.id || null
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  // Initialize stats if not exists
  const initializeStats = async () => {
    if (!user || stats) return;
    
    try {
      const { error } = await supabase
        .from('portfolio_stats')
        .insert({
          user_id: user.id,
          total_projects: 0,
          completed_projects: 0,
          total_lines_of_code: 0,
          technologies_mastered: [],
          code_quality_score: 0.0,
          github_connected: false,
          github_repos_count: 0,
          team_projects_count: 0,
          live_deployments_count: 0,
          total_views: 0,
          total_likes: 0,
          uptime_percentage: 99.9
        });

      if (error && error.code !== '23505') throw error; // Ignore duplicate key error
      await fetchStats();
    } catch (error) {
      console.error('Error initializing stats:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to portfolio projects changes
    const projectsChannel = supabase
      .channel('portfolio-projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_projects',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Portfolio projects change:', payload);
          fetchProjects();
        }
      )
      .subscribe();

    // Subscribe to stats changes
    const statsChannel = supabase
      .channel('portfolio-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_stats',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Portfolio stats change:', payload);
          fetchStats();
        }
      )
      .subscribe();

    // Subscribe to project likes changes for real-time updates
    const likesChannel = supabase
      .channel('project-likes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_likes'
        },
        (payload) => {
          console.log('Project likes change:', payload);
          if (payload.new && (payload.new as any).user_id === user.id) {
            fetchUserLikes();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(statsChannel);
      supabase.removeChannel(likesChannel);
    };
  }, [user]);

  // Initial data fetch
  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([
          fetchProjects(),
          fetchStats(),
          fetchUserLikes(),
          initializeStats()
        ]);
        setLoading(false);
      };
      loadData();
    } else {
      setProjects([]);
      setStats(null);
      setUserLikes(new Set());
      setLoading(false);
    }
  }, [user]);

  return {
    projects,
    stats,
    loading,
    userLikes,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectLike,
    incrementProjectViews,
    fetchPublicProjects,
    refetchData: () => {
      if (user) {
        fetchProjects();
        fetchStats();
        fetchUserLikes();
      }
    }
  };
};