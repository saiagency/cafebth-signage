/**
 * Café Gwicheon — Classic Signage Menu Renderer
 * Sample menu board layout (white / cultural café)
 */

(() => {
  "use strict";

  const I18N_INTERVAL_MS = 4000;
  const I18N_ORDER = ["en", "ja", "zh"];

  /* --------------------------------------------------------------------------
     Menu Data (from menu_202607.xlsx · menu sheet)
     -------------------------------------------------------------------------- */
  const MENU_PAGES = {
    menu1: {
      id: "menu1",
      layout: "classic-grid",
      label: "Drinks",
      columns: [
        ["signature", "ronnefeldt-tea", "latte"],
        ["coffee", "handmade-ade", "tea-beverages"],
      ],
      categories: [
        {
          id: "signature",
          titleEn: "SIGNATURE",
          items: [
            {
              nameKo: "천상병커피",
              nameEn: "Cheon Sang-Byeong Drip Coffee",
              nameJa: "チョンサンビョン ドリップコーヒー",
              nameZh: "天尚咖啡 (手冲咖啡)",
              price: 8000,
              desc: "시나몬 뉘앙스의 스페셜티 싱글오리진 원두",
              best: true,
            },
            {
              nameKo: "마자그랑",
              nameEn: "Mazagran",
              nameJa: "マザグラン",
              nameZh: "马扎格兰",
              price: 8000,
              desc: "상큼한 포르투갈식 레몬커피",
              best: true,
            },
            {
              nameKo: "납짝복숭아에이드",
              nameEn: "Flat Peach Ade",
              nameJa: "ドーナツピーチエード",
              nameZh: "蟠桃气泡饮",
              price: 8000,
              desc: "스페인에서 온 납짝복숭아로 만든 에이드",
              best: true,
            },
          ],
        },
        {
          id: "coffee",
          titleEn: "COFFEE",
          footnote: "디카페인으로 변경 가능",
          items: [
            {
              nameKo: "아메리카노",
              nameEn: "Americano",
              nameJa: "アメリカーノ",
              nameZh: "美式咖啡",
              price: 6000,
            },
            {
              nameKo: "카페라떼",
              nameEn: "Cafe Latte",
              nameJa: "カフェラテ",
              nameZh: "拿铁",
              price: 6500,
            },
            {
              nameKo: "카푸치노",
              nameEn: "Cappuccino",
              nameJa: "カプチーノ",
              nameZh: "卡布奇诺",
              price: 6500,
            },
            {
              nameKo: "바닐라라떼",
              nameEn: "Vanilla Latte",
              nameJa: "バニララテ",
              nameZh: "香草拿铁",
              price: 7000,
            },
            {
              nameKo: "연유라떼",
              nameEn: "Dolce Latte",
              nameJa: "ドルチェラテ",
              nameZh: "炼乳拿铁",
              price: 7000,
            },
            {
              nameKo: "카페모카",
              nameEn: "Cafe Mocha",
              nameJa: "カフェモカ",
              nameZh: "摩卡",
              price: 7000,
            },
            {
              nameKo: "카라멜마끼아또",
              nameEn: "Caramel Macchiato",
              nameJa: "キャラメルマキアート",
              nameZh: "焦糖玛奇朵",
              price: 7000,
            },
          ],
        },
        {
          id: "ronnefeldt-tea",
          titleEn: "Ronnefeldt Tea",
          brandMark: true,
          items: [
            {
              nameKo: "클래식그린(녹차)",
              nameEn: "Classic Green",
              nameJa: "クラシックグリーン",
              nameZh: "经典绿茶",
              price: 7500,
            },
            {
              nameKo: "그린엔젤",
              nameEn: "Green Angel",
              nameJa: "グリーンエンジェル",
              nameZh: "绿天使",
              price: 7500,
            },
            {
              nameKo: "얼그레이",
              nameEn: "Earl Grey",
              nameJa: "アールグレイ",
              nameZh: "伯爵茶",
              price: 7500,
            },
            {
              nameKo: "잉글리쉬 블랙퍼스트",
              nameEn: "English Breakfast",
              nameJa: "イングリッシュブレックファースト",
              nameZh: "英式早餐茶",
              price: 7500,
            },
            {
              nameKo: "자스민",
              nameEn: "Jasmine",
              nameJa: "ジャスミン",
              nameZh: "茉莉花茶",
              price: 7500,
            },
            {
              nameKo: "레몬스카이",
              nameEn: "Lemon Sky",
              nameJa: "レモンスカイ",
              nameZh: "柠檬天空",
              price: 7500,
              badge: "decaf",
            },
            {
              nameKo: "카모마일",
              nameEn: "Camomile",
              nameJa: "カモミール",
              nameZh: "洋甘菊",
              price: 7500,
              badge: "decaf",
            },
            {
              nameKo: "윈터드림",
              nameEn: "Winter Dream",
              nameJa: "ウィンタードリーム",
              nameZh: "冬日梦境",
              price: 7500,
              badge: "decaf",
            },
          ],
        },
        {
          id: "handmade-ade",
          titleEn: "Handmade Fruit Ade",
          items: [
            {
              nameKo: "모과에이드",
              nameEn: "Quince Ade",
              nameJa: "かりんエード",
              nameZh: "木瓜气泡饮",
              price: 7500,
            },
            {
              nameKo: "딸기에이드",
              nameEn: "Strawberry Ade",
              nameJa: "いちごエード",
              nameZh: "草莓气泡饮",
              price: 7500,
            },
            {
              nameKo: "레몬에이드",
              nameEn: "Lemon Ade",
              nameJa: "レモネード",
              nameZh: "柠檬气泡饮",
              price: 7500,
            },
            {
              nameKo: "자몽에이드",
              nameEn: "Grapefruit Ade",
              nameJa: "グレープフルーツエード",
              nameZh: "西柚气泡饮",
              price: 7500,
            },
            {
              nameKo: "패션후르츠에이드",
              nameEn: "Passionfruit Ade",
              nameJa: "パッションフルーツエード",
              nameZh: "百香果气泡饮",
              price: 7500,
            },
          ],
        },
        {
          id: "latte",
          titleEn: "LATTE",
          items: [
            {
              nameKo: "딸기라떼",
              nameEn: "Strawberry Latte",
              nameJa: "いちごラテ",
              nameZh: "草莓拿铁",
              price: 7000,
              badge: "ice",
            },
            {
              nameKo: "자색고구마라떼",
              nameEn: "Purple Sweet Potato Latte",
              nameJa: "紫芋ラテ",
              nameZh: "紫薯拿铁",
              price: 7000,
            },
            {
              nameKo: "단호박라떼",
              nameEn: "Sweet Pumpkin Latte",
              nameJa: "かぼちゃラテ",
              nameZh: "南瓜拿铁",
              price: 7000,
            },
            {
              nameKo: "초코라떼",
              nameEn: "Choco Latte",
              nameJa: "チョコラテ",
              nameZh: "巧克力拿铁",
              price: 7000,
            },
            {
              nameKo: "팥라떼",
              nameEn: "Red Bean Latte",
              nameJa: "あずきラテ",
              nameZh: "红豆拿铁",
              price: 7000,
            },
            {
              nameKo: "진저라떼",
              nameEn: "Ginger Latte",
              nameJa: "ジンジャーラテ",
              nameZh: "姜味拿铁",
              price: 7000,
              badge: "hot",
            },
          ],
        },
        {
          id: "tea-beverages",
          titleEn: "Tea & Beverages",
          items: [
            {
              nameKo: "모과차",
              nameEn: "Quince Tea",
              nameJa: "かりん茶",
              nameZh: "木瓜茶",
              price: 6500,
            },
            {
              nameKo: "레몬차",
              nameEn: "Lemon Tea",
              nameJa: "レモンティー",
              nameZh: "柠檬茶",
              price: 6500,
            },
            {
              nameKo: "자몽차",
              nameEn: "Grapefruit Tea",
              nameJa: "グレープフルーツティー",
              nameZh: "西柚茶",
              price: 6500,
            },
            {
              nameKo: "패션후르츠차",
              nameEn: "Passionfruit Tea",
              nameJa: "パッションフルーツティー",
              nameZh: "百香果茶",
              price: 6500,
            },
            {
              nameKo: "생강차",
              nameEn: "Ginger Tea",
              nameJa: "生姜茶",
              nameZh: "姜茶",
              price: 6500,
              badge: "hot",
            },
            {
              nameKo: "레몬생강차",
              nameEn: "Lemon Ginger Tea",
              nameJa: "レモンジンジャーティー",
              nameZh: "柠檬姜茶",
              price: 6500,
              badge: "hot",
            },
            {
              nameKo: "아이스티",
              nameEn: "Iced Tea",
              nameJa: "アイスティー",
              nameZh: "冰红茶",
              price: 6000,
              badge: "ice",
            },
            {
              nameKo: "아샷추",
              nameEn: "Ashatchu",
              nameJa: "アイスティーエスプレッソ",
              nameZh: "冰茶特调(加浓缩咖啡)",
              price: 7000,
              badge: "ice",
            },
          ],
        },
      ],
    },
    menu2: {
      id: "menu2",
      layout: "platter",
      label: "Brunch",
      items: [
        {
          id: "gwicheon",
          nameKo: "귀천플래터",
          price: 20000,
          eyebrow: "Signature",
          layout: "side-right bleed-right ov-1 z3 p-xl",
          image: "images/platter-gwicheon.jpg",
          alt: "귀천플래터",
        },
        {
          id: "noeul",
          nameKo: "노을플래터",
          price: 20000,
          eyebrow: "Classic",
          layout: "side-left bleed-left ov-2 z2 p-xl",
          image: "images/platter-noeul.jpg",
          alt: "노을플래터",
        },
        {
          id: "sopung",
          nameKo: "소풍플래터",
          price: 20000,
          eyebrow: "Fresh",
          layout: "side-right bleed-right-md ov-3 z3 p-xl",
          image: "images/platter-sopung.jpg",
          alt: "소풍플래터",
        },
        {
          id: "brownie",
          nameKo: "아이스크림브라우니",
          price: 13000,
          eyebrow: "Sweet",
          layout: "side-left bleed-left-sm ov-4 z2 p-l",
          image: "images/dessert-brownie.jpg",
          alt: "아이스크림브라우니",
        },
        {
          id: "croffle",
          nameKo: "아이스크림크로플",
          price: 16000,
          eyebrow: "Dessert",
          layout: "side-right bleed-right-sm ov-5 z3 p-l",
          image: "images/dessert-croffle.jpg",
          alt: "아이스크림크로플",
        },
      ],
    },
  };

  const BADGE_LABELS = {
    ice: "ICE only",
    hot: "HOT only",
    decaf: "디카페인",
  };

  /* --------------------------------------------------------------------------
     Helpers
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatPrice = (price) => Number(price).toLocaleString("ko-KR");

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
      .trim();

  const categoryMap = (page) =>
    Object.fromEntries(page.categories.map((category) => [category.id, category]));

  const cleanText = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

  /* --------------------------------------------------------------------------
     Rendering
     -------------------------------------------------------------------------- */
  const renderBadge = (badge) => {
    if (!badge || !BADGE_LABELS[badge]) return "";
    return `<span class="menu-tag menu-tag--${badge}">${BADGE_LABELS[badge]}</span>`;
  };

  const renderI18nLine = (item) => {
    const langs = [
      { key: "en", text: cleanText(item.nameEn) },
      { key: "ja", text: cleanText(item.nameJa) },
      { key: "zh", text: cleanText(item.nameZh) },
    ].filter((entry) => entry.text);

    if (!langs.length) return "";

    const spans = langs
      .map(
        (entry, index) => `
          <span
            class="classic-item__lang${index === 0 ? " is-active" : ""}"
            data-lang="${entry.key}"
            lang="${entry.key}"
          >${escapeHtml(entry.text)}</span>
        `
      )
      .join("");

    return `
      <p class="classic-item__i18n" data-i18n aria-live="polite">
        ${spans}
      </p>
    `;
  };

  const renderMenuItem = (item, index) => {
    const delay = Math.min(index * 35, 700);
    const desc = item.desc
      ? `<p class="classic-item__desc">${escapeHtml(item.desc)}</p>`
      : "";
    const bestClass = item.best ? " is-best" : "";

    return `
      <li
        class="classic-item${bestClass}"
        style="--enter-delay: ${delay}ms"
        data-menu-item
      >
        <div class="classic-item__main">
          <div class="classic-item__body">
            <div class="classic-item__ko-row">
              <span class="classic-item__ko">${escapeHtml(item.nameKo)}</span>
              ${renderBadge(item.badge)}
            </div>
            ${renderI18nLine(item)}
            ${desc}
          </div>
          <span class="classic-item__price">${formatPrice(item.price)}</span>
        </div>
      </li>
    `;
  };

  const renderCategory = (category, categoryIndex) => {
    if (!category) return "";

    const itemsHtml = category.items
      .map((item, i) => renderMenuItem(item, categoryIndex * 8 + i))
      .join("");

    const footnote = category.footnote
      ? `<p class="classic-section__footnote">${escapeHtml(category.footnote)}</p>`
      : "";

    const brand = category.brandMark
      ? `<span class="classic-section__brand" aria-hidden="true">Ronnefeldt</span>`
      : "";

    return `
      <section
        class="classic-section"
        style="--panel-delay: ${categoryIndex * 70}ms"
        data-category="${escapeHtml(category.id)}"
      >
        <header class="classic-section__header">
          <h2 class="classic-section__title">${escapeHtml(category.titleEn)}</h2>
          ${brand}
        </header>
        <ul class="classic-section__list">
          ${itemsHtml}
        </ul>
        ${footnote}
      </section>
    `;
  };

  const renderPlatterItem = (item, index) => {
    const num = String(index + 1).padStart(2, "0");
    const layout = escapeHtml(item.layout || "");

    return `
      <article
        class="platter-item ${layout}"
        data-menu-item
        data-platter="${escapeHtml(item.id)}"
      >
        <div class="platter-item__plate-col">
          <div class="platter-item__plate">
            <img
              class="platter-item__image"
              src="${escapeHtml(item.image)}"
              alt="${escapeHtml(item.alt || item.nameKo)}"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
        <div class="platter-item__text">
          <p class="platter-item__eyebrow">
            <span class="platter-item__num">${num}</span>
            ${escapeHtml(item.eyebrow || "")}
          </p>
          <h2 class="platter-item__name">${escapeHtml(item.nameKo)}</h2>
          <p class="platter-item__price">${formatPrice(item.price)}</p>
        </div>
      </article>
    `;
  };

  const renderPlatterPage = (page) => {
    const root = document.getElementById("menu-root");
    if (!root) return;

    root.innerHTML = `
      <div class="platter-menu">
        ${page.items.map((item, index) => renderPlatterItem(item, index)).join("")}
      </div>
    `;

    requestAnimationFrame(() => {
      root.classList.add("is-ready");
      playEnterAnimations(root);
    });
  };

  const renderPage = (page) => {
    if (page.layout === "platter") {
      renderPlatterPage(page);
      return;
    }

    const root = document.getElementById("menu-root");
    if (!root) return;

    const byId = categoryMap(page);
    let sectionIndex = 0;

    const columnsHtml = page.columns
      .map((columnIds, colIndex) => {
        const sections = columnIds
          .map((id) => {
            const html = renderCategory(byId[id], sectionIndex);
            sectionIndex += 1;
            return html;
          })
          .join("");

        return `
          <div class="classic-column" data-col="${colIndex + 1}">
            ${sections}
          </div>
        `;
      })
      .join("");

    root.innerHTML = `
      <div class="classic-columns">
        ${columnsHtml}
        <div class="classic-divider" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      root.classList.add("is-ready");
      playEnterAnimations(root);
      startBestHighlightCycle(root);
      startI18nRotation(root);
    });
  };

  /* --------------------------------------------------------------------------
     Animations
     -------------------------------------------------------------------------- */
  const playEnterAnimations = (root) => {
    const targets = root.querySelectorAll(
      "[data-menu-item], .classic-section, .platter-item"
    );

    if (prefersReducedMotion()) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    targets.forEach((el) => el.classList.add("is-entering"));
  };

  let highlightTimer = null;
  let i18nTimer = null;
  let i18nIndex = 0;

  const startBestHighlightCycle = (root) => {
    const bestItems = [...root.querySelectorAll(".classic-item.is-best")];
    if (!bestItems.length || prefersReducedMotion()) return;

    let cursor = 0;

    const pulse = () => {
      bestItems.forEach((el) => el.classList.remove("is-sparkling"));
      const target = bestItems[cursor % bestItems.length];
      target.classList.add("is-sparkling");
      cursor += 1;
    };

    pulse();
    highlightTimer = window.setInterval(pulse, 3600);
  };

  const applyI18nLang = (root, langKey, { animate = true } = {}) => {
    root.querySelectorAll("[data-i18n]").forEach((line) => {
      const langs = [...line.querySelectorAll(".classic-item__lang")];
      if (!langs.length) return;

      const available = langs.map((el) => el.dataset.lang);
      const targetKey = available.includes(langKey) ? langKey : available[0];
      const next = langs.find((el) => el.dataset.lang === targetKey);
      const current = langs.find((el) => el.classList.contains("is-active"));

      if (!next) return;
      if (current === next) return;

      if (!animate || prefersReducedMotion() || !current) {
        langs.forEach((el) => {
          el.classList.remove("is-active", "is-exit", "is-enter");
          if (el === next) el.classList.add("is-active");
        });
        return;
      }

      current.classList.remove("is-active");
      current.classList.add("is-exit");

      next.classList.add("is-enter");
      void next.offsetWidth;
      next.classList.remove("is-enter");
      next.classList.add("is-active");

      window.setTimeout(() => {
        current.classList.remove("is-exit");
      }, 560);
    });
  };

  const startI18nRotation = (root) => {
    if (i18nTimer) {
      window.clearInterval(i18nTimer);
      i18nTimer = null;
    }

    i18nIndex = 0;
    applyI18nLang(root, I18N_ORDER[i18nIndex], { animate: false });

    if (prefersReducedMotion()) return;

    i18nTimer = window.setInterval(() => {
      i18nIndex = (i18nIndex + 1) % I18N_ORDER.length;
      applyI18nLang(root, I18N_ORDER[i18nIndex], { animate: true });
    }, I18N_INTERVAL_MS);
  };

  /* --------------------------------------------------------------------------
     Public API
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
    if (i18nTimer) {
      window.clearInterval(i18nTimer);
      i18nTimer = null;
    }

    const board = document.querySelector(
      ".menu-classic, .menu-board, .platter-board"
    );
    if (board) board.dataset.page = pageId;

    const root = document.getElementById("menu-root");
    if (root) root.classList.remove("is-ready");

    renderPage(page);
  };

  window.CafeMenu = {
    pages: MENU_PAGES,
    init: initMenuPage,
    renderPage,
  };

  document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(
      ".menu-classic, .menu-board, .platter-board"
    );
    const pageId = board?.dataset.page || "menu1";
    initMenuPage(pageId);
  });
})();
