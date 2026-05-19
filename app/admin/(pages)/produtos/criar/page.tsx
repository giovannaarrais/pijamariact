import { Shirt } from "lucide-react";

import HeaderSection from "@/app/components/admin/headerSection";
import { ProductForm } from "@/app/components/admin/product-form";
import Container from "@/app/components/Container";
import { listActiveCategories } from "@/data/categories/get";

export const dynamic = "force-dynamic";

const CriarProdutoPage = async () => {
    const categories = await listActiveCategories();

    return (
        <Container>
            <HeaderSection
                title="Registrar novo produto"
                description="Cadastre produtos e vincule cada item a uma categoria"
                buttonBack={true}
                icon={<Shirt size={25} />}
            />

            <ProductForm categories={categories ?? []} />
        </Container>
    );
};

export default CriarProdutoPage;
