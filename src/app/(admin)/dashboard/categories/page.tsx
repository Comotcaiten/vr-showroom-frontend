'use client'
import { GenericTable } from "@/components/common/generic-table";
import { CategoryColumns } from "@/components/dashboard/columns/category-columns";
import { categoryService } from "@/services/category-services";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

export default function Page() {
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await categoryService.getAll();
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
                columns={CategoryColumns}
                title="Category"
                data={data}
                filter_column="name"
                has_visibility={true}
            />}
        </main>
    );
}