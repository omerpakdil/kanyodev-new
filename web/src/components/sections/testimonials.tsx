"use client";

import { Building2 } from "lucide-react";

const testimonials = [
  {
    content: "Projemizi zamanında ve beklentilerimizin üzerinde teslim ettiler.",
    industry: "Teknoloji",
  },
  {
    content: "Kullanıcı deneyimi odaklı yaklaşımları mükemmeldi.",
    industry: "E-Ticaret",
  },
  {
    content: "Otomasyon çözümleri ile iş süreçlerimizi %40 hızlandırdık.",
    industry: "Lojistik",
  },
  {
    content: "Teknik bilgileri ve iletişimleri çok profesyonel.",
    industry: "Finans",
  },
  {
    content: "Mobil uygulamamız için harika bir iş çıkardılar.",
    industry: "Sağlık",
  },
  {
    content: "API entegrasyonları sorunsuz çalışıyor.",
    industry: "SaaS",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-14 border-t border-border bg-muted/30">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Müşterilerimizden</h2>
          <p className="text-base text-muted-foreground mt-2">
            Farklı sektörlerden geri bildirimler
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
            >
              {/* Industry Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>

              {/* Industry Label */}
              <span className="text-xs font-medium text-primary mb-2">
                {testimonial.industry}
              </span>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
