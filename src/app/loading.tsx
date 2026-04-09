// app/loading.tsx  ← Next.js picks this up automatically for the root segment
import { LoadingSkeleton } from "@/components/layout/loading_skeleton";

export default function RootLoading() {
  return <LoadingSkeleton variant="page" label="Default Loading…" />;
}