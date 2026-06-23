import { listActiveCategories } from "@/data/categories/get";
import Categories from "../components/public/home/Categories";
import Contact from "../components/public/home/Contact";
import Footer from "../components/public/home/Footer";
import Hero from "../components/public/home/Hero";
import InstagramFeed from "../components/public/home/InstagramFeed";
import Testimonials from "../components/public/home/Testimonials";
import { listActiveProducts } from "@/data/products/get";
import { listFeedbacks } from "@/data/feedbacks/get";
import Products from "../components/public/products/Products";

export default async function Home() {

  const [products, categories, testimonials] = await Promise.all([
    listActiveProducts(6),
    listActiveCategories(),
    listFeedbacks()
  ]);

  return (
    <div className="">
        <Hero />
        <Categories categories={categories}/>
        <Products products={products}/>
        <Testimonials testimonials={testimonials || []} />
        {/* <InstagramFeed /> */}
    </div>
  );
}
