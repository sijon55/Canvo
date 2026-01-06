import AboutPage from "./AboutPage";
import Hero from "../componets/Hero/Hero";
import BlogPage from "./BlogPage";
import ContactPage from "./ContactPage";
import ProjectsSection from "../componets/videoSections/ProjectsSection";
import FaqSection from "../componets/FAQ/FaqSection";

export default function HomePage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="home" data-section="home" className="min-h-[80vh]  py-12 ">
          <Hero />
        </section>

        <section id="about" data-section="about" className="  py-18">
          <AboutPage />
        </section>
      </div>
      <section id="features" data-section="features" className="  py-18">
        <ProjectsSection />
      </section>
      <section className="  ">
        <FaqSection />
      </section>
      <section id="blog" data-section="blog" className="  py-18 ">
        <BlogPage />
      </section>

      <section
        id="contact"
        data-section="contact"
        className=" mb-18"
      >
        <ContactPage />
      </section>
    </>
  );
}
