import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/verifyAdmin";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    if (!await verifyAdminToken(req.headers.get("authorization"))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const { data, error } = await supabaseAdmin.from("blog_posts").update(body).eq("id", params.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/blogs");
    if (body.slug) revalidatePath(`/blogs/${body.slug}`);
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    if (!await verifyAdminToken(req.headers.get("authorization"))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { data: existing } = await supabaseAdmin.from("blog_posts").select("slug").eq("id", params.id).single();
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/blogs");
    if (existing?.slug) revalidatePath(`/blogs/${existing.slug}`);
    return NextResponse.json({ ok: true });
}
