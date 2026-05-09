"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative -mt-20 flex min-h-[90vh] md:min-h-screen items-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        {/* Arka Plan Radyal Gradyan */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-cyan-50/50 via-white to-white" />

        {/* Arka plan deseni */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Turkish cultural pattern"
            fill
            className="object-cover opacity-[0.03] mix-blend-multiply scale-110 blur-[2px]"
            priority
          />
        </div>

        {/* Atatürk PNG - Mobilde gizli, masaüstünde şık bir silüet */}
        <div className="absolute bottom-0 right-0 z-10 hidden h-full w-full md:w-2/3 lg:w-1/2 select-none pointer-events-none opacity-60 md:block overflow-hidden">
          <Image
            src="/images/ataturk.png"
            alt="Mustafa Kemal Atatürk"
            fill
            className="object-contain object-right-bottom grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white" />
        </div>
      </div>

      {/* İçerik Katmanı */}
      <div className="container relative z-20 mx-auto px-4 pt-32 pb-24 md:pt-40">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/50 px-4 py-1.5 text-xs md:text-sm font-bold tracking-wide text-cyan-700 backdrop-blur-xl">
            MEB KÖK DEĞERLER PROJESİ
          </span>

          {/* Başlık mobilde text-2xl'den başlıyor, tablet ve üstünde kademeli büyüyor */}
          <h1 className="relative text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-6xl lg:text-7xl">
            Atasözlerinin Gizli Dili:
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Kök Değerlere Göre Dijital Sözlük
            </span>
          </h1>

          <p className="mt-6 md:mt-8 max-w-xl text-base font-medium leading-relaxed text-slate-600 md:text-xl">
            Kültürel mirasımızın bilgeliğini keşfedin. MEB tarafından belirlenen
            <span className="text-cyan-600 font-bold">
              {" "}
              10 temel değer
            </span>{" "}
            ışığında atasözlerimizi yeniden yorumluyoruz.
          </p>

          {/* İstatistikler ve Logo Yan Yana */}
          <div className="mt-10 md:mt-12 flex items-center gap-6 md:gap-10">
            {/* Kartlar Grubu */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
              <div className="group flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 md:p-5 shadow-sm transition-all hover:bg-white hover:shadow-md">
                <span className="text-2xl md:text-3xl font-black text-cyan-600">
                  30+
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Atasözü Arşivi
                </span>
              </div>
              <div className="group flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 md:p-5 shadow-sm transition-all hover:bg-white hover:shadow-md">
                <span className="text-2xl md:text-3xl font-black text-blue-600">
                  10
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Temel Değer
                </span>
              </div>
            </div>

            {/* LOGO - Kartların Sağında (Sadece Masaüstü) */}
            <div className="hidden md:block relative group">
              <div className="absolute -inset-2 rounded-full bg-cyan-100/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative size-44 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="Proje Logosu"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Dalga (Wave) */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto min-h-[60px]"
        >
          <path
            d="M0 120V60C240 90 480 100 720 80C960 60 1200 40 1440 60V120H0Z"
            fill="currentColor"
            className="text-[#fafaf9]"
          />
        </svg>
      </div>
    </section>
  );
}
