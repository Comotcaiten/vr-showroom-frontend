"use client";

import { ProductGrid } from "@/components/product/product-grid";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useEffect, useState } from "react";

export default function Page() {
    const { dataFurniture, getFurnitures } = useFurnitureStore();

    const products = dataFurniture.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.thumbnailUrl || "/placeholder.png",
        tags: [],
    }));
    useEffect(() => {
        getFurnitures();
    }, []);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All New Collection</h1>

            <ProductGrid products={products} path={`/furnitures`}/>
        </div>
    );
}