import { useEffect, useMemo, useState, type ReactNode } from "react";
import { X, Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";

import { useStore } from "@/store";
import { CATEGORIES } from "@/data/site";
import { sendToSheet, validPhone } from "@/lib/api";
import { cn } from "@/lib/utils";

function ModalShell({
  title,
  note,
  onClose,
  children,
  wide,
}: {
  title: string;
  note?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-white p-6 shadow-2xl",
          wide ? "max-w-3xl" : "max-w-md"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-slate-100"
        >
          <X size={20} />
        </button>
        <h3 className="mb-1 pr-8 text-xl font-extrabold text-navy">{title}</h3>
        {note && <p className="mb-4 text-sm text-muted">{note}</p>}
        {children}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";
const goldBtn =
  "w-full rounded-lg bg-gradient-to-br from-gold to-gold-light px-4 py-3 font-semibold text-navy transition hover:brightness-105 disabled:opacity-50";

function LeadForm({
  type,
  buttonText,
  successMsg,
  onDone,
}: {
  type: "call" | "consult";
  buttonText: string;
  successMsg: string;
  onDone: () => void;
}) {
  const { city, showToast } = useStore();
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const phone = (f.elements.namedItem("phone") as HTMLInputElement).value;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value;
    if (!validPhone(phone)) return showToast("Укажите корректный телефон.");
    setBusy(true);
    await sendToSheet({
      type: "call",
      date: new Date().toLocaleString("ru-RU"),
      name: name.trim(),
      phone: phone.trim(),
      city,
      status: type === "consult" ? "Новый (консультация)" : "Новый",
    });
    setBusy(false);
    onDone();
    showToast(successMsg);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-sm font-medium text-ink">
        Имя
        <input name="name" type="text" className={cn(inputCls, "mt-1")} />
      </label>
      <label className="block text-sm font-medium text-ink">
        Телефон *
        <input
          name="phone"
          type="tel"
          required
          placeholder="+7 (___) ___-__-__"
          className={cn(inputCls, "mt-1")}
        />
      </label>
      <button type="submit" disabled={busy} className={goldBtn}>
        {busy ? "Отправка…" : buttonText}
      </button>
    </form>
  );
}

function CheckoutForm() {
  const { items, city, clear, closeModal, showToast } = useStore();
  const [busy, setBusy] = useState(false);

  const itemsText = useMemo(
    () => items.map((i) => `${i.name} [${i.size}] — ${i.qty} ${i.unit}`).join("; "),
    [items]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const fio = (f.elements.namedItem("fio") as HTMLInputElement).value;
    const phone = (f.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value;
    const cityVal = (f.elements.namedItem("city") as HTMLSelectElement).value;
    const comment = (f.elements.namedItem("comment") as HTMLTextAreaElement).value;
    if (!fio.trim()) return showToast("Укажите ФИО.");
    if (!validPhone(phone)) return showToast("Укажите корректный телефон.");
    setBusy(true);
    await sendToSheet({
      type: "order",
      date: new Date().toLocaleString("ru-RU"),
      fio: fio.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: cityVal,
      items: itemsText,
      comment: comment.trim(),
      status: "Новый",
    });
    setBusy(false);
    clear();
    closeModal();
    showToast(
      "Спасибо! Ваш заказ передан менеджеру. Мы свяжемся с вами для уточнения цены и сроков доставки."
    );
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          ФИО *
          <input name="fio" type="text" required className={cn(inputCls, "mt-1")} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Телефон *
          <input
            name="phone"
            type="tel"
            required
            placeholder="+7 (___) ___-__-__"
            className={cn(inputCls, "mt-1")}
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input name="email" type="email" placeholder="необязательно" className={cn(inputCls, "mt-1")} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Город доставки
          <select name="city" defaultValue={city} className={cn(inputCls, "mt-1")}>
            <option>Алматы</option>
            <option>Астана</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        Комментарий к заказу
        <textarea name="comment" rows={2} placeholder="необязательно" className={cn(inputCls, "mt-1")} />
      </label>

      <div className="rounded-lg bg-slate-50 p-3 text-sm">
        <h4 className="mb-2 font-semibold text-navy">Ваш заказ:</h4>
        <div className="space-y-1">
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-muted">
              <span>
                {i.name} ({i.size})
              </span>
              <span className="shrink-0 pl-3">
                {i.qty} {i.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" disabled={busy} className={goldBtn}>
        {busy ? "Отправка…" : "Отправить заказ"}
      </button>
    </form>
  );
}

function ProductModal() {
  const { productModal, closeProduct, addItem } = useStore();
  const cat = productModal ? CATEGORIES[productModal.catIndex] : null;
  const [prodIndex, setProdIndex] = useState(productModal?.prodIndex ?? 0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const product = cat?.products[prodIndex];

  useEffect(() => {
    setProdIndex(productModal?.prodIndex ?? 0);
  }, [productModal]);

  useEffect(() => {
    if (product) setSize(product.sizes[0]);
    setQty(1);
  }, [product]);

  if (!cat || !product) return null;

  return (
    <ModalShell title={product.name} onClose={closeProduct} wide>
      <div className="grid gap-5 md:grid-cols-2">
        <img
          src={cat.img}
          alt={cat.name}
          className="h-56 w-full rounded-xl object-cover md:h-full"
        />
        <div>
          <p className="mb-3 text-sm text-muted">{cat.desc}</p>

          {cat.products.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {cat.products.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setProdIndex(i)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    i === prodIndex
                      ? "border-gold bg-gold/15 text-navy"
                      : "border-line text-muted hover:border-gold"
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}

          <label className="mb-3 block text-sm font-medium text-ink">
            Размер / диаметр
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={cn(inputCls, "mt-1")}
            >
              {product.sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="mb-3 block text-sm font-medium text-ink">
            Количество
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className={cn(inputCls, "w-24")}
              />
              <div className="grid place-items-center rounded-lg border border-line px-3 text-sm text-muted">
                {product.unit}
              </div>
            </div>
          </label>

          <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            Цена рассчитывается индивидуально после консультации. Оставьте заявку — менеджер свяжется с вами.
          </div>

          <button
            onClick={() => {
              addItem(cat, product, size, qty);
              closeProduct();
            }}
            className={goldBtn}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function CartDrawer() {
  const { drawerOpen, closeDrawer, items, inc, dec, remove, openModal } =
    useStore();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-black/50 transition-opacity",
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[95] flex h-full w-[min(420px,92%)] flex-col bg-white shadow-2xl transition-transform",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <h3 className="text-lg font-extrabold text-navy">Корзина</h3>
          <button
            onClick={closeDrawer}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Цена будет озвучена менеджером с учётом объёма, города доставки и текущих условий.
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              Корзина пуста. Добавьте товары из каталога.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((it, i) => (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-xl border border-line p-3"
                >
                  <img
                    src={it.img}
                    alt={it.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-semibold text-navy">{it.name}</h4>
                    <div className="text-xs text-muted">
                      {it.category.split(" (")[0]} • Размер: {it.size}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => dec(i)}
                        className="grid h-7 w-7 place-items-center rounded-md border border-line hover:bg-slate-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium">
                        {it.qty} {it.unit}
                      </span>
                      <button
                        onClick={() => inc(i)}
                        className="grid h-7 w-7 place-items-center rounded-md border border-line hover:bg-slate-50"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:underline"
                      >
                        <Trash2 size={14} /> Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-line p-4">
          <button
            disabled={items.length === 0}
            onClick={() => {
              closeDrawer();
              openModal("checkout");
            }}
            className={goldBtn}
          >
            Оформить заказ
          </button>
        </div>
      </aside>
    </>
  );
}

function Toast() {
  const { toast } = useStore();
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-[110] flex max-w-[92%] -translate-x-1/2 items-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm text-white shadow-2xl transition-all",
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <CheckCircle2 size={18} className="shrink-0 text-gold-light" />
      <span>{toast}</span>
    </div>
  );
}

export function Overlays() {
  const { modal, closeModal } = useStore();

  return (
    <>
      <CartDrawer />
      <ProductModal />

      {modal === "call" && (
        <ModalShell
          title="Заказать звонок"
          note="Оставьте контакты — перезвоним в ближайшее время."
          onClose={closeModal}
        >
          <LeadForm
            type="call"
            buttonText="Жду звонка"
            successMsg="Спасибо! Мы перезвоним вам в ближайшее время."
            onDone={closeModal}
          />
        </ModalShell>
      )}

      {modal === "consult" && (
        <ModalShell
          title="Рассчитать стоимость"
          note="Оставьте контакты, и менеджер подберёт металл и рассчитает стоимость."
          onClose={closeModal}
        >
          <LeadForm
            type="consult"
            buttonText="Получить консультацию"
            successMsg="Спасибо! Менеджер свяжется с вами для расчёта стоимости."
            onDone={closeModal}
          />
        </ModalShell>
      )}

      {modal === "checkout" && (
        <ModalShell
          title="Оформление заказа"
          note="Менеджер свяжется с вами для расчёта финальной стоимости в течение 15 минут."
          onClose={closeModal}
          wide
        >
          <CheckoutForm />
        </ModalShell>
      )}

      <Toast />
    </>
  );
}
