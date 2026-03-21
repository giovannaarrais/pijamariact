'use client'
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserAction } from "@/app/actions/create-user";

const formSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    role: z.enum(["master", "admin", "registered"]),
})

type FormValues = z.infer<typeof formSchema>

const CriarUsuarioPage = () => {

    const router = useRouter()
    const {register, handleSubmit} = useForm<FormValues>({
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
            const data = await CreateUserAction(values)
            if(data.success){
                console.log('usuário criado com sucesso')
            }
            console.log(values)

        } catch(error){
            console.log(error)
        }
        // const { data, error } = await authClient.signUp.email({
        //     name: values.name, // required
        //     email: values.email, // required
        //     password:values.password, // required
        //     callbackURL: "/admin",
        // });

        // console.log(data)
    }

    return ( 
        <Container>
            <Card
                className={`border-b-3  p-3 gap-1`}
            >
                <div className="flex gap-2 mb-0">
                    <User size={20}/>
                    <h4 className={`font-bold text-md`}>Criar usuário</h4>
                </div>
                <p className="text-sm opacity-50">Adicone usuários de acordo com seu nivel de permissão</p>
            </Card>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" grid-cols-4 space-y-3">
                            <Input
                                id="nome"
                                type="text"
                                placeholder="Nome"
                                {...register("name")}
                                required
                            />
                            <Input
                                id="email"
                                type="email"
                                placeholder="E-mail"
                                {...register("email")}
                                required
                            />
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                {...register("password")}
                                placeholder="Senha"
                            />
                            <select 
                                id="role" 
                                type="role" 
                                {...register("role")}
                                required 
                            >
                                <option value="master">Master</option>
                                <option value="admin">Admin</option>
                                <option value="registered">Registered</option>
                            </select>
                        </div>
                        <Button type="submit" variant='default' className="w-full mt-4">
                            Acessar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CriarUsuarioPage;