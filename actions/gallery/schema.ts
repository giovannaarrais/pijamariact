import { z } from "zod";

export const galleryImageFormSchema = z.object({
    title: z.string().min(3, "Titulo deve ter pelo menos 3 caracteres"),
    imageUrl: z.string().url("Informe uma URL valida da imagem"),
    alt: z.string().max(200, "Texto alternativo deve ter no maximo 200 caracteres").optional(),
    sortOrder: z.coerce.number().int("Informe um numero inteiro").min(0, "A ordem nao pode ser negativa"),
    active: z.boolean(),
});

export const galleryImageUpdateSchema = galleryImageFormSchema.extend({
    id: z.uuid("Imagem invalida"),
});

export type GalleryImageFormInput = z.input<typeof galleryImageFormSchema>;
export type GalleryImageFormSchema = z.infer<typeof galleryImageFormSchema>;
export type GalleryImageUpdateSchema = z.infer<typeof galleryImageUpdateSchema>;
