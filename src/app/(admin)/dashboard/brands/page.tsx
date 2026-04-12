import { columns } from "./columns"
import { GenericTableSection } from "@/components/sections/table-section";

export default function Page() {

  return (
    <main className="min-h-screen flex-row items-center">
      <section className="flex items-center">Section 1</section>
      <GenericTableSection route="/brands" columns={columns} title="Brands" filter_column="name" has_visibility={true} />
    </main>
  );
}
