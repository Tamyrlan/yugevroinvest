import { Link } from "react-router-dom";
import { MessageCircle, MapPin } from "lucide-react";

import { CONTACTS, NAV } from "@/data/site";
import { useStore } from "@/store";

export function Footer() {
  const { openModal } = useStore();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-slate-300">
      <div className="mx-auto grid w-[92%] max-w-[1200px] gap-8 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <span className="block text-lg font-extrabold text-gold-light">
            ЮГ&nbsp;ЕвроИнвест
          </span>
          <span className="mb-4 block text-[0.6rem] uppercase tracking-[3px] text-slate-500">
            торговая компания
          </span>
          <p className="max-w-sm text-sm text-slate-400">
            Поставщик металлопроката в Казахстане. Доставка в Алматы и Астану
            точно в срок.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Контакты</h4>
          <div className="space-y-2 text-sm">
            <a href={`tel:${CONTACTS.phoneRaw}`} className="block hover:text-gold-light">
              {CONTACTS.phone}
            </a>
            <a href={`mailto:${CONTACTS.email}`} className="block hover:text-gold-light">
              {CONTACTS.email}
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener"
              className="block hover:text-gold-light"
            >
              WhatsApp
            </a>
            <a
              href={CONTACTS.twogis}
              target="_blank"
              rel="noopener"
              className="block hover:text-gold-light"
            >
              2GIS
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Разделы</h4>
          <div className="space-y-2 text-sm">
            {NAV.filter((n) => n.href !== "/").map((n) => (
              <Link key={n.href} to={n.href} className="block hover:text-gold-light">
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => openModal("call")}
              className="mt-2 rounded-lg border border-gold bg-gold/10 px-3 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-navy"
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-sm text-slate-500">
        © {year} ЮГ ЕвроИнвест. Все права защищены.
      </div>

      <a
        href={CONTACTS.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white shadow-lg transition hover:scale-110 hover:brightness-110"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={CONTACTS.twogis}
        target="_blank"
        rel="noopener"
        aria-label="2GIS"
        className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff3c00] text-white shadow-lg transition hover:scale-110 hover:brightness-110"
      >
        <MapPin size={22} />
      </a>
    </footer>
  );
}
