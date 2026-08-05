import { fetchLiveBundle } from "@/lib/gdelt";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const bundle = await fetchLiveBundle();
    return NextResponse.json(bundle, {
      headers: {
        "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Live fetch failed";
    return NextResponse.json(
      {
        fetched_at: new Date().toISOString(),
        source: "error",
        events: [],
        error: message,
      },
      { status: 200 },
    );
  }
}
