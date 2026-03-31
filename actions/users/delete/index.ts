'use server'

import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function deleteUser(userId: string){
    try {
        await auth.api.removeUser({
            body: { userId },
            headers: await headers() // ← passa os cookies da sessão atual
        })

        revalidatePath("/admin/usuarios") // ao deletar um usuário, atualiza a página de usuários
        return {
            success: true,
            message: "Usuário deletado com sucesso!"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Erro ao deletar usuário!"
        }
    }
}
