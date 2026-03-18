'use client'

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  { name: "Pijamas", image: '/assets/product-pijama-1.jpg', description: "Conjuntos confortáveis para suas noites" },
  { name: "Lingerie", image: '/assets/product-lingerie-1.jpg', description: "Peças delicadas e sofisticadas" },
  { name: "Robes", image: '/assets/product-robe-1.jpg', description: "Elegância e conforto em cada detalhe" },
];

const Categories = () => {
  return (
    <section id="categorias" className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
            Nossas Categorias
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400} 
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="font-heading text-2xl text-card mb-1">{cat.name}</h3>
                <p className="font-body text-sm text-card/80">{cat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
