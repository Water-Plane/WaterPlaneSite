/**
 * Migration script: push hardcoded case studies to Supabase and upload
 * local/relative images to Cloudinary.
 *
 * Usage (after filling .env.local):
 *   npx ts-node --project tsconfig.json scripts/migrate-case-studies.ts
 *
 * Requires: SUPABASE_SERVICE_ROLE_KEY (not anon key) for server-side inserts,
 *           plus Cloudinary server-side credentials.
 */

import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import * as path from "path";
import * as fs from "fs";

// ---- env ---------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_KEY = process.env.CLOUDINARY_API_KEY!;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_API_SECRET!;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ---- helpers -----------------------------------------------------------
async function uploadLocalImage(relativePath: string, folder: string): Promise<string> {
  // Try resolving as a file relative to /public
  const absolute = path.join(process.cwd(), "public", relativePath);

  if (fs.existsSync(absolute)) {
    const result = await cloudinary.uploader.upload(absolute, { folder });
    return result.secure_url;
  }

  // Already an absolute URL — return as-is (Unsplash, etc.)
  if (relativePath.startsWith("http")) return relativePath;

  console.warn(`⚠️  Image not found locally, keeping original path: ${relativePath}`);
  return relativePath;
}

// ---- data --------------------------------------------------------------
// Re-import inline to avoid importing Next.js module aliases in Node
const CASE_STUDIES = [
  { slug: "72-ai-labs", title: "72 AI Labs", category: "AI & Strategy", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/72-ai/cover.jpg", galleryImages: ["/images/case-studies/72-ai/footer1.png", "/images/case-studies/72-ai/footer2.jpg"], content: `### 1. The Challenge\n72 AI Labs was doing great automation work, but visually, they were just a name.` },
  { slug: "parikshit-events", title: "Parikshit Events", category: "Brand Experience", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/parikshit/cover.jpg", galleryImages: ["/images/case-studies/parikshit/footer1.png", "/images/case-studies/parikshit/footer2.png"], content: `### 1. The Origin\nWe didn't meet PSE in a boardroom.` },
  { slug: "pukaar", title: "Pukaar", category: "Social Impact", author: "Harshit Tiwari", date: "Dec 15, 2025", heroImage: "/images/case-studies/pukaar/cover.png", galleryImages: ["/images/case-studies/pukaar/footer1.jpg", "/images/case-studies/pukaar/footer2.png"], content: `### 1. The Challenge\nPukaar is a women's safety startup.` },
  { slug: "shakti-center", title: "Shakti Center", category: "Wellness", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/shakti/cover.jpg", galleryImages: ["/images/case-studies/shakti/footer1.jpg", "/images/case-studies/shakti/footer2.jpg"], content: `### 1. The Mission\nShakti Center hosts an annual event.` },
  { slug: "priyanka-studio", title: "Priyanka Studio", category: "Visual Arts", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/priyanka/cover.png", galleryImages: ["/images/case-studies/priyanka/footer1.png"], content: `### 1. The Context\nPriyanka Studio was already a success story.` },
  { slug: "kunal-edits", title: "Kunal Edits", category: "Post-Production", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/kunal/cover.png", galleryImages: ["/images/case-studies/kunal/footer1.png"], content: `### 1. The Context\nKunal is a college friend and easily one of the best video editors.` },
  { slug: "stitch-and-soul", title: "Stitch & Soul", category: "Fashion & Branding", author: "Vansh Dixit", date: "Dec 15, 2025", heroImage: "/images/case-studies/stitch/cover.png", galleryImages: ["/images/case-studies/stitch/footer1.jpg", "/images/case-studies/stitch/footer2.png"], content: `### 1. The Context\nStitch & Soul is a new streetwear and gothic clothing startup.` },
];

// ---- main --------------------------------------------------------------
async function main() {
  console.log("Starting migration…\n");

  for (const cs of CASE_STUDIES) {
    console.log(`Processing: ${cs.title}`);

    const heroUrl = await uploadLocalImage(cs.heroImage, "waterplane/case-studies");
    const galleryUrls = await Promise.all(
      cs.galleryImages.map((img) => uploadLocalImage(img, "waterplane/case-studies/gallery"))
    );

    const { error } = await supabase.from("case_studies").upsert(
      {
        slug: cs.slug,
        title: cs.title,
        category: cs.category,
        author: cs.author,
        date: cs.date,
        hero_image: heroUrl,
        gallery_images: galleryUrls,
        content: cs.content,
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`  ✗ Error for ${cs.slug}:`, error.message);
    } else {
      console.log(`  ✓ Migrated ${cs.slug}`);
    }
  }

  console.log("\nMigration complete.");
}

main().catch(console.error);
