#!/usr/bin/env tsx
/**
 * JSON Import CLI for batch importing proverbs into JSON data files
 * Run: pnpm tsx scripts/import-proverbs.ts <json-file-path>
 */

import chalk from "chalk"
import fs from "fs"
import path from "path"

type RootValue =
  | "adalet"
  | "dostluk"
  | "durustluk"
  | "oz-denetim"
  | "sabir"
  | "saygi"
  | "sevgi"
  | "sorumluluk"
  | "vatanseverlik"
  | "yardimseverlik"

interface ImportProverb {
  text: string
  meaning: string
  value: RootValue
}

interface Proverb extends ImportProverb {
  id: number
}

const VALID_VALUES: RootValue[] = [
  "adalet",
  "dostluk",
  "durustluk",
  "oz-denetim",
  "sabir",
  "saygi",
  "sevgi",
  "sorumluluk",
  "vatanseverlik",
  "yardimseverlik",
]

const DATA_DIR = path.join(process.cwd(), "data", "proverbs")

function getJsonPath(value: string): string {
  return path.join(DATA_DIR, `${value}.json`)
}

function readProverbs(value: string): Proverb[] {
  const filePath = getJsonPath(value)
  if (!fs.existsSync(filePath)) return []
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"))
  } catch (e) {
    return []
  }
}

function saveProverbs(value: string, proverbs: Proverb[]): void {
  const filePath = getJsonPath(value)
  fs.writeFileSync(filePath, JSON.stringify(proverbs, null, 2), "utf-8")
}

function validateProverb(proverb: ImportProverb, index: number): string[] {
  const errors: string[] = []
  if (!proverb.text) errors.push(`[${index}] 'text' eksik`)
  if (!proverb.meaning) errors.push(`[${index}] 'meaning' eksik`)
  if (!proverb.value || !VALID_VALUES.includes(proverb.value)) {
    errors.push(`[${index}] Geçersiz değer: "${proverb.value}"`)
  }
  return errors
}

function main() {
  console.log(chalk.bold.white("\n╔════════════════════════════════════════╗"))
  console.log(chalk.bold.white("║  JSON VERİ İÇE AKTARMA ARACI           ║"))
  console.log(chalk.bold.white("╚════════════════════════════════════════╝\n"))

  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log(chalk.red("Hata: JSON dosya yolu belirtilmedi."))
    process.exit(1)
  }

  const jsonPath = path.resolve(args[0])
  if (!fs.existsSync(jsonPath)) {
    console.log(chalk.red(`Hata: Dosya bulunamadı: ${jsonPath}`))
    process.exit(1)
  }

  let importData: ImportProverb[]
  try {
    importData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))
  } catch (error) {
    console.log(chalk.red(`Hata: JSON parse edilemedi.`))
    process.exit(1)
  }

  const allErrors: string[] = []
  importData.forEach((proverb, index) => allErrors.push(...validateProverb(proverb, index)))

  if (allErrors.length > 0) {
    allErrors.forEach(err => console.log(chalk.red(` • ${err}`)))
    process.exit(1)
  }

  // Group by value for efficient saving
  const grouped: Record<string, ImportProverb[]> = {}
  importData.forEach(p => {
    if (!grouped[p.value]) grouped[p.value] = []
    grouped[p.value].push(p)
  })

  for (const [value, newItems] of Object.entries(grouped)) {
    const existing = readProverbs(value)
    let nextId = existing.length > 0 ? Math.max(...existing.map(p => p.id)) + 1 : 1
    
    const toAdd = newItems.map(p => ({ ...p, id: nextId++ }))
    saveProverbs(value, [...existing, ...toAdd])
    console.log(chalk.gray(`  → ${value}: ${toAdd.length} adet eklendi.`))
  }

  console.log(chalk.green.bold("\n✓ İçe aktarma başarıyla tamamlandı!\n"))
}

main()
