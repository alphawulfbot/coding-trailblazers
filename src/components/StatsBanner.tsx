import { Users, BookOpen, Trophy, Star } from "lucide-react";

const StatsBanner = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Learners",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      value: "200+",
      label: "Courses Available", 
      color: "text-secondary"
    },
    {
      icon: Trophy,
      value: "15M+",
      label: "XP Points Earned",
      color: "text-accent"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      color: "text-yellow-500"
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-center">
                  <Icon className={`h-8 w-8 ${stat.color}`} aria-hidden="true" />
                </div>
                <div className="text-3xl font-heading text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;