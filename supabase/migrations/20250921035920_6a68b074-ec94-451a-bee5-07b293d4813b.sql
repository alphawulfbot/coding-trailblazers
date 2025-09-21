-- Seed language tutorials and project tutorials, plus courses with lessons
-- Create language tutorials (tagged type:language)
INSERT INTO public.tutorials (title, description, content, difficulty, category, tags, duration_minutes, xp_reward, order_index, is_published)
SELECT t.title, t.description, t.content::jsonb, t.difficulty, t.category, t.tags::text[], t.duration_minutes, t.xp_reward, t.order_index, true
FROM (
  VALUES
    ('JavaScript Basics: Variables & Types', 'Learn JS variables, types, and basic operations', '{"sections":[{"type":"theory","title":"Variables","content":"let, const, var"},{"type":"practice","title":"Try it","code":"let x=5; const y=10;"}]}', 'Beginner', 'Languages', ARRAY['type:language','javascript'], 20, 25, 1),
    ('Python Basics: Syntax & Data Types', 'Start Python with syntax and data types', '{"sections":[{"type":"theory","title":"Syntax","content":"Indentation matters"},{"type":"practice","title":"Try it","code":"x = 5\nprint(x)"}]}', 'Beginner', 'Languages', ARRAY['type:language','python'], 20, 25, 2),
    ('TypeScript Essentials: Types & Interfaces', 'Add types to JavaScript with TS', '{"sections":[{"type":"theory","title":"Types","content":"Primitives and interfaces"}]}', 'Intermediate', 'Languages', ARRAY['type:language','typescript'], 25, 30, 3),
    ('React Components 101', 'Understand function components and props', '{"sections":[{"type":"theory","title":"Components","content":"Props and state"}]}', 'Beginner', 'Languages', ARRAY['type:language','react'], 25, 30, 4)
) AS t(title, description, content, difficulty, category, tags, duration_minutes, xp_reward, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM public.tutorials existing WHERE existing.title = t.title
);

-- Create project-building tutorials (tagged type:project)
INSERT INTO public.tutorials (title, description, content, difficulty, category, tags, duration_minutes, xp_reward, order_index, is_published)
SELECT t.title, t.description, t.content::jsonb, t.difficulty, t.category, t.tags::text[], t.duration_minutes, t.xp_reward, t.order_index, true
FROM (
  VALUES
    ('Build a Todo App (React + Supabase)', 'End-to-end todo app with auth and CRUD', '{"sections":[{"type":"steps","title":"Setup","content":"Vite + Supabase"}]}', 'Beginner', 'Projects', ARRAY['type:project','react','supabase'], 40, 60, 1),
    ('Build a Portfolio Website', 'Create a responsive developer portfolio', '{"sections":[{"type":"steps","title":"Design","content":"Responsive layout"}]}', 'Beginner', 'Projects', ARRAY['type:project','html','css'], 30, 40, 2),
    ('Build a Realtime Chat App', 'WebSocket chat with rooms and presence', '{"sections":[{"type":"steps","title":"Realtime","content":"Messages and rooms"}]}', 'Intermediate', 'Projects', ARRAY['type:project','react'], 60, 80, 3)
) AS t(title, description, content, difficulty, category, tags, duration_minutes, xp_reward, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM public.tutorials existing WHERE existing.title = t.title
);

-- Seed courses
-- Helper: upsert-like insert by title
-- Course 1: JavaScript Mastery
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'JavaScript Mastery', 'From fundamentals to modern JS patterns', 'Beginner', 12, 5, 400, true, true, '🟨', 'from-yellow-500 to-amber-500', 'yellow'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'JavaScript Mastery');

-- Course 2: React Fundamentals
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'React Fundamentals', 'Build interactive UIs with components and hooks', 'Intermediate', 14, 5, 500, true, true, '⚛️', 'from-cyan-500 to-blue-500', 'cyan'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'React Fundamentals');

-- Course 3: TypeScript Essentials
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'TypeScript Essentials', 'Type-safe JavaScript for scalable apps', 'Intermediate', 10, 5, 450, true, true, '🧩', 'from-indigo-500 to-violet-500', 'indigo'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'TypeScript Essentials');

-- Course 4: Node.js Basics
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'Node.js Basics', 'Server-side JavaScript fundamentals', 'Beginner', 9, 5, 400, false, true, '🟩', 'from-emerald-500 to-teal-500', 'emerald'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'Node.js Basics');

-- Course 5: Python for Beginners
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'Python for Beginners', 'Start coding with Python the right way', 'Beginner', 11, 5, 420, false, true, '🐍', 'from-green-500 to-lime-500', 'green'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'Python for Beginners');

-- Course 6: Database Basics
INSERT INTO public.courses (title, description, difficulty, duration_hours, total_lessons, xp_reward, is_featured, is_published, emoji, gradient, color)
SELECT 'Database Basics', 'Relational databases, SQL and modeling', 'Beginner', 8, 5, 380, false, true, '🗄️', 'from-sky-500 to-indigo-500', 'sky'
WHERE NOT EXISTS (SELECT 1 FROM public.courses c WHERE c.title = 'Database Basics');

-- Insert lessons for each course (5 per course)
-- JavaScript Mastery lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true,
       l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Variables and Types', 'Learn let, const, primitives and objects', 1, 30, 20, '{"content":"Variables store data.","codeExample":"let x=1; const y=2;","keyPoints":["let vs const","Primitive types"],"exercises":[{"type":"code","prompt":"Create variables","solution":"let a=1; const b=2;"}]}'),
    ('Functions and Scope', 'Function declarations, expressions and scope', 2, 40, 25, '{"content":"Functions are reusable.","codeExample":"function add(a,b){return a+b}","keyPoints":["Scope","Hoisting"],"exercises":[{"type":"code","prompt":"Write add","solution":"function add(a,b){return a+b}"}]}'),
    ('Arrays and Objects', 'Data structures and common methods', 3, 40, 30, '{"content":"Work with arrays and objects.","codeExample":"const arr=[1,2]; const o={a:1};","keyPoints":["map/filter","Destructuring"],"exercises":[{"type":"code","prompt":"Map array","solution":"[1,2,3].map(x=>x*2)"}]}'),
    ('Asynchronous JS', 'Promises, async/await and fetch', 4, 50, 30, '{"content":"Async patterns.","codeExample":"await fetch('/api')","keyPoints":["Promise","await"],"exercises":[{"type":"code","prompt":"Use fetch","solution":"await fetch(url)"}]}'),
    ('Modules', 'Import/export and bundling basics', 5, 40, 20, '{"content":"ES modules.","codeExample":"export const x=1","keyPoints":["import/export"],"exercises":[{"type":"code","prompt":"Export function","solution":"export function f(){}"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'JavaScript Mastery'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);

-- React Fundamentals lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true, l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Components & JSX', 'Building blocks of React', 1, 50, 25, '{"content":"JSX and components.","codeExample":"function Hello(){return <h1>Hello</h1>}" ,"keyPoints":["JSX","Props"],"exercises":[{"type":"code","prompt":"Create component","solution":"function C(){return <div/>}"}]}'),
    ('State & Props', 'Data flow and state updates', 2, 60, 30, '{"content":"useState and props.","codeExample":"const [c,setC]=useState(0)","keyPoints":["Immutable state"],"exercises":[{"type":"code","prompt":"Counter","solution":"setC(c+1)"}]}'),
    ('Effects & Data Fetching', 'useEffect and fetching APIs', 3, 60, 30, '{"content":"useEffect basics.","codeExample":"useEffect(()=>{},[])" ,"keyPoints":["Deps array"],"exercises":[{"type":"code","prompt":"Fetch data","solution":"fetch(url)"}]}'),
    ('Routing', 'Single Page App navigation', 4, 40, 20, '{"content":"react-router basics","codeExample":"<Route/>","keyPoints":["Routes"],"exercises":[{"type":"code","prompt":"Create route","solution":"/about"}]}'),
    ('Forms & Validation', 'Controlled inputs and validation', 5, 50, 30, '{"content":"Forms","codeExample":"<input value={v}/>","keyPoints":["Controlled input"],"exercises":[{"type":"code","prompt":"Build form","solution":"onSubmit"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'React Fundamentals'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);

-- TypeScript Essentials lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true, l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Types & Interfaces', 'Core types, interfaces and aliases', 1, 50, 25, '{"content":"Primitives, interfaces.","codeExample":"interface User{ id:number }","keyPoints":["Type vs Interface"],"exercises":[{"type":"code","prompt":"Define type","solution":"type Id=number"}]}'),
    ('Generics', 'Reusable components with generics', 2, 60, 30, '{"content":"Generics.","codeExample":"function id<T>(x:T):T{return x}","keyPoints":["T parameter"],"exercises":[{"type":"code","prompt":"Generic fn","solution":"function id<T>(x:T){return x}"}]}'),
    ('Narrowing', 'Type guards and narrowing', 3, 50, 25, '{"content":"Narrowing.","codeExample":"if(typeof x==='string'){}","keyPoints":["in","instanceof"],"exercises":[{"type":"code","prompt":"Guard","solution":"typeof"}]}'),
    ('React + TS', 'Typing props and hooks', 4, 60, 30, '{"content":"React TS.","codeExample":"type Props={title:string}" ,"keyPoints":["FC Props"],"exercises":[{"type":"code","prompt":"Type props","solution":"{title:string}"}]}'),
    ('TS Tooling', 'tsconfig, eslint, and build', 5, 40, 20, '{"content":"Tooling.","codeExample":"tsc --init","keyPoints":["Strict mode"],"exercises":[{"type":"code","prompt":"Init TS","solution":"tsc --init"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'TypeScript Essentials'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);

-- Node.js Basics lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true, l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Intro to Node', 'Runtime and module system', 1, 40, 20, '{"content":"Node runtime.","codeExample":"console.log(''hi'')","keyPoints":["CommonJS vs ESM"],"exercises":[{"type":"code","prompt":"Print","solution":"console.log(''hi'')"}]}'),
    ('HTTP Servers', 'Build a simple API', 2, 50, 30, '{"content":"http module.","codeExample":"http.createServer(...)" ,"keyPoints":["req/res"],"exercises":[{"type":"code","prompt":"Hello API","solution":"/hello"}]}'),
    ('Express Basics', 'Routing and middleware', 3, 50, 30, '{"content":"Express.","codeExample":"app.get('/'')","keyPoints":["Middleware"],"exercises":[{"type":"code","prompt":"Create route","solution":"app.get"}]}'),
    ('Data & Auth', 'Persist data and handle auth', 4, 60, 35, '{"content":"Data & auth.","codeExample":"JWT","keyPoints":["Sessions vs JWT"],"exercises":[{"type":"code","prompt":"Login","solution":"/login"}]}'),
    ('Deploy', 'Prepare and deploy', 5, 40, 20, '{"content":"Deploy.","codeExample":"Dockerfile","keyPoints":["Env vars"],"exercises":[{"type":"code","prompt":"Dockerfile","solution":"FROM node"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'Node.js Basics'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);

-- Python for Beginners lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true, l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Syntax & Variables', 'Start with Python syntax', 1, 40, 20, '{"content":"Syntax.","codeExample":"x=1","keyPoints":["Indentation"],"exercises":[{"type":"code","prompt":"Assign","solution":"x=1"}]}'),
    ('Data Structures', 'Lists, dicts, and sets', 2, 50, 25, '{"content":"Structures.","codeExample":"[1,2]; {""a"":1}","keyPoints":["List vs tuple"],"exercises":[{"type":"code","prompt":"Dict","solution":"{""a"":1}"}]}'),
    ('Functions', 'Define and call functions', 3, 50, 25, '{"content":"Functions.","codeExample":"def f(x): return x","keyPoints":["Args"],"exercises":[{"type":"code","prompt":"Write f","solution":"def f(x): return x"}]}'),
    ('Modules & Packages', 'Import and venv', 4, 40, 20, '{"content":"Modules.","codeExample":"import math","keyPoints":["venv"],"exercises":[{"type":"code","prompt":"Import","solution":"import os"}]}'),
    ('Files & Errors', 'Read/write files, exceptions', 5, 50, 30, '{"content":"Files.","codeExample":"open(''f'')","keyPoints":["try/except"],"exercises":[{"type":"code","prompt":"Open file","solution":"with open(''f'') as f:"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'Python for Beginners'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);

-- Database Basics lessons
INSERT INTO public.lessons (course_id, title, description, order_index, xp_reward, duration_minutes, is_published, content)
SELECT c.id, l.title, l.description, l.order_index, l.xp_reward, l.duration_minutes, true, l.content::jsonb
FROM public.courses c
JOIN (
  VALUES
    ('Relational Concepts', 'Tables, rows, keys', 1, 40, 20, '{"content":"Relational model.","codeExample":"CREATE TABLE" ,"keyPoints":["PK/FK"],"exercises":[{"type":"code","prompt":"Create table","solution":"CREATE TABLE"}]}'),
    ('SQL Select', 'Query data with SELECT', 2, 50, 25, '{"content":"SELECT.","codeExample":"SELECT * FROM t","keyPoints":["WHERE"],"exercises":[{"type":"code","prompt":"Filter","solution":"WHERE"}]}'),
    ('Joins', 'Inner/left joins', 3, 50, 25, '{"content":"Joins.","codeExample":"JOIN","keyPoints":["INNER vs LEFT"],"exercises":[{"type":"code","prompt":"Join tables","solution":"JOIN"}]}'),
    ('Indexes', 'Speed up queries', 4, 40, 20, '{"content":"Indexes.","codeExample":"CREATE INDEX","keyPoints":["B-Tree"],"exercises":[{"type":"code","prompt":"Add index","solution":"CREATE INDEX"}]}'),
    ('Transactions', 'ACID and transactions', 5, 50, 25, '{"content":"Transactions.","codeExample":"BEGIN; COMMIT;","keyPoints":["ACID"],"exercises":[{"type":"code","prompt":"Use tx","solution":"BEGIN"}]}')
) AS l(title, description, order_index, xp_reward, duration_minutes, content)
ON TRUE
WHERE c.title = 'Database Basics'
AND NOT EXISTS (
  SELECT 1 FROM public.lessons el WHERE el.course_id = c.id AND el.title = l.title
);
