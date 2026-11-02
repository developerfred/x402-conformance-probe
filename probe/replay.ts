import fs from "node:fs";
import path from "node:path";
import { validateResponse, FullValidationResult } from "./validate.ts";

const ROOT = process.cwd();
const FIXTURE_DIR = path.join(ROOT, "fixtures");

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .slice(0, 60);
}

interface ReplayRow {
  file: string;
  name: string;
  url: string;
  ok: boolean;
  reason: string;
  validation: FullValidationResult;
}

/**
 * Replay offline: lê fixtures salvos e valida cada um sem tocar na rede.
 */
export function runReplay(): ReplayRow[] {
  if (!fs.existsSync(FIXTURE_DIR)) {
    console.log("❌ Diretório de fixtures não encontrado. Rode `npm run fetch` primeiro.");
    return [];
  }

  const files = fs
    .readdirSync(FIXTURE_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const rows: ReplayRow[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, file), "utf8");
    const fx = JSON.parse(raw);

    const validation = validateResponse({
      status: fx.status,
      headers: fx.headers,
      body: fx.body,
    });

    const ok =
      validation.ok && !fx.error && fx.status === 402;
    const reason = ok
      ? "pass"
      : validation.reasons.length > 0
      ? validation.reasons[0]
      : "falha desconhecida";

    rows.push({ file, name: fx.name, url: fx.url, ok, reason, validation });
  }

  // Ordena: passes primeiro, depois fails
  rows.sort((a, b) => (a.ok === b.ok ? 0 : a.ok ? -1 : 1));

  const pass = rows.filter((r) => r.ok).length;
  const fail = rows.length - pass;
  console.log(`\n🔁 Replay offline concluído: ${pass} pass / ${fail} fail (${rows.length} fixtures)`);
  for (const row of rows) {
    console.log(`  ${row.ok ? "✅" : "❌"} ${row.name} → ${row.reason}`);
  }

  return rows;
}

if (process.argv[1] && process.argv[1].endsWith("probe/replay.ts")) {
  runReplay();
}
