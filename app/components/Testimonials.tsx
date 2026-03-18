'use client'

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Camila S.",
    text: "Amei o pijama de cetim! Super confortável e a qualidade é incrível. Já quero mais peças!",
    rating: 5,
    initials: "CS",
  },
  {
    name: "Fernanda L.",
    text: "Comprei o robe para presentear minha mãe e ela ficou encantada. Entrega rápida e embalagem linda.",
    rating: 5,
    initials: "FL",
  },
  {
    name: "Juliana M.",
    text: "As peças são lindas e delicadas. Atendimento super atencioso pelo Instagram. Recomendo demais!",
    rating: 5,
    initials: "JM",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-3">
            O Que Nossas Clientes Dizem
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-background rounded-xl p-6 shadow-sm border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-heading text-sm text-primary">{t.initials}</span>
                </div>
                <span className="font-body text-sm font-bold text-foreground">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
