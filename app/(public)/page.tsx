import { listActiveCategories } from "@/data/categories/get";
import Categories from "../components/public/Categories";
import Contact from "../components/public/Contact";
import Footer from "../components/public/Footer";
import Hero from "../components/public/Hero";
import InstagramFeed from "../components/public/InstagramFeed";
import ProductGrid from "../components/public/ProductGrid";
import Testimonials from "../components/public/Testimonials";
import { listActiveProducts } from "@/data/products/get";

export default async function Home() {

  const [products, categories] = await Promise.all([
    listActiveProducts(),
    listActiveCategories()
  ]);

  return (
    <div className="">
      <main className="">
      
        <Hero />
        <Categories categories={categories}/>
        <ProductGrid products={products}/>
        <Testimonials />
        {/* <InstagramFeed /> */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
