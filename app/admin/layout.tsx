import type { Metadata } from "next";
import "../styles/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Pijamariact Admin",
    description: "Área Administrativa da Pijamaria",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className="antialiased"
            >
                <SidebarProvider >
                    <AppSidebar />
                    <main className="w-full">
                        <section className="bg-[#8ce3da] shadow-md p-2">
                            <div className="flex justify-center items-center gap-3">
                                <Link href='/admin'>
                                    <Image 
                                        src={'/logo.png'}
                                        alt="Logo Pijamariact"
                                        width={50}
                                        height={50}
                                        className="m-auto"
                                    />
                                </Link>
                                <h3 className=" font-semibold ">Área Administrativa da Pijamariact</h3>
                            </div>
                        </section>
                        
                        <SidebarTrigger/>
                        {children}
                    </main>
                </SidebarProvider> 
            </body>
        </html>
    );
}
