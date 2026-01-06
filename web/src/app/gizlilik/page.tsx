import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | KanyoDev",
  description:
    "KanyoDev gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi.",
};

export default function GizlilikPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4">Yasal</Badge>
            <h1 className="text-4xl font-bold tracking-tight">
              Gizlilik Politikası
            </h1>
            <p className="mt-4 text-muted-foreground">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Genel Bakış</h2>
              <p className="text-muted-foreground leading-relaxed">
                KanyoDev olarak, web sitemizi ziyaret eden kullanıcılarımızın
                gizliliğini korumayı taahhüt ediyoruz. Bu gizlilik politikası,
                hangi bilgileri topladığımızı, nasıl kullandığımızı ve nasıl
                koruduğumuzu açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. Toplanan Bilgiler
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                İletişim formumuz aracılığıyla aşağıdaki bilgileri
                toplayabiliriz:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Ad ve soyad</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası (opsiyonel)</li>
                <li>Şirket adı (opsiyonel)</li>
                <li>Proje detayları ve mesaj içeriği</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. Bilgilerin Kullanımı
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Topladığımız bilgileri yalnızca aşağıdaki amaçlarla
                kullanıyoruz:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Proje taleplerinize yanıt vermek</li>
                <li>Hizmetlerimiz hakkında bilgi sağlamak</li>
                <li>Sizinle iletişim kurmak</li>
                <li>Hizmet kalitemizi iyileştirmek</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Bilgi Güvenliği</h2>
              <p className="text-muted-foreground leading-relaxed">
                Kişisel bilgilerinizi korumak için endüstri standardı güvenlik
                önlemleri uyguluyoruz. Verileriniz şifrelenmiş bağlantılar
                (SSL/TLS) üzerinden iletilir ve güvenli sunucularda saklanır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. Üçüncü Taraflarla Paylaşım
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kişisel bilgilerinizi yasal zorunluluklar dışında üçüncü
                taraflarla paylaşmıyoruz. Bilgileriniz satılmaz, kiralanmaz
                veya ticari amaçlarla kullanılmaz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Çerezler</h2>
              <p className="text-muted-foreground leading-relaxed">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için temel
                çerezler kullanabilir. Bu çerezler, tema tercihinizi (açık/koyu
                mod) hatırlamak gibi işlevler için kullanılır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Haklarınız</h2>
              <p className="text-muted-foreground leading-relaxed">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse bilgi talep etme</li>
                <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                <li>İşlemenin kısıtlanmasını talep etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. İletişim</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için bizimle
                iletişime geçebilirsiniz:
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>E-posta:</strong> info@kanyodev.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
