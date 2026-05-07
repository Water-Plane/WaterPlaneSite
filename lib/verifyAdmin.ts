import { isAdmin } from "./rbac";

export async function verifyAdminToken(authHeader: string | null): Promise<boolean> {
    if (!authHeader?.startsWith("Bearer ")) return false;
    const token = authHeader.replace("Bearer ", "");
    try {
        const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: token }),
            }
        );
        const data = await res.json();
        const email: string | undefined = data.users?.[0]?.email;
        return isAdmin(email);
    } catch {
        return false;
    }
}
