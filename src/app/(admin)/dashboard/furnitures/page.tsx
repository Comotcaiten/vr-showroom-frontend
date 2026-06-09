"use client";
// app/src/(admin)/dashboard/brands/page.tsx
import { GenericTable } from "@/components/common/generic-table";
import { DialogForm } from "@/components/common/dialog-form-v2";
// {-------------------------------------- //
import { createColumns } from "@/components/dashboard/columns/furniture-columns";
import Validation from "@/validations/furniture_validation";
import { Furniture } from "@/types/furniture";
// --------------------------------------} //
import { useEffect, useState } from "react";
// import { useCategoryStore } from "@/stores/useCategoryStore";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useBrandStore } from "@/stores/useBrandStore";
import { useModelStore } from "@/stores/useModelStore";

const title = "Furniture";
const schema = Validation.create;

export default function Page() {
    // {-------------------------------------- //
    const { loading, dataFurniture, createFurniture, updateFurniture, removeFurniture, getFurnitures } = useFurnitureStore();
    const { dataCategory, getCategorys } = useCategoryStore();
    const { dataBrand, getBrands } = useBrandStore();
    const { dataModel, getModels } = useModelStore();
    const [open, setOpen] = useState(false);
    const [editingData, setEditingData] = useState<Furniture | null>(null);
    // --------------------------------------} //

    const columns = createColumns({
        onEdit: (data) => {
            setEditingData(data);
            setOpen(true);
        },
        onDelete: async (data) => {
            const res = await removeFurniture(data._id);
        },
    });

    useEffect(() => {
        getFurnitures();
        getCategorys();
        getBrands();
        getModels();
    }, [])

    return (
        <main className="min-h-screen flex-row items-center">
            <section className="flex items-center">{title}</section>

            {loading ? (
                <h1>...Loading</h1>
            ) : (
                <GenericTable
                    columns={columns}
                    data={dataFurniture}
                    filter_column="name"
                    has_visibility={true}
                    dialogForm={
                        <DialogForm
                            open={open}
                            onOpenChange={(o) => {
                                setOpen(o);
                                console.log(o);
                                if (!o) {
                                    console.log("Set Null")
                                    setEditingData(null)
                                };
                            }}
                            schema={schema}
                            // {-------------------------------------- //
                            fields={[
                                {
                                    name: "name",
                                    label: "Furniture Name",
                                    helperText: "Furniture name like: Chair",
                                },
                                {
                                    name: "description",
                                    label: "Description",
                                    type: "textarea",
                                    showCount: true,
                                    maxLength: 500,
                                },
                                {
                                    name: "slect-categoryId",
                                    label: "CategoryID",
                                    isSelect: true,
                                    placeholder: "Select CategoryID",
                                    selectContent: {
                                        defaultValue: {id: "1", value: "1", label: " 1"},
                                        items: dataCategory.map((item) => {
                                            return {
                                                id: item._id,
                                                value: item._id,
                                                label: item.name,
                                            }
                                        })
                                    }
                                },
                                {
                                    name: "slect-brandId",
                                    label: "BrandID",
                                    isSelect: true,
                                    placeholder: "Select BrandID",
                                    selectContent: {
                                        defaultValue: {id: "1", value: "1", label: " 1"},
                                        items: dataBrand.map((item) => {
                                            return {
                                                id: item._id,
                                                value: item._id,
                                                label: item.name,
                                            }
                                        })
                                    }
                                },
                                {
                                    name: "slect-modelId",
                                    label: "ModelID",
                                    isSelect: true,
                                    placeholder: "Select ModelID",
                                    selectContent: {
                                        defaultValue: {id: "1", value: "1", label: " 1"},
                                        items: dataModel.map((item) => {
                                            return {
                                                id: item._id,
                                                value: item._id,
                                                label: item._id,
                                            }
                                        })
                                    }
                                },
                                {
                                    name: "price",
                                    label: "Price",
                                    type: "number",
                                },
                                {
                                    name: "quantity",
                                    label: "Quantity",
                                    type: "number",
                                },
                            ]}
                            // --------------------------------------} //
                            initialData={editingData}
                            // title={editingData ? "Edit Brand" : "Create Brand"}
                            onCreate={async (data) => {
                                const success = await createFurniture(
                                    data.name || "",
                                    data.description || "",
                                    data.categoryId,
                                    data.brandId,
                                    data.price,
                                    data.quantity || 0,
                                    data.modelId || "",
                                    data.thumbnailUrl || ""
                                );
                                if (success) {
                                    setOpen(false);
                                }
                            }}
                            onUpdate={async (data) => {
                                if (!editingData) return;
                                const success = await updateFurniture(
                                    editingData._id, 
                                    data.name || "",
                                    data.description || "",
                                    data.categoryId,
                                    data.brandId,
                                    data.price,
                                    data.quantity || 0,
                                    data.modelId || "",
                                    data.thumbnailUrl || ""
                                );
                                if (success) {
                                    setOpen(false);
                                }
                            }}
                        />
                    }
                />
            )}
        </main>
    );
}
