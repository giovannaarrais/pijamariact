import { List, Plus, Shirt } from "lucide-react";

import HeaderSection from "@/app/components/admin/headerSection";
import { ProductsTable } from "@/app/components/admin/products-table";
import Container from "@/app/components/Container";
import type { fastActionsProps } from "@/app/types/fastActions";
import { listProducts } from "@/data/products/get";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const products = await listProducts();

    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Novo produto",
            description: "Adicione produtos ao catalogo",
            icon: <Plus />,
            link: "produtos/criar",
            classPLus: "bg-purple-800 text-white",
        },
        {
            id: 2,
            title: "Lista de produtos",
            description: "Listagem de todos os produtos",
            icon: <List />,
            link: "#produtos",
            classPLus: "bg-blue-900 text-white",
        },
    ];

    return (
        <Container>
            <HeaderSection
                title="Produtos"
                description="Gerencie os produtos do catalogo da PijamariaCT"
                icon={<Shirt size={25} />}
                fastActions={fastActions}
            />

            <section id="produtos">
                <ProductsTable products={products} />
            </section>
        </Container>
    );
}
