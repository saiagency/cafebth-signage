/**
 * Menu3 summer board — floating soap bubbles + day/evening background
 */
(() => {
  "use strict";

  const BUBBLE_COUNT = 22;
  const DAY_END_HOUR = 17;
  const BG_VERSION = "20260806e";
  const BG_DAY = `images/bg-summer-beach-day.jpg?v=${BG_VERSION}`;
  const BG_EVENING = `images/bg-summer-beach.jpg?v=${BG_VERSION}`;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rand = (min, max) => min + Math.random() * (max - min);

  const isDaytime = (date = new Date()) => date.getHours() < DAY_END_HOUR;

  const applyBackground = () => {
    const img = document.querySelector(".summer-board__bg");
    if (!img) return;

    const day = isDaytime();
    const mode = day ? "day" : "evening";
    const nextSrc = day ? BG_DAY : BG_EVENING;
    const board = document.querySelector(".summer-board");

    if (img.dataset.timeMode !== mode) {
      img.src = nextSrc;
      img.dataset.timeMode = mode;
    }

    document.body.classList.toggle("is-summer-day", day);
    document.body.classList.toggle("is-summer-evening", !day);
    if (board) board.dataset.time = mode;
  };

  const msUntilNextBgSwitch = () => {
    const now = new Date();
    const next = new Date(now);

    if (now.getHours() < DAY_END_HOUR) {
      next.setHours(DAY_END_HOUR, 0, 0, 0);
    } else {
      next.setDate(next.getDate() + 1);
      next.setHours(0, 0, 0, 0);
    }

    return Math.max(1000, next.getTime() - now.getTime() + 50);
  };

  const scheduleBackgroundSwitch = () => {
    window.setTimeout(() => {
      applyBackground();
      scheduleBackgroundSwitch();
    }, msUntilNextBgSwitch());
  };

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
    applyBackground();
    scheduleBackgroundSwitch();
    mountBubbles();
  };

  window.SummerFx = {
    start,
    remount: mountBubbles,
    applyBackground,
    isDaytime,
  };

  document.addEventListener("DOMContentLoaded", start);
})();
