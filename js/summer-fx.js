/**
 * Menu3 board — seasonal particles + day/evening background.
 * 겨울(11~1월): 눈. 그 외: 방울. 11월~1월은 겨울 낮/밤 이미지를 쓴다.
 */
(() => {
  "use strict";

  const BUBBLE_COUNT = 22;
  const SNOW_COUNT = 48;
  const DAY_END_HOUR = 17;
  const BG_VERSION = "20261116d";
  const BG_DAY = `images/bg-summer-beach-day.jpg?v=${BG_VERSION}`;
  const BG_EVENING = `images/bg-summer-beach.jpg?v=${BG_VERSION}`;
  const BG_WINTER_DAY = `images/bg-winter-day.jpg?v=${BG_VERSION}`;
  const BG_WINTER_NIGHT = `images/bg-winter-night.jpg?v=${BG_VERSION}`;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rand = (min, max) => min + Math.random() * (max - min);

  const isDaytime = (date = new Date()) => date.getHours() < DAY_END_HOUR;

  /** 11월, 12월, 1월 */
  const isWinterSeason = (date = new Date()) => {
    const month = date.getMonth();
    return month === 10 || month === 11 || month === 0;
  };

  const applyBackground = () => {
    const img = document.querySelector(".summer-board__bg");
    if (!img) return;

    const now = new Date();
    const day = isDaytime(now);
    const winter = isWinterSeason(now);
    const timeMode = day ? "day" : "evening";
    const season = winter ? "winter" : "other";
    const sceneKey = `${season}-${timeMode}`;
    const nextSrc = winter
      ? day
        ? BG_WINTER_DAY
        : BG_WINTER_NIGHT
      : day
        ? BG_DAY
        : BG_EVENING;
    const board = document.querySelector(".summer-board");

    if (img.dataset.sceneKey !== sceneKey) {
      img.src = nextSrc;
      img.dataset.sceneKey = sceneKey;
      img.dataset.timeMode = timeMode;
      img.dataset.season = season;
    }

    document.body.classList.toggle("is-summer-day", day);
    document.body.classList.toggle("is-summer-evening", !day);
    document.body.classList.toggle("is-winter-season", winter);
    if (board) {
      board.dataset.time = timeMode;
      board.dataset.season = season;
    }
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
      mountParticles();
      scheduleBackgroundSwitch();
    }, msUntilNextBgSwitch());
  };

  const mountBubbles = (host) => {
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

  const mountSnow = (host) => {
    for (let i = 0; i < SNOW_COUNT; i += 1) {
      const el = document.createElement("span");
      const size = rand(0.6, 1) < 0.7 ? rand(4, 10) : rand(11, 18);
      const drift = rand(-70, 70);
      const duration = rand(7, 16);
      const delay = -rand(0, duration);
      const sway = rand(3.5, 8);
      const left = rand(0, 100);
      const blur = size > 12 ? rand(0, 0.6) : 0;

      el.className = "summer-snow";
      if (size >= 13) el.classList.add("summer-snow--lg");
      else if (size <= 6) el.classList.add("summer-snow--sm");

      el.style.setProperty("--s-size", `${size.toFixed(1)}px`);
      el.style.setProperty("--s-left", `${left.toFixed(2)}%`);
      el.style.setProperty("--s-drift", `${drift.toFixed(1)}px`);
      el.style.setProperty("--s-dur", `${duration.toFixed(2)}s`);
      el.style.setProperty("--s-delay", `${delay.toFixed(2)}s`);
      el.style.setProperty("--s-sway", `${sway.toFixed(2)}s`);
      el.style.setProperty("--s-opacity", `${rand(0.45, 0.95).toFixed(2)}`);
      el.style.setProperty("--s-blur", `${blur.toFixed(2)}px`);

      host.appendChild(el);
    }
  };

  const mountParticles = () => {
    const host = document.getElementById("summer-bubbles");
    if (!host) return;

    host.innerHTML = "";
    host.classList.remove("is-bubbles", "is-snow");

    if (prefersReducedMotion()) return;

    const winter = isWinterSeason();
    if (winter) {
      host.classList.add("is-snow");
      mountSnow(host);
      return;
    }

    host.classList.add("is-bubbles");
    mountBubbles(host);
  };

  const start = () => {
    applyBackground();
    scheduleBackgroundSwitch();
    mountParticles();
  };

  window.SummerFx = {
    start,
    remount: mountParticles,
    applyBackground,
    isDaytime,
    isWinterSeason,
  };

  document.addEventListener("DOMContentLoaded", start);
})();
