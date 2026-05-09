import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Atasözleri ve Deyimler",
  description:
    "Türk atasözleri ve deyimlerini keşfedin, öğrenin ve oyunlarla pekiştirin.",
  // v0 izleri ve hatalı ikon yolları temizlendi
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico", // Apple cihazların 404 hatası vermemesi için favicon'u buraya da yönlendirdik
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="bg-background">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
