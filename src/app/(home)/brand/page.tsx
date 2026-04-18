"use clinet";

import BrandsSubmitForm from "@/components/brands/brand-form";
import SectionHeader from "@/components/common/section-header";
import { SparkleIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="">
        <section className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader
                        title="Sumbit"
                        icon={SparkleIcon}
                        description=""
                    />
                </div>
                <div className="max-w-7xl mx-auto">
                    <BrandsSubmitForm/>
                </div>
            </div>
        </section>
    </main>
  );
}
