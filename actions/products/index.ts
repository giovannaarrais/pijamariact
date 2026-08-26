'use server'

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { productFormSchema, productUpdateSchema, type ProductFormSchema, type ProductUpdateSchema } from "@/actions/products/schema";
import { auth } from "@/lib/auth";
import { createProduct, deleteProduct, updateProduct } from "@/services/products";

import type { ActionResult, Product } from "@/app/types/catalog";

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

export async function createProductAction(data: ProductFormSchema): Promise<ActionResult<Product>> {
    try {
        await assertAdmin();

        const values = productFormSchema.parse(data);
        const product = await createProduct(values);

        revalidatePath("/admin/produtos");

        return {
            success: true,
            message: "Produto criado com sucesso!",
            data: product,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao criar produto."),
        };
    }
}

export async function updateProductAction(data: ProductUpdateSchema): Promise<ActionResult<Product>> {
    try {
        await assertAdmin();

        const values = productUpdateSchema.parse(data);
        const product = await updateProduct(values.id, values);

        if (!product) {
            return {
                success: false,
                message: "Produto nao encontrado.",
            };
        }

        revalidatePath("/admin/produtos");
        revalidatePath(`/admin/produtos/${values.id}/editar`);

        return {
            success: true,
            message: "Produto atualizado com sucesso!",
            data: product,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao atualizar produto."),
        };
    }
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
    try {
        await assertAdmin();

        const product = await deleteProduct(id);

        if (!product) {
            return {
                success: false,
                message: "Produto nao encontrado.",
            };
        }

        revalidatePath("/admin/produtos");

        return {
            success: true,
            message: "Produto excluido com sucesso!",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Erro ao excluir produto.",
        };
    }
}
