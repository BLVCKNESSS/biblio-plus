// scripts/convert-covers.mjs : convertit les couvertures en WebP (400 px de large)
import sharp from 'sharp'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dir = 'public/covers'
const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f))

for (const f of files) {
  const out = path.join(dir, f.replace(/\.(jpe?g|png)$/i, '.webp'))
  await sharp(path.join(dir, f))
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  console.log('OK', out)
}

const jsonPath = 'public/data/books.json'
const json = await readFile(jsonPath, 'utf8')
await writeFile(jsonPath, json.replace(/(\/covers\/[^"]+)\.(jpe?g|png)/gi, '$1.webp'))
console.log('books.json mis à jour')
