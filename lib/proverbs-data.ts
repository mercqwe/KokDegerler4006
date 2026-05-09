// JSON dosyalarından verileri çekiyoruz
import adaletData from "@/data/proverbs/adalet.json";
import dostlukData from "@/data/proverbs/dostluk.json";
import durustlukData from "@/data/proverbs/durustluk.json";
import ozDenetimData from "@/data/proverbs/oz-denetim.json";
import sabirData from "@/data/proverbs/sabir.json";
import saygiData from "@/data/proverbs/saygi.json";
import sevgiData from "@/data/proverbs/sevgi.json";
import sorumlulukData from "@/data/proverbs/sorumluluk.json";
import vatanseverlikData from "@/data/proverbs/vatanseverlik.json";
import yardimseverlikData from "@/data/proverbs/yardimseverlik.json";

export type RootValue =
  | "adalet"
  | "dostluk"
  | "durustluk"
  | "oz-denetim"
  | "sabir"
  | "saygi"
  | "sevgi"
  | "sorumluluk"
  | "vatanseverlik"
  | "yardimseverlik";

export interface RootValueInfo {
  id: RootValue;
  label: string;
  descriptions: string[];
  color: string;
  icon: string; // Lucide icon name as string
}

export const rootValues: RootValueInfo[] = [
  {
    id: "adalet",
    label: "Adalet",
    descriptions: ["Hak ve hukuka uygunluk, hakkı gözetme.", "Yasalarla sahip olunan hakların herkes tarafından kullanılmasının sağlanması; türe.", "Bu işi uygulayan, yerine getiren devlet kuruluşları.","Herkese kendine uygun düşeni, kendi hakkı olanı verme."],
    color: "bg-rose-500",
    icon: "Scale",
  },
  {
    id: "dostluk",
    label: "Dostluk",
    descriptions: ["Dost olma durumu; mihribanlık, ülfet.", "Dostça davranış."],
    color: "bg-amber-500",
    icon: "Users",
  },
  {
    id: "durustluk",
    label: "Dürüstlük",
    descriptions: ["Doğruluk."],
    color: "bg-violet-500",
    icon: "Shield",
  },
  {
    id: "oz-denetim",
    label: "Öz Denetim",
    descriptions: ["Daha önemli bir amaca ulaşabilmek için kişinin tepkilerini, davranışlarını veya başka amaca yönelme eğilimini denetleyip kısıtlaması; otokontrol.","Bir kurum veya kuruluşun işleyişini, amacına ve standartlara göre kendisinin kontrol etmesi."],
    color: "bg-fuchsia-500",
    icon: "Brain",
  },
  {
    id: "sabir",
    label: "Sabır",
    descriptions: ["Acı, yoksulluk, haksızlık vb. üzücü durumlar karşısında ses çıkarmadan onların geçmesini bekleme erdemi; dayanç, çıdam.", "Olacak veya gelecek bir şeyi telaş göstermeden bekleme."],
    color: "bg-teal-500",
    icon: "Clock",
  },
  {
    id: "saygi",
    label: "Saygı",
    descriptions: ["Değeri, üstünlüğü, yaşlılığı, yararlılığı, kutsallığı dolayısıyla bir kimseye, bir şeye karşı dikkatli, özenli, ölçülü davranmaya sebep olan sevgi duygusu; hürmet, ihtiram.", "Başkalarını rahatsız etmekten çekinme duygusu."],
    color: "bg-sky-500",
    icon: "Heart",
  },
  {
    id: "sevgi",
    label: "Sevgi",
    descriptions: ["İnsanı bir şeye veya bir kimseye karşı yakın ilgi ve bağlılık göstermeye yönelten duygu; muhabbet."],
    color: "bg-pink-500",
    icon: "HeartHandshake",
  },
  {
    id: "sorumluluk",
    label: "Sorumluluk",
    descriptions: ["Kişinin kendi davranışlarını veya kendi yetki alanına giren herhangi bir olayın sonuçlarını üstlenmesi; sorum, mesuliyet, uhde.", "Sorumlu olmayı gerektiren bir yükümlülüğün kendisi; ağırlık."],
    color: "bg-indigo-500",
    icon: "Target",
  },
  {
    id: "vatanseverlik",
    label: "Vatanseverlik",
    descriptions: ["Yurtseverlik."],
    color: "bg-red-500",
    icon: "Flag",
  },
  {
    id: "yardimseverlik",
    label: "Yardımseverlik",
    descriptions: ["Hayırseverlik."],
    color: "bg-emerald-500",
    icon: "HandHeart",
  },
];

export interface Proverb {
  id: number;
  text: string;
  meaning: string;
  value: RootValue;
}

// Tüm atasözlerini JSON kaynaklarından birleştiriyoruz
export const proverbs: Record<RootValue, Proverb[]> = {
  adalet: adaletData as Proverb[],
  dostluk: dostlukData as Proverb[],
  durustluk: durustlukData as Proverb[],
  "oz-denetim": ozDenetimData as Proverb[],
  sabir: sabirData as Proverb[],
  saygi: saygiData as Proverb[],
  sevgi: sevgiData as Proverb[],
  sorumluluk: sorumlulukData as Proverb[],
  vatanseverlik: vatanseverlikData as Proverb[],
  yardimseverlik: yardimseverlikData as Proverb[],
};

export const games = [
  {
    id: 1,
    title: "Atasözü Eşleştirme",
    description: "Atasözlerini anlamlarıyla eşleştirin.",
    link: "#",
  },
  {
    id: 2,
    title: "Kök Değer Bulmaca",
    description: "Atasözlerindeki kök değerleri bulun.",
    link: "#",
  }
];

export function getValueInfo(valueId: RootValue): RootValueInfo | undefined {
  return rootValues.find((v) => v.id === valueId);
}

export function getStatistics() {
  const allProverbsFlat = Object.values(proverbs).flat();
  const totalProverbs = allProverbsFlat.length;

  const valueCounts = Object.keys(proverbs).reduce((acc, key) => {
    acc[key as RootValue] = proverbs[key as RootValue].length;
    return acc;
  }, {} as Record<RootValue, number>);

  const sortedValues = Object.entries(valueCounts).sort(([, a], [, b]) => b - a);
  const mostFrequentValue = sortedValues[0];

  const mostFrequentLabel = rootValues.find(
    (v) => v.id === mostFrequentValue[0]
  )?.label;

  return {
    totalProverbs,
    mostFrequentValue: mostFrequentLabel || mostFrequentValue[0],
    mostFrequentCount: mostFrequentValue[1],
    valueCounts,
    sortedValues,
  };
}

export function getProverbsByValue(value: RootValue): Proverb[] {
  return [...(proverbs[value] || [])].sort((a, b) => a.id - b.id);
}