import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/verifyAdmin";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (!await verifyAdminToken(req.headers.get("authorization"))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const body = await req.json();
        const { data, error } = await supabaseAdmin.from("case_studies").update(body).eq("id", params.id).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        revalidatePath("/");
        revalidatePath("/work");
        if (body.slug) revalidatePath(`/work/${body.slug}`);
        return NextResponse.json(data);
    } catch (e) {
        console.error("[PATCH /api/admin/case-studies]", e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        if (!await verifyAdminToken(req.headers.get("authorization"))) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        const { data: existing } = await supabaseAdmin.from("case_studies").select("slug").eq("id", params.id).single();
        const { error } = await supabaseAdmin.from("case_studies").delete().eq("id", params.id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        revalidatePath("/");
        revalidatePath("/work");
        if (existing?.slug) revalidatePath(`/work/${existing.slug}`);
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("[DELETE /api/admin/case-studies]", e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
