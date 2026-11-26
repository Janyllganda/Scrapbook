/* ===== dark.js — remembers the theme and wires up the 🌙 button in the player ===== */
(() => {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "dark") root.setAttribute("data-theme", "dark");

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("dm");
    if (!btn) return;
    const paint = () => { btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️ Light" : "🌙 Dark"; };
    btn.addEventListener("click", () => {
      const dark = root.getAttribute("data-theme") !== "dark";
      if (dark) root.setAttribute("data-theme", "dark"); else root.removeAttribute("data-theme");
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
      paint();
    });
    paint();
  });
})();
