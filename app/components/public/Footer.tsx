import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-foreground py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <Image 
          src={'/assets/logo.png'}
          width={300}
          height={300}
          alt="Pijamaria CT"
          className="h-25 w-auto" 
        />
        <Link
          href="https://www.instagram.com/pijamariact/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-background/60 hover:text-background transition-colors"
        >
          <Instagram size={20} />
        </Link>
        <p className="font-body text-xs text-background/40 tracking-wider">
          © 2026 Pijamaria CT — Pijamas & Lingerie
        </p>
      </div>
    </footer>
  );
};

export default Footer;
