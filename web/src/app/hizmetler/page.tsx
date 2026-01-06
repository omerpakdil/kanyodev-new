"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Cog,
  Database,
  Cloud,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Geliştirme",
    description:
      "Modern ve responsive web siteleri, SPA/MPA web uygulamaları. SEO dostu, hızlı ve güvenli.",
    features: [
      "React / Next.js ile modern frontend",
      "Node.js / Python backend sistemleri",
      "PostgreSQL / MongoDB veritabanları",
      "API entegrasyonları",
      "Admin panelleri",
      "SEO optimizasyonu",
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    id: "mobil",
    icon: Smartphone,
    title: "Mobil Uygulama",
    description:
      "iOS ve Android platformları için native performansta cross-platform uygulamalar.",
    features: [
      "React Native / Flutter geliştirme",
      "Native iOS (Swift) / Android (Kotlin)",
      "Push notification sistemleri",
      "Offline çalışma desteği",
      "App Store / Play Store yayınlama",
      "Performans optimizasyonu",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    color: "from-green-500/20 to-green-600/5",
  },
  {
    id: "eticaret",
    icon: ShoppingCart,
    title: "E-Ticaret Çözümleri",
    description:
      "Özel e-ticaret siteleri, marketplace entegrasyonları ve ödeme sistemleri.",
    features: [
      "Özel e-ticaret platformları",
      "Ödeme gateway entegrasyonları",
      "Stok ve sipariş yönetimi",
      "Kargo entegrasyonları",
      "Marketplace bağlantıları",
      "Raporlama ve analitik",
    ],
    technologies: ["Next.js", "Stripe", "iyzico", "Trendyol API", "N11 API"],
    color: "from-purple-500/20 to-purple-600/5",
  },
  {
    id: "otomasyon",
    icon: Cog,
    title: "Otomasyon & RPA",
    description:
      "İş süreçlerinizi otomatikleştiren, zaman ve maliyet tasarrufu sağlayan çözümler.",
    features: [
      "İş süreci otomasyonu",
      "Veri entegrasyonu ve senkronizasyon",
      "Email ve bildirim sistemleri",
      "Raporlama otomasyonu",
      "Web scraping çözümleri",
      "Workflow yönetimi",
    ],
    technologies: ["Python", "Node.js", "Puppeteer", "Selenium", "n8n"],
    color: "from-orange-500/20 to-orange-600/5",
  },
  {
    id: "api",
    icon: Database,
    title: "API Geliştirme",
    description:
      "RESTful ve GraphQL API'ler, mikroservis mimarisi, 3. parti entegrasyonlar.",
    features: [
      "RESTful API tasarımı",
      "GraphQL API geliştirme",
      "Mikroservis mimarisi",
      "API dokümantasyonu (Swagger)",
      "Rate limiting ve güvenlik",
      "Webhook sistemleri",
    ],
    technologies: ["Node.js", "Express", "GraphQL", "Docker", "Redis"],
    color: "from-cyan-500/20 to-cyan-600/5",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Bulut altyapı kurulumu, CI/CD pipeline'ları, container orchestration.",
    features: [
      "AWS / GCP / Azure kurulumu",
      "Kubernetes & Docker",
      "CI/CD pipeline kurulumu",
      "Monitoring ve alerting",
      "Güvenlik ve backup",
      "Maliyet optimizasyonu",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    color: "from-pink-500/20 to-pink-600/5",
  },
];

export default function HizmetlerPage() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <div className="min-h-screen py-24">
      <div className="px-72">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Hizmetler</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ne Yapıyoruz?
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Geniş yelpazede yazılım hizmetleri sunuyoruz.
            Alanınızı seçin, detayları keşfedin.
          </p>
        </div>

        {/* Service Selector - Tab style */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium
                transition-all duration-300 border
                ${activeService.id === service.id
                  ? "border-primary bg-primary text-primary-foreground scale-105"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }
              `}
            >
              <service.icon className="h-4 w-4" />
              {service.title}
            </button>
          ))}
        </div>

        {/* Active Service Detail */}
        <div
          className={`
            relative rounded-3xl border border-border overflow-hidden
            bg-gradient-to-br ${activeService.color} backdrop-blur-sm
            transition-all duration-500
          `}
        >
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

          <div className="p-10">
            {/* Header */}
            <div className="flex items-start gap-6 mb-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <activeService.icon className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{activeService.title}</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-xl">
                  {activeService.description}
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/iletisim">
                  Teklif Al
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-10">
              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">✓</span>
                  Neler Sunuyoruz?
                </h3>
                <ul className="space-y-3">
                  {activeService.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 group">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Stats */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">&lt;/&gt;</span>
                    Teknolojiler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeService.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="px-4 py-2 text-sm bg-background/50 border border-border"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-background/50 border border-border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">2-8</div>
                    <div className="text-xs text-muted-foreground mt-1">Hafta Süre</div>
                  </div>
                  <div className="rounded-xl bg-background/50 border border-border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">%100</div>
                    <div className="text-xs text-muted-foreground mt-1">Memnuniyet</div>
                  </div>
                  <div className="rounded-xl bg-background/50 border border-border p-4 text-center">
                    <div className="text-2xl font-bold text-primary">7/24</div>
                    <div className="text-xs text-muted-foreground mt-1">Destek</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Services Quick Overview */}
        <div className="mt-20">
          <h3 className="text-xl font-bold mb-8 text-center">Tüm Hizmetler</h3>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setActiveService(service);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className={`
                  flex items-center gap-4 p-5 rounded-xl border transition-all
                  ${activeService.id === service.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                  }
                `}
              >
                <div className={`
                  flex h-12 w-12 items-center justify-center rounded-lg
                  ${activeService.id === service.id ? "bg-primary/20" : "bg-muted"}
                `}>
                  <service.icon className={`h-6 w-6 ${activeService.id === service.id ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium">{service.title}</div>
                  <div className="text-xs text-muted-foreground">{service.technologies.length} teknoloji</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold">Projenizi Hayata Geçirelim</h2>
          <p className="mt-3 text-muted-foreground">
            Hangi hizmeti seçerseniz seçin, kalite garantisi bizden.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" asChild>
              <Link href="/iletisim">
                Ücretsiz Danışmanlık
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projeler">Örnek Projeler</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
