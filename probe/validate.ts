// Utilitários de validação da oferta x402.
// Regras (conforme escopo da atividade):
//  - x402Version presente e numérico
//  - scheme === "exact"
//  - par rede + ativo coerente (ex: eip155:8453 com USDC)
//  - amount em unidades base (string de dígitos, > 0)
//  - payTo é endereço Ethereum válido (0x + 40 hex)
//  - cada accepts[] concorda com campos de topo (quando presentes)
//  - maxTimeoutSeconds plausível (> 0 e <= 86400)
//  - corpo e cabeçalho PAYMENT-REQUIRED descrevem a mesma oferta

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
const AMOUNT_RE = /^(0|[1-9]\d*)$/;
const NETWORK_RE = /^eip155:\d+$/;

// USDC conhecido por rede principal. Somente essas redes têm um endereço USDC
// canônico que exigimos. Outras redes (pontes, sidechains) apenas exigem que
// o asset seja um endereço válido.
const USDC_BY_NETWORK: Record<string, string> = {
  "eip155:8453": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base
  "eip155:1": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum mainnet
};

export function isValidAddress(addr: unknown): addr is string {
  return typeof addr === "string" && ADDRESS_RE.test(addr);
}

export function isValidAmount(amount: unknown): amount is string {
  return typeof amount === "string" && AMOUNT_RE.test(amount);
}

export function isPlausibleTimeout(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v > 0 && v <= 86400;
}

/**
 * Decodifica o cabeçalho PAYMENT-REQUIRED (Base64) e retorna o objeto oferta.
 * Retorna null se não houver cabeçalho ou não for decodificável.
 */
export function decodePaymentRequiredHeader(
  header: string | null | undefined
): any | null {
  if (!header || typeof header !== "string") return null;
  try {
    const raw = Buffer.from(header, "base64").toString("utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

interface ValidateOfferCtx {
  label?: string;
  topLevel?: any;
}

export interface ValidationResult {
  ok: boolean;
  reasons: string[];
}

/**
 * Valida uma única oferta (aceita objeto body ou objeto do cabeçalho).
 */
export function validateOffer(
  offer: any,
  ctx: ValidateOfferCtx = {}
): ValidationResult {
  const reasons: string[] = [];
  const { label = "oferta", topLevel = {} } = ctx;

  // x402Version
  if (typeof offer?.x402Version !== "number") {
    reasons.push(`${label}: x402Version ausente ou não numérico`);
  }

  // accepts deve ser array não vazio
  if (!Array.isArray(offer?.accepts) || offer.accepts.length === 0) {
    reasons.push(`${label}: accepts[] ausente ou vazio`);
    return { ok: reasons.length === 0, reasons };
  }

  // Campos de topo (quando informados no body)
  const topNetwork = topLevel.network;
  const topAsset = topLevel.asset;
  const topAmount = topLevel.amount;

  offer.accepts.forEach((entry: any, i: number) => {
    const e = `entry[${i}]`;

    // scheme exato
    if (entry.scheme !== "exact") {
      reasons.push(
        `${label} ${e}: scheme não é "exact" (${JSON.stringify(entry.scheme)})`
      );
    }

    // network
    if (
      typeof entry.network !== "string" ||
      !NETWORK_RE.test(entry.network)
    ) {
      reasons.push(
        `${label} ${e}: network inválido (${JSON.stringify(entry.network)})`
      );
    } else if (topNetwork && entry.network !== topNetwork) {
      reasons.push(
        `${label} ${e}: network (${entry.network}) difere do topo (${topNetwork})`
      );
    }

    // asset
    if (!isValidAddress(entry.asset)) {
      reasons.push(
        `${label} ${e}: asset não é endereço válido (${JSON.stringify(entry.asset)})`
      );
    } else if (topAsset && entry.asset !== topAsset) {
      reasons.push(
        `${label} ${e}: asset (${entry.asset}) difere do topo (${topAsset})`
      );
    }

    // par rede + ativo (quando rede conhecida, ativo deve ser USDC dessa rede)
    if (
      entry.network &&
      USDC_BY_NETWORK[entry.network] !== undefined
    ) {
      const expected = USDC_BY_NETWORK[entry.network];
      if (
        String(entry.asset).toLowerCase() !== expected.toLowerCase()
      ) {
        reasons.push(
          `${label} ${e}: rede ${entry.network} espera USDC ${expected}, veio ${entry.asset}`
        );
      }
    }

    // amount em unidades base
    if (!isValidAmount(entry.amount)) {
      reasons.push(
        `${label} ${e}: amount não é unidades base válidas (${JSON.stringify(entry.amount)})`
      );
    } else if (topAmount && entry.amount !== topAmount) {
      reasons.push(
        `${label} ${e}: amount (${entry.amount}) difere do topo (${topAmount})`
      );
    }

    // payTo válido
    if (!isValidAddress(entry.payTo)) {
      reasons.push(
        `${label} ${e}: payTo não é endereço válido (${JSON.stringify(entry.payTo)})`
      );
    }

    // maxTimeoutSeconds plausível
    if (!isPlausibleTimeout(entry.maxTimeoutSeconds)) {
      reasons.push(
        `${label} ${e}: maxTimeoutSeconds não plausível (${JSON.stringify(entry.maxTimeoutSeconds)})`
      );
    }
  });

  return { ok: reasons.length === 0, reasons };
}

/**
 * Valida uma resposta 402 completa (body + cabeçalho PAYMENT-REQUIRED).
 */
export interface FullValidationResult {
  ok: boolean;
  reasons: string[];
  body: any;
  headerOffer: any;
  headerMatchBody: boolean | null;
}

export function validateResponse(params: {
  status: number | null;
  headers: Record<string, string>;
  body: string | any;
}): FullValidationResult {
  const reasons: string[] = [];
  let bodyParsed: any = null;
  let headerOffer: any = null;
  let headerMatchBody: boolean | null = null;

  const { status, headers, body } = params;

  // status 402
  if (status !== 402) {
    reasons.push(`status HTTP ${status}, esperado 402`);
  }

  // body JSON
  try {
    bodyParsed = typeof body === "string" ? JSON.parse(body) : body;
  } catch (e) {
    reasons.push(`corpo não é JSON válido: ${(e as Error).message}`);
    return { ok: false, reasons, body: null, headerOffer: null, headerMatchBody: null };
  }

  // valida oferta do corpo
  const bodyResult = validateOffer(bodyParsed, {
    label: "corpo",
    topLevel: bodyParsed,
  });
  reasons.push(...bodyResult.reasons);

  // cabeçalho PAYMENT-REQUIRED
  const prHeader =
    headers["payment-required"] || headers["PAYMENT-REQUIRED"];
  if (prHeader) {
    headerOffer = decodePaymentRequiredHeader(prHeader);
    if (!headerOffer) {
      reasons.push(
        "cabeçalho PAYMENT-REQUIRED não decodificável (Base64+JSON)"
      );
      headerMatchBody = false;
    } else {
      // compara header offer com body offer (aceitas)
      const headerAccepts = Array.isArray(headerOffer.accepts)
        ? headerOffer.accepts
        : [headerOffer];
      const bodyAccepts = Array.isArray(bodyParsed.accepts)
        ? bodyParsed.accepts
        : [];

      let match = true;
      if (headerAccepts.length !== bodyAccepts.length) {
        match = false;
      } else {
        for (let i = 0; i < headerAccepts.length; i++) {
          const h = headerAccepts[i];
          const b = bodyAccepts[i];
          const keys = [
            "scheme",
            "network",
            "asset",
            "amount",
            "payTo",
            "maxTimeoutSeconds",
          ];
          for (const k of keys) {
            const hv = h[k];
            const bv = b[k];
            const hs = typeof hv === "string" ? hv.toLowerCase() : hv;
            const bs = typeof bv === "string" ? bv.toLowerCase() : bv;
            if (hs !== bs) {
              match = false;
              break;
            }
          }
          if (!match) break;
        }
      }
      headerMatchBody = match;
      if (!match) {
        reasons.push(
          "cabeçalho PAYMENT-REQUIRED difere do corpo (oferta não confere)"
        );
      }
    }
  } else {
    reasons.push("cabeçalho PAYMENT-REQUIRED ausente");
  }

  return { ok: reasons.length === 0, reasons, body: bodyParsed, headerOffer, headerMatchBody };
}

// ============================================================================
// runValidate: lê fixtures salvos e valida cada um (usado pelo script validate)
// ============================================================================

import fs from "node:fs";
import path from "node:path";

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
}

interface ValidateResult {
  file: string;
  name: string;
  url: string;
  channel: string;
  fetchedAt: string;
  status: number | null;
  error: string | null;
  ok: boolean;
  reasons: string[];
  body: any;
  headerOffer: any;
  headerMatchBody: boolean | null;
  fixture: Fixture;
}

/**
 * Carrega todos os fixtures salvos e valida cada um.
 * Retorna array de resultados de validação.
 */
export function runValidate(): ValidateResult[] {
  const files = fs
    .readdirSync(FIXTURE_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const results: ValidateResult[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, file), "utf8");
    const fx: Fixture = JSON.parse(raw);

    const validation = validateResponse({
      status: fx.status,
      headers: fx.headers,
      body: fx.body,
    });

    results.push({
      file,
      name: fx.name,
      url: fx.url,
      channel: fx.channel,
      fetchedAt: fx.fetchedAt,
      status: fx.status,
      error: fx.error,
      ok: validation.ok && !fx.error && fx.status === 402,
      reasons: validation.reasons,
      body: validation.body,
      headerOffer: validation.headerOffer,
      headerMatchBody: validation.headerMatchBody,
      fixture: fx,
    });
  }

  // Ordena: passes primeiro, depois fails
  results.sort((a, b) => (a.ok === b.ok ? 0 : a.ok ? -1 : 1));

  const pass = results.filter((r) => r.ok).length;
  const fail = results.length - pass;
  console.log(
    `\n📋 Validação concluída: ${pass} pass / ${fail} fail (${results.length} fixtures)`
  );

  // Salva resultado bruto para o relatório
  fs.writeFileSync(
    path.join(RESULT_DIR, "results.json"),
    JSON.stringify(results, null, 2)
  );

  return results;
}

if (process.argv[1] && process.argv[1].endsWith("probe/validate.ts")) {
  runValidate();
}
