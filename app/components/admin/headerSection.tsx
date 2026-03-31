'use client'

import { fastActionsProps } from "@/app/types/fastActions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderSectionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    fastActions?: fastActionsProps[];
    buttonBack?: boolean;
}

export default function HeaderSection({title, description, buttonBack, icon, fastActions}: HeaderSectionProps) {
    const router = useRouter();
    return (
        <Card
            className='border-b-3  p-3 gap-1 py-7 px-6'>
            <div className="flex gap-2 mb-0">
                {buttonBack && (
                    <Button onClick={() => router.back()} variant="default" size="icon" className="flex justify-center items-center px-1 rounded w-8 h-8 cursor-pointer">
                        <ArrowLeft size={18} />
                    </Button>
                )}
                {icon}
                <h4 className={`font-bold text-lg`}>{title}</h4>
            </div>
            <p className="text-sm opacity-50">{description}</p>

            <div className={`${fastActions?.length  && 'border-t pt-5 mt-3'} flex gap-4`}>
            {fastActions?.map((item) => (
                <Card
                key={item.id}
                className={`shadow-none ${item.classPLus} px-4 py-5 gap-1`}
                >
                    <Link href={item.link}>
                        <div className="flex gap-2 mb-0">
                            <span>{item.icon}</span>
                            <h4 className={`font-bold text-md`}>{item.title}</h4>
                        </div>
                        <p className="text-sm opacity-50 max-w-50 mt-2">{item.description}</p>
                    </Link>
                </Card>
            ))}
            </div>
        </Card>
    )
}