import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.enum(["master", "admin", "registered"]).default("registered"),
})

export type CreateUserSchema = z.infer<typeof createUserSchema>