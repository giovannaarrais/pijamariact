import Categories from "../components/Categories";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import InstagramFeed from "../components/InstagramFeed";
import ProductGrid from "../components/ProductGrid";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="">
      <main className="">
      
        <Hero />
        <Categories />
        <ProductGrid />
        <Testimonials />
        {/* <InstagramFeed /> */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
