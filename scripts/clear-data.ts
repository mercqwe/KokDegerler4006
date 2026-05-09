#!/usr/bin/env tsx
/**
 * Utility to clear all proverb data from JSON files
 * Run: pnpm tsx scripts/clear-data.ts
 */

import prompts from "prompts"
import chalk from "chalk"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data", "proverbs")

async function main() {
  console.log(chalk.bold.red("\nVERİ TEMİZLEME ARACI"))
  console.log(chalk.red("Bu işlem tüm atasözü verilerini kalıcı olarak silecektir!"))

  const response = await prompts([
    {
      type: "confirm",
      name: "confirm",
      message: "Tüm verileri silmek istediğinize emin misiniz?",
      initial: false,
    },
    {
      type: (prev) => prev ? "text" : null,
      name: "final",
      message: 'Onaylamak için "SIL" yazın:',
    }
  ])

  if (response.confirm && response.final === "SIL") {
    console.log(chalk.yellow("\nVeriler siliniyor..."))
    
    if (fs.existsSync(DATA_DIR)) {
      const files = fs.readdirSync(DATA_DIR)
      files.forEach(file => {
        if (file.endsWith(".json")) {
          fs.writeFileSync(path.join(DATA_DIR, file), "[]", "utf-8")
        }
      })
    }
    
    console.log(chalk.green.bold("✓ Tüm veriler temizlendi (JSON dosyaları boşaltıldı)."))
  } else {
    console.log(chalk.cyan("\nİşlem iptal edildi."))
  }
}

main().catch(console.error)
