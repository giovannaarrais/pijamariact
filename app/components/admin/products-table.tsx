'use client'

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Plus, Shirt, Trash2 } from "lucide-react";

import { deleteProductAction } from "@/actions/products";
import { AlertEmptyData } from "@/app/components/admin/alertEmptyData";
import { FeedbackMessage } from "@/app/components/admin/feedback-message";
import { TableComponent } from "@/app/components/admin/tableStructure";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

import type { Category, ProductWithCategory } from "@/app/types/catalog";
import { imagesSeparated } from "@/utils/imagesSeparated";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import FilterProducts from "./filterProducts";



interface ProductsTableProps {
    products: ProductWithCategory[] | null | undefined;
    categories: Category[] | null | undefined;
}

function formatPrice(price: string) {
    return Number(price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function ProductsTable({ products, categories }: ProductsTableProps) {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>();
    const [pendingId, setPendingId] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>([]);


    function handleDelete(id: string) {
        setPendingId(id);
        setMessage(undefined);

        startTransition(async () => {
            const result = await deleteProductAction(id);
            setMessage({ type: result.success ? "success" : "error", text: result.message });
            setPendingId(undefined);
        });
    }

    if (!products?.length) {
        return (
            <AlertEmptyData
                title="Nenhum produto encontrado"
                description="Cadastre produtos e vincule cada um a uma categoria"
                icon={<Shirt size={50} />}
            />
        );
    }
   
    return (
        <div className="space-y-4">

            <FilterProducts products={products} categories={categories} onFilteredProducts={setFilteredProducts} />

            {message && <FeedbackMessage type={message.type} message={message.text} />}

            {filteredProducts.length > 0 ? (
                <TableComponent
                    title="Lista de Produtos Cadastrados"
                    tableHeads={["Nº", "Produto", "Categoria", "Tamanhos", "Imagens", "Valor", "Status", "Ações"]}
                    tableRows={filteredProducts.map((product, index) => [
                        index + 1,
                        product.name,
                        product.category.name,
                        product.sizes.join(", ") || "-",
                        product.imageUrl ? (
                            <div className=" flex ">
                                
                                <Image
                                    key={`${product.id}-image`}
                                    src={imagesSeparated(product.imageUrl)[0]}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 rounded-md object-cover"
                                />
                                {imagesSeparated(product.imageUrl).length > 1 && (
                                    <span className=" ms-2  flex items-center justify-center text-xs font-medium ">
                                        +{imagesSeparated(product.imageUrl).length - 1}
                                    </span>
                                )}
                            </div>  
                        ) : (
                            "-"
                        ),
                        formatPrice(product.price),
                        <span
                            key={`${product.id}-status`}
                            className={`rounded-full px-2 py-1 text-xs font-medium ${product.active ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-600"}`}
                        >
                            {product.active ? "Ativo" : "Inativo"}
                        </span>,
                        <div className="flex gap-2" key={`${product.id}-actions`}>
                            <Button asChild size="icon" className="cursor-pointer">
                                <Link href={`/admin/produtos/${product.id}/editar`} aria-label={`Editar ${product.name}`}>
                                    <Edit2 />
                                </Link>
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon" className="cursor-pointer">
                                        <Trash2 />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Excluir produto?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Voce deseja excluir <b>{product.name}</b>? Essa acao nao pode ser desfeita.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction
                                            disabled={isPending && pendingId === product.id}
                                            onClick={() => handleDelete(product.id)}
                                            variant="destructive"
                                        >
                                            Excluir
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>,
                    ])}
                />
            ): (
                <AlertEmptyData
                    title="Nenhum produto encontrado"
                    description="Cadastre produtos e vincule cada um a uma categoria"
                    icon={<Shirt size={50} />}
                 />
                
            )}

        </div>
    );
}
