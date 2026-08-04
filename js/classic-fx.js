/**
 * Menu1 classic board — diagonally drifting flower petals
 */
(() => {
  "use strict";

  const PETAL_COUNT = 20;

  const PETAL_PATHS = [
    "M12 2C9.5 6.5 5 9.5 5 14c0 4 3.1 7 7 7s7-3 7-7c0-4.5-4.5-7.5-7-12z",
    "M12 3c-2 4-6 7-6 11a6 6 0 0 0 12 0c0-4-4-7-6-11z",
    "M12 2.5c-1.8 3.8-5.5 7-5.2 11.2A5.4 5.4 0 0 0 12 20.5a5.4 5.4 0 0 0 5.2-6.8C17.5 9.5 13.8 6.3 12 2.5z",
  ];

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rand = (min, max) => min + Math.random() * (max - min);

  const mountPetals = () => {
    const host = document.getElementById("classic-petals");
    if (!host) return;

    host.innerHTML = "";
    if (prefersReducedMotion()) return;

    for (let i = 0; i < PETAL_COUNT; i += 1) {
      const el = document.createElement("span");
      const size = rand(0.5, 1) < 0.6 ? rand(14, 26) : rand(28, 44);
      // Spawn from upper-right / top edge, blow toward lower-left
      const startX = rand(35, 115);
      const startY = rand(-12, 18);
      const duration = rand(10, 18);
      const delay = -rand(0, duration);
      // Strong leftward + downward diagonal travel
      const endX = startX - rand(55, 95);
      const endY = startY + rand(105, 130);
      const midX = startX - rand(22, 48);
      const midY = startY + rand(40, 60);
      const spin = rand(320, 780) * (Math.random() < 0.5 ? -1 : 1);
      const tone = i % 3;
      const path = PETAL_PATHS[i % PETAL_PATHS.length];

      el.className = `classic-petal classic-petal--t${tone}`;
      if (size >= 32) el.classList.add("classic-petal--lg");
      else if (size <= 18) el.classList.add("classic-petal--sm");

      el.style.setProperty("--p-size", `${size.toFixed(1)}px`);
      el.style.setProperty("--p-x0", `${startX.toFixed(2)}vw`);
      el.style.setProperty("--p-y0", `${startY.toFixed(2)}vh`);
      el.style.setProperty("--p-x1", `${midX.toFixed(2)}vw`);
      el.style.setProperty("--p-y1", `${midY.toFixed(2)}vh`);
      el.style.setProperty("--p-x2", `${endX.toFixed(2)}vw`);
      el.style.setProperty("--p-y2", `${endY.toFixed(2)}vh`);
      el.style.setProperty("--p-dur", `${duration.toFixed(2)}s`);
      el.style.setProperty("--p-delay", `${delay.toFixed(2)}s`);
      el.style.setProperty("--p-spin", `${spin.toFixed(0)}deg`);
      el.style.setProperty("--p-spin-mid", `${(spin * 0.45).toFixed(0)}deg`);
      el.style.setProperty("--p-opacity", `${rand(0.38, 0.72).toFixed(2)}`);

      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
      host.appendChild(el);
    }
  };

  const start = () => {
    mountPetals();
  };

  window.ClassicFx = { start, remount: mountPetals };

  document.addEventListener("DOMContentLoaded", start);
})();
