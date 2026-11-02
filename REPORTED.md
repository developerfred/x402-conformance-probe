# 📋 Defeitos Reportados — x402 Conformance Probe

> Este documento lista cada defeito genuíno encontrado na varredura de conformidade x402,
> o canal documentado pelo dono do endpoint para contato, e a issue aberta no repositório
> para acompanhamento. Todas as falhas são reproduzíveis offline a partir dos fixtures salvos.

---

## 🔎 Metodologia

Cada endpoint foi sondado com um **HTTP GET sem pagamento** (sem cabeçalho `PAYMENT-SIGNATURE`).
Esperava-se `402 Payment Required` com:

| Campo | Regra de validação |
|-------|-------------------|
| `x402Version` | Presente e numérico |
| `scheme` | Exatamente `"exact"` |
| `network` | Formato `eip155:<chainId>` |
| Par rede + ativo | Quando rede é `eip155:8453` (Base) ou `eip155:1` (Ethereum), ativo deve ser USDC dessa rede |
| `amount` | Unidades base (string de dígitos, > 0) |
| `payTo` | Endereço Ethereum válido (`0x` + 40 hex) |
| `maxTimeoutSeconds` | Plausível (> 0 e ≤ 86400) |
| `accepts[]` | Cada entrada concorda com os campos de topo |
| Cabeçalho `PAYMENT-REQUIRED` | Base64+JSON descrevendo a mesma oferta do corpo |

Toda falha está salva em `fixtures/<slug>.json` e reproduzível com `npm run replay`.

---

## 📊 Resumo Executivo

<table>
  <tr>
    <td><b>Total de endpoints</b></td>
    <td><b>30</b></td>
  </tr>
  <tr>
    <td><b>Retornam HTTP 402 ao vivo</b></td>
    <td><b>16</b> (53%)</td>
  </tr>
  <tr>
    <td><b>Pass na validação completa</b></td>
    <td><b>1</b> (3%)</td>
  </tr>
  <tr>
    <td><b>Falhas (defeitos genuínos)</b></td>
    <td><b>29</b> (97%)</td>
  </tr>
  <tr>
    <td><b>Issues abertas no GitHub</b></td>
    <td><b>8</b></td>
  </tr>
</table>

---

## 🛑 Tabela de Defeitos

| # | Endpoint | Status HTTP | Motivo da falha | Canal do dono | Issue |
|---|----------|-------------|-----------------|---------------|-------|
| 1 | CoinMarketCap (dex search) | 402 | ✅ PASS — oferta válida, todos os campos conferem | [docs](https://coinmarketcap.com/api/documentation/ai-agent-hub/x402) | — |
| 2 | Financial Datasets (earnings) | 402 | Corpo sem `x402Version` nem `accepts[]` | [docs](https://docs.financialdatasets.ai/x402) | [#7](https://github.com/developerfred/x402-conformance-probe/issues/7) |
| 3 | OpenWeb Ninja (JSearch jobs) | 402 | `network` é `"base"` (não `"eip155:8453"`); usa `maxAmountRequired` em vez de `amount` | [blog](https://www.openwebninja.com/blog/x402-agentic-payments) | [#6](https://github.com/developerfred/x402-conformance-probe/issues/6) |
| 4 | Averray Verify · /verify/runs | 405 | Método não permitido — não retorna 402 | [site](https://averray.com/verify/) | [#3](https://github.com/developerfred/x402-conformance-probe/issues/3) |
| 5 | Browserbase (x402 endpoint) | 200 | Não exige pagamento — não retorna 402 | [docs](https://docs.browserbase.com/integrations/x402/introduction) | [#2](https://github.com/developerfred/x402-conformance-probe/issues/2) |
| 6 | Exa (search API) | 404 | Endpoint não encontrado | [docs](https://exa.ai/docs/integrations/payments/x402/quickstart) | [#4](https://github.com/developerfred/x402-conformance-probe/issues/4) |
| 7 | Qonoro Intelligence API · /v1/address/normalize | 405 | Método não permitido — não retorna 402 | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 8 | sol-defi-desk · /v1/lending-reserve | 402 | `network` é CAIP-2 Solana (não `eip155`) | [site](https://95.216.126.169.sslip.io/) | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 9 | sol-defi-desk · /v1/token-check | 402 | idem | [site](https://95.216.126.169.sslip.io/) | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 10 | sol-defi-desk · /v1/token-check/batch | 402 | idem | [site](https://95.216.126.169.sslip.io/) | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 11 | SolMachina · /v1/epoch | 402 | Corpo vazio `{}` — sem oferta de pagamento | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 12 | SolMachina · /v1/kamino/markets | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 13 | SolMachina · /v1/pretrade | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 14 | SolMachina · /v1/priority-fee | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 15 | SolMachina · /v1/sgp-checkpoint | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 16 | SolMachina · /v1/tipfloor | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 17 | SolMachina · /v1/token-intel | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 18 | SolMachina · /v1/token-risk | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 19 | SolMachina · /v1/tx-inspect | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 20 | SolMachina · /v1/wallet-scan | 402 | Corpo vazio `{}` | [site](https://api.solmachina.com) | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 21 | Qonoro · /v1/company/enrich | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 22 | Qonoro · /v1/company/research | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 23 | Qonoro · /v1/company/search | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 24 | Qonoro · /v1/competitors/analyze | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 25 | Qonoro · /v1/domain-resolver/resolve | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 26 | Qonoro · /v1/domain/intelligence | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 27 | Qonoro · /v1/email/validate | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 28 | Qonoro · /v1/hiring-signals/find | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 29 | Qonoro · /v1/intent-signals/find | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 30 | Qonoro · /v1/job-changes/detect | 405 | Método não permitido | [site](https://qonoro.ai) | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |

---

## 🧪 Endpoint de Teste Próprio (Paid Retry Confirmado)

O endpoint em `test-endpoint/server.ts` (porta 3402) confirma o fluxo completo de pagamento x402:

| Etapa | Requisição | Resposta esperada | Resultado |
|-------|-----------|-------------------|-----------|
| 1 | `GET /` sem `PAYMENT-SIGNATURE` | `402` + `PAYMENT-REQUIRED` (Base64) | ✅ Confirmado |
| 2 | `GET /` com `PAYMENT-SIGNATURE` | `200` `{ paid: true }` | ✅ Confirmado |
| 3 | Servidor grava pagamento | `test-endpoint/last-payment.json` | ✅ Confirmado |

Oferta do endpoint de teste:
- **Rede:** `eip155:8453` (Base)
- **Ativo:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- **Valor:** 1000 unidades base
- **Destinatário:** `0x3e7c9cA818f713F19e126E3B7B37B47dC1411570`
- **Timeout:** 300 segundos

---

## 🔁 Como Reproduzir (Offline)

```bash
# 1. Baixar respostas 402 ao vivo e salvar fixtures
npm run fetch

# 2. Validar cada fixture contra as regras de conformidade
npm run validate

# 3. Gerar relatório HTML pass/fail
npm run report

# 4. Replay offline (sem tocar na rede)
npm run replay
```

Os fixtures ficam em `fixtures/` e o relatório em `report/index.html`.

---

## 📦 Publicação

- **Relatório online (Vercel):** https://x402-check.vercel.app
- **Repositório GitHub:** https://github.com/developerfred/x402-conformance-probe
- **CI diário:** `.github/workflows/conformance.yml` (executa fetch + validate + report e faz deploy automático)

---

## 💡 Por que isso importa

> Um 402 quebrado é invisível até um agente tentar pagar — e então a falha parece ser do comprador.
> Uma tabela pública de conformidade transforma o problema em responsabilidade do vendedor, com um recibo.

---

<footer>
Open bounty · Proposta inicial: 0.005 ETH · https://github.com/developerfred/x402-conformance-probe
</footer>
