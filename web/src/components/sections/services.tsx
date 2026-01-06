"use client";

import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Cog,
  Database,
  Cloud,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Geliştirme",
    description: "Modern web siteleri ve uygulamalar",
    href: "/hizmetler#web",
  },
  {
    icon: Smartphone,
    title: "Mobil Uygulama",
    description: "iOS ve Android uygulamalar",
    href: "/hizmetler#mobil",
  },
  {
    icon: ShoppingCart,
    title: "E-Ticaret",
    description: "Online mağaza çözümleri",
    href: "/hizmetler#eticaret",
  },
  {
    icon: Cog,
    title: "Otomasyon",
    description: "İş süreçleri otomasyonu",
    href: "/hizmetler#otomasyon",
  },
  {
    icon: Database,
    title: "API Geliştirme",
    description: "REST & GraphQL API'ler",
    href: "/hizmetler#api",
  },
  {
    icon: Cloud,
    title: "Cloud",
    description: "AWS, GCP, Azure çözümleri",
    href: "/hizmetler#cloud",
  },
];

export function ServicesSection() {
  return (
    <section className="w-full py-14 border-t border-border">
      <div className="px-72">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Hizmetlerimiz</h2>
            <p className="text-base text-muted-foreground mt-2">
              Geniş yelpazede yazılım çözümleri
            </p>
          </div>
          <Link
            href="/hizmetler"
            className="text-base text-primary hover:underline flex items-center gap-2"
          >
            Tümü
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-muted"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-medium group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
