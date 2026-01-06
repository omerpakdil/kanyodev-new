import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hizmetler | KanyoDev",
  description:
    "Web geliştirme, mobil uygulama, e-ticaret, otomasyon, API geliştirme ve cloud çözümleri. İhtiyacınıza uygun yazılım hizmetleri.",
  openGraph: {
    title: "Hizmetler | KanyoDev",
    description:
      "Web geliştirme, mobil uygulama, e-ticaret, otomasyon, API geliştirme ve cloud çözümleri.",
  },
};

export default function HizmetlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
