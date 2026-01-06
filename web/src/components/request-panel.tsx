"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import {
  MessageSquarePlus,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  Smartphone,
  ShoppingCart,
  Cog,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const projectTypes = [
  {
    id: "web",
    icon: Globe,
    label: "Web Sitesi / Uygulama",
    description: "Kurumsal site, SaaS, portal",
  },
  {
    id: "mobil",
    icon: Smartphone,
    label: "Mobil Uygulama",
    description: "iOS, Android, cross-platform",
  },
  {
    id: "eticaret",
    icon: ShoppingCart,
    label: "E-Ticaret",
    description: "Online mağaza, marketplace",
  },
  {
    id: "otomasyon",
    icon: Cog,
    label: "Otomasyon",
    description: "RPA, iş süreçleri, entegrasyon",
  },
  {
    id: "diger",
    icon: Sparkles,
    label: "Diğer",
    description: "API, backend, danışmanlık",
  },
];

const budgetRanges = [
  { id: "small", label: "10.000 - 25.000 TL", value: "10000-25000" },
  { id: "medium", label: "25.000 - 50.000 TL", value: "25000-50000" },
  { id: "large", label: "50.000 - 100.000 TL", value: "50000-100000" },
  { id: "enterprise", label: "100.000 TL+", value: "100000+" },
  { id: "unsure", label: "Henüz belirlemedim", value: "unsure" },
];

const timelineOptions = [
  { id: "urgent", label: "Acil (1-2 hafta)", value: "urgent" },
  { id: "soon", label: "Yakın (1-2 ay)", value: "soon" },
  { id: "normal", label: "Normal (2-4 ay)", value: "normal" },
  { id: "flexible", label: "Esnek", value: "flexible" },
];

interface FormData {
  projectType: string;
  description: string;
  features: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export function RequestPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    description: "",
    features: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success("Talebiniz başarıyla gönderildi! En kısa sürede dönüş yapacağız.");
    setIsOpen(false);
    setStep(1);
    setFormData({
      projectType: "",
      description: "",
      features: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.projectType !== "";
      case 2:
        return formData.description.length >= 10;
      case 3:
        return formData.budget !== "" && formData.timeline !== "";
      case 4:
        return formData.name !== "" && formData.email !== "";
      default:
        return false;
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MessageSquarePlus className="h-6 w-6" />
      </motion.button>

      {/* Panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-8">
          <SheetHeader>
            <SheetTitle>Yazılım Talebi Oluştur</SheetTitle>
            <SheetDescription>
              Projeniz hakkında bilgi verin, size özel teklif hazırlayalım.
            </SheetDescription>
          </SheetHeader>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Adım {step} / {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">
                    Ne tür bir proje istiyorsunuz?
                  </h3>
                  <div className="grid gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateFormData("projectType", type.id)}
                        className={cn(
                          "flex items-center gap-4 rounded-lg border p-4 text-left transition-all",
                          formData.projectType === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            formData.projectType === type.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <type.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{type.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                        {formData.projectType === type.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold">Projenizi anlatın</h3>

                  <div className="space-y-2">
                    <Label htmlFor="description">Proje açıklaması *</Label>
                    <Textarea
                      id="description"
                      placeholder="Projeniz hakkında kısa bir açıklama yazın. Ne yapmak istiyorsunuz?"
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        updateFormData("description", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features">
                      İstediğiniz özellikler (opsiyonel)
                    </Label>
                    <Textarea
                      id="features"
                      placeholder="Örn: Kullanıcı girişi, ödeme sistemi, admin paneli..."
                      rows={3}
                      value={formData.features}
                      onChange={(e) =>
                        updateFormData("features", e.target.value)
                      }
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Budget & Timeline */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold">Bütçe ve Zaman</h3>

                  <div className="space-y-3">
                    <Label>Tahmini bütçeniz *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range.id}
                          onClick={() => updateFormData("budget", range.value)}
                          className={cn(
                            "rounded-lg border px-4 py-3 text-sm transition-all",
                            formData.budget === range.value
                              ? "border-primary bg-primary/5 font-medium"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Ne zaman başlamak istiyorsunuz? *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {timelineOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            updateFormData("timeline", option.value)
                          }
                          className={cn(
                            "rounded-lg border px-4 py-3 text-sm transition-all",
                            formData.timeline === option.value
                              ? "border-primary bg-primary/5 font-medium"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        placeholder="Adınız Soyadınız"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          updateFormData("email", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon (opsiyonel)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+90 (___) ___ __ __"
                        value={formData.phone}
                        onChange={(e) =>
                          updateFormData("phone", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Şirket (opsiyonel)</Label>
                      <Input
                        id="company"
                        placeholder="Şirket adı"
                        value={formData.company}
                        onChange={(e) =>
                          updateFormData("company", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>

            {step < totalSteps ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                İleri
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Talebi Gönder
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
