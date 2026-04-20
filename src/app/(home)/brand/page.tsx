"use client";

// import { useEffect, useState } from "react";

// import BrandsSubmitForm from "@/components/brands/brand-form";
import SectionHeader from "@/components/common/section-header";
import { BugReportForm } from "@/components/forms/demo";
import { SparkleIcon } from "lucide-react";
// import { brandService } from "@/services/brand-services";
// import { Brand } from "@/types/brand";

export default function Home() {
    // const [data, setData] = useState<Brand[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<Error | null>(null);

    // useEffect(() => {
    //     brandService
    //         .getAll()
    //         .then((result) => {
    //             setData(result.data)
    //         })
    //         .catch(setError)
    //         .finally(() => setLoading(false));
    // }, []);

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
                        {/* <BrandsSubmitForm /> */}
                        <BugReportForm/>
                    </div>
                </div>
            </section>
        </main>
    );
}
