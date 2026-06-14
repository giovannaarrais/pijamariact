"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { supabase } from '@/lib/supabaseStorage';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { refresh } from 'next/cache';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Trash2, Check, Copy, Send } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface ImageProps {
    id: string;
    open: boolean;
    name: string;
    url: string;
    created_at: Date | string;
    type?: string;
}

interface GalleryContentProps {
    imagesSelecteds?: (images: ImageProps[]) => void | undefined
}

function GalleryContent({ imagesSelecteds }: GalleryContentProps) {
    const [file, setFile] = useState<File | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [images, setImages] = useState<Array<any> | null>(null)
    const [openModalImage, setOpenModalImage] = useState<ImageProps>({
        id: "",
        open: false,
        name: "",
        url: "",
        created_at: new Date(),
        type: ""
    })
    const [selectedImages, setSelectedImages] = useState<ImageProps[]>([])

    const handleToggleSelect = (image: any) => {
        setSelectedImages((prev) => {
            const exists = prev.some((item) => item.name === image.name);
            if (exists) {
                return prev.filter((item) => item.name !== image.name);
            } else {
                return [...prev, {
                    id: image.id,
                    open: false,
                    name: image.name,
                    url: image.url,
                    created_at: image.created_at,
                    type: image.type || ""
                }];
            }
        });
    };

    const handleSelectAll = () => {
        if (!images) return;
        if (selectedImages.length === images.length) {
            setSelectedImages([]);
        } else {
            const allSelected = images.map((image) => ({
                id: image.id,
                open: false,
                name: image.name,
                url: image.url,
                created_at: image.created_at,
                type: image.type || ""
            }));
            setSelectedImages(allSelected);
        }
    };

    const handleSelectedImages = () => {
        if(selectedImages.length === 0) return;
        if(typeof imagesSelecteds === 'function'){
            imagesSelecteds(selectedImages)
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const fileNames = selectedImages.map((img) => img.name);
            
            const response = await fetch("/api/storage", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fileNames })
            });

            const result = await response.json();

            if (result.success) {
                setSuccessMessage(result.message);
                setSelectedImages([]);
                setTimeout(() => setSuccessMessage(null), 3000);
                await loadImages();
            } else {
                setErrorMessage(result.message);
                setTimeout(() => setErrorMessage(null), 3000);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Erro ao deletar imagens: " + error);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    };
    
    const updateImage = async( file: File ) => {
        if(!file) return;

        const formData = new FormData()
        formData.append("file", file)
        try{

            if(!formData.get("file")) return;
            
            const response = await fetch("/api/storage", {
                method: "POST",
                body: formData
            })

            const result = await response.json()

            if(result.success == true){
                setSuccessMessage(result.message)
                setTimeout(() => {
                    setSuccessMessage(null)
                    setFile(null)
                }, 3000)
                await loadImages()
            } else {
                setErrorMessage(result.message)
                setTimeout(() => {
                    setErrorMessage(null)
                    setFile(null)
                }, 3000)
            }

        } catch (error) {
            console.log(error)
            setErrorMessage("Ocorreu um erro inesperado: " + error)
        }
    }

    const loadImages = async () => {
        const { data: files, error } = await supabase.storage.from('produtos').list('pijamas')

        if(error) {
            console.log("ERRO AO CARREGAR IMAGENS", error)
            return
        }

        if(files){
            const newImages = files?.filter(file => file.name != ".emptyFolderPlaceholder").map((file) => {
                const {data} = supabase.storage.from("produtos").getPublicUrl(`pijamas/${file.name}`)
        
                return{
                    ...file,
                    url: data.publicUrl
                }
            })
        
            if(newImages){
                setImages(newImages)
            } else {
                setImages(null)
            }
        }

    }

    useEffect(() => {
        loadImages()
    }, [])

    console.log("selected images array: ",selectedImages)

    return (
        <AlertDialog>
            <Card>
                <CardHeader>
                    <CardTitle>Galeria de Fotos</CardTitle>
                    <CardDescription>
                        Gerencie as imagens da galeria
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {successMessage && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <div className='flex justify-end items-center gap-3'>
                        <Input
                            type='file'
                            className='w-max'
                            accept='image/png, image/jpeg, image/jpg, image/webp'
                            onChange={(e) => setFile(e.target.files?.[0]!)}
                        />
                        <Button 
                            onClick={() => setFile(null)} 
                            variant={"destructive"}
                            className='py-6 cursor-pointer' 
                            disabled={!file}>
                            Limpar
                        </Button>
                        <Button 
                            onClick={() => updateImage(file!)} 
                            className='py-6 cursor-pointer' 
                            disabled={!file}>
                            Enviar
                        </Button>
                    </div>
                    {/* Lista de Imagens */}

                    {/* Barra de Ações em Massa */}
                    {selectedImages.length > 0 && (
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 mt-6 rounded-lg bg-muted border border-border/50 animate-in fade-in slide-in-from-top-4 duration-200">
                            <div className="flex items-center gap-3">
                                <span className="bg-primary/10 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                                    {selectedImages.length} {selectedImages.length === 1 ? 'selecionada' : 'selecionadas'}
                                </span>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="cursor-pointer text-xs h-8"
                                    onClick={handleSelectAll}
                                    id="btn-select-all"
                                >
                                    {selectedImages.length === images?.length ? 'Desmarcar tudo' : 'Selecionar todas'}
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer gap-1.5 text-xs h-8"
                                    onClick={handleSelectedImages}
                                    id="btn-bulk-copy"
                                >
                                    <Send size={14} />
                                    Enviar imagens
                                </Button>
                                
                                
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="cursor-pointer gap-1.5 text-xs h-8"
                                            id="btn-bulk-delete"
                                        >
                                            <Trash2 size={14} />
                                            Apagar em massa
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Você está prestes a apagar {selectedImages.length} imagem(ns) da galeria no Supabase Storage. Esta ação é irreversível.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteSelected}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                                                id="btn-confirm-bulk-delete"
                                            >
                                                Apagar permanentemente
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    )}

                    {/* Lista de Imagens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {images && images.length > 0 ? (
                            images?.map((image) => {
                                const isSelected = selectedImages.some((img) => img.name === image.name);
                                return (
                                    <Card 
                                        key={image.id} 
                                        className={`py-3 transition-all duration-200 border-2 cursor-pointer relative group ${
                                            isSelected 
                                                ? 'border-primary ring-2 ring-primary/10 shadow-md' 
                                                : 'border-border hover:border-muted-foreground/20'
                                        }`}
                                        onClick={() => handleToggleSelect(image)}
                                    >
                                        <CardContent className='px-3 relative'>
                                            <div className="relative overflow-hidden rounded-lg">
                                                <Image
                                                    src={image.url} 
                                                    alt={image.name} 
                                                    width={300}
                                                    height={200}
                                                    className='object-cover w-full h-[250px] rounded-lg transition-transform duration-200 group-hover:scale-[1.02]'
                                                />
                                                {/* Indicador de Seleção no Canto Superior Direito */}
                                                <div className={`absolute top-2 right-2 p-1.5 rounded-full border shadow transition-all duration-200 ${
                                                    isSelected 
                                                        ? 'bg-primary border-primary text-white scale-100' 
                                                        : 'bg-black/40 border-white/20 text-white/80 opacity-0 group-hover:opacity-100 scale-90'
                                                }`}>
                                                    <Check size={14} className={isSelected ? 'stroke-3' : 'stroke-2'} />
                                                </div>
                                            </div>
                                            <p className='text-gray-400 mt-2 text-center text-sm truncate' title={image.name}>{image.name}</p>
                                            <Button 
                                                className='w-full text-white cursor-pointer mt-2 bg-primary/80 hover:bg-primary/90 transition-colors'
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita marcar a imagem ao expandir
                                                    setOpenModalImage({
                                                        id: image.id,
                                                        open: true,
                                                        name: image.name,
                                                        url: image.url,
                                                        created_at: image.created_at,
                                                        type: image.type
                                                    });
                                                }}
                                            >
                                                Expandir Imagem
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ) : (
                            <p className='text-gray-400 mt-2 text-center col-span-full'>Nenhuma imagem encontrada</p>
                        )}
                    </div>

                    {/* Modal de Imagem */}
                    {openModalImage.open == true && (
                        <AlertDialog open={openModalImage.open} key={openModalImage.id}>
                            <AlertDialogContent >
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-center w-full  font-semibold'>
                                        Detalhes da Imagem:
                                        <p className='text-center text-primary font-semibold w-full'>
                                        {openModalImage.name}

                                        </p>
                                    </AlertDialogTitle>
                                    <hr className='my-5 border w-full'/>
                                    <AlertDialogDescription className='flex justify-center m-auto'>
                                        <Image
                                            src={openModalImage.url} 
                                            alt={openModalImage.name} 
                                            width={300}
                                            height={200}
                                            className='object-cover w-full rounded-lg'
                                        />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <hr className='mt-5 mb-0  border w-full'/>  
                                
                                <div className='flex justify-between items-center'>
                                    <p>
                                        <span className='font-semibold'>Criado em:</span> {formatDate(new Date(openModalImage.created_at))}
                                    </p>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogAction
                                    onClick={() => setOpenModalImage({
                                        id: "",
                                        open: false,
                                        name: "",
                                        url: "",
                                        created_at: new Date(),
                                        type: ""
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
        </AlertDialog>

    )
}

export default GalleryContent