'use client'

import { Button } from "@/components/ui/button";
import { TableComponent } from "./tableStructure";
import { Edit2, Trash2, Users } from "lucide-react";
import { AlertEmptyData } from "./alertEmptyData";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UpdateUserSchema } from "@/actions/users/update/schema";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


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
    updateUser: (params: UpdateUserSchema) => Promise<{success: boolean, message: string}>
}


export function TableUsers({users, deleteUser, updateUser}: TableUsersProps){

    const {register, handleSubmit, control, formState: {errors, isSubmitting}, reset} = useForm<UpdateUserSchema>({
        defaultValues: {
            userId: '',
            data: {
                name: "",
                email: "",
                role: undefined,
                status: undefined
            }
    }
    })
    
    function editUser(values: UpdateUserSchema){
        console.log(values)
        
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
                        <div className="flex gap-2" key={item.id}>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="cursor-pointer">
                                        <Edit2 size={25}/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Editar usuário</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Você esta prestes a editar o(a) usuário(a) <b>{item.name}</b>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <form onSubmit={handleSubmit(editUser)}>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="text-sm">Nome</label>
                                            <Input 
                                                type="text" 
                                                id="name" 
                                                defaultValue={item.name}
                                                {...register("data.name")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2  mt-3">
                                            <label htmlFor="email" className="text-sm">Email</label>
                                            <Input 
                                                type="email" 
                                                id="email" 
                                                defaultValue={item.email} 
                                                {...register("data.email")}
                                            />
                                        </div>
                                        <div className="flex gap-3  mt-3">
                                            <div className="flex flex-col gap-2">
                                                <Controller 
                                                    control={control}
                                                    name="data.role"
                                                    render={({ field }) => (
                                                    <>
                                                        <label htmlFor="role" className="text-sm">Permissão</label>
                                                        <Select 
                                                            onValueChange={field.onChange}
                                                            defaultValue={item.role}
                                                            {...register("data.role")}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Permissão"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                <SelectItem value="registered">Registrado</SelectItem>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                                <SelectItem value="master">Master</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </>
                                                    )}>
                                                </Controller>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Controller 
                                                    control={control}
                                                    name="data.status"
                                                    render={({ field }) => (
                                                    <>
                                                        <label htmlFor="status" className="text-sm">Status</label>
                                                        <Select 
                                                            onValueChange={field.onChange}
                                                            defaultValue={item.status}
                                                            {...register("data.status")}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Status"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="active">Ativo</SelectItem>
                                                                    <SelectItem value="inactive">Inativo</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </>
                                                    )}>
                                                </Controller>
                                            </div>
                                        </div>

                                        <AlertDialogFooter className="mt-5">
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction  type="submit" variant={'default'}>Editar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </form>
                                </AlertDialogContent>
                            </AlertDialog>

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