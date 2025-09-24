import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer.tsx';
import { 
  Play, 
  Clock, 
  Zap, 
  CheckCircle, 
  BookOpen, 
  Code, 
  Palette, 
  Database,
  Lightbulb,
  Target,
  Trophy,
  Star
} from 'lucide-react';

interface LanguageTutorial {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  duration_minutes: number;
  xp_reward: number;
  sections: {
    type: string;
    title: string;
    content: string;
    code?: string;
    exercise?: string;
  }[];
  isCompleted?: boolean;
}

const languageTutorials: LanguageTutorial[] = [
  {
    id: 'js-variables',
    title: 'JavaScript Variables & Data Types',
    description: 'Master JavaScript variables, let, const, and primitive data types',
    language: 'JavaScript',
    difficulty: 'Beginner',
    duration_minutes: 25,
    xp_reward: 30,
    sections: [
      {
        type: 'theory',
        title: 'Understanding Variables',
        content: 'Variables are containers that store data values. In JavaScript, we use let, const, and var to declare variables.'
      },
      {
        type: 'code',
        title: 'Variable Declaration',
        content: 'Here\'s how to declare variables in JavaScript:',
        code: `// Using let for variables that can change
let playerName = "CodeHunter";
let score = 0;

// Using const for constants
const MAX_LEVEL = 100;
const PI = 3.14159;

// Data types
let age = 25;           // Number
let isActive = true;    // Boolean
let message = "Hello";  // String
let nothing = null;     // Null
let notDefined;         // Undefined`
      },
      {
        type: 'exercise',
        title: 'Practice Exercise',
        content: 'Try creating variables for a game character:',
        exercise: 'Create variables for: character name, health points, level, and whether they have a weapon'
      }
    ]
  },
  {
    id: 'js-functions',
    title: 'JavaScript Functions',
    description: 'Learn to create reusable code with JavaScript functions',
    language: 'JavaScript',
    difficulty: 'Beginner',
    duration_minutes: 30,
    xp_reward: 35,
    sections: [
      {
        type: 'theory',
        title: 'What are Functions?',
        content: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.'
      },
      {
        type: 'code',
        title: 'Function Syntax',
        content: 'Different ways to create functions:',
        code: `// Function declaration
function greetPlayer(name) {
    return "Welcome, " + name + "!";
}

// Function expression
const calculateDamage = function(attack, defense) {
    return Math.max(0, attack - defense);
};

// Arrow function (ES6)
const gainExperience = (currentXP, bonus) => {
    return currentXP + bonus;
};

// Using functions
console.log(greetPlayer("Hero"));
console.log(calculateDamage(50, 20));
console.log(gainExperience(100, 25));`
      },
      {
        type: 'exercise', 
        title: 'Build a Level System',
        content: 'Create functions for a game level system:',
        exercise: 'Write functions to: check if player can level up, calculate required XP for next level, and level up the player'
      }
    ]
  },
  {
    id: 'python-basics',
    title: 'Python Syntax & Variables',
    description: 'Get started with Python syntax, variables, and basic operations',
    language: 'Python',
    difficulty: 'Beginner', 
    duration_minutes: 20,
    xp_reward: 25,
    sections: [
      {
        type: 'theory',
        title: 'Python Syntax Rules',
        content: 'Python uses indentation to define code blocks. No curly braces needed!'
      },
      {
        type: 'code',
        title: 'Variables and Types',
        content: 'Python variables are dynamically typed:',
        code: `# Variables in Python
player_name = "CodeMaster"
health = 100
level = 1
is_alive = True

# Python is dynamically typed
score = 0        # Integer
score = 95.5     # Now it's a float
score = "A+"     # Now it's a string

# Multiple assignment
x, y, z = 1, 2, 3
name = age = "Unknown"

# Print output
print(f"Player: {player_name}")
print(f"Health: {health}/100")
print(f"Level: {level}")`
      },
      {
        type: 'exercise',
        title: 'Character Stats',
        content: 'Create a character stat system:',
        exercise: 'Create variables for character stats and print a character sheet'
      }
    ]
  },
  {
    id: 'react-components',
    title: 'React Components & JSX',
    description: 'Build your first React components and understand JSX syntax',
    language: 'React',
    difficulty: 'Beginner',
    duration_minutes: 35,
    xp_reward: 40,
    sections: [
      {
        type: 'theory',
        title: 'What is JSX?',
        content: 'JSX is a syntax extension for JavaScript that lets you write HTML-like code in your React components.'
      },
      {
        type: 'code',
        title: 'Your First Component',
        content: 'Here\'s how to create React components:',
        code: `// Function component
function PlayerCard({ name, level, health }) {
    return (
        <div className="player-card">
            <h2>{name}</h2>
            <p>Level: {level}</p>
            <div className="health-bar">
                Health: {health}/100
            </div>
        </div>
    );
}

// Using the component
function Game() {
    return (
        <div>
            <h1>My Game</h1>
            <PlayerCard 
                name="Hero" 
                level={5} 
                health={85} 
            />
        </div>
    );
}`
      },
      {
        type: 'exercise',
        title: 'Build a Game UI',
        content: 'Create React components for a simple game:',
        exercise: 'Build components for: inventory item, skill tree node, and quest log entry'
      }
    ]
  },
  {
    id: 'css-styling',
    title: 'CSS Styling Fundamentals',
    description: 'Learn CSS selectors, properties, and how to style web pages',
    language: 'CSS',
    difficulty: 'Beginner',
    duration_minutes: 30,
    xp_reward: 30,
    sections: [
      {
        type: 'theory',
        title: 'CSS Basics',
        content: 'CSS (Cascading Style Sheets) is used to style HTML elements and make web pages look beautiful.'
      },
      {
        type: 'code',
        title: 'Selectors and Properties',
        content: 'Basic CSS syntax and selectors:',
        code: `/* Element selector */
h1 {
    color: #2c3e50;
    font-size: 2rem;
    text-align: center;
}

/* Class selector */
.player-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ID selector */
#game-board {
    width: 800px;
    height: 600px;
    margin: 0 auto;
}

/* Hover effects */
.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}`
      },
      {
        type: 'exercise',
        title: 'Style a Game Interface',
        content: 'Practice CSS styling:',
        exercise: 'Create styles for: game buttons, character health bars, and inventory grid'
      }
    ]
  },
  {
    id: 'html-structure',
    title: 'HTML Document Structure',
    description: 'Learn HTML elements, attributes, and semantic structure',
    language: 'HTML',
    difficulty: 'Beginner',
    duration_minutes: 25,
    xp_reward: 25,
    sections: [
      {
        type: 'theory',
        title: 'HTML Basics',
        content: 'HTML (HyperText Markup Language) provides the structure and content of web pages using elements and tags.'
      },
      {
        type: 'code',
        title: 'HTML Document Structure',
        content: 'Basic HTML document structure:',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game</title>
</head>
<body>
    <header>
        <h1>Epic Quest Game</h1>
        <nav>
            <ul>
                <li><a href="#play">Play</a></li>
                <li><a href="#stats">Stats</a></li>
                <li><a href="#inventory">Inventory</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="game-area">
            <h2>Game Board</h2>
            <div class="player-info">
                <span>Health: 100</span>
                <span>Level: 5</span>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Game</p>
    </footer>
</body>
</html>`
      },
      {
        type: 'exercise',
        title: 'Build a Game Page',
        content: 'Create HTML structure:',
        exercise: 'Build an HTML page for a game with: header, game area, sidebar, and footer'
      }
    ]
  }
];

const Tutorials = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(new Set());
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);

  const languages = ['All', ...Array.from(new Set(languageTutorials.map(t => t.language)))];
  const filteredTutorials = selectedLanguage === 'All' 
    ? languageTutorials 
    : languageTutorials.filter(t => t.language === selectedLanguage);

  const completedCount = completedTutorials.size;
  const completionRate = languageTutorials.length > 0 ? (completedCount / languageTutorials.length) * 100 : 0;

  const startTutorial = (tutorialId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return;
    }

    setExpandedTutorial(expandedTutorial === tutorialId ? null : tutorialId);
    toast({
      title: "Tutorial Started!",
      description: "Work through the sections to complete this tutorial"
    });
  };

  const completeTutorial = (tutorialId: string, xpReward: number) => {
    if (!user) return;

    setCompletedTutorials(prev => new Set([...prev, tutorialId]));
    setExpandedTutorial(null);
    
    toast({
      title: "Tutorial Completed! 🎉",
      description: `You earned ${xpReward} XP!`
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-primary text-primary-foreground';
      case 'advanced': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language.toLowerCase()) {
      case 'javascript': return '🟨';
      case 'python': return '🐍';
      case 'react': return '⚛️';
      case 'css': return '🎨';
      case 'html': return '🌐';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-heading text-primary mb-4">
              Programming Language Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master programming languages step by step with interactive tutorials and hands-on exercises!
            </p>
            
            {user && (
              <Card className="max-w-md mx-auto bg-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedCount}/{languageTutorials.length} completed
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Language Filter */}
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              {languages.map((language) => (
                <TabsTrigger key={language} value={language} className="text-xs">
                  {language === 'All' ? 'All' : `${getLanguageIcon(language)} ${language}`}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Tutorials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => {
              const isCompleted = completedTutorials.has(tutorial.id);
              const isExpanded = expandedTutorial === tutorial.id;
              
              return (
                <Card 
                  key={tutorial.id} 
                  className="group relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getLanguageIcon(tutorial.language)}</span>
                        <Badge variant="outline">{tutorial.language}</Badge>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tutorial.duration_minutes} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {tutorial.xp_reward} XP
                      </div>
                    </div>

                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      <Zap className="h-3 w-3 mr-1" />
                      {tutorial.difficulty}
                    </Badge>

                    {/* Tutorial Sections Preview */}
                    {isExpanded && (
                      <div className="space-y-3 border-t pt-4">
                        <h4 className="font-medium text-sm">Tutorial Sections:</h4>
                        {tutorial.sections.map((section, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              {section.type === 'theory' && <BookOpen className="h-4 w-4" />}
                              {section.type === 'code' && <Code className="h-4 w-4" />}
                              {section.type === 'exercise' && <Target className="h-4 w-4" />}
                              <span className="font-medium text-sm">{section.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{section.content}</p>
                            {section.code && (
                              <pre className="mt-2 p-2 bg-background rounded text-xs overflow-x-auto">
                                <code>{section.code.slice(0, 100)}...</code>
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button 
                        onClick={() => startTutorial(tutorial.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure"
                        disabled={isCompleted}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {isCompleted ? 'Completed' : isExpanded ? 'Collapse' : 'Start Tutorial'}
                      </Button>
                      
                      {isExpanded && !isCompleted && (
                        <Button 
                          onClick={() => completeTutorial(tutorial.id, tutorial.xp_reward)}
                          variant="outline"
                          className="w-full"
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Complete Tutorial
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tutorials available</h3>
              <p className="text-muted-foreground mb-4">
                {selectedLanguage === 'All' ? 'Check back soon for new tutorials!' : `No ${selectedLanguage} tutorials available.`}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedLanguage('All')}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                View All Tutorials
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tutorials;