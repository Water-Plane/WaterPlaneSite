import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    await supabase.from("case_studies").select("id", { count: "exact", head: true });
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
