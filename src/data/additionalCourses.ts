// Additional fun and interactive courses data
export const additionalCourses = [
  {
    id: 'game-dev-basics',
    title: 'Game Development Fundamentals',
    description: 'Create your first 2D games with interactive tutorials and mini-projects',
    difficulty: 'Beginner',
    duration_hours: 15,
    total_lessons: 20,
    xp_reward: 500,
    emoji: '🎮',
    gradient: 'from-purple-500 to-pink-500',
    is_featured: true,
    color: 'purple',
    lessons: [
      {
        id: 'game-basics-1',
        title: 'Introduction to Game Logic',
        description: 'Learn the fundamentals of game development',
        content: {
          type: 'interactive',
          sections: [
            {
              type: 'text',
              content: 'Welcome to Game Development! Let\'s start by understanding what makes a game tick.'
            },
            {
              type: 'code',
              language: 'javascript',
              content: `// Simple game loop
function gameLoop() {
  update(); // Update game state
  render(); // Draw everything
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();`
            },
            {
              type: 'quiz',
              question: 'What are the two main parts of a game loop?',
              options: ['Update and Render', 'Start and Stop', 'Input and Output', 'Create and Destroy'],
              correct: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ai-ml-intro',
    title: 'AI & Machine Learning for Beginners',
    description: 'Dive into the world of AI with hands-on projects and visual explanations',
    difficulty: 'Intermediate',
    duration_hours: 25,
    total_lessons: 30,
    xp_reward: 800,
    emoji: '🤖',
    gradient: 'from-cyan-500 to-blue-500',
    is_featured: true,
    color: 'cyan'
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile apps with React Native',
    difficulty: 'Intermediate',
    duration_hours: 30,
    total_lessons: 35,
    xp_reward: 1000,
    emoji: '📱',
    gradient: 'from-emerald-500 to-teal-500',
    is_featured: true,
    color: 'emerald'
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn to protect digital assets with ethical hacking techniques',
    difficulty: 'Advanced',
    duration_hours: 20,
    total_lessons: 25,
    xp_reward: 750,
    emoji: '🛡️',
    gradient: 'from-red-500 to-orange-500',
    is_featured: true,
    color: 'red'
  },
  {
    id: 'blockchain-crypto',
    title: 'Blockchain & Cryptocurrency',
    description: 'Understanding decentralized systems and smart contracts',
    difficulty: 'Advanced',
    duration_hours: 18,
    total_lessons: 22,
    xp_reward: 700,
    emoji: '⛓️',
    gradient: 'from-yellow-500 to-amber-500',
    is_featured: true,
    color: 'yellow'
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization Mastery',
    description: 'Create stunning charts and interactive dashboards',
    difficulty: 'Intermediate',
    duration_hours: 12,
    total_lessons: 15,
    xp_reward: 400,
    emoji: '📊',
    gradient: 'from-violet-500 to-purple-500',
    is_featured: true,
    color: 'violet'
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing Essentials',
    description: 'Master cloud platforms and deployment strategies',
    difficulty: 'Intermediate',
    duration_hours: 22,
    total_lessons: 28,
    xp_reward: 650,
    emoji: '☁️',
    gradient: 'from-blue-500 to-indigo-500',
    is_featured: true,
    color: 'blue'
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Design for Developers',
    description: 'Learn design principles and create beautiful user interfaces',
    difficulty: 'Beginner',
    duration_hours: 16,
    total_lessons: 20,
    xp_reward: 450,
    emoji: '🎨',
    gradient: 'from-pink-500 to-rose-500',
    is_featured: true,
    color: 'pink'
  }
];