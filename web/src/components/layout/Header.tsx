import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShoppingCart,
  X,
} from "lucide-react";

import { NAV, CONTACTS } from "@/data/site";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";

export function Header() {
  const { count, openDrawer, openModal, city, setCity } = useStore();
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/95 text-white shadow-[0_2px_18px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-[1200px] items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-light font-black text-navy">
            ЮЕ
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[1.05rem] font-extrabold tracking-wide text-gold-light">
              ЮГ&nbsp;ЕвроИнвест
            </span>
            <span className="text-[0.55rem] font-medium uppercase tracking-[3px] text-slate-400">
              торговая компания
            </span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-5 font-medium lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.href}
              to={n.href}
              className={({ isActive }) =>
                cn(
                  "text-slate-300 transition hover:text-gold-light",
                  isActive && "text-gold-light"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CONTACTS.phoneRaw}`}
            className="hidden whitespace-nowrap font-bold text-gold-light transition hover:text-white xl:block"
          >
            {CONTACTS.phone}
          </a>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white transition hover:brightness-110 hover:scale-105"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href={CONTACTS.twogis}
            target="_blank"
            rel="noopener"
            aria-label="2GIS"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff3c00] text-white transition hover:brightness-110 hover:scale-105"
          >
            <MapPin size={18} />
          </a>

          <button
            onClick={() => openModal("call")}
            className="hidden rounded-lg border border-gold bg-gold/10 px-3 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-navy md:block"
          >
            Заказать звонок
          </button>

          <button
            onClick={openDrawer}
            aria-label="Корзина"
            className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-gold hover:text-navy"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs font-extrabold text-navy">
                {count}
              </span>
            )}
          </button>

          <div ref={cityRef} className="relative hidden sm:block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCityOpen((o) => !o);
              }}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-2 text-sm font-semibold"
            >
              <MapPin size={15} className="text-gold-light" />
              {city}
              <ChevronDown
                size={14}
                className={cn("transition", cityOpen && "rotate-180")}
              />
            </button>
            {cityOpen && (
              <ul className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-navy-2 py-1 shadow-xl">
                {CONTACTS.cities.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => {
                        setCity(c);
                        setCityOpen(false);
                      }}
                      className={cn(
                        "block w-full px-3 py-2 text-left text-sm hover:bg-white/10",
                        c === city && "text-gold-light"
                      )}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню"
            className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-navy-2 px-[4%] py-3 lg:hidden">
          {NAV.map((n) => (
            <NavLink
              key={n.href}
              to={n.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block border-b border-white/5 py-3 text-slate-200 last:border-0",
                  isActive && "text-gold-light"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a
            href={`tel:${CONTACTS.phoneRaw}`}
            className="mt-2 flex items-center gap-2 py-2 font-bold text-gold-light"
          >
            <Phone size={16} /> {CONTACTS.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
