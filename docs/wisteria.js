/* ===== wisteria.js — four wisteria corners bloom in around #connect as you scroll =====
   Needs GSAP + ScrollTrigger (loaded in index.html). Images go in the images/ folder. */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") { console.warn("[wisteria] GSAP / ScrollTrigger did not load (check your internet connection)."); return; }
  const section = document.getElementById("connect");
  if (!section) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Top vines (tl, tr) swing in around their top corner from off-screen: tl from the left, tr from the right.
     Scrolling back up plays this in reverse, so they swing back out to their own side.
     Each piece has its own start, length, easing, entry offsets and sway.
     xPct / yPct = where it starts relative to its final spot (negative = left / up). */
  const PIECES = [
    { id: "tl", src: "images/wisteria-top-left.png",     origin: "0% 0%",     start: 0,    dur: 0.95, ease: "power3.out", xPct: 0,   yPct: 0,   rot: 100, scale: 0.92, clip: null,  sway: { deg: 1.6, period: 6.2, phase: 0.0 } },
    { id: "tr", src: "images/wisteria-top-right.png",    origin: "100% 0%",   start: 0.08, dur: 0.92, ease: "power3.out", xPct: 0,   yPct: 0,   rot: -100, scale: 0.92, clip: null,  sway: { deg: 1.3, period: 7.4, phase: 1.7 } },
    { id: "bl", src: "images/wisteria-bottom-left.png",  origin: "0% 100%",   start: 0.05, dur: 0.95, ease: "power3.out", xPct: -8,  yPct: 16,  rot: 4,  scale: 0.78, clip: "inset(100% 12% 0% 0%)",  sway: { deg: 0.8, period: 8.0, phase: 3.1 } },
    { id: "br", src: "images/wisteria-bottom-right.png", origin: "100% 100%", start: 0.18, dur: 0.82, ease: "power2.out", xPct: 10,  yPct: 12,  rot: -5, scale: 0.82, clip: "inset(100% 0% 0% 14%)",  sway: { deg: 0.9, period: 6.8, phase: 4.4 } },
  ];

  /* ---------- build the four separate elements ---------- */
  const frame = document.createElement("div");
  frame.className = "wist-frame";
  frame.setAttribute("aria-hidden", "true");
  frame.innerHTML = PIECES.map((p) =>
    `<div class="wist wist-${p.id}"><img src="${p.src}" alt="" draggable="false"></div>`).join("");
  section.prepend(frame);
  const wraps = PIECES.map((p) => frame.querySelector(".wist-" + p.id));
  const imgs = wraps.map((w) => w.firstElementChild);
  // If images/<name> is missing, try the same name next to index.html; if both fail, say so in the console.
  imgs.forEach((im, i) => {
    const file = PIECES[i].src.split("/").pop();
    im.addEventListener("error", () => {
      if (!im.dataset.retry) { im.dataset.retry = "1"; im.src = file; }
      else { console.warn("[wisteria] could not find " + file + " (looked in images/ and next to index.html)"); 
        const ph = document.createElement("div");
        ph.className = "ph";
        ph.textContent = "missing: " + PIECES[i].src;
        im.replaceWith(ph);
      }
    });
  });

  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    /* ---------- scroll-linked entrance ---------- */
    const END = "inset(0% 0% 0% 0%)";
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section, start: "top 78%", end: "bottom bottom", scrub: 1.2,
        onUpdate: (self) => setSway(self.progress > 0.98),
      },
    });
    PIECES.forEach((p, i) => {
      gsap.set(imgs[i], { transformOrigin: p.origin });
      gsap.set(wraps[i], { transformOrigin: p.origin });
      const from = { xPercent: p.xPct, yPercent: p.yPct, rotation: p.rot, scale: p.scale };
      const to = { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, duration: p.dur, ease: p.ease };
      if (p.clip) { from.clipPath = p.clip; to.clipPath = END; }
      tl.fromTo(wraps[i], from, to, p.start);
      // top vines swing in from the side (and back out the same way when you scroll up)
      tl.fromTo(wraps[i], { opacity: 0 }, { opacity: 1, duration: p.dur * (p.clip ? 0.45 : 0.3), ease: "power1.out" }, p.start);
    });

    /* ---------- slow wind sway (only after the bloom is complete) ---------- */
    const amt = { v: 0 };
    let on = false, visible = false, resting = true;
    const setters = imgs.map((im) => gsap.quickSetter(im, "rotation", "deg"));
    function setSway(next) {
      if (next === on) return;
      on = next;
      gsap.to(amt, { v: on ? 1 : 0, duration: 2.5, ease: "sine.inOut", overwrite: true });
    }
    const tick = (time) => {
      if (!visible) return;
      if (amt.v < 0.001) { if (!resting) { setters.forEach((s) => s(0)); resting = true; } return; }
      resting = false;
      PIECES.forEach((p, i) => setters[i](Math.sin((time * 2 * Math.PI) / p.sway.period + p.sway.phase) * p.sway.deg * amt.v));
    };
    gsap.ticker.add(tick);
    const vis = ScrollTrigger.create({
      trigger: section, start: "top bottom", end: "bottom top",
      onToggle: (self) => { visible = self.isActive; },
    });

    return () => { gsap.ticker.remove(tick); vis.kill(); };
  });
  // With "reduce motion" on, nothing is animated: the flowers just sit in their final places.
});