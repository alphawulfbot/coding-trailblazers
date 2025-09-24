import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Star, Play, CheckCircle, ArrowRight } from 'lucide-react';
import { ProjectChallenge, useProjectChallenges } from '@/hooks/useProjectChallenges';
import { useAuth } from '@/hooks/useAuth';

interface ProjectChallengeCardProps {
  challenge: ProjectChallenge;
  onStartChallenge?: (challenge: ProjectChallenge) => void;
}

export const ProjectChallengeCard = ({ challenge, onStartChallenge }: ProjectChallengeCardProps) => {
  const { user } = useAuth();
  const { getChallengeProgress, getCompletionPercentage, startChallenge } = useProjectChallenges();

  const progress = getChallengeProgress(challenge.id);
  const completionPercentage = getCompletionPercentage(challenge.id);
  const isStarted = !!progress;
  const isCompleted = progress?.is_completed || false;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleStart = async () => {
    if (!user) return;
    
    if (isStarted) {
      onStartChallenge?.(challenge);
    } else {
      const result = await startChallenge(challenge.id);
      if (result) {
        onStartChallenge?.(challenge);
      }
    }
  };

  return (
    <Card className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-all duration-300 group">
      {isCompleted && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-bl-lg">
          ✓ Completed
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-3xl mb-2">{challenge.icon}</div>
          <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
            {challenge.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-xl text-foreground">{challenge.title}</CardTitle>
        <CardDescription className="text-sm">{challenge.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1">
          {challenge.tech_stack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Duration and XP */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {challenge.duration_hours}h
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {challenge.xp_reward} XP
          </div>
        </div>

        {/* Progress */}
        {isStarted && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress?.completed_steps.length || 0}/{challenge.steps.length} steps</span>
              {isCompleted && (
                <span className="text-green-600 font-medium">
                  Completed {progress?.completed_at ? new Date(progress.completed_at).toLocaleDateString() : ''}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Steps Preview */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Challenge Steps:</p>
          <div className="space-y-1">
            {challenge.steps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div className={`h-2 w-2 rounded-full ${
                  progress?.completed_steps.includes(index) 
                    ? 'bg-green-500' 
                    : index === progress?.current_step 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300'
                }`} />
                <span className={progress?.completed_steps.includes(index) ? 'line-through text-muted-foreground' : ''}>
                  {step.title}
                </span>
              </div>
            ))}
            {challenge.steps.length > 3 && (
              <div className="text-xs text-muted-foreground pl-4">
                +{challenge.steps.length - 3} more steps
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-all"
          onClick={handleStart}
          disabled={!user}
        >
          {!user ? (
            <>Sign in to start</>
          ) : isCompleted ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Review Challenge
            </>
          ) : isStarted ? (
            <>
              <ArrowRight className="h-4 w-4 mr-2" />
              Continue Challenge
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Challenge
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};