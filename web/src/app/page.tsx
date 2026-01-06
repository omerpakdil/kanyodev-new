import { Metadata } from "next";
import {
  HeroSection,
  ServicesSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "KanyoDev | Web, Mobil ve Yazılım Çözümleri",
  description:
    "Modern web siteleri, mobil uygulamalar, e-ticaret çözümleri ve otomasyon hizmetleri. Fikirlerinizi en güncel teknolojilerle hayata geçiriyoruz.",
  openGraph: {
    title: "KanyoDev | Web, Mobil ve Yazılım Çözümleri",
    description:
      "Modern web siteleri, mobil uygulamalar, e-ticaret çözümleri ve otomasyon hizmetleri.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
