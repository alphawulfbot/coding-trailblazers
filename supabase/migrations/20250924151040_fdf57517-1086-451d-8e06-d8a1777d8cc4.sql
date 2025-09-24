-- Create portfolio projects table
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'development' CHECK (status IN ('development', 'completed', 'live', 'archived')),
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  project_type TEXT DEFAULT 'web' CHECK (project_type IN ('web', 'mobile', 'desktop', 'api', 'cli', 'other')),
  lines_of_code INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create portfolio stats table
CREATE TABLE public.portfolio_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_projects INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  total_lines_of_code INTEGER DEFAULT 0,
  technologies_mastered TEXT[] DEFAULT '{}',
  code_quality_score DECIMAL(5,2) DEFAULT 0.0,
  github_connected BOOLEAN DEFAULT false,
  github_username TEXT,
  github_repos_count INTEGER DEFAULT 0,
  team_projects_count INTEGER DEFAULT 0,
  live_deployments_count INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  uptime_percentage DECIMAL(5,2) DEFAULT 99.9,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project views table for tracking
CREATE TABLE public.project_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  viewer_id UUID, -- nullable for anonymous views
  ip_address INET,
  user_agent TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project likes table
CREATE TABLE public.project_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  liked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Create team collaborations table
CREATE TABLE public.team_collaborations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  collaborator_id UUID NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'inactive')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id, collaborator_id)
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_collaborations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portfolio_projects
CREATE POLICY "Users can view public projects" ON public.portfolio_projects
FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can view their own projects" ON public.portfolio_projects
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" ON public.portfolio_projects
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON public.portfolio_projects
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON public.portfolio_projects
FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for portfolio_stats
CREATE POLICY "Users can view their own stats" ON public.portfolio_stats
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stats" ON public.portfolio_stats
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.portfolio_stats
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for project_views
CREATE POLICY "Anyone can create project views" ON public.project_views
FOR INSERT WITH CHECK (true);

CREATE POLICY "Project owners can view project analytics" ON public.project_views
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.portfolio_projects 
    WHERE id = project_id AND user_id = auth.uid()
  )
);

-- RLS Policies for project_likes
CREATE POLICY "Users can like projects" ON public.project_likes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their likes" ON public.project_likes
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view project likes" ON public.project_likes
FOR SELECT USING (true);

-- RLS Policies for team_collaborations
CREATE POLICY "Users can view their collaborations" ON public.team_collaborations
FOR SELECT USING (auth.uid() = user_id OR auth.uid() = collaborator_id);

CREATE POLICY "Users can create collaborations for their projects" ON public.team_collaborations
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.portfolio_projects 
    WHERE id = project_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update collaborations for their projects" ON public.team_collaborations
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.portfolio_projects 
    WHERE id = project_id AND user_id = auth.uid()
  )
);

-- Create indexes for better performance
CREATE INDEX idx_portfolio_projects_user_id ON public.portfolio_projects(user_id);
CREATE INDEX idx_portfolio_projects_status ON public.portfolio_projects(status);
CREATE INDEX idx_portfolio_projects_featured ON public.portfolio_projects(featured);
CREATE INDEX idx_portfolio_projects_public ON public.portfolio_projects(is_public);
CREATE INDEX idx_project_views_project_id ON public.project_views(project_id);
CREATE INDEX idx_project_views_viewed_at ON public.project_views(viewed_at);
CREATE INDEX idx_project_likes_project_id ON public.project_likes(project_id);
CREATE INDEX idx_team_collaborations_project_id ON public.team_collaborations(project_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_stats_updated_at
  BEFORE UPDATE ON public.portfolio_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update portfolio stats
CREATE OR REPLACE FUNCTION public.update_portfolio_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or create portfolio stats when projects change
  INSERT INTO public.portfolio_stats (
    user_id,
    total_projects,
    completed_projects,
    total_lines_of_code
  )
  SELECT 
    NEW.user_id,
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed' OR status = 'live'),
    COALESCE(SUM(lines_of_code), 0)
  FROM public.portfolio_projects 
  WHERE user_id = NEW.user_id
  ON CONFLICT (user_id) DO UPDATE SET
    total_projects = EXCLUDED.total_projects,
    completed_projects = EXCLUDED.completed_projects,
    total_lines_of_code = EXCLUDED.total_lines_of_code,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update stats
CREATE TRIGGER update_portfolio_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_stats();

-- Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_project_views(project_uuid UUID, viewer_uuid UUID DEFAULT NULL, viewer_ip INET DEFAULT NULL, user_agent_text TEXT DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
  -- Insert view record
  INSERT INTO public.project_views (project_id, viewer_id, ip_address, user_agent)
  VALUES (project_uuid, viewer_uuid, viewer_ip, user_agent_text);
  
  -- Update project view count
  UPDATE public.portfolio_projects 
  SET views_count = views_count + 1
  WHERE id = project_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle project like
CREATE OR REPLACE FUNCTION public.toggle_project_like(project_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  like_exists BOOLEAN;
BEGIN
  -- Check if like exists
  SELECT EXISTS (
    SELECT 1 FROM public.project_likes 
    WHERE project_id = project_uuid AND user_id = user_uuid
  ) INTO like_exists;
  
  IF like_exists THEN
    -- Remove like
    DELETE FROM public.project_likes 
    WHERE project_id = project_uuid AND user_id = user_uuid;
    
    -- Decrement count
    UPDATE public.portfolio_projects 
    SET likes_count = likes_count - 1
    WHERE id = project_uuid;
    
    RETURN false;
  ELSE
    -- Add like
    INSERT INTO public.project_likes (project_id, user_id)
    VALUES (project_uuid, user_uuid);
    
    -- Increment count
    UPDATE public.portfolio_projects 
    SET likes_count = likes_count + 1
    WHERE id = project_uuid;
    
    RETURN true;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for portfolio tables
ALTER TABLE public.portfolio_projects REPLICA IDENTITY FULL;
ALTER TABLE public.portfolio_stats REPLICA IDENTITY FULL;
ALTER TABLE public.project_views REPLICA IDENTITY FULL;
ALTER TABLE public.project_likes REPLICA IDENTITY FULL;
ALTER TABLE public.team_collaborations REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_views;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_collaborations;