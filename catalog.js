/* ============================================================
   Логика страницы КАТАЛОГ (catalog.html)
   initPage() вызывается из app.js после инициализации.
   ============================================================ */
function initPage() {
  const grid = document.getElementById("catalogGrid");
  const view = document.getElementById("productsView");
  if (!grid) return;

  // 8 карточек категорий
  grid.innerHTML = CATEGORIES.map((c, i) => `
    <article class="cat-card" data-cat="${i}">
      <div class="cat-card__img" style="background-image:url('${c.img}'),url('${c.fallback}')"></div>
      <div class="cat-card__body">
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
        <span class="cat-card__count">${c.products.length} ${plural(c.products.length, "позиция", "позиции", "позиций")}</span>
        <span class="cat-card__link">Смотреть товары →</span>
      </div>
    </article>`).join("");

  grid.querySelectorAll(".cat-card").forEach(el =>
    el.addEventListener("click", () => showProducts(+el.dataset.cat)));

  function showProducts(catIndex) {
    const cat = CATEGORIES[catIndex];
    view.innerHTML = `
      <div class="products-view__head">
        <h3>${cat.name}</h3>
        <button class="back-btn" id="backBtn">← Все категории</button>
      </div>
      <div class="products-grid">
        ${cat.products.map((p, pi) => `
          <div class="product-card">
            <div class="product-card__imgwrap">
              <img src="${productImg(cat, p)}" alt="${p.name}" loading="lazy"
                   onerror="this.onerror=null;this.src='${cat.img}';this.onerror=function(){this.src='${cat.fallback}'}">
            </div>
            <div class="product-card__body">
              <h4>${p.name}</h4>
              <div class="product-card__row">
                <select data-size="${catIndex}-${pi}">${p.sizes.map(s => `<option>${s}</option>`).join("")}</select>
              </div>
              <div class="product-card__row">
                <input type="number" min="1" value="1" data-qty="${catIndex}-${pi}">
                <select disabled><option>${p.unit}</option></select>
              </div>
              <p class="pc-note">Цена — индивидуально после консультации.</p>
              <button class="btn btn--gold" data-add="${catIndex}-${pi}">Добавить в корзину</button>
            </div>
          </div>`).join("")}
      </div>`;

    // анимация появления карточек
    view.querySelectorAll(".product-card").forEach((el, i) => {
      el.classList.add("reveal"); el.style.transitionDelay = (i % 3) * 0.08 + "s";
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("visible")));
    });

    view.querySelector("#backBtn").onclick = () => {
      view.innerHTML = "";
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    view.querySelectorAll("[data-add]").forEach(btn => btn.onclick = () => {
      const [ci, pi] = btn.dataset.add.split("-").map(Number);
      const c = CATEGORIES[ci], p = c.products[pi];
      const size = view.querySelector(`[data-size="${ci}-${pi}"]`).value;
      const qty = Math.max(1, parseInt(view.querySelector(`[data-qty="${ci}-${pi}"]`).value) || 1);
      addItem(c, p, size, qty);
    });

    view.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function productImg(cat, p) {
  return "assets/products/" + p.slug + ".jpg";
}
function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}
