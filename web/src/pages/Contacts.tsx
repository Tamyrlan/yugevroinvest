import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

import { CONTACTS } from "@/data/site";
import { LeadInline } from "@/components/LeadInline";

export default function Contacts() {
  return (
    <>
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <h1 className="text-4xl font-extrabold">Контакты</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Свяжитесь с нами удобным способом — поможем подобрать металл и
            рассчитать стоимость с доставкой.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1200px] gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Телефон", value: CONTACTS.phone, href: `tel:${CONTACTS.phoneRaw}` },
              { icon: Mail, label: "Email", value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
              { icon: MessageCircle, label: "WhatsApp", value: "Написать в WhatsApp", href: CONTACTS.whatsapp },
              { icon: MapPin, label: "2GIS", value: "Открыть в 2GIS", href: CONTACTS.twogis },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "WhatsApp" || c.label === "2GIS" ? "_blank" : undefined}
                rel="noopener"
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:border-gold"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-light text-navy">
                  <c.icon size={22} />
                </div>
                <div>
                  <div className="text-sm text-muted">{c.label}</div>
                  <div className="font-bold text-navy">{c.value}</div>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-navy">
                <MapPin size={22} />
              </div>
              <div>
                <div className="text-sm text-muted">Доставка</div>
                <div className="font-bold text-navy">Алматы и Астана</div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-light text-navy">
                <Clock size={22} />
              </div>
              <div>
                <div className="text-sm text-muted">Приём заявок</div>
                <div className="font-bold text-navy">Ежедневно, отвечаем оперативно</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-navy">Оставить заявку</h2>
            <p className="mt-1 text-sm text-muted">
              Заполните форму — менеджер перезвонит и поможет с расчётом.
            </p>
            <div className="mt-5">
              <LeadInline />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <iframe
                title="Карта"
                src="https://www.google.com/maps?q=Almaty&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
