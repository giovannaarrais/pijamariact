'use client'

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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

interface Testimonial {
  name: string;
  message: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[] | null;
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  if(!testimonials || testimonials.length === 0) return null;
  console.log(testimonials)

  return (
    <section id="testimonials" className="py-20 pb-0 px-4 bg-card">
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

        <div className="py-5 ">
           <Swiper
            className="h-full"
            spaceBetween={50}
            slidesPerView={3}
            speed={1000}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            // navigation={true}
            // modules={[Navigation]}
          >

          {testimonials.map((t, i) => (
            <SwiperSlide>
              <motion.div
                key={t.name}
                className="bg-background rounded-xl p-6 shadow-sm border border-border min-h-[210px]"
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
                  &quot;{t.message}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-heading text-sm text-primary">
                      {t.name.split(' ')[0][0] + (t.name.split(' ').length > 1 ? t.name.split(' ')[t.name.split(' ').length - 1][0] : '')}
                    </span>
                  </div>
                  <span className="font-body text-sm font-bold text-foreground">{t.name}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
