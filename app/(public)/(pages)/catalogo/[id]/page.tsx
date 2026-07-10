"use client"

import HeroTitleSubpage from "@/app/components/public/HeroTitleSubpage"
import { AlertEmptyData } from "@/app/components/admin/alertEmptyData"
import { useParams } from "next/navigation"
import { findProductById } from "@/data/products/get"

export default function ProductDetailsPage () {
    const id = useParams()

    // const product = findProductById(id.id)
    console.log(id)
    
    // if(!product) return <AlertEmptyData title="Nenhum produto encontrado" description="Tente novamente mais tarde" icon={<Shirt size={50} />} />
    return (
        <section>
            <HeroTitleSubpage title="Catálogo" desc="Confira nossos produtos" buttonBack/>
        </section>
    )
}
