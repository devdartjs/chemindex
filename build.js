// build.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  rmSync,
  mkdirSync,
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} from "fs";
import { minify } from "terser";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");
const extensionsToCopy = [".js", ".html", ".css", ".json"];

console.log(chalk.blue("\n📦 Iniciando build..."));

// 1. Remove e recria a pasta dist
if (fs.existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir);
console.log(chalk.green("🧹 Pasta dist limpa e recriada."));

// 2. Lê arquivos da raiz do projeto
const files = readdirSync(__dirname);

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const fileStat = statSync(filePath);

  if (
    fileStat.isFile() &&
    file !== "build.js" &&
    extensionsToCopy.includes(path.extname(file))
  ) {
    const destPath = path.join(distDir, file);

    if (path.extname(file) === ".js") {
      try {
        const code = readFileSync(filePath, "utf8");
        const result = await minify(code);
        writeFileSync(destPath, result.code);
        console.log(chalk.green(`✅ Minificado: ${file}`));
      } catch (err) {
        console.error(
          chalk.red(`❌ Erro ao minificar ${file}: ${err.message}`)
        );
      }
    } else {
      copyFileSync(filePath, destPath);
      console.log(chalk.yellow(`📄 Copiado sem minificação: ${file}`));
    }
  }
}

console.log(chalk.blueBright("\n🚀 Build finalizado com sucesso!\n"));
