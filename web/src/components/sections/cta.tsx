"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Ücretsiz ilk görüşme",
  "7/24 Destek",
  "Esnek ödeme",
];

export function CTASection() {
  return (
    <section className="w-full py-14 border-t border-border">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Projenizi Hayata Geçirelim</h2>
          <p className="text-lg text-muted-foreground mt-3">
            Fikrinizi dinlemek için sabırsızlanıyoruz.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-base text-muted-foreground">
                <Check className="h-5 w-5 text-green-500" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button size="lg" asChild>
              <Link href="/iletisim">
                Ücretsiz Danışmanlık
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projeler">Projelerimiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
