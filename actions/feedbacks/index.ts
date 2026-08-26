'use server'

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { feedbackFormSchema, feedbackUpdateSchema, type FeedbackFormSchema, type FeedbackUpdateSchema } from "@/actions/feedbacks/schema";
import type { ActionResult, Feedback } from "@/app/types/catalog";
import { auth } from "@/lib/auth";
import { createFeedback, deleteFeedback, updateFeedback } from "@/services/feedbacks";

async function assertAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const role = (session?.user as { role?: string } | undefined)?.role;

    if (role !== "admin" && role !== "master") {
        throw new Error("Voce nao tem permissao para executar esta acao.");
    }
}

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

export async function createFeedbackAction(data: FeedbackFormSchema): Promise<ActionResult<Feedback>> {
    try {
        await assertAdmin();

        const values = feedbackFormSchema.parse(data);
        const feedback = await createFeedback(values);

        revalidatePath("/admin/feedbacks");

        return {
            success: true,
            message: "Feedback criado com sucesso!",
            data: feedback,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao criar feedback."),
        };
    }
}

export async function updateFeedbackAction(data: FeedbackUpdateSchema): Promise<ActionResult<Feedback>> {
    try {
        await assertAdmin();

        const values = feedbackUpdateSchema.parse(data);
        const feedback = await updateFeedback(values.id, values);

        if (!feedback) {
            return {
                success: false,
                message: "Feedback nao encontrado.",
            };
        }

        revalidatePath("/admin/feedbacks");
        revalidatePath(`/admin/feedbacks/${values.id}/editar`);

        return {
            success: true,
            message: "Feedback atualizado com sucesso!",
            data: feedback,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao atualizar feedback."),
        };
    }
}

export async function deleteFeedbackAction(id: string): Promise<ActionResult> {
    try {
        await assertAdmin();

        const feedback = await deleteFeedback(id);

        if (!feedback) {
            return {
                success: false,
                message: "Feedback nao encontrado.",
            };
        }

        revalidatePath("/admin/feedbacks");

        return {
            success: true,
            message: "Feedback excluido com sucesso!",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Erro ao excluir feedback.",
        };
    }
}
