"use client";

import Link from "next/link";
import Image from "next/image"; // Image bileşeni eklendi
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Gamepad2, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Bölümü */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl transition-all group-hover:scale-105">
            {/* Lucide ikon yerine logo.png yerleştirildi */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-slate-900">
              ATASÖZLERİ
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-700">
              KÖK DEĞERLER
            </span>
          </div>
        </Link>

        {/* Navigasyon */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`hidden md:block text-sm font-bold tracking-wide transition-colors hover:text-cyan-600 ${
              pathname === "/" ? "text-cyan-600" : "text-slate-600"
            }`}
          >
            Ana Sayfa
          </Link>

          <Button
            variant="ghost"
            asChild
            className={`relative gap-2 rounded-xl px-5 font-bold transition-all hover:bg-slate-100 hover:text-slate-900 ${
              pathname === "/oyunlar"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600"
            }`}
          >
            <Link href="/oyunlar">
              <Gamepad2 className="size-4 text-cyan-600" />
              <span>Oyunlar</span>
              {pathname === "/oyunlar" && (
                <Sparkles className="absolute -right-1 -top-1 size-3 text-amber-500 animate-pulse" />
              )}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
