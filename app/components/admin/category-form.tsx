'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Images, Loader2, Tags } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { createCategoryAction, updateCategoryAction } from "@/actions/categories";
import { categoryFormSchema, type CategoryFormSchema } from "@/actions/categories/schema";
import ErrorInput from "@/app/components/admin/errorInput";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

import type { Category } from "@/app/types/catalog";
import { ImageProps } from "@/app/types/images";
import Image from "next/image";
import { imagesSeparated } from "@/utils/imagesSeparated";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import GalleryContent from "./galleryContent";

interface CategoryFormProps {
    category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
    const router = useRouter();
    const [success, setSuccess] = useState<string>();
    const [error, setError] = useState<string>();
    const isEditing = Boolean(category);
    const [modalImages, setModalImages] = useState(false)
    const [selectedImages, setSelectedImages] = useState<ImageProps[]>([]);
    const [openModalImage, setOpenModalImage] = useState({
        index: 0 ,
        url: "",
        open: false
    })
    

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<CategoryFormSchema>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: category?.name ?? "",
            slug: category?.slug ?? "",
            description: category?.description ?? "",
            imageUrl: category?.imageUrl ?? "",
            active: category?.active ?? true,
        },
    });

    async function onSubmit(values: CategoryFormSchema) {
        setError(undefined);
        setSuccess(undefined);

        const result = category
            ? await updateCategoryAction({ ...values, id: category.id })
            : await createCategoryAction(values);

        if (result.success) {
            setSuccess(result.message);

            if (!isEditing) {
                reset({
                    name: "",
                    slug: "",
                    description: "",
                    imageUrl: "",
                    active: true,
                });
            }

            router.refresh();
            return;
        }

        setError(result.message);
    }

    function imagesSelecteds(images: ImageProps[]){
        if(images && images.length > 0){
            setModalImages(false)
            setSelectedImages(images)
            setValue("imageUrl", images.map((image) => image.url).join(", "))
        } else{
            setModalImages(false)
            setSelectedImages([])
            setValue("imageUrl", "")
        }

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Tags size={20} />
                    {isEditing ? "Editar categoria" : "Formulario de categoria"}
                </CardTitle>
                <CardDescription>
                    {isEditing ? "Atualize os dados da categoria selecionada" : "Preencha os campos para criar uma nova categoria"}
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
                            {errors.slug && <ErrorInput message={errors.slug.message} />}
                            <Input id="slug" placeholder="Slug automatico se vazio" {...register("slug")} />
                        </div>

                        <div className="relative md:col-span-2">
                            {errors.imageUrl && <ErrorInput message={errors.imageUrl.message} />}
                             <div className="flex gap-2 mb-3">
                                <Button type="button" onClick={() => setModalImages(true)}>
                                    <Images />
                                    Selecionar Imagem
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Check size={14} />
                                    <span className="text-xs">{selectedImages.length 
                                    ? selectedImages.length 
                                    :  category?.imageUrl
                                    ? imagesSeparated(category.imageUrl).length 
                                    : 0} imagem(ns) selecionada(s)</span>
                                </div>
                            </div>
                            {selectedImages.length > 0 && (
                                <div className="flex gap-2">
                                    {selectedImages.map((image) => (
                                        <Image key={image.id} src={image.url} alt={image.name} width={150} height={150} className="object-cover max-h-[150px] rounded-3xl" onClick={() => setOpenModalImage({index: Number(image.id), url: image.url, open: true})}/>
                                    ))}
                                </div>
                            )}

                            {selectedImages.length <= 0 && category?.imageUrl && (
                                <div className="flex gap-2">
                                    {imagesSeparated(category.imageUrl).map((image, index) => (
                                        <div key={index}>
                                            <Image src={image} alt={image} width={150} height={150} className="object-cover max-h-[150px] rounded-3xl" onClick={() => setOpenModalImage({index, url: image, open: true})}/>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {modalImages && (
                            <AlertDialog open={modalImages} onOpenChange={setModalImages}>
                                <AlertDialogContent className="!w-[90vw] !max-w-[90vw] max-h-[90vh]  overflow-y-auto">

                                <AlertDialogTrigger>
                                    <AlertDialogTitle>Selecionar Imagem</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Selecione uma imagem para o produto
                                    </AlertDialogDescription>
                                </AlertDialogTrigger>
                                    
                                    <GalleryContent imagesSelecteds={imagesSelecteds}/>
                                  
                                    <AlertDialogFooter className="sticky bottom-0 z-10 bg-white rounded-3xl p-3 shadow">
                                        <AlertDialogCancel onClick={() => setModalImages(false)}>Fechar</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
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
                                                <SelectItem value="active">Ativa</SelectItem>
                                                <SelectItem value="inactive">Inativa</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
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

                {/* Modal de Imagem */}
                {openModalImage.open && (
                    <AlertDialog open={openModalImage.open} >
                        <AlertDialogContent >
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-center w-full font-semibold'>
                                </AlertDialogTitle>
                                <AlertDialogDescription className='flex justify-center m-auto'>
                                    <Image
                                        src={openModalImage.url} 
                                        alt={openModalImage.url} 
                                        width={300}
                                        height={200}
                                        className='object-cover w-full rounded-lg'
                                    />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction
                                onClick={() => setOpenModalImage({
                                    index: 0,
                                    open:false,
                                    url:"",
                                })}
                                >
                                    Fechar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </CardContent>
        </Card>
    );
}
