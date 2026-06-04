import { ImageUp, List, Plus } from "lucide-react";

import HeaderSection from "@/app/components/admin/headerSection";
import { GalleryTable } from "@/app/components/admin/gallery-table";
import Container from "@/app/components/Container";
import type { fastActionsProps } from "@/app/types/fastActions";
import { listGalleryImages } from "@/data/gallery/get";

const GaleriaPage = async () => {
    const images = await listGalleryImages();

    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Nova imagem",
            description: "Adicione imagens na galeria",
            icon: <Plus />,
            link: "galeria/criar",
            classPLus: "bg-purple-800 text-white",
        },
        {
            id: 2,
            title: "Lista de imagens",
            description: "Veja todas as imagens cadastradas",
            icon: <List />,
            link: "#galeria",
            classPLus: "bg-blue-900 text-white",
        },
    ];

    return (
        <Container>
            <HeaderSection
                title="Galeria de Imagens"
                description="Gerencie as imagens"
                icon={<ImageUp size={25} />}
                fastActions={fastActions}
            />

            <section id="galeria">
                <GalleryTable images={images} />
            </section>
        </Container>
    );
}

export default GaleriaPage;
