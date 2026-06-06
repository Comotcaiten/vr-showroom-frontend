"use client";
// app/src/(admin)/dashboard/models/layout.tsx
import { ModelProvider } from "@/context/model-context";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModelProvider>{children}</ModelProvider>;
}
