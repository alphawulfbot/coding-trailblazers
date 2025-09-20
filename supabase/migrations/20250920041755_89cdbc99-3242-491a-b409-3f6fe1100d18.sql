-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create tutorials table for structured tutorial content
CREATE TABLE public.tutorials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  difficulty TEXT DEFAULT 'Beginner',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  duration_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 20,
  is_published BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on tutorials
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view published tutorials
CREATE POLICY "Anyone can view published tutorials" 
ON public.tutorials 
FOR SELECT 
USING (is_published = true);

-- Create trigger for timestamps
CREATE TRIGGER update_tutorials_updated_at
BEFORE UPDATE ON public.tutorials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create user tutorial progress table
CREATE TABLE public.user_tutorial_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tutorial_id UUID NOT NULL REFERENCES public.tutorials(id),
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, tutorial_id)
);

-- Enable RLS on user tutorial progress
ALTER TABLE public.user_tutorial_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for user tutorial progress
CREATE POLICY "Users can view their own tutorial progress" 
ON public.user_tutorial_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tutorial progress" 
ON public.user_tutorial_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tutorial progress" 
ON public.user_tutorial_progress 
FOR UPDATE 
USING (auth.uid() = user_id);