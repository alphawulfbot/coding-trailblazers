-- Add more project challenges with complete information
INSERT INTO project_challenges (
  id, title, description, difficulty, duration_hours, xp_reward, 
  icon, tech_stack, category, steps, resources, is_active, order_index
) VALUES 
  -- Weather App Challenge
  (
    'c3f8b6e0-e29b-41d4-a716-446655440004',
    'Weather Dashboard App',
    'Build a beautiful weather application that shows current weather and forecasts using a weather API',
    'beginner',
    4,
    150,
    '🌤️',
    ARRAY['HTML', 'CSS', 'JavaScript', 'API'],
    'Frontend',
    '[
      {
        "title": "Set up project structure",
        "description": "Create HTML file with basic structure and link CSS and JavaScript files",
        "tasks": ["Create index.html", "Create styles.css", "Create app.js", "Link all files"],
        "estimated_time": 20,
        "resources": ["https://developer.mozilla.org/en-US/docs/Learn/HTML"]
      },
      {
        "title": "Build the UI",
        "description": "Design weather card layout with search bar and display sections",
        "tasks": ["Create search input", "Add weather display card", "Style with CSS", "Make responsive"],
        "estimated_time": 40,
        "resources": ["https://developer.mozilla.org/en-US/docs/Web/CSS"]
      },
      {
        "title": "Integrate Weather API",
        "description": "Connect to OpenWeatherMap API and fetch weather data",
        "tasks": ["Get API key", "Write fetch function", "Handle API response", "Display weather data"],
        "estimated_time": 60,
        "resources": ["https://openweathermap.org/api"]
      },
      {
        "title": "Add forecast feature",
        "description": "Show 5-day weather forecast with icons",
        "tasks": ["Fetch forecast data", "Create forecast cards", "Display temperature trends", "Add weather icons"],
        "estimated_time": 50,
        "resources": ["https://openweathermap.org/forecast5"]
      }
    ]'::jsonb,
    '{"documentation": "https://openweathermap.org/api", "tutorial": "https://www.youtube.com/watch?v=WZNG8UomjSI"}'::jsonb,
    true,
    4
  ),
  
  -- Portfolio Website Challenge
  (
    'c3f8b6e0-e29b-41d4-a716-446655440005',
    'Personal Portfolio Website',
    'Create a professional portfolio website to showcase your projects and skills',
    'beginner',
    6,
    200,
    '💼',
    ARRAY['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    'Frontend',
    '[
      {
        "title": "Design layout structure",
        "description": "Plan sections: Hero, About, Projects, Skills, Contact",
        "tasks": ["Create wireframe", "Choose color scheme", "Select fonts", "Plan navigation"],
        "estimated_time": 30,
        "resources": ["https://www.figma.com"]
      },
      {
        "title": "Build Hero section",
        "description": "Create attractive landing section with your name and tagline",
        "tasks": ["Add hero background", "Create headline", "Add CTA button", "Make responsive"],
        "estimated_time": 45,
        "resources": ["https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexbox"]
      },
      {
        "title": "Create Projects showcase",
        "description": "Display your best projects with images and descriptions",
        "tasks": ["Design project cards", "Add project images", "Write descriptions", "Link to live demos"],
        "estimated_time": 60,
        "resources": ["https://css-tricks.com/snippets/css/a-guide-to-flexbox/"]
      },
      {
        "title": "Add Skills section",
        "description": "Show your technical skills with visual elements",
        "tasks": ["List technologies", "Create skill badges", "Add icons", "Animate on scroll"],
        "estimated_time": 40,
        "resources": ["https://fontawesome.com"]
      },
      {
        "title": "Build Contact form",
        "description": "Create functional contact form with validation",
        "tasks": ["Design form layout", "Add form fields", "Write validation", "Handle submission"],
        "estimated_time": 45,
        "resources": ["https://developer.mozilla.org/en-US/docs/Learn/Forms"]
      }
    ]'::jsonb,
    '{"inspiration": "https://www.awwwards.com/websites/portfolio/", "tutorial": "https://www.youtube.com/watch?v=lvYnfMOUOJY"}'::jsonb,
    true,
    5
  ),
  
  -- Quiz App Challenge
  (
    'c3f8b6e0-e29b-41d4-a716-446655440006',
    'Interactive Quiz Application',
    'Build a quiz app with multiple choice questions, scoring, and timer',
    'intermediate',
    5,
    250,
    '❓',
    ARRAY['React', 'TypeScript', 'State Management'],
    'Frontend',
    '[
      {
        "title": "Set up React project",
        "description": "Initialize React app with TypeScript and organize folder structure",
        "tasks": ["Create React app", "Install TypeScript", "Set up folder structure", "Configure tsconfig"],
        "estimated_time": 25,
        "resources": ["https://react.dev/learn"]
      },
      {
        "title": "Create quiz data structure",
        "description": "Define TypeScript interfaces for questions and answers",
        "tasks": ["Define Question interface", "Create quiz data array", "Add answer validation", "Store correct answers"],
        "estimated_time": 30,
        "resources": ["https://www.typescriptlang.org/docs/"]
      },
      {
        "title": "Build Quiz components",
        "description": "Create reusable components for questions, answers, and results",
        "tasks": ["Create QuestionCard", "Build AnswerButton", "Design ResultsScreen", "Add ProgressBar"],
        "estimated_time": 70,
        "resources": ["https://react.dev/reference/react"]
      },
      {
        "title": "Implement quiz logic",
        "description": "Add state management for quiz flow and scoring",
        "tasks": ["Track current question", "Calculate score", "Handle answer selection", "Show results"],
        "estimated_time": 50,
        "resources": ["https://react.dev/reference/react/useState"]
      },
      {
        "title": "Add timer feature",
        "description": "Implement countdown timer for each question",
        "tasks": ["Create Timer component", "Add useEffect hook", "Auto-submit on timeout", "Display remaining time"],
        "estimated_time": 45,
        "resources": ["https://react.dev/reference/react/useEffect"]
      }
    ]'::jsonb,
    '{"example": "https://opentdb.com/", "tutorial": "https://www.youtube.com/watch?v=aq-fCtg_gG4"}'::jsonb,
    true,
    6
  ),
  
  -- Blog Platform Challenge
  (
    'c3f8b6e0-e29b-41d4-a716-446655440007',
    'Full Stack Blog Platform',
    'Create a complete blog platform with authentication, CRUD operations, and comments',
    'advanced',
    12,
    500,
    '📝',
    ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    'Full Stack',
    '[
      {
        "title": "Set up backend server",
        "description": "Initialize Node.js/Express server with MongoDB connection",
        "tasks": ["Create Express app", "Set up MongoDB", "Configure middleware", "Create folder structure"],
        "estimated_time": 60,
        "resources": ["https://expressjs.com/"]
      },
      {
        "title": "Implement authentication",
        "description": "Build user registration and login with JWT tokens",
        "tasks": ["Create User model", "Build auth routes", "Hash passwords", "Generate JWT tokens"],
        "estimated_time": 90,
        "resources": ["https://jwt.io/"]
      },
      {
        "title": "Build blog API endpoints",
        "description": "Create RESTful API for blog posts CRUD operations",
        "tasks": ["Create Post model", "Build GET/POST routes", "Add PUT/DELETE routes", "Implement authorization"],
        "estimated_time": 80,
        "resources": ["https://restfulapi.net/"]
      },
      {
        "title": "Create React frontend",
        "description": "Build responsive frontend with React and routing",
        "tasks": ["Set up React Router", "Create page components", "Build post editor", "Add authentication UI"],
        "estimated_time": 120,
        "resources": ["https://reactrouter.com/"]
      },
      {
        "title": "Add comments system",
        "description": "Implement nested comments with replies",
        "tasks": ["Create Comment model", "Build comment API", "Create comment components", "Add reply functionality"],
        "estimated_time": 70,
        "resources": ["https://www.mongodb.com/docs/"]
      },
      {
        "title": "Deploy application",
        "description": "Deploy backend and frontend to production",
        "tasks": ["Deploy to Heroku/Railway", "Set up environment variables", "Configure CORS", "Test production build"],
        "estimated_time": 50,
        "resources": ["https://railway.app/"]
      }
    ]'::jsonb,
    '{"deployment": "https://railway.app/", "database": "https://www.mongodb.com/"}'::jsonb,
    true,
    7
  )
ON CONFLICT (id) DO NOTHING;

-- Add more comprehensive lessons to all courses
INSERT INTO lessons (course_id, title, description, order_index, duration_minutes, xp_reward, content)
VALUES
  -- More HTML & CSS lessons
  ('550e8400-e29b-41d4-a716-446655440001', 'CSS Grid Layout', 'Master CSS Grid for complex layouts', 6, 50, 55, '{"sections": [{"type": "text", "content": "CSS Grid enables two-dimensional layouts."}, {"type": "code", "content": ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n\n.grid-item {\n  padding: 20px;\n  background: #f0f0f0;\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'Responsive Design', 'Create mobile-friendly layouts', 7, 55, 60, '{"sections": [{"type": "text", "content": "Media queries adapt layouts to different screen sizes."}, {"type": "code", "content": "@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n  \n  .sidebar {\n    width: 100%;\n  }\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440001', 'CSS Animations', 'Bring your pages to life', 8, 45, 55, '{"sections": [{"type": "text", "content": "CSS animations add motion to elements."}, {"type": "code", "content": "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.element {\n  animation: fadeIn 1s ease-in;\n}"}]}'::jsonb),
  
  -- More JavaScript lessons
  ('550e8400-e29b-41d4-a716-446655440002', 'DOM Manipulation', 'Interact with HTML elements', 4, 50, 60, '{"sections": [{"type": "text", "content": "The DOM allows JavaScript to change page content."}, {"type": "code", "content": "const button = document.querySelector(\".btn\");\nbutton.addEventListener(\"click\", () => {\n  document.body.style.background = \"blue\";\n});"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440002', 'Async JavaScript', 'Handle asynchronous operations', 5, 60, 65, '{"sections": [{"type": "text", "content": "Promises and async/await handle asynchronous code."}, {"type": "code", "content": "async function fetchData() {\n  try {\n    const response = await fetch(\"api/data\");\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440002', 'ES6+ Features', 'Modern JavaScript syntax', 6, 55, 60, '{"sections": [{"type": "text", "content": "ES6 introduced powerful new features."}, {"type": "code", "content": "// Destructuring\nconst { name, age } = user;\n\n// Spread operator\nconst combined = [...arr1, ...arr2];\n\n// Template literals\nconst message = `Hello, ${name}!`;"}]}'::jsonb),
  
  -- More React lessons
  ('550e8400-e29b-41d4-a716-446655440003', 'useEffect Hook', 'Handle side effects in components', 4, 55, 70, '{"sections": [{"type": "text", "content": "useEffect runs code after render."}, {"type": "code", "content": "useEffect(() => {\n  fetch(\"/api/data\")\n    .then(res => res.json())\n    .then(data => setData(data));\n}, []);"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440003', 'React Router', 'Add navigation to your app', 5, 60, 75, '{"sections": [{"type": "text", "content": "React Router enables client-side routing."}, {"type": "code", "content": "import { BrowserRouter, Routes, Route } from \"react-router-dom\";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"}]}'::jsonb),
  ('550e8400-e29b-41d4-a716-446655440003', 'Context API', 'Share state across components', 6, 65, 80, '{"sections": [{"type": "text", "content": "Context provides global state without prop drilling."}, {"type": "code", "content": "const ThemeContext = createContext();\n\nfunction App() {\n  const [theme, setTheme] = useState(\"light\");\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Component />\n    </ThemeContext.Provider>\n  );\n}"}]}'::jsonb)
ON CONFLICT DO NOTHING;