'use server'

import { CreateUserSchema } from "./schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type AdminApi = {
    createUser: (opts: {
        body: { name: string; email: string; password: string; role: string };
        headers: Headers;
    }) => Promise<unknown>;
};

export async function CreateUserAction(data: CreateUserSchema) {
    try {
        const adminApi = auth.api as unknown as AdminApi;

        const result = await adminApi.createUser({
            body: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role
            },
            headers: await headers()
        });

        revalidatePath("/admin/usuarios");

        return {
            success: true,
            data: result
        };

    } catch (error: unknown) {
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro ao criar usuario"
        };
    }
}
