'use client'


import { ProductWithCategory } from "@/app/types/catalog";
import { formatPrice } from "@/utils/formatPrice";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { imagesSeparated } from "@/utils/imagesSeparated";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

interface ProductsGridProps {
  products: ProductWithCategory[] | null;
}

const Products = ({ products }: ProductsGridProps) => {
  if (!products || products.length <= 0) {
    return null;
  }



  return (
    <section id="catalogo" className="py-20 px-4 bg-primary/10">
      <div className="px-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
            Nosso Catálogo
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-4" />
          <p className="font-body text-muted-foreground text-sm max-w-lg mx-auto">
            Explore nossas peças e entre em contato pelo Instagram para fazer seu pedido
          </p>
        </motion.div>

        {/* <div className={` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6`}> */}
          <Swiper
            className="h-full py-12!"
            spaceBetween={50}
            slidesPerView={1}
            speed={1000}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              575: {
                slidesPerView: 2,
                spaceBetween:20
              },
              992: {
                slidesPerView: 3
              },
              1400: {
                slidesPerView: 5
              },
              
            }}>
            {products.map((product, i) => {
              if(!product.imageUrl) return ;

              return (
                <SwiperSlide>
                  <motion.div
                    key={product.id}
                    className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </SwiperSlide>
              )
            })}
          </Swiper>
       
        <div className="mt-10 text-center">
            <Link
              href={"/catalogo"}
              className="bg-primary p-3 text-white rounded-full px-6 cursor-pointer hover:bg-primary/80 transition-colors duration-300" >
              Ver catálogo completo
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
