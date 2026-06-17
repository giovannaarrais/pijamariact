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
    const [searchValue, setSearchValue] = useState<string>("")
    const [statusFilter, setStatusFilter] = useState<string>("todos")
    const [categoryFilter, setCategoryFilter] = useState<string>("todos")
    const [searchAdvancedIsOpen, setSearchAdvancedIsOpen] = useState<boolean>(false);
    const [priceFilter, setPriceFilter] = useState<string>("todos");
    const [sizesFilter, setSizesFilter] = useState<"PP" | "P" | "M" | "G" | "GG" | "todos">("todos");

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

    let filteredProducts = searchValue
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase()) 
        )
        : products;

    const filteredProductsByStatus = statusFilter === "todos"
        ? filteredProducts
        : filteredProducts.filter((product) => product.active === (statusFilter === "ativo"));

    const filteredProductsByCategory = categoryFilter === "todos"
        ? filteredProductsByStatus
        : filteredProductsByStatus.filter((product) => product.category.name === categoryFilter);

    const filteredProductsByPrice = priceFilter === "todos" 
        ? filteredProductsByCategory 
        : filteredProductsByCategory.filter((product) => {
            const price = Number(product.price)
            if (priceFilter === "0-50") return price >= 0 && price <= 50
            if (priceFilter === "50-100") return price > 50 && price <= 100
            if (priceFilter === "100-200") return price > 100 && price <= 200
            if (priceFilter === "200+") return price > 200
        })
    
    const filteredProductsBySizes = sizesFilter === "todos"
        ? filteredProductsByPrice
        : filteredProductsByPrice.filter((product) => product.sizes.includes(sizesFilter)); 

    console.log(sizesFilter, filteredProductsBySizes, products[0].sizes)
        
    filteredProducts = filteredProductsBySizes || filteredProductsByPrice || filteredProductsByCategory || filteredProductsByStatus || filteredProducts
        
    const clearFilters = () => {
        setSearchValue("")
        setStatusFilter("todos")
        setCategoryFilter("todos")
        setPriceFilter("todos")
        setSizesFilter("todos")
    }

    return (
        <div className="space-y-4">

            <Card>
                <CardContent>
                    <div  className="flex justify-between">
                        <Input
                        placeholder="Pesquisar pelo nome do produto"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-2/6"
                    />

                        <div>
                            <select name="status" id="" className="ms-4" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                                <option value="todos">Status</option>
                                <option value="ativo">Ativos</option>
                                <option value="inativo">Inativos</option>
                            </select>
                            <select name="categoria" id="" className="ms-4" onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
                                <option value="todos">Categorias</option>
                                {categories?.map((categorie, index) => (
                                    <option value={categorie.name} key={`${categorie.id}-categoria-${index}`}>
                                        {categorie.name}
                                    </option>
                                ))}
                            </select>

                            <Button className="ms-4 min-h-[46px]" onClick={clearFilters} variant="outline">
                                Limpar Filtros
                            </Button>
                            <Button className="ms-4 min-h-[46px]" onClick={() => setSearchAdvancedIsOpen(!searchAdvancedIsOpen)} variant="default">
                                Busca Avançada
                            </Button>

                        </div>
                    </div>

                    {searchAdvancedIsOpen && (
                        <div className="mt-4 flex gap-4">
                            <select name="faixaPreco" id="faixaPreco" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                                <option value="todos">Faixa de Preço</option>
                                <option value="0-50">R$ 0,00 - R$ 50,00</option>
                                <option value="50-100">R$ 50,00 - R$ 100,00</option>
                                <option value="100-200">R$ 100,00 - R$ 200,00</option>
                                <option value="200+">Acima de R$ 200,00</option>
                            </select>
                            <select name="tamanho" id="tamanho" onChange={(e) => setSizesFilter(e.target.value as "PP" | "P" | "M" | "G" | "GG" | "todos")} value={sizesFilter}>
                                <option value="todos">Tamanhos</option>
                                <option value="PP">PP</option>
                                <option value="P">P</option>
                                <option value="M">M</option>
                                <option value="G">G</option>
                                <option value="GG">GG</option>
                            </select>
                        </div>
                    )}
                </CardContent>
            </Card>


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
