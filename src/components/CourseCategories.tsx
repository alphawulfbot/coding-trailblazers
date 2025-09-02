import { Badge } from "@/components/ui/badge";

const CourseCategories = () => {
  const categories = [
    {
      name: "Popular",
      active: true,
      courses: [
        { name: "Python", color: "bg-blue-500", emoji: "🐍" },
        { name: "JavaScript", color: "bg-yellow-500", emoji: "⚡" },
        { name: "HTML & CSS", color: "bg-orange-500", emoji: "🎨" },
        { name: "React", color: "bg-cyan-500", emoji: "⚛️" },
      ]
    },
    {
      name: "Web Development",
      active: false,
      courses: [
        { name: "HTML", color: "bg-orange-500", emoji: "📄" },
        { name: "CSS", color: "bg-blue-500", emoji: "🎨" },
        { name: "JavaScript", color: "bg-yellow-500", emoji: "⚡" },
        { name: "React", color: "bg-cyan-500", emoji: "⚛️" },
        { name: "Node.js", color: "bg-green-500", emoji: "🟢" },
      ]
    },
    {
      name: "Data Science",
      active: false,
      courses: [
        { name: "Python", color: "bg-blue-500", emoji: "🐍" },
        { name: "NumPy", color: "bg-blue-600", emoji: "🔢" },
        { name: "Pandas", color: "bg-purple-500", emoji: "🐼" },
        { name: "Machine Learning", color: "bg-pink-500", emoji: "🤖" },
      ]
    },
    {
      name: "Mobile Development",
      active: false,
      courses: [
        { name: "React Native", color: "bg-cyan-500", emoji: "📱" },
        { name: "Flutter", color: "bg-blue-400", emoji: "🦋" },
        { name: "Swift", color: "bg-orange-500", emoji: "🍎" },
        { name: "Kotlin", color: "bg-purple-600", emoji: "🤖" },
      ]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl mb-6 text-foreground">
            Journey through the
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              world of programming
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn to code with fun, interactive courses handcrafted by industry experts and educators.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.active ? "default" : "outline"}
              className={`px-6 py-3 text-sm cursor-pointer transition-adventure ${
                category.active
                  ? "bg-primary text-primary-foreground shadow-adventure"
                  : "border-primary/30 text-muted-foreground hover:bg-primary/10"
              }`}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {/* Course Languages */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {categories[0].courses.map((course) => (
            <div
              key={course.name}
              className="group relative overflow-hidden rounded-lg gradient-card p-6 text-center cursor-pointer transition-adventure hover:scale-105 hover:shadow-adventure"
            >
              <div className="text-4xl mb-3 group-hover:animate-bounce-subtle">
                {course.emoji}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{course.name}</h3>
              <div className={`w-full h-1 rounded-full ${course.color} opacity-70`} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-adventure" />
            </div>
          ))}
        </div>

        {/* All Languages Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
          {[
            { name: "C++", emoji: "⚙️" },
            { name: "Java", emoji: "☕" },
            { name: "Go", emoji: "🐹" },
            { name: "Rust", emoji: "🦀" },
            { name: "PHP", emoji: "🐘" },
            { name: "Ruby", emoji: "💎" },
            { name: "C#", emoji: "🔷" },
            { name: "TypeScript", emoji: "📘" },
            { name: "SQL", emoji: "🗃️" },
            { name: "Git", emoji: "🌿" },
            { name: "Docker", emoji: "🐳" },
            { name: "AWS", emoji: "☁️" },
          ].map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-2 p-3 rounded-lg gradient-card hover:bg-primary/10 transition-adventure cursor-pointer group"
            >
              <span className="text-xl group-hover:animate-bounce-subtle">{lang.emoji}</span>
              <span className="text-sm font-medium text-foreground">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;