/**
 * ЮГ ЕвроИнвест — приём заявок с сайта в Google Таблицу.
 *
 * Создаёт/заполняет два листа:
 *   "Заказы"          — заявки из корзины (type = "order")
 *   "Заявки на звонок" — формы звонка/консультации (type = "call")
 *
 * Также (опционально) отправляет клиенту письмо-подтверждение,
 * если в заказе указан email.
 *
 * Инструкция по установке — в README.md.
 */

// При желании укажите email менеджера для уведомлений о новых заявках.
// Оставьте пустым, чтобы отключить.
var MANAGER_EMAIL = "";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "order") {
      saveOrder_(ss, data);
      sendClientEmail_(data);
      notifyManager_("Новый заказ с сайта", orderToText_(data));
    } else {
      saveCall_(ss, data);
      notifyManager_("Новая заявка на звонок", callToText_(data));
    }

    return json_({ result: "success" });
  } catch (err) {
    return json_({ result: "error", message: String(err) });
  }
}

/* ---------- Листы ---------- */

function saveOrder_(ss, d) {
  var sheet = getSheet_(ss, "Заказы",
    ["Дата/время", "ФИО", "Телефон", "Email", "Город", "Список товаров", "Комментарий", "Статус"]);
  sheet.appendRow([
    d.date || new Date(),
    d.fio || "",
    d.phone || "",
    d.email || "",
    d.city || "",
    d.items || "",
    d.comment || "",
    d.status || "Новый"
  ]);
}

function saveCall_(ss, d) {
  var sheet = getSheet_(ss, "Заявки на звонок",
    ["Дата/время", "Имя", "Телефон", "Город", "Статус"]);
  sheet.appendRow([
    d.date || new Date(),
    d.name || "",
    d.phone || "",
    d.city || "",
    d.status || "Новый"
  ]);
}

function getSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    var hdr = sheet.getRange(1, 1, 1, headers.length);
    hdr.setFontWeight("bold").setBackground("#0b1a2e").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/* ---------- Письма ---------- */

function sendClientEmail_(d) {
  if (!d.email) return;
  try {
    var body =
      "Здравствуйте, " + (d.fio || "") + "!\n\n" +
      "Спасибо за заказ в компании «ЮГ ЕвроИнвест».\n" +
      "Менеджер свяжется с вами в ближайшее время для уточнения цены и сроков доставки.\n\n" +
      "Детали заявки:\n" +
      "Город доставки: " + (d.city || "") + "\n" +
      "Товары: " + (d.items || "") + "\n" +
      (d.comment ? "Комментарий: " + d.comment + "\n" : "") +
      "\nКонтакты: +7 (777) 407-17-72, zakaz.yugeuroinvest.kz@mail.ru\n";
    MailApp.sendEmail(d.email, "ЮГ ЕвроИнвест — ваш заказ принят", body);
  } catch (err) { /* игнорируем ошибки почты */ }
}

function notifyManager_(subject, body) {
  if (!MANAGER_EMAIL) return;
  try { MailApp.sendEmail(MANAGER_EMAIL, subject, body); } catch (err) {}
}

function orderToText_(d) {
  return "Дата: " + d.date + "\nФИО: " + d.fio + "\nТелефон: " + d.phone +
    "\nEmail: " + (d.email || "-") + "\nГород: " + d.city +
    "\nТовары: " + d.items + "\nКомментарий: " + (d.comment || "-");
}
function callToText_(d) {
  return "Дата: " + d.date + "\nИмя: " + d.name + "\nТелефон: " + d.phone + "\nГород: " + (d.city || "-");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Для быстрой проверки из редактора Apps Script */
function doGet() {
  return ContentService.createTextOutput("ЮГ ЕвроИнвест: сервис приёма заявок работает.");
}
