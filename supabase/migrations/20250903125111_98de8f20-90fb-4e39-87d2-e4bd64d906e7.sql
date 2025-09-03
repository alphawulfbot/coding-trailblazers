-- Add more realistic sample content to courses
UPDATE courses SET
  content = '{
    "overview": "Master the fundamentals of Python programming through interactive exercises and real-world projects.",
    "whatYouWillLearn": [
      "Variables, data types, and basic syntax",
      "Control flow with if statements and loops", 
      "Functions and code organization",
      "Working with lists, dictionaries, and sets",
      "File handling and error management",
      "Object-oriented programming basics"
    ],
    "prerequisites": ["Basic computer skills", "No prior programming experience needed"],
    "projectsIncluded": [
      "Build a calculator app",
      "Create a simple game", 
      "Data analysis with CSV files"
    ]
  }'
WHERE title = 'Python Fundamentals';

UPDATE courses SET
  content = '{
    "overview": "Learn modern JavaScript from basics to advanced concepts, including ES6+ features and async programming.",
    "whatYouWillLearn": [
      "JavaScript syntax and core concepts",
      "DOM manipulation and events",
      "ES6+ features: arrow functions, destructuring, modules",
      "Asynchronous programming with Promises and async/await",
      "Working with APIs and fetch requests",
      "Modern development tools and workflow"
    ],
    "prerequisites": ["HTML & CSS basics", "Basic programming concepts helpful"],
    "projectsIncluded": [
      "Interactive todo list app",
      "Weather dashboard with API integration",
      "Simple e-commerce cart system"
    ]
  }'
WHERE title = 'JavaScript Mastery';

-- Add comprehensive lesson content for Python course lessons
UPDATE lessons SET
  content = '{
    "content": "Welcome to Python! Python is a powerful, easy-to-learn programming language. In this lesson, you will learn about variables - containers that store data values. Variables in Python are created when you assign a value to them.",
    "codeExample": "# Creating variables\nname = \"Alice\"\nage = 25\nheight = 5.6\nis_student = True\n\nprint(f\"Hello, my name is {name}\")\nprint(f\"I am {age} years old\")",
    "keyPoints": [
      "Variables store data values",
      "Python has no command for declaring variables", 
      "Variables are created when you assign a value",
      "Variable names are case-sensitive"
    ],
    "exercises": [{
      "type": "coding",
      "prompt": "Create three variables: your name (string), your age (number), and whether you like coding (boolean). Then print them using f-strings.",
      "solution": "name = \"Your Name\"\nage = 20\nlikes_coding = True\n\nprint(f\"My name is {name}\")\nprint(f\"I am {age} years old\")\nprint(f\"I like coding: {likes_coding}\")"
    }]
  }'
WHERE title = 'Variables and Data Types';

UPDATE lessons SET
  content = '{
    "content": "Control flow allows your program to make decisions. The if statement lets you execute code only when certain conditions are true. You can also use elif for additional conditions and else for when no conditions are met.",
    "codeExample": "age = 18\n\nif age >= 18:\n    print(\"You are an adult\")\nelif age >= 13:\n    print(\"You are a teenager\") \nelse:\n    print(\"You are a child\")\n\n# Comparison operators: ==, !=, <, >, <=, >=",
    "keyPoints": [
      "if statements execute code based on conditions",
      "elif allows for multiple conditions",
      "else handles all other cases",
      "Indentation is crucial in Python"
    ],
    "exercises": [{
      "type": "coding", 
      "prompt": "Write a program that checks if a number is positive, negative, or zero, and prints an appropriate message.",
      "solution": "number = 5\n\nif number > 0:\n    print(\"The number is positive\")\nelif number < 0:\n    print(\"The number is negative\")\nelse:\n    print(\"The number is zero\")"
    }]
  }'
WHERE title = 'Control Flow and Conditionals';

UPDATE lessons SET
  content = '{
    "content": "Loops allow you to repeat code multiple times. Python has two main types of loops: for loops (iterate over sequences) and while loops (repeat while a condition is true).",
    "codeExample": "# For loop\nfor i in range(5):\n    print(f\"Count: {i}\")\n\n# For loop with list\nfruits = [\"apple\", \"banana\", \"orange\"]\nfor fruit in fruits:\n    print(f\"I like {fruit}\")\n\n# While loop\ncount = 0\nwhile count < 3:\n    print(f\"While count: {count}\")\n    count += 1",
    "keyPoints": [
      "for loops iterate over sequences",
      "range() generates number sequences", 
      "while loops repeat while condition is true",
      "Be careful to avoid infinite loops"
    ],
    "exercises": [{
      "type": "coding",
      "prompt": "Create a for loop that prints the numbers 1 to 10, but only prints even numbers.",
      "solution": "for i in range(1, 11):\n    if i % 2 == 0:\n        print(i)"
    }]
  }'
WHERE title = 'Loops and Iteration';

-- Add content for JavaScript course lessons  
UPDATE lessons SET
  content = '{
    "content": "JavaScript is the language of the web! It brings interactivity to websites. In this lesson, you will learn about variables, which store data values. JavaScript has three ways to declare variables: var, let, and const.",
    "codeExample": "// Different ways to declare variables\nlet name = \"John\";\nconst age = 25;\nvar city = \"New York\";\n\n// Variables can store different types of data\nlet score = 100;           // number\nlet isActive = true;       // boolean\nlet hobbies = [\"coding\", \"gaming\"]; // array\n\nconsole.log(`Hello ${name}, you are ${age} years old`);",
    "keyPoints": [
      "let is used for variables that can change",
      "const is for constants that cannot be reassigned",
      "var is the old way (avoid in modern JS)",
      "JavaScript is dynamically typed"
    ],
    "exercises": [{
      "type": "coding",
      "prompt": "Create variables for your favorite movie (string), rating (number), and whether you recommend it (boolean). Log them to the console.",
      "solution": "const favoriteMovie = \"The Matrix\";\nlet rating = 9.5;\nconst wouldRecommend = true;\n\nconsole.log(`Movie: ${favoriteMovie}`);\nconsole.log(`Rating: ${rating}/10`);\nconsole.log(`Recommend: ${wouldRecommend}`);"
    }]
  }'
WHERE title = 'JavaScript Basics and Syntax';

UPDATE lessons SET
  content = '{
    "content": "Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition. In JavaScript, you can create functions using function declarations, function expressions, or arrow functions.",
    "codeExample": "// Function declaration\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\n\n// Arrow function (ES6+)\nconst add = (a, b) => a + b;\n\n// Function with default parameters\nfunction createUser(name, age = 18) {\n    return {\n        name: name,\n        age: age,\n        isAdult: age >= 18\n    };\n}\n\n// Using the functions\nconsole.log(greet(\"Alice\"));\nconsole.log(add(5, 3));\nconsole.log(createUser(\"Bob\", 25));",
    "keyPoints": [
      "Functions make code reusable and organized",
      "Parameters allow functions to accept input",
      "return statement sends values back",
      "Arrow functions provide shorter syntax"
    ],
    "exercises": [{
      "type": "coding", 
      "prompt": "Create a function called \'calculateArea\' that takes width and height parameters and returns the area of a rectangle.",
      "solution": "function calculateArea(width, height) {\n    return width * height;\n}\n\n// Or as arrow function:\nconst calculateArea = (width, height) => width * height;\n\nconsole.log(calculateArea(5, 10)); // 50"
    }]
  }'
WHERE title = 'Functions and Scope';