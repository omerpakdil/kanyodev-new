import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left - Brand */}
          <div className="flex items-center gap-8">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Fikirden Ürüne
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/hizmetler" className="text-muted-foreground hover:text-foreground">
              Hizmetler
            </Link>
            <Link href="/projeler" className="text-muted-foreground hover:text-foreground">
              Projeler
            </Link>
            <Link href="/hakkimizda" className="text-muted-foreground hover:text-foreground">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-muted-foreground hover:text-foreground">
              İletişim
            </Link>
          </div>

          {/* Right - Contact */}
          <a
            href="mailto:info@kanyodev.com"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">info@kanyodev.com</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} KanyoDev. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik" className="hover:text-foreground">
              Gizlilik Politikası
            </Link>
            <span>Ankara, Türkiye</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
