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
  X,
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

  const valueId = resolvedParams.value as RootValue;
  const valueInfo = getValueInfo(valueId);

  if (!valueInfo) {
    notFound();
  }

  const allProverbs = getProverbsByValue(valueId);
  const Icon = iconMap[valueInfo.icon as keyof typeof iconMap];

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
      <section className="relative overflow-hidden border-b border-slate-200 pt-10 pb-14 md:pt-12 md:pb-20">
        {/* Subtle background tint */}
        <div
          className={`absolute inset-0 opacity-5 ${valueInfo.color}`}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Koleksiyona Dön
          </Link>

          {/* Series label + title + icon row */}
          <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-8">
            <div className="flex items-center gap-3">
              <div
                className={`h-1 w-10 rounded-full ${valueInfo.color} shadow-sm`}
              />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Meb Müfredat Dizisi
              </span>
            </div>

            {/* Title row: big heading + decorative icon side by side on larger screens */}
            <div className="flex items-end justify-between gap-4">
              <h1 className="text-5xl font-black leading-none text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
                {valueInfo.label}
              </h1>
              {/* Decorative icon — visible on sm+ but hidden on tiny phones */}
              {Icon && (
                <div
                  className={`hidden shrink-0 opacity-8 sm:block ${valueInfo.color.replace("bg-", "text-")}`}
                  aria-hidden="true"
                >
                  <Icon className="size-20 md:size-32 lg:size-40 opacity-10" />
                </div>
              )}
            </div>
          </div>

          {/* Description panel — full-width below title */}
          <div className="mt-10 border-l-2 border-slate-200 pl-5 sm:pl-8">
            <div className="mb-6 flex items-center gap-2">
              <Info className="size-4 shrink-0 text-slate-900" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Tanım ve Kapsam
              </span>
            </div>

            <div className="space-y-8">
              {valueInfo.descriptions.map((desc, index) => (
                <div key={index} className="group relative">
                  <p className="text-base font-semibold leading-relaxed text-slate-700 sm:text-lg md:text-xl lg:text-2xl">
                    {desc.text}
                  </p>
                  {desc.example && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                      <span className="mt-0.5 shrink-0 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Örnek:
                      </span>
                      <p className="text-sm italic text-slate-500">
                        "{desc.example}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery & Search Area */}
      <section className="container mx-auto px-4 py-10 sm:px-6 sm:py-16">
        {/* Sticky search bar */}
        <div className="sticky top-16 z-30 mb-10 border-y border-slate-200 bg-[#fafaf9]/90 py-4 backdrop-blur-md sm:mb-16 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search input */}
            <div className="relative flex-1 sm:max-w-lg">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 sm:left-4 sm:size-5 sm:text-slate-900" />
              <input
                type="text"
                placeholder="Arşivde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-3 pl-10 pr-10 text-base font-medium placeholder:text-slate-300 focus:outline-none sm:py-4 sm:pl-12 sm:text-lg"
              />
              {/* Clear button — visible only when there's text */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  aria-label="Aramayı temizle"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:text-slate-900"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Count badge */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 sm:mr-4 sm:gap-4 sm:text-xs">
              <BookMarked className="size-4 shrink-0 text-slate-900" />
              <span>{filteredProverbs.length} Atasözü Listeleniyor</span>
            </div>
          </div>
        </div>

        {/* Proverbs grid */}
        {filteredProverbs.length > 0 ? (
          <div className="grid gap-px border border-slate-200 bg-slate-200 shadow-sm">
            {filteredProverbs.map((proverb) => (
              <div
                key={proverb.id}
                className="group relative bg-white p-5 transition-colors hover:bg-slate-50 sm:p-8 md:p-10 lg:p-12"
              >
                {/* Accent bar on hover */}
                <div
                  className={`absolute inset-y-0 left-0 w-1 scale-y-0 ${valueInfo.color} transition-transform duration-300 group-hover:scale-y-100 sm:w-1.5`}
                />

                {/* Mobile: stacked layout; lg: grid layout */}
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
                  {/* Quote icon */}
                  <div className="hidden lg:col-span-1 lg:block">
                    <Quote className="size-7 text-slate-100 transition-colors group-hover:text-slate-200" />
                  </div>

                  {/* Proverb text */}
                  <div className="lg:col-span-5">
                    {/* Mobile quote icon inline with text */}
                    <div className="mb-2 flex items-start gap-2 lg:hidden">
                      <Quote className="mt-1 size-4 shrink-0 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl md:text-3xl">
                      {proverb.text}
                    </h3>
                  </div>

                  {/* Meaning */}
                  <div className="lg:col-span-6">
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Açıklama / Tasvir
                      </span>
                      <p className="text-base leading-relaxed text-slate-600 sm:text-lg italic">
                        {proverb.meaning}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 px-6 py-20 text-center sm:py-32">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-slate-100 sm:size-20">
              <Search className="size-8 text-slate-300 sm:size-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Arşivde Bulunamadı
            </h3>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Aramanıza uygun bir kayıt bulunmuyor.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="mt-8 rounded-none border-slate-900 px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white sm:px-8"
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