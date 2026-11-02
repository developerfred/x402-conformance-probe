import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT) || 3402;
const PAY_TO = "0x3e7c9cA818f713F19e126E3B7B37B47dC1411570"; // endereço de teste válido
const NETWORK = "eip155:8453"; // Base
const ASSET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC on Base
const AMOUNT = "1000"; // 1000 unidades base (0.000001 USDC com 6 decimais)
const MAX_TIMEOUT = 300;

const offer = {
  x402Version: 2,
  scheme: "exact",
  network: NETWORK,
  asset: ASSET,
  amount: AMOUNT,
  payTo: PAY_TO,
  maxTimeoutSeconds: MAX_TIMEOUT,
  extra: { name: "USD Coin", version: "2" },
};

const accepts = [offer];

const paymentRequiredHeaderValue = Buffer.from(
  JSON.stringify({ x402Version: 2, accepts })
).toString("base64");

const lastPaymentPath = path.join(process.cwd(), "test-endpoint", "last-payment.json");

function json(res: http.ServerResponse, status: number, obj: any): void {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = req.url ?? "/";

  // Somente GET
  if (req.method !== "GET") {
    json(res, 405, { error: "method not allowed" });
    return;
  }

  const hasPaymentSignature =
    (req.headers["payment-signature"] as string) ||
    (req.headers["PAYMENT-SIGNATURE"] as string);

  if (!hasPaymentSignature) {
    // Sem pagamento → 402 Payment Required
    res.writeHead(402, {
      "Content-Type": "application/json",
      "PAYMENT-REQUIRED": paymentRequiredHeaderValue,
    });
    res.end(JSON.stringify({ x402Version: 2, error: "Payment required", accepts }));
    return;
  }

  // Com pagamento → 200 OK (demo: aceita qualquer assinatura não vazia)
  const payment = {
    receivedAt: new Date().toISOString(),
    url,
    paymentSignature: hasPaymentSignature,
    offer,
  };

  try {
    fs.writeFileSync(lastPaymentPath, JSON.stringify(payment, null, 2));
  } catch {
    // ignora erro de escrita em demo
  }

  json(res, 200, { paid: true, message: "pago com sucesso", offer });
});

server.listen(PORT, () => {
  console.log(`🧪 Endpoint de teste x402 rodando em http://localhost:${PORT}`);
  console.log(`   GET sem PAYMENT-SIGNATURE → 402 + PAYMENT-REQUIRED`);
  console.log(`   GET com PAYMENT-SIGNATURE  → 200 { paid: true }`);
  console.log(`   Último pagamento salvo em: ${lastPaymentPath}`);
});

export { server, PORT, offer, accepts };
