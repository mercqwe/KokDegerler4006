#!/usr/bin/env tsx
/**
 * Interactive CLI for adding proverbs to JSON data files
 * Run: pnpm tsx scripts/add-proverb.ts
 */

import prompts from "prompts"
import chalk from "chalk"
import fs from "fs"
import path from "path"

const ROOT_VALUES = [
  { value: "adalet", title: "Adalet" },
  { value: "dostluk", title: "Dostluk" },
  { value: "durustluk", title: "Dürüstlük" },
  { value: "oz-denetim", title: "Öz Denetim" },
  { value: "sabir", title: "Sabır" },
  { value: "saygi", title: "Saygı" },
  { value: "sevgi", title: "Sevgi" },
  { value: "sorumluluk", title: "Sorumluluk" },
  { value: "vatanseverlik", title: "Vatanseverlik" },
  { value: "yardimseverlik", title: "Yardımseverlik" },
]

interface Proverb {
  id: number
  text: string
  meaning: string
  value: string
}

const DATA_DIR = path.join(process.cwd(), "data", "proverbs")

function getJsonPath(value: string): string {
  return path.join(DATA_DIR, `${value}.json`)
}

function readProverbs(value: string): Proverb[] {
  const filePath = getJsonPath(value)
  if (!fs.existsSync(filePath)) {
    return []
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8")
    return JSON.parse(content)
  } catch (e) {
    console.error(chalk.red(`Error reading ${filePath}:`), e)
    return []
  }
}

function saveProverbs(value: string, proverbs: Proverb[]): void {
  const filePath = getJsonPath(value)
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(proverbs, null, 2), "utf-8")
}

function getNextId(proverbs: Proverb[]): number {
  if (proverbs.length === 0) return 1
  return Math.max(...proverbs.map(p => p.id)) + 1
}

async function main() {
  console.log(chalk.bold.white("\n╔════════════════════════════════════════╗"))
  console.log(chalk.bold.white("║  ATASÖZÜ VERİ GİRİŞ ARACI              ║"))
  console.log(chalk.bold.white("║  MEB Kök Değerler Araştırma Projesi    ║"))
  console.log(chalk.bold.white("╚════════════════════════════════════════╝"))
  console.log(chalk.gray("  Çıkmak için Ctrl+C veya ana menüde Esc.\n"))

  let lastValue: string | null = null

  while (true) {
    // 1. Value selection (if not sticky)
    if (!lastValue) {
      const response = await prompts({
        type: "select",
        name: "value",
        message: "Kök Değer seçin:",
        choices: ROOT_VALUES,
        hint: "- Ok tuşlarıyla seçin, Enter ile onaylayın, Esc ile çıkın",
      })

      if (!response.value) {
        break // Exit main loop
      }
      lastValue = response.value
    }

    const valueLabel = ROOT_VALUES.find(v => v.value === lastValue)?.title || lastValue

    console.log(chalk.cyan("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.bold.cyan(`  Yeni Atasözü Ekle: ${valueLabel}`))
    console.log(chalk.cyan("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"))

    // 2. Proverb details
    const proverbDetails = await prompts([
      {
        type: "text",
        name: "text",
        message: "Atasözü/Deyim metni:",
        validate: (value) => value.length > 0 ? true : "Metin boş olamaz",
      },
      {
        type: "text",
        name: "meaning",
        message: "Anlamı:",
        validate: (value) => value.length > 0 ? true : "Anlam boş olamaz",
      },
    ], {
      onCancel: () => {
        return true // Handle cancel internally
      }
    })

    // If cancelled (Esc on proverb details), go back to value selection
    if (!proverbDetails.text || !proverbDetails.meaning) {
      console.log(chalk.yellow("\nDeğer seçimine geri dönülüyor..."))
      lastValue = null
      continue
    }

    // 3. Save
    const proverbs = readProverbs(lastValue)
    const nextId = getNextId(proverbs)
    const newProverb: Proverb = {
      id: nextId,
      text: proverbDetails.text,
      meaning: proverbDetails.meaning,
      value: lastValue,
    }

    proverbs.push(newProverb)
    saveProverbs(lastValue, proverbs)

    console.log(chalk.green.bold(`\n✓ "${newProverb.text}" başarıyla eklendi!`))
    console.log(chalk.gray(`  Yeni ID: ${newProverb.id}`))

    // 4. Sticky choice
    const nextStep = await prompts({
      type: "toggle",
      name: "addAnother",
      message: `${valueLabel} değerine başka atasözü eklemek ister misiniz?`,
      initial: true,
      active: "Evet",
      inactive: "Hayır (Değer Değiştir)",
    })

    if (nextStep.addAnother === undefined || !nextStep.addAnother) {
      lastValue = null // Go back to value selection
    }
  }

  console.log(chalk.cyan("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
  console.log(chalk.bold.green("  İşlem tamamlandı. Güle güle!"))
  console.log(chalk.cyan("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"))
}

main().catch(console.error)
