import { ImageUp, Plus } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import Container from "@/app/components/Container";
import HeaderSection from "@/app/components/admin/headerSection";
import GalleryContent from "@/app/components/admin/galleryContent";

const GaleriaPage = async () => {
    return (
        <Container>
            <HeaderSection
                title="Galeria de Fotos"
                description="Gerencie as imagens da galeria"
                icon={<ImageUp size={24} />}
            />
            <GalleryContent />
        </Container>
    )

}

export default GaleriaPage;
