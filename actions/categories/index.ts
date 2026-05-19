'use server'

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { categoryFormSchema, categoryUpdateSchema, type CategoryFormSchema, type CategoryUpdateSchema } from "@/actions/categories/schema";
import { auth } from "@/lib/auth";
import { createCategory, deleteCategory, updateCategory } from "@/services/categories";

import type { ActionResult, Category } from "@/types/catalog";

async function assertAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const role = session?.user.role;

    if (role !== "admin" && role !== "master") {
        throw new Error("Voce nao tem permissao para executar esta acao.");
    }
}

function getErrorMessage(error: unknown, fallback: string) {
    return error instanceof Error ? error.message : fallback;
}

export async function createCategoryAction(data: CategoryFormSchema): Promise<ActionResult<Category>> {
    try {
        await assertAdmin();

        const values = categoryFormSchema.parse(data);
        const category = await createCategory(values);

        revalidatePath("/admin/categorias");

        return {
            success: true,
            message: "Categoria criada com sucesso!",
            data: category,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao criar categoria."),
        };
    }
}

export async function updateCategoryAction(data: CategoryUpdateSchema): Promise<ActionResult<Category>> {
    try {
        await assertAdmin();

        const values = categoryUpdateSchema.parse(data);
        const category = await updateCategory(values.id, values);

        if (!category) {
            return {
                success: false,
                message: "Categoria nao encontrada.",
            };
        }

        revalidatePath("/admin/categorias");
        revalidatePath(`/admin/categorias/${values.id}/editar`);

        return {
            success: true,
            message: "Categoria atualizada com sucesso!",
            data: category,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao atualizar categoria."),
        };
    }
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
    try {
        await assertAdmin();

        const category = await deleteCategory(id);

        if (!category) {
            return {
                success: false,
                message: "Categoria nao encontrada.",
            };
        }

        revalidatePath("/admin/categorias");

        return {
            success: true,
            message: "Categoria excluida com sucesso!",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Nao foi possivel excluir a categoria. Verifique se existem produtos vinculados a ela.",
        };
    }
}
