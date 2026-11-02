---
name: x402 Conformance Defect
about: Reporte um defeito de conformidade x402 encontrado pelo probe de conformidade
title: "[x402] <endpoint> — <motivo breve da falha>"
labels: ["conformance", "x402", "defect"]
assignees: ""
---

## 🔍 Resumo do defeito

| Campo | Valor |
|-------|-------|
| **Endpoint** | `<URL do endpoint>` |
| **Status HTTP** | `<código HTTP retornado>` |
| **Método** | `GET` (sem pagamento) |
| **Motivo da falha** | `<uma linha descrevendo o defeito>` |
| **Fixture** | `fixtures/<slug>.json` |
| **Canal do dono** | `<link para documentação/contato>` |

---

## 🧪 Como reproduzir (offline)

```bash
# Baixar fixtures e validar
npm run fetch
npm run validate

# Replay apenas este endpoint (offline, não toca na rede)
npx tsx probe/replay.ts
```

Ou abra o fixture diretamente: `fixtures/<slug>.json`

---

## 📋 O que foi validado

- [ ] `x402Version` presente e numérico
- [ ] `scheme === "exact"`
- [ ] `network` no formato `eip155:<chainId>`
- [ ] Par rede + ativo coerente (ex: `eip155:8453` com USDC)
- [ ] `amount` em unidades base válidas
- [ ] `payTo` é endereço Ethereum válido
- [ ] `maxTimeoutSeconds` plausível (> 0 e ≤ 86400)
- [ ] Cada `accepts[]` concorda com os campos de topo
- [ ] Cabeçalho `PAYMENT-REQUIRED` confere com o corpo

---

## 🔗 Relatórios

- [Tabela de conformidade (Vercel)](https://x402-check.vercel.app/report/index.html)
- [REPORTED.md](https://github.com/developerfred/x402-conformance-probe/blob/main/REPORTED.md)
- [Repositório](https://github.com/developerfred/x402-conformance-probe)
