import z from "zod";

export const updateUserSchema = z.object({
    userId: z.string(),
    data: z.object({
        name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
        email: z.string().email("E-mail inválido"),
        role: z.enum(["registered", "admin", "master"]),
        status: z.enum(["active", "inactive"]),
    })
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>