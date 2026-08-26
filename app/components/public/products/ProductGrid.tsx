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
import { Category } from "@/app/types/catalog";
import FilterProducts from "../../admin/filterProducts";
import { useState } from "react";

interface ProductsGridProps {
  products: ProductWithCategory[] | null;
  categories?: Category[] | null;
}

const ProductGrid = ({ products, categories }: ProductsGridProps) => {
  if (!products || products.length <= 0) {
    return null;
  }
  
  
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>(products);

  return (
    <>

      <div className="px-10 products-box">

        <div className="flex lg:flex-row flex-col gap-8 xl:px-20">
          <div className="lg:max-w-[350px] w-full">
            <FilterProducts products={products} categories={categories} onFilteredProducts={setFilteredProducts} exibicaoFront />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 gap-6  `}>
          {filteredProducts.map((product, i) => {
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
      </div>
    </>
  );
};

export default ProductGrid;
