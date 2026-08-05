import { getVerifiedEntities } from "@/lib/data";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const entities = getVerifiedEntities();
  return NextResponse.json({
    count: entities.length,
    entities,
  });
}
