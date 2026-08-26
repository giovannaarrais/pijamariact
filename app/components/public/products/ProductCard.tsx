import { ProductWithCategory } from "@/app/types/catalog";
import { formatPrice } from "@/utils/formatPrice";
import { imagesSeparated } from "@/utils/imagesSeparated";
import { ChartArea, Instagram, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";

interface ProductCardProps {
    product: ProductWithCategory;
}

export default function ProductCard ({ product }: ProductCardProps) {

    if(!product.imageUrl) return null;
    const images = imagesSeparated(product.imageUrl)
    const message = `Olá! Vi o produto ${product.name} no catálogo e gostaria de saber mais!`
    const whatsappLink = `https://wa.me/+556184940710?text=${encodeURIComponent(message)}`

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
            <div className="flex items-center justify-between gap-3">
                <span className="font-body text-xs tracking-widest uppercase text-primary">
                    {product.category.name}
                </span>

                <div className="">
                    <span className="font-body font-bold text-foreground">{formatPrice(product.price)}</span>
                </div>
            </div>
            <h3 className="font-heading text-lg text-foreground mt-1">{product.name}</h3>
            <div className="flex gap-2 mt-2 justify-start">
                {product.sizes && product.sizes.length > 0 && product.sizes.map((size, i) => (
                    <span key={i} className="font-body text-xs uppercase text-white bg-gray-400/40 px-2 py-1 font-semibold rounded-full">
                        {size}
                    </span>
                ))}

            </div>
            
            <div className="flex items-center justify-between mt-2">
                <Link
                    href={`/catalogo/${product.id}`}
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-body tracking-wider uppercase text-primary hover:opacity-80 transition-opacity"
                >
                    Ver Produto
                </Link>
                <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-1.5 text-xs  bg-primary p-2 px-3 text-white rounded-full  uppercase hover:opacity-80 transition-opacity"
                >
                    <MessageCircle size={18} />
                    Pedir
                </Link>
            </div>
        </div>
        </>
    )
}