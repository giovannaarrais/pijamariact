import { Card, CardContent } from "@/components/ui/card"

interface AlertEmptyDataProps {
    title: string,
    description: string,
    icon: React.ReactNode,
}

export function AlertEmptyData({title, description, icon}: AlertEmptyDataProps){
    return (
        <Card className="py-10">
            <CardContent>
                <div className="flex items-center flex-col justify-center">
                    <div className="flex items-center justify-center mb-2">
                        <p className="text-primary">{icon}</p>
                    </div>
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}