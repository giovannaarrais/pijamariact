import Container from "@/app/components/Container";
import { TableComponent } from "../../components/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ProductsPage(){
    
    const fastActions = [
        {
            title: 'Novo produto',
            description: 'Adicionei + produtos a lista',
            icon: <Plus />,
            link: ''
        }
    ]

    return(
        <Container>
            <div>
                <Card>
                    <CardHeader>Ações Rápidas</CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>

            <section>
                <TableComponent 
                    title="Lista de Produtos Cadastrados"
                    tableHeads={['n', 'Produto', 'Categoria', 'Imagem', 'Valor']}
                    tableRows={[
                        [1, 'Pijama',  'Pijamas','Imagem', 30.33],
                        [2, 'Calcinha', 'Lingeries', 'Imagem',40.44]
                    ]}
                    />
            </section>
        </Container>
    )
}