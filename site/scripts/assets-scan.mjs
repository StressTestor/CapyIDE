import { readdir, readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = '.next/static'
const SECRET_PATTERNS = [
  // Common token patterns (heuristics only)
  /AKIA[0-9A-Z]{16}/, // AWS Access Key ID
  /AIza[0-9A-Za-z\-_]{35}/, // Google API Key
  /ghp_[0-9A-Za-z]{36}/, // GitHub PAT
  /sk_live_[0-9a-zA-Z]{24,}/, // Stripe live key
]

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

;(async () => {
  try {
    await stat(ROOT)
  } catch {
    console.error('Build output not found:', ROOT)
    process.exit(1)
  }
  let issues = 0
  for await (const file of walk(ROOT)) {
    const content = await readFile(file, 'utf8')
    for (const rx of SECRET_PATTERNS) {
      if (rx.test(content)) {
        console.error(`Potential secret found in ${file} matching ${rx}`)
        issues++
      }
    }
  }
  if (issues > 0) process.exit(1)
  console.log('No obvious secrets found in build assets')
})().catch(err => {
  console.error(err)
  process.exit(1)
})

