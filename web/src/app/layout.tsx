import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { RequestPanel } from "@/components/request-panel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanyoDev | Fikirden Ürüne",
  description:
    "Modern ve ölçeklenebilir web, mobil ve yazılım çözümleri. Fikirlerinizi hayata geçiriyoruz.",
  keywords: ["yazılım", "web geliştirme", "mobil uygulama", "e-ticaret", "otomasyon"],
  authors: [{ name: "KanyoDev" }],
  openGraph: {
    title: "KanyoDev | Fikirden Ürüne",
    description: "Modern ve ölçeklenebilir yazılım çözümleri",
    url: "https://kanyodev.com",
    siteName: "KanyoDev",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <RequestPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
