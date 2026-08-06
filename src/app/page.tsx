import { Suspense } from "react";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] text-[var(--muted)]">
          Loading atlas…
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
