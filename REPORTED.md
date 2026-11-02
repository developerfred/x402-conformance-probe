# Defeitos Reportados — x402 Conformance Probe

Este documento lista cada defeito genuíno encontrado na varredura de conformidade x402, o canal documentado pelo dono do endpoint para contato, e a issue aberta no repositório do probe para acompanhamento.

## Metodologia

Cada endpoint foi sondado sem pagamento (HTTP GET sem `PAYMENT-SIGNATURE`). Esperava-se `402 Payment Required` com:
- corpo JSON contendo `x402Version`, `accepts[]` com `scheme === "exact"`, par rede+ativo coerente, `amount` em unidades base, `payTo` válido, `maxTimeoutSeconds` plausível
- cabeçalho `PAYMENT-REQUIRED` (Base64) descrevendo a mesma oferta

Toda falha é reproduzível a partir do fixture salvo em `fixtures/<slug>.json` (replay com `npm run replay`).

## Resumo

| # | Endpoint | Status | Motivo | Canal do dono | Issue |
|---|----------|--------|--------|---------------|-------|
| 1 | CoinMarketCap (dex search) | 402 | ✅ PASS — oferta válida | https://coinmarketcap.com/api/documentation/ai-agent-hub/x402 | — |
| 2 | Financial Datasets (earnings) | 402 | corpo sem `x402Version` nem `accepts[]` | https://docs.financialdatasets.ai/x402 | [#7](https://github.com/developerfred/x402-conformance-probe/issues/7) |
| 3 | OpenWeb Ninja (JSearch jobs) | 402 | `network` é `"base"` (não `"eip155:8453"`); usa `maxAmountRequired` em vez de `amount` | https://www.openwebninja.com/blog/x402-agentic-payments | [#6](https://github.com/developerfred/x402-conformance-probe/issues/6) |
| 4 | Averray Verify · /verify/runs | 405 | método não permitido (não retorna 402) | https://averray.com/verify/ | [#3](https://github.com/developerfred/x402-conformance-probe/issues/3) |
| 5 | Browserbase (x402 endpoint) | 200 | não exige pagamento (sem 402) | https://docs.browserbase.com/integrations/x402/introduction | [#2](https://github.com/developerfred/x402-conformance-probe/issues/2) |
| 6 | Exa (search API) | 404 | endpoint não encontrado | https://exa.ai/docs/integrations/payments/x402/quickstart | [#4](https://github.com/developerfred/x402-conformance-probe/issues/4) |
| 7 | Qonoro Intelligence API · /v1/address/normalize | 405 | método não permitido | https://qonoro.ai | [#1](https://github.com/developerfred/x402-conformance-probe/issues/1) |
| 8 | sol-defi-desk · /v1/lending-reserve | 402 | `network` é CAIP-2 Solana (não `eip155`) | https://95.216.126.169.sslip.io/ | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 9 | sol-defi-desk · /v1/token-check | 402 | idem | https://95.216.126.169.sslip.io/ | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 10 | sol-defi-desk · /v1/token-check/batch | 402 | idem | https://95.216.126.169.sslip.io/ | [#8](https://github.com/developerfred/x402-conformance-probe/issues/8) |
| 11 | SolMachina · /v1/epoch | 402 | corpo vazio `{}` (sem oferta) | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 12 | SolMachina · /v1/kamino/markets | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 13 | SolMachina · /v1/pretrade | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 14 | SolMachina · /v1/priority-fee | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 15 | SolMachina · /v1/sgp-checkpoint | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 16 | SolMachina · /v1/tipfloor | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 17 | SolMachina · /v1/token-intel | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 18 | SolMachina · /v1/token-risk | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 19 | SolMachina · /v1/tx-inspect | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |
| 20 | SolMachina · /v1/wallet-scan | 402 | corpo vazio `{}` | https://api.solmachina.com | [#5](https://github.com/developerfred/x402-conformance-probe/issues/5) |

## Endpoint de teste próprio (paid retry)

O endpoint de teste em `test-endpoint/server.ts` (porta 3402) foi usado para confirmar um retry pago:
- Sem `PAYMENT-SIGNATURE` → `402` + `PAYMENT-REQUIRED` (Base64) com oferta válida (USDC Base, 1000 unidades base)
- Com `PAYMENT-SIGNATURE` → `200 { paid: true }`
- Pagamento gravado em `test-endpoint/last-payment.json`

## Como reproduzir

```bash
# Replay offline (não toca na rede)
npm run replay

# Regenerar relatório
npm run report
```

Os fixtures ficam em `fixtures/` e o relatório em `report/index.html`.
