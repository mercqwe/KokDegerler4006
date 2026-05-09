# Atasozu Veri Yonetim Rehberi

Bu belge, MEB Kok Degerler Arastirma Projesi icin atasozu verilerinin nasil yonetilecegini aciklar.

## Veri Yapisi

### Atasozu (Proverb) Semasi

```typescript
interface Proverb {
  id: number       // Otomatik atanir
  text: string     // Atasozu metni
  meaning: string  // Anlami/aciklamasi
  value: RootValue // Kok deger (tek secim)
}
```

### Gecerli Kok Degerler (RootValue)

| ID | Turkce |
|----|--------|
| `adalet` | Adalet |
| `dostluk` | Dostluk |
| `durustluk` | Durustluk |
| `oz-denetim` | Oz Denetim |
| `sabir` | Sabir |
| `saygi` | Saygi |
| `sevgi` | Sevgi |
| `sorumluluk` | Sorumluluk |
| `vatanseverlik` | Vatanseverlik |
| `yardımseverlik` | Yardimseverlik |

---

## CLI Araclari

### 1. Interaktif Ekleme (add-proverb.ts)

Dongusal olarak atasozu eklemenizi saglayan interaktif CLI araci.

**Calistirma:**
```bash
pnpm tsx scripts/add-proverb.ts
```

**Ozellikler:**
- Metin ve anlam girisi
- Tek kok deger secimi (ok tuslariyla sec, enter ile onayla)
- Dongusal ekleme (cikana kadar devam eder)
- Otomatik ID atamasi
- Dogrulama kontrolleri

**Ornek Kullanim:**
```
╔════════════════════════════════════════╗
║  ATASOZU VERI GIRIS ARACI              ║
╚════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Yeni Atasozu/Deyim Ekle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✔ Atasozu/Deyim metni: Bir fincan kahvenin kirk yil hatiri vardir.
✔ Anlami: Yapilan kucuk bir iyilik bile unutulmamalidir.
✔ Kok Deger: dostluk

✓ "Bir fincan kahvenin kirk yil hatiri vardir." basariyla eklendi!
```

---

### 2. JSON Ice Aktarma (import-proverbs.ts)

Toplu veri ice aktarmak icin JSON dosyasi kullanan arac.

**Calistirma:**
```bash
pnpm tsx scripts/import-proverbs.ts <json-dosya-yolu>
```

**Ornek:**
```bash
pnpm tsx scripts/import-proverbs.ts ./data/arastirma-verileri.json
```

**Ozellikler:**
- Toplu ice aktarma
- Sema dogrulama
- Duplikasyon kontrolu (ayni metin varsa atlar)
- Otomatik ID atamasi
- Detayli hata raporlama

---

### 3. Veri Temizleme (clear-data.ts)

Tum atasozu verilerini silen arac. **Dikkatli kullanin!**

**Calistirma:**
```bash
pnpm tsx scripts/clear-data.ts
```

**Guvenlik:**
- Cift onay gerektirir
- "SIL" yazarak onay
- Silme oncesi uyari gosterir

---

## JSON Ice Aktarma Formati

### Sema

```json
[
  {
    "text": "Atasozu metni",
    "meaning": "Anlami",
    "value": "deger-id"
  }
]
```

### Tam Ornek

```json
[
  {
    "text": "Ak akce kara gun icindir.",
    "meaning": "Para zor gunler icin biriktirilmelidir.",
    "value": "sorumluluk"
  },
  {
    "text": "Agac meyvesinden belli olur.",
    "meaning": "Insanin degeri yaptiklarindan anlasilir.",
    "value": "durustluk"
  },
  {
    "text": "Bin bilsen de bir bilene danis.",
    "meaning": "Ne kadar bilgili olursan ol, baskalarinin fikirlerini de al.",
    "value": "saygi"
  }
]
```

---

## Tipik Is Akisi

### Arastirma Verilerini Ekleme

1. **Mevcut dummy verileri temizleyin:**
   ```bash
   pnpm tsx scripts/clear-data.ts
   ```

2. **Yeni verileri JSON olarak hazirlayin** (yukaridaki formata uygun)

3. **Ice aktarin:**
   ```bash
   pnpm tsx scripts/import-proverbs.ts ./data/arastirma-verileri.json
   ```

4. **Eksik verileri interaktif ekleyin:**
   ```bash
   pnpm tsx scripts/add-proverb.ts
   ```

### Tek Tek Ekleme

```bash
pnpm tsx scripts/add-proverb.ts
```

---

## Hata Cozumleme

### "Gecersiz deger" Hatasi
Kullandiginiz kok deger listede yok. Yukaridaki tablodaki ID'leri kullanin.

### "Dosya bulunamadi" Hatasi
JSON dosya yolunu kontrol edin. Tam yol veya goreceli yol kullanin.

### "JSON parse edilemedi" Hatasi
JSON formatinizi kontrol edin. Online JSON validator kullanabilirsiniz.

### "Ekleme noktasi bulunamadi" Hatasi
`lib/proverbs-data.ts` dosyasinin yapisi bozulmus olabilir. Git ile geri alin.

---

## Dosya Konumlari

| Dosya | Aciklama |
|-------|----------|
| `lib/proverbs-data.ts` | Ana veri dosyasi |
| `scripts/add-proverb.ts` | Interaktif ekleme CLI |
| `scripts/import-proverbs.ts` | JSON ice aktarma CLI |
| `scripts/clear-data.ts` | Veri temizleme CLI |
| `DATA_GUIDE.md` | Bu belge |

---

## Notlar

- Tum script'ler proje kok dizininden calistirilmalidir
- `pnpm tsx` komutu TypeScript dosyalarini dogrudan calistirir
- Veriler `lib/proverbs-data.ts` dosyasinda saklanir (veritabani yok)
- Degisiklikler Git ile takip edilebilir
