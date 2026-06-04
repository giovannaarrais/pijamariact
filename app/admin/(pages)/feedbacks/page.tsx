import { List, MessageCircle, Plus } from "lucide-react";

import { FeedbacksTable } from "@/app/components/admin/feedbacks-table";
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/Container";
import type { fastActionsProps } from "@/app/types/fastActions";
import { listFeedbacks } from "@/data/feedbacks/get";

export default async function FeedbacksPage() {
    const feedbacks = await listFeedbacks();

    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Novo feedback",
            description: "Cadastre depoimentos dos clientes",
            icon: <Plus />,
            link: "feedbacks/criar",
            classPLus: "bg-purple-800 text-white",
        },
        {
            id: 2,
            title: "Lista de feedbacks",
            description: "Listagem de todos os feedbacks",
            icon: <List />,
            link: "#feedbacks",
            classPLus: "bg-blue-900 text-white",
        },
    ];

    return (
        <Container>
            <HeaderSection
                title="Feedbacks"
                description="Gerencie depoimentos e avaliações dos clientes"
                icon={<MessageCircle size={25} />}
                fastActions={fastActions}
            />

            <section id="feedbacks">
                <FeedbacksTable feedbacks={feedbacks} />
            </section>
        </Container>
    );
}
