import { deleteUser } from "@/actions/users/delete";
import HeaderSection from "@/app/components/admin/headerSection";
import { TableUsers } from "@/app/components/admin/tableUsers";
import Container from "@/app/components/Container";
import { fastActionsProps } from "@/app/types/fastActions";
import { getUsers } from "@/data/users/get";
import {List, Plus, Users } from "lucide-react";


const UsuariosPage = async () => {
    const users = await getUsers()
    
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
                <TableUsers users={users} deleteUser={deleteUser}/>
           </section>
        </Container>
    );
}
export default UsuariosPage;