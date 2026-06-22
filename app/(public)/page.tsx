import { listActiveCategories } from "@/data/categories/get";
import Categories from "../components/public/Categories";
import Contact from "../components/public/Contact";
import Footer from "../components/public/Footer";
import Hero from "../components/public/Hero";
import InstagramFeed from "../components/public/InstagramFeed";
import ProductGrid from "../components/public/ProductGrid";
import Testimonials from "../components/public/Testimonials";
import { listActiveProducts } from "@/data/products/get";
import { listFeedbacks } from "@/data/feedbacks/get";

export default async function Home() {

  const [products, categories, testimonials] = await Promise.all([
    listActiveProducts(6),
    listActiveCategories(),
    listFeedbacks()
  ]);

  return (
    <div className="">
      <main className="">
      
        <Hero />
        <Categories categories={categories}/>
        <ProductGrid products={products}/>
        <Testimonials testimonials={testimonials || []} />
        {/* <InstagramFeed /> */}
        <Footer />
      </main>
    </div>
  );
}
