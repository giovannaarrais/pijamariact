'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"


const formSchema = z.object({
    email: z.email('Email inválio'),
    password: z.string('Senha invalida').min(8)
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
    const router = useRouter()
    const {register, handleSubmit, setError, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })
    
    async function onSubmit(values: FormValues) {
        console.log(values)
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            fetchOptions: {
                onSuccess: () => {
                    router.push('/admin')
                },
                onError: (error) => {
                    if(error.error.code == "USER_NOT_FOUND"){
                        // error aparece no campo de email
                        return setError("email", {
                            message: "E-mail nao encontrado"
                        });
                    }

                    if(error.error.code == 'INVALID_EMAIL_OR_PASSWORD'){
                        setError('password', {
                            message: 'Senha inválida'
                        })
                        return setError('email', {
                            message: 'E-mail inválido'
                        })
                    }
                }
            }
        })
    }


    return (
        <div className="flex justify-center mt-10">
            <Card className="w-full max-w-sm rounded-br-none rounded-r-none">
                <CardHeader>
                    <CardTitle>Acesso á area administrativa</CardTitle>
                    <CardDescription>Somente pessoas registradas possuem acesso</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image 
                        src={'/logo.png'}
                        alt="Logo Pijamariact"
                        width={150}
                        height={150}
                        className="m-auto"
                    />
                </CardContent>
                <CardFooter>
                    <p className="text-muted-foreground text-sm ">Caso precise de ajuda, entre em contato</p>
                </CardFooter>
            </Card>

            <Card className="w-full max-w-sm  rounded-tl-none rounded-l-none">
                <CardHeader>
                    <CardTitle>Realize o seu login!</CardTitle>
                    <CardDescription>
                        Acesse a plataforma com email e senha
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                            <div className="grid gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    placeholder="E-mail"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    {...register('password')}
                                    placeholder="Senha"
                                />
                            </div>
                        </div>
                        <Button type="submit" variant='default' className="w-full mt-4">
                            Acessar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    ) 
}
