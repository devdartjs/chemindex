// build.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, "dist");

// Cria dist/ limpo
if (fs.existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir);

// Copia todos os arquivos .js da raiz para dist/
const files = readdirSync(__dirname);

files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (
    statSync(filePath).isFile() &&
    file.endsWith(".js") &&
    file !== "build.js"
  ) {
    fs.copyFileSync(filePath, path.join(distDir, file));
  }
});

console.log("✅ Build concluído: arquivos .js copiados para dist/");
