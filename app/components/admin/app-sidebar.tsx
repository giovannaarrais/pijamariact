import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Grid2x2, House, MessageCircle, Shirt, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface menuItemsProps  {
    id: number,
    name: string,
    icon: React.ReactNode,
    link: string
}
const menuItems: menuItemsProps[] = [
    {
        id: 1,
        name: 'Início',
        icon: <House size={20}/>,
        link: '/admin' 
    },
    {
        id: 2,
        name: 'Produtos',
        icon: <Shirt size={20}/>,
        link: '/admin/produtos' 
    },
    {
        id: 3,
        name: 'Categorias',
        icon: <Grid2x2 size={20} />,
        link: '#'
    },
    {
        id: 4,
        name: 'Feedbacks',
        icon: <MessageCircle size={20} />,
        link: '#'
    },
    {
        id: 5,
        name: 'Usuários',
        icon: <Users size={20} />,
        link: '/admin/usuarios'
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="bg-[#8ce3da]">
                <Link href='/'>
                    <Image 
                        src={'/logo.png'}
                        alt="Logo Pijamariact"
                        width={80}
                        height={80}
                        className="m-auto"
                    />
                </Link>
            </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu className="mt-4">
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.id} className="border-b mb-2 p-2 py-1">
                                <SidebarMenuButton>
                                    <Link href={item.link} className="flex">
                                        <span className="me-2">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}