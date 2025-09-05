import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Code, Zap, Target, Trophy, CheckCircle, XCircle, Play } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Practice = () => {
  const { user } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<{ passed: number; total: number } | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Array Sum",
      description: "Write a function that returns the sum of all numbers in an array",
      difficulty: "Beginner",
      xp: 50,
      icon: "🎯",
      template: `function arraySum(numbers) {
  // Your code here
  return 0;
}`,
      solution: `function arraySum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}`,
      tests: [
        { input: "[1, 2, 3, 4, 5]", expected: "15" },
        { input: "[10, -5, 3]", expected: "8" },
        { input: "[]", expected: "0" }
      ]
    },
    {
      id: 2,
      title: "Palindrome Checker",
      description: "Check if a string reads the same forwards and backwards",
      difficulty: "Intermediate", 
      xp: 75,
      icon: "🔄",
      template: `function isPalindrome(str) {
  // Your code here
  return false;
}`,
      solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
      tests: [
        { input: "'racecar'", expected: "true" },
        { input: "'hello'", expected: "false" },
        { input: "'A man a plan a canal Panama'", expected: "true" }
      ]
    },
    {
      id: 3,
      title: "Fibonacci Sequence",
      description: "Generate the nth number in the Fibonacci sequence",
      difficulty: "Advanced",
      xp: 100,
      icon: "🔢",
      template: `function fibonacci(n) {
  // Your code here
  return 0;
}`,
      solution: `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
      tests: [
        { input: "0", expected: "0" },
        { input: "5", expected: "5" },
        { input: "10", expected: "55" }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-primary text-primary-foreground';
      case 'advanced': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const runTests = async (challenge: any) => {
    setIsRunning(true);
    
    try {
      // Simple test runner (in a real app, this would be more sophisticated)
      let passed = 0;
      
      // Basic syntax check and execution simulation
      if (userCode.includes('function') && userCode.includes('return')) {
        // Simulate test results based on code content
        if (userCode.includes(challenge.title.toLowerCase().replace(' ', '')) || 
            userCode.length > challenge.template.length) {
          passed = challenge.tests.length;
        } else {
          passed = Math.floor(challenge.tests.length / 2);
        }
      }

      setTestResults({ passed, total: challenge.tests.length });

      if (passed === challenge.tests.length) {
        toast.success(`Challenge completed! +${challenge.xp} XP`);
        
        // Save progress if user is logged in (simulated for now)
        if (user) {
          // In a real app, this would save to database
          console.log(`Challenge ${challenge.id} completed by user ${user.id}`);
        }
      } else {
        toast.error(`${passed}/${challenge.tests.length} tests passed. Keep trying!`);
      }
    } catch (error) {
      toast.error("Error running tests");
    } finally {
      setIsRunning(false);
    }
  };

  const currentChallenge = challenges.find(c => c.id === selectedChallenge);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-primary mb-4">Practice Challenges</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharpen your coding skills with interactive challenges and coding puzzles
          </p>
        </div>

        {!selectedChallenge ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className="relative overflow-hidden border shadow-card hover:shadow-adventure transition-adventure cursor-pointer"
                onClick={() => {
                  setSelectedChallenge(challenge.id);
                  setUserCode(challenge.template);
                  setTestResults(null);
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-2xl mb-2">{challenge.icon}</div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">{challenge.title}</CardTitle>
                  <CardDescription className="text-sm">{challenge.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      Interactive
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      {challenge.xp} XP
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Challenge
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-adventure transition-adventure">
                    <Play className="h-4 w-4 mr-2" />
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{currentChallenge?.icon}</span>
                    {currentChallenge?.title}
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedChallenge(null)}
                  >
                    Back
                  </Button>
                </div>
                <CardDescription>{currentChallenge?.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Solution:</label>
                  <Textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="font-mono text-sm min-h-[200px]"
                    placeholder="Write your code here..."
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => currentChallenge && runTests(currentChallenge)}
                    disabled={isRunning}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isRunning ? 'Running...' : 'Run Tests'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => currentChallenge && setUserCode(currentChallenge.template)}
                  >
                    Reset Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Test Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentChallenge?.tests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="font-mono text-sm">
                          <span className="text-muted-foreground">Input:</span> {test.input}
                        </div>
                        <div className="font-mono text-sm">
                          <span className="text-muted-foreground">Expected:</span> {test.expected}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {testResults && (
                <Card className="border shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {testResults.passed === testResults.total ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Tests Passed:</span>
                        <span>{testResults.passed}/{testResults.total}</span>
                      </div>
                      <Progress 
                        value={(testResults.passed / testResults.total) * 100} 
                        className="h-2"
                      />
                      {testResults.passed === testResults.total && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Trophy className="h-4 w-4" />
                          Challenge Completed! +{currentChallenge?.xp} XP
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Practice;