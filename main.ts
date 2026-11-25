// Entry for make.fun bounty "makefun-x-reposts-02" (Node 22, standard library only).
// The entry itself is the X posts: seven quotes of make.fun's own posts on
// x.com/makefunai, all from the one public account @GHSASport, each carrying
// make.fun or @makefunai and the play code makefun-carrot-plank-quail in its
// own words. This program only hands their addresses to the gate: it reads
// POSTS.json from the repository root, checks every address is a well-formed
// X post address, and copies the file byte for byte into the output
// directory, where the house reads it and then reads each post from X.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postsPath = join(botDir, "POSTS.json");
const outputPath = join(outDir, "POSTS.json");
function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function isPostAddress(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = value.match(
    /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/\s]+\/status\/(\d+)$/,
  );
  return match !== null && match[3].length > 0;
}

function readPostList(): { list: string[]; raw: string } {
  let raw: string;
  try {
    raw = readFileSync(postsPath, "utf8");
  } catch (error) {
    fail(`cannot read ${postsPath}: ${(error as Error).message}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!);
  } catch (error) {
    fail(`POSTS.json does not parse as JSON: ${(error as Error).message}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail("POSTS.json must be a JSON object with a posts list");
  }
  const posts = (parsed as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) {
    fail('POSTS.json must hold a "posts" list');
  }
  if (posts.length < 1 || posts.length > 15) {
    fail(`POSTS.json names ${posts.length} posts, the bounty allows 1 to 15`);
  }
  for (const post of posts) {
    if (!isPostAddress(post)) {
      fail(`not an X post address: ${String(post)}`);
    }
  }
  const ids = posts.map((post) => (post as string).split("/status/")[1]);
  if (new Set(ids).size !== ids.length) {
    fail("POSTS.json names the same post twice");
  }
  const handles = posts.map(
    (post) => (post as string).split("/").slice(3, 4)[0].toLowerCase(),
  );
  if (new Set(handles).size !== 1) {
    fail("all posts must come from one X account");
  }
  return { list: posts as string[], raw: raw! };
}
const { list, raw } = readPostList();

mkdirSync(outDir, { recursive: true });
writeFileSync(outputPath, raw, "utf8");
for (const post of list) {
  console.log(`post: ${post}`);
}
console.log(`copied ${list.length} post addresses to ${outputPath}`);

