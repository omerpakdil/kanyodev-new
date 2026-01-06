"use client";

import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { ArrowRight, Search, Globe, Smartphone, ShoppingCart, Cog, Code, Zap, Building2, Stethoscope, GraduationCap, Truck, Utensils, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const features = [
  "Modern Teknolojiler",
  "Hızlı Teslimat",
  "7/24 Destek",
];

// Sektörler - tıklanabilir interaktif tag'ler
const industries = [
  { label: "E-Ticaret", icon: ShoppingCart },
  { label: "Sağlık", icon: Stethoscope },
  { label: "Eğitim", icon: GraduationCap },
  { label: "Lojistik", icon: Truck },
  { label: "Restoran", icon: Utensils },
  { label: "Kurumsal", icon: Building2 },
  { label: "Startup", icon: Briefcase },
  { label: "Fintech", icon: Code },
];

// Hizmetler
const services = [
  { label: "Web Sitesi", icon: Globe },
  { label: "Mobil Uygulama", icon: Smartphone },
  { label: "Otomasyon", icon: Cog },
  { label: "API", icon: Code },
];

export function HeroSection() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Random highlight animation for industries
  useEffect(() => {
    if (selectedIndustry) return; // Stop animation when user selects

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * industries.length);
      setHighlightedIndex(randomIndex);
    }, 1200);

    return () => clearInterval(interval);
  }, [selectedIndustry]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 lg:py-20 overflow-hidden"
    >
      {/* Mouse-following gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Yazılım Çözümleri için{" "}
              <TypewriterText
                words={["Güvenilir Partner", "İnovatif Yaklaşım", "Uzman Ekip"]}
                className="text-primary"
                typingSpeed={50}
                deletingSpeed={30}
                pauseDuration={1200}
              />
            </h1>

            <p className="text-muted-foreground text-xl max-w-xl leading-relaxed">
              Web, mobil ve kurumsal yazılım çözümleri sunuyoruz.
              Fikirlerinizi modern teknolojilerle hayata geçiriyoruz.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6 text-base text-muted-foreground">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" asChild>
                <Link href="/iletisim">
                  Proje Başlat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projeler">Projelerimiz</Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-12 pt-6">
              <div>
                <div className="text-4xl font-bold text-primary">20+</div>
                <div className="text-muted-foreground text-base">Proje</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-muted-foreground text-base">Müşteri</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">5+</div>
                <div className="text-muted-foreground text-base">Yıl</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Area */}
          <div className="space-y-6">
            {/* Search box */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-600/50 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative flex items-center rounded-xl border border-border bg-card px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="Projenizi tanımlayın..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Industries - Interactive tags */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                veya sektör seçin
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, index) => {
                  const isHighlighted = highlightedIndex === index && !selectedIndustry;
                  const isSelected = selectedIndustry === industry.label;

                  return (
                    <button
                      key={industry.label}
                      onClick={() => setSelectedIndustry(
                        selectedIndustry === industry.label ? null : industry.label
                      )}
                      className={`
                        group relative inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium
                        transition-all duration-300 hover:scale-105
                        ${isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : isHighlighted
                            ? 'border-primary/70 bg-primary/5 text-foreground'
                            : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-card'
                        }
                      `}
                    >
                      <industry.icon className={`h-4 w-4 transition-colors ${isSelected || isHighlighted ? 'text-primary' : 'group-hover:text-primary'
                        }`} />
                      {industry.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">Tıklayarak keşfedin</p>
            </div>

            {/* Services */}
            <div className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Hizmetler
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <Link
                    key={service.label}
                    href={`/hizmetler#${service.label.toLowerCase().replace(" ", "-")}`}
                    className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105"
                  >
                    <service.icon className="h-4 w-4" />
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick contact */}
            <div className="flex items-center gap-4 pt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:info@kanyodev.com">
                  <Code className="mr-2 h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+905551234567">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Ara
                </a>
              </Button>
              <span className="text-xs text-muted-foreground">veya</span>
              <Link href="/iletisim" className="text-sm text-primary hover:underline">
                Form doldurun →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
