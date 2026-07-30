/**
 * Café Gwicheon — Promotional Signage Slider
 * Fullscreen crossfade · 20s interval · progress + dots
 */

(() => {
  "use strict";

  const INTERVAL_MS = 20_000;
  const FADE_MS = 1200;
  const SPARKLE_COUNT = 18;

  const SLIDES = [
    {
      src: "images/slide1.jpg",
      alt: "썸머 샹그리아 프로모션",
    },
    {
      src: "images/slide2.jpg",
      alt: "눈꽃 빙수 프로모션",
    },
    {
      src: "images/slide3.jpg",
      alt: "스무디 셀렉션 프로모션",
    },
  ];

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    index: 0,
    timerId: null,
    rafId: null,
    startedAt: 0,
    paused: false,
    loadedCount: 0,
    failedCount: 0,
    slides: [],
  };

  /* --------------------------------------------------------------------------
     DOM helpers
     -------------------------------------------------------------------------- */
  const els = {
    root: null,
    stage: null,
    fallback: null,
    progressBar: null,
    dots: null,
    status: null,
    sparkles: null,
  };

  const cacheEls = () => {
    els.root = document.getElementById("slide-signage");
    els.stage = document.getElementById("slide-stage");
    els.fallback = document.getElementById("slide-fallback");
    els.progressBar = document.getElementById("slide-progress-bar");
    els.dots = document.getElementById("slide-dots");
    els.status = document.getElementById("slide-status");
    els.sparkles = document.getElementById("slide-sparkles");
  };

  /* --------------------------------------------------------------------------
     Render
     -------------------------------------------------------------------------- */
  const renderSlides = () => {
    if (!els.stage) return;

    els.stage.innerHTML = SLIDES.map((slide, index) => `
        <figure
          class="slide-frame${index === 0 ? " is-active" : ""}"
          data-slide-index="${index}"
          aria-hidden="${index === 0 ? "false" : "true"}"
        >
          <div class="slide-frame__media">
            <img
              class="slide-frame__image"
              src="${slide.src}"
              alt="${slide.alt}"
              decoding="async"
              fetchpriority="${index === 0 ? "high" : "low"}"
              data-slide-image
            />
          </div>
          <div class="slide-frame__shine" aria-hidden="true"></div>
          <div class="slide-frame__placeholder" aria-hidden="true">
            <span class="slide-frame__placeholder-brand">카페귀천</span>
          </div>
        </figure>
      `).join("");

    state.slides = [...els.stage.querySelectorAll(".slide-frame")];

    state.slides.forEach((frame) => {
      const img = frame.querySelector("[data-slide-image]");
      if (!img) return;

      const markLoaded = () => {
        frame.classList.add("is-loaded");
        frame.classList.remove("is-error");
        state.loadedCount += 1;
        updateFallbackVisibility();
      };

      const markError = () => {
        frame.classList.add("is-error");
        frame.classList.remove("is-loaded");
        state.failedCount += 1;
        updateFallbackVisibility();
      };

      if (img.complete) {
        if (img.naturalWidth > 0) markLoaded();
        else markError();
      } else {
        img.addEventListener("load", markLoaded, { once: true });
        img.addEventListener("error", markError, { once: true });
      }
    });
  };

  const renderDots = () => {
    if (!els.dots) return;

    els.dots.innerHTML = SLIDES.map(
      (_, index) => `
        <button
          type="button"
          class="slide-dot${index === 0 ? " is-active" : ""}"
          data-dot-index="${index}"
          aria-label="슬라이드 ${index + 1} / ${SLIDES.length}"
          aria-current="${index === 0 ? "true" : "false"}"
        ></button>
      `
    ).join("");

    els.dots.addEventListener("click", (event) => {
      const button = event.target.closest("[data-dot-index]");
      if (!button) return;
      const nextIndex = Number(button.dataset.dotIndex);
      if (Number.isNaN(nextIndex)) return;
      goTo(nextIndex, { restartTimer: true });
    });
  };

  const updateFallbackVisibility = () => {
    if (!els.fallback) return;
    const allFailed =
      state.failedCount >= SLIDES.length && state.loadedCount === 0;
    const noneReady = state.loadedCount === 0 && state.failedCount === 0;

    if (allFailed) {
      els.fallback.hidden = false;
      els.fallback.querySelector(".slide-fallback__text").textContent =
        "이미지를 불러올 수 없습니다";
      els.root?.classList.add("has-fallback");
    } else if (noneReady) {
      els.fallback.hidden = false;
      els.root?.classList.add("has-fallback");
    } else {
      els.fallback.hidden = true;
      els.root?.classList.remove("has-fallback");
    }
  };

  const renderSparkles = () => {
    if (!els.sparkles) return;

    els.sparkles.innerHTML = Array.from({ length: SPARKLE_COUNT }, (_, i) => {
      const left = (i * 37 + 11) % 100;
      const top = (i * 53 + 7) % 100;
      const size = 4 + (i % 5) * 2;
      const delay = ((i * 0.47) % 8).toFixed(2);
      const duration = (3.2 + (i % 6) * 0.55).toFixed(2);
      const tone = i % 3 === 0 ? "warm" : i % 3 === 1 ? "cool" : "soft";

      return `
        <span
          class="slide-sparkle slide-sparkle--${tone}"
          style="
            --sx: ${left}%;
            --sy: ${top}%;
            --ssize: ${size}px;
            --sdelay: ${delay}s;
            --sdur: ${duration}s;
          "
        ></span>
      `;
    }).join("");
  };

  const updateChrome = (index) => {
    state.slides.forEach((frame, i) => {
      const active = i === index;
      frame.classList.toggle("is-active", active);
      frame.setAttribute("aria-hidden", active ? "false" : "true");
    });

    els.dots?.querySelectorAll(".slide-dot").forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });

    if (els.status) {
      els.status.textContent = `슬라이드 ${index + 1} / ${SLIDES.length}`;
    }
  };

  /* --------------------------------------------------------------------------
     Navigation + timer
     -------------------------------------------------------------------------- */
  const goTo = (index, { restartTimer = false } = {}) => {
    if (!state.slides.length) return;

    const next = ((index % state.slides.length) + state.slides.length) %
      state.slides.length;
    state.index = next;
    updateChrome(next);

    if (restartTimer) restartInterval();
  };

  const next = () => goTo(state.index + 1, { restartTimer: true });

  const stopProgressLoop = () => {
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
  };

  const tickProgress = () => {
    if (!els.progressBar || state.paused) return;

    const elapsed = performance.now() - state.startedAt;
    const ratio = Math.min(elapsed / INTERVAL_MS, 1);
    els.progressBar.style.transform = `scaleX(${ratio})`;

    if (ratio < 1) {
      state.rafId = requestAnimationFrame(tickProgress);
    }
  };

  const clearTimer = () => {
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    stopProgressLoop();
  };

  const restartInterval = () => {
    clearTimer();
    if (state.paused || state.slides.length < 2) {
      if (els.progressBar) els.progressBar.style.transform = "scaleX(0)";
      return;
    }

    state.startedAt = performance.now();
    if (els.progressBar) {
      els.progressBar.style.transition = "none";
      els.progressBar.style.transform = "scaleX(0)";
      // force reflow before rAF progress
      void els.progressBar.offsetWidth;
    }

    state.rafId = requestAnimationFrame(tickProgress);
    state.timerId = window.setTimeout(() => {
      goTo(state.index + 1);
      restartInterval();
    }, INTERVAL_MS);
  };

  const pause = () => {
    state.paused = true;
    clearTimer();
  };

  const resume = () => {
    state.paused = false;
    restartInterval();
  };

  /* --------------------------------------------------------------------------
     Init
     -------------------------------------------------------------------------- */
  const applyMotionPreference = () => {
    if (!els.root) return;
    const reduced = prefersReducedMotion();
    els.root.style.setProperty(
      "--slide-fade-ms",
      reduced ? "1ms" : `${FADE_MS}ms`
    );
    els.root.classList.toggle("motion-reduced", reduced);
  };

  const init = () => {
    cacheEls();
    if (!els.stage) return;

    applyMotionPreference();
    renderSlides();
    renderSparkles();
    renderDots();
    updateChrome(0);
    updateFallbackVisibility();
    restartInterval();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else resume();
    });

    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", applyMotionPreference);
  };

  window.CafeSlide = {
    slides: SLIDES,
    intervalMs: INTERVAL_MS,
    init,
    next,
    goTo,
    pause,
    resume,
  };

  document.addEventListener("DOMContentLoaded", init);
})();
