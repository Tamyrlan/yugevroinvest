# Картинки сайта — как называть и куда класть

Все изображения кладутся в папку `assets/`. Пока файла нет — показывается
резервная картинка (заглушка из интернета). Как только вы положите файл с
точным именем из списка — сайт автоматически подхватит его.

Рекомендуемый формат: **.jpg**, размер примерно **800×600 px**, вес до ~200 КБ.

---

## 1. Логотип
| Файл | Где используется |
|------|------------------|
| `assets/logo.png` | Шапка и подвал на всех страницах (PNG с прозрачным фоном) |

## 2. Картинки категорий (плитки в каталоге)
Папка: `assets/catalog/`

| Файл | Категория |
|------|-----------|
| `assets/catalog/metalloprokat.jpg` | Металлопрокат (общий раздел) |
| `assets/catalog/sortovoy.jpg` | Сортовой прокат |
| `assets/catalog/listovoy.jpg` | Листовой прокат |
| `assets/catalog/nerzh.jpg` | Нержавеющий металл |
| `assets/catalog/metizy.jpg` | Метизы |
| `assets/catalog/truby.jpg` | Трубы |
| `assets/catalog/cvetnoy.jpg` | Цветной металл |
| `assets/catalog/krw.jpg` | Подшипники KRW |

## 3. Картинки товаров (карточки внутри категории)
Папка: `assets/products/`

### Сортовой прокат
| Файл | Товар |
|------|-------|
| `assets/products/armatura.jpg` | Арматура |
| `assets/products/balka.jpg` | Балка |
| `assets/products/shveller.jpg` | Швеллер |
| `assets/products/ugolok.jpg` | Уголок |
| `assets/products/krug.jpg` | Круг |
| `assets/products/polosa.jpg` | Полоса |

### Листовой прокат
| Файл | Товар |
|------|-------|
| `assets/products/list-gk.jpg` | Лист г/к (горячекатаный) |
| `assets/products/list-hk.jpg` | Лист х/к (холоднокатаный) |
| `assets/products/list-ocinkovannyy.jpg` | Лист оцинкованный |
| `assets/products/profnastil.jpg` | Профнастил |
| `assets/products/list-riflenyy.jpg` | Рифлёный лист |

### Нержавеющий металл
| Файл | Товар |
|------|-------|
| `assets/products/nerzh-list.jpg` | Лист нержавеющий |
| `assets/products/nerzh-truby.jpg` | Трубы нержавеющие |
| `assets/products/nerzh-krug.jpg` | Круг нержавеющий |
| `assets/products/nerzh-polosa.jpg` | Полоса нержавеющая |

### Метизы
| Файл | Товар |
|------|-------|
| `assets/products/bolty.jpg` | Болты |
| `assets/products/gayki.jpg` | Гайки |
| `assets/products/shayby.jpg` | Шайбы |
| `assets/products/ankera.jpg` | Анкера |
| `assets/products/zaklepki.jpg` | Заклёпки |

### Трубы
| Файл | Товар |
|------|-------|
| `assets/products/truby-gd.jpg` | Трубы г/д (горячедеформированные) |
| `assets/products/truby-vgp.jpg` | Трубы ВГП (водогазопроводные) |
| `assets/products/truby-profilnye.jpg` | Трубы профильные |
| `assets/products/truby-elektrosvarnye.jpg` | Трубы электросварные |
| `assets/products/truby-ocinkovannye.jpg` | Трубы оцинкованные |

### Цветной металл
| Файл | Товар |
|------|-------|
| `assets/products/aluminiy.jpg` | Алюминий (лист/профиль) |
| `assets/products/med.jpg` | Медь |
| `assets/products/latun.jpg` | Латунь |

### Подшипники
| Файл | Товар |
|------|-------|
| `assets/products/podshipniki-krw.jpg` | Подшипники KRW |

### Общий раздел
| Файл | Товар |
|------|-------|
| `assets/products/metalloprokat.jpg` | Металлопрокат (общий) |

---

## Как поменять картинку
1. Подготовьте фото и переименуйте его точно как в таблице (например `armatura.jpg`).
2. Положите в нужную папку (`assets/catalog/` или `assets/products/`).
3. Обновите страницу — фото появится автоматически.

> Имена файлов задаются в `app.js` (поля `img` у категорий и `slug` у товаров).
> Если хотите другие имена — измените их там.
