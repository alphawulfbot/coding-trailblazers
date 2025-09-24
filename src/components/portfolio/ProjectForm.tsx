import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { X, Plus } from 'lucide-react';
import { PortfolioProject, usePortfolio, CreatePortfolioProject } from '@/hooks/usePortfolio';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  demo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  status: z.enum(['development', 'completed', 'live', 'archived']),
  project_type: z.enum(['web', 'mobile', 'desktop', 'api', 'cli', 'other']),
  lines_of_code: z.number().min(0).max(1000000),
  completion_percentage: z.number().min(0).max(100),
  featured: z.boolean(),
  is_public: z.boolean()
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: PortfolioProject;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ProjectForm = ({ project, open, onClose, onSuccess }: ProjectFormProps) => {
  const { createProject, updateProject } = usePortfolio();
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack || []);
  const [newTech, setNewTech] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      github_url: project?.github_url || '',
      demo_url: project?.demo_url || '',
      image_url: project?.image_url || '',
      status: (project?.status as 'development' | 'completed' | 'live' | 'archived') || 'development',
      project_type: (project?.project_type as 'web' | 'mobile' | 'desktop' | 'api' | 'cli' | 'other') || 'web',
      lines_of_code: project?.lines_of_code || 0,
      completion_percentage: project?.completion_percentage || 0,
      featured: project?.featured || false,
      is_public: project?.is_public ?? true
    }
  });

  const completionPercentage = watch('completion_percentage');

  const handleAddTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    
    const projectData: CreatePortfolioProject = {
      title: data.title,
      description: data.description || null,
      tech_stack: techStack,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      image_url: data.image_url || null,
      status: data.status,
      project_type: data.project_type,
      lines_of_code: data.lines_of_code,
      completion_percentage: data.completion_percentage,
      featured: data.featured,
      is_public: data.is_public
    };

    try {
      if (project) {
        await updateProject(project.id, projectData);
      } else {
        await createProject(projectData);
      }
      
      reset();
      setTechStack([]);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setTechStack(project?.tech_stack || []);
    setNewTech('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="My Awesome Project"
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Brief description of your project..."
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <Select 
                defaultValue={project?.status || 'development'}
                onValueChange={(value) => setValue('status', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Project Type</Label>
              <Select 
                defaultValue={project?.project_type || 'web'}
                onValueChange={(value) => setValue('project_type', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web App</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="desktop">Desktop App</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="cli">CLI Tool</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <Label>Technology Stack</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology (e.g., React, Node.js)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
              />
              <Button type="button" variant="outline" onClick={handleAddTech}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTech(tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                {...register('github_url')}
                placeholder="https://github.com/username/repo"
              />
              {errors.github_url && (
                <p className="text-sm text-destructive mt-1">{errors.github_url.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="demo_url">Live Demo URL</Label>
              <Input
                id="demo_url"
                {...register('demo_url')}
                placeholder="https://myproject.com"
              />
              {errors.demo_url && (
                <p className="text-sm text-destructive mt-1">{errors.demo_url.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="image_url">Project Image URL</Label>
              <Input
                id="image_url"
                {...register('image_url')}
                placeholder="https://example.com/project-screenshot.jpg"
              />
              {errors.image_url && (
                <p className="text-sm text-destructive mt-1">{errors.image_url.message}</p>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="lines_of_code">Lines of Code</Label>
              <Input
                id="lines_of_code"
                type="number"
                {...register('lines_of_code', { valueAsNumber: true })}
                placeholder="1000"
              />
              {errors.lines_of_code && (
                <p className="text-sm text-destructive mt-1">{errors.lines_of_code.message}</p>
              )}
            </div>

            <div>
              <Label>Completion Percentage: {completionPercentage}%</Label>
              <Slider
                value={[completionPercentage]}
                onValueChange={(value) => setValue('completion_percentage', value[0])}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured Project</Label>
              <Switch
                id="featured"
                {...register('featured')}
                onCheckedChange={(checked) => setValue('featured', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_public">Make Public</Label>
              <Switch
                id="is_public"
                {...register('is_public')}
                onCheckedChange={(checked) => setValue('is_public', checked)}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};