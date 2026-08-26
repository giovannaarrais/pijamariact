'use server'

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

type AdminApi = {
    removeUser: (opts: {
        body: { userId: string };
        headers: Headers;
    }) => Promise<unknown>;
};

export async function deleteUserAction(userId: string) {
    try {
        const adminApi = auth.api as unknown as AdminApi;

        await adminApi.removeUser({
            body: { userId },
            headers: await headers()
        });

        revalidatePath("/admin/usuarios");
        return {
            success: true,
            message: "Usuário deletado com sucesso!"
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Erro ao deletar usuário!"
        };
    }
}
