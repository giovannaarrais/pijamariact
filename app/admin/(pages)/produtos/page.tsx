import Container from "@/app/components/Container";
import { TableComponent } from "../../../components/admin/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { List, Plus } from "lucide-react";
import Link from "next/link";

interface fastActionsProps {
  id: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}
export default function ProductsPage() {
  const fastActions: fastActionsProps[] = [
    {
      id: 1,
      title: "Novo produto",
      description: "Adicionei + produtos a lista",
      icon: <Plus />,
      link: "produtos/criar",
      color: "green-400",
    },
    {
      id: 2,
      title: "Lista de produtos",
      description: "Listagem de todos os produtos",
      icon: <List />,
      link: "#produtos",
      color: "blue-400",
    },
  ];

  return (
    <Container>
      <div>
        <h3>Ações Rápidas</h3>
        <div className="flex gap-4">
          {fastActions.map((item) => (
            <Card
              key={item.id}
              className={`border-b-3 border-${item.color} p-3 gap-1`}
            >
              <Link href={item.link}>
                <div className="flex gap-2 mb-0">
                  <span>{item.icon}</span>
                  <h4 className={`font-bold text-md`}>{item.title}</h4>
                </div>
                <p className="text-sm opacity-50">{item.description}</p>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      <section id="produtos">
        <TableComponent
          title="Lista de Produtos Cadastrados"
          tableHeads={["n", "Produto", "Categoria", "Imagem", "Valor"]}
          tableRows={[
            [1, "Pijama", "Pijamas", "Imagem", 30.33],
            [2, "Calcinha", "Lingeries", "Imagem", 40.44],
          ]}
        />
      </section>
    </Container>
  );
}
