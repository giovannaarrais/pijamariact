import { db } from "@/db"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`)

    return NextResponse.json({
      ok: true
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    )
  }
}