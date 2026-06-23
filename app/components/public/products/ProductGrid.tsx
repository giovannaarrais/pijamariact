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

interface ProductsGridProps {
  products: ProductWithCategory[] | null;
  extraClass?: string
}

const ProductGrid = ({ products, extraClass }: ProductsGridProps) => {
  if (!products || products.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="px-10 products-box">
        <div className={` ${extraClass || ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6`}>
          {products.map((product, i) => {
            if(!product.imageUrl) return ;
            

            return (
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
            )
          })}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
