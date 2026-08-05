import { getVerifiedEntities } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "heartland-tracker",
    verified_count: getVerifiedEntities().length,
    time: new Date().toISOString(),
  });
}
