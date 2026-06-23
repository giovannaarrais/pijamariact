'use client'

import { motion } from "framer-motion";
import Container from "./Container";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface HeroTitleSubpageProps {
  title: string;
  desc?:string;
  buttonBack?: boolean; 
}
const HeroTitleSubpage = ({title, desc, buttonBack}:HeroTitleSubpageProps) => {

  const handleBack = () => {
    window.history.back()
  }
  return (
    <section id="hero" className="relative justify-center overflow-hidden mb-20 py-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(assets/hero-bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <Container extraClass="py-0!">
        <div className="relative z-10 text-start">
          <motion.p
            className="font-body text-lg sm:text-xl tracking-[0.2em] uppercase text-card mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {buttonBack && (
              <Button variant="ghost" onClick={handleBack} className="p-0! bg-none! me-2">
                <ArrowLeft  />
              </Button>
            )}
            {title}
          </motion.p>
          <motion.p
            className="font-body text-sm sm:text-base text-card/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {desc || ''}
          </motion.p>
        </div>
      </Container>

    </section>
  );
};

export default HeroTitleSubpage;
