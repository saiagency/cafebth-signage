/**
 * Café Gwicheon — Classic Signage Menu Renderer
 * Sample menu board layout (white / cultural café)
 */

(() => {
  "use strict";

  const I18N_INTERVAL_MS = 4000;
  const I18N_ORDER = ["ko", "en", "ja", "zh", "th"];

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
              nameTh: "กาแฟดริปชอนซังบยอง",
              price: 8000,
              descKo: "시나몬 뉘앙스의 스페셜티 싱글오리진 원두",
              descEn: "Specialty single-origin beans with a hint of cinnamon",
              descJa: "シナモン香るスペシャルティシングルオリジン豆",
              descZh: "带肉桂香气的精品单一产地咖啡豆",
              descTh: "เมล็ดกาแฟสเปเชียลตี้ซิงเกิลออริจิน กลิ่นอบเชยละมุน",
              best: true,
            },
            {
              nameKo: "마자그랑",
              nameEn: "Mazagran",
              nameJa: "マザグラン",
              nameZh: "马扎格兰",
              nameTh: "มาซาแกรน",
              price: 8000,
              descKo: "상큼한 포르투갈식 레몬커피",
              descEn: "Refreshing Portuguese-style lemon coffee",
              descJa: "さわやかなポルトガル風レモンコーヒー",
              descZh: "清爽的葡萄牙式柠檬咖啡",
              descTh: "กาแฟมะนาวสไตล์โปรตุเกส สดชื่น",
              best: true,
            },
            {
              nameKo: "납짝복숭아에이드",
              nameEn: "Flat Peach Ade",
              nameJa: "ドーナツピーチエード",
              nameZh: "蟠桃气泡饮",
              nameTh: "เอเดพีชแบน",
              price: 8000,
              descKo: "스페인산 납작복숭아로 만든 에이드",
              descEn: "Ade made with flat peaches from Spain",
              descJa: "スペイン産ドーナツピーチのエイド",
              descZh: "用西班牙扁桃制成的果茶",
              descTh: "เอดจากลูกพีชแบนจากสเปน",
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
              nameTh: "อเมริกาโน",
              price: 6000,
            },
            {
              nameKo: "카페라떼",
              nameEn: "Cafe Latte",
              nameJa: "カフェラテ",
              nameZh: "拿铁",
              nameTh: "คาเฟ่ลาเต้",
              price: 6500,
            },
            {
              nameKo: "카푸치노",
              nameEn: "Cappuccino",
              nameJa: "カプチーノ",
              nameZh: "卡布奇诺",
              nameTh: "คาปูชิโน",
              price: 6500,
            },
            {
              nameKo: "바닐라라떼",
              nameEn: "Vanilla Latte",
              nameJa: "バニララテ",
              nameZh: "香草拿铁",
              nameTh: "วานิลลาลาเต้",
              price: 7000,
            },
            {
              nameKo: "연유라떼",
              nameEn: "Dolce Latte",
              nameJa: "ドルチェラテ",
              nameZh: "炼乳拿铁",
              nameTh: "ลาเต้นมข้นหวาน",
              price: 7000,
            },
            {
              nameKo: "카페모카",
              nameEn: "Cafe Mocha",
              nameJa: "カフェモカ",
              nameZh: "摩卡",
              nameTh: "คาเฟ่มอคค่า",
              price: 7000,
            },
            {
              nameKo: "카라멜마끼아또",
              nameEn: "Caramel Macchiato",
              nameJa: "キャラメルマキアート",
              nameZh: "焦糖玛奇朵",
              nameTh: "คาราเมลแมคคิอาโต",
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
              nameTh: "คลาสสิกกรีน (ชาเขียว)",
              price: 7500,
              descKo: "상큼한 풀향의 순한 녹차",
              descEn: "Fresh, grassy green tea",
              descJa: "爽やかな青葉香の緑茶",
              descZh: "清新草香绿茶",
              descTh: "ชาเขียวหอมหญ้าสด",
            },
            {
              nameKo: "그린엔젤",
              nameEn: "Green Angel",
              nameJa: "グリーンエンジェル",
              nameZh: "绿天使",
              nameTh: "กรีนแองเจิล",
              price: 7500,
              descKo: "배·복숭아향 나는 녹차",
              descEn: "Green tea with pear & peach",
              descJa: "洋梨と桃の香る緑茶",
              descZh: "梨桃香绿茶",
              descTh: "ชาเขียวกลิ่นแพร์และพีช",
            },
            {
              nameKo: "얼그레이",
              nameEn: "Earl Grey",
              nameJa: "アールグレイ",
              nameZh: "伯爵茶",
              nameTh: "เอิร์ลเกรย์",
              price: 7500,
              descKo: "베르가못 향 홍차",
              descEn: "Bergamot-scented black tea",
              descJa: "ベルガモット香る紅茶",
              descZh: "佛手柑香红茶",
              descTh: "ชาดำกลิ่นเบอร์กามอต",
            },
            {
              nameKo: "잉글리쉬 블랙퍼스트",
              nameEn: "English Breakfast",
              nameJa: "イングリッシュブレックファースト",
              nameZh: "英式早餐茶",
              nameTh: "อิงลิชเบรกฟาสต์",
              price: 7500,
              descKo: "진하고 묵직한 홍차",
              descEn: "Rich, full-bodied black tea",
              descJa: "コク深い紅茶",
              descZh: "浓郁醇厚红茶",
              descTh: "ชาดำเข้มข้น",
            },
            {
              nameKo: "자스민",
              nameEn: "Jasmine",
              nameJa: "ジャスミン",
              nameZh: "茉莉花茶",
              nameTh: "จัสมิน",
              price: 7500,
              descKo: "자스민 꽃향 녹차",
              descEn: "Jasmine-scented green tea",
              descJa: "ジャスミン香る緑茶",
              descZh: "茉莉花香绿茶",
              descTh: "ชาเขียวกลิ่นมะลิ",
            },
            {
              nameKo: "레몬스카이",
              nameEn: "Lemon Sky",
              nameJa: "レモンスカイ",
              nameZh: "柠檬天空",
              nameTh: "เลมอนสกาย",
              price: 7500,
              badge: "decaf",
              descKo: "상큼한 레몬 과일차",
              descEn: "Zesty lemon fruit tea",
              descJa: "爽やかなレモンフルーツティー",
              descZh: "清新柠檬果茶",
              descTh: "ชาผลไม้เลมอนสดชื่น",
            },
            {
              nameKo: "카모마일",
              nameEn: "Camomile",
              nameJa: "カモミール",
              nameZh: "洋甘菊",
              nameTh: "คาโมมายล์",
              price: 7500,
              badge: "decaf",
              descKo: "향긋한 카모마일 허브차",
              descEn: "Fragrant chamomile herbal tea",
              descJa: "香り豊かなカモミールティー",
              descZh: "香甜洋甘菊花草茶",
              descTh: "ชาสมุนไพรคาโมมายล์หอม",
            },
            {
              nameKo: "윈터드림",
              nameEn: "Winter Dream",
              nameJa: "ウィンタードリーム",
              nameZh: "冬日梦境",
              nameTh: "วินเทอร์ดรีม",
              price: 7500,
              badge: "decaf",
              descKo: "오렌지·시나몬향 루이보스",
              descEn: "Orange-cinnamon rooibos tea",
              descJa: "オレンジ・シナモン香るルイボス",
              descZh: "橙香肉桂路易波士茶",
              descTh: "ชารอยบอสกลิ่นส้มอบเชย",
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
              nameTh: "เอเดมะตูม",
              price: 7500,
            },
            {
              nameKo: "딸기에이드",
              nameEn: "Strawberry Ade",
              nameJa: "いちごエード",
              nameZh: "草莓气泡饮",
              nameTh: "เอเดสตรอว์เบอร์รี",
              price: 7500,
            },
            {
              nameKo: "레몬에이드",
              nameEn: "Lemon Ade",
              nameJa: "レモネード",
              nameZh: "柠檬气泡饮",
              nameTh: "เอเดเลมอน",
              price: 7500,
            },
            {
              nameKo: "자몽에이드",
              nameEn: "Grapefruit Ade",
              nameJa: "グレープフルーツエード",
              nameZh: "西柚气泡饮",
              nameTh: "เอเดเกรปฟรุต",
              price: 7500,
            },
            {
              nameKo: "패션후르츠에이드",
              nameEn: "Passionfruit Ade",
              nameJa: "パッションフルーツエード",
              nameZh: "百香果气泡饮",
              nameTh: "เอเดเสาวรส",
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
              nameTh: "สตรอว์เบอร์รีลาเต้",
              price: 7000,
              badge: "ice",
            },
            {
              nameKo: "자색고구마라떼",
              nameEn: "Purple Sweet Potato Latte",
              nameJa: "紫芋ラテ",
              nameZh: "紫薯拿铁",
              nameTh: "ลาเต้มันม่วง",
              price: 7000,
            },
            {
              nameKo: "단호박라떼",
              nameEn: "Sweet Pumpkin Latte",
              nameJa: "かぼちゃラテ",
              nameZh: "南瓜拿铁",
              nameTh: "ลาเต้ฟักทอง",
              price: 7000,
            },
            {
              nameKo: "초코라떼",
              nameEn: "Choco Latte",
              nameJa: "チョコラテ",
              nameZh: "巧克力拿铁",
              nameTh: "ช็อกโกแลตลาเต้",
              price: 7000,
            },
            {
              nameKo: "팥라떼",
              nameEn: "Red Bean Latte",
              nameJa: "あずきラテ",
              nameZh: "红豆拿铁",
              nameTh: "ลาเต้ถั่วแดง",
              price: 7000,
            },
            {
              nameKo: "진저라떼",
              nameEn: "Ginger Latte",
              nameJa: "ジンジャーラテ",
              nameZh: "姜味拿铁",
              nameTh: "ขิงลาเต้",
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
              nameTh: "ชามะตูม",
              price: 6500,
            },
            {
              nameKo: "레몬차",
              nameEn: "Lemon Tea",
              nameJa: "レモンティー",
              nameZh: "柠檬茶",
              nameTh: "ชาเลมอน",
              price: 6500,
            },
            {
              nameKo: "자몽차",
              nameEn: "Grapefruit Tea",
              nameJa: "グレープフルーツティー",
              nameZh: "西柚茶",
              nameTh: "ชาเกรปฟรุต",
              price: 6500,
            },
            {
              nameKo: "패션후르츠차",
              nameEn: "Passionfruit Tea",
              nameJa: "パッションフルーツティー",
              nameZh: "百香果茶",
              nameTh: "ชาเสาวรส",
              price: 6500,
            },
            {
              nameKo: "생강차",
              nameEn: "Ginger Tea",
              nameJa: "生姜茶",
              nameZh: "姜茶",
              nameTh: "ชาขิง",
              price: 6500,
              badge: "hot",
            },
            {
              nameKo: "레몬생강차",
              nameEn: "Lemon Ginger Tea",
              nameJa: "レモンジンジャーティー",
              nameZh: "柠檬姜茶",
              nameTh: "ชาเลมอนขิง",
              price: 6500,
              badge: "hot",
            },
            {
              nameKo: "아이스티",
              nameEn: "Iced Tea",
              nameJa: "アイスティー",
              nameZh: "冰红茶",
              nameTh: "ชาเย็น",
              price: 6000,
              badge: "ice",
            },
            {
              nameKo: "아샷추",
              nameEn: "Ashatchu / Peach iced tea with espresso",
              nameJa: "アイスティーエスプレッソ",
              nameZh: "冰茶特调(加浓缩咖啡)",
              nameTh: "ชาเย็นพีชผสมเอสเปรสโซ",
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
          descKo:
            "브레드, 베이컨, 소세지 2종, 스크램블에그, 샐러드,\n방울토마토, 리코타치즈, 베이크드빈, 블랙올리브",
          layout: "side-right bleed-right ov-1 z3 p-xl",
          image: "images/platter-gwicheon.jpg",
          alt: "귀천플래터",
        },
        {
          id: "noeul",
          nameKo: "노을플래터",
          price: 20000,
          eyebrow: "Classic",
          descKo:
            "김치볶음밥, 계란후라이, 버섯, 샐러드, 방울토마토,\n리코타치즈, 베이크드빈, 블랙올리브",
          layout: "side-left bleed-left ov-2 z2 p-xl",
          image: "images/platter-noeul.jpg",
          alt: "노을플래터",
          callout: {
            title: "플래터 세트",
            lines: ["음료 +5,000", "탄산 +3,000"],
          },
        },
        {
          id: "sopung",
          nameKo: "소풍플래터",
          price: 20000,
          eyebrow: "Fresh",
          descKo:
            "프렌치토스트, 풀드포크, 샐러드, 방울토마토,\n리코타치즈, 베이크드빈, 블랙올리브",
          layout: "side-right bleed-right-md ov-3 z3 p-xl",
          image: "images/platter-sopung.jpg?v=20260804as",
          alt: "소풍플래터",
        },
        {
          id: "brownie",
          nameKo: "아이스크림브라우니",
          price: 13000,
          eyebrow: "Sweet",
          descKo:
            "쫀득쫀득한 초콜릿 브라우니와 함께\n달달한 초코시럽과 딸기시럽으로 실패 할 수 없는 조합!\n추가로 진한 바닐라 아이스크림이 곁들여진 디저트",
          layout: "side-left bleed-left-sm ov-4 z2 p-l",
          image: "images/dessert-brownie.jpg?v=20260804at",
          alt: "아이스크림브라우니",
        },
        {
          id: "croffle",
          nameKo: "아이스크림크로플",
          price: 16000,
          eyebrow: "Dessert",
          descKo:
            "프랑스산 버터를 사용하여 더욱 고소한 크로플과 함께\n진한 바닐라 아이스크림과 브라운치즈가 곁들여진\n단짠단짠의 진수를 보여주는 카페귀천의 시그니쳐 디저트",
          layout: "side-right bleed-right-sm ov-5 z3 p-l",
          image: "images/dessert-croffle.jpg",
          alt: "아이스크림크로플",
        },
      ],
    },
    menu3: {
      id: "menu3",
      layout: "summer-cards",
      label: "Summer",
      basePage: "menu1",
      signatureId: "signature",
      rows: [
        ["coffee", "latte"],
        ["ronnefeldt-tea", "tea-beverages"],
        ["handmade-ade", "smoothie"],
      ],
      titleOverrides: {
        signature: "SIGNATURE",
        coffee: "COFFEE",
        latte: "LATTE",
        "ronnefeldt-tea": "Ronnefeldt Tea",
        "handmade-ade": "Fruit Ade",
        "tea-beverages": "Tea",
        smoothie: "Smoothie",
      },
      extraCategories: [
        {
          id: "smoothie",
          titleEn: "Smoothie",
          items: [
            {
              nameKo: "블루베리",
              nameEn: "Blueberry",
              nameJa: "ブルーベリー",
              nameZh: "蓝莓",
              nameTh: "บลูเบอร์รี",
              price: 7000,
            },
            {
              nameKo: "망고",
              nameEn: "Mango",
              nameJa: "マンゴー",
              nameZh: "芒果",
              nameTh: "มะม่วง",
              price: 7000,
            },
            {
              nameKo: "딸기레몬",
              nameEn: "Strawberry Lemon",
              nameJa: "いちごレモン",
              nameZh: "草莓柠檬",
              nameTh: "สตรอว์เบอร์รีเลมอน",
              price: 7000,
            },
            {
              nameKo: "쿠앤크",
              nameEn: "Cookies & Cream",
              nameJa: "クッキーアンドクリーム",
              nameZh: "奥利奥",
              nameTh: "คุกกี้แอนด์ครีม",
              price: 7000,
            },
          ],
        },
      ],
    },
  };

  const BADGE_LABELS = {
    ice: "ICE only",
    hot: "HOT only",
    decaf: "Decaf",
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

  const renderI18nFields = (item, fieldMap, extraClass = "", { skipKeys = [] } = {}) => {
    const langs = [
      fieldMap.ko
        ? { key: "ko", text: cleanText(item[fieldMap.ko] || item.desc) }
        : null,
      { key: "en", text: cleanText(item[fieldMap.en]) },
      { key: "ja", text: cleanText(item[fieldMap.ja]) },
      { key: "zh", text: cleanText(item[fieldMap.zh]) },
      { key: "th", text: cleanText(item[fieldMap.th]) },
    ].filter((entry) => entry && entry.text && !skipKeys.includes(entry.key));

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

    const className = ["classic-item__i18n", extraClass].filter(Boolean).join(" ");

    return `
      <p class="${className}" data-i18n aria-live="polite">
        ${spans}
      </p>
    `;
  };

  const renderI18nLine = (item, { skipEn = false } = {}) =>
    renderI18nFields(
      item,
      {
        en: "nameEn",
        ja: "nameJa",
        zh: "nameZh",
        th: "nameTh",
      },
      "",
      { skipKeys: skipEn ? ["en"] : [] }
    );

  const renderDescBlock = (item) =>
    renderI18nFields(
      item,
      {
        ko: "descKo",
        en: "descEn",
        ja: "descJa",
        zh: "descZh",
        th: "descTh",
      },
      "classic-item__i18n--desc"
    );

  const renderMenuItem = (item, index, { enBeside = false } = {}) => {
    const delay = Math.min(index * 35, 700);
    const bestClass = item.best ? " is-best" : "";
    const nameI18n = enBeside
      ? renderI18nFields(
          item,
          {
            en: "nameEn",
            ja: "nameJa",
            zh: "nameZh",
            th: "nameTh",
          },
          "classic-item__i18n--beside"
        )
      : renderI18nLine(item);

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
              ${enBeside ? nameI18n : ""}
              ${renderBadge(item.badge)}
            </div>
            ${enBeside ? "" : nameI18n}
            ${renderDescBlock(item)}
          </div>
          <span class="classic-item__price">${formatPrice(item.price)}</span>
        </div>
      </li>
    `;
  };

  const renderCategory = (category, categoryIndex) => {
    if (!category) return "";

    const enBeside = category.id === "ronnefeldt-tea";
    const itemsHtml = category.items
      .map((item, i) =>
        renderMenuItem(item, categoryIndex * 8 + i, { enBeside })
      )
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
    const desc = String(item.descKo ?? "")
      .replace(/[^\S\n]+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();
    const descHtml = desc
      ? `<p class="platter-item__desc">${escapeHtml(desc).replaceAll("\n", "<br>")}</p>`
      : "";
    const callout = item.callout;
    const calloutLines = Array.isArray(callout?.lines)
      ? callout.lines
      : callout?.body
        ? [callout.body]
        : [];
    const calloutHtml = callout
      ? `<aside class="platter-item__callout" aria-label="${escapeHtml(callout.title)}">
          <p class="platter-item__callout-title">${escapeHtml(callout.title)}</p>
          <div class="platter-item__callout-body">
            ${calloutLines
              .map(
                (line) =>
                  `<p class="platter-item__callout-line">${escapeHtml(line)}</p>`
              )
              .join("")}
          </div>
        </aside>`
      : "";
    const calloutClass = callout ? " has-callout" : "";

    return `
      <article
        class="platter-item ${layout}${calloutClass}"
        data-menu-item
        data-platter="${escapeHtml(item.id)}"
      >
        <div class="platter-item__plate-col">
          ${calloutHtml}
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
          ${descHtml}
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
      window.PlatterFx?.start(root);
    });
  };

  const SUMMER_BADGE_LABELS = {
    ice: "Only Ice",
    hot: "Only Hot",
    decaf: "Decaf",
  };

  const renderSummerBadge = (badge) => {
    if (!badge || !SUMMER_BADGE_LABELS[badge]) return "";
    return `<span class="summer-tag summer-tag--${badge}">${SUMMER_BADGE_LABELS[badge]}</span>`;
  };

  const getSummerCategories = (page) => {
    const base = page.basePage ? MENU_PAGES[page.basePage] : null;
    const baseCats = base?.categories ? [...base.categories] : [];
    const extra = Array.isArray(page.extraCategories) ? page.extraCategories : [];
    return [...baseCats, ...extra];
  };

  const summerTitle = (page, category) => {
    const override = page.titleOverrides?.[category.id];
    return override || category.titleEn || category.id;
  };

  const renderSummerSignature = (page, category) => {
    if (!category) return "";
    const items = category.items
      .map(
        (item) => `
      <li class="summer-list__item" data-menu-item>
        <div class="summer-list__name">
          <span class="summer-list__ko">${escapeHtml(item.nameKo)}</span>
          ${renderI18nLine(item)}
        </div>
        <span class="summer-list__price">${formatPrice(item.price)}</span>
      </li>`
      )
      .join("");

    return `
      <section class="summer-section summer-section--signature">
        <div class="summer-section__head">
          <h2 class="summer-section__title">${escapeHtml(summerTitle(page, category))}</h2>
          <span class="summer-section__rule" aria-hidden="true"></span>
        </div>
        <div class="summer-card">
          <ul class="summer-list summer-sig-list">${items}</ul>
        </div>
      </section>
    `;
  };

  const renderSummerListCategory = (page, category) => {
    if (!category) return "";
    const note = category.footnote
      ? `<span class="summer-section__note">${escapeHtml(category.footnote)}</span>`
      : "";
    const items = category.items
      .map(
        (item) => `
      <li class="summer-list__item" data-menu-item>
        <div class="summer-list__name">
          <span class="summer-list__ko">${escapeHtml(item.nameKo)}</span>
          ${renderI18nLine(item)}
          ${renderSummerBadge(item.badge)}
        </div>
        <span class="summer-list__price">${formatPrice(item.price)}</span>
      </li>`
      )
      .join("");

    return `
      <div class="summer-col">
        <div class="summer-section__head">
          <h2 class="summer-section__title">${escapeHtml(summerTitle(page, category))}</h2>
          ${note}
          <span class="summer-section__rule" aria-hidden="true"></span>
        </div>
        <div class="summer-card">
          <ul class="summer-list">${items}</ul>
        </div>
      </div>
    `;
  };

  const renderSummerPage = (page) => {
    const root = document.getElementById("menu-root");
    if (!root) return;

    const byId = Object.fromEntries(
      getSummerCategories(page).map((category) => [category.id, category])
    );
    const signatureHtml = renderSummerSignature(page, byId[page.signatureId]);
    const rowsHtml = (page.rows || [])
      .map((pair) => {
        const cols = pair
          .map((id) => renderSummerListCategory(page, byId[id]))
          .join("");
        return `
          <section class="summer-section summer-section--pair">
            <div class="summer-row">${cols}</div>
          </section>
        `;
      })
      .join("");

    root.innerHTML = `
      <div class="summer-menu">
        ${signatureHtml}
        ${rowsHtml}
      </div>
    `;

    requestAnimationFrame(() => {
      root.classList.add("is-ready");
      startI18nRotation(root);
    });
  };

  const renderPage = (page) => {
    if (page.layout === "platter") {
      renderPlatterPage(page);
      return;
    }

    if (page.layout === "summer-cards") {
      renderSummerPage(page);
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
      ".menu-classic, .menu-board, .platter-board, .summer-board"
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
      ".menu-classic, .menu-board, .platter-board, .summer-board"
    );
    const pageId = board?.dataset.page || "menu1";
    initMenuPage(pageId);
  });
})();
