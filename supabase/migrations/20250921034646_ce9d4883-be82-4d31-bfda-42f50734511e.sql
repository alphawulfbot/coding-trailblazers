-- Add sample lessons for existing courses
-- First, let's create sample lessons for courses if they exist
-- This will help with the empty course content issue

-- Sample lessons for a JavaScript fundamentals course
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, content)
SELECT 
    id as course_id,
    unnest(ARRAY['Introduction to JavaScript', 'Variables and Data Types', 'Functions and Scope', 'DOM Manipulation', 'Async Programming']) as title,
    unnest(ARRAY['Learn the basics of JavaScript programming', 'Understanding variables, strings, numbers, and booleans', 'Creating and using functions effectively', 'Interacting with HTML elements using JavaScript', 'Working with promises and async/await']) as description,
    unnest(ARRAY[1, 2, 3, 4, 5]) as order_index,
    unnest(ARRAY[25, 30, 35, 40, 45]) as xp_reward,
    unnest(ARRAY[20, 25, 30, 35, 40]) as duration_minutes,
    unnest(ARRAY[
        '{"sections": [{"type": "theory", "title": "What is JavaScript?", "content": "JavaScript is a programming language that enables interactive web pages."}, {"type": "practice", "title": "First JavaScript Code", "code": "console.log(''Hello, World!'');", "task": "Run this code in your browser console"}]}',
        '{"sections": [{"type": "theory", "title": "Variables", "content": "Variables store data values. Use let, const, or var to declare variables."}, {"type": "practice", "title": "Create Variables", "code": "let name = ''CodeHunter'';\nconst level = 1;\nvar score = 100;", "task": "Create your own variables"}]}',
        '{"sections": [{"type": "theory", "title": "Functions", "content": "Functions are reusable blocks of code that perform specific tasks."}, {"type": "practice", "title": "Create a Function", "code": "function greet(name) {\n  return ''Hello, '' + name + ''!'';\n}\n\nconsole.log(greet(''CodeHunter''));", "task": "Create and call your own function"}]}',
        '{"sections": [{"type": "theory", "title": "DOM Manipulation", "content": "The DOM allows JavaScript to interact with HTML elements on a webpage."}, {"type": "practice", "title": "Change Page Content", "code": "document.getElementById(''myElement'').textContent = ''Updated!'';", "task": "Use JavaScript to modify an HTML element"}]}',
        '{"sections": [{"type": "theory", "title": "Async Programming", "content": "Asynchronous programming allows code to run without blocking the main thread."}, {"type": "practice", "title": "Using Promises", "code": "fetch(''/api/data'')\n  .then(response => response.json())\n  .then(data => console.log(data));", "task": "Make an API call using fetch"}]}'
    ])::jsonb as content
FROM public.courses 
WHERE title ILIKE '%javascript%' OR title ILIKE '%js%' OR title ILIKE '%programming%'
LIMIT 1;

-- Sample lessons for a React course
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, content)
SELECT 
    id as course_id,
    unnest(ARRAY['React Basics', 'Components and JSX', 'State Management', 'Props and Events', 'Hooks Deep Dive']) as title,
    unnest(ARRAY['Introduction to React library', 'Building components with JSX syntax', 'Managing component state', 'Passing data between components', 'Using React hooks effectively']) as description,
    unnest(ARRAY[1, 2, 3, 4, 5]) as order_index,
    unnest(ARRAY[30, 35, 40, 45, 50]) as xp_reward,
    unnest(ARRAY[25, 30, 35, 40, 45]) as duration_minutes,
    unnest(ARRAY[
        '{"sections": [{"type": "theory", "title": "What is React?", "content": "React is a JavaScript library for building user interfaces with components."}, {"type": "practice", "title": "First React Component", "code": "function Welcome() {\n  return <h1>Hello, World!</h1>;\n}", "task": "Create your first React component"}]}',
        '{"sections": [{"type": "theory", "title": "JSX Syntax", "content": "JSX allows you to write HTML-like syntax in JavaScript."}, {"type": "practice", "title": "JSX Elements", "code": "const element = (\n  <div>\n    <h1>Welcome to React!</h1>\n    <p>Let''s build something amazing.</p>\n  </div>\n);", "task": "Create JSX elements with multiple tags"}]}',
        '{"sections": [{"type": "theory", "title": "Component State", "content": "State allows components to store and manage data that can change over time."}, {"type": "practice", "title": "useState Hook", "code": "import { useState } from ''react'';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}", "task": "Create a counter component with state"}]}',
        '{"sections": [{"type": "theory", "title": "Props", "content": "Props allow you to pass data from parent components to child components."}, {"type": "practice", "title": "Using Props", "code": "function Greeting({ name, age }) {\n  return <p>Hello {name}, you are {age} years old!</p>;\n}\n\n// Usage\n<Greeting name=''Alice'' age={25} />", "task": "Create a component that uses props"}]}',
        '{"sections": [{"type": "theory", "title": "React Hooks", "content": "Hooks let you use state and other React features in functional components."}, {"type": "practice", "title": "useEffect Hook", "code": "import { useState, useEffect } from ''react'';\n\nfunction Timer() {\n  const [seconds, setSeconds] = useState(0);\n  \n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1);\n    }, 1000);\n    \n    return () => clearInterval(interval);\n  }, []);\n  \n  return <div>Time: {seconds}s</div>;\n}", "task": "Use useEffect to create a timer"}]}'
    ])::jsonb as content
FROM public.courses 
WHERE title ILIKE '%react%' OR title ILIKE '%frontend%' OR title ILIKE '%web dev%'
LIMIT 1;

-- Create a complete JavaScript Fundamentals course if it doesn't exist
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, emoji, gradient, color, is_featured, is_published)
SELECT 
    'JavaScript Fundamentals',
    'Master the core concepts of JavaScript programming from variables to async programming',
    'Beginner',
    8,
    5,
    175,
    '⚡',
    'from-yellow-500 to-orange-500',
    'yellow',
    true,
    true
WHERE NOT EXISTS (
    SELECT 1 FROM public.courses WHERE title = 'JavaScript Fundamentals'
);

-- Create a React Essentials course if it doesn't exist
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, emoji, gradient, color, is_featured, is_published)
SELECT 
    'React Essentials',
    'Build modern user interfaces with React components, hooks, and state management',
    'Intermediate',
    12,
    5,
    225,
    '⚛️',
    'from-blue-500 to-cyan-500',
    'blue',
    true,
    true
WHERE NOT EXISTS (
    SELECT 1 FROM public.courses WHERE title = 'React Essentials'
);

-- Create a Python Basics course
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, emoji, gradient, color, is_featured, is_published)
SELECT 
    'Python Programming',
    'Learn Python from scratch with hands-on exercises and real-world projects',
    'Beginner',
    10,
    6,
    200,
    '🐍',
    'from-green-500 to-emerald-500',
    'green',
    true,
    true
WHERE NOT EXISTS (
    SELECT 1 FROM public.courses WHERE title = 'Python Programming'
);

-- Add lessons for Python course
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, content)
SELECT 
    c.id as course_id,
    unnest(ARRAY['Python Basics', 'Data Types & Variables', 'Control Flow', 'Functions', 'Object-Oriented Programming', 'File Handling']) as title,
    unnest(ARRAY['Introduction to Python programming', 'Working with strings, numbers, and lists', 'If statements, loops, and conditions', 'Creating reusable functions', 'Classes and objects in Python', 'Reading and writing files']) as description,
    unnest(ARRAY[1, 2, 3, 4, 5, 6]) as order_index,
    unnest(ARRAY[25, 30, 35, 40, 45, 25]) as xp_reward,
    unnest(ARRAY[30, 35, 40, 45, 50, 30]) as duration_minutes,
    unnest(ARRAY[
        '{"sections": [{"type": "theory", "title": "Welcome to Python", "content": "Python is a versatile, beginner-friendly programming language."}, {"type": "practice", "title": "First Python Program", "code": "print(\"Hello, World!\")\nprint(\"Welcome to Python programming!\")", "task": "Run your first Python program"}]}',
        '{"sections": [{"type": "theory", "title": "Variables and Data Types", "content": "Python supports various data types: strings, integers, floats, booleans, and lists."}, {"type": "practice", "title": "Working with Variables", "code": "name = \"CodeHunter\"\nage = 25\nscore = 95.5\nis_learning = True\nhobbies = [\"coding\", \"gaming\", \"reading\"]\n\nprint(f\"Name: {name}, Age: {age}\")", "task": "Create variables of different types"}]}',
        '{"sections": [{"type": "theory", "title": "Control Flow", "content": "Use if statements and loops to control program flow."}, {"type": "practice", "title": "Conditional Logic", "code": "score = 85\n\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelse:\n    grade = \"C\"\n\nprint(f\"Your grade is: {grade}\")", "task": "Create a grading system"}]}',
        '{"sections": [{"type": "theory", "title": "Functions", "content": "Functions help organize code into reusable blocks."}, {"type": "practice", "title": "Creating Functions", "code": "def calculate_xp(level, multiplier=1.5):\n    base_xp = level * 100\n    return int(base_xp * multiplier)\n\ndef greet_player(name, level):\n    xp = calculate_xp(level)\n    return f\"Welcome {name}! Level {level} ({xp} XP)\"\n\nresult = greet_player(\"CodeHunter\", 5)\nprint(result)", "task": "Create functions with parameters"}]}',
        '{"sections": [{"type": "theory", "title": "Classes and Objects", "content": "Object-oriented programming helps organize complex applications."}, {"type": "practice", "title": "Player Class", "code": "class Player:\n    def __init__(self, name, level=1):\n        self.name = name\n        self.level = level\n        self.xp = 0\n    \n    def gain_xp(self, points):\n        self.xp += points\n        if self.xp >= 100:\n            self.level += 1\n            self.xp = 0\n            print(f\"{self.name} leveled up to {self.level}!\")\n\nplayer = Player(\"CodeHunter\")\nplayer.gain_xp(150)", "task": "Create a Player class"}]}',
        '{"sections": [{"type": "theory", "title": "File Operations", "content": "Python can read from and write to files for data persistence."}, {"type": "practice", "title": "Save Game Data", "code": "import json\n\n# Save player data\nplayer_data = {\n    \"name\": \"CodeHunter\",\n    \"level\": 5,\n    \"xp\": 75,\n    \"achievements\": [\"First Steps\", \"Quick Learner\"]\n}\n\nwith open(\"player_save.json\", \"w\") as file:\n    json.dump(player_data, file, indent=2)\n\n# Load player data\nwith open(\"player_save.json\", \"r\") as file:\n    loaded_data = json.load(file)\n    print(f\"Loaded: {loaded_data[''name'']} - Level {loaded_data[''level'']}\")\"", "task": "Save and load game data to/from files"}]}'
    ])::jsonb as content
FROM public.courses c
WHERE c.title = 'Python Programming';