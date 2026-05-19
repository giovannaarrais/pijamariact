import { z } from "zod";

export const categoryFormSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    slug: z.string().optional(),
    description: z.string().max(500, "Descricao deve ter no maximo 500 caracteres").optional(),
    imageUrl: z
        .string()
        .url("Informe uma URL valida")
        .or(z.literal(""))
        .optional(),
    active: z.boolean(),
});

export const categoryUpdateSchema = categoryFormSchema.extend({
    id: z.uuid("Categoria invalida"),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
export type CategoryUpdateSchema = z.infer<typeof categoryUpdateSchema>;
