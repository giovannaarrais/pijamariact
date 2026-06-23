'use client'

import { motion } from "framer-motion";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/app/assets/logo.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems =[
    { name: "Início", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Categorias", href: "/categorias" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex items-center gap-3">
            <Image
              src='/logo.png'
              alt=''
              width={90}
              height={90}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/pijamariact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </Link>
              <Link
              href="https://wa.me/+556184940710?text=Olá! Vi o catálogo da Pijamaria CT e gostaria de saber mais!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs tracking-widest uppercase px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              WhatsApp
            </Link>
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
