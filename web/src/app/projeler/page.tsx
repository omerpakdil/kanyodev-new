"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Smartphone, Gamepad2 } from "lucide-react";

const categories = ["Tümü", "Web", "Mobil", "Oyun"];

const projects = [
  {
    id: 1,
    title: "Katsau",
    description:
      "Geliştiriciler için URL Metadata API. Link preview, OG tag doğrulama ve metadata çıkarma hizmeti.",
    category: "Web",
    image: "/projects/katsau.png",
    icon: null,
    gradient: null,
    technologies: ["Next.js", "Node.js", "TypeScript", "Hono", "Vercel"],
    featured: true,
    liveUrl: "https://www.katsau.com",
    githubUrl: null,
  },
  {
    id: 2,
    title: "StudyMap",
    description:
      "SAT, GRE ve TOEFL sınavlarına hazırlık için akıllı mobil uygulama. Kişiselleştirilmiş çalışma planları ve ilerleme takibi.",
    category: "Mobil",
    image: null,
    icon: Smartphone,
    gradient: "from-slate-800 via-slate-700 to-slate-800",
    technologies: ["React Native", "Expo", "Supabase", "TypeScript"],
    featured: true,
    liveUrl: "https://apps.apple.com/tr/app/studymap-sat-gre-toefl-prep/id6748285218",
    githubUrl: null,
  },
  {
    id: 3,
    title: "Letter Exchange",
    description:
      "Kelime oluşturarak ilerleyen eğlenceli bulmaca oyunu. Harfleri değiştir, kelimeler yarat!",
    category: "Oyun",
    image: null,
    icon: Gamepad2,
    gradient: "from-zinc-800 via-zinc-700 to-zinc-800",
    technologies: ["React Native", "Expo", "Supabase", "TypeScript"],
    featured: true,
    liveUrl: null,
    githubUrl: null,
  },
  {
    id: 4,
    title: "Lexit",
    description:
      "Minimalist tasarımlı kelime bulmaca oyunu. Harfleri bağla, kelimeleri keşfet.",
    category: "Oyun",
    image: null,
    icon: Gamepad2,
    gradient: "from-neutral-800 via-neutral-700 to-neutral-800",
    technologies: ["React Native", "Expo", "TypeScript"],
    featured: false,
    liveUrl: null,
    githubUrl: null,
  },
];

export default function ProjelerPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredProjects =
    activeCategory === "Tümü"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen py-24">
      <div className="px-60">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-4">Portfolyo</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projelerimiz
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Geliştirdiğimiz projelerden örnekler. Her biri özenle tasarlandı.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-12 flex justify-center">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
            >
              {/* Image or Gradient Placeholder */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                    {project.icon && <project.icon className="h-20 w-20 text-white/80" />}
                  </div>
                )}
                {project.featured && (
                  <Badge className="absolute right-3 top-3">Öne Çıkan</Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="outline" className="mb-3">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  {project.liveUrl && (
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Görüntüle
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Kaynak
                      </a>
                    </Button>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <Button size="sm" variant="outline" disabled className="flex-1">
                      Yakında
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-12 border border-border">
          <h2 className="text-2xl font-bold">Sizin Projeniz de Burada Olabilir</h2>
          <p className="mt-4 text-muted-foreground">
            Fikrinizi hayata geçirmek için hemen iletişime geçin.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <a href="/iletisim">Proje Başlat</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
