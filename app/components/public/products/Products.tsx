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

        <ProductGrid products={products}/>
       
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
