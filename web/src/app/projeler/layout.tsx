import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler | KanyoDev",
  description:
    "Web, mobil ve oyun projelerimizden örnekler. Katsau, StudyMap ve daha fazlası. Her proje özenle tasarlandı ve geliştirildi.",
  openGraph: {
    title: "Projeler | KanyoDev",
    description:
      "Web, mobil ve oyun projelerimizden örnekler. Her proje özenle tasarlandı ve geliştirildi.",
  },
};

export default function ProjelerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
