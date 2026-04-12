import { columns } from "./columns"
import { GenericTableSection } from "@/components/sections/table-section";

// app/categories/page.tsx
export default function CategoriesPage() {
  return <GenericTableSection route="/categories" columns={columns} title="Categories" filter_column="name" />;
}