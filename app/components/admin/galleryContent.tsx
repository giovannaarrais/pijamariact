"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { supabase } from '@/lib/supabaseStorage';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { refresh } from 'next/cache';
import Image from 'next/image';

function GalleryContent() {
    const [file, setFile] = useState<File | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [images, setImages] = useState<Array<any> | null>(null)
    
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


    


    console.log(images)



    return (
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

                <div className="grid grid-cols-4 gap-4">
                    {images && images.length > 0 ? (
                        images?.map((image) => (
                        <Card key={image.id} className='py-3'>
                            <CardContent className='px-3'>
                                <Image
                                 src={image.url} 
                                 alt={image.name} 
                                 width={300}
                                 height={300}
                                 className='rounded-lg'
                                 />
                                 <p className='text-gray-400 mt-2 text-center text-sm'>{image.name}</p>
                            </CardContent>
                        </Card>
                    ))
                    ) : (
                        <p className=' text-gray-400 mt-2 text-center'>Nenhuma imagem encontrada</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default GalleryContent