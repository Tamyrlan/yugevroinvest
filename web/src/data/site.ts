export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw4vXkFN6EHo-KIXozkqrAvS43lJ6qbJiUsIuHPwnjORBgeSk-9_Rro9jS846a2n3o/exec";

export const CONTACTS = {
  phone: "+7 (777) 407-17-72",
  phoneRaw: "+77774071772",
  email: "zakaz.yugeuroinvest.kz@mail.ru",
  whatsapp: "https://wa.me/77755399981",
  twogis: "https://go.2gis.com/CCKUE",
  cities: ["Алматы", "Астана"],
};

export const NAV = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/company", label: "Компания" },
  { href: "/services", label: "Услуги" },
  { href: "/contacts", label: "Контакты" },
];

export interface Product {
  name: string;
  slug: string;
  unit: string;
  sizes: string[];
}

export interface Category {
  id: string;
  name: string;
  img: string;
  desc: string;
  products: Product[];
}

const IMG = {
  metalloprokat: "/images/metalloprocat.jpg",
  sortovoy: "/images/sortovoy.jpg",
  listovoy: "/images/listovoy.jpg",
  nerzh: "/images/nerjaveuchayastal.jpg",
  metizy: "/images/metizy.jpg",
  truby: "/images/truby.jpg",
  cvetnoy: "/images/7.webp",
  krw: "/images/KRW.jpg",
};

export const CATEGORIES: Category[] = [
  {
    id: "metalloprokat",
    name: "Металлопрокат (общий раздел)",
    img: IMG.metalloprokat,
    desc: "Полный ассортимент металлопроката для строительства, производства и промышленности.",
    products: [
      { name: "Металлопрокат (общий)", slug: "metalloprokat", unit: "тонн", sizes: ["По запросу"] },
    ],
  },
  {
    id: "sortovoy",
    name: "Сортовой прокат",
    img: IMG.sortovoy,
    desc: "Используется для армирования бетона, создания несущих конструкций, в машиностроении.",
    products: [
      { name: "Арматура", slug: "armatura", unit: "тонн", sizes: ["6 мм", "8 мм", "10 мм", "12 мм", "14 мм", "16 мм", "18 мм", "20 мм", "25 мм", "32 мм", "40 мм"] },
      { name: "Балка", slug: "balka", unit: "тонн", sizes: ["10Б1", "12Б1", "16Б1", "20Б1", "25Б1", "30Б1"] },
      { name: "Швеллер", slug: "shveller", unit: "тонн", sizes: ["№5", "№6.5", "№8", "№10", "№12", "№14", "№16", "№18", "№20"] },
      { name: "Уголок", slug: "ugolok", unit: "тонн", sizes: ["25x25", "32x32", "40x40", "50x50", "63x63", "75x75", "100x100"] },
      { name: "Круг", slug: "krug", unit: "тонн", sizes: ["10 мм", "12 мм", "16 мм", "20 мм", "25 мм", "30 мм", "40 мм", "50 мм"] },
      { name: "Полоса", slug: "polosa", unit: "тонн", sizes: ["20x4", "40x4", "50x5", "60x6", "80x8", "100x10"] },
    ],
  },
  {
    id: "listovoy",
    name: "Листовой прокат",
    img: IMG.listovoy,
    desc: "Применяется для обшивки зданий, изготовления ёмкостей, кровли, в судостроении.",
    products: [
      { name: "Лист г/к (горячекатаный)", slug: "list-gk", unit: "листов", sizes: ["2 мм", "3 мм", "4 мм", "5 мм", "6 мм", "8 мм", "10 мм", "12 мм", "16 мм", "20 мм"] },
      { name: "Лист х/к (холоднокатаный)", slug: "list-hk", unit: "листов", sizes: ["0.5 мм", "0.7 мм", "0.8 мм", "1 мм", "1.5 мм", "2 мм", "2.5 мм", "3 мм"] },
      { name: "Лист оцинкованный", slug: "list-ocinkovannyy", unit: "листов", sizes: ["0.4 мм", "0.5 мм", "0.7 мм", "1 мм", "1.5 мм", "2 мм"] },
      { name: "Профнастил", slug: "profnastil", unit: "листов", sizes: ["С8", "С10", "С21", "НС35", "Н60", "Н75"] },
      { name: "Рифлёный лист", slug: "list-riflenyy", unit: "листов", sizes: ["3 мм", "4 мм", "5 мм", "6 мм", "8 мм"] },
    ],
  },
  {
    id: "nerzh",
    name: "Нержавеющий металл",
    img: IMG.nerzh,
    desc: "Для пищевой, химической промышленности, декоративных и антикоррозийных конструкций.",
    products: [
      { name: "Лист нержавеющий", slug: "nerzh-list", unit: "листов", sizes: ["0.5 мм", "1 мм", "1.5 мм", "2 мм", "3 мм", "4 мм", "5 мм"] },
      { name: "Трубы нержавеющие", slug: "nerzh-truby", unit: "метров", sizes: ["20x20", "25x25", "40x40", "Ø20", "Ø32", "Ø57", "Ø76"] },
      { name: "Круг нержавеющий", slug: "nerzh-krug", unit: "тонн", sizes: ["10 мм", "16 мм", "20 мм", "30 мм", "40 мм"] },
      { name: "Полоса нержавеющая", slug: "nerzh-polosa", unit: "тонн", sizes: ["20x3", "40x4", "50x5", "60x6"] },
    ],
  },
  {
    id: "metizy",
    name: "Метизы",
    img: IMG.metizy,
    desc: "Крепёж для любых соединений: от строительства до мелкого монтажа.",
    products: [
      { name: "Болты", slug: "bolty", unit: "шт", sizes: ["М6", "М8", "М10", "М12", "М16", "М20", "М24"] },
      { name: "Гайки", slug: "gayki", unit: "шт", sizes: ["М6", "М8", "М10", "М12", "М16", "М20", "М24"] },
      { name: "Шайбы", slug: "shayby", unit: "шт", sizes: ["М6", "М8", "М10", "М12", "М16", "М20"] },
      { name: "Анкера", slug: "ankera", unit: "шт", sizes: ["М8", "М10", "М12", "М16"] },
      { name: "Заклёпки", slug: "zaklepki", unit: "шт", sizes: ["3.2x8", "4x10", "4.8x12", "6.4x16"] },
    ],
  },
  {
    id: "truby",
    name: "Трубы",
    img: IMG.truby,
    desc: "Для систем отопления, водоснабжения, газопроводов, строительных лесов.",
    products: [
      { name: "Трубы г/д (горячедеформированные)", slug: "truby-gd", unit: "метров", sizes: ["Ø57", "Ø76", "Ø89", "Ø108", "Ø133", "Ø159"] },
      { name: "Трубы ВГП (водогазопроводные)", slug: "truby-vgp", unit: "метров", sizes: ["Ду15", "Ду20", "Ду25", "Ду32", "Ду40", "Ду50"] },
      { name: "Трубы профильные", slug: "truby-profilnye", unit: "метров", sizes: ["20x20", "40x20", "40x40", "60x40", "80x80", "100x100"] },
      { name: "Трубы электросварные", slug: "truby-elektrosvarnye", unit: "метров", sizes: ["Ø20", "Ø32", "Ø42", "Ø57", "Ø76", "Ø108"] },
      { name: "Трубы оцинкованные", slug: "truby-ocinkovannye", unit: "метров", sizes: ["Ду15", "Ду20", "Ду25", "Ду32", "Ду40"] },
    ],
  },
  {
    id: "cvetnoy",
    name: "Цветной металл",
    img: IMG.cvetnoy,
    desc: "Алюминий, медь, латунь — для электротехники, сантехники, архитектурных решений.",
    products: [
      { name: "Алюминий (лист/профиль)", slug: "aluminiy", unit: "кг", sizes: ["Лист", "Уголок", "Труба", "Профиль"] },
      { name: "Медь", slug: "med", unit: "кг", sizes: ["Лист", "Круг", "Труба", "Шина"] },
      { name: "Латунь", slug: "latun", unit: "кг", sizes: ["Лист", "Круг", "Труба", "Полоса"] },
    ],
  },
  {
    id: "krw",
    name: "Подшипники KRW",
    img: IMG.krw,
    desc: "Прецизионные немецкие подшипники для промышленного оборудования.",
    products: [
      { name: "Подшипники KRW", slug: "podshipniki-krw", unit: "шт", sizes: ["6200", "6201", "6202", "6204", "6206", "6208", "6210", "Под заказ"] },
    ],
  },
];

export const STATS = [
  { value: 8, suffix: "+", label: "категорий продукции", note: "Металлопрокат в ассортименте" },
  { value: 24, suffix: " ч", label: "обработка заказа", note: "Перезваниваем в день обращения" },
  { value: 2, suffix: "", label: "города доставки", note: "Алматы и Астана точно в срок" },
];

export const WHY_US = [
  { title: "Опыт", text: "Несколько лет на рынке металлопроката Казахстана.", icon: "Factory" },
  { title: "Доставка", text: "Собственная логистика. Доставка в согласованные сроки.", icon: "Truck" },
  { title: "Ассортимент", text: "Более 8 категорий: от метизов до нержавейки.", icon: "Layers" },
  { title: "Поддержка", text: "Поможем подобрать аналог и рассчитать объём.", icon: "Headset" },
];

export const STEPS = [
  { title: "Вы оставляете заявку", text: "Добавляете товары в корзину и оформляете заказ." },
  { title: "Менеджер связывается", text: "Уточняет город, объём, наличие, рассчитывает цену." },
  { title: "Вы согласовываете", text: "Подписываете счёт/договор." },
  { title: "Доставляем в срок", text: "Отгружаем и отслеживаем логистику." },
];

export const SERVICES = [
  { title: "Доставка по РК", text: "Доставка по РК только в городах Астана/Алматы.", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" },
  { title: "Подбор аналогов", text: "Поможем подобрать марку и сортамент под задачу.", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80" },
];

export const REVIEWS = [
  { name: "Олег П.", role: "гл. инженер", text: "Надёжные поставки и стабильное качество. Сотрудничаем не первый год — рекомендуем как ответственного поставщика." },
  { name: "Василий Р.", role: "инженер-технолог", text: "Большой ассортимент и адекватные сроки. Менеджеры помогли подобрать оптимальный сортамент под бюджет." },
  { name: "Валентин К.", role: "снабжение", text: "Гибкий подход к заказам и внимание к деталям. Удобно работать по объёмным позициям." },
  { name: "Ольга В.", role: "закуп", text: "Оперативно рассчитали стоимость с учётом доставки в Астану. Всё пришло в срок." },
];
