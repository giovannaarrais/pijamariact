'use client'

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import productPijama1 from "@/public/assets/product-pijama-1.jpg";
import productPijama2 from "@/public/assets/product-pijama-2.jpg";
import productPijama3 from "@/public/assets/product-pijama-3.jpg";
import productLingerie1 from "@/public/assets/product-lingerie-1.jpg";
import productLingerie2 from "@/public/assets/product-lingerie-2.jpg";
import productRobe1 from "@/public/assets/product-robe-1.jpg";

const posts = [
  { image: productPijama1, likes: 124 },
  { image: productLingerie1, likes: 98 },
  { image: productPijama2, likes: 156 },
  { image: productRobe1, likes: 203 },
  { image: productPijama3, likes: 87 },
  { image: productLingerie2, likes: 142 },
];

const InstagramFeed = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram size={28} className="text-foreground" />
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
              @pijamariact
            </h2>
          </div>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-4" />
          <p className="font-body text-sm text-muted-foreground">
            Acompanhe nossas novidades no Instagram
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/pijamariact/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-md"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <img
                src={post.image}
                alt="Post Instagram"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  <Instagram size={20} className="text-card" />
                  <span className="font-body text-sm font-bold text-card">
                    {post.likes} ❤
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://www.instagram.com/pijamariact/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background font-body text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram size={16} />
            Seguir no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
