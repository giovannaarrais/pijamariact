'use server'

import { auth } from "@/lib/auth"
import { UpdateUserSchema } from "./schema"
import { revalidatePath } from "next/cache"

type AdminApi = {
    adminUpdateUser: (opts: {
        body: {
            userId: string;
            data: {
                name?: string;
                email?: string;
                role?: string;
                status?: string;
            };
        };
    }) => Promise<unknown>;
};

export const updateUserAction = async ({ userId, data }: UpdateUserSchema) => {
    try {
        if (!userId) {
            return {
                success: false,
                message: "ID do usuário inválido!"
            };
        }

        const adminApi = auth.api as unknown as AdminApi;

        await adminApi.adminUpdateUser({
            body: {
                userId: userId,
                data: {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: data.status
                }
            }
        });

        revalidatePath("/admin/usuarios");

        return {
            success: true,
            message: "Usuário atualizado com sucesso!"
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Erro ao editar usuário!"
        };
    }
};