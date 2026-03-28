'use client'
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import HeaderSection from "@/app/components/admin/headerSection";
import ErrorInput from "@/app/components/admin/errorInput";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.string(),
})

type FormValues = z.infer<typeof formSchema>

const CriarUsuarioPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)

    const {register, handleSubmit, control, formState: {errors, isSubmitting}, reset} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: ""
        }
    })
    
    
    async function onSubmit(values: FormValues) {
        await authClient.signUp.email({
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
            fetchOptions: {
                onSuccess: () => {
                    reset()
                    setSuccess('Usuário criado com sucesso!')
                    setTimeout(() => {
                        setSuccess(undefined)
                    }, 4000)

                },
                onError: (error) => {
                    setError(error.error.message)
                    setTimeout(() => {
                        setError(undefined)
                    }, 4000)
                }
            }
        })
    }

    return ( 
        <Container>
            <HeaderSection
                title="Criar Usuário"
                icon={<User size={25}/>}
                description="Adicione usuários de acordo com seu nivel de permissão"
                buttonBack={true}
            />

            <Card>
                <CardHeader>
                    <CardTitle className="font-bold text-lg">Formulário de criação de usuário</CardTitle>
                    <CardDescription>Preencha os campos abaixo para criar um novo usuário</CardDescription>
                </CardHeader>
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
                        <div className="grid grid-cols-2 gap-4">
                           <div className="relative">
                             {/* Nome */}
                                {errors.name && (
                                    <ErrorInput 
                                        message={errors.name?.message}
                                    />
                                )}
                                <Input
                                    id="nome"
                                    type="text"
                                    placeholder="Nome"
                                    {...register("name")}
                                    required
                                />
                           </div>
                            
                            <div className="relative">
                                {/* Email */}
                                {errors.email && (
                                    <ErrorInput 
                                        message={errors.email?.message}
                                    />
                                )}
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    {...register("email")}
                                    required
                                />
                            </div>

                           <div className="relative">
                                {/* Password */}
                                {errors.password && (
                                    <ErrorInput 
                                        message={errors.password?.message}
                                    />
                                )}
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    {...register("password")}
                                    placeholder="Senha"
                                />
                           </div>

                            <div className="relative">
                                {/* Permissao */}
                                {errors.role && (
                                    <ErrorInput 
                                        message={errors.role?.message}
                                    />
                                )}

                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange} defaultValue={field.value}
                                        {...register("role")}
                                        required 
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Permissão"/>
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
                                
                            </div>
                        </div>
                        <Button disabled={isSubmitting} type="submit" variant='default' className="w-full mt-4 cursor-pointer">
                            {isSubmitting ? (
                                <>
                                  <Loader2 className="animate-spin" size={24} /> <span>Criando...</span>
                                </>
                            ) : (
                                'Criar'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CriarUsuarioPage;