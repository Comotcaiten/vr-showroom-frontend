"use client";

import { ProductGrid } from "@/components/product/product-grid";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useEffect, useState } from "react";

import { ProductDetail } from "@/components/product/product-detail";
import { useParams } from "next/navigation";
import { Furniture } from "@/types/furniture";



export default function Page() {
    const { id } = useParams();
    const { getFurnitureById } = useFurnitureStore();

    const [product, setProduct] = useState<Furniture>();

    const fetchAPI = async () => {
        if (!id) return;

        try {
            const product = await getFurnitureById(`${id}`);

            setProduct(product);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (!id) return;

        fetchAPI();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All New Collection</h1>
                <ProductDetail
                product={{
                    _id: product?._id || "",
                    name: product?.name || "",
                    price: product?.price || 0,

                    // ✅ đúng vì là string
                    images: product?.thumbnailUrl || "",

                    brand: { name: "Unknown" },
                    category: { name: "Unknown" },

                    quantity: product?.quantity || 0,
                    description: product?.description || "",
                }}
                />
        </div>
    );
}