"use client";
// app/src/(admin)/dashboard/brands/layout.tsx
import { BrandsProvider } from "@/context/brand-context";

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrandsProvider>{children}</BrandsProvider>;
}
