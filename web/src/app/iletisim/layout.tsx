import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | KanyoDev",
  description:
    "Projeniz hakkında konuşalım. Ücretsiz danışmanlık için bizimle iletişime geçin. Web, mobil ve yazılım çözümleri için teklif alın.",
  openGraph: {
    title: "İletişim | KanyoDev",
    description:
      "Projeniz hakkında konuşalım. Ücretsiz danışmanlık için bizimle iletişime geçin.",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
