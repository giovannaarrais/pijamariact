import { z } from "zod";

export const feedbackFormSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    message: z.string().min(5, "Mensagem deve ter pelo menos 5 caracteres").max(800, "Mensagem deve ter no maximo 800 caracteres"),
    rating: z.coerce.number().int("Informe um numero inteiro").min(1, "Avaliacao minima e 1").max(5, "Avaliacao maxima e 5"),
    active: z.boolean(),
});

export const feedbackUpdateSchema = feedbackFormSchema.extend({
    id: z.uuid("Feedback invalido"),
});

export type FeedbackFormInput = z.input<typeof feedbackFormSchema>;
export type FeedbackFormSchema = z.infer<typeof feedbackFormSchema>;
export type FeedbackUpdateSchema = z.infer<typeof feedbackUpdateSchema>;
