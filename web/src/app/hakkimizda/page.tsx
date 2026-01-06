import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Kalite Odaklı",
    description:
      "Her projede en yüksek standartları hedefliyoruz. Kod kalitesi ve kullanıcı deneyimi önceliğimiz.",
  },
  {
    icon: Users,
    title: "İşbirliği",
    description:
      "Müşterilerimizle yakın işbirliği içinde çalışıyoruz. Şeffaf iletişim ve düzenli güncellemeler.",
  },
  {
    icon: Award,
    title: "Yenilikçilik",
    description:
      "En güncel teknolojileri takip ediyor, projelerimizde en uygun çözümleri uyguluyoruz.",
  },
  {
    icon: Heart,
    title: "Tutku",
    description:
      "Yazılım geliştirmeyi seviyoruz. Bu tutku her projemize yansıyor.",
  },
];

const milestones = [
  { year: "2020", title: "Kuruluş", description: "KanyoDev kuruldu" },
  {
    year: "2021",
    title: "İlk Büyük Proje",
    description: "API platformu lansmanı",
  },
  {
    year: "2022",
    title: "Ekip Genişlemesi",
    description: "Mobil uygulama ekibi kuruldu",
  },
  { year: "2024", title: "20+ Proje", description: "20'den fazla proje teslimi" },
  {
    year: "2025",
    title: "Otomasyon Hizmetleri",
    description: "RPA ve otomasyon çözümleri eklendi",
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-4">Hakkımızda</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Fikirden Ürüne
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            KanyoDev olarak, işletmelerin dijital dönüşüm yolculuğunda güvenilir
            teknoloji partneri olmayı hedefliyoruz. Modern teknolojiler ve
            yaratıcı çözümlerle fikirlerinizi hayata geçiriyoruz.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Misyonumuz</h2>
            <p className="mt-4 text-muted-foreground">
              İşletmelerin dijital varlıklarını güçlendirmek, iş süreçlerini
              optimize etmek ve rekabet avantajı sağlamak için yenilikçi yazılım
              çözümleri sunmak.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Vizyonumuz</h2>
            <p className="mt-4 text-muted-foreground">
              Türkiye'nin önde gelen yazılım geliştirme şirketlerinden biri
              olmak ve global pazarda rekabet edebilen dijital ürünler ortaya
              koymak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Değerlerimiz</h2>
            <p className="mt-4 text-muted-foreground">
              Her projede bu değerleri ön planda tutuyoruz.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Yolculuğumuz</h2>
            <p className="mt-4 text-muted-foreground">
              Bugüne kadar kat ettiğimiz yol.
            </p>
          </div>
          <div className="mt-12">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />

              {/* Milestones */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                  >
                    <div className="w-1/2" />
                    <div className="absolute left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-primary">
                      <span className="text-xs font-bold text-primary-foreground">
                        {milestone.year.slice(2)}
                      </span>
                    </div>
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pl-12 text-left" : "pr-12 text-right"
                        }`}
                    >
                      <div className="rounded-lg border border-border bg-card p-4">
                        <span className="text-sm text-primary">
                          {milestone.year}
                        </span>
                        <h3 className="mt-1 font-semibold">{milestone.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-12 text-center">
          <h2 className="text-3xl font-bold">Birlikte Çalışalım</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Projeniz hakkında konuşmak ve size nasıl yardımcı olabileceğimizi
            görmek için iletişime geçin.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/iletisim">
              İletişime Geç
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
