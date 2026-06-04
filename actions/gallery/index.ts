'use server'

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { galleryImageFormSchema, galleryImageUpdateSchema, type GalleryImageFormSchema, type GalleryImageUpdateSchema } from "@/actions/gallery/schema";
import type { ActionResult, GalleryImage } from "@/app/types/catalog";
import { auth } from "@/lib/auth";
import { createGalleryImage, deleteGalleryImage, updateGalleryImage } from "@/services/gallery";

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

export async function createGalleryImageAction(data: GalleryImageFormSchema): Promise<ActionResult<GalleryImage>> {
    try {
        await assertAdmin();

        const values = galleryImageFormSchema.parse(data);
        const image = await createGalleryImage(values);

        revalidatePath("/admin/galeria");

        return {
            success: true,
            message: "Imagem criada com sucesso!",
            data: image,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao criar imagem."),
        };
    }
}

export async function updateGalleryImageAction(data: GalleryImageUpdateSchema): Promise<ActionResult<GalleryImage>> {
    try {
        await assertAdmin();

        const values = galleryImageUpdateSchema.parse(data);
        const image = await updateGalleryImage(values.id, values);

        if (!image) {
            return {
                success: false,
                message: "Imagem nao encontrada.",
            };
        }

        revalidatePath("/admin/galeria");
        revalidatePath(`/admin/galeria/${values.id}/editar`);

        return {
            success: true,
            message: "Imagem atualizada com sucesso!",
            data: image,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: getErrorMessage(error, "Erro ao atualizar imagem."),
        };
    }
}

export async function deleteGalleryImageAction(id: string): Promise<ActionResult> {
    try {
        await assertAdmin();

        const image = await deleteGalleryImage(id);

        if (!image) {
            return {
                success: false,
                message: "Imagem nao encontrada.",
            };
        }

        revalidatePath("/admin/galeria");

        return {
            success: true,
            message: "Imagem excluida com sucesso!",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Erro ao excluir imagem.",
        };
    }
}
