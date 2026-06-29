/* ============================================================
   ЮГ ЕвроИнвест — общий скрипт (header/footer/корзина/формы/каталог)
   Подключается на КАЖДОЙ странице.
   ============================================================ */

/* === URL Google Apps Script (приём заявок) === */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4vXkFN6EHo-KIXozkqrAvS43lJ6qbJiUsIuHPwnjORBgeSk-9_Rro9jS846a2n3o/exec";

/* ============================================================
   КАТАЛОГ
   img       — локальная картинка (положите файл с этим именем в assets/)
   fallback  — резервная картинка, пока локальной нет
   ============================================================ */
const CATEGORIES = [
  {
    id: "metalloprokat", name: "Металлопрокат (общий раздел)",
    img: "assets/catalog/metalloprokat.jpg",
    fallback: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    desc: "Полный ассортимент металлопроката для строительства, производства и промышленности.",
    products: [
      { name: "Металлопрокат (общий)", slug: "metalloprokat", unit: "тонн", sizes: ["По запросу"] }
    ]
  },
  {
    id: "sortovoy", name: "Сортовой прокат",
    img: "assets/catalog/sortovoy.jpg",
    fallback: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80",
    desc: "Используется для армирования бетона, создания несущих конструкций, в машиностроении.",
    products: [
      { name: "Арматура", slug: "armatura", unit: "тонн", sizes: ["6 мм","8 мм","10 мм","12 мм","14 мм","16 мм","18 мм","20 мм","25 мм","32 мм","40 мм"] },
      { name: "Балка", slug: "balka", unit: "тонн", sizes: ["10Б1","12Б1","16Б1","20Б1","25Б1","30Б1"] },
      { name: "Швеллер", slug: "shveller", unit: "тонн", sizes: ["№5","№6.5","№8","№10","№12","№14","№16","№18","№20"] },
      { name: "Уголок", slug: "ugolok", unit: "тонн", sizes: ["25x25","32x32","40x40","50x50","63x63","75x75","100x100"] },
      { name: "Круг", slug: "krug", unit: "тонн", sizes: ["10 мм","12 мм","16 мм","20 мм","25 мм","30 мм","40 мм","50 мм"] },
      { name: "Полоса", slug: "polosa", unit: "тонн", sizes: ["20x4","40x4","50x5","60x6","80x8","100x10"] }
    ]
  },
  {
    id: "listovoy", name: "Листовой прокат",
    img: "assets/catalog/listovoy.jpg",
    fallback: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    desc: "Применяется для обшивки зданий, изготовления ёмкостей, кровли, в судостроении.",
    products: [
      { name: "Лист г/к (горячекатаный)", slug: "list-gk", unit: "листов", sizes: ["2 мм","3 мм","4 мм","5 мм","6 мм","8 мм","10 мм","12 мм","16 мм","20 мм"] },
      { name: "Лист х/к (холоднокатаный)", slug: "list-hk", unit: "листов", sizes: ["0.5 мм","0.7 мм","0.8 мм","1 мм","1.5 мм","2 мм","2.5 мм","3 мм"] },
      { name: "Лист оцинкованный", slug: "list-ocinkovannyy", unit: "листов", sizes: ["0.4 мм","0.5 мм","0.7 мм","1 мм","1.5 мм","2 мм"] },
      { name: "Профнастил", slug: "profnastil", unit: "листов", sizes: ["С8","С10","С21","НС35","Н60","Н75"] },
      { name: "Рифлёный лист", slug: "list-riflenyy", unit: "листов", sizes: ["3 мм","4 мм","5 мм","6 мм","8 мм"] }
    ]
  },
  {
    id: "nerzh", name: "Нержавеющий металл",
    img: "assets/catalog/nerzh.jpg",
    fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    desc: "Для пищевой, химической промышленности, декоративных и антикоррозийных конструкций.",
    products: [
      { name: "Лист нержавеющий", slug: "nerzh-list", unit: "листов", sizes: ["0.5 мм","1 мм","1.5 мм","2 мм","3 мм","4 мм","5 мм"] },
      { name: "Трубы нержавеющие", slug: "nerzh-truby", unit: "метров", sizes: ["20x20","25x25","40x40","Ø20","Ø32","Ø57","Ø76"] },
      { name: "Круг нержавеющий", slug: "nerzh-krug", unit: "тонн", sizes: ["10 мм","16 мм","20 мм","30 мм","40 мм"] },
      { name: "Полоса нержавеющая", slug: "nerzh-polosa", unit: "тонн", sizes: ["20x3","40x4","50x5","60x6"] }
    ]
  },
  {
    id: "metizy", name: "Метизы",
    img: "assets/catalog/metizy.jpg",
    fallback: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    desc: "Крепёж для любых соединений: от строительства до мелкого монтажа.",
    products: [
      { name: "Болты", slug: "bolty", unit: "шт", sizes: ["М6","М8","М10","М12","М16","М20","М24"] },
      { name: "Гайки", slug: "gayki", unit: "шт", sizes: ["М6","М8","М10","М12","М16","М20","М24"] },
      { name: "Шайбы", slug: "shayby", unit: "шт", sizes: ["М6","М8","М10","М12","М16","М20"] },
      { name: "Анкера", slug: "ankera", unit: "шт", sizes: ["М8","М10","М12","М16"] },
      { name: "Заклёпки", slug: "zaklepki", unit: "шт", sizes: ["3.2x8","4x10","4.8x12","6.4x16"] }
    ]
  },
  {
    id: "truby", name: "Трубы",
    img: "assets/catalog/truby.jpg",
    fallback: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    desc: "Для систем отопления, водоснабжения, газопроводов, строительных лесов.",
    products: [
      { name: "Трубы г/д (горячедеформированные)", slug: "truby-gd", unit: "метров", sizes: ["Ø57","Ø76","Ø89","Ø108","Ø133","Ø159"] },
      { name: "Трубы ВГП (водогазопроводные)", slug: "truby-vgp", unit: "метров", sizes: ["Ду15","Ду20","Ду25","Ду32","Ду40","Ду50"] },
      { name: "Трубы профильные", slug: "truby-profilnye", unit: "метров", sizes: ["20x20","40x20","40x40","60x40","80x80","100x100"] },
      { name: "Трубы электросварные", slug: "truby-elektrosvarnye", unit: "метров", sizes: ["Ø20","Ø32","Ø42","Ø57","Ø76","Ø108"] },
      { name: "Трубы оцинкованные", slug: "truby-ocinkovannye", unit: "метров", sizes: ["Ду15","Ду20","Ду25","Ду32","Ду40"] }
    ]
  },
  {
    id: "cvetnoy", name: "Цветной металл",
    img: "assets/catalog/cvetnoy.jpg",
    fallback: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
    desc: "Алюминий, медь, латунь — для электротехники, сантехники, архитектурных решений.",
    products: [
      { name: "Алюминий (лист/профиль)", slug: "aluminiy", unit: "кг", sizes: ["Лист","Уголок","Труба","Профиль"] },
      { name: "Медь", slug: "med", unit: "кг", sizes: ["Лист","Круг","Труба","Шина"] },
      { name: "Латунь", slug: "latun", unit: "кг", sizes: ["Лист","Круг","Труба","Полоса"] }
    ]
  },
  {
    id: "krw", name: "Подшипники KRW",
    img: "assets/catalog/krw.jpg",
    fallback: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    desc: "Прецизионные немецкие подшипники для промышленного оборудования.",
    products: [
      { name: "Подшипники KRW", slug: "podshipniki-krw", unit: "шт", sizes: ["6200","6201","6202","6204","6206","6208","6210","Под заказ"] }
    ]
  }
];

/* ===== УТИЛИТЫ ===== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const WA = "https://wa.me/77774071772";
function imgTag(src, fallback, cls, alt) {
  return `<img class="${cls}" src="${src}" alt="${alt || ''}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

/* ===== СОСТОЯНИЕ ===== */
let cart = JSON.parse(localStorage.getItem("yei_cart") || "[]");

/* ===== ШАПКА / ПОДВАЛ / МОДАЛКИ (инжектятся на всех страницах) ===== */
const NAV = [
  { href: "index.html", label: "Главная" },
  { href: "catalog.html", label: "Каталог" },
  { href: "company.html", label: "Компания" },
  { href: "services.html", label: "Услуги" },
  { href: "contacts.html", label: "Контакты" }
];
const PAGE = (location.pathname.split("/").pop() || "index.html") || "index.html";

const WA_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.515 5.26l-.999 3.648 3.973-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;

function headerHTML() {
  const links = NAV.map(n => `<a href="${n.href}" class="${n.href === PAGE ? 'active' : ''}">${n.label}</a>`).join("");
  return `
  <header class="header" id="top">
    <div class="container header__inner">
      <a href="index.html" class="logo">
        <img src="assets/logo.png" alt="ЮГ ЕвроИнвест" class="logo__img" onerror="this.style.display='none'" />
        <span class="logo__text">ЮГ&nbsp;ЕвроИнвест<small>торговая компания</small></span>
      </a>
      <nav class="nav" id="nav">${links}</nav>
      <div class="header__actions">
        <div class="header__contacts">
          <a href="tel:+77774071772" class="header__phone">+7 (777) 407-17-72</a>
          <a href="${WA}" target="_blank" rel="noopener" class="icon-btn icon-btn--wa" title="WhatsApp" aria-label="WhatsApp">${WA_SVG}</a>
        </div>
        <button class="btn btn--ghost btn--call" data-open="callModal">Заказать звонок</button>
        <button class="cart-btn" id="cartBtn" aria-label="Корзина">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          <span class="cart-btn__count" id="cartCount">0</span>
        </button>
        <div class="city-switch" id="citySwitch">
          <button type="button" class="city-switch__btn" id="cityBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Город доставки">
            <span class="city-switch__pin">📍</span>
            <span class="city-switch__current" id="cityCurrent">Алматы</span>
            <svg class="city-switch__chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <ul class="city-switch__menu" id="cityMenu" role="listbox">
            <li class="city-switch__opt" role="option" data-city="Алматы"><span>Алматы</span><svg class="city-switch__check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></li>
            <li class="city-switch__opt" role="option" data-city="Астана"><span>Астана</span><svg class="city-switch__check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></li>
          </ul>
        </div>
        <button class="burger" id="burger" aria-label="Меню"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;
}

function footerHTML() {
  return `
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__col">
        <span class="logo__text logo__text--footer">ЮГ&nbsp;ЕвроИнвест<small>торговая компания</small></span>
        <p>Поставщик металлопроката в Казахстане. Доставка в Алматы и Астану.</p>
      </div>
      <div class="footer__col"><h4>Контакты</h4>
        <a href="tel:+77774071772">+7 (777) 407-17-72</a>
        <a href="mailto:zakaz.yugeuroinvest.kz@mail.ru">zakaz.yugeuroinvest.kz@mail.ru</a>
        <a href="${WA}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <div class="footer__col"><h4>Разделы</h4>
        <a href="catalog.html">Каталог</a><a href="company.html">Компания</a>
        <a href="services.html">Услуги</a><a href="#" data-open="privacyModal">Политика конфиденциальности</a>
        <button class="btn btn--ghost" data-open="callModal">Заказать звонок</button>
      </div>
    </div>
    <div class="footer__bottom"><div class="container">© <span id="year"></span> ЮГ ЕвроИнвест. Все права защищены.</div></div>
  </footer>
  <a href="${WA}" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp">${WA_SVG}</a>`;
}

function overlaysHTML() {
  return `
  <div class="drawer-overlay" id="cartOverlay"></div>
  <aside class="cart-drawer" id="cartDrawer" aria-hidden="true">
    <div class="cart-drawer__head"><h3>Корзина</h3><button class="close-btn" id="cartClose">×</button></div>
    <div class="cart-note">Цена будет озвучена менеджером при консультации с учётом объёма, города доставки и текущих условий.</div>
    <div class="cart-drawer__body" id="cartItems"></div>
    <div class="cart-drawer__foot">
      <p class="cart-empty" id="cartEmpty">Корзина пуста. Добавьте товары из каталога.</p>
      <button class="btn btn--gold btn--block" id="checkoutBtn" disabled>Оформить заказ</button>
    </div>
  </aside>

  <div class="modal" id="checkoutModal"><div class="modal__box">
    <button class="close-btn" data-close>×</button><h3>Оформление заказа</h3>
    <p class="modal__note">Менеджер свяжется с вами для расчёта финальной стоимости в течение 15 минут после оформления заказа.</p>
    <form id="checkoutForm" novalidate>
      <label>ФИО <input type="text" name="fio" required></label>
      <label>Телефон * <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__"></label>
      <label>Email <input type="email" name="email" placeholder="необязательно"></label>
      <label>Город доставки <select name="city" id="checkoutCity"><option>Алматы</option><option>Астана</option></select></label>
      <label>Комментарий к заказу <textarea name="comment" rows="2" placeholder="необязательно"></textarea></label>
      <div class="order-summary" id="orderSummary"></div>
      <button type="submit" class="btn btn--gold btn--block">Отправить заказ</button>
    </form></div></div>

  <div class="modal" id="callModal"><div class="modal__box">
    <button class="close-btn" data-close>×</button><h3>Заказать звонок</h3>
    <p class="modal__note">Оставьте контакты — перезвоним в ближайшее время.</p>
    <form id="callForm" novalidate>
      <label>Имя <input type="text" name="name" required></label>
      <label>Телефон * <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__"></label>
      <button type="submit" class="btn btn--gold btn--block">Жду звонка</button>
    </form></div></div>

  <div class="modal" id="consultModal"><div class="modal__box">
    <button class="close-btn" data-close>×</button><h3>Рассчитать стоимость</h3>
    <p class="modal__note">Оставьте контакты, и менеджер подберёт металл и рассчитает стоимость.</p>
    <form id="consultForm" novalidate>
      <label>Имя <input type="text" name="name" required></label>
      <label>Телефон * <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__"></label>
      <button type="submit" class="btn btn--gold btn--block">Получить консультацию</button>
    </form></div></div>

  <div class="modal" id="productModal"><div class="modal__box modal__box--lg">
    <button class="close-btn" data-close>×</button><div class="product" id="productContent"></div>
  </div></div>

  <div class="modal" id="privacyModal"><div class="modal__box modal__box--lg">
    <button class="close-btn" data-close>×</button><h3>Политика конфиденциальности</h3>
    <div class="privacy-text">
      <p>Настоящая Политика регулирует обработку персональных данных пользователей сайта ЮГ ЕвроИнвест в соответствии с Законом РК «О персональных данных и их защите».</p>
      <p>Оставляя данные (ФИО, телефон, email) через формы на сайте, пользователь даёт согласие на их обработку с целью оформления заявки, консультации и доставки заказа.</p>
      <p>Компания не передаёт персональные данные третьим лицам, кроме случаев, предусмотренных законодательством РК.</p>
    </div></div></div>

  <div class="toast" id="toast"><div class="toast__inner"><span id="toastMsg"></span></div></div>`;
}

/* ===== ГОРОД ===== */
function setCity(city) {
  localStorage.setItem("yei_city", city);
  const cur = $("#cityCurrent");
  if (cur) {
    if (cur.textContent !== city) { cur.classList.remove("flip"); void cur.offsetWidth; cur.classList.add("flip"); }
    cur.textContent = city;
  }
  $$("#cityMenu .city-switch__opt").forEach(o => o.classList.toggle("selected", o.dataset.city === city));
  if ($("#checkoutCity")) $("#checkoutCity").value = city;
}
function initCitySwitch() {
  const wrap = $("#citySwitch"), btn = $("#cityBtn"), menu = $("#cityMenu");
  if (!wrap) return;
  const close = () => { wrap.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
  const toggle = () => {
    const open = wrap.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };
  btn.addEventListener("click", e => { e.stopPropagation(); toggle(); });
  $$(".city-switch__opt", menu).forEach((opt, i) => {
    opt.style.setProperty("--i", i);
    opt.addEventListener("click", e => { e.stopPropagation(); setCity(opt.dataset.city); close(); });
  });
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ===== КОРЗИНА ===== */
function saveCart() { localStorage.setItem("yei_cart", JSON.stringify(cart)); renderCart(); }
function addItem(cat, product, size, qty) {
  const item = { id: cat.id + "|" + product.name + "|" + size, category: cat.name, name: product.name,
    size, qty, unit: product.unit, img: cat.img, fallback: cat.fallback };
  const ex = cart.find(c => c.id === item.id);
  if (ex) ex.qty += qty; else cart.push(item);
  saveCart();
  showToast(`«${product.name}» добавлен в корзину (${ex ? ex.qty : qty} ${product.unit}).`);
  openCart();
}
function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $$("#cartCount").forEach(e => { e.textContent = count; e.style.display = count ? "flex" : "none"; });
  const body = $("#cartItems"); if (!body) return;
  if (!cart.length) { body.innerHTML = ""; $("#cartEmpty").style.display = "block"; $("#checkoutBtn").disabled = true; return; }
  $("#cartEmpty").style.display = "none"; $("#checkoutBtn").disabled = false;
  body.innerHTML = cart.map((it, i) => `
    <div class="cart-item">
      ${imgTag(it.img, it.fallback, "cart-item__img")}
      <div class="cart-item__info">
        <h4>${it.name}</h4>
        <div class="cart-item__meta">${it.category.split(" (")[0]} • Размер: ${it.size}</div>
        <div class="cart-item__qty"><button data-dec="${i}">−</button><span>${it.qty} ${it.unit}</span><button data-inc="${i}">+</button></div>
        <button class="cart-item__remove" data-rm="${i}">Удалить</button>
      </div></div>`).join("");
  $$("[data-inc]", body).forEach(b => b.onclick = () => { cart[+b.dataset.inc].qty++; saveCart(); });
  $$("[data-dec]", body).forEach(b => b.onclick = () => { const it = cart[+b.dataset.dec]; if (it.qty > 1) it.qty--; saveCart(); });
  $$("[data-rm]", body).forEach(b => b.onclick = () => { cart.splice(+b.dataset.rm, 1); saveCart(); });
}
function openCart() { $("#cartDrawer").classList.add("open"); $("#cartOverlay").classList.add("open"); }
function closeCart() { $("#cartDrawer").classList.remove("open"); $("#cartOverlay").classList.remove("open"); }

/* ===== МОДАЛКИ ===== */
function openModal(id) { $("#" + id).classList.add("open"); }
function closeModal(id) { $("#" + id).classList.remove("open"); }

/* ===== МОДАЛКА ТОВАРА ===== */
function openProduct(catIndex, prodIndex = 0) {
  const cat = CATEGORIES[catIndex];
  let product = cat.products[prodIndex];
  const subs = cat.products.length > 1
    ? `<div class="product__subs">${cat.products.map((p, i) => `<span class="sub-chip ${i === prodIndex ? 'active' : ''}" data-p="${i}">${p.name}</span>`).join("")}</div>` : "";
  $("#productContent").innerHTML = `
    ${imgTag(cat.img, cat.fallback, "product__img", cat.name)}
    <div>
      <h3 class="product__title" id="prodTitle">${product.name}</h3>
      <p class="product__desc">${cat.desc}</p>${subs}
      <div class="product__field"><label>Размер / диаметр</label><select id="sizeSelect"></select></div>
      <div class="product__field"><label>Количество</label>
        <div class="qty-row"><input type="number" id="qtyInput" min="1" value="1"><select id="unitSelect"><option id="unitOpt"></option></select></div>
      </div>
      <div class="product__price-note">Цена будет рассчитана индивидуально после консультации. Оставьте заявку, и менеджер свяжется с вами.</div>
      <button class="btn btn--gold btn--block" id="addToCartBtn">Добавить в корзину</button>
    </div>`;
  const fillSizes = () => { $("#sizeSelect").innerHTML = product.sizes.map(s => `<option>${s}</option>`).join(""); $("#unitOpt").textContent = product.unit; };
  $$(".sub-chip", $("#productContent")).forEach(chip => chip.onclick = () => {
    $$(".sub-chip").forEach(c => c.classList.remove("active")); chip.classList.add("active");
    product = cat.products[+chip.dataset.p]; $("#prodTitle").textContent = product.name; fillSizes();
  });
  fillSizes();
  $("#addToCartBtn").onclick = () => { const qty = Math.max(1, parseInt($("#qtyInput").value) || 1); addItem(cat, product, $("#sizeSelect").value, qty); closeModal("productModal"); };
  openModal("productModal");
}

/* ===== ОФОРМЛЕНИЕ ===== */
function openCheckout() {
  if (!cart.length) return;
  setCity(localStorage.getItem("yei_city") || "Алматы");
  $("#orderSummary").innerHTML = `<h4>Ваш заказ:</h4>` + cart.map(i => `<div class="os-item"><span>${i.name} (${i.size})</span><span>${i.qty} ${i.unit}</span></div>`).join("");
  closeCart(); openModal("checkoutModal");
}
const cartToText = () => cart.map(i => `${i.name} [${i.size}] — ${i.qty} ${i.unit}`).join("; ");

/* ===== ОТПРАВКА ===== */
async function sendToSheet(payload) {
  if (!GOOGLE_SCRIPT_URL) { console.warn("GOOGLE_SCRIPT_URL не задан:", payload); return true; }
  try {
    await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
    return true;
  } catch (e) { console.error(e); return false; }
}
const validPhone = v => v.replace(/\D/g, "").length >= 10;

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg) {
  $("#toastMsg").textContent = msg; $("#toast").classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 5000);
}

/* ===== АНИМАЦИИ ПОЯВЛЕНИЯ ===== */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}
function autoReveal() {
  // помечаем типовые блоки как .reveal со ступенчатой задержкой
  $$(".feature, .cat-card, .product-card, .step, .service-card, .info-card").forEach((el, i) => {
    el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 0.08 + "s";
  });
}

/* ===== ОБЩАЯ ИНИЦИАЛИЗАЦИЯ ===== */
document.addEventListener("DOMContentLoaded", () => {
  // инжект общих элементов
  const h = $("#site-header"); if (h) h.innerHTML = headerHTML();
  const f = $("#site-footer"); if (f) f.innerHTML = footerHTML();
  const o = document.createElement("div"); o.innerHTML = overlaysHTML(); document.body.appendChild(o);

  if ($("#year")) $("#year").textContent = new Date().getFullYear();
  initCitySwitch();
  setCity(localStorage.getItem("yei_city") || "Алматы");
  renderCart();

  $("#cartBtn").onclick = openCart;
  $("#cartClose").onclick = closeCart;
  $("#cartOverlay").onclick = closeCart;
  $("#checkoutBtn").onclick = openCheckout;
  $("#burger").onclick = () => $("#nav").classList.toggle("open");
  $$("#nav a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));

  $$("[data-open]").forEach(b => b.onclick = () => openModal(b.dataset.open));
  $$(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) m.classList.remove("open"); }));
  $$("[data-close]").forEach(b => b.onclick = () => b.closest(".modal").classList.remove("open"));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { $$(".modal.open").forEach(m => m.classList.remove("open")); closeCart(); } });

  // формы
  $("#checkoutForm").addEventListener("submit", async e => {
    e.preventDefault(); const f = e.target;
    if (!f.fio.value.trim()) return showToast("Укажите ФИО.");
    if (!validPhone(f.phone.value)) return showToast("Укажите корректный телефон.");
    const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Отправка…";
    await sendToSheet({ type: "order", date: new Date().toLocaleString("ru-RU"), fio: f.fio.value.trim(),
      phone: f.phone.value.trim(), email: f.email.value.trim(), city: f.city.value, items: cartToText(),
      comment: f.comment.value.trim(), status: "Новый" });
    cart = []; saveCart(); closeModal("checkoutModal"); f.reset(); btn.disabled = false; btn.textContent = "Отправить заказ";
    showToast("Спасибо! Ваш заказ передан менеджеру. Мы свяжемся с вами в ближайшее время для уточнения цены и сроков доставки.");
  });
  $("#callForm").addEventListener("submit", async e => {
    e.preventDefault(); const f = e.target;
    if (!validPhone(f.phone.value)) return showToast("Укажите корректный телефон.");
    const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Отправка…";
    await sendToSheet({ type: "call", date: new Date().toLocaleString("ru-RU"), name: f.name.value.trim(),
      phone: f.phone.value.trim(), city: localStorage.getItem("yei_city") || "Алматы", status: "Новый" });
    closeModal("callModal"); f.reset(); btn.disabled = false; btn.textContent = "Жду звонка";
    showToast("Спасибо! Мы перезвоним вам в ближайшее время.");
  });
  const handleConsult = async (f, btnText) => {
    if (!validPhone(f.phone.value)) return showToast("Укажите корректный телефон.");
    const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Отправка…";
    await sendToSheet({ type: "call", date: new Date().toLocaleString("ru-RU"), name: f.name.value.trim(),
      phone: f.phone.value.trim(), city: localStorage.getItem("yei_city") || "Алматы", status: "Новый (консультация)" });
    f.reset(); btn.disabled = false; btn.textContent = btnText;
    showToast("Спасибо! Менеджер свяжется с вами для расчёта стоимости.");
  };
  $("#consultForm").addEventListener("submit", e => { e.preventDefault(); handleConsult(e.target, "Получить консультацию"); closeModal("consultModal"); });
  const inline = $("#consultFormInline");
  if (inline) inline.addEventListener("submit", e => { e.preventDefault(); handleConsult(e.target, "Получить консультацию"); });

  // страничная логика
  if (typeof initPage === "function") initPage();

  autoReveal();
  initReveal();
});
