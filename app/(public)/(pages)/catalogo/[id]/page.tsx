import HeroTitleSubpage from "@/app/components/public/HeroTitleSubpage";
import { AlertEmptyData } from "@/app/components/admin/alertEmptyData";
import { findProductById } from "@/data/products/get";
import { Shirt } from "lucide-react";
import Container from "@/app/components/public/Container";
import ProductDetails from "@/app/components/public/products/ProductDetails";
import type { Metadata } from "next";

interface ProductDetailsPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await findProductById(id);

    if (!product) {
        return {
            title: "Produto não encontrado | Pijamaria",
            description: "O produto que você está procurando não foi encontrado.",
        };
    }

    return {
        title: `${product.name} | Pijamaria`,
        description: product.description ?? `Confira o produto ${product.name} em nossa loja.`,
    };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
    const { id } = await params;
    const product = await findProductById(id);

    if (!product) {
        return (
            <section>
                <HeroTitleSubpage title="Catálogo" desc="Confira nossos produtos" buttonBack />
                <Container>
                    <AlertEmptyData
                        title="Produto não encontrado"
                        description="Tente voltar ao catálogo e selecionar outro produto."
                        icon={<Shirt size={50} />}
                    />
                </Container>
            </section>
        );
    }

    return (
        <section>
            <HeroTitleSubpage
                title={product.name}
                desc={product.category.name}
                buttonBack
            />
            <Container>
                <ProductDetails product={product} />
            </Container>
        </section>
    );
}
