"use client";

import {
  Zap,
  Shield,
  Layers,
  RefreshCw,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Hızlı Geliştirme",
    description: "Agile metodoloji ile hızlı iterasyonlar",
  },
  {
    icon: Shield,
    title: "Güvenlik Odaklı",
    description: "OWASP standartlarına uygun",
  },
  {
    icon: Layers,
    title: "Ölçeklenebilir",
    description: "Cloud-native mimari",
  },
  {
    icon: RefreshCw,
    title: "CI/CD",
    description: "Otomatik test ve deployment",
  },
  {
    icon: Users,
    title: "Uzman Ekip",
    description: "Deneyimli geliştiriciler",
  },
  {
    icon: BarChart3,
    title: "Analitik",
    description: "Detaylı raporlama",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-14 border-t border-border bg-muted/30">
      <div className="px-72">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Neden KanyoDev?</h2>
          <p className="text-base text-muted-foreground mt-2">
            Kaliteli yazılım geliştirmenin temelleri
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
