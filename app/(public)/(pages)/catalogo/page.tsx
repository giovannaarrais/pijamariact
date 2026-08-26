import { Suspense } from "react"
import Container from "@/app/components/public/Container"
import HeroTitleSubpage from "@/app/components/public/HeroTitleSubpage"
import ProductGrid from "@/app/components/public/products/ProductGrid"
import { listActiveProducts } from "@/data/products/get"
import { listActiveCategories } from "@/data/categories/get"
import { AlertEmptyData } from "@/app/components/admin/alertEmptyData"
import { Shirt } from "lucide-react"

export default async function CatalogPage () {
    const [products, categories] = await Promise.all([
        listActiveProducts(),
        listActiveCategories(),
    ])

    if(!products) return <AlertEmptyData title="Nenhum produto encontrado" description="Tente novamente mais tarde" icon={<Shirt size={50} />} />

    return (
        <section>
            <HeroTitleSubpage title="Catálogo" desc="Confira nossos produtos" buttonBack/>
            <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Carregando produtos...</div>}>
                <ProductGrid products={products} categories={categories}/>
            </Suspense>
        </section>
    )
}
