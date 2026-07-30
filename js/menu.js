/**
 * Café Gwicheon — Signage Menu Renderer
 * menu 시트 기반 한국어 메뉴판 (menu1)
 */

(() => {
  "use strict";

  /* --------------------------------------------------------------------------
     Menu Data (from menu_202607.xlsx · menu sheet)
     -------------------------------------------------------------------------- */
  const MENU_PAGES = {
    menu1: {
      id: "menu1",
      label: "Drinks",
      categories: [
        {
          id: "signature",
          titleKo: "시그니처",
          titleEn: "Signature",
          items: [
            {
              nameKo: "천상병커피 (브루잉커피_드립)",
              nameEn: "Cheon Sang-Byeong Drip Coffee",
              price: 8000,
              noteKo: "시나몬 뉘앙스의 스페셜티 싱글오리진 원두",
              best: true,
            },
            {
              nameKo: "마자그랑",
              nameEn: "Mazagran",
              price: 8000,
              noteKo: "상큼한 포르투갈식 레몬커피",
              best: true,
            },
            {
              nameKo: "납짝복숭아에이드",
              nameEn: "Flat Peach Ade",
              price: 8000,
              noteKo: "스페인에서 온 납짝복숭아로 만든 에이드",
              best: true,
            },
          ],
        },
        {
          id: "coffee",
          titleKo: "커피",
          titleEn: "Coffee",
          items: [
            {
              nameKo: "아메리카노",
              nameEn: "Americano",
              price: 6000,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "카페라떼",
              nameEn: "Cafe Latte",
              price: 6500,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "카푸치노",
              nameEn: "Cappuccino",
              price: 6500,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "바닐라라떼",
              nameEn: "Vanilla Latte",
              price: 7000,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "연유라떼",
              nameEn: "Dolce Latte",
              price: 7000,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "카페모카",
              nameEn: "Cafe Mocha",
              price: 7000,
              noteKo: "디카페인으로 변경 가능",
            },
            {
              nameKo: "카라멜마끼아또",
              nameEn: "Caramel Macchiato",
              price: 7000,
              noteKo: "디카페인으로 변경 가능",
            },
          ],
        },
        {
          id: "tea-beverages",
          titleKo: "티 & 베버리지",
          titleEn: "Tea & Beverages",
          items: [
            { nameKo: "모과차", nameEn: "Quince Tea", price: 6500 },
            { nameKo: "레몬차", nameEn: "Lemon Tea", price: 6500 },
            { nameKo: "자몽차", nameEn: "Grapefruit Tea", price: 6500 },
            { nameKo: "패션후르츠차", nameEn: "Passionfruit Tea", price: 6500 },
            { nameKo: "생강차", nameEn: "Ginger Tea", price: 6500, noteKo: "hot only" },
            {
              nameKo: "레몬생강차",
              nameEn: "Lemon Ginger Tea",
              price: 6500,
              noteKo: "hot only",
            },
            { nameKo: "아이스티", nameEn: "Iced Tea", price: 6000, noteKo: "ice only" },
            {
              nameKo: "아샷추",
              nameEn: "Iced Tea with Espresso Shot (Ashatchu)",
              price: 7000,
              noteKo: "ice only",
            },
          ],
        },
        {
          id: "handmade-ade",
          titleKo: "수제 에이드",
          titleEn: "Handmade Ade",
          items: [
            { nameKo: "모과에이드", nameEn: "Quince Ade", price: 7500 },
            { nameKo: "딸기에이드", nameEn: "Strawberry Ade", price: 7500 },
            { nameKo: "레몬에이드", nameEn: "Lemon Ade", price: 7500 },
            { nameKo: "자몽에이드", nameEn: "Grapefruit Ade", price: 7500 },
            { nameKo: "패션후르츠에이드", nameEn: "Passionfruit Ade", price: 7500 },
          ],
        },
        {
          id: "latte",
          titleKo: "라떼",
          titleEn: "Latte",
          items: [
            {
              nameKo: "딸기라떼",
              nameEn: "Strawberry Latte",
              price: 7000,
              noteKo: "ice only",
            },
            {
              nameKo: "자색고구마라떼",
              nameEn: "Purple Sweet Potato Latte",
              price: 7000,
            },
            { nameKo: "단호박라떼", nameEn: "Sweet Pumpkin Latte", price: 7000 },
            { nameKo: "초코라떼", nameEn: "Choco Latte", price: 7000 },
            { nameKo: "팥라떼", nameEn: "Red Bean Latte", price: 7000 },
            {
              nameKo: "진저라떼",
              nameEn: "Ginger Latte",
              price: 7000,
              noteKo: "hot only",
            },
          ],
        },
        {
          id: "ronnefeldt-tea",
          titleKo: "로네펠트 티",
          titleEn: "Ronnefeldt Tea",
          items: [
            { nameKo: "클래식그린(녹차)", nameEn: "Classic Green", price: 7500 },
            { nameKo: "그린엔젤", nameEn: "Green Angel", price: 7500 },
            { nameKo: "얼그레이", nameEn: "Earl Grey", price: 7500 },
            {
              nameKo: "잉글리쉬 블랙퍼스트",
              nameEn: "English Breakfast",
              price: 7500,
            },
            { nameKo: "자스민", nameEn: "Jasmine", price: 7500 },
            {
              nameKo: "레몬스카이",
              nameEn: "Lemon Sky",
              price: 7500,
              noteKo: "디카페인",
            },
            {
              nameKo: "카모마일",
              nameEn: "Camomile",
              price: 7500,
              noteKo: "디카페인",
            },
            {
              nameKo: "윈터드림",
              nameEn: "Winter Dream",
              price: 7500,
              noteKo: "디카페인",
            },
          ],
        },
      ],
    },
  };

  /* --------------------------------------------------------------------------
     Helpers
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatPrice = (price) =>
    `₩${Number(price).toLocaleString("ko-KR")}`;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const getBestItems = (page) =>
    page.categories.flatMap((category) =>
      category.items.filter((item) => item.best)
    );

  /* --------------------------------------------------------------------------
     Rendering
     -------------------------------------------------------------------------- */
  const renderMenuItem = (item, index) => {
    const note = item.noteKo
      ? `<p class="menu-item__note">${escapeHtml(item.noteKo)}</p>`
      : "";
    const bestClass = item.best ? " is-best" : "";
    const delay = Math.min(index * 40, 720);

    return `
      <li class="menu-row${bestClass}" style="--enter-delay: ${delay}ms" data-menu-item>
        <div class="menu-row__info">
          <p class="menu-row__name-ko">${escapeHtml(item.nameKo)}</p>
          <p class="menu-row__name-en">${escapeHtml(item.nameEn)}</p>
          ${note}
        </div>
        <span class="menu-row__dots" aria-hidden="true"></span>
        <p class="menu-row__price">${formatPrice(item.price)}</p>
        ${item.best ? '<span class="menu-row__sparkle" aria-hidden="true"></span>' : ""}
      </li>
    `;
  };

  const renderCategory = (category, categoryIndex) => {
    const itemsHtml = category.items
      .map((item, i) => renderMenuItem(item, categoryIndex * 6 + i))
      .join("");

    return `
      <section
        class="menu-panel"
        style="--panel-delay: ${categoryIndex * 80}ms"
        data-category="${escapeHtml(category.id)}"
      >
        <header class="menu-panel__header">
          <div>
            <h2 class="menu-panel__title">${escapeHtml(category.titleKo)}</h2>
            <p class="menu-panel__title-en uppercase">${escapeHtml(category.titleEn)}</p>
          </div>
          <span class="accent-bar" aria-hidden="true"></span>
        </header>
        <ul class="menu-panel__list">
          ${itemsHtml}
        </ul>
      </section>
    `;
  };

  const renderPage = (page) => {
    const root = document.getElementById("menu-root");
    if (!root) return;

    root.innerHTML = `
      <div class="menu-grid">
        ${page.categories.map((category, index) => renderCategory(category, index)).join("")}
      </div>
    `;

    requestAnimationFrame(() => {
      root.classList.add("is-ready");
      playEnterAnimations(root);
      startBestHighlightCycle(root);
    });
  };

  const renderMarquee = (page) => {
    const track = document.getElementById("marquee-track");
    if (!track) return;

    const best = getBestItems(page);
    const phrases =
      best.length > 0
        ? best.map((item) => `✦ ${item.nameKo} · ${item.nameEn}`)
        : ["✦ 카페귀천 · Café Gwicheon"];

    const sequence = [...phrases, ...phrases, ...phrases]
      .map((text) => `<span class="menu-board__marquee-item">${escapeHtml(text)}</span>`)
      .join("");

    track.innerHTML = sequence;
  };

  /* --------------------------------------------------------------------------
     Animations
     -------------------------------------------------------------------------- */
  const playEnterAnimations = (root) => {
    if (prefersReducedMotion()) {
      root.querySelectorAll("[data-menu-item], .menu-panel").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    root.querySelectorAll(".menu-panel").forEach((panel) => {
      panel.classList.add("is-entering");
    });

    root.querySelectorAll("[data-menu-item]").forEach((item) => {
      item.classList.add("is-entering");
    });
  };

  let highlightTimer = null;

  const startBestHighlightCycle = (root) => {
    const bestItems = [...root.querySelectorAll(".menu-row.is-best")];
    if (!bestItems.length || prefersReducedMotion()) return;

    let cursor = 0;

    const pulse = () => {
      bestItems.forEach((el) => el.classList.remove("is-sparkling"));
      const target = bestItems[cursor % bestItems.length];
      target.classList.add("is-sparkling");
      // subtle scale pulse
      target.classList.remove("is-pulse");
      // force reflow for restart
      void target.offsetWidth;
      target.classList.add("is-pulse");
      cursor += 1;
    };

    pulse();
    highlightTimer = window.setInterval(pulse, 3200);
  };

  /* --------------------------------------------------------------------------
     Public API (페이지 전환 시 재사용)
     -------------------------------------------------------------------------- */
  const initMenuPage = (pageId = "menu1") => {
    const page = MENU_PAGES[pageId];
    if (!page) {
      console.error(`[menu] Unknown page: ${pageId}`);
      return;
    }

    if (highlightTimer) {
      window.clearInterval(highlightTimer);
      highlightTimer = null;
    }

    const board = document.querySelector(".menu-board");
    if (board) board.dataset.page = pageId;

    const root = document.getElementById("menu-root");
    if (root) root.classList.remove("is-ready");

    renderMarquee(page);
    renderPage(page);
  };

  window.CafeMenu = {
    pages: MENU_PAGES,
    init: initMenuPage,
    renderPage,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".menu-board");
    const pageId = board?.dataset.page || "menu1";
    initMenuPage(pageId);
  });
})();
