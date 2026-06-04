'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { createFeedbackAction, updateFeedbackAction } from "@/actions/feedbacks";
import { feedbackFormSchema, type FeedbackFormInput, type FeedbackFormSchema } from "@/actions/feedbacks/schema";
import ErrorInput from "@/app/components/admin/errorInput";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

import type { Feedback } from "@/app/types/catalog";

interface FeedbackFormProps {
    feedback?: Feedback;
}

export function FeedbackForm({ feedback }: FeedbackFormProps) {
    const router = useRouter();
    const [success, setSuccess] = useState<string>();
    const [error, setError] = useState<string>();
    const isEditing = Boolean(feedback);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FeedbackFormInput, unknown, FeedbackFormSchema>({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            name: feedback?.name ?? "",
            message: feedback?.message ?? "",
            rating: feedback?.rating ?? 5,
            active: feedback?.active ?? true,
        },
    });

    async function onSubmit(values: FeedbackFormSchema) {
        setError(undefined);
        setSuccess(undefined);

        const result = feedback
            ? await updateFeedbackAction({ ...values, id: feedback.id })
            : await createFeedbackAction(values);

        if (result.success) {
            setSuccess(result.message);

            if (!isEditing) {
                reset({
                    name: "",
                    message: "",
                    rating: 5,
                    active: true,
                });
            }

            router.refresh();
            return;
        }

        setError(result.message);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <MessageCircle size={20} />
                    {isEditing ? "Editar feedback" : "Formulario de feedback"}
                </CardTitle>
                <CardDescription>
                    {isEditing ? "Atualize o depoimento selecionado" : "Cadastre depoimentos e avaliações dos clientes"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {success && <FeedbackMessage type="success" message={success} />}
                {error && <FeedbackMessage type="error" message={error} />}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="relative">
                            {errors.name && <ErrorInput message={errors.name.message} />}
                            <Input id="name" placeholder="Nome do cliente" {...register("name")} />
                        </div>

                        <div className="relative">
                            {errors.rating && <ErrorInput message={errors.rating.message} />}
                            <Input id="rating" type="number" min="1" max="5" placeholder="Avaliacao" {...register("rating", { valueAsNumber: true })} />
                        </div>

                        <div className="relative">
                            {errors.active && <ErrorInput message={errors.active.message} />}
                            <Controller
                                control={control}
                                name="active"
                                render={({ field }) => (
                                    <Select value={field.value ? "active" : "inactive"} onValueChange={(value) => field.onChange(value === "active")}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="active">Publicado</SelectItem>
                                                <SelectItem value="inactive">Oculto</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.message && <ErrorInput message={errors.message.message} />}
                            <textarea
                                id="message"
                                className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                placeholder="Mensagem"
                                {...register("message")}
                            />
                        </div>
                    </div>

                    <Button disabled={isSubmitting} type="submit" className="w-full cursor-pointer">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Salvando...
                            </>
                        ) : (
                            "Salvar"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
