import { ImageUp } from "lucide-react";

import { GalleryForm } from "@/app/components/admin/gallery-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/Container";

export const dynamic = "force-dynamic";

const CriarImagemPage = () => {
    return (
        <Container>
            <HeaderSection
                title="Registrar nova imagem"
                description="Cadastre uma imagem para a galeria"
                buttonBack={true}
                icon={<ImageUp size={25} />}
            />

            <GalleryForm />
        </Container>
    );
};

export default CriarImagemPage;
