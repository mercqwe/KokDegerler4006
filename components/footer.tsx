"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronDown } from "lucide-react";
import { rootValues } from "@/lib/proverbs-data";

export function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Ana Izgara Yapısı */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* 1. Bölüm: Logo & Accordion (Metinler Değiştirilmeden Eklenmiştir) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  ATASÖZLERİ
                </span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-cyan-600 uppercase">
                  Kök Değerler
                </span>
              </div>
            </div>

            {/* Accordion - İstediğin 3 Başlık ve Değişmeyen Metinler */}
            <div className="space-y-2 pt-4">
              {/* Bölüm 1 */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleSection(1)}
                  className="flex w-full items-center justify-between py-4 text-left text-xs font-black uppercase tracking-widest text-slate-900 hover:text-cyan-600 transition-colors"
                >
                  Atasözleri Nedir?
                  <ChevronDown
                    className={`size-4 transition-transform ${openSection === 1 ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSection === 1 ? "max-h-[1000px] pb-6" : "max-h-0"}`}
                >
                  <div className="space-y-4 text-sm leading-relaxed text-slate-500">
                    <p>
                      Atasözü geçmişten günümüze gelen, uzun deneyimlerden
                      yararlanarak kısa ve özlü öğütler veren, toplum tarafından
                      benimsenerek ortak olarak kullanılan kalıplaşmış
                      sözlerdir. Türkçede "sav" ve "irsal-i mesel, darb-ı mesel"
                      olarak da adlandırılır.
                    </p>
                    <p>
                      Atasözleri bir toplumun duygu, düşünce, inanç ve kültür
                      yapısını yansıtır. Atasözleri, kim tarafından ne zaman
                      söylendiği bilinmediğinden anonimdir. Bu sözler topluma
                      mâl olmuş, toplum tarafından benimsenmiş ve yüzyılların
                      düşünce ve mantık isteminden geçerek günümüze ulaşmış kısa
                      ve özlü sözlerdir. Atasözleri, bir düşünce açıklanırken ya
                      da savunulurken tanık olarak da gösterilirler.
                    </p>
                    <p>
                      Atasözleri, halkın yalnızca ortak duygu ve düşüncelerini
                      değil ortak dil zevkini de yansıtır.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bölüm 2 */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleSection(2)}
                  className="flex w-full items-center justify-between py-4 text-left text-xs font-black uppercase tracking-widest text-slate-900 hover:text-cyan-600 transition-colors"
                >
                  Atasözlerinin Toplum Hayatındaki Önemi ve Etkisi Nedir?
                  <ChevronDown
                    className={`size-4 transition-transform ${openSection === 2 ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSection === 2 ? "max-h-[1000px] pb-6" : "max-h-0"}`}
                >
                  <p className="text-sm leading-relaxed text-slate-500">
                    Atasözleri, millî kültürün ve tarih bilincinin kuşaktan
                    kuşağa aktarılmasında hayati bir rol oynar. Anlatımı güçlü
                    ve etkili kılmanın yanı sıra; toplumsal hayatta karşılaşılan
                    sorunlara pratik çözümler sunarak yol gösterir. Aile
                    ilişkilerinden ekonomiye, ahlaktan hukuka kadar hayatın her
                    alanını kapsarlar.
                  </p>
                </div>
              </div>

              {/* Bölüm 3 */}
              <div className="border-b border-slate-100">
                <button
                  onClick={() => toggleSection(3)}
                  className="flex w-full items-center justify-between py-4 text-left text-xs font-black uppercase tracking-widest text-slate-900 hover:text-cyan-600 transition-colors"
                >
                  Kök Değerler Eğitimde Neden Önem Kazandı?
                  <ChevronDown
                    className={`size-4 transition-transform ${openSection === 3 ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSection === 3 ? "max-h-[2000px] pb-6" : "max-h-0"}`}
                >
                  <div className="space-y-4 text-sm leading-relaxed text-slate-500">
                    <p>
                      Türk millî eğitim sisteminin temel amacı, eğitimin
                      merkezinde yer alan bireyin çağın ve geleceğin
                      gerektirdiği bilgi, beceri ve değerlerle donatılması; bu
                      birikimi insanlığın yararı doğrultusunda
                      kullanabilmesidir. Millî eğitim anlayışı; bilime önem
                      veren, kültürel ve estetik değerlere duyarlı, ahlaki
                      sorumluluk sahibi nitelikli bireyler yetiştirmeyi hedefler
                      ve bu doğrultuda evrensel değerlerden beslenir.
                    </p>
                    <p>
                      2025-2026 eğitim öğretim yılında uygulanan Türkiye Yüzyılı
                      Maarif Modeli'nin özünde "erdem-değer-eylem" çerçevesi
                      bulunur. Bu model, sadece akademik başarıyı değil; huzurlu
                      birey, huzurlu aile ve yaşanabilir çevre idealini
                      hedefler. Bu hedefe ulaşmak için kök değerlerin eğitim
                      sürecinde daha etkin ve planlı bir şekilde vurgulanması
                      benimsenmiştir. Adalet, dostluk, dürüstlük, öz denetim,
                      sabır, saygı, sevgi, sorumluluk, vatanseverlik ve
                      yardımseverlik olmak üzere on kök değer seçilmiş ve bunlar
                      derslerde uygulanmak üzere belirlenmiştir. Eğitim
                      sürecinde kazandırılması amaçlanan değerler; bireylerin
                      doğru kararlar almasına rehberlik eden, toplum tarafından
                      benimsenen ideal davranış ve yaşam biçimlerini ifade eden
                      temel ilkelerdir. Bu değerlerin bireylere kazandırılması,
                      onların toplumsal yaşama uyum sağlayarak sağlıklı bir
                      denge kurmasına katkı sunarken aynı zamanda toplumun
                      kültürel yapısının korunmasına ve gelişmesine de destek
                      olmaktadır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Bölüm: Kök Değerler */}
          <div className="md:col-span-5 md:pl-10">
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-900">
              Kök Değerler Arşivi
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {rootValues.map((value) => (
                <Link
                  key={value.id}
                  href={`/degerler/${value.id}`}
                  className="text-sm text-slate-500 transition-colors hover:text-cyan-600 whitespace-nowrap"
                >
                  {value.label}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Bölüm: Kaynakça */}
          <div className="md:col-span-3">
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-slate-900">
              Kaynakça
            </h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link
                  href="https://ogm.meb.gov.tr/www/genel-mudurlugumuzce-hazirlanan-degerler-egitimi-etkinlik-kitabi-yayimlandi/icerik/1665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-cyan-600"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" />
                  <span>
                    Kök Değerler Temalı Etkinlik Kitabı Uygulama Kılavuzu (MEB)
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://sozluk.gov.tr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-cyan-600"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" />
                  <span>
                    TDK Türkçe Sözlük / Atasözleri ve Deyimler Sözlüğü
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Çizgi ve Telif Hakları */}
        <div className="mt-16 border-t border-slate-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              Akademik Araştırma Projesi
              <Heart className="size-3 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>Eskişehir</span>
              <span className="h-3 w-px bg-slate-200" />
              <span>© 2026 — Tüm Hakları Saklıdır</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
