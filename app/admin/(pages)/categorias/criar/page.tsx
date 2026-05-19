import { Grid2x2 } from "lucide-react";

import { CategoryForm } from "@/app/components/admin/category-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/Container";

const CriarCategoriaPage = () => {
    return (
        <Container>
            <HeaderSection
                title="Criar Categoria"
                description="Cadastre uma categoria para organizar seus produtos"
                icon={<Grid2x2 size={25} />}
                buttonBack={true}
            />

            <CategoryForm />
        </Container>
    );
};

export default CriarCategoriaPage;
