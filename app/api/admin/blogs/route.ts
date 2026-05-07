import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdminToken } from "@/lib/verifyAdmin";

export async function POST(req: NextRequest) {
    if (!await verifyAdminToken(req.headers.get("authorization"))) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await req.json();
    const { data, error } = await supabaseAdmin.from("blog_posts").insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/blogs");
    return NextResponse.json(data);
}
