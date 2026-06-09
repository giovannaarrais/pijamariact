"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { supabase } from '@/lib/supabaseStorage';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import { refresh } from 'next/cache';

function GalleryContent() {
    const [file, setFile] = useState<File | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
    console.log(successMessage)
    console.log(errorMessage)

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
            </CardContent>
        </Card>
    )
}

export default GalleryContent