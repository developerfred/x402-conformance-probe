import fs from "node:fs";
import path from "node:path";
import { validateResponse } from "./validate.ts";

const ROOT = process.cwd();
const FIXTURE_DIR = path.join(ROOT, "fixtures");
const RESULT_DIR = path.join(ROOT, "report");

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
}

interface ReportRow {
  name: string;
  url: string;
  channel: string;
  file: string;
  status: number | null;
  ok: boolean;
  reason: string;
  headerMatchBody: boolean | null;
  responseTimeMs: number | null;
  bodySize: number;
  acceptsCount: number;
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")
    .slice(0, 60);
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function statusColor(ok: boolean): string {
  return ok ? "#16a34a" : "#dc2626";
}

export function runReport(): void {
  const files = fs
    .readdirSync(FIXTURE_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const rows: ReportRow[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, file), "utf8");
    const fx: Fixture = JSON.parse(raw);

    const validation = validateResponse({
      status: fx.status,
      headers: fx.headers,
      body: fx.body,
    });

    const ok = validation.ok && !fx.error && fx.status === 402;
    const reason = ok
      ? "pass"
      : validation.reasons.length > 0
      ? validation.reasons[0]
      : "falha desconhecida";

    const acceptsCount = validation.body?.accepts?.length ?? 0;

    rows.push({
      name: fx.name,
      url: fx.url,
      channel: fx.channel,
      file,
      status: fx.status,
      ok,
      reason,
      headerMatchBody: validation.headerMatchBody,
      responseTimeMs: fx.responseTimeMs,
      bodySize: fx.bodySize,
      acceptsCount,
    });
  }

  // Ordena: passes primeiro, depois fails
  rows.sort((a, b) => (a.ok === b.ok ? 0 : a.ok ? -1 : 1));

  const pass = rows.filter((r) => r.ok).length;
  const fail = rows.length - pass;

  fs.mkdirSync(RESULT_DIR, { recursive: true });

  // Salva resultados brutos
  fs.writeFileSync(
    path.join(RESULT_DIR, "results.json"),
    JSON.stringify(rows, null, 2)
  );

  // Gera HTML
  const rowsHtml = rows
    .map(
      (r) => `
    <tr class="${r.ok ? 'pass-row' : 'fail-row'}">
      <td><strong>${escapeHtml(r.name)}</strong></td>
      <td><code>${escapeHtml(r.url)}</code></td>
      <td>HTTP ${r.status ?? "—"}</td>
      <td>${r.acceptsCount}</td>
      <td>${r.bodySize} B</td>
      <td>${r.responseTimeMs ?? "—"} ms</td>
      <td style="color:${statusColor(r.ok)}; font-weight:bold;">
        ${r.ok ? "✅ PASS" : "❌ FAIL"}
      </td>
      <td>${escapeHtml(r.reason)}</td>
      <td><a href="${escapeHtml(r.channel)}" target="_blank">canal do dono</a></td>
      <td><a href="fixtures/${escapeHtml(r.file)}" target="_blank">fixture</a></td>
    </tr>
  `
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>x402 Conformance Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; background: #f8fafc; color: #0f172a; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    .subtitle { color: #64748b; margin-bottom: 24px; }
    .summary { display: flex; gap: 16px; margin-bottom: 24px; }
    .card { background: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex: 1; }
    .card h2 { margin: 0 0 6px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
    .card .big { font-size: 32px; font-weight: 700; }
    .pass { color: #16a34a; }
    .fail { color: #dc2626; }
    table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    th { background: #f1f5f9; text-align: left; padding: 12px 16px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; border-bottom: 1px solid #e2e8f0; }
    th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: center; }
    td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
    tr:last-child td { border-bottom: none; }
    tr.pass-row td { background: #f0fdf4; }
    tr.fail-row td { background: #fef2f2; }
    td:nth-child(4), td:nth-child(5), td:nth-child(6) { text-align: center; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 12px; word-break: break-all; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .note { margin-top: 24px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <h1>x402 Conformance Report</h1>
  <p class="subtitle">Tabela pass/fail de endpoints públicos x402 — respostas 402 validadas e fixtures salvos para replay offline.</p>

  <div class="summary">
    <div class="card">
      <h2>Total</h2>
      <div class="big">${rows.length}</div>
    </div>
    <div class="card">
      <h2>Pass</h2>
      <div class="big pass">${pass}</div>
    </div>
    <div class="card">
      <h2>Fail</h2>
      <div class="big fail">${fail}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>URL</th>
        <th>Status</th>
        <th>Accepts</th>
        <th>Body</th>
        <th>Tempo</th>
        <th>Resultado</th>
        <th>Motivo</th>
        <th>Canal do dono</th>
        <th>Fixture</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>

  <p class="note">
    Cada linha de falha inclui um motivo de uma linha. O fixture completo de cada resposta está salvo em
    <code>fixtures/</code> para reprodução offline (<code>npm run replay</code>).
  </p>
</body>
</html>`;

  fs.writeFileSync(path.join(RESULT_DIR, "index.html"), html);

  console.log(`\n📄 Relatório gerado: ${RESULT_DIR}/index.html`);
  console.log(`   ${pass} pass / ${fail} fail (${rows.length} endpoints)`);
  console.log(`   Resultados brutos: ${RESULT_DIR}/results.json`);
}

if (process.argv[1] && process.argv[1].endsWith("probe/report.ts")) {
  runReport();
}
