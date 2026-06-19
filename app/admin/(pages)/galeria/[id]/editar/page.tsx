import { notFound } from "next/navigation";
import { ImageUp } from "lucide-react";

import { GalleryForm } from "@/app/components/admin/gallery-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/public/Container";
import { findGalleryImageById } from "@/data/gallery/get";

export const dynamic = "force-dynamic";

interface EditarImagemPageProps {
    params: Promise<{
        id: string;
    }>;
}

const EditarImagemPage = async ({ params }: EditarImagemPageProps) => {
    const { id } = await params;
    const image = await findGalleryImageById(id);

    if (!image) {
        notFound();
    }

    return (
        <Container>
            <HeaderSection
                title="Editar Imagem"
                description="Atualize os dados da imagem selecionada"
                icon={<ImageUp size={25} />}
                buttonBack={true}
            />

            <GalleryForm image={image} />
        </Container>
    );
};

export default EditarImagemPage;
