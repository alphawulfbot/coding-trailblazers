import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Github, 
  ExternalLink, 
  Heart, 
  Eye, 
  Edit, 
  Trash2, 
  Share2,
  Code,
  Calendar
} from 'lucide-react';
import { PortfolioProject, usePortfolio } from '@/hooks/usePortfolio';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface PortfolioProjectCardProps {
  project: PortfolioProject;
  isOwner?: boolean;
  onEdit?: (project: PortfolioProject) => void;
  showStats?: boolean;
}

export const PortfolioProjectCard = ({ 
  project, 
  isOwner = false, 
  onEdit,
  showStats = true 
}: PortfolioProjectCardProps) => {
  const { user } = useAuth();
  const { deleteProject, toggleProjectLike, incrementProjectViews, userLikes } = usePortfolio();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'development': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'desktop': return '💻';
      case 'api': return '🔌';
      case 'cli': return '⌨️';
      default: return '📦';
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like projects",
        variant: "destructive"
      });
      return;
    }

    setIsLiking(true);
    await toggleProjectLike(project.id);
    setIsLiking(false);
  };

  const handleViewProject = () => {
    incrementProjectViews(project.id);
    if (project.demo_url) {
      window.open(project.demo_url, '_blank');
    }
  };

  const handleViewCode = () => {
    if (project.github_url) {
      window.open(project.github_url, '_blank');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setIsDeleting(true);
    const success = await deleteProject(project.id);
    if (success) {
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    }
    setIsDeleting(false);
  };

  const handleShare = async () => {
    if (navigator.share && project.demo_url) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: project.demo_url
        });
      } catch (error) {
        console.log('Share canceled or failed');
      }
    } else if (project.demo_url) {
      try {
        await navigator.clipboard.writeText(project.demo_url);
        toast({
          title: "Link copied",
          description: "Project URL copied to clipboard"
        });
      } catch (error) {
        console.error('Failed to copy link');
      }
    }
  };

  const isLiked = userLikes.has(project.id);

  return (
    <Card className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-all duration-300 group">
      {project.featured && (
        <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded-bl-lg">
          Featured
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getProjectTypeIcon(project.project_type)}</div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {project.title}
                <Badge className={getStatusColor(project.status)} variant="secondary">
                  {project.status}
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                {project.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Progress Bar */}
        {project.completion_percentage > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.completion_percentage}%</span>
            </div>
            <Progress value={project.completion_percentage} className="h-2" />
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{project.views_count} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{project.likes_count} likes</span>
            </div>
            {project.lines_of_code > 0 && (
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span>{project.lines_of_code.toLocaleString()} lines</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {project.demo_url && (
              <Button 
                size="sm" 
                onClick={handleViewProject}
                className="bg-primary hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Button>
            )}
            {project.github_url && (
              <Button size="sm" variant="outline" onClick={handleViewCode}>
                <Github className="h-4 w-4 mr-1" />
                Code
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLike}
              disabled={isLiking}
              className={isLiked ? 'text-red-500 hover:text-red-600' : ''}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button size="sm" variant="ghost" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>

            {isOwner && (
              <>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => onEdit?.(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};