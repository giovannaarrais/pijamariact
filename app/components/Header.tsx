'use client'

import { motion } from "framer-motion";
import { Instagram, Menu, X } from "lucide-react";
import logo from "@/app/assets/logo.png";
import { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-3">
            <Image
              src='/assets/logo.png'
              alt=''
              width={70}
              height={70}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Início", "Catálogo", "Categorias", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/pijamariact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b border-border"
        >
          <div className="px-4 py-4 space-y-3">
            {["Início", "Catálogo", "Categorias", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                onClick={() => setMenuOpen(false)}
                className="block font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
