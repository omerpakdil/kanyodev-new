"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

const projectTypes = [
  "Web Sitesi",
  "Mobil Uygulama",
  "E-Ticaret",
  "Otomasyon",
  "API Geliştirme",
  "Diğer",
];

const budgetRanges = [
  "10.000 TL - 25.000 TL",
  "25.000 TL - 50.000 TL",
  "50.000 TL - 100.000 TL",
  "100.000 TL+",
  "Belirsiz",
];

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gönderim hatası");
      }

      setIsSubmitted(true);
      toast.success("Mesajınız başarıyla gönderildi!");
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Teşekkürler!</h1>
          <p className="mt-4 text-muted-foreground">
            Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime
            geçeceğiz.
          </p>
          <Button
            className="mt-8"
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Yeni Mesaj Gönder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="px-60">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-4">İletişim</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projenizi Konuşalım
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Fikrinizi hayata geçirmek için ilk adımı atın. Size en uygun çözümü
            birlikte belirleyelim.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold">İletişim Bilgileri</h2>
              <p className="mt-2 text-muted-foreground">
                Bize doğrudan ulaşabilirsiniz.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@kanyodev.com"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    info@kanyodev.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Telefon</p>
                  <a
                    href="tel:+905551234567"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    +90 (555) 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Konum</p>
                  <p className="text-muted-foreground">Ankara, Türkiye</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Çalışma Saatleri</p>
                  <p className="text-muted-foreground">
                    Pazartesi - Cuma: 09:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-medium">Hızlı Yanıt</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Genellikle 24 saat içinde yanıt veriyoruz.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+90 (___) ___ __ __"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Şirket</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Şirket adı (opsiyonel)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Proje Tipi *</Label>
                  <Select name="projectType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Tahmini Bütçe</Label>
                  <Select name="budget">
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Proje Detayları *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Projeniz hakkında kısa bilgi verin. Ne tür bir uygulama istiyorsunuz? Hangi özelliklere ihtiyacınız var?"
                    rows={6}
                    required
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Gönder
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
