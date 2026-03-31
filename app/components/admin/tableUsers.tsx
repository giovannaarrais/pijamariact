'use client'

import { Button } from "@/components/ui/button";
import { TableComponent } from "./tableStructure";
import { Edit2, Trash2, Users } from "lucide-react";
import { AlertEmptyData } from "./alertEmptyData";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



interface TableUsersProps {
    users: Array<{
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: string;
        status: string;
    }> | null
    deleteUser: (userId: string) => Promise<{success: boolean, message: string}>
}

export function TableUsers({users, deleteUser}: TableUsersProps){
    
    function editUser(id: string){
        console.log(id)
    }
        
    return (
       <>
         {users  ? (
            <TableComponent
                title="Lista de Usuários Cadastrados"
                tableHeads={["Nº", "Nome", "Email", "Role", "Status", "Ações"]}
                tableRows={users.map((item, index) => {
                    index = index + 1
                    return [
                        index,
                        item.name,
                        item.email,
                        item.role,
                        item.status, 
                        <div className="flex gap-2">
                            <Button className="cursor-pointer" onClick={() => editUser(item.id)}>
                                <Edit2 size={25}/>
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={'destructive'} className="cursor-pointer">
                                        <Trash2 size={25}/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza que deseja excluir? </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Você deseja excluir o usuário <b>{item.name}?</b> Essa ação não pode ser desfeita.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction  onClick={() => deleteUser(item.id)} variant={'destructive'}>Excluir</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ]
                })}
            />
        ): (
                <AlertEmptyData
                title="Nenhum usuário encontrado"
                description="Nenhum usuário foi encontrado no sistema"
                icon={<Users size={50}/>}
            />
        )}

        
       </>
    )
}