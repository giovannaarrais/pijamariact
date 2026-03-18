'use client'

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(assets/hero-bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 text-center px-4">
        <motion.img
          src={'/assets/logo.png'}
          alt="Pijamaria CT"
          className="h-32 sm:h-44 w-auto mx-auto mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.p
          className="font-body text-lg sm:text-xl tracking-[0.3em] uppercase text-card mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Pijamas & Lingerie
        </motion.p>
        <motion.p
          className="font-body text-sm sm:text-base text-card/80 max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Conforto e elegância para todas as suas noites
        </motion.p>
        <motion.a
          href="#catalogo"
          className="inline-block bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Ver Catálogo
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
