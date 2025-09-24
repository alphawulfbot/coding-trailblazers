-- Insert comprehensive Language Learning Tutorials
INSERT INTO tutorials (title, description, category, content, duration_minutes, xp_reward, difficulty, tags, order_index) VALUES
('JavaScript Variables & Data Types', 'Master JavaScript variables, let, const, and primitive data types with interactive examples', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "Understanding Variables",
      "content": "Variables are containers that store data values. In JavaScript, we use let, const, and var to declare variables.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "Variable Declaration",
      "content": "Here is how to declare variables in JavaScript:",
      "code": "// Using let for variables that can change\nlet playerName = \"CodeHunter\";\nlet score = 0;\n\n// Using const for constants\nconst MAX_LEVEL = 100;\nconst PI = 3.14159;\n\n// Data types\nlet age = 25;           // Number\nlet isActive = true;    // Boolean\nlet message = \"Hello\";  // String\nlet nothing = null;     // Null\nlet notDefined;         // Undefined",
      "duration": 10
    },
    {
      "type": "exercise",
      "title": "Practice Exercise",
      "content": "Try creating variables for a game character:",
      "exercise": "Create variables for: character name, health points, level, and whether they have a weapon",
      "solution": "let characterName = \"Hero\";\nlet healthPoints = 100;\nlet level = 1;\nlet hasWeapon = true;",
      "duration": 10
    }
  ]
}', 25, 30, 'Beginner', ARRAY['JavaScript', 'Variables', 'Data Types'], 1),

('JavaScript Functions', 'Learn to create reusable code with JavaScript functions', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "What are Functions?",
      "content": "Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "Function Syntax",
      "content": "Different ways to create functions:",
      "code": "// Function declaration\nfunction greetPlayer(name) {\n    return \"Welcome, \" + name + \"!\";\n}\n\n// Function expression\nconst calculateDamage = function(attack, defense) {\n    return Math.max(0, attack - defense);\n};\n\n// Arrow function (ES6)\nconst gainExperience = (currentXP, bonus) => {\n    return currentXP + bonus;\n};\n\n// Using functions\nconsole.log(greetPlayer(\"Hero\"));\nconsole.log(calculateDamage(50, 20));\nconsole.log(gainExperience(100, 25));",
      "duration": 15
    },
    {
      "type": "exercise",
      "title": "Build a Level System",
      "content": "Create functions for a game level system:",
      "exercise": "Write functions to: check if player can level up, calculate required XP for next level, and level up the player",
      "solution": "function canLevelUp(currentXP, currentLevel) {\n    const requiredXP = currentLevel * 100;\n    return currentXP >= requiredXP;\n}\n\nfunction calculateRequiredXP(level) {\n    return level * 100;\n}\n\nfunction levelUp(player) {\n    if (canLevelUp(player.xp, player.level)) {\n        player.level++;\n        player.xp -= calculateRequiredXP(player.level - 1);\n        return true;\n    }\n    return false;\n}",
      "duration": 10
    }
  ]
}', 30, 35, 'Beginner', ARRAY['JavaScript', 'Functions', 'Programming'], 2),

('Python Syntax & Variables', 'Get started with Python syntax, variables, and basic operations', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "Python Syntax Rules",
      "content": "Python uses indentation to define code blocks. No curly braces needed! Python is known for its clean, readable syntax.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "Variables and Types",
      "content": "Python variables are dynamically typed:",
      "code": "# Variables in Python\nplayer_name = \"CodeMaster\"\nhealth = 100\nlevel = 1\nis_alive = True\n\n# Python is dynamically typed\nscore = 0        # Integer\nscore = 95.5     # Now it is a float\nscore = \"A+\"     # Now it is a string\n\n# Multiple assignment\nx, y, z = 1, 2, 3\nname = age = \"Unknown\"\n\n# Print output\nprint(f\"Player: {player_name}\")\nprint(f\"Health: {health}/100\")\nprint(f\"Level: {level}\")",
      "duration": 12
    },
    {
      "type": "exercise",
      "title": "Character Stats",
      "content": "Create a character stat system:",
      "exercise": "Create variables for character stats and print a character sheet",
      "solution": "# Character stats\ncharacter_name = \"Warrior\"\nstrength = 15\nintelligence = 10\ndexterity = 12\nhealth = 100\nmana = 50\n\n# Print character sheet\nprint(\"=== CHARACTER SHEET ===\")\nprint(f\"Name: {character_name}\")\nprint(f\"Strength: {strength}\")\nprint(f\"Intelligence: {intelligence}\")\nprint(f\"Dexterity: {dexterity}\")\nprint(f\"Health: {health}\")\nprint(f\"Mana: {mana}\")",
      "duration": 8
    }
  ]
}', 25, 30, 'Beginner', ARRAY['Python', 'Variables', 'Syntax'], 3),

('React Components & JSX', 'Build your first React components and understand JSX syntax', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "What is JSX?",
      "content": "JSX is a syntax extension for JavaScript that lets you write HTML-like code in your React components. It makes building UIs intuitive and powerful.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "Your First Component",
      "content": "Here is how to create React components:",
      "code": "// Function component\nfunction PlayerCard({ name, level, health }) {\n    return (\n        <div className=\"player-card\">\n            <h2>{name}</h2>\n            <p>Level: {level}</p>\n            <div className=\"health-bar\">\n                Health: {health}/100\n            </div>\n        </div>\n    );\n}\n\n// Using the component\nfunction Game() {\n    return (\n        <div>\n            <h1>My Game</h1>\n            <PlayerCard \n                name=\"Hero\" \n                level={5} \n                health={85} \n            />\n        </div>\n    );\n}",
      "duration": 15
    },
    {
      "type": "exercise",
      "title": "Build a Game UI",
      "content": "Create React components for a simple game:",
      "exercise": "Build components for: inventory item, skill tree node, and quest log entry",
      "solution": "function InventoryItem({ name, quantity, rarity }) {\n    return (\n        <div className={`item ${rarity}`}>\n            <span>{name}</span>\n            <span>x{quantity}</span>\n        </div>\n    );\n}\n\nfunction SkillNode({ name, isUnlocked, cost }) {\n    return (\n        <div className={`skill-node ${isUnlocked ? \"unlocked\" : \"locked\"}`}>\n            <h4>{name}</h4>\n            {!isUnlocked && <p>Cost: {cost} SP</p>}\n        </div>\n    );\n}\n\nfunction QuestEntry({ title, description, isComplete }) {\n    return (\n        <div className={`quest ${isComplete ? \"complete\" : \"active\"}`}>\n            <h3>{title}</h3>\n            <p>{description}</p>\n            <span>{isComplete ? \"✓ Complete\" : \"In Progress\"}</span>\n        </div>\n    );\n}",
      "duration": 15
    }
  ]
}', 35, 40, 'Beginner', ARRAY['React', 'JSX', 'Components'], 4),

('CSS Styling Fundamentals', 'Learn CSS selectors, properties, and how to style web pages beautifully', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "CSS Basics",
      "content": "CSS (Cascading Style Sheets) is used to style HTML elements and make web pages look beautiful. It controls layout, colors, fonts, and animations.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "Selectors and Properties",
      "content": "Basic CSS syntax and selectors:",
      "code": "/* Element selector */\nh1 {\n    color: #2c3e50;\n    font-size: 2rem;\n    text-align: center;\n}\n\n/* Class selector */\n.player-card {\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    border-radius: 10px;\n    padding: 20px;\n    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n\n/* ID selector */\n#game-board {\n    width: 800px;\n    height: 600px;\n    margin: 0 auto;\n}\n\n/* Hover effects */\n.button:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);\n    transition: all 0.3s ease;\n}",
      "duration": 12
    },
    {
      "type": "exercise",
      "title": "Style a Game Interface",
      "content": "Practice CSS styling:",
      "exercise": "Create styles for: game buttons, character health bars, and inventory grid",
      "solution": "/* Game buttons */\n.game-button {\n    background: linear-gradient(45deg, #ff6b6b, #feca57);\n    border: none;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 25px;\n    cursor: pointer;\n    font-weight: bold;\n    transition: all 0.3s ease;\n}\n\n.game-button:hover {\n    transform: scale(1.05);\n    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);\n}\n\n/* Health bar */\n.health-bar {\n    width: 200px;\n    height: 20px;\n    background: #333;\n    border-radius: 10px;\n    overflow: hidden;\n}\n\n.health-fill {\n    height: 100%;\n    background: linear-gradient(90deg, #ff4757, #ffa502);\n    transition: width 0.5s ease;\n}\n\n/* Inventory grid */\n.inventory-grid {\n    display: grid;\n    grid-template-columns: repeat(6, 60px);\n    gap: 5px;\n    padding: 20px;\n    background: rgba(0, 0, 0, 0.8);\n    border-radius: 10px;\n}\n\n.inventory-slot {\n    width: 60px;\n    height: 60px;\n    border: 2px solid #555;\n    border-radius: 5px;\n    background: #222;\n}",
      "duration": 13
    }
  ]
}', 30, 35, 'Beginner', ARRAY['CSS', 'Styling', 'Design'], 5),

('HTML Document Structure', 'Learn HTML elements, attributes, and semantic structure', 'language', '{
  "sections": [
    {
      "type": "theory",
      "title": "HTML Basics",
      "content": "HTML (HyperText Markup Language) provides the structure and content of web pages using elements and tags. It is the foundation of all websites.",
      "duration": 5
    },
    {
      "type": "code",
      "title": "HTML Document Structure",
      "content": "Basic HTML document structure:",
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Epic Quest Game</title>\n    <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body>\n    <header>\n        <h1>Epic Quest Game</h1>\n        <nav>\n            <ul>\n                <li><a href=\"#play\">Play</a></li>\n                <li><a href=\"#stats\">Stats</a></li>\n                <li><a href=\"#inventory\">Inventory</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <section id=\"game-area\">\n            <h2>Game Board</h2>\n            <div class=\"player-info\">\n                <span>Health: 100</span>\n                <span>Level: 5</span>\n            </div>\n        </section>\n    </main>\n    \n    <footer>\n        <p>&copy; 2024 Epic Quest Game</p>\n    </footer>\n</body>\n</html>",
      "duration": 15
    },
    {
      "type": "exercise",
      "title": "Build a Game Page",
      "content": "Create HTML structure:",
      "exercise": "Build an HTML page for a game with: header, game area, sidebar, and footer",
      "solution": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Adventure Game</title>\n</head>\n<body>\n    <header class=\"game-header\">\n        <h1>Adventure Quest</h1>\n        <nav>\n            <button class=\"nav-btn\">Inventory</button>\n            <button class=\"nav-btn\">Skills</button>\n            <button class=\"nav-btn\">Quests</button>\n        </nav>\n    </header>\n    \n    <main class=\"game-layout\">\n        <section class=\"game-area\">\n            <div class=\"game-world\">\n                <canvas id=\"gameCanvas\" width=\"800\" height=\"600\"></canvas>\n            </div>\n        </section>\n        \n        <aside class=\"game-sidebar\">\n            <div class=\"player-stats\">\n                <h3>Player Stats</h3>\n                <div class=\"stat\">Health: 100/100</div>\n                <div class=\"stat\">Mana: 50/50</div>\n                <div class=\"stat\">Level: 5</div>\n            </div>\n            \n            <div class=\"mini-map\">\n                <h3>Mini Map</h3>\n                <div class=\"map-area\"></div>\n            </div>\n        </aside>\n    </main>\n    \n    <footer class=\"game-footer\">\n        <div class=\"action-bar\">\n            <button class=\"action-btn\">Attack</button>\n            <button class=\"action-btn\">Defend</button>\n            <button class=\"action-btn\">Use Item</button>\n        </div>\n    </footer>\n</body>\n</html>",
      "duration": 5
    }
  ]
}', 25, 30, 'Beginner', ARRAY['HTML', 'Structure', 'Web Development'], 6),

-- Insert comprehensive Project Building Tutorials
('Todo App with React & Supabase', 'Build a complete todo application with user authentication and real-time updates', 'project', '{
  "sections": [
    {
      "type": "overview",
      "title": "Project Overview",
      "content": "Build a full-stack todo application with React frontend and Supabase backend. Features include user authentication, real-time updates, and persistent storage.",
      "features": ["User Authentication", "Create/Edit/Delete Todos", "Real-time Updates", "Responsive Design", "Data Persistence"],
      "duration": 10
    },
    {
      "type": "setup",
      "title": "Project Setup",
      "content": "Set up your development environment and initialize the project:",
      "steps": [
        "Create a new React app with Vite",
        "Install required dependencies",
        "Set up Supabase project",
        "Configure authentication"
      ],
      "code": "npm create vite@latest todo-app -- --template react-ts\ncd todo-app\nnpm install @supabase/supabase-js\nnpm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu\nnpm install lucide-react tailwindcss",
      "duration": 15
    },
    {
      "type": "database",
      "title": "Database Schema",
      "content": "Create the database tables for todos:",
      "code": "-- Create todos table\nCREATE TABLE todos (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  user_id UUID REFERENCES auth.users NOT NULL,\n  title TEXT NOT NULL,\n  description TEXT,\n  is_completed BOOLEAN DEFAULT false,\n  priority TEXT DEFAULT low CHECK (priority IN (low, medium, high)),\n  due_date TIMESTAMP WITH TIME ZONE,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Enable RLS\nALTER TABLE todos ENABLE ROW LEVEL SECURITY;\n\n-- RLS Policies\nCREATE POLICY \"Users can view own todos\" ON todos\n  FOR SELECT USING (auth.uid() = user_id);\n\nCREATE POLICY \"Users can insert own todos\" ON todos\n  FOR INSERT WITH CHECK (auth.uid() = user_id);\n\nCREATE POLICY \"Users can update own todos\" ON todos\n  FOR UPDATE USING (auth.uid() = user_id);",
      "duration": 20
    },
    {
      "type": "implementation",
      "title": "Core Components",
      "content": "Build the main application components:",
      "code": "// TodoItem.tsx\ninterface Todo {\n  id: string;\n  title: string;\n  description?: string;\n  is_completed: boolean;\n  priority: low | medium | high;\n  due_date?: string;\n}\n\nconst TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {\n  return (\n    <div className={`todo-item ${todo.is_completed ? completed : active}`}>\n      <div className=\"todo-content\">\n        <h3>{todo.title}</h3>\n        {todo.description && <p>{todo.description}</p>}\n        <div className=\"todo-meta\">\n          <Badge variant={getPriorityVariant(todo.priority)}>\n            {todo.priority}\n          </Badge>\n          {todo.due_date && (\n            <span className=\"due-date\">\n              Due: {formatDate(todo.due_date)}\n            </span>\n          )}\n        </div>\n      </div>\n      <div className=\"todo-actions\">\n        <Button onClick={() => onToggle(todo.id)}>\n          {todo.is_completed ? Undo : Check}\n        </Button>\n        <Button onClick={() => onEdit(todo)}>\n          <Edit />\n        </Button>\n        <Button onClick={() => onDelete(todo.id)} variant=\"destructive\">\n          <Trash />\n        </Button>\n      </div>\n    </div>\n  );\n};",
      "duration": 30
    },
    {
      "type": "features",
      "title": "Advanced Features",
      "content": "Add filtering, sorting, and real-time updates:",
      "code": "// useTodos.ts - Custom hook for todo management\nconst useTodos = () => {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [filter, setFilter] = useState<all | active | completed>(all);\n  const [sortBy, setSortBy] = useState<created_at | due_date | priority>(created_at);\n\n  // Real-time subscription\n  useEffect(() => {\n    const channel = supabase\n      .channel(todos-changes)\n      .on(postgres_changes, {\n        event: *,\n        schema: public,\n        table: todos,\n        filter: `user_id=eq.${user?.id}`\n      }, (payload) => {\n        handleRealtimeUpdate(payload);\n      })\n      .subscribe();\n\n    return () => {\n      supabase.removeChannel(channel);\n    };\n  }, [user]);\n\n  const filteredTodos = useMemo(() => {\n    return todos\n      .filter(todo => {\n        if (filter === active) return !todo.is_completed;\n        if (filter === completed) return todo.is_completed;\n        return true;\n      })\n      .sort((a, b) => {\n        if (sortBy === priority) {\n          const priorityOrder = { high: 3, medium: 2, low: 1 };\n          return priorityOrder[b.priority] - priorityOrder[a.priority];\n        }\n        return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();\n      });\n  }, [todos, filter, sortBy]);\n\n  return { todos: filteredTodos, filter, setFilter, sortBy, setSortBy };\n};",
      "duration": 25
    },
    {
      "type": "deployment",
      "title": "Deployment & Testing",
      "content": "Deploy your todo app and test all features:",
      "steps": [
        "Build the production version",
        "Configure environment variables",
        "Deploy to Vercel/Netlify",
        "Test authentication flow",
        "Test CRUD operations",
        "Test real-time updates"
      ],
      "code": "npm run build\n\n# Environment variables\nVITE_SUPABASE_URL=your-supabase-url\nVITE_SUPABASE_ANON_KEY=your-anon-key\n\n# Deploy to Vercel\nnpx vercel --prod",
      "duration": 15
    }
  ]
}', 120, 150, 'Intermediate', ARRAY['React', 'Supabase', 'Full Stack', 'Authentication'], 1),

('E-commerce Dashboard', 'Create a comprehensive admin dashboard for managing an online store', 'project', '{
  "sections": [
    {
      "type": "overview",
      "title": "Project Overview", 
      "content": "Build a complete e-commerce admin dashboard with analytics, product management, order tracking, and customer insights.",
      "features": ["Product Management", "Order Tracking", "Analytics Dashboard", "Customer Management", "Inventory Control", "Sales Reports"],
      "duration": 15
    },
    {
      "type": "setup",
      "title": "Environment Setup",
      "content": "Initialize the dashboard project with all necessary tools:",
      "steps": [
        "Create React app with TypeScript",
        "Install UI components and charts",
        "Set up routing and state management",
        "Configure Supabase backend"
      ],
      "code": "npm create vite@latest ecommerce-dashboard -- --template react-ts\ncd ecommerce-dashboard\nnpm install @supabase/supabase-js\nnpm install @tanstack/react-query\nnpm install recharts @radix-ui/react-*\nnpm install react-router-dom zustand\nnpm install lucide-react tailwindcss",
      "duration": 20
    },
    {
      "type": "database",
      "title": "Database Architecture",
      "content": "Design and create the e-commerce database schema:",
      "code": "-- Products table\nCREATE TABLE products (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL,\n  description TEXT,\n  price DECIMAL(10,2) NOT NULL,\n  cost DECIMAL(10,2),\n  sku TEXT UNIQUE NOT NULL,\n  category_id UUID REFERENCES categories(id),\n  stock_quantity INTEGER DEFAULT 0,\n  images TEXT[],\n  is_active BOOLEAN DEFAULT true,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Orders table\nCREATE TABLE orders (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  customer_id UUID REFERENCES customers(id),\n  total_amount DECIMAL(10,2) NOT NULL,\n  status TEXT DEFAULT pending CHECK (status IN (pending, processing, shipped, delivered, cancelled)),\n  shipping_address JSONB,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Order items\nCREATE TABLE order_items (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  order_id UUID REFERENCES orders(id),\n  product_id UUID REFERENCES products(id),\n  quantity INTEGER NOT NULL,\n  unit_price DECIMAL(10,2) NOT NULL\n);\n\n-- Customers table\nCREATE TABLE customers (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  first_name TEXT,\n  last_name TEXT,\n  phone TEXT,\n  total_orders INTEGER DEFAULT 0,\n  total_spent DECIMAL(10,2) DEFAULT 0,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);",
      "duration": 30
    },
    {
      "type": "implementation",
      "title": "Dashboard Components",
      "content": "Build the core dashboard interface and components:",
      "code": "// Dashboard.tsx - Main dashboard with metrics\nconst Dashboard = () => {\n  const { data: metrics } = useQuery({\n    queryKey: [dashboard-metrics],\n    queryFn: async () => {\n      const [orders, products, customers, revenue] = await Promise.all([\n        supabase.from(orders).select(*, count()),\n        supabase.from(products).select(*, count()),\n        supabase.from(customers).select(*, count()),\n        supabase.rpc(get_revenue_metrics)\n      ]);\n      return { orders, products, customers, revenue };\n    }\n  });\n\n  return (\n    <div className=\"dashboard-grid\">\n      <MetricCard\n        title=\"Total Revenue\"\n        value={formatCurrency(metrics?.revenue.total)}\n        change={+12.5%}\n        icon={<DollarSign />}\n      />\n      <MetricCard\n        title=\"Orders\"\n        value={metrics?.orders.count}\n        change={+8.2%}\n        icon={<ShoppingCart />}\n      />\n      <MetricCard\n        title=\"Products\"\n        value={metrics?.products.count}\n        change={+3.1%}\n        icon={<Package />}\n      />\n      <MetricCard\n        title=\"Customers\"\n        value={metrics?.customers.count}\n        change={+15.3%}\n        icon={<Users />}\n      />\n      \n      <div className=\"charts-section\">\n        <SalesChart data={metrics?.revenue.daily} />\n        <CategoryChart data={metrics?.categories} />\n        <OrdersChart data={metrics?.orders.weekly} />\n      </div>\n    </div>\n  );\n};\n\n// ProductManager.tsx - Product CRUD operations\nconst ProductManager = () => {\n  const [products, setProducts] = useState([]);\n  const [editingProduct, setEditingProduct] = useState(null);\n  \n  const createProduct = async (productData) => {\n    const { data, error } = await supabase\n      .from(products)\n      .insert([productData])\n      .select();\n    if (!error) {\n      setProducts([...products, ...data]);\n      toast.success(Product created successfully!);\n    }\n  };\n  \n  return (\n    <div className=\"product-manager\">\n      <div className=\"product-header\">\n        <h2>Product Management</h2>\n        <Button onClick={() => setEditingProduct({})}>Add Product</Button>\n      </div>\n      \n      <DataTable\n        columns={productColumns}\n        data={products}\n        onEdit={setEditingProduct}\n        onDelete={handleDeleteProduct}\n      />\n      \n      <ProductDialog\n        product={editingProduct}\n        onSave={createProduct}\n        onClose={() => setEditingProduct(null)}\n      />\n    </div>\n  );\n};",
      "duration": 45
    },
    {
      "type": "analytics",
      "title": "Analytics & Reports",
      "content": "Implement comprehensive analytics and reporting features:",
      "code": "// Analytics.tsx - Advanced analytics dashboard\nconst Analytics = () => {\n  const [dateRange, setDateRange] = useState({\n    from: subDays(new Date(), 30),\n    to: new Date()\n  });\n  \n  const { data: analyticsData } = useQuery({\n    queryKey: [analytics, dateRange],\n    queryFn: () => fetchAnalytics(dateRange)\n  });\n  \n  return (\n    <div className=\"analytics-dashboard\">\n      <div className=\"analytics-filters\">\n        <DateRangePicker value={dateRange} onChange={setDateRange} />\n        <Select value={metric} onValueChange={setMetric}>\n          <SelectItem value=\"revenue\">Revenue</SelectItem>\n          <SelectItem value=\"orders\">Orders</SelectItem>\n          <SelectItem value=\"customers\">Customers</SelectItem>\n        </Select>\n      </div>\n      \n      <div className=\"analytics-charts\">\n        <Card className=\"chart-card\">\n          <CardHeader>\n            <CardTitle>Revenue Trends</CardTitle>\n          </CardHeader>\n          <CardContent>\n            <ResponsiveContainer width=\"100%\" height={300}>\n              <LineChart data={analyticsData?.revenue}>\n                <CartesianGrid strokeDasharray=\"3 3\" />\n                <XAxis dataKey=\"date\" />\n                <YAxis />\n                <Tooltip />\n                <Line type=\"monotone\" dataKey=\"amount\" stroke=\"#8884d8\" />\n              </LineChart>\n            </ResponsiveContainer>\n          </CardContent>\n        </Card>\n        \n        <Card className=\"chart-card\">\n          <CardHeader>\n            <CardTitle>Top Products</CardTitle>\n          </CardHeader>\n          <CardContent>\n            <ResponsiveContainer width=\"100%\" height={300}>\n              <BarChart data={analyticsData?.topProducts}>\n                <CartesianGrid strokeDasharray=\"3 3\" />\n                <XAxis dataKey=\"name\" />\n                <YAxis />\n                <Tooltip />\n                <Bar dataKey=\"sales\" fill=\"#82ca9d\" />\n              </BarChart>\n            </ResponsiveContainer>\n          </CardContent>\n        </Card>\n      </div>\n    </div>\n  );\n};\n\n// Custom analytics functions\nconst fetchAnalytics = async (dateRange) => {\n  const { from, to } = dateRange;\n  \n  const [revenue, orders, topProducts, customerMetrics] = await Promise.all([\n    supabase.rpc(get_daily_revenue, { start_date: from, end_date: to }),\n    supabase.rpc(get_order_metrics, { start_date: from, end_date: to }),\n    supabase.rpc(get_top_products, { start_date: from, end_date: to }),\n    supabase.rpc(get_customer_metrics, { start_date: from, end_date: to })\n  ]);\n  \n  return {\n    revenue: revenue.data,\n    orders: orders.data,\n    topProducts: topProducts.data,\n    customers: customerMetrics.data\n  };\n};",
      "duration": 35
    },
    {
      "type": "deployment",
      "title": "Production Deployment",
      "content": "Deploy and optimize the dashboard for production use:",
      "steps": [
        "Optimize bundle size",
        "Set up environment variables",
        "Configure database functions",
        "Deploy to production",
        "Set up monitoring and alerts"
      ],
      "code": "# Build optimization\nnpm run build\nnpm run analyze # Bundle analyzer\n\n# Environment setup\nVITE_SUPABASE_URL=your-production-url\nVITE_SUPABASE_ANON_KEY=your-production-key\n\n# Database functions for analytics\nCREATE OR REPLACE FUNCTION get_daily_revenue(start_date date, end_date date)\nRETURNS TABLE(date date, amount decimal) AS $$\nBEGIN\n  RETURN QUERY\n  SELECT o.created_at::date, SUM(o.total_amount)\n  FROM orders o\n  WHERE o.created_at::date BETWEEN start_date AND end_date\n  GROUP BY o.created_at::date\n  ORDER BY o.created_at::date;\nEND;\n$$ LANGUAGE plpgsql;\n\n# Deploy\nvercel --prod",
      "duration": 20
    }
  ]
}', 180, 200, 'Advanced', ARRAY['React', 'E-commerce', 'Analytics', 'Dashboard'], 2),

('Chat Application with WebRTC', 'Build a real-time chat app with video calling capabilities', 'project', '{
  "sections": [
    {
      "type": "overview",
      "title": "Project Overview",
      "content": "Create a modern chat application with text messaging, file sharing, and video calling using WebRTC technology.",
      "features": ["Real-time Messaging", "Video Calls", "File Sharing", "User Presence", "Message History", "Group Chats"],
      "duration": 10
    },
    {
      "type": "setup", 
      "title": "Project Initialization",
      "content": "Set up the chat application with all required dependencies:",
      "steps": [
        "Initialize React TypeScript project",
        "Install WebRTC and socket libraries",
        "Set up Supabase for data persistence",
        "Configure real-time subscriptions"
      ],
      "code": "npm create vite@latest chat-app -- --template react-ts\ncd chat-app\nnpm install @supabase/supabase-js\nnpm install socket.io-client simple-peer\nnpm install @radix-ui/react-dialog @radix-ui/react-avatar\nnpm install lucide-react date-fns\nnpm install @emoji-mart/react emoji-mart",
      "duration": 15
    },
    {
      "type": "database",
      "title": "Chat Database Schema",
      "content": "Design the database structure for messages and chat rooms:",
      "code": "-- Chat rooms\nCREATE TABLE chat_rooms (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL,\n  description TEXT,\n  is_private BOOLEAN DEFAULT false,\n  created_by UUID REFERENCES auth.users(id),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Room members\nCREATE TABLE room_members (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  room_id UUID REFERENCES chat_rooms(id),\n  user_id UUID REFERENCES auth.users(id),\n  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  role TEXT DEFAULT member CHECK (role IN (admin, moderator, member))\n);\n\n-- Messages\nCREATE TABLE messages (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  room_id UUID REFERENCES chat_rooms(id),\n  sender_id UUID REFERENCES auth.users(id),\n  content TEXT,\n  message_type TEXT DEFAULT text CHECK (message_type IN (text, image, file, system)),\n  file_url TEXT,\n  reply_to UUID REFERENCES messages(id),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- User presence\nCREATE TABLE user_presence (\n  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,\n  status TEXT DEFAULT offline CHECK (status IN (online, away, busy, offline)),\n  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);\n\n-- Enable RLS\nALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;\nALTER TABLE messages ENABLE ROW LEVEL SECURITY;\nALTER TABLE room_members ENABLE ROW LEVEL SECURITY;\n\n-- RLS Policies\nCREATE POLICY \"Users can view rooms they are members of\" ON chat_rooms\n  FOR SELECT USING (\n    id IN (SELECT room_id FROM room_members WHERE user_id = auth.uid())\n  );",
      "duration": 25
    },
    {
      "type": "implementation",
      "title": "Core Chat Features",
      "content": "Build the main chat interface and messaging system:",
      "code": "// ChatRoom.tsx - Main chat interface\nconst ChatRoom = ({ roomId }: { roomId: string }) => {\n  const [messages, setMessages] = useState<Message[]>([]);\n  const [newMessage, setNewMessage] = useState(\"\");\n  const messagesEndRef = useRef<HTMLDivElement>(null);\n  const { user } = useAuth();\n  \n  // Real-time message subscription\n  useEffect(() => {\n    const channel = supabase\n      .channel(`room-${roomId}`)\n      .on(\n        postgres_changes,\n        {\n          event: INSERT,\n          schema: public,\n          table: messages,\n          filter: `room_id=eq.${roomId}`\n        },\n        (payload) => {\n          setMessages(prev => [...prev, payload.new as Message]);\n          scrollToBottom();\n        }\n      )\n      .subscribe();\n      \n    return () => supabase.removeChannel(channel);\n  }, [roomId]);\n  \n  const sendMessage = async () => {\n    if (!newMessage.trim()) return;\n    \n    const { error } = await supabase\n      .from(messages)\n      .insert({\n        room_id: roomId,\n        sender_id: user?.id,\n        content: newMessage,\n        message_type: text\n      });\n      \n    if (!error) {\n      setNewMessage(\"\");\n    }\n  };\n  \n  return (\n    <div className=\"chat-room\">\n      <div className=\"messages-container\">\n        {messages.map(message => (\n          <MessageBubble\n            key={message.id}\n            message={message}\n            isOwn={message.sender_id === user?.id}\n          />\n        ))}\n        <div ref={messagesEndRef} />\n      </div>\n      \n      <div className=\"message-input\">\n        <EmojiPicker onEmojiSelect={handleEmojiSelect} />\n        <Input\n          value={newMessage}\n          onChange={(e) => setNewMessage(e.target.value)}\n          onKeyPress={(e) => e.key === Enter && sendMessage()}\n          placeholder=\"Type a message...\"\n        />\n        <Button onClick={sendMessage}>\n          <Send className=\"h-4 w-4\" />\n        </Button>\n      </div>\n    </div>\n  );\n};\n\n// MessageBubble.tsx - Individual message component\nconst MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {\n  return (\n    <div className={`message-bubble ${isOwn ? own : other}`}>\n      <div className=\"message-header\">\n        <Avatar className=\"h-8 w-8\">\n          <AvatarImage src={message.sender.avatar_url} />\n          <AvatarFallback>{message.sender.display_name?.[0]}</AvatarFallback>\n        </Avatar>\n        <span className=\"sender-name\">{message.sender.display_name}</span>\n        <span className=\"message-time\">\n          {formatDistanceToNow(new Date(message.created_at))}\n        </span>\n      </div>\n      \n      <div className=\"message-content\">\n        {message.message_type === text && (\n          <p>{message.content}</p>\n        )}\n        {message.message_type === image && (\n          <img src={message.file_url} alt=\"Shared image\" className=\"message-image\" />\n        )}\n        {message.message_type === file && (\n          <FileAttachment url={message.file_url} name={message.content} />\n        )}\n      </div>\n      \n      <div className=\"message-actions\">\n        <Button variant=\"ghost\" size=\"sm\" onClick={() => handleReply(message)}>\n          <Reply className=\"h-3 w-3\" />\n        </Button>\n        <Button variant=\"ghost\" size=\"sm\" onClick={() => handleReaction(message)}>\n          <Heart className=\"h-3 w-3\" />\n        </Button>\n      </div>\n    </div>\n  );\n};",
      "duration": 40
    },
    {
      "type": "webrtc",
      "title": "Video Call Integration",
      "content": "Implement WebRTC for video calling functionality:",
      "code": "// VideoCall.tsx - WebRTC implementation\nconst VideoCall = ({ roomId, participants }: VideoCallProps) => {\n  const [localStream, setLocalStream] = useState<MediaStream | null>(null);\n  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map());\n  const [peers, setPeers] = useState<Map<string, SimplePeer.Instance>>(new Map());\n  const localVideoRef = useRef<HTMLVideoElement>(null);\n  const { user } = useAuth();\n  \n  // Initialize local media\n  useEffect(() => {\n    const initializeMedia = async () => {\n      try {\n        const stream = await navigator.mediaDevices.getUserMedia({\n          video: { width: 1280, height: 720 },\n          audio: { echoCancellation: true, noiseSuppression: true }\n        });\n        setLocalStream(stream);\n        if (localVideoRef.current) {\n          localVideoRef.current.srcObject = stream;\n        }\n      } catch (error) {\n        console.error(Error accessing media devices:, error);\n      }\n    };\n    \n    initializeMedia();\n  }, []);\n  \n  // WebRTC peer connection setup\n  const createPeerConnection = useCallback((targetUserId: string, initiator: boolean) => {\n    const peer = new SimplePeer({\n      initiator,\n      trickle: false,\n      stream: localStream || undefined\n    });\n    \n    peer.on(signal, (data) => {\n      // Send signaling data through Supabase\n      supabase\n        .from(webrtc_signals)\n        .insert({\n          from_user: user?.id,\n          to_user: targetUserId,\n          signal_data: data,\n          room_id: roomId\n        });\n    });\n    \n    peer.on(stream, (remoteStream) => {\n      setRemoteStreams(prev => new Map(prev.set(targetUserId, remoteStream)));\n    });\n    \n    peer.on(error, (error) => {\n      console.error(WebRTC error:, error);\n    });\n    \n    setPeers(prev => new Map(prev.set(targetUserId, peer)));\n    return peer;\n  }, [localStream, user?.id, roomId]);\n  \n  // Handle incoming signals\n  useEffect(() => {\n    const channel = supabase\n      .channel(`webrtc-${roomId}`)\n      .on(\n        postgres_changes,\n        {\n          event: INSERT,\n          schema: public,\n          table: webrtc_signals,\n          filter: `to_user=eq.${user?.id}`\n        },\n        (payload) => {\n          const { from_user, signal_data } = payload.new;\n          const peer = peers.get(from_user) || createPeerConnection(from_user, false);\n          peer.signal(signal_data);\n        }\n      )\n      .subscribe();\n      \n    return () => supabase.removeChannel(channel);\n  }, [createPeerConnection, peers, roomId, user?.id]);\n  \n  return (\n    <div className=\"video-call-container\">\n      <div className=\"video-grid\">\n        <div className=\"local-video\">\n          <video\n            ref={localVideoRef}\n            autoPlay\n            muted\n            playsInline\n            className=\"video-element\"\n          />\n          <div className=\"video-label\">You</div>\n        </div>\n        \n        {Array.from(remoteStreams.entries()).map(([userId, stream]) => (\n          <RemoteVideo key={userId} stream={stream} userId={userId} />\n        ))}\n      </div>\n      \n      <div className=\"call-controls\">\n        <Button onClick={toggleMute} variant={isMuted ? destructive : default}>\n          {isMuted ? <MicOff /> : <Mic />}\n        </Button>\n        <Button onClick={toggleVideo} variant={videoOff ? destructive : default}>\n          {videoOff ? <VideoOff /> : <Video />}\n        </Button>\n        <Button onClick={shareScreen} variant=\"outline\">\n          <Monitor />\n        </Button>\n        <Button onClick={endCall} variant=\"destructive\">\n          <PhoneOff />\n        </Button>\n      </div>\n    </div>\n  );\n};",
      "duration": 50
    },
    {
      "type": "deployment",
      "title": "Production Setup",
      "content": "Deploy the chat application with proper WebRTC configuration:",
      "steps": [
        "Configure STUN/TURN servers",
        "Set up SSL certificates",
        "Optimize for mobile devices",
        "Deploy with proper signaling server",
        "Test across different networks"
      ],
      "code": "# WebRTC configuration for production\nconst iceServers = [\n  { urls: stun:stun.l.google.com:19302 },\n  {\n    urls: turn:your-turn-server.com:3478,\n    username: your-username,\n    credential: your-password\n  }\n];\n\n# Environment variables\nVITE_SUPABASE_URL=your-supabase-url\nVITE_SUPABASE_ANON_KEY=your-anon-key\nVITE_TURN_SERVER_URL=your-turn-server\nVITE_TURN_USERNAME=username\nVITE_TURN_PASSWORD=password\n\n# Deploy with SSL (required for WebRTC)\nvercel --prod\n# or\nnetlify deploy --prod",
      "duration": 25
    }
  ]
}', 160, 180, 'Advanced', ARRAY['React', 'WebRTC', 'Real-time', 'Video'], 3);