/* ===== content.js — FILLED VERSION =====
   Likes cards are Instagram-style posts. Each has a photo (src) cropped into a frame, and a cutout (same picture,
   transparent background) laid exactly on top, centered, so the subject pokes out past the frame edges.
   frame = shape of the photo window ("4/3" wide, "1/1" square, "4/5" or "3/4" tall): taller frame = less pop-out.
   cutout nudges: x / y move it (e.g. "5%", "-3%"), scale resizes it (1 = same size as the photo), rot = degrees.
   Keep the cutout the same crop as the photo so the two line up. 
   Music: each song's src is an audio file (e.g. music/glue-song.mp3) or a direct .mp3 link. Leave src empty for a visual-only song. */
const SITE = {
  "title": "Cassandra Janyll D. Manalese — Lavender Scrapbook",
  "description": "A sweet, soft student with a heart full of dreams. Step into a whimsical lilac scrapbook.",
  "markers": [
    "🎀",
    "✨"
  ],
  "particles": [
    "♬",
    "🌸",
    "♪",
    "✧",
    "♫",
    "🪻"
  ],
  "hero": {
    "badge": "A warm hello from my digital desk ♡",
    "kicker": "~ scrapbook diaries & lavender reveries ~",
    "name1": "Cassandra Janyll",
    "name2": "D. Manalese",
    "tagline": "A curious, IT student with soft aesthetics, and bold ideas.",
    "quote": "“Step into a whimsical sanctuary woven with lilac threads, gentle melodies, and starry wishes...”",
    "button1": "Get to know me ↓ ✨",
    "button2": "Explore My Scrapbook ♡"
  },
  "about": {
    "kicker": "chapter I — whispers of cassandra",
    "title": "A Page About Me.",
    "portrait": {
      "src": "images/portrait.jpg",
      "alt": "Cassandra portrait photo with gentle violet lighting and sweet expression",
      "tape": "pure bliss ✦",
      "caption": "Cassandra ♡ sweet moments",
      "sub": "archived daydream · no. 029"
    },
    "stickerSheet": {
      "src": "images/sticker-sheet.jpg",
      "alt": "Cassandra's lilac sticker sheet collection",
      "tag": "stickers ♡",
      "label": "A sticker of me ",
      "sub": "scrapbook deco ✦"
    },
    "notes": [
      {
        "icon": "❀",
        "label": "Personal Diary",
        "text": "Hello! I'm Cassandra Janyll D. Manalese, a student who enjoys discovering new things, expressing creativity, and appreciating the little moments that make life beautiful. This little corner of the internet is where I share the things I love, the experiences I've gathered, and a little piece of who I am.",
        "quote": "Living life in pastel hues, gentle kindness, and curious wonder."
      },
      {
        "icon": "🎀",
        "label": "Passions",
        "text": "Aesthetics, Music, Soft Days & Lilac Horizons",
        "quote": ""
      },
      {
        "icon": "🌸",
        "label": "Current Status",
        "text": "Dreaming & Learning ♡ with starry optimism",
        "quote": ""
      }
    ]
  },
  "likes": {
    "kicker": "a scrapbook of simple delights",
    "title": "Things That Make Me Happy",
    "sub": "A tiny treasury of sensory pleasures, soundtrack favorites, court games, and comforting souls.",
    "items": [
      {
        "src": "images/like-1.jpg",
        "alt": "Delicious cookies and cream ice cream in aesthetic bowl",
        "tag": "treat 🍨",
        "title": "Sweet Delicacies",
        "text": "Sweet treats & cookies-and-cream cravings 🍨",
        "extraLabel": "",
        "extra": "",
        "sticker": {
          "emoji": "🍨",
          "text": "",
          "rot": 12
        },
        "cutout": {
          "src": "images/like-1-cutout.png",
          "alt": "Sweet Delicacies cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "1,204",
        "comments": 24,
        "frame": "4/3"
      },
      {
        "src": "images/like-2.jpg",
        "alt": "Sweet brown sugar pearl milk tea in cozy aesthetic cafe",
        "tag": "cozy 🧋",
        "title": "Boba Comfort",
        "text": "Brown sugar boba & cozy café afternoons 🧋",
        "extraLabel": "",
        "extra": "",
        "sticker": {
          "emoji": "",
          "text": "🌸 boba bliss",
          "rot": -10
        },
        "cutout": {
          "src": "images/like-2-cutout.png",
          "alt": "Boba Comfort cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "987",
        "comments": 18,
        "frame": "3/4"
      },
      {
        "src": "images/like-3.jpg",
        "alt": "Aesthetic Beabadoobee inspired indie bedroom pop cassette and guitar",
        "tag": "melodies 🎸",
        "title": "Beabadoobee",
        "text": "Dreamy bedroom pop, acoustic guitars & 90s vintage haze 🎸",
        "extraLabel": "",
        "extra": "",
        "sticker": {
          "emoji": "🦋",
          "text": "",
          "rot": 15
        },
        "cutout": {
          "src": "images/like-3-cutout.png",
          "alt": "Beabadoobee cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "2,310",
        "comments": 41,
        "frame": "1/1"
      },
      {
        "src": "images/like-4.png",
        "alt": "Aesthetic purple badminton racket with pastel lavender shuttlecock",
        "tag": "energy 🏸",
        "title": "Badminton Days",
        "text": "Fun court rallies, fast smashes & purple shuttlecocks 🏸",
        "extraLabel": "",
        "extra": "",
        "sticker": {
          "emoji": "",
          "text": "🏸 smash!",
          "rot": -12
        },
        "cutout": {
          "src": "images/like-4-cutout.png",
          "alt": "Badminton Days cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "845",
        "comments": 12,
        "frame": "1/1"
      },
      {
        "src": "images/like-5.jpg",
        "alt": "Iconic comedy movie White Chicks aesthetic montage illustration",
        "tag": "comfort movie 🎬",
        "title": "White Chicks",
        "text": "Endless laughs, iconic dance-offs & lipgloss comedy gold 🎬",
        "extraLabel": "",
        "extra": "",
        "sticker": {
          "emoji": "🎀",
          "text": "",
          "rot": 12
        },
        "cutout": {
          "src": "images/like-5-cutout.png",
          "alt": "White Chicks cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "1,562",
        "comments": 33,
        "frame": "1/1"
      },
      {
        "src": "images/like-6.jpg",
        "alt": "BTS group photo surrounded by purple warmth and memories",
        "tag": "Borahae 💜 Apobangpo",
        "title": "BTS — Bangtan",
        "text": "BTS — My Eternal Comfort & Universe 💜 Apobangpo",
        "extraLabel": "✨ Eternal Constellation ✨",
        "extra": "Through every melody and lyric, finding warmth, courage, and unconditional light.",
        "sticker": {
          "emoji": "",
          "text": "💜 borahae ✨",
          "rot": -10
        },
        "cutout": {
          "src": "images/like-6-cutout.png",
          "alt": "BTS — Bangtan cutout",
          "x": "0%",
          "y": "0%",
          "scale": 1,
          "rot": 0
        },
        "likes": "7,777",
        "comments": 99,
        "frame": "4/3"
      }
    ],
    "username": "cassandra"
  },
  "learned": {
    "kicker": "curiosity turned into creation",
    "title": "Things I've Learned",
    "sub": "Exploring my creative passions without pretending to be a master—just a student loving every step of the journey.",
    "items": [
      {
        "title": "Coding",
        "text": "Learning web fundamentals, crafting pastel terminal themes, structuring pages with HTML/CSS, and turning simple text into interactive magic.",
        "tags": "{ html, css, logic }",
        "pill": "",
        "preview": [
          "<dream>",
          "const passion = \"lilac\";",
          "buildAestheticWorld();",
          "</dream>"
        ],
        "sticker": {
          "emoji": "",
          "text": "</> deco",
          "rot": 8
        }
      },
      {
        "title": "Layout Designing",
        "text": "Pairing romantic serifs with calm sans typographies, curating dreamy moodboards, and balancing asymmetric scrapbook collages.",
        "tags": "{ typography, grids, margins }",
        "pill": "",
        "preview": [
          "Grid Balance · 12 Cols",
          "#9B   #6D   #E8   #FF"
        ],
        "sticker": {
          "emoji": "🎀",
          "text": "",
          "rot": -12
        }
      },
      {
        "title": "Photo Editing",
        "text": "Fine-tuning exposure curves, softening shadows with lavender hues, and layering vintage film textures over daily snapshots.",
        "tags": "{ tone curves, haze, grain }",
        "pill": "",
        "preview": [
          "Violet Tint  +34",
          "Pastel Grain  +18",
          "preset: lavender_softness.xmp"
        ],
        "sticker": {
          "emoji": "",
          "text": "🎞️ tone",
          "rot": 10
        }
      },
      {
        "title": "Photography",
        "text": "Capturing gentle, fleeting glimpses of everyday life: sunbeams filtering through leaves, laughing friends, cozy drinks, and soft purple sunsets.",
        "tags": "{ 35mm viewfinders, candids }",
        "pill": "Special Passion",
        "preview": [
          "ISO 200 · f/1.8",
          "🎞️ 01   🎞️ 02   🎞️ 03",
          "golden hour aperture · sweet captures"
        ],
        "sticker": {
          "emoji": "",
          "text": "📸 sweet captures ♡",
          "rot": -6
        }
      }
    ]
  },
  "connect": {
    "emoji": "💌",
    "title": "Let's Stay Connected ♡",
    "message": "Thank you for visiting my little world! I'd love to connect with you. Feel free to find me on my socials.",
    "socials": [
      {
        "name": "Facebook",
        "handle": "@cassandra",
        "icon": "f",
        "href": "https://www.facebook.com/share/19oCrenF8o/"
      },
      {
        "name": "Gmail",
        "handle": "janyllmin",
        "icon": "✉",
        "href": "mailto:janyllmin@gmail.com"
      },
      {
        "name": "TikTok",
        "handle": "@_meeowie",
        "icon": "♪",
        "href": "https://www.tiktok.com/@_meeowie"
      },
      {
        "name": "Instagram",
        "handle": "@ninieminn",
        "icon": "📷",
        "href": "https://www.instagram.com/ninieminn?cnvx=ajMwMDJ3eHVkMHh0"
      }
    ],
    "signoff": "✦ 🎀 ✦",
    "made": "Made with love, lavender, and a little sparkle. ♡",
    "rights": "Cassandra Janyll D. Manalese • All Rights Reserved"
  },
  "player": {
    "name": "🎧 Cassandra's Playlist",
    "songs": [
      {
        "title": "Glue Song",
        "artist": "Beabadoobee",
        "duration": "2:15",
        "note": "cozy, tender bedroom pop ♡",
        "src": "music/glue-song.mp3"
      },
      {
        "title": "Mikrokosmos (소우주)",
        "artist": "BTS",
        "duration": "3:44",
        "note": "starry, comforting universe song 💜",
        "src": "music/mikrokosmos.mp3"
      },
      {
        "title": "the perfect pair",
        "artist": "Beabadoobee",
        "duration": "2:57",
        "note": "sweet, dreamy love song ♡",
        "src": "music/the-perfect-pair.mp3"
      },
      {
        "title": "Spring Day (봄날)",
        "artist": "BTS",
        "duration": "4:34",
        "note": "gentle, hopeful winter-to-spring ballad 🌸",
        "src": "music/spring-day.mp3"
      }
    ]
  }
};
