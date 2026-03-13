#!/usr/bin/env node
/**
 * migrate-images.mjs
 *
 * Downloads all blog post images and author avatars from the Webflow CDN
 * and uploads them to a Supabase Storage public bucket called "blog-images".
 * Then updates the DB records to point to the new Supabase URLs.
 *
 * Usage:
 *   node scripts/migrate-images.mjs <SUPABASE_SERVICE_ROLE_KEY>
 *
 * The script is idempotent — if an image already exists in the bucket it
 * skips the download/upload and just updates the DB URL.
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
import { tmpdir } from "os";

const SUPABASE_URL = "https://iguhaoprruznhweejeok.supabase.co";
const BUCKET_NAME = "blog-images";

const serviceRoleKey = process.argv[2];
if (!serviceRoleKey) {
  console.error("Usage: node scripts/migrate-images.mjs <SUPABASE_SERVICE_ROLE_KEY>");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, serviceRoleKey, {
  auth: { persistSession: false },
});

// ─── Helpers ────────────────────────────────────────────────────────────────

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET_NAME);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024, // 10MB
    });
    if (error) throw new Error(`Failed to create bucket: ${error.message}`);
    console.log(`✓ Created bucket "${BUCKET_NAME}"`);
  } else {
    console.log(`✓ Bucket "${BUCKET_NAME}" already exists`);
  }
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";
  return { buffer, contentType };
}

function slugFromUrl(url) {
  // Take the last path segment as the filename, strip query strings
  const path = new URL(url).pathname;
  const segments = path.split("/").filter(Boolean);
  return segments[segments.length - 1] || "image";
}

async function uploadToSupabase(buffer, contentType, storagePath) {
  // Check if already exists
  const { data: existing } = await supabase.storage
    .from(BUCKET_NAME)
    .list(storagePath.split("/").slice(0, -1).join("/") || "", {
      search: storagePath.split("/").pop(),
    });

  if (existing?.length) {
    const publicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath).data.publicUrl;
    return { publicUrl, skipped: true };
  }

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType,
      upsert: false,
    });

  if (error && !error.message.includes("already exists")) {
    throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
  }

  const publicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath).data.publicUrl;
  return { publicUrl, skipped: false };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function migrateBlogPostImages() {
  console.log("\n📸 Migrating blog post images…");

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, slug, main_image")
    .eq("archived", false)
    .not("main_image", "is", null);

  if (error) throw error;
  console.log(`   Found ${posts.length} posts with images`);

  let migrated = 0, skipped = 0, failed = 0;

  for (const post of posts) {
    const url = post.main_image;
    if (!url || url.includes("iguhaoprruznhweejeok.supabase.co")) {
      // Already migrated
      skipped++;
      continue;
    }

    try {
      const filename = slugFromUrl(url);
      const storagePath = `posts/${post.slug}/${filename}`;

      process.stdout.write(`   [${post.slug}] downloading… `);
      const { buffer, contentType } = await downloadImage(url);

      process.stdout.write(`uploading… `);
      const { publicUrl, skipped: wasSkipped } = await uploadToSupabase(buffer, contentType, storagePath);

      if (!wasSkipped) {
        // Update DB record
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({ main_image: publicUrl })
          .eq("id", post.id);

        if (updateError) throw updateError;
        migrated++;
        console.log(`✓`);
      } else {
        // File already in bucket, still update DB if needed
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({ main_image: publicUrl })
          .eq("id", post.id);
        if (updateError) throw updateError;
        skipped++;
        console.log(`(already in bucket) ✓`);
      }
    } catch (err) {
      failed++;
      console.log(`✗ ${err.message}`);
    }
  }

  console.log(`   Done: ${migrated} migrated, ${skipped} skipped, ${failed} failed`);
}

async function migrateAuthorAvatars() {
  console.log("\n👤 Migrating author avatars…");

  const { data: authors, error } = await supabase
    .from("blog_authors")
    .select("id, slug, name, profile_picture")
    .eq("archived", false)
    .not("profile_picture", "is", null);

  if (error) throw error;
  console.log(`   Found ${authors.length} authors with avatars`);

  let migrated = 0, skipped = 0, failed = 0;

  for (const author of authors) {
    const url = author.profile_picture;
    if (!url || url.includes("iguhaoprruznhweejeok.supabase.co")) {
      skipped++;
      continue;
    }

    try {
      const filename = slugFromUrl(url);
      const storagePath = `authors/${author.slug}/${filename}`;

      process.stdout.write(`   [${author.name}] downloading… `);
      const { buffer, contentType } = await downloadImage(url);

      process.stdout.write(`uploading… `);
      const { publicUrl, skipped: wasSkipped } = await uploadToSupabase(buffer, contentType, storagePath);

      const { error: updateError } = await supabase
        .from("blog_authors")
        .update({ profile_picture: publicUrl })
        .eq("id", author.id);

      if (updateError) throw updateError;

      migrated += wasSkipped ? 0 : 1;
      skipped += wasSkipped ? 1 : 0;
      console.log(wasSkipped ? `(already in bucket) ✓` : `✓`);
    } catch (err) {
      failed++;
      console.log(`✗ ${err.message}`);
    }
  }

  console.log(`   Done: ${migrated} migrated, ${skipped} skipped, ${failed} failed`);
}

async function main() {
  console.log("🚀 Dumbo Health — Image Migration to Supabase Storage");
  console.log(`   Project: iguhaoprruznhweejeok`);
  console.log(`   Bucket: ${BUCKET_NAME}`);

  try {
    await ensureBucket();
    await migrateBlogPostImages();
    await migrateAuthorAvatars();
    console.log("\n✅ Migration complete!");
  } catch (err) {
    console.error("\n❌ Migration failed:", err.message);
    process.exit(1);
  }
}

main();
