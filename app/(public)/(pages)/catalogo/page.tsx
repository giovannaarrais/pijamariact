import ProductGrid from "@/app/components/public/ProductGrid"
import { listActiveProducts } from "@/data/products/get"

export default async function CatalogPage () {
    const products = await listActiveProducts()
    return (
        <section>
            <h1>Catálogo</h1>
            <ProductGrid products={products} />
        </section>
    )
}
