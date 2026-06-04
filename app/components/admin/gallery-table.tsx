'use client'

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, ImageUp, Trash2 } from "lucide-react";

import { deleteGalleryImageAction } from "@/actions/gallery";
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

import type { GalleryImage } from "@/app/types/catalog";

interface GalleryTableProps {
    images: GalleryImage[] | null;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));
}

export function GalleryTable({ images }: GalleryTableProps) {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>();
    const [pendingId, setPendingId] = useState<string>();
    const [isPending, startTransition] = useTransition();

    function handleDelete(id: string) {
        setPendingId(id);
        setMessage(undefined);

        startTransition(async () => {
            const result = await deleteGalleryImageAction(id);
            setMessage({ type: result.success ? "success" : "error", text: result.message });
            setPendingId(undefined);
        });
    }

    if (!images?.length) {
        return (
            <AlertEmptyData
                title="Nenhuma imagem encontrada"
                description="Cadastre imagens para montar a galeria do site"
                icon={<ImageUp size={50} />}
            />
        );
    }

    return (
        <div className="space-y-4">
            {message && <FeedbackMessage type={message.type} message={message.text} />}

            <TableComponent
                title="Lista de Imagens da Galeria"
                tableHeads={["Nº", "Imagem", "Titulo", "Ordem", "Status", "Criada em", "Ações"]}
                tableRows={images.map((image, index) => [
                    index + 1,
                    <Image
                        key={`${image.id}-image`}
                        src={image.imageUrl}
                        alt={image.alt || image.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-md object-cover"
                    />,
                    image.title,
                    image.sortOrder,
                    <span
                        key={`${image.id}-status`}
                        className={`rounded-full px-2 py-1 text-xs font-medium ${image.active ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}
                    >
                        {image.active ? "Ativa" : "Inativa"}
                    </span>,
                    formatDate(image.createdAt),
                    <div className="flex gap-2" key={`${image.id}-actions`}>
                        <Button asChild size="icon" className="cursor-pointer">
                            <Link href={`/admin/galeria/${image.id}/editar`} aria-label={`Editar ${image.title}`}>
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
                                    <AlertDialogTitle>Excluir imagem?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Voce deseja excluir <b>{image.title}</b>? Essa acao nao pode ser desfeita.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        disabled={isPending && pendingId === image.id}
                                        onClick={() => handleDelete(image.id)}
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
