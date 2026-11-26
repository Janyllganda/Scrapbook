/* ===== butterfly.js — butterfly sways left and right down the page as you scroll,
   and flies off the right side of the screen at the very end. ===== */
(() => {
  const layer = document.querySelector(".butterfly-layer");
  const bee = document.querySelector(".butterfly");
  const shadow = document.querySelector(".butterfly-shadow");
  if (!layer || !bee || !shadow) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Route: [scroll progress 0..1, horizontal position as fraction of screen width].
     Each point is a turning point; the butterfly eases smoothly between them. */
  const ROUTE = [
    [0.00, 0.72], [0.09, 0.30], [0.21, 0.70], [0.32, 0.30], [0.44, 0.76],
    [0.56, 0.28], [0.67, 0.72], [0.79, 0.30], [0.89, 0.68], [0.94, 0.40], [1.00, 1.30],
  ];

  const xAt = (p) => {
    for (let i = 0; i < ROUTE.length - 1; i++) {
      const [p0, x0] = ROUTE[i], [p1, x1] = ROUTE[i + 1];
      if (p <= p1) {
        const k = (p - p0) / (p1 - p0), e = (1 - Math.cos(Math.PI * k)) / 2; // smooth ease at every turn
        return x0 + (x1 - x0) * e;
      }
    }
    return ROUTE[ROUTE.length - 1][1];
  };

  let size, shadowSize, target = 0, current = 0, raf = 0;

  const measure = () => {
    const small = innerWidth < 768;
    size = small ? 110 : 170;
    shadowSize = size * 0.92;
    bee.style.width = bee.style.height = size + "px";
    shadow.style.width = shadow.style.height = shadowSize + "px";
  };


  /* ---------- fairy dust: colorful sparkles drop from the butterfly as it moves ---------- */
  const COLORS = ["#ff8fc7", "#b195fd", "#8fe3ff", "#ffd86b", "#9df0c2", "#ffb38a"];
  let lastX = null, lastY = null, alive = 0;
  const sparkle = (cx, cy, bx, by) => {
    if (reduced || alive > 70 || !bee.animate) return;
    const p = document.createElement("span"), c = COLORS[(Math.random() * COLORS.length) | 0];
    const star = Math.random() < 0.4, sz = star ? 8 + Math.random() * 8 : 4 + Math.random() * 5;
    p.style.cssText = "position:absolute;left:0;top:0;pointer-events:none;will-change:transform,opacity;" +
      (star ? `font-size:${sz}px;line-height:1;color:${c};text-shadow:0 0 6px ${c}` :
              `width:${sz}px;height:${sz}px;border-radius:50%;background:${c};box-shadow:0 0 8px 2px ${c}`);
    if (star) p.textContent = "\u2726";
    // start slightly behind the butterfly (opposite to where it is heading) with a little scatter
    const x0 = cx - bx * 0.6 + (Math.random() - 0.5) * 36, y0 = cy - by * 0.6 + (Math.random() - 0.5) * 36;
    const dx = (Math.random() - 0.5) * 40, dy = 30 + Math.random() * 50, rot = (Math.random() - 0.5) * 160;
    layer.insertBefore(p, bee); alive++;
    p.animate([
      { transform: `translate(${x0}px,${y0}px) scale(1) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${x0 + dx}px,${y0 + dy}px) scale(0.2) rotate(${rot}deg)`, opacity: 0 },
    ], { duration: 900 + Math.random() * 700, easing: "cubic-bezier(.2,.6,.4,1)" })
      .onfinish = () => { p.remove(); alive--; };
  };
  const dust = (cx, cy) => {
    if (lastX !== null) {
      const mx = cx - lastX, my = cy - lastY, dist = Math.hypot(mx, my);
      if (dist > 160) { lastX = cx; lastY = cy; return; }       // ignore jumps (resize / first load)
      if (dist < 10) return;                                      // only when it actually moves
      const n = Math.min(3, 1 + ((dist / 25) | 0));
      for (let k = 0; k < n; k++) sparkle(cx, cy, mx / dist * 14, my / dist * 14);
    }
    lastX = cx; lastY = cy;
  };

  const place = () => {
    const p = current;
    const x = xAt(p) * innerWidth - size / 2;
    // final dive: from p=0.94 it swoops downward as it flies off to the right
    const dk = Math.max(0, Math.min(1, (p - 0.94) / 0.06)), dive = dk * dk;
    const y = innerHeight * (0.3 + 0.35 * p + 0.75 * dive) - size / 2;
    const tilt = Math.max(-14, Math.min(14, (xAt(Math.min(1, p + 0.01)) - xAt(p)) * innerWidth * 0.08)) * (1 - dk) + 28 * dk;
    const height = Math.sin(p * Math.PI);
    dust(x + size / 2, y + size / 2);
    bee.style.transform = `translate3d(${x}px,${y}px,0) rotate(${tilt}deg)`;
    const sx = x + (size - shadowSize) / 2 + 40 * (0.5 + height);
    const sy = y + (size - shadowSize) / 2 + 60 * (0.6 + height);
    shadow.style.transform = `translate3d(${sx}px,${sy}px,0) rotate(${tilt}deg) scale(${1 + height * 0.15},${(1 + height * 0.15) * 0.5})`;
    shadow.style.opacity = 0.5 - height * 0.2;
  };

  const frame = () => {
    current += (target - current) * (reduced ? 1 : 0.12);
    if (Math.abs(target - current) < 0.0002) current = target;
    place();
    raf = current !== target ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const readScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    target = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    start();
  };

  measure(); readScroll(); current = target; place();
  addEventListener("scroll", readScroll, { passive: true });
  addEventListener("resize", () => { measure(); place(); });
  addEventListener("load", () => { measure(); readScroll(); });
})();