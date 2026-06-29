import { ShieldCheck, Boxes, Warehouse, Percent } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useStore } from "@/store";

const ADVANTAGES = [
  { title: "Приемлемые цены", text: "Работаем напрямую — выгодные условия по объёму.", icon: Percent },
  { title: "Любой объём", text: "Поставки проката от единичных позиций до вагонных норм.", icon: Boxes },
  { title: "Свой склад", text: "Собственные складские мощности и логистика.", icon: Warehouse },
  { title: "Гарантия качества", text: "Сертифицированная продукция и проверенные марки.", icon: ShieldCheck },
];

export default function Company() {
  const { openModal } = useStore();

  return (
    <>
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <h1 className="text-4xl font-extrabold">О компании</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            ЮГ ЕвроИнвест — надёжный партнёр на рынке металлопроката Казахстана.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1200px] items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <img
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=900&q=80"
              alt="Склад металлопроката"
              className="h-80 w-full object-cover"
            />
            <BorderBeam size={90} duration={7} colorFrom="#c9a227" colorTo="#e3c768" />
          </div>
          <div className="space-y-4 text-muted">
            <p>
              Мы предлагаем широкий ассортимент высококачественной продукции для
              строительства, производства и ремонтных работ. За годы работы
              зарекомендовали себя как надёжный поставщик для строительных
              компаний, производственных предприятий и частных лиц.
            </p>
            <p>
              Обеспечиваем оперативные поставки, гарантируем качество продукции и
              профессиональное обслуживание. Выбирая ЮГ ЕвроИнвест, вы выбираете
              надёжность и качество.
            </p>
            <button
              onClick={() => openModal("consult")}
              className="rounded-full bg-gradient-to-br from-gold to-gold-light px-6 py-3 font-semibold text-navy transition hover:brightness-105"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid w-[92%] max-w-[1200px] gap-4 sm:grid-cols-3">
          {[
            { v: 8, s: "+", l: "категорий продукции" },
            { v: 24, s: " ч", l: "обработка заказа" },
            { v: 2, s: "", l: "города доставки" },
          ].map((x) => (
            <div key={x.l} className="rounded-2xl border border-line p-6 text-center">
              <div className="text-4xl font-extrabold text-navy">
                <NumberTicker value={x.v} />
                {x.s}
              </div>
              <div className="mt-1 text-muted">{x.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-navy">
            Почему выбирают нас
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((a, i) => (
              <BlurFade key={a.title} delay={0.05 * i} inView>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm">
                  <div className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-navy">
                    <a.icon size={24} />
                  </div>
                  <h3 className="font-bold text-navy">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted">{a.text}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
