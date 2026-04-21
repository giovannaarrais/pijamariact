'use client'
import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Shirt } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    name: z.string("Digite um nome ao seu produto"),
    description: z.string("Descrição ultrapassou o limite de caracteres").max(500),
    price: z.number("Digite um preço ao seu produto"),
    categoryId: z.string(),
    imageUrl: z.string(),
    sizes: z.enum(['PP','P','M', 'G', 'GG']),
    stauts: z.boolean()
})

type FormValues = z.infer<typeof formSchema>


const CriarProdutoPage = () => {
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const {register, handleSubmit, control, formState: {errors, isSubmitting}} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            categoryId: '',
            imageUrl: '',
            stauts: true,
            sizes: "M"
        }
    })


    function onSubmit(values: FormValues){
        console.log(values)
    }

    return ( 
        <div>
            <Container>
                <HeaderSection
                title="Registrar novo produto"
                description="Cadastre aqui todos os seus produtos"
                buttonBack={true}
                icon={<Shirt />}

                />
                <Card>
                    <CardContent>

                        {success && (
                            <div className="text-center mb-4 flex justify-center shadow text-green-600 p-2">
                                <AlertCircle />
                                <p className="text-green-500 py-1 px-2 rounded text-center">
                                    {success}
                                </p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="text-center mb-4 flex justify-center shadow text-red-600 p-2">
                                <AlertCircle />
                                <p className="text-red-500 py-1 px-2 rounded text-center">
                                    {error}
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-3 ">
                                <div className="space-y-3">
                                    <Input
                                        id="name"
                                        type="name"
                                        {...register('name')}        
                                        placeholder="Nome"
                                        required
                                    />
                                    <Input
                                        id="price"
                                        type="number"
                                        {...register('price')}        
                                        placeholder="Valor"
                                        required
                                    />

                                    <div className="flex gap-3">
                                        <Controller
                                            control={control}
                                            name="categoryId"
                                            render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange} defaultValue={field.value}
                                                {...register("categoryId")}
                                                required 
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Categoria do produto"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="registered">Registrado</SelectItem>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="master">Master</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            )}>
                                        </Controller>

                                        

                                        <Controller
                                            control={control}
                                            name="sizes"
                                            render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange} defaultValue={field.value}
                                                {...register("sizes")}
                                                required 
                                                
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Tamanho"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup >
                                                        <SelectItem value="PP">PP</SelectItem>
                                                        <SelectItem value="P">P</SelectItem>
                                                        <SelectItem value="M">M</SelectItem>
                                                        <SelectItem value="G">G</SelectItem>
                                                        <SelectItem value="GG">GG</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            )}>
                                        </Controller>
                                    </div>

                                    <Input
                                        id="imageUrl"
                                        type="file"
                                        {...register('imageUrl')}        
                                        placeholder="Imagem"
                                    />
                                    
                                </div>
                                <div>
                                    <textarea 
                                        className="border rounded-md p-1 px-3 w-full"
                                        rows={7}
                                        id="description" 
                                        {...register('description')}
                                        placeholder="Descrição"
                                    ></textarea>

                                    <div className="flex items-center gap-3 justify-center ">
                                        <label htmlFor="status" className="text-sm text-gray-500 text-end">Produto esta ativo?</label>
                                        <Input
                                            className="shadow-none w-8"
                                            id=""
                                            type="checkbox"
                                            checked
                                            {...register('stauts')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" variant='default' className="w-full mt-4">
                                {isSubmitting ? 'Criando...' : 'Criar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default CriarProdutoPage;