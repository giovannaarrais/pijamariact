"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Category, ProductWithCategory } from "@/app/types/catalog";
import { useSearchParams } from "next/navigation";

interface FilterProductsProps {
    products: ProductWithCategory[] | null | undefined;
    categories: Category[] | null | undefined;
    onFilteredProducts: (filtered: ProductWithCategory[]) => void;
    exibicaoFront?: boolean;
}

const FilterProducts = ({ products, categories, onFilteredProducts, exibicaoFront }: FilterProductsProps) => {
    const searchParams = useSearchParams();
    const categoryParams = searchParams.get('category');
    const [searchValue, setSearchValue] = useState<string>("")
    const [statusFilter, setStatusFilter] = useState<string>("todos")
    const [categoryFilter, setCategoryFilter] = useState<string>(categoryParams ?? "todos")
    const [searchAdvancedIsOpen, setSearchAdvancedIsOpen] = useState<boolean>(false);
    const [priceFilter, setPriceFilter] = useState<string>("todos");
    const [sizesFilter, setSizesFilter] = useState<"PP" | "P" | "M" | "G" | "GG" | "todos">("todos");


    if (!products) return null;

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

    useEffect(() => {
        setCategoryFilter(categoryParams ?? "todos");
    }, [categoryParams]);

    useEffect(() => {
        onFilteredProducts(filteredProducts);
    }, [searchValue, statusFilter, categoryFilter, priceFilter, sizesFilter, products]);
        
    return (
            <Card>
                <CardContent>
                    {exibicaoFront && (
                        <div>
                            <h1 className="text-2xl font-bold ">Filtros</h1>
                            <p className="text-muted-foreground mb-4">Filtre os produtos por nome, categoria, status, faixa de preço e tamanho</p>
                        </div>
                    )}
                    <div  className={`flex justify-between ${exibicaoFront ? "flex-col" : "flex-row"}`}>
                        <Input
                            placeholder="Pesquisar pelo nome do produto"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`${exibicaoFront ? "w-full! mb-6! " : ""} w-2/6 mb-3 `}
                        />

                        <div className={`flex gap-3 ${exibicaoFront ? "lg:flex-col flex-wrap" : "flex-row  items-center"}`}>
                            {!exibicaoFront && (
                                <select name="status" id="" className="" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                                    <option value="todos">Status</option>
                                    <option value="ativo">Ativos</option>
                                    <option value="inativo">Inativos</option>
                                </select>
                            )}
                            <select name="categoria" id="" className="" onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
                                <option value="todos">Categorias</option>
                                {categories?.map((categorie, index) => (
                                    <option value={categorie.name} key={`${categorie.id}-categoria-${index}`}>
                                        {categorie.name}
                                    </option>
                                ))}
                            </select>

                            <Button className=" min-h-[46px]" onClick={clearFilters} variant="outline">
                                Limpar Filtros
                            </Button>
                            <Button className=" min-h-[46px]" onClick={() => setSearchAdvancedIsOpen(!searchAdvancedIsOpen)} variant="default">
                                Filtros Avançados
                            </Button>

                        </div>
                    </div>

                    {searchAdvancedIsOpen && (
                        <div className="mt-4 flex flex-col gap-4 justify-end border-t py-4 ">
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
    )
}

export default FilterProducts