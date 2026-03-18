'use client'


import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const products = [
  { name: "Conjunto Rosa Cetim", category: "Pijamas", image: '/assets/product-pijama-1.jpg', price: "R$ 89,90" },
  { name: "Sutiã Renda Branca", category: "Lingerie", image: '/assets/product-pijama-2.jpg', price: "R$ 59,90" },
  { name: "Conjunto Verde Menta", category: "Pijamas", image: '/assets/product-pijama-3.jpg', price: "R$ 79,90" },
  { name: "Robe Rosé com Renda", category: "Robes", image: '/assets/product-lingerie-1.jpg', price: "R$ 119,90" },
  { name: "Pijama Floral Marinho", category: "Pijamas", image: '/assets/product-lingerie-2.jpg', price: "R$ 99,90" },
  { name: "Camisola Lavanda", category: "Lingerie", image: '/assets/product-robe-1.jpg', price: "R$ 69,90" },
];

const ProductGrid = () => {
  return (
    <section id="catalogo" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <span className="font-body text-xs tracking-widest uppercase text-primary">
                  {product.category}
                </span>
                <h3 className="font-heading text-lg text-foreground mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-body font-bold text-foreground">{product.price}</span>
                  <a
                    href="https://www.instagram.com/pijamariact/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-body tracking-wider uppercase text-primary hover:opacity-80 transition-opacity"
                  >
                    <Instagram size={14} />
                    Pedir
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
