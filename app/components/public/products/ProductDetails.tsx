'use client'

import { ProductWithCategory } from "@/app/types/catalog";
import { formatPrice } from "@/utils/formatPrice";
import { imagesSeparated } from "@/utils/imagesSeparated";
import { motion } from "framer-motion";
import { MessageCircle, Tag, Ruler, Package, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface ProductDetailsProps {
    product: ProductWithCategory;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const images = imagesSeparated(product.imageUrl);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const message = `Olá! Vi o produto *${product.name}* no catálogo e gostaria de saber mais!`;
    // 984940710
    const whatsappLink = `https://wa.me/+5561995610437?text=${encodeURIComponent(message)}`;

    const sizeOrder = ["PP", "P", "M", "G", "GG"];
    const sortedSizes = [...product.sizes].sort(
        (a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)
    );

    return (
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
            {/* ───── Galeria de imagens ───── */}
            <motion.div
                className="lg:w-1/2 flex flex-col gap-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Imagem principal */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-md">
                    {images.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Thumbs]}
                            navigation
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            loop={images.length > 1}
                            speed={600}
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            className="h-full w-full"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <Image
                                        src={img}
                                        alt={`${product.name} - imagem ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-muted">
                            <Package size={64} className="text-muted-foreground opacity-40" />
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <Swiper
                        modules={[FreeMode, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={Math.min(images.length, 5)}
                        freeMode
                        watchSlidesProgress
                        className="w-full"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                                        activeIndex === i
                                            ? "border-primary opacity-100"
                                            : "border-transparent opacity-60 hover:opacity-80"
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Miniatura ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="100px"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </motion.div>

            {/* ───── Informações do produto ───── */}
            <motion.div
                className="lg:w-1/2 flex flex-col gap-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {/* Categoria + status */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-xs font-body tracking-widest uppercase text-primary font-semibold">
                        <Tag size={13} />
                        {product.category.name}
                    </span>
                    {product.active ? (
                        <span className="inline-flex items-center gap-1 text-xs font-body text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            <CheckCircle size={12} />
                            Disponível
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-body text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                            <XCircle size={12} />
                            Indisponível
                        </span>
                    )}
                </div>

                {/* Nome */}
                <h1 className="font-heading text-3xl sm:text-4xl text-foreground leading-tight">
                    {product.name}
                </h1>

                {/* Preço */}
                <div className="inline-block">
                    <span className="font-heading text-4xl text-primary font-bold">
                        {formatPrice(product.price)}
                    </span>
                </div>

                {/* Divisor */}
                <hr className="border-border" />

                {/* Descrição */}
                {product.description && (
                    <div className="space-y-2">
                        <p className="font-body text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                            Descrição
                        </p>
                        <p className="font-body text-foreground/80 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                )}

                {/* Tamanhos */}
                {sortedSizes.length > 0 && (
                    <div className="space-y-3">
                        <p className="font-body text-sm uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
                            <Ruler size={14} />
                            Tamanhos disponíveis
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {sortedSizes.map((size) => (
                                <span
                                    key={size}
                                    className="font-body text-sm font-semibold uppercase px-4 py-2 rounded-full bg-secondary text-secondary-foreground border border-border hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200 cursor-default"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA WhatsApp */}
                <div className="pt-2">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-primary text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:opacity-85 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        <MessageCircle size={18} />
                        Quero este produto
                    </a>
                    <p className="text-xs text-muted-foreground font-body mt-3">
                        Atendimento via WhatsApp · Resposta rápida
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
