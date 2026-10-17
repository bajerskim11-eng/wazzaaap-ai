import { NextResponse } from "next/server";
import { clinics } from "@/lib/clinics";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      clinics,
      count: clinics.length,
      updatedAt: new Date().toISOString(),
      availability: "not-integrated",
      message: "Terminy są sprawdzane w zewnętrznych systemach rejestracji."
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff"
      }
    }
  );
}
