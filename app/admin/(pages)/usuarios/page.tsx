import Container from "@/app/components/Container";
import { fastActionsProps } from "@/app/types/fastActions";
import { Card } from "@/components/ui/card";
import { List, Plus, Users } from "lucide-react";
import Link from "next/link";

const UsuariosPage = () => {
    const fastActions: fastActionsProps[] = [
        {
            id: 1,
            title: "Novo usuário",
            description: "Adcione um novo usuário ao sistema",
            icon: <Plus />,
            link: "usuarios/criar",
            color: "green-400",
        },
        {
            id: 2,
            title: "Lista de usuários",
            description: "Listagem de todos os produtos",
            icon: <List />,
            link: "#usuarios",
            color: "blue-400",
        },
    ];
    return ( 
        <Container>
            <Card
                className={`border-b-3  p-3 gap-1`}
                >
                    <div className="flex gap-2 mb-0">
                    <Users size={20}/>
                    <h4 className={`font-bold text-md`}>Usuários</h4>
                    </div>
                    <p className="text-sm opacity-50">Gerencie os usuários que possuem acesso a <strong>PijamariaCT</strong></p>
                <h3 className="border-t py-3 mt-3">Ações Rápidas</h3>
                <div className="flex gap-4">
                {fastActions.map((item) => (
                    <Card
                    key={item.id}
                    className={` shadow-none border-${item.color} p-3 gap-1`}
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
                </Card>
        </Container>
    );
}
export default UsuariosPage;