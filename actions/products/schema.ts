import { z } from "zod";

export const productSizeSchema = z.enum(["PP", "P", "M", "G", "GG"]);

export const productFormSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    description: z.string().max(800, "Descricao deve ter no maximo 800 caracteres").optional(),
    price: z.coerce.number().positive("Informe um preco maior que zero"),
    categoryId: z.uuid("Selecione uma categoria valida"),
    imageUrl: z
        .string()
        .url("Informe uma URL valida")
        .or(z.literal(""))
        .optional(),
    sizes: z.array(productSizeSchema).min(1, "Selecione pelo menos um tamanho"),
    active: z.boolean(),
});

export const productUpdateSchema = productFormSchema.extend({
    id: z.uuid("Produto invalido"),
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormSchema = z.infer<typeof productFormSchema>;
export type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;
