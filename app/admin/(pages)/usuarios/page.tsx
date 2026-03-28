import HeaderSection from "@/app/components/admin/headerSection";
import { TableComponent } from "@/app/components/admin/table";
import Container from "@/app/components/Container";
import { fastActionsProps } from "@/app/types/fastActions";
import { List, Plus, Users } from "lucide-react";

const UsuariosPage = () => {
    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Novo usuário",
            description: "Adcione um novo usuário ao sistema",
            icon: <Plus />,
            link: "usuarios/criar",
            classPLus: "bg-purple-800 text-white",
        },
        {
            id: 2,
            title: "Lista de usuários",
            description: "Listagem de todos os usuários",
            icon: <List />,
            link: "#usuarios",
            classPLus: "bg-blue-900 text-white",
        },
    ];
    return ( 
        <Container>
           <HeaderSection
                title="Usuários"
                description="Gerencie os usuários que possuem acesso a PijamariaCT"
                icon={<Users size={25}/>}
                fastActions={fastActions}
           />

           <section id="usuarios">
                <TableComponent
                    title="Lista de Usuários Cadastrados"
                    tableHeads={["n", "Nome", "Email", "Role", "Status"]}
                    tableRows={[
                    [1, "Pijama", "Pijamas", "Imagem", 30.33],
                    [2, "Calcinha", "Lingeries", "Imagem", 40.44],
                    ]}
                />
           </section>
        </Container>
    );
}
export default UsuariosPage;