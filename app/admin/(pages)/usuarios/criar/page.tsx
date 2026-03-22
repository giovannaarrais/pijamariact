'use client'
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserAction } from "@/app/actions/create-user";
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

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.enum(["master", "admin", "registered"]),
})

type FormValues = z.infer<typeof formSchema>

const CriarUsuarioPage = () => {
    const router = useRouter()
    const [error, setError] = useState<string | undefined>(undefined)

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "registered"
        }
    })
    
    
    async function onSubmit(values: FormValues) {
        try{
            const response = await CreateUserAction(values)
            if(!response.success){
                setError(response.error)
                return
            }
            
            reset()
            console.log('usuário criado com sucesso')
        } catch(error){
            console.log(error)
        }
    }

    return ( 
        <Container>
            <HeaderSection
                title="Criar Usuário"
                icon={<User size={25}/>}
                description="Adicione usuários de acordo com seu nivel de permissão"
            />

            <Card>
                {/* {isSubmitting && ( */}
                    {/* <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded">
                        <Loader2 className="animate-spin" size={24} />
                    </div> */}
                {/* )} */}
                <CardContent>
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
                                <Select
                                    {...register("role")}
                                    required 
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Permissão" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectItem value="registered">Registrado</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="master">Master</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button disabled={isSubmitting} type="submit" variant='default' className="w-full mt-4">
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