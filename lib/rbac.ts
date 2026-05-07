// Authorised admin emails — only these can access /admin
export const ADMIN_EMAILS = [
  "tech.harshit.tiwari@gmail.com",
  "officialvanshdixit@gmail.com",
] as const;

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return (ADMIN_EMAILS as readonly string[]).includes(email);
}
