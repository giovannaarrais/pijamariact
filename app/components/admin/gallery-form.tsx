'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { createGalleryImageAction, updateGalleryImageAction } from "@/actions/gallery";
import { galleryImageFormSchema, type GalleryImageFormInput, type GalleryImageFormSchema } from "@/actions/gallery/schema";
import ErrorInput from "@/app/components/admin/errorInput";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

import type { GalleryImage } from "@/app/types/catalog";

interface GalleryFormProps {
    image?: GalleryImage;
}

export function GalleryForm({ image }: GalleryFormProps) {
    const router = useRouter();
    const [success, setSuccess] = useState<string>();
    const [error, setError] = useState<string>();
    const isEditing = Boolean(image);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<GalleryImageFormInput, unknown, GalleryImageFormSchema>({
        resolver: zodResolver(galleryImageFormSchema),
        defaultValues: {
            title: image?.title ?? "",
            imageUrl: image?.imageUrl ?? "",
            alt: image?.alt ?? "",
            sortOrder: image?.sortOrder ?? 0,
            active: image?.active ?? true,
        },
    });

    const previewUrl = useWatch({ control, name: "imageUrl" });

    async function onSubmit(values: GalleryImageFormSchema) {
        setError(undefined);
        setSuccess(undefined);

        const result = image
            ? await updateGalleryImageAction({ ...values, id: image.id })
            : await createGalleryImageAction(values);

        if (result.success) {
            setSuccess(result.message);

            if (!isEditing) {
                reset({
                    title: "",
                    imageUrl: "",
                    alt: "",
                    sortOrder: 0,
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
                    <ImageUp size={20} />
                    {isEditing ? "Editar imagem" : "Formulario de imagem"}
                </CardTitle>
                <CardDescription>
                    {isEditing ? "Atualize a imagem selecionada da galeria" : "Cadastre uma imagem para exibir na galeria"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {success && <FeedbackMessage type="success" message={success} />}
                {error && <FeedbackMessage type="error" message={error} />}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="relative">
                            {errors.title && <ErrorInput message={errors.title.message} />}
                            <Input id="title" placeholder="Titulo" {...register("title")} />
                        </div>

                        <div className="relative">
                            {errors.sortOrder && <ErrorInput message={errors.sortOrder.message} />}
                            <Input id="sortOrder" type="number" min="0" placeholder="Ordem" {...register("sortOrder", { valueAsNumber: true })} />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.imageUrl && <ErrorInput message={errors.imageUrl.message} />}
                            <Input id="imageUrl" placeholder="URL da imagem" {...register("imageUrl")} />
                        </div>

                        <div className="relative">
                            {errors.alt && <ErrorInput message={errors.alt.message} />}
                            <Input id="alt" placeholder="Texto alternativo" {...register("alt")} />
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
                                                <SelectItem value="active">Ativa</SelectItem>
                                                <SelectItem value="inactive">Inativa</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>

                    {previewUrl && !errors.imageUrl && (
                        <div className="relative h-56 overflow-hidden rounded-md border bg-muted">
                            <Image src={previewUrl} alt="Previa da imagem" fill className="object-cover" />
                        </div>
                    )}

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
