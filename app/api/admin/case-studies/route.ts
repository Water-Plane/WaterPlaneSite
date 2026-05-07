import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/verifyAdmin";

export async function POST(req: NextRequest) {
    try {
        if (!await verifyAdminToken(req.headers.get("authorization"))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const body = await req.json();
        const { data, error } = await supabaseAdmin.from("case_studies").insert(body).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        revalidatePath("/");
        revalidatePath("/work");
        return NextResponse.json(data);
    } catch (e) {
        console.error("[POST /api/admin/case-studies]", e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
