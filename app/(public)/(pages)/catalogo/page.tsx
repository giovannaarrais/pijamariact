import Container from "@/app/components/public/Container"
import HeroTitleSubpage from "@/app/components/public/HeroTitleSubpage"
import ProductGrid from "@/app/components/public/products/ProductGrid"
import { listActiveProducts } from "@/data/products/get"

export default async function CatalogPage () {
    const products = await listActiveProducts()
    return (
        <section>
            <HeroTitleSubpage title="Catálogo" desc="Confira nossos produtos" buttonBack/>
            <Container extraClass="py-2!">
                <ProductGrid extraClass="lg:grid-cols-4!" products={products}/>
            </Container>
        </section>
    )
}
