import { ProductWithCategory } from "@/app/types/catalog";
import { formatPrice } from "@/utils/formatPrice";
import { imagesSeparated } from "@/utils/imagesSeparated";
import { Instagram } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface ProductCardProps {
    product: ProductWithCategory;
}

export default function ProductCard ({ product }: ProductCardProps) {

    if(!product.imageUrl) return null;
    const images = imagesSeparated(product.imageUrl)

    return (
        <>
            <div className="aspect-square overflow-hidden">
                <Swiper
                className="h-full"
                spaceBetween={50}
                slidesPerView={1}
                speed={1000}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                >
                {images.map((img) => (
                    <SwiperSlide key={img}>
                    <Image
                        src={img}
                        alt={product.name}
                        width={400}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            <div className="p-4">
            <span className="font-body text-xs tracking-widest uppercase text-primary">
                {product.category.name}
            </span>
            <h3 className="font-heading text-lg text-foreground mt-1">{product.name}</h3>
            <div className="flex items-center justify-between mt-3">
                <span className="font-body font-bold text-foreground">{formatPrice(product.price)}</span>
                <a
                href="https://www.instagram.com/pijamariact/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-body tracking-wider uppercase text-primary hover:opacity-80 transition-opacity"
                >
                <Instagram size={14} />
                Pedir
                </a>
            </div>
        </div>
        </>
    )
}