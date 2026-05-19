import { notFound } from "next/navigation";
import { Shirt } from "lucide-react";

import HeaderSection from "@/app/components/admin/headerSection";
import { ProductForm } from "@/app/components/admin/product-form";
import Container from "@/app/components/Container";
import { listActiveCategories } from "@/data/categories/get";
import { findProductById } from "@/data/products/get";

export const dynamic = "force-dynamic";

interface EditarProdutoPageProps {
    params: Promise<{
        id: string;
    }>;
}

const EditarProdutoPage = async ({ params }: EditarProdutoPageProps) => {
    const { id } = await params;
    const [product, categories] = await Promise.all([
        findProductById(id),
        listActiveCategories(),
    ]);

    if (!product) {
        notFound();
    }

    const categoryOptions = categories?.some((category) => category.id === product.categoryId)
        ? categories
        : [...(categories ?? []), product.category];

    return (
        <Container>
            <HeaderSection
                title="Editar Produto"
                description="Atualize os dados e a categoria do produto selecionado"
                icon={<Shirt size={25} />}
                buttonBack={true}
            />

            <ProductForm categories={categoryOptions} product={product} />
        </Container>
    );
};

export default EditarProdutoPage;
