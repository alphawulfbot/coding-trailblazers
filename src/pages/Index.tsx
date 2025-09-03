import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseCategories from "@/components/CourseCategories";
import FeaturedCourses from "@/components/FeaturedCourses";
import StatsBanner from "@/components/StatsBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CourseCategories />
        <StatsBanner />
        <FeaturedCourses />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
