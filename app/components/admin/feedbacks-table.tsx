'use client'

import { useState, useTransition } from "react";
import Link from "next/link";
import { Edit2, MessageCircle, Star, Trash2 } from "lucide-react";

import { deleteFeedbackAction } from "@/actions/feedbacks";
import { AlertEmptyData } from "@/app/components/admin/alertEmptyData";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { TableComponent } from "@/app/components/admin/tableStructure";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

import type { Feedback } from "@/app/types/catalog";

interface FeedbacksTableProps {
    feedbacks: Feedback[] | null;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <span className="flex gap-1 text-amber-500">
            {Array.from({ length: rating }).map((_, index) => (
                <Star key={index} size={14} fill="currentColor" />
            ))}
        </span>
    );
}

export function FeedbacksTable({ feedbacks }: FeedbacksTableProps) {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>();
    const [pendingId, setPendingId] = useState<string>();
    const [isPending, startTransition] = useTransition();

    function handleDelete(id: string) {
        setPendingId(id);
        setMessage(undefined);

        startTransition(async () => {
            const result = await deleteFeedbackAction(id);
            setMessage({ type: result.success ? "success" : "error", text: result.message });
            setPendingId(undefined);
        });
    }

    if (!feedbacks?.length) {
        return (
            <AlertEmptyData
                title="Nenhum feedback encontrado"
                description="Cadastre depoimentos para destacar a experiencia dos clientes"
                icon={<MessageCircle size={50} />}
            />
        );
    }

    return (
        <div className="space-y-4">
            {message && <FeedbackMessage type={message.type} message={message.text} />}

            <TableComponent
                title="Lista de Feedbacks Cadastrados"
                tableHeads={["Nº", "Cliente", "Avaliacao", "Mensagem", "Status", "Criado em", "Ações"]}
                tableRows={feedbacks.map((feedback, index) => [
                    index + 1,
                    feedback.name,
                    <RatingStars key={`${feedback.id}-rating`} rating={feedback.rating} />,
                    <span key={`${feedback.id}-message`} className="line-clamp-2 max-w-sm">
                        {feedback.message}
                    </span>,
                    <span
                        key={`${feedback.id}-status`}
                        className={`rounded-full px-2 py-1 text-xs font-medium ${feedback.active ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}
                    >
                        {feedback.active ? "Publicado" : "Oculto"}
                    </span>,
                    formatDate(feedback.createdAt),
                    <div className="flex gap-2" key={`${feedback.id}-actions`}>
                        <Button asChild size="icon" className="cursor-pointer">
                            <Link href={`/admin/feedbacks/${feedback.id}/editar`} aria-label={`Editar ${feedback.name}`}>
                                <Edit2 />
                            </Link>
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon" className="cursor-pointer">
                                    <Trash2 />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir feedback?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Voce deseja excluir o feedback de <b>{feedback.name}</b>? Essa acao nao pode ser desfeita.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        disabled={isPending && pendingId === feedback.id}
                                        onClick={() => handleDelete(feedback.id)}
                                        variant="destructive"
                                    >
                                        Excluir
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>,
                ])}
            />
        </div>
    );
}
