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
import { minify as minifyJS } from "terser";
import CleanCSS from "clean-css";
import { minify as minifyHTML } from "html-minifier-terser";
import chalk from "chalk";

// Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "dist");
const extensionsToCopy = [".js", ".html", ".css", ".json"];
const ignoredFolders = ["node_modules", "dist", ".git"];
const ignoredFiles = ["build.js"];

console.log(chalk.blue("\n📦 Iniciando build..."));
console.time("⏱ Tempo total de build");

// Limpa a pasta dist
if (fs.existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir);
console.log(chalk.green("🧹 Pasta dist limpa e recriada."));

// Função principal
async function copyAndMinifyRecursive(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });

  const entries = readdirSync(srcDir);
  const tasks = entries.map(async (entry) => {
    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);
    const stats = statSync(srcPath);

    if (stats.isDirectory()) {
      if (!ignoredFolders.includes(entry)) {
        await copyAndMinifyRecursive(srcPath, destPath);
      }
    } else if (
      stats.isFile() &&
      !ignoredFiles.includes(entry) &&
      extensionsToCopy.includes(path.extname(entry))
    ) {
      const ext = path.extname(entry);
      try {
        const code = readFileSync(srcPath, "utf8");

        if (ext === ".js") {
          const result = await minifyJS(code);
          writeFileSync(destPath, result.code);
          logSuccess(entry, result.code);
        } else if (ext === ".css") {
          const result = new CleanCSS().minify(code);
          writeFileSync(destPath, result.styles);
          logSuccess(entry, result.styles);
        } else if (ext === ".html") {
          const result = await minifyHTML(code, {
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
          });
          writeFileSync(destPath, result);
          logSuccess(entry, result);
        } else {
          copyFileSync(srcPath, destPath);
          console.log(chalk.yellow(`📄 Copiado: ${entry}`));
        }
      } catch (err) {
        console.error(chalk.red(`❌ Erro em ${entry}: ${err.message}`));
      }
    }
  });

  await Promise.all(tasks);
}

function logSuccess(filename, content) {
  const sizeKB = (Buffer.byteLength(content, "utf8") / 1024).toFixed(2);
  console.log(chalk.green(`✅ Minificado: ${filename} (${sizeKB} KB)`));
}

await copyAndMinifyRecursive(__dirname, distDir);

console.timeEnd("⏱ Tempo total de build");
console.log(chalk.blueBright("\n🚀 Build finalizado com sucesso!\n"));
