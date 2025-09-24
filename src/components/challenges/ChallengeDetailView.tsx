import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Clock, 
  Star, 
  ExternalLink,
  FileText,
  Target,
  Award,
  BookOpen
} from 'lucide-react';
import { ProjectChallenge, useProjectChallenges, ChallengeStep } from '@/hooks/useProjectChallenges';

interface ChallengeDetailViewProps {
  challenge: ProjectChallenge;
  onBack: () => void;
}

export const ChallengeDetailView = ({ challenge, onBack }: ChallengeDetailViewProps) => {
  const { 
    getChallengeProgress, 
    getCompletionPercentage, 
    completeStep, 
    uncompleteStep,
    updateNotes
  } = useProjectChallenges();

  const progress = getChallengeProgress(challenge.id);
  const completionPercentage = getCompletionPercentage(challenge.id);
  const [notes, setNotes] = useState(progress?.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);

  const handleStepToggle = async (stepIndex: number) => {
    const isCompleted = progress?.completed_steps.includes(stepIndex) || false;
    
    if (isCompleted) {
      await uncompleteStep(challenge.id, stepIndex);
    } else {
      await completeStep(challenge.id, stepIndex);
    }
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await updateNotes(challenge.id, notes);
    setSavingNotes(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const isStepCompleted = (stepIndex: number) => {
    return progress?.completed_steps.includes(stepIndex) || false;
  };

  const isCurrentStep = (stepIndex: number) => {
    return progress?.current_step === stepIndex;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Challenges
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{challenge.icon}</span>
            <Badge className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
          <p className="text-muted-foreground mt-1">{challenge.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Challenge Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Challenge Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Duration: {challenge.duration_hours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>Reward: {challenge.xp_reward} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Category: {challenge.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Level: {challenge.difficulty}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Technologies you'll use:</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.tech_stack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {progress && (
                <>
                  <Separator />
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Your Progress</h4>
                      <span className="text-sm font-medium">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {progress.completed_steps.length} of {challenge.steps.length} steps completed
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Challenge Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge Steps</CardTitle>
              <CardDescription>
                Follow these steps to complete the challenge. Click on each step to mark it as complete.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.steps.map((step: ChallengeStep, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-sm ${
                    isStepCompleted(index) 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                      : isCurrentStep(index)
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800'
                        : 'bg-card'
                  }`}
                  onClick={() => handleStepToggle(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isStepCompleted(index) ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${isStepCompleted(index) ? 'line-through text-muted-foreground' : ''}`}>
                          Step {index + 1}: {step.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {step.estimated_time}min
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-3 ${isStepCompleted(index) ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {step.description}
                      </p>

                      {step.tasks && step.tasks.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-2">Tasks:</p>
                          <ul className="text-sm space-y-1">
                            {step.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                                <span className={isStepCompleted(index) ? 'text-muted-foreground' : ''}>
                                  {task}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.resources && step.resources.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Resources:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((resource, resourceIndex) => (
                              <a
                                key={resourceIndex}
                                href={resource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-3 w-3" />
                                Documentation
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {progress ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {completionPercentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Steps completed:</span>
                      <span className="font-medium">{progress.completed_steps.length}/{challenge.steps.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Started:</span>
                      <span className="font-medium">{new Date(progress.started_at).toLocaleDateString()}</span>
                    </div>
                    {progress.completed_at && (
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span className="font-medium text-green-600">{new Date(progress.completed_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {progress.is_completed && (
                    <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg text-center">
                      <div className="text-green-600 dark:text-green-400 font-medium text-sm">
                        🎉 Challenge Completed!
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-sm">
                        You earned {challenge.xp_reward} XP
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Challenge not started yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resources */}
          {challenge.resources && Object.keys(challenge.resources).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(challenge.resources).map(([key, value]) => (
                    <a
                      key={key}
                      href={value as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add your notes, thoughts, or code snippets here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
                disabled={savingNotes || notes === (progress?.notes || '')}
              >
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};