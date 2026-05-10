"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { rootValues, getStatistics } from "@/lib/proverbs-data";
import {
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

export function ValuesGrid() {
  const stats = getStatistics();

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Arka planda hafif motif dokusu */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0L40 20L20 40L0 20Z"
              fill="currentColor"
              className="text-slate-900"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-cyan-950/5 border border-cyan-200 px-4 py-1 text-sm font-semibold text-cyan-800 backdrop-blur-sm">
            Müfredat Uyumlu (MEB)
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            10 Temel <span className="text-cyan-600">Kök Değer</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-cyan-600 to-amber-400" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Karakterimizi şekillendiren bu değerler, yüzyıllardır
            atasözlerimizde hayat buluyor. İncelemek istediğiniz değeri seçin.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {rootValues.map((value) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap];
            const count = stats.valueCounts[value.id];

            return (
              <Link
                key={value.id}
                href={`/degerler/${value.id}`}
                className="group outline-none"
              >
                <Card className="relative h-full overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/10 hover:border-cyan-200">
                  {/* Kartın üst kısmındaki renkli ince çizgi */}
                  <div className={`h-1.5 w-full ${value.color} opacity-80`} />

                  <CardContent className="flex flex-col items-center p-8 text-center">
                    {/* İkon Konteynırı */}
                    <div
                      className={`mb-6 flex size-16 items-center justify-center rounded-2xl ${value.color} text-white shadow-lg shadow-current/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-10`}
                    >
                      {Icon && (
                        <Icon className="size-8 transition-transform group-hover:scale-110" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-cyan-700">
                      {value.label}
                    </h3>

                    {/* <div className="mt-4 flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 transition-colors group-hover:bg-cyan-50">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-700">{count}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 group-hover:text-cyan-600">Atasözü</span>
                    </div> */}
                  </CardContent>

                  {/* Hover durumunda köşeden çıkan minik dekoratif motif */}
                  <div className="absolute -bottom-4 -right-4 size-12 opacity-0 transition-opacity group-hover:opacity-10 text-slate-900">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" />
                    </svg>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
