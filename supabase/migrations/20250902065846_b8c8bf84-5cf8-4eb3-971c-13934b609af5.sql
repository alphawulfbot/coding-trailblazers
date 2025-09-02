-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
  duration_hours INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  xp_reward INTEGER DEFAULT 0,
  emoji TEXT,
  color TEXT,
  gradient TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lessons/quests table
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB, -- Will store rich content, exercises, code snippets
  order_index INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 10,
  duration_minutes INTEGER DEFAULT 30,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user course enrollments
CREATE TABLE public.user_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Create user lesson progress
CREATE TABLE public.user_lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE,
  xp_earned INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  UNIQUE(user_id, lesson_id)
);

-- Create achievements/badges table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  xp_reward INTEGER DEFAULT 0,
  requirement_type TEXT CHECK (requirement_type IN ('course_complete', 'lessons_complete', 'streak', 'xp_milestone')) NOT NULL,
  requirement_value INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user achievements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for courses
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true);

-- Create RLS policies for lessons
CREATE POLICY "Anyone can view published lessons" ON public.lessons FOR SELECT USING (is_published = true);

-- Create RLS policies for user courses
CREATE POLICY "Users can view their own enrollments" ON public.user_courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON public.user_courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own enrollments" ON public.user_courses FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for user lesson progress
CREATE POLICY "Users can view their own progress" ON public.user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own progress" ON public.user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.user_lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for achievements
CREATE POLICY "Anyone can view active achievements" ON public.achievements FOR SELECT USING (is_active = true);

-- Create RLS policies for user achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn achievements" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample courses data
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, emoji, color, gradient, is_featured) VALUES
('Python Fundamentals', 'Master the basics of Python programming with hands-on exercises and real-world projects.', 'Beginner', 20, 15, 200, '🐍', 'emerald', 'from-emerald-500 to-teal-600', true),
('JavaScript Essentials', 'Learn JavaScript from scratch and build interactive web applications.', 'Beginner', 25, 18, 250, '⚡', 'yellow', 'from-yellow-500 to-orange-600', true),
('HTML & CSS Mastery', 'Create beautiful, responsive websites with modern HTML and CSS techniques.', 'Beginner', 15, 12, 150, '🎨', 'pink', 'from-pink-500 to-rose-600', true),
('React Development', 'Build modern web applications with React and learn component-based architecture.', 'Intermediate', 30, 22, 300, '⚛️', 'blue', 'from-blue-500 to-indigo-600', true),
('Java Programming', 'Dive into object-oriented programming with Java and build robust applications.', 'Intermediate', 35, 25, 350, '☕', 'orange', 'from-orange-500 to-red-600', false),
('C++ Fundamentals', 'Learn the powerful C++ language and master memory management and performance.', 'Advanced', 40, 30, 400, '🔧', 'gray', 'from-gray-500 to-slate-600', false);

-- Insert sample lessons for Python course
INSERT INTO public.lessons (course_id, title, description, content, order_index, xp_reward, duration_minutes) 
SELECT 
  c.id,
  lesson_data.title,
  lesson_data.description,
  lesson_data.content::jsonb,
  lesson_data.order_index,
  lesson_data.xp_reward,
  lesson_data.duration_minutes
FROM public.courses c
CROSS JOIN (
  VALUES
    ('Introduction to Python', 'Get started with Python syntax and your first program', '{"type": "lesson", "content": "Welcome to Python! Let''s write your first program.", "exercises": [{"type": "code", "prompt": "Write a program that prints Hello, World!", "solution": "print(''Hello, World!'')"}]}', 1, 15, 30),
    ('Variables and Data Types', 'Learn about different data types and how to work with variables', '{"type": "lesson", "content": "Variables store data that can be used throughout your program.", "exercises": [{"type": "code", "prompt": "Create a variable called name and assign it your name", "solution": "name = ''Your Name''"}]}', 2, 20, 45),
    ('Control Structures', 'Master if statements, loops, and conditional logic', '{"type": "lesson", "content": "Control structures help you make decisions in your code.", "exercises": [{"type": "code", "prompt": "Write an if statement that checks if a number is positive", "solution": "if number > 0:\\n    print(''Positive'')"}]}', 3, 25, 60),
    ('Functions and Modules', 'Create reusable code with functions and organize with modules', '{"type": "lesson", "content": "Functions allow you to organize and reuse your code.", "exercises": [{"type": "code", "prompt": "Create a function that adds two numbers", "solution": "def add_numbers(a, b):\\n    return a + b"}]}', 4, 30, 75),
    ('Lists and Dictionaries', 'Work with Python''s powerful data structures', '{"type": "lesson", "content": "Lists and dictionaries are essential data structures in Python.", "exercises": [{"type": "code", "prompt": "Create a list of your favorite foods", "solution": "foods = [''pizza'', ''sushi'', ''tacos'']"}]}', 5, 25, 60)
) AS lesson_data(title, description, content, order_index, xp_reward, duration_minutes)
WHERE c.title = 'Python Fundamentals';

-- Insert sample achievements
INSERT INTO public.achievements (title, description, icon, color, xp_reward, requirement_type, requirement_value) VALUES
('First Steps', 'Complete your first lesson', '👶', 'blue', 50, 'lessons_complete', 1),
('Getting Started', 'Complete 5 lessons', '🌟', 'green', 100, 'lessons_complete', 5),
('Dedicated Learner', 'Complete 10 lessons', '📚', 'purple', 200, 'lessons_complete', 10),
('Course Champion', 'Complete your first course', '🏆', 'gold', 500, 'course_complete', 1),
('Streak Master', 'Maintain a 7-day learning streak', '🔥', 'red', 300, 'streak', 7),
('XP Collector', 'Earn 1000 XP', '💎', 'cyan', 250, 'xp_milestone', 1000);