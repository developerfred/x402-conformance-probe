import fs from "node:fs";
import path from "node:path";
import { ENDPOINTS } from "./config.ts";

const ROOT = process.cwd();
const FIXTURE_DIR = path.join(ROOT, "fixtures");
const TIMEOUT_MS = 20000;

fs.mkdirSync(FIXTURE_DIR, { recursive: true });

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .slice(0, 60);
}

interface Fixture {
  name: string;
  url: string;
  channel: string;
  fetchedAt: string;
  status: number | null;
  headers: Record<string, string>;
  body: string;
  error: string | null;
  responseTimeMs: number | null;
  bodySize: number;
  file?: string;
}

/**
 * Faz requisição GET sem pagamento e captura a resposta 402.
 */
async function fetchEndpoint(ep: { name: string; url: string; channel: string }): Promise<Fixture> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let status: number | null = null;
  let headers: Record<string, string> = {};
  let bodyText = "";
  let error: string | null = null;
  let responseTimeMs: number | null = null;
  const startTime = Date.now();

  try {
    const res = await fetch(ep.url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "x402-conformance-probe/1.0",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    status = res.status;
    headers = Object.fromEntries(res.headers.entries());
    bodyText = await res.text();
    responseTimeMs = Date.now() - startTime;
  } catch (e: any) {
    error = e?.message ?? String(e);
    responseTimeMs = Date.now() - startTime;
  } finally {
    clearTimeout(timer);
  }

  return {
    name: ep.name,
    url: ep.url,
    channel: ep.channel,
    fetchedAt: new Date().toISOString(),
    status,
    headers,
    body: bodyText,
    error,
    responseTimeMs,
    bodySize: Buffer.byteLength(bodyText),
  };
}

export async function runFetch(): Promise<Array<Fixture & { ok: boolean }>> {
  const results: Array<Fixture & { ok: boolean }> = [];

  console.log(`🔎 Sondando ${ENDPOINTS.length} endpoint(s) x402...\n`);

  for (const ep of ENDPOINTS) {
    const fixture = await fetchEndpoint(ep);
    const fileName = `${slug(fixture.name)}.json`;
    const filePath = path.join(FIXTURE_DIR, fileName);

    // Salva fixture (mesmo em caso de erro, para reprodutibilidade)
    fs.writeFileSync(filePath, JSON.stringify(fixture, null, 2));
    fixture.file = fileName;

    const ok = fixture.status === 402 && !fixture.error;
    results.push({ ...fixture, ok });

    console.log(
      `  ${ok ? "✅" : "❌"} ${fixture.name} → HTTP ${fixture.status}${
        fixture.error ? " | " + fixture.error : ""
      }`
    );
  }

  // Resumo
  const pass = results.filter((r) => r.ok).length;
  console.log(
    `\n📊 Concluído: ${pass}/${results.length} retornaram HTTP 402 ao vivo.`
  );
  console.log(`📁 Fixtures salvos em: ${FIXTURE_DIR}`);

  return results;
}

if (process.argv[1] && process.argv[1].endsWith("probe/fetch.ts")) {
  runFetch().catch((e) => {
    console.error("❌ Erro no fetch:", e);
    process.exit(1);
  });
}
