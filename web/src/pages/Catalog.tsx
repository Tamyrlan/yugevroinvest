import { ArrowRight } from "lucide-react";

import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { CATEGORIES } from "@/data/site";
import { useStore } from "@/store";

export default function Catalog() {
  const { openProduct } = useStore();

  return (
    <>
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <h1 className="text-4xl font-extrabold">Каталог металлопроката</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Более 8 категорий продукции со склада. Выберите позицию, укажите
            размер и количество — менеджер рассчитает стоимость с учётом города
            доставки.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto w-[92%] max-w-[1200px] space-y-12">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.id}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-navy">
                    {cat.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-muted">{cat.desc}</p>
                </div>
                <div className="h-1 w-16 shrink-0 rounded bg-gold" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.products.map((p, pi) => (
                  <BlurFade key={p.slug} delay={0.04 * (pi % 3)} inView>
                    <MagicCard
                      className="h-full rounded-2xl"
                      gradientFrom="#c9a227"
                      gradientTo="#e3c768"
                    >
                      <div className="flex h-full flex-col p-5">
                        <h3 className="font-bold text-navy">{p.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {p.sizes.slice(0, 6).map((s) => (
                            <span
                              key={s}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-muted"
                            >
                              {s}
                            </span>
                          ))}
                          {p.sizes.length > 6 && (
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-muted">
                              +{p.sizes.length - 6}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-xs text-muted">
                          Единица: {p.unit}
                        </div>
                        <button
                          onClick={() => openProduct(ci, pi)}
                          className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-gold to-gold-light px-4 py-2.5 text-sm font-semibold text-navy transition hover:brightness-105"
                        >
                          Заказать расчёт <ArrowRight size={15} />
                        </button>
                      </div>
                    </MagicCard>
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
