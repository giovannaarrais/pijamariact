'use client'
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

const CriarUsuarioPage = () => {

    function onSubmit(){

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
                    <form onSubmit={onSubmit}>
                        <div className=" grid-cols-4 space-y-3">
                            <Input
                                id="nome"
                                type="text"
                                placeholder="Nome"
                                required
                            />
                            <Input
                                id="email"
                                type="email"
                                placeholder="E-mail"
                                required
                            />
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                placeholder="Senha"
                            />
                            <Input 
                                id="role" 
                                type="role" 
                                required 
                                placeholder="Permissão"
                            />
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