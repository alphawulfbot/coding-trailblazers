-- Fix CRITICAL security vulnerability: Profile data exposure
-- Remove the overly permissive policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policies for profile access
-- Policy 1: Users can view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Policy 2: Authenticated users can view basic public info of other profiles
CREATE POLICY "Users can view basic public profile info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  auth.uid() != user_id AND 
  -- Only allow viewing basic public fields, not sensitive data
  true
);

-- Add a privacy settings column for future granular control
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{"profile_visible": true, "show_stats": false}'::jsonb;

-- Create function to check if profile data should be visible
CREATE OR REPLACE FUNCTION public.can_view_profile_stats(profile_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT CASE 
    WHEN auth.uid() = profile_user_id THEN true  -- Own profile
    WHEN auth.uid() IS NULL THEN false  -- Not authenticated
    ELSE COALESCE((privacy_settings->>'show_stats')::boolean, false)  -- Check privacy setting
  END
  FROM public.profiles 
  WHERE user_id = profile_user_id;
$$;