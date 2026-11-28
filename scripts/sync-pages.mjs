import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = join(root, "docs");
const siteFiles = [
  "index.html",
  "butterfly.svg",
  "butterfly.js",
  "content.js",
  "dark.css",
  "dark.js",
  "script.js",
  "style.css",
  "wisteria.css",
  "wisteria.js",
];

await mkdir(pages, { recursive: true });

for (const file of siteFiles) {
  await cp(join(root, file), join(pages, file), { force: true });
}

for (const directory of ["images", "music"]) {
  await cp(join(root, directory), join(pages, directory), {
    force: true,
    recursive: true,
  });
}

await writeFile(
  join(pages, "README.md"),
  "# GitHub Pages copy\n\n" +
    "This folder is the published copy for GitHub Pages. Edit the site files " +
    "in the repository root, then run `node scripts/sync-pages.mjs` and commit " +
    "the updated `docs/` files. Do not edit the deployed copies here directly.\n",
  "utf8",
);

console.log("Synced the root site into docs/ for GitHub Pages.");
