import { Grid2x2, List, Plus } from "lucide-react";

import { CategoriesTable } from "@/app/components/admin/categories-table";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/public/Container";
import type { fastActionsProps } from "@/app/types/fastActions";
import { listCategories } from "@/data/categories/get";


const CategoriasPage = async () => {
    const categories = await listCategories();

    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Nova categoria",
            description: "Adicione uma nova categoria ao catalogo",
            icon: <Plus />,
            link: "categorias/criar",
            classPLus: "bg-purple-800 text-white",
        },
        {
            id: 2,
            title: "Lista de categorias",
            description: "Listagem de todas as categorias",
            icon: <List />,
            link: "#categorias",
            classPLus: "bg-blue-900 text-white",
        },
    ];

    return (
        <Container>
            <HeaderSection
                title="Categorias"
                description="Gerencie as categorias utilizadas para organizar os produtos"
                icon={<Grid2x2 size={25} />}
                fastActions={fastActions}
            />

            <section id="categorias">
                <CategoriesTable categories={categories} />
            </section>
        </Container>
    );
};

export default CategoriasPage;
