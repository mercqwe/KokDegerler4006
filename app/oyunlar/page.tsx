"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { games } from "@/lib/proverbs-data";
import {
  ExternalLink,
  Gamepad2,
  ChevronLeft,
  Rocket,
  Trophy,
  Puzzle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const gameColors = [
  "from-cyan-400 to-blue-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <Navbar />

      {/* Hero Section - Beyaz ve Ferah */}
      <section className="relative -mt-20 overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Dekoratif Arka Plan Elemanları */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-cyan-50 via-transparent to-transparent" />
          <div
            className="absolute top-0 left-0 h-full w-full opacity-[0.03] grayscale"
            style={{
              backgroundImage: 'url("/images/hero-bg.jpg")',
              backgroundSize: "cover",
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-cyan-100/50 transition-transform hover:scale-110">
            <Gamepad2 className="size-10 text-cyan-500" />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Eğlenceyle{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Öğrenin
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-500 md:text-xl leading-relaxed">
            Atasözleri ve kök değerlerimizi interaktif oyunlarla pekiştirin.
            Bilginizi test edin, kültürel mirasımızı keyifle keşfedin.
          </p>

          
        </div>

        {/* Yumuşak Geçiş Dalgası */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120V60C240 90 480 100 720 80C960 60 1200 40 1440 60V120H0Z"
              fill="#fafaf9"
            />
          </svg>
        </div>
      </section>

      {/* Games Grid Area */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {games.map((game, index) => {
            const currentGradient = gameColors[index % gameColors.length];

            return (
              <Card
                key={game.id}
                className="group relative overflow-hidden border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
              >
                {/* Kart Üst Süsleme */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${currentGradient} opacity-70`}
                />

                <CardHeader className="pt-10 pb-4 px-8">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${currentGradient} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Gamepad2 className="size-8" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                        Platform
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        Wordwall
                      </p>
                    </div>
                  </div>

                  <CardTitle className="mt-8 text-2xl font-black text-slate-900 md:text-3xl">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-base font-medium leading-relaxed text-slate-500">
                    {game.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-10">
                  <div className="flex flex-col gap-4">
                    <div className="h-px w-full bg-slate-100" />
                    <Button
                      asChild
                      className={`h-14 w-full rounded-2xl bg-gradient-to-r ${currentGradient} text-white shadow-xl shadow-current/10 transition-all duration-300 hover:brightness-105 hover:shadow-2xl active:scale-95`}
                    >
                      <Link
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <span className="text-sm font-black uppercase tracking-widest">
                          Hemen Oyna
                        </span>
                        <ExternalLink className="size-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>

                {/* Arka plan dekoratif ikon */}
                <Gamepad2 className="absolute -right-8 -bottom-8 size-40 opacity-[0.02] transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4" />
              </Card>
            );
          })}
        </div>

        {/* Alt Bilgi ve Dönüş */}
        <div className="mt-24 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold tracking-widest text-slate-400 transition-colors hover:text-cyan-600 uppercase"
          >
            <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            Keşfetmeye Devam Et
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
