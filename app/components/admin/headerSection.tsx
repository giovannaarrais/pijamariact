import { fastActionsProps } from "@/app/types/fastActions";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface HeaderSectionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    fastActions?: fastActionsProps[];
}

export default function HeaderSection({title, description, icon, fastActions}: HeaderSectionProps) {
    return (
        <Card
            className='border-b-3  p-3 gap-1 py-7 px-8'>
            <div className="flex gap-2 mb-0">
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