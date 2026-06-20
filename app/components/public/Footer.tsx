import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Contact from "./Contact";

const Footer = () => {
  return (
    <>
    <Contact />
    <footer className="bg-foreground py-4 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex gap-5 items-center">
          <Link
            href="https://www.instagram.com/pijamariact/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/60 hover:text-background transition-colors"
          >
            <Instagram size={20} />
          </Link>
          <p className="font-body text-xs text-background/40 tracking-wider">
            © {new Date().getFullYear()} Pijamaria CT — Pijamas & Lingerie
          </p>
        </div>
        <div>
          <Link href="https://giovannaarrais.vercel.app/" target="_blank">
            <Image 
              src="/logo_ga.webp"
              alt="Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
