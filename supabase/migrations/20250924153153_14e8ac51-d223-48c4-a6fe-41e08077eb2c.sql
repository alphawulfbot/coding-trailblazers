-- Create project challenges table
CREATE TABLE public.project_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER DEFAULT 2,
  xp_reward INTEGER DEFAULT 100,
  icon TEXT DEFAULT '📝',
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]',
  resources JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user challenge progress table
CREATE TABLE public.user_challenge_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.project_challenges(id) ON DELETE CASCADE,
  current_step INTEGER DEFAULT 0,
  completed_steps INTEGER[] DEFAULT '{}',
  is_completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  progress_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE public.project_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_challenges
CREATE POLICY "Anyone can view active challenges" ON public.project_challenges
FOR SELECT USING (is_active = true);

-- RLS Policies for user_challenge_progress  
CREATE POLICY "Users can view their own progress" ON public.user_challenge_progress
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress" ON public.user_challenge_progress
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_challenge_progress
FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_project_challenges_active ON public.project_challenges(is_active);
CREATE INDEX idx_project_challenges_difficulty ON public.project_challenges(difficulty);
CREATE INDEX idx_user_challenge_progress_user_id ON public.user_challenge_progress(user_id);
CREATE INDEX idx_user_challenge_progress_challenge_id ON public.user_challenge_progress(challenge_id);

-- Create triggers for updated_at
CREATE TRIGGER update_project_challenges_updated_at
  BEFORE UPDATE ON public.project_challenges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_challenge_progress_updated_at
  BEFORE UPDATE ON public.user_challenge_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample project challenges
INSERT INTO public.project_challenges (title, description, difficulty, duration_hours, xp_reward, icon, tech_stack, category, steps, resources, order_index) VALUES 
(
  'Todo App with Authentication',
  'Build a full-stack todo application with user authentication and real-time updates',
  'beginner',
  3,
  200,
  '📝',
  ARRAY['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
  'Full Stack',
  '[
    {
      "title": "Set up project structure",
      "description": "Initialize a new React project with Vite and install required dependencies",
      "tasks": [
        "Create new Vite React project",
        "Install Supabase client",
        "Install Tailwind CSS",
        "Set up project folder structure"
      ],
      "estimated_time": 30,
      "resources": ["https://vitejs.dev/guide/", "https://supabase.com/docs"]
    },
    {
      "title": "Create todo components",
      "description": "Build the user interface components for the todo application",
      "tasks": [
        "Create TodoList component",
        "Create TodoItem component", 
        "Create AddTodo form component",
        "Style components with Tailwind"
      ],
      "estimated_time": 45,
      "resources": ["https://react.dev/learn"]
    },
    {
      "title": "Implement CRUD operations",
      "description": "Connect to Supabase and implement create, read, update, delete functionality",
      "tasks": [
        "Set up Supabase configuration",
        "Create todos table",
        "Implement add todo function",
        "Implement delete todo function",
        "Implement update todo function"
      ],
      "estimated_time": 60,
      "resources": ["https://supabase.com/docs/guides/database"]
    },
    {
      "title": "Add user authentication",
      "description": "Implement user signup, login, and session management",
      "tasks": [
        "Set up Supabase Auth",
        "Create login/signup components",
        "Implement auth context",
        "Add route protection"
      ],
      "estimated_time": 45,
      "resources": ["https://supabase.com/docs/guides/auth"]
    },
    {
      "title": "Deploy to production", 
      "description": "Deploy your completed application to a hosting platform",
      "tasks": [
        "Build production version",
        "Set up deployment on Vercel/Netlify", 
        "Configure environment variables",
        "Test production deployment"
      ],
      "estimated_time": 30,
      "resources": ["https://vercel.com/docs", "https://docs.netlify.com/"]
    }
  ]'::jsonb,
  '{"github_template": "https://github.com/example/todo-starter", "figma_design": "https://figma.com/example"}'::jsonb,
  1
),
(
  'Real-time Chat Application',
  'Create a real-time chat app with WebSocket integration and user presence',
  'intermediate', 
  5,
  350,
  '💬',
  ARRAY['React', 'WebSockets', 'Node.js', 'Express'],
  'Real-time',
  '[
    {
      "title": "Design chat interface",
      "description": "Create the user interface for the chat application",
      "tasks": [
        "Design chat room layout",
        "Create message components",
        "Build user list sidebar", 
        "Add typing indicators"
      ],
      "estimated_time": 60,
      "resources": ["https://reactjs.org/docs"]
    },
    {
      "title": "Set up WebSocket connection",
      "description": "Implement real-time communication using WebSockets",
      "tasks": [
        "Set up Socket.io server",
        "Connect client to WebSocket", 
        "Handle connection events",
        "Implement error handling"
      ],
      "estimated_time": 90,
      "resources": ["https://socket.io/docs/"]
    },
    {
      "title": "Implement message system",
      "description": "Build the core messaging functionality",
      "tasks": [
        "Send and receive messages",
        "Store message history",
        "Add message timestamps",
        "Implement message formatting"
      ],
      "estimated_time": 75,
      "resources": ["https://socket.io/docs/"]
    },
    {
      "title": "Add user presence",
      "description": "Show online users and typing indicators",
      "tasks": [
        "Track online users",
        "Show user status",
        "Add typing indicators",
        "Handle user disconnections"
      ],
      "estimated_time": 45,
      "resources": ["https://socket.io/docs/"]
    },
    {
      "title": "Create chat rooms",
      "description": "Allow users to join different chat rooms",
      "tasks": [
        "Implement room creation",
        "Handle room joining/leaving",
        "Separate message streams",
        "Add room management"
      ],
      "estimated_time": 60,
      "resources": ["https://socket.io/docs/rooms/"]
    }
  ]'::jsonb,
  '{"github_template": "https://github.com/example/chat-starter"}'::jsonb,
  2
),
(
  'E-commerce Platform',
  'Build a complete online store with product catalog, cart, and payment integration',
  'advanced',
  8, 
  500,
  '🛒',
  ARRAY['React', 'Stripe', 'PostgreSQL', 'Node.js'],
  'E-commerce',
  '[
    {
      "title": "Product catalog setup",
      "description": "Create the product browsing and search functionality",
      "tasks": [
        "Design product grid layout",
        "Implement product search",
        "Add category filtering",
        "Create product detail pages"
      ],
      "estimated_time": 120,
      "resources": ["https://stripe.com/docs"]
    },
    {
      "title": "Shopping cart functionality", 
      "description": "Build cart management and checkout flow",
      "tasks": [
        "Implement add to cart",
        "Create cart state management",
        "Build checkout process",
        "Add quantity management"
      ],
      "estimated_time": 90,
      "resources": ["https://redux-toolkit.js.org/"]
    },
    {
      "title": "Payment integration",
      "description": "Integrate Stripe for secure payment processing",
      "tasks": [
        "Set up Stripe account",
        "Implement payment forms",
        "Handle payment confirmation", 
        "Add webhook handling"
      ],
      "estimated_time": 120,
      "resources": ["https://stripe.com/docs/payments"]
    },
    {
      "title": "Order management",
      "description": "Build order tracking and management system",
      "tasks": [
        "Create order confirmation",
        "Implement order history",
        "Add order status tracking",
        "Build admin order view"
      ],
      "estimated_time": 90,
      "resources": ["https://stripe.com/docs/orders"]
    },
    {
      "title": "Admin dashboard",
      "description": "Create admin panel for managing products and orders",
      "tasks": [
        "Build product management",
        "Create analytics dashboard",
        "Add inventory tracking",
        "Implement user management"
      ],
      "estimated_time": 120,
      "resources": ["https://recharts.org/"]
    }
  ]'::jsonb,
  '{"stripe_docs": "https://stripe.com/docs", "admin_template": "https://github.com/example/admin-starter"}'::jsonb,
  3
);

-- Enable realtime
ALTER TABLE public.project_challenges REPLICA IDENTITY FULL;
ALTER TABLE public.user_challenge_progress REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.project_challenges;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_challenge_progress;