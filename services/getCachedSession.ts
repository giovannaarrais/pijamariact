import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getCachedSession = cache(async () => {
    try {
        return await auth.api.getSession({
            headers: await headers()
        });
    } catch (error) {
        console.error("[getCachedSession] Falha ao buscar sessão:", error);
        return null;
    }
})