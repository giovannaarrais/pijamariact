import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getCachedSession = cache(async () => {
        return await auth.api.getSession({
            headers: await headers()
        })
})