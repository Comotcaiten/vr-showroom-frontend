'use client'
import { GenericTable } from "@/components/common/generic-table";
import { BrandColumns } from "@/components/dashboard/columns/brand-columns";
import { brandService } from "@/services/brand-services";
import { Brand } from "@/types/brand";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await brandService.getAll();
                setData(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBrands();
    }, []);

    return (
        <main className="min-h-screen flex-row items-center">
            <section className="flex items-center">Section 1</section>
            {isLoading ? <>
                <h1>...Loaidng</h1>
            </> : <GenericTable
                columns={BrandColumns}
                title="Brands"
                data={data}
                filter_column="name"
                has_visibility={true}
            />}
        </main>
    );
}