import Link from "next/link";
import { Grid2x2, ImageUp, MessageCircle, Shirt, Users } from "lucide-react";

import HeaderSection from "@/app/components/admin/headerSection";
import Container from "@/app/components/public/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { getDashboardStats } from "@/services/dashboard";


function StatCard({
    title,
    value,
    href,
    icon,
}: {
    title: string;
    value: number;
    href: string;
    icon: React.ReactNode;
}) {
    return (
        <Link href={href}>
            <Card className="h-full transition-colors hover:bg-muted/60">
                <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <span className="rounded-md bg-primary/10 p-2 text-primary">{icon}</span>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{value}</p>
                </CardContent>
            </Card>
        </Link>
    );
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(date));
}

export default async function Home() {
    const stats = await getDashboardStats();
    if (!stats) {
        return <p>Erro ao carregar dados</p>
    }

    return (
        <main>
            <Container>
                <HeaderSection
                    title="Inicio"
                    description="Resumo administrativo da PijamariaCT"
                    icon={<Grid2x2 size={25} />}
                />

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <StatCard title="Produtos" value={stats.products} href="/admin/produtos" icon={<Shirt size={20} />} />
                    <StatCard title="Categorias" value={stats.categories} href="/admin/categorias" icon={<Grid2x2 size={20} />} />
                    {/* <StatCard title="Galeria" value={stats.galleryImages} href="/admin/galeria" icon={<ImageUp size={20} />} /> */}
                    <StatCard title="Feedbacks" value={stats.feedbacks} href="/admin/feedbacks" icon={<MessageCircle size={20} />} />
                    <StatCard title="Usuarios" value={stats.users} href="/admin/usuarios" icon={<Users size={20} />} />
                </section>

                <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MessageCircle size={20} />
                                Feedbacks recentes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats.recentFeedbacks?.length ? (
                                <div className="space-y-3">
                                    {stats.recentFeedbacks.map((feedback) => (
                                        <div key={feedback.id} className="rounded-md border p-3">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <p className="font-semibold">{feedback.name}</p>
                                                <span className="text-xs text-muted-foreground">{formatDate(feedback.createdAt)}</span>
                                            </div>
                                            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{feedback.message}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Nenhum feedback cadastrado ainda.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Acoes rapidas</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            <Link className="rounded-md border p-3 text-sm font-medium transition-colors hover:bg-muted" href="/admin/produtos/criar">
                                Cadastrar produto
                            </Link>
                            <Link className="rounded-md border p-3 text-sm font-medium transition-colors hover:bg-muted" href="/admin/galeria/criar">
                                Cadastrar imagem
                            </Link>
                            <Link className="rounded-md border p-3 text-sm font-medium transition-colors hover:bg-muted" href="/admin/feedbacks/criar">
                                Cadastrar feedback
                            </Link>
                        </CardContent>
                    </Card>
                </section>
            </Container>
        </main>
    );
}
