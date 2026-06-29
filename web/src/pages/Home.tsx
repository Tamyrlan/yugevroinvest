import { Link } from "react-router-dom";
import {
  ArrowRight,
  Factory,
  Truck,
  Layers,
  Headset,
  Check,
  Scissors,
} from "lucide-react";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AuroraText } from "@/components/ui/aurora-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import LogoAnimation from "@/components/LogoAnimation";

import { useStore } from "@/store";
import { CATEGORIES, STATS, WHY_US, STEPS, SERVICES, REVIEWS } from "@/data/site";
import { cn } from "@/lib/utils";
import { LeadInline } from "@/components/LeadInline";

const ICONS = { Factory, Truck, Layers, Headset } as const;

function SectionTitle({
  children,
  light,
  sub,
}: {
  children: React.ReactNode;
  light?: boolean;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2
        className={cn(
          "text-3xl font-extrabold sm:text-4xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded bg-gold" />
      {sub && (
        <p className={cn("mt-4", light ? "text-slate-300" : "text-muted")}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { openModal, openProduct } = useStore();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.12}
          duration={3}
          className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] fill-gold/20 stroke-gold/20"
        />
        <div className="relative mx-auto grid w-[92%] max-w-[1200px] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light">
              Склад работает 24/7 · Доставка в день обращения
            </span>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Внушительный ассортимент{" "}
              <AuroraText>сортового металлопроката</AuroraText>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              ЮГ ЕвроИнвест — надёжный поставщик металлопроката в Казахстане.<br />
              Оперативная отгрузка с доставкой в Алматы и Астану точно в срок.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalog">
                <ShimmerButton
                  background="linear-gradient(135deg,#c9a227,#e3c768)"
                  shimmerColor="#ffffff"
                  className="font-semibold text-navy"
                >
                  Перейти в каталог
                </ShimmerButton>
              </Link>
              <button
                onClick={() => openModal("consult")}
                className="rounded-full border-2 border-gold px-6 py-3 font-semibold text-gold-light transition hover:bg-gold hover:text-navy"
              >
                Запросить прайс-лист
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm font-medium text-gold-light">
              <span>✓ Доставка в Алматы и Астану</span>
              <span>✓ Более 8 категорий товаров</span>
              <span>✓ Индивидуальный расчёт цены</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy">
              <div className="h-96 w-full lg:h-[500px] flex items-center justify-center p-6">
                <img
                  src="/logo.png"
                  alt="ЮГ ЕвроИнвест"
                  className="max-h-full max-w-full animate-logo-fade-in"
                />
              </div>
              <BorderBeam size={120} duration={8} colorFrom="#c9a227" colorTo="#e3c768" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-10 w-[92%] max-w-[1200px]">
        <div className="grid gap-4 rounded-2xl border border-line bg-white p-6 shadow-xl sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-navy">
                <NumberTicker value={s.value} className="text-navy" />
                {s.suffix}
              </div>
              <div className="mt-1 font-semibold text-gold">{s.label}</div>
              <div className="text-sm text-muted">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-10">
        <Marquee pauseOnHover className="[--duration:30s]">
          {CATEGORIES.map((c) => (
            <span
              key={c.id}
              className="mx-2 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-navy shadow-sm"
            >
              {c.name.split(" (")[0]}
            </span>
          ))}
        </Marquee>
      </section>

      {/* PRODUCTS */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <SectionTitle sub="Полный сортамент со склада — выберите категорию и оставьте заявку на расчёт.">
            Наша продукция
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => (
              <BlurFade key={cat.id} delay={0.05 * (i % 4)} inView>
                <MagicCard
                  className="h-full cursor-pointer rounded-2xl"
                  gradientFrom="#c9a227"
                  gradientTo="#e3c768"
                >
                  <button
                    onClick={() => openProduct(i, 0)}
                    className="flex h-full w-full flex-col text-left"
                  >
                    <div className="relative h-40 overflow-hidden rounded-t-2xl">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-bold text-navy">
                        {cat.name.split(" (")[0]}
                      </h3>
                      <p className="mt-1 flex-1 text-sm text-muted">{cat.desc}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                        Подробнее <ArrowRight size={15} />
                      </span>
                    </div>
                  </button>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16">
        <div className="mx-auto grid w-[92%] max-w-[1200px] items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
              alt="О компании"
              className="h-80 w-full object-cover"
            />
            <BorderBeam size={90} duration={7} colorFrom="#c9a227" colorTo="#e3c768" />
          </div>
          <div>
            <SectionTitle>
              <span className="block text-left">О компании</span>
            </SectionTitle>
            <p className="-mt-6 text-muted">
              ЮГ ЕвроИнвест — ваш надёжный поставщик металлопроката. Широкий
              ассортимент высококачественной продукции для строительства,
              производства и ремонтных работ. Конкурентные цены и индивидуальный
              подход к каждому клиенту. Обеспечиваем оперативные поставки,
              гарантируем качество продукции и профессиональное обслуживание.
            </p>
            <Link
              to="/company"
              className="mt-6 inline-flex items-center gap-1 font-semibold text-gold"
            >
              Подробнее о нас <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <SectionTitle sub="Надёжный партнёр для вашего производства и стройки в Алматы и Астане.">
            Почему выбирают нас
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((f, i) => {
              const Icon = ICONS[f.icon as keyof typeof ICONS];
              return (
                <BlurFade key={f.title} delay={0.05 * i} inView>
                  <div className="h-full rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-navy">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-bold text-navy">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.text}</p>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <SectionTitle light>Как мы работаем</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <BlurFade key={s.title} delay={0.05 * i} inView>
                <div className="h-full rounded-2xl border border-gold/25 bg-white/5 p-6">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-light text-lg font-extrabold text-navy">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gold-light">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{s.text}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <SectionTitle sub="Дополнительная обработка и логистика под ваш проект.">
            Наши услуги
          </SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <BlurFade key={s.title} delay={0.05 * i} inView>
                <div className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted">{s.text}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className="py-16">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-12">
            <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              className="fill-gold/20 stroke-gold/20"
            />
            <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-sm font-semibold text-gold-light">
                  <Scissors size={15} /> Акция
                </span>
                <h2 className="text-3xl font-extrabold">Бесплатная резка в размер</h2>
                <p className="mt-2 text-slate-300">
                  При покупке металлопроката свыше 10 тонн — услуга резки в размер
                  бесплатно. Наш способ сказать спасибо за ваш выбор и доверие.
                </p>
              </div>
              <button
                onClick={() => openModal("consult")}
                className="shrink-0 rounded-full bg-gradient-to-br from-gold to-gold-light px-7 py-3 font-bold text-navy transition hover:brightness-105"
              >
                Заказать по акции
              </button>
            </div>
            <BorderBeam size={140} duration={9} colorFrom="#c9a227" colorTo="#e3c768" />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white py-16">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <SectionTitle sub="Нам доверяют строительные компании и производственные предприятия.">
            Отзывы
          </SectionTitle>
        </div>
        <Marquee pauseOnHover className="[--duration:45s]">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="mx-2 w-80 shrink-0 rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-light font-bold text-navy">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-navy">{r.name}</div>
                  <div className="text-xs text-muted">{r.role}</div>
                </div>
              </div>
              <p className="text-sm text-muted">{r.text}</p>
            </div>
          ))}
        </Marquee>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gold to-gold-light py-14">
        <div className="mx-auto flex w-[92%] max-w-[1200px] flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-navy">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold">
              <Check className="rounded-full bg-navy/10 p-1" /> Остались вопросы?
            </h2>
            <p className="mt-1 max-w-md text-navy/80">
              Оставьте контакты — менеджер перезвонит и поможет с подбором металла.
            </p>
          </div>
          <LeadInline />
        </div>
      </section>
    </>
  );
}
