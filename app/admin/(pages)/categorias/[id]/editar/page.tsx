import { notFound } from "next/navigation";
import { Grid2x2 } from "lucide-react";

import { CategoryForm } from "@/app/components/admin/category-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/public/Container";
import { findCategoryById } from "@/data/categories/get";

export const dynamic = "force-dynamic";

interface EditarCategoriaPageProps {
    params: Promise<{
        id: string;
    }>;
}

const EditarCategoriaPage = async ({ params }: EditarCategoriaPageProps) => {
    const { id } = await params;
    const category = await findCategoryById(id);

    if (!category) {
        notFound();
    }

    return (
        <Container>
            <HeaderSection
                title="Editar Categoria"
                description="Atualize os dados da categoria selecionada"
                icon={<Grid2x2 size={25} />}
                buttonBack={true}
            />

            <CategoryForm category={category} />
        </Container>
    );
};

export default EditarCategoriaPage;
