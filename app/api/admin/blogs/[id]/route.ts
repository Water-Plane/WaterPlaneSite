import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/verifyAdmin";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    if (!await verifyAdminToken(req.headers.get("authorization"))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const { data, error } = await supabaseAdmin.from("blog_posts").update(body).eq("id", params.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    if (!await verifyAdminToken(req.headers.get("authorization"))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
}
