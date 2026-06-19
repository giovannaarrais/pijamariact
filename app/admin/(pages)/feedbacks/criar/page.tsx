import { MessageCircle } from "lucide-react";

import { FeedbackForm } from "@/app/components/admin/feedback-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/public/Container";

export const dynamic = "force-dynamic";

const CriarFeedbackPage = () => {
    return (
        <Container>
            <HeaderSection
                title="Registrar novo feedback"
                description="Cadastre um depoimento de cliente"
                buttonBack={true}
                icon={<MessageCircle size={25} />}
            />

            <FeedbackForm />
        </Container>
    );
};

export default CriarFeedbackPage;
