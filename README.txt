IMAGE PLACEHOLDERS — save your photos in this folder with these exact names
(.jpg is fine; if you use .png, .webp, etc. change the path in content.js).

  like-N-cutout.png  Optional pop-out layer for Likes card N (transparent PNG/WebP, subject only)
  portrait.jpg       About: main polaroid portrait (portrait, about 4:5)
  sticker-sheet.jpg  About: the tall sticker sheet (tall, about 9:16)
  like-1.jpg         Likes card 1 (landscape, about 4:3)
  like-2.jpg         Likes card 2
  like-3.jpg         Likes card 3
  like-4.jpg         Likes card 4
  like-5.jpg         Likes card 5
  like-6.jpg         Likes card 6 (the highlighted one)

In content.js each one is written like:   src: "images/like-1.jpg"
Photos are cropped to fit, so any size works. Keep each under ~1 MB for a fast page.

The site source lives in the repository root. GitHub Pages publishes a copy from docs/,
so after changing site files or media, run `node scripts/sync-pages.mjs` and commit
the updated docs/ files too. Do not edit the docs/ copies directly.
