'use client'

import { useState, useTransition } from "react";
import Link from "next/link";
import { Edit2, Grid2x2, Trash2 } from "lucide-react";

import { deleteCategoryAction } from "@/actions/categories";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import type { Category } from "@/types/catalog";

interface CategoriesTableProps {
    categories: Category[] | null;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>();
    const [pendingId, setPendingId] = useState<string>();
    const [isPending, startTransition] = useTransition();

    function handleDelete(id: string) {
        setPendingId(id);
        setMessage(undefined);

        startTransition(async () => {
            const result = await deleteCategoryAction(id);
            setMessage({ type: result.success ? "success" : "error", text: result.message });
            setPendingId(undefined);
        });
    }

    if (!categories?.length) {
        return (
            <AlertEmptyData
                title="Nenhuma categoria encontrada"
                description="Crie a primeira categoria para organizar seus produtos"
                icon={<Grid2x2 size={50} />}
            />
        );
    }

    return (
        <div className="space-y-4">
            {message && <FeedbackMessage type={message.type} message={message.text} />}

            <TableComponent
                title="Lista de Categorias Cadastradas"
                tableHeads={["Nº", "Nome", "Slug", "Status", "Criada em", "Atualizada em", "Ações"]}
                tableRows={categories.map((category, index) => [
                    index + 1,
                    category.name,
                    category.slug,
                    <span
                        key={`${category.id}-status`}
                        className={`rounded-full px-2 py-1 text-xs font-medium ${category.active ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}
                    >
                        {category.active ? "Ativa" : "Inativa"}
                    </span>,
                    formatDate(category.createdAt),
                    formatDate(category.updatedAt),
                    <div className="flex gap-2" key={`${category.id}-actions`}>
                        <Button asChild size="icon" className="cursor-pointer">
                            <Link href={`/admin/categorias/${category.id}/editar`} aria-label={`Editar ${category.name}`}>
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
                                    <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Voce deseja excluir <b>{category.name}</b>? Categorias com produtos vinculados nao podem ser excluidas.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        disabled={isPending && pendingId === category.id}
                                        onClick={() => handleDelete(category.id)}
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
