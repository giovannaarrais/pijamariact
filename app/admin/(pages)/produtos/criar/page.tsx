'use client'
import Container from "@/app/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CriarProdutoPage = () => {

    function onSubmit(){

    }

    return ( 
        <div>
            <Container>
                <Card>
                    <CardContent>
                        <form onSubmit={onSubmit}>
                            <div className="gap-3 grid-cols-4">
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
                            </div>
                            <Button type="submit" variant='default' className="w-full mt-4">
                                Acessar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default CriarProdutoPage;