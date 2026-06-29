import { useState } from "react";

import { useStore } from "@/store";
import { sendToSheet, validPhone } from "@/lib/api";

export function LeadInline() {
  const { city, showToast } = useStore();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (f.elements.namedItem("phone") as HTMLInputElement).value;
    if (!validPhone(phone)) return showToast("Укажите корректный телефон.");
    setBusy(true);
    await sendToSheet({
      type: "call",
      date: new Date().toLocaleString("ru-RU"),
      name: name.trim(),
      phone: phone.trim(),
      city,
      status: "Новый (консультация)",
    });
    setBusy(false);
    f.reset();
    showToast("Спасибо! Менеджер свяжется с вами для расчёта стоимости.");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-wrap gap-3">
      <input
        name="name"
        type="text"
        placeholder="Ваше имя"
        className="min-w-[160px] flex-1 rounded-lg border-none px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-navy"
      />
      <input
        name="phone"
        type="tel"
        required
        placeholder="Телефон *"
        className="min-w-[160px] flex-1 rounded-lg border-none px-4 py-3 text-ink outline-none focus:ring-2 focus:ring-navy"
      />
      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy-2 disabled:opacity-50"
      >
        {busy ? "Отправка…" : "Получить консультацию"}
      </button>
    </form>
  );
}
