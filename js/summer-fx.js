/**
 * Menu3 summer board — floating soap bubbles
 */
(() => {
  "use strict";

  const BUBBLE_COUNT = 22;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rand = (min, max) => min + Math.random() * (max - min);

  const mountBubbles = () => {
    const host = document.getElementById("summer-bubbles");
    if (!host) return;

    host.innerHTML = "";

    if (prefersReducedMotion()) return;

    for (let i = 0; i < BUBBLE_COUNT; i += 1) {
      const el = document.createElement("span");
      const size = rand(0.55, 1) < 0.55 ? rand(18, 42) : rand(48, 110);
      const drift = rand(-48, 48);
      const duration = rand(11, 24);
      const delay = -rand(0, duration);
      const sway = rand(4, 11);
      const left = rand(2, 96);

      el.className = "summer-bubble";
      if (size >= 70) el.classList.add("summer-bubble--lg");
      else if (size <= 30) el.classList.add("summer-bubble--sm");

      el.style.setProperty("--b-size", `${size.toFixed(1)}px`);
      el.style.setProperty("--b-left", `${left.toFixed(2)}%`);
      el.style.setProperty("--b-drift", `${drift.toFixed(1)}px`);
      el.style.setProperty("--b-dur", `${duration.toFixed(2)}s`);
      el.style.setProperty("--b-delay", `${delay.toFixed(2)}s`);
      el.style.setProperty("--b-sway", `${sway.toFixed(2)}s`);
      el.style.setProperty("--b-opacity", `${rand(0.35, 0.72).toFixed(2)}`);

      host.appendChild(el);
    }
  };

  const start = () => {
    mountBubbles();
  };

  window.SummerFx = { start, remount: mountBubbles };

  document.addEventListener("DOMContentLoaded", start);
})();
