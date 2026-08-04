/**
 * Menu2 platter atmosphere — soft signage motion + floating motifs
 */
(() => {
  "use strict";

  const MOTIF_COUNT = 18;
  const FOCUS_MS = 4200;
  const SHIMMER_MS = 6500;

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let focusTimer = null;
  let shimmerTimer = null;
  let motifRaf = null;
  let motifs = [];
  let focusCursor = 0;
  let started = false;

  const leafPath =
    "M12 2C9 6 4 9 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-5-5-8-8-12z";

  const createMotif = (index) => {
    const el = document.createElement("span");
    const kind = index % 5 === 0 ? "bloom" : index % 3 === 0 ? "dot" : "leaf";
    el.className = `platter-motif platter-motif--${kind}`;
    el.style.setProperty("--mx", `${Math.random() * 100}%`);
    el.style.setProperty("--my", `${Math.random() * 100}%`);
    el.style.setProperty("--ms", `${0.55 + Math.random() * 0.9}`);
    el.style.setProperty("--mrot", `${Math.random() * 360}deg`);
    el.style.setProperty("--mdelay", `${-Math.random() * 18}s`);
    el.style.setProperty("--mdur", `${14 + Math.random() * 16}s`);

    if (kind === "leaf") {
      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${leafPath}"/></svg>`;
    }

    return {
      el,
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00008,
      vy: -0.00004 - Math.random() * 0.00006,
      spin: (Math.random() - 0.5) * 0.02,
      rot: Math.random() * 360,
    };
  };

  const mountMotifs = () => {
    const host = document.getElementById("platter-motifs");
    if (!host) return;

    host.innerHTML = "";
    motifs = [];

    for (let i = 0; i < MOTIF_COUNT; i += 1) {
      const motif = createMotif(i);
      motif.el.style.transform = `translate3d(${motif.x * 100}vw, ${motif.y * 100}vh, 0) rotate(${motif.rot}deg)`;
      host.appendChild(motif.el);
      motifs.push(motif);
    }
  };

  const tickMotifs = (now) => {
    if (!motifs.length) return;

    motifs.forEach((motif) => {
      motif.x += motif.vx;
      motif.y += motif.vy;
      motif.rot += motif.spin;

      if (motif.y < -0.08) {
        motif.y = 1.08;
        motif.x = Math.random();
      }
      if (motif.x < -0.08) motif.x = 1.08;
      if (motif.x > 1.08) motif.x = -0.08;

      const breathe = 0.92 + Math.sin(now / 1800 + motif.rot) * 0.08;
      motif.el.style.transform = `translate3d(${motif.x * 100}vw, ${motif.y * 100}vh, 0) rotate(${motif.rot}deg) scale(${breathe})`;
    });

    motifRaf = window.requestAnimationFrame(tickMotifs);
  };

  const clearFocus = (items) => {
    items.forEach((el) => el.classList.remove("is-spotlight"));
  };

  const startFocusCycle = (root) => {
    const items = [...root.querySelectorAll(".platter-item")];
    if (!items.length) return;

    const pulse = () => {
      clearFocus(items);
      const target = items[focusCursor % items.length];
      target.classList.add("is-spotlight");
      focusCursor += 1;
    };

    pulse();
    focusTimer = window.setInterval(pulse, FOCUS_MS);
  };

  const startTitleShimmer = () => {
    const title = document.querySelector(".platter-board__title");
    const rule = document.querySelector(".platter-board__header .platter-board__rule");
    if (!title) return;

    const shimmer = () => {
      title.classList.remove("is-shimmering");
      rule?.classList.remove("is-shimmering");
      void title.offsetWidth;
      title.classList.add("is-shimmering");
      rule?.classList.add("is-shimmering");
    };

    window.setTimeout(shimmer, 400);
    shimmerTimer = window.setInterval(shimmer, SHIMMER_MS);
  };

  const awakenChrome = () => {
    document.querySelector(".platter-board")?.classList.add("is-alive");
    document.querySelector(".platter-brand-mark")?.classList.add("is-pulsing");
  };

  const stop = () => {
    if (focusTimer) {
      window.clearInterval(focusTimer);
      focusTimer = null;
    }
    if (shimmerTimer) {
      window.clearInterval(shimmerTimer);
      shimmerTimer = null;
    }
    if (motifRaf) {
      window.cancelAnimationFrame(motifRaf);
      motifRaf = null;
    }
    started = false;
  };

  const start = (root = document.getElementById("menu-root")) => {
    stop();
    if (!root || !document.body.classList.contains("platter-page")) return;

    awakenChrome();

    if (prefersReducedMotion()) {
      root.querySelectorAll(".platter-item").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    mountMotifs();
    startFocusCycle(root);
    startTitleShimmer();
    motifRaf = window.requestAnimationFrame(tickMotifs);
    started = true;
  };

  const watchReady = () => {
    const root = document.getElementById("menu-root");
    if (!root) return;

    if (root.classList.contains("is-ready")) {
      start(root);
      return;
    }

    const observer = new MutationObserver(() => {
      if (root.classList.contains("is-ready")) {
        observer.disconnect();
        start(root);
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  };

  window.PlatterFx = { start, stop };

  document.addEventListener("DOMContentLoaded", watchReady);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
      return;
    }
    const root = document.getElementById("menu-root");
    if (root?.classList.contains("is-ready")) start(root);
  });
})();
