'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Shirt } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { createProductAction, updateProductAction } from "@/actions/products";
import { productFormSchema, type ProductFormInput, type ProductFormSchema } from "@/actions/products/schema";
import ErrorInput from "@/app/components/admin/errorInput";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

import type { Category, ProductSize, ProductWithCategory } from "@/app/types/catalog";

interface ProductFormProps {
    categories: Category[];
    product?: ProductWithCategory;
}

const sizeOptions: ProductSize[] = ["PP", "P", "M", "G", "GG"];

export function ProductForm({ categories, product }: ProductFormProps) {
    const router = useRouter();
    const [success, setSuccess] = useState<string>();
    const [error, setError] = useState<string>();
    const isEditing = Boolean(product);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormInput, unknown, ProductFormSchema>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: product?.name ?? "",
            description: product?.description ?? "",
            price: product ? Number(product.price) : 0,
            categoryId: product?.categoryId ?? "",
            imageUrl: product?.imageUrl ?? "",
            sizes: product?.sizes.length ? product.sizes : ["M"],
            active: product?.active ?? true,
        },
    });

    const selectedSizes = useWatch({ control, name: "sizes" }) ?? [];

    function toggleSize(size: ProductSize, checked: boolean) {
        const nextSizes = checked
            ? Array.from(new Set([...selectedSizes, size]))
            : selectedSizes.filter((item) => item !== size);

        setValue("sizes", nextSizes, { shouldDirty: true, shouldValidate: true });
    }

    async function onSubmit(values: ProductFormSchema) {
        setError(undefined);
        setSuccess(undefined);

        const result = product
            ? await updateProductAction({ ...values, id: product.id })
            : await createProductAction(values);

        if (result.success) {
            setSuccess(result.message);

            if (!isEditing) {
                reset({
                    name: "",
                    description: "",
                    price: 0,
                    categoryId: "",
                    imageUrl: "",
                    sizes: ["M"],
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
                    <Shirt size={20} />
                    {isEditing ? "Editar produto" : "Formulario de produto"}
                </CardTitle>
                <CardDescription>
                    {isEditing ? "Atualize os dados do produto selecionado" : "Preencha os dados para cadastrar um novo produto"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {success && <FeedbackMessage type="success" message={success} />}
                {error && <FeedbackMessage type="error" message={error} />}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="relative">
                            {errors.name && <ErrorInput message={errors.name.message} />}
                            <Input id="name" placeholder="Nome" {...register("name")} />
                        </div>

                        <div className="relative">
                            {errors.price && <ErrorInput message={errors.price.message} />}
                            <Input id="price" type="number" step="0.01" placeholder="Valor" {...register("price", { valueAsNumber: true })} />
                        </div>

                        <div className="relative">
                            {errors.categoryId && <ErrorInput message={errors.categoryId.message} />}
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Categoria do produto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="relative">
                            {errors.active && <ErrorInput message={errors.active.message} />}
                            <Controller
                                control={control}
                                name="active"
                                render={({ field }) => (
                                    <Select
                                        value={field.value ? "active" : "inactive"}
                                        onValueChange={(value) => field.onChange(value === "active")}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="active">Ativo</SelectItem>
                                                <SelectItem value="inactive">Inativo</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.imageUrl && <ErrorInput message={errors.imageUrl.message} />}
                            <Input id="imageUrl" placeholder="URL da imagem" {...register("imageUrl")} />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.description && <ErrorInput message={errors.description.message} />}
                            <textarea
                                id="description"
                                className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                placeholder="Descricao"
                                {...register("description")}
                            />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.sizes && <ErrorInput message={errors.sizes.message} />}
                            <div className="grid gap-2 rounded-md border p-3 sm:grid-cols-5">
                                {sizeOptions.map((size) => (
                                    <label key={size} className="flex items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={selectedSizes.includes(size)}
                                            onChange={(event) => toggleSize(size, event.target.checked)}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button disabled={isSubmitting || !categories.length} type="submit" className="w-full cursor-pointer">
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
