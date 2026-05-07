# Developer Requirements — WaterPlane Site

Everything a developer needs to run this project locally and understand the full stack.

---

## Stack Overview

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS 3 |
| Auth | Firebase Authentication (Email/Password) |
| Database | Supabase (PostgreSQL) |
| Media | Cloudinary (image upload & delivery) |
| Animations | Framer Motion, custom Canvas (Entropy) |
| Scroll | Lenis smooth scroll |

---

## 1. Prerequisites

- Node.js ≥ 18.17
- npm ≥ 9
- Git

---

## 2. Clone & Install

```bash
git clone <repo-url>
cd WaterPlaneSite
npm install
```

---

## 3. Environment Variables

Create a `.env.local` file at the project root with the following keys.  
**Never commit this file** — it is already in `.gitignore`.

```env
# ── Firebase ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# ── Supabase ─────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Used only by the migration script (server-side, never expose to browser)
SUPABASE_SERVICE_ROLE_KEY=

# ── Cloudinary ───────────────────────────────────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
# Server-side only (used by the Cloudinary delete API route)
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 4. Generating API Keys

### 4.1 Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (or use an existing one).
3. Go to **Project Settings → General → Your apps** → click **Add app** → select **Web**.
4. Register the app; Firebase shows a config object — copy each field into the matching `NEXT_PUBLIC_FIREBASE_*` env var above.
5. Go to **Authentication → Sign-in method** → enable **Email/Password**.
6. Go to **Authentication → Users** → add the two authorised admin accounts manually:
   - `tech.harshit.tiwari@gmail.com`
   - `officialvanshdixit@gmail.com`

> The authorised email list is enforced client-side in `lib/rbac.ts`. Anyone can *attempt* to sign in via Firebase, but only these two emails see the dashboard.

### 4.2 Supabase

1. Go to [supabase.com](https://supabase.com) → create a new project.
2. In the project dashboard: **Settings → API** → copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (migration script only)
3. Go to **SQL Editor** → paste and run the contents of `supabase/schema.sql` to create the tables and RLS policies.

### 4.3 Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) → create a free account.
2. From the **Dashboard**, copy:
   - **Cloud name** → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`
3. Create an **unsigned upload preset**:
   - Go to **Settings → Upload → Upload presets** → click **Add upload preset**.
   - Set **Signing Mode** to **Unsigned**.
   - Name it (e.g. `waterplane_unsigned`) → save.
   - Copy the preset name → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

---

## 5. Database Setup

After filling in the Supabase env vars, apply the schema:

```sql
-- Paste and run in Supabase SQL Editor (supabase/schema.sql)
```

Or use the Supabase CLI:

```bash
supabase db push          # if you have a linked project
```

---

## 6. Migrate Hardcoded Case Studies (one-time)

This script reads the hardcoded case study data, uploads images from `/public` to Cloudinary, and inserts records into Supabase.

```bash
# Requires ts-node
npx ts-node --project tsconfig.json scripts/migrate-case-studies.ts
```

> Ensure all `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` vars are set in `.env.local` before running.

---

## 7. Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About + team roster |
| `/work` | Case studies (public) |
| `/blogs` | Blog listing (Supabase-driven) |
| `/blogs/[slug]` | Individual blog post |
| `/admin` | CMS dashboard (Firebase auth gated) |

---

## 8. Admin Access

Navigate to `/admin`. Sign in with one of the two authorised emails. The dashboard has two tabs:

- **Case Studies** — create, edit, delete. Hero + gallery images upload to Cloudinary; text/metadata stored in Supabase.
- **Blogs** — create, edit, delete. Cover image uploads to Cloudinary. Toggle `published` to make a post live on `/blogs`.

---

## 9. Key Files Reference

| File | Purpose |
|---|---|
| `lib/firebase.ts` | Firebase app + auth initialisation |
| `lib/supabase.ts` | Supabase client |
| `lib/cloudinary.ts` | Client-side upload helper |
| `lib/rbac.ts` | Admin email allowlist |
| `contexts/AuthContext.tsx` | Firebase auth state provider |
| `supabase/schema.sql` | Database schema + RLS |
| `scripts/migrate-case-studies.ts` | One-time data migration |
| `app/admin/` | Protected admin routes |
| `components/admin/` | CMS UI components |
| `components/ui/entropy.tsx` | Particle animation (hero bg) |
| `components/ui/text-scramble.tsx` | Kinetic typography |
| `components/ui/liquid-glass-button.tsx` | Glass-effect CTA button |

---

## 10. Deployment Notes

- Set all env vars in your hosting platform (Vercel recommended).
- `SUPABASE_SERVICE_ROLE_KEY` and `CLOUDINARY_API_SECRET` are server-only — do NOT prefix with `NEXT_PUBLIC_`.
- The Cloudinary delete endpoint (`app/api/cloudinary/delete/route.ts`) is a server-side API route; ensure it is not exposed publicly without auth in production (consider adding a session check).
