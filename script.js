/* ===== Lavender Scrapbook — script.js =====
   Builds the page from SITE (content.js), then wires up the interactions. */
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);

/* ---------- helpers (empty values render nothing) ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const t = (tag, cls, v, style = "") => (v ? `<${tag} class="${cls}"${style ? ` style="${style}"` : ""}>${esc(v)}</${tag}>` : "");
// Image: if the file is missing, a striped placeholder showing the expected path appears instead.
const img = (im, extra = "") => im && im.src
  ? `<img src="${esc(im.src)}" alt="${esc(im.alt)}" ${extra} onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:this.getAttribute('src')}))">` : "";
const stickerHTML = (s, pos, label) => {
  if (!s || (!s.emoji && !s.text)) return "";
  const inner = s.emoji ? `<span class="big">${esc(s.emoji)}</span>` : `<span class="txt">${esc(s.text)}</span>`;
  return `<div class="sticker ${pos}" style="--rot:${+s.rot || 0}deg" role="img" aria-label="${esc(label)}"><div>${inner}</div></div>`;
};
const heading = (k, title, sub) => `<div class="title">${t("p", "k serif", k)}${t("h2", "display", title)}${t("p", "sub", sub)}<div class="lace"></div></div>`;
const zigItem = (i, card, sticker = "") => {
  const side = i % 2 ? "right" : "left", mk = SITE.markers[i % 2] || "";
  return `<div class="zig-item ${side}"><span class="marker twinkle">${esc(mk)}</span><div class="slot" style="--d:${((i % 3) * 0.12).toFixed(2)}s">${card}</div>${sticker}</div>`;
};
const tape = (v = "") => `<span class="tape washi">${esc(v)}</span>`;

/* ---------- build each section ---------- */
function buildHero(h) {
  $("top").innerHTML = `
    <div class="orb" style="left:-6rem;top:2.5rem;width:20rem;height:20rem;background:var(--lavender)"></div>
    <div class="orb" style="right:-5rem;bottom:2.5rem;width:24rem;height:24rem;background:var(--blush)"></div>
    <div class="orb" style="left:33%;top:25%;width:16rem;height:16rem;background:rgba(177,149,253,.3)"></div>
    <span class="spark twinkle" style="left:12%;top:18%;font-size:1.5rem">✦</span>
    <span class="spark twinkle" style="right:14%;top:30%;font-size:1.25rem">✧</span>
    ${h.badge ? `<div class="badge serif"><b>✦</b> ${esc(h.badge)} <b>✦</b></div>` : ""}
    ${t("p", "kicker serif", h.kicker)}
    ${h.name1 || h.name2 ? `<h1 class="display">${esc(h.name1)}<br><em>${esc(h.name2)}</em></h1>` : ""}
    ${t("p", "tagline", h.tagline)}${t("p", "quote serif", h.quote)}
    <div class="cta">${h.button1 ? `<a class="btn main" href="#about">${esc(h.button1)}</a>` : ""}${h.button2 ? `<a class="btn soft" href="#likes">${esc(h.button2)}</a>` : ""}</div>
    <div class="lace"></div>`;
}

function buildAbout(a) {
  const p = a.portrait, s = a.stickerSheet;
  const notes = a.notes.map((n, i) => zigItem(i,
    `<div class="paper" style="--r:${i % 2 ? 2 : -2}deg">${tape()}${t("p", "label", [n.icon, n.label].filter(Boolean).join(" "))}${t("p", "note serif", n.text)}${n.quote ? `<p class="qline serif">✧ ${esc(n.quote)}</p>` : ""}</div>`)).join("");
  $("about").innerHTML = `${heading(a.kicker, a.title)}
    <div class="intro">
      <div class="paper tight polaroid" style="--r:-3deg">${tape(p.tape)}${img(p)}${t("p", "cl display", p.caption)}${t("p", "cap", p.sub)}</div>
      <div class="stash-slot"><div class="sticker stash-st" style="--rot:3.5deg" role="img" aria-label="${esc(s.label)}"><div class="stash">
        ${t("p", "cap", s.tag)}${img(s, 'draggable="false"')}${t("p", "t display", s.label)}${t("p", "s", s.sub)}</div></div></div>
    </div>
    <div class="zig">${notes}</div>`;
}

function buildLikes(l) {
  const items = l.items.map((it, i) => {
    const left = i % 2 === 0, c = it.cutout;
    const cut = c && c.src ? `<img class="cutout" src="${esc(c.src)}" alt="${esc(c.alt)}" draggable="false" style="width:${100 * (+c.scale || 1)}%;--tx:${esc(c.x || "0%")};--ty:${esc(c.y || "0%")};--cr:${+c.rot || 0}deg" onerror="this.remove()">` : "";
    const n = parseInt(String(it.likes ?? "0").replace(/\D/g, ""), 10) || 0;
    const card = `<div class="paper tight post" style="--r:${left ? -2.5 : 2.5}deg">${tape()}
      <div class="post-head"><span class="avatar">${esc((l.username || "?")[0])}</span><b>${esc(l.username)}</b><span class="dots" aria-hidden="true">•••</span></div>
      <div class="photo" style="--ar:${esc(it.frame || "4/3")}"><div class="shadow" style="--url:url('${esc(it.src)}')"></div>${img(it, 'loading="lazy"')}${it.tag ? `<span>${esc(it.tag)}</span>` : ""}${cut}</div>
      <div class="acts"><button class="heart" aria-pressed="false" aria-label="Like" data-n="${n}">♡</button><span aria-hidden="true">💬</span><span aria-hidden="true">➤</span><span class="mark" aria-hidden="true">🔖</span></div>
      ${it.likes ? `<p class="likes-n"><b>${esc(it.likes)}</b> likes</p>` : ""}
      ${it.extraLabel ? `<p class="cap c" style="margin-top:.75rem;color:var(--primary)">${esc(it.extraLabel)}</p>` : ""}
      ${t("h3", "display c", it.title)}${t("p", "b serif c", it.text)}${t("p", "c muted", it.extra, "margin-top:.5rem;font-size:.875rem")}
      ${it.comments ? `<p class="allc">Show all comments (${esc(it.comments)})</p>` : ""}</div>`;
    return zigItem(i, card, stickerHTML(it.sticker, left ? "r-top" : "l-top", it.title + " sticker"));
  }).join("");
  $("likes").innerHTML = `${heading(l.kicker, l.title, l.sub)}<div class="zig">${items}</div>`;
  $("likes").querySelectorAll(".heart").forEach((h) => h.addEventListener("click", () => {
    const on = h.getAttribute("aria-pressed") !== "true", n = +h.dataset.n + (on ? 1 : 0);
    h.setAttribute("aria-pressed", on); h.textContent = on ? "♥" : "♡";
    const c = h.closest(".post").querySelector(".likes-n b"); if (c) c.textContent = n.toLocaleString("en-US");
  }));
}

function buildLearned(l) {
  const items = l.items.map((it, i) => {
    const left = i % 2 === 0;
    const vis = it.preview && it.preview.length ? `<div class="vis">${it.preview.map((x) => `<code>${esc(x)}</code>`).join("")}</div>` : "";
    const card = `<div class="paper skill" style="--r:${left ? -2 : 2}deg">${tape()}${vis}${it.pill ? `<span class="pill">${esc(it.pill)}</span>` : ""}
      ${it.title ? `<h3 class="display" style="margin-top:1rem">${esc(it.title)} <span style="color:var(--lilac)">${it.pill ? "✨" : "✦"}</span></h3>` : ""}
      ${t("p", "b", it.text)}${t("p", "tags", it.tags)}</div>`;
    return zigItem(i, card, stickerHTML(it.sticker, left ? "r-bot" : "l-bot", it.title + " sticker"));
  }).join("");
  $("experiences").innerHTML = `${heading(l.kicker, l.title, l.sub)}<div class="zig">${items}</div>`;
}

function buildConnect(c) {
  const soc = c.socials.filter((s) => s.name).map((s) => `<a class="social" href="${esc(s.href)}"${/^https?:/.test(s.href) ? ' target="_blank"' : ""} rel="noopener noreferrer">
    <span class="ic">${esc(s.icon)}</span><span><b>${esc(s.name)}</b><small>${esc(s.handle)}</small></span></a>`).join("");
  $("connect").innerHTML = `<div class="lace"></div>${c.emoji ? `<span style="font-size:2.25rem">${esc(c.emoji)}</span>` : ""}
    ${t("h2", "display", c.title)}${t("p", "msg", c.message)}<div class="socials">${soc}</div>
    ${c.signoff ? `<p class="signoff">${esc(c.signoff)}</p>` : ""}${t("p", "made serif", c.made)}${t("p", "rights", c.rights)}`;
}

/* ---------- 3D tilt on Likes photos (mouse only) ---------- */
function initTilt() {
  if (reduced) return;
  const MAX = 20, lerp = (a, b, k) => a + (b - a) * k;
  const remap = (v, half, max) => Math.max(-max, Math.min(max, (v / half) * max));
  document.querySelectorAll("#likes .post").forEach((card) => {
    const ph = card.querySelector(".photo"); if (!ph) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const step = () => {
      cx = lerp(cx, tx, 0.12); cy = lerp(cy, ty, 0.12);
      ph.style.setProperty("--rotateY", cx.toFixed(2) + "deg"); ph.style.setProperty("--rotateX", cy.toFixed(2) + "deg");
      raf = Math.abs(cx - tx) + Math.abs(cy - ty) > 0.02 ? requestAnimationFrame(step) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(step); };
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = ph.getBoundingClientRect();
      tx = remap(e.clientX - (r.left + r.right) / 2, r.width / 2, MAX);
      ty = -remap(e.clientY - (r.top + r.bottom) / 2, r.height / 2, MAX); go();
    });
    card.addEventListener("pointerleave", () => { tx = 0; ty = 0; go(); });
  });
}

/* ---------- 1. Scroll reveal (once per item) ---------- */
function initScrollReveal() {
  const slots = document.querySelectorAll(".slot");
  if (reduced || !("IntersectionObserver" in window)) { slots.forEach((s) => s.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  slots.forEach((s) => io.observe(s));
}

/* ---------- 2. Draggable stickers (mouse + touch) ---------- */
function initStickers() {
  document.querySelectorAll(".sticker").forEach((st) => {
    let x = 0, y = 0, sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;
    const inner = st.firstElementChild;
    const paint = (scale) => { st.style.setProperty("--x", x + "px"); st.style.setProperty("--y", y + "px"); st.style.setProperty("--s", scale); };
    st.addEventListener("pointerdown", (e) => { st.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; ox = x; oy = y; dragging = true; st.classList.add("drag"); paint(1.15); });
    st.addEventListener("pointermove", (e) => { if (!dragging) return; x = ox + e.clientX - sx; y = oy + e.clientY - sy; paint(1.15); });
    const drop = () => { if (!dragging) return; dragging = false; st.classList.remove("drag"); paint(1); inner.classList.remove("wiggle"); void inner.offsetWidth; inner.classList.add("wiggle"); };
    st.addEventListener("pointerup", drop); st.addEventListener("pointercancel", drop);
  });
}

/* ---------- 3. Floating petals & notes ---------- */
let petalsOn = true;
function buildParticles() {
  const box = $("particles"); box.innerHTML = "";
  if (!petalsOn) return;
  for (let k = 0; k < 16; k++) {
    const p = document.createElement("span");
    p.className = "particle"; p.textContent = SITE.particles[k % SITE.particles.length];
    p.style.left = Math.random() * 100 + "%"; p.style.fontSize = 14 + Math.random() * 14 + "px";
    p.style.animationDuration = 14 + Math.random() * 14 + "s"; p.style.animationDelay = Math.random() * -25 + "s";
    box.appendChild(p);
  }
}

/* ---------- 4. Music player (visual only, no audio) ---------- */
function initPlayer(pl) {
  const songs = pl.songs.filter((s) => s.title);
  $("player").hidden = songs.length === 0;
  if (!songs.length) return;
  let i = 0, pinned = false, loaded = -1;
  let playing = !songs.some((s) => s.src); // with audio files it starts paused (browsers block autoplay)
  const audio = new Audio();
  const ui = () => { $("pp").textContent = playing ? "❚❚" : "▶"; $("vinyl").classList.toggle("paused", !playing); };
  const sync = () => {
    const s = songs[i]; if (!s.src) { audio.pause(); return; }
    if (loaded !== i) { audio.src = s.src; loaded = i; }
    if (playing) audio.play().catch(() => { playing = false; ui(); }); else audio.pause();
  };
  audio.onended = () => { i = (i + 1) % songs.length; show(); };
  const bubble = $("mood"), list = $("playlist");
  $("pl-name").textContent = pl.name; $("pl-count").textContent = songs.length + " Songs";
  const show = () => {
    const s = songs[i];
    $("song-t").textContent = s.title; $("song-a").textContent = s.artist;
    $("mood-t").textContent = `♪ ${s.title}${s.artist ? " — " + s.artist : ""} ♪`; $("mood-q").textContent = s.note;
    list.querySelectorAll(".track").forEach((el, k) => el.classList.toggle("on", k === i));
    ui(); sync();
  };
  songs.forEach((s, k) => {
    const b = document.createElement("button"); b.className = "track";
    b.innerHTML = `<div class="r"><span><b>${esc(s.title)}</b> <small>${esc(s.artist)}</small></span><small>${esc(s.duration)}</small></div>`;
    b.onclick = () => { i = k; if (songs[k].src) playing = true; show(); }; $("tracks").appendChild(b);
  });
  $("pp").onclick = () => { playing = !playing; ui(); sync(); };
  $("nx").onclick = () => { i = (i + 1) % songs.length; show(); };
  $("song").onmouseenter = () => { bubble.hidden = false; };
  $("song").onmouseleave = () => { if (!pinned) bubble.hidden = true; };
  $("lyr").onclick = () => { pinned = !pinned; bubble.hidden = !pinned; };
  $("ls").onclick = () => { list.hidden = !list.hidden; };
  $("pet").onclick = () => { petalsOn = !petalsOn; buildParticles(); $("pet").textContent = "🌸 Petals: " + (petalsOn ? "On" : "Off"); };
  show();
}

/* ---------- 5. Back to top ---------- */
function initBackToTop() {
  const b = $("top-btn");
  addEventListener("scroll", () => b.classList.toggle("show", scrollY > 600), { passive: true });
  b.onclick = () => scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  document.title = SITE.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = SITE.description;
  else {
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = SITE.description;
    document.head.appendChild(meta);
  }
  buildHero(SITE.hero); buildAbout(SITE.about); buildLikes(SITE.likes); buildLearned(SITE.learned); buildConnect(SITE.connect);
  initScrollReveal(); initTilt(); initStickers(); buildParticles(); initPlayer(SITE.player); initBackToTop();
});