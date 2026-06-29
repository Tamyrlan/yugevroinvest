import { BlurFade } from "@/components/ui/blur-fade";
import { SERVICES } from "@/data/site";
import { useStore } from "@/store";

export default function Services() {
  const { openModal } = useStore();

  return (
    <>
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <h1 className="text-4xl font-extrabold">Наши услуги</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Дополнительная обработка металлопроката и логистика под ваш проект.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1200px] gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <BlurFade key={s.title} delay={0.05 * i} inView>
              <div className="group flex h-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
                <div className="w-40 shrink-0 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{s.text}</p>
                  <button
                    onClick={() => openModal("consult")}
                    className="mt-3 self-start rounded-lg border border-gold bg-gold/10 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-navy"
                  >
                    Заказать услугу
                  </button>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
    </>
  );
}
