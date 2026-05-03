"use client";
// app/src/(admin)/dashboard/brands/layout.tsx
import { CategotysProvider } from "@/context/category-context";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CategotysProvider>{children}</CategotysProvider>;
}
