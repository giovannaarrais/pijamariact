'use client'

import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 px-4 bg-primary/20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
            Fale Conosco
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-body text-muted-foreground mb-10 max-w-md mx-auto">
            Gostou de alguma peça? Entre em contato pelo nosso Instagram para tirar dúvidas, consultar tamanhos e fazer seu pedido!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.instagram.com/pijamariact/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background font-body text-sm tracking-widest uppercase px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <Instagram size={18} />
              Siga no Instagram
            </a>
            <a
              href="https://wa.me/?text=Olá! Vi o catálogo da Pijamaria CT e gostaria de saber mais!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
