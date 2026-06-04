import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { FeedbackForm } from "@/app/components/admin/feedback-form";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/Container";
import { findFeedbackById } from "@/data/feedbacks/get";

export const dynamic = "force-dynamic";

interface EditarFeedbackPageProps {
    params: Promise<{
        id: string;
    }>;
}

const EditarFeedbackPage = async ({ params }: EditarFeedbackPageProps) => {
    const { id } = await params;
    const feedback = await findFeedbackById(id);

    if (!feedback) {
        notFound();
    }

    return (
        <Container>
            <HeaderSection
                title="Editar Feedback"
                description="Atualize o depoimento selecionado"
                icon={<MessageCircle size={25} />}
                buttonBack={true}
            />

            <FeedbackForm feedback={feedback} />
        </Container>
    );
};

export default EditarFeedbackPage;
