import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { AppSidebar } from "../components/admin/app-sidebar";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCachedSession } from "@/services/getCachedSession";

export const metadata: Metadata = {
  title: "Pijamariact Admin",
  description: "Área Administrativa da Pijamaria",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCachedSession();

  if (!session?.user.id) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <section className="shadow-md p-2">
          <div className="flex justify-center items-center gap-3">
            <Link href="/admin">
              <Image
                src={"/logo.png"}
                alt="Logo Pijamariact"
                width={50}
                height={50}
                className="m-auto"
              />
            </Link>
            <h3 className="font-semibold">
              Área Administrativa da Pijamariact
            </h3>
          </div>
        </section>

        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
