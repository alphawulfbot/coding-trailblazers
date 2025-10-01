import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface ProjectChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  xp_reward: number;
  icon: string;
  tech_stack: string[];
  category: string;
  steps: ChallengeStep[];
  resources: Record<string, any>;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ChallengeStep {
  title: string;
  description: string;
  tasks: string[];
  estimated_time: number;
  resources: string[];
}

export interface UserChallengeProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  current_step: number;
  completed_steps: number[];
  is_completed: boolean;
  started_at: string;
  completed_at?: string;
  notes?: string;
  progress_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export const useProjectChallenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<ProjectChallenge[]>([]);
  const [userProgress, setUserProgress] = useState<Map<string, UserChallengeProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [activeChallenge, setActiveChallenge] = useState<ProjectChallenge | null>(null);

  // Fetch all available challenges
  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('project_challenges')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setChallenges((data || []).map(challenge => ({
        ...challenge,
        difficulty: challenge.difficulty as 'beginner' | 'intermediate' | 'advanced',
        tech_stack: challenge.tech_stack || [],
        steps: Array.isArray(challenge.steps) ? (challenge.steps as unknown) as ChallengeStep[] : [],
        resources: typeof challenge.resources === 'object' && challenge.resources ? challenge.resources as Record<string, any> : {}
      })));
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast({
        title: "Error",
        description: "Failed to load project challenges",
        variant: "destructive",
      });
    }
  };

  // Fetch user progress for all challenges
  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const progressMap = new Map<string, UserChallengeProgress>();
      data?.forEach(progress => {
        progressMap.set(progress.challenge_id, {
          ...progress,
          progress_data: typeof progress.progress_data === 'object' && progress.progress_data ? progress.progress_data as Record<string, any> : {},
          completed_steps: progress.completed_steps || []
        });
      });
      setUserProgress(progressMap);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Start a new challenge
  const startChallenge = async (challengeId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start challenges",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_challenge_progress')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          current_step: 0,
          completed_steps: [],
          is_completed: false,
          progress_data: {}
        })
        .select()
        .single();

      if (error) {
        // If challenge already exists, fetch current progress
        if (error.code === '23505') {
          const { data: existingData, error: fetchError } = await supabase
            .from('user_challenge_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('challenge_id', challengeId)
            .single();

          if (fetchError) throw fetchError;
          return existingData;
        }
        throw error;
      }

      await fetchUserProgress();
      toast({
        title: "Challenge started!",
        description: "Good luck with your project challenge",
      });
      
      return data;
    } catch (error) {
      console.error('Error starting challenge:', error);
      toast({
        title: "Error",
        description: "Failed to start challenge",
        variant: "destructive",
      });
      return null;
    }
  };

  // Upload file for a step
  const uploadStepFile = async (challengeId: string, stepIndex: number, file: File) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${challengeId}/step-${stepIndex}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('challenge-submissions')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('challenge-submissions')
        .getPublicUrl(fileName);

      // Update progress with file submission
      const progress = userProgress.get(challengeId);
      if (!progress) return null;

      const stepSubmissions = progress.progress_data?.step_submissions || {};
      stepSubmissions[stepIndex] = {
        fileName: file.name,
        filePath: fileName,
        uploadedAt: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('user_challenge_progress')
        .update({ 
          progress_data: { 
            ...progress.progress_data,
            step_submissions: stepSubmissions 
          }
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (updateError) throw updateError;

      await fetchUserProgress();
      
      toast({
        title: "File uploaded!",
        description: "Your submission has been saved.",
      });

      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Complete a step in a challenge
  const completeStep = async (challengeId: string, stepIndex: number) => {
    if (!user) return false;

    try {
      const progress = userProgress.get(challengeId);
      if (!progress) return false;

      // Check if file is uploaded for this step
      const stepSubmissions = progress.progress_data?.step_submissions || {};
      if (!stepSubmissions[stepIndex]) {
        toast({
          title: "File required",
          description: "Please upload your work before completing this step.",
          variant: "destructive",
        });
        return false;
      }

      const newCompletedSteps = [...progress.completed_steps];
      if (!newCompletedSteps.includes(stepIndex)) {
        newCompletedSteps.push(stepIndex);
        newCompletedSteps.sort((a, b) => a - b);
      }

      const challenge = challenges.find(c => c.id === challengeId);
      const nextStep = Math.min(stepIndex + 1, challenge?.steps.length || 0);
      const isCompleted = newCompletedSteps.length === challenge?.steps.length;

      const updates: Partial<UserChallengeProgress> = {
        completed_steps: newCompletedSteps,
        current_step: isCompleted ? challenge?.steps.length || 0 : nextStep,
        is_completed: isCompleted,
        ...(isCompleted && { completed_at: new Date().toISOString() })
      };

      const { data, error } = await supabase
        .from('user_challenge_progress')
        .update(updates)
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .select()
        .single();

      if (error) throw error;

      await fetchUserProgress();
      
      if (isCompleted && challenge) {
        toast({
          title: "🎉 Challenge Completed!",
          description: `You earned ${challenge.xp_reward} XP for completing ${challenge.title}`,
        });
      } else {
        toast({
          title: "Step completed!",
          description: "Great progress! Keep going.",
        });
      }

      return true;
    } catch (error) {
      console.error('Error completing step:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
      return false;
    }
  };

  // Uncomplete a step (for fixing mistakes)
  const uncompleteStep = async (challengeId: string, stepIndex: number) => {
    if (!user) return false;

    try {
      const progress = userProgress.get(challengeId);
      if (!progress) return false;

      const newCompletedSteps = progress.completed_steps.filter(s => s !== stepIndex);
      const newCurrentStep = Math.max(0, Math.min(stepIndex, progress.current_step));

      const { data, error } = await supabase
        .from('user_challenge_progress')
        .update({
          completed_steps: newCompletedSteps,
          current_step: newCurrentStep,
          is_completed: false,
          completed_at: null
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .select()
        .single();

      if (error) throw error;

      await fetchUserProgress();
      return true;
    } catch (error) {
      console.error('Error uncompleting step:', error);
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update challenge notes
  const updateNotes = async (challengeId: string, notes: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_challenge_progress')
        .update({ notes })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (error) throw error;

      await fetchUserProgress();
      return true;
    } catch (error) {
      console.error('Error updating notes:', error);
      return false;
    }
  };

  // Get progress for a specific challenge
  const getChallengeProgress = (challengeId: string): UserChallengeProgress | null => {
    return userProgress.get(challengeId) || null;
  };

  // Get completion percentage for a challenge
  const getCompletionPercentage = (challengeId: string): number => {
    const progress = userProgress.get(challengeId);
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (!progress || !challenge) return 0;
    
    return Math.round((progress.completed_steps.length / challenge.steps.length) * 100);
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Subscribe to user progress changes
    const progressChannel = supabase
      .channel('user-challenge-progress')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_challenge_progress',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Challenge progress change:', payload);
          fetchUserProgress();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(progressChannel);
    };
  }, [user]);

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchChallenges();
      if (user) {
        await fetchUserProgress();
      }
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    challenges,
    userProgress,
    loading,
    activeChallenge,
    setActiveChallenge,
    startChallenge,
    completeStep,
    uncompleteStep,
    updateNotes,
    uploadStepFile,
    getChallengeProgress,
    getCompletionPercentage,
    refetchData: () => {
      fetchChallenges();
      if (user) {
        fetchUserProgress();
      }
    }
  };
};