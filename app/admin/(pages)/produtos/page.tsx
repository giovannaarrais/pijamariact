import Container from "@/app/components/Container";
import HeaderSection from "@/app/components/admin/headerSection";
import { TableComponent } from "../../../components/admin/table";
import { List, Plus, Shirt } from "lucide-react";
import { fastActionsProps } from "@/app/types/fastActions";

export default function ProductsPage() {
  const fastActions: fastActionsProps[] = [
    {
      id: 1,
      title: "Novo produto",
      description: "Adicione + produtos a lista",
      icon: <Plus />,
      link: "produtos/criar",
      classPLus: "bg-purple-800 text-white",
    },
    {
      id: 2,
      title: "Lista de produtos",
      description: "Listagem de todos os produtos",
      icon: <List />,
      link: "#produtos",
      classPLus: "bg-blue-900 text-white",
    },
  ];

  return (
    <Container>
      <HeaderSection
        title="Produtos"
        description="Gerencie os produtos que possuem acesso a PijamariaCT"
        icon={<Shirt size={25}/>}
        fastActions={fastActions}
      />

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
