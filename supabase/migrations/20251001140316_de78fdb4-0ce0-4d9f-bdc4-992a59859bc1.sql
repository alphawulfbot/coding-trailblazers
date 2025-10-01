-- Create storage bucket for challenge submissions
INSERT INTO storage.buckets (id, name, public)
VALUES ('challenge-submissions', 'challenge-submissions', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for challenge submissions bucket
CREATE POLICY "Users can upload their own challenge submissions"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'challenge-submissions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own challenge submissions"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'challenge-submissions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own challenge submissions"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'challenge-submissions' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add step_submissions to user_challenge_progress
ALTER TABLE user_challenge_progress
ADD COLUMN IF NOT EXISTS step_submissions jsonb DEFAULT '{}'::jsonb;

-- Populate courses with complete content
INSERT INTO courses (id, title, description, difficulty, duration_hours, total_lessons, xp_reward, emoji, color, gradient, is_featured, is_published)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'HTML & CSS Fundamentals', 'Master the building blocks of the web. Learn HTML structure and CSS styling from scratch.', 'Beginner', 8, 12, 500, '🎨', '#FF6B6B', 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', true, true),
  ('550e8400-e29b-41d4-a716-446655440002', 'JavaScript Essentials', 'Learn JavaScript programming from basics to advanced concepts including ES6+ features.', 'Beginner', 12, 15, 700, '⚡', '#4ECDC4', 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)', true, true),
  ('550e8400-e29b-41d4-a716-446655440003', 'React Development', 'Build modern web applications with React. Learn components, hooks, and state management.', 'Intermediate', 16, 18, 900, '⚛️', '#9B59B6', 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)', true, true),
  ('550e8400-e29b-41d4-a716-446655440004', 'TypeScript Mastery', 'Add type safety to your JavaScript projects. Learn TypeScript from fundamentals to advanced types.', 'Intermediate', 10, 14, 800, '📘', '#3498DB', 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)', true, true),
  ('550e8400-e29b-41d4-a716-446655440005', 'Node.js Backend', 'Create powerful backend applications with Node.js. Learn Express, APIs, and databases.', 'Intermediate', 14, 16, 850, '🟢', '#27AE60', 'linear-gradient(135deg, #27AE60 0%, #229954 100%)', true, true),
  ('550e8400-e29b-41d4-a716-446655440006', 'Full Stack Development', 'Combine frontend and backend skills to build complete web applications end-to-end.', 'Advanced', 24, 25, 1500, '🚀', '#E74C3C', 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)', true, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  difficulty = EXCLUDED.difficulty,
  duration_hours = EXCLUDED.duration_hours,
  total_lessons = EXCLUDED.total_lessons,
  xp_reward = EXCLUDED.xp_reward,
  emoji = EXCLUDED.emoji,
  color = EXCLUDED.color,
  gradient = EXCLUDED.gradient,
  is_featured = EXCLUDED.is_featured;

-- Populate lessons for HTML & CSS course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, xp_reward, content)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Introduction to HTML', 'Learn the basics of HTML structure and elements', 1, 30, 40, '{"sections": [{"type": "text", "content": "HTML is the foundation of web development."}, {"type": "code", "content": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'HTML Elements & Tags', 'Master common HTML elements and their usage', 2, 40, 40, '{"sections": [{"type": "text", "content": "Learn about headings, paragraphs, links, and images."}, {"type": "code", "content": "<h1>Main Heading</h1>\n<p>This is a paragraph.</p>\n<a href=\"https://example.com\">Link</a>\n<img src=\"image.jpg\" alt=\"Description\">"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'CSS Basics', 'Introduction to styling with CSS', 3, 35, 45, '{"sections": [{"type": "text", "content": "CSS controls the visual presentation of HTML."}, {"type": "code", "content": "body {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'CSS Selectors', 'Learn different ways to select HTML elements', 4, 40, 45, '{"sections": [{"type": "text", "content": "Master class, ID, and element selectors."}, {"type": "code", "content": "/* Element selector */\np { color: blue; }\n\n/* Class selector */\n.highlight { background: yellow; }\n\n/* ID selector */\n#header { font-size: 24px; }"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'Flexbox Layout', 'Create flexible layouts with Flexbox', 5, 45, 50, '{"sections": [{"type": "text", "content": "Flexbox makes creating responsive layouts easy."}, {"type": "code", "content": ".container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.item {\n  flex: 1;\n  margin: 10px;\n}"}]}'::jsonb)
ON CONFLICT DO NOTHING;

-- Populate lessons for JavaScript course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, xp_reward, content)
VALUES
  ('550e8400-e29b-41d4-a716-446655440002', 'JavaScript Basics', 'Variables, data types, and operators', 1, 40, 45, '{"sections": [{"type": "text", "content": "Learn JavaScript fundamentals."}, {"type": "code", "content": "let name = \"John\";\nconst age = 25;\nlet isStudent = true;\n\nconsole.log(`${name} is ${age} years old`);"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440002', 'Functions', 'Creating and using functions', 2, 45, 50, '{"sections": [{"type": "text", "content": "Functions are reusable blocks of code."}, {"type": "code", "content": "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst add = (a, b) => a + b;\n\nconsole.log(greet(\"Alice\"));\nconsole.log(add(5, 3));"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440002', 'Arrays & Objects', 'Working with data structures', 3, 50, 55, '{"sections": [{"type": "text", "content": "Arrays and objects store collections of data."}, {"type": "code", "content": "const fruits = [\"apple\", \"banana\", \"orange\"];\nconst person = {\n  name: \"John\",\n  age: 30,\n  greet() {\n    return `Hi, I am ${this.name}`;\n  }\n};"}]}'::jsonb)
ON CONFLICT DO NOTHING;

-- Populate lessons for React course
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, xp_reward, content)
VALUES
  ('550e8400-e29b-41d4-a716-446655440003', 'React Fundamentals', 'Introduction to React and JSX', 1, 50, 60, '{"sections": [{"type": "text", "content": "React is a JavaScript library for building UIs."}, {"type": "code", "content": "function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default Welcome;"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440003', 'Components & Props', 'Creating reusable components', 2, 55, 65, '{"sections": [{"type": "text", "content": "Components accept props and return JSX."}, {"type": "code", "content": "function Card({ title, description }) {\n  return (\n    <div className=\"card\">\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </div>\n  );\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440003', 'State & Hooks', 'Managing component state', 3, 60, 70, '{"sections": [{"type": "text", "content": "useState hook manages component state."}, {"type": "code", "content": "import { useState } from \"react\";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}"}]}'::jsonb)
ON CONFLICT DO NOTHING;