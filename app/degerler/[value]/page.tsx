"use client";

import { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  getProverbsByValue,
  getValueInfo,
  type RootValue,
} from "@/lib/proverbs-data";
import {
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Info,
  Scale,
  Users,
  Shield,
  Brain,
  Clock,
  Heart,
  HeartHandshake,
  Target,
  Flag,
  HandHeart,
  BookMarked,
  Quote,
} from "lucide-react";

const iconMap = {
  Scale,
  Users,
  Shield,
  Brain,
  Clock,
  Heart,
  HeartHandshake,
  Target,
  Flag,
  HandHeart,
};

export default function ValuePage({
  params,
}: {
  params: Promise<{ value: string }>;
}) {
  const resolvedParams = use(params);
  const [searchTerm, setSearchTerm] = useState("");
  const [descIndex, setDescIndex] = useState(0);

  const valueId = resolvedParams.value as RootValue;
  const valueInfo = getValueInfo(valueId);

  if (!valueInfo) {
    notFound();
  }

  const allProverbs = getProverbsByValue(valueId);
  const Icon = iconMap[valueInfo.icon as keyof typeof iconMap];

  // Carousel navigasyon fonksiyonları
  const nextDesc = () => {
    setDescIndex((prev) => (prev + 1) % valueInfo.descriptions.length);
  };
  const prevDesc = () => {
    setDescIndex(
      (prev) =>
        (prev - 1 + valueInfo.descriptions.length) %
        valueInfo.descriptions.length,
    );
  };

  const filteredProverbs = useMemo(() => {
    if (!searchTerm) return allProverbs;
    const normalizedSearch = searchTerm.toLocaleLowerCase("tr-TR");

    return allProverbs.filter((proverb) => {
      const textMatch = proverb.text
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch);
      const meaningMatch = proverb.meaning
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch);
      return textMatch || meaningMatch;
    });
  }, [searchTerm, allProverbs]);

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <Navbar />

      {/* Exhibit Header Section */}
      <section className="relative overflow-hidden border-b border-slate-200 pt-12 pb-20">
        <div
          className={`absolute inset-0 opacity-10 ${valueInfo.color}`}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Koleksiyona Dön
          </Link>

          <div className="relative mt-12 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl w-full">
              <div className="flex items-center gap-3">
                <div
                  className={`h-1 w-12 rounded-full ${valueInfo.color} shadow-sm`}
                />
                <span className="text-sm font-bold uppercase tracking-tighter text-slate-500">
                  Meb Müfredat Dizisi
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-black leading-none text-slate-900 md:text-7xl lg:text-8xl">
                {valueInfo.label}
              </h1>

              {/* AÇIKLAMA CAROUSEL SİSTEMİ */}
              <div className="mt-8 relative">
                <div className="flex items-start gap-4 min-h-[140px] md:min-h-[100px]">
                  <div className="mt-1 flex-shrink-0">
                    <Info
                      className={`size-6 ${valueInfo.color.replace("bg-", "text-")}`}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-xl font-medium leading-relaxed text-slate-700 md:text-2xl transition-opacity duration-300">
                      {valueInfo.descriptions[descIndex]}
                    </p>

                    {/* Gösterge Noktaları */}
                    <div className="mt-4 flex items-center gap-2">
                      {valueInfo.descriptions.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${i === descIndex ? `w-8 ${valueInfo.color}` : "w-2 bg-slate-900"}`}
                        />
                      ))}
                    </div>

                    {/* Navigasyon Okları */}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={prevDesc}
                        className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                        aria-label="Önceki açıklama"
                      >
                        <ChevronLeft className="size-5 text-slate-600" />
                      </button>
                      <button
                        onClick={nextDesc}
                        className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors"
                        aria-label="Sonraki açıklama"
                      >
                        <ChevronRight className="size-5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute -right-12 top-0 z-0 opacity-10 lg:relative lg:right-0 lg:opacity-20 ${valueInfo.color.replace("bg-", "text-")}`}
            >
              {Icon && <Icon className="size-48 lg:size-64" />}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery & Search Area */}
      <section className="container mx-auto px-4 py-16">
        <div className="sticky top-20 z-30 mb-16 flex flex-col items-center gap-4 border-y border-slate-200 bg-[#fafaf9]/80 py-6 backdrop-blur-md md:flex-row md:justify-between">
          <div className="relative w-full md:max-w-lg">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-900" />
            <input
              type="text"
              placeholder="Arşivde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent py-4 pl-12 text-lg font-medium placeholder:text-slate-300 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 md:mr-4">
            <BookMarked className="size-4 text-slate-900" />
            <span>{filteredProverbs.length} Atasözü Listeleniyor</span>
          </div>
        </div>

        {/* Minimalist Grid Design */}
        {filteredProverbs.length > 0 ? (
          <div className="grid gap-px bg-slate-200 border border-slate-200 shadow-sm">
            {filteredProverbs.map((proverb) => (
              <div
                key={proverb.id}
                className="group relative bg-white p-8 transition-colors hover:bg-slate-50 md:p-12"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  <div className="lg:col-span-1">
                    <Quote className="size-8 text-slate-100 transition-colors group-hover:text-slate-200" />
                  </div>
                  <div className="lg:col-span-5">
                    <h3 className="text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
                      {proverb.text}
                    </h3>
                  </div>
                  <div className="lg:col-span-6">
                    <div className="space-y-2">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Açıklama / Tasvir
                      </span>
                      <p className="text-lg leading-relaxed text-slate-600 italic">
                        {proverb.meaning}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute inset-y-0 left-0 w-1.5 scale-y-0 ${valueInfo.color} transition-transform duration-300 group-hover:scale-y-100`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 py-32 text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-slate-100">
              <Search className="size-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Arşivde Bulunamadı
            </h3>
            <p className="mt-2 text-slate-500">
              Aramanıza uygun bir kayıt bulunmuyor.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="mt-8 rounded-none border-slate-900 px-8 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white"
            >
              Filtreyi Temizle
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
