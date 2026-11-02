// Lista de endpoints x402 públicos a serem sondados.
// Cada entrada: { name, url, channel (canal documentado de contato do dono) }
// Gerado a partir do diretório x402-list.com (serviços online com pagamento pronto).
export const ENDPOINTS = [
  {
    name: "CoinMarketCap (dex search)",
    url: "https://pro-api.coinmarketcap.com/x402/v1/dex/search?q=bnb",
    channel: "https://coinmarketcap.com/api/documentation/ai-agent-hub/x402"
  },
  {
    name: "Financial Datasets (earnings)",
    url: "https://api.financialdatasets.ai/earnings?ticker=NVDA&limit=4",
    channel: "https://docs.financialdatasets.ai/x402"
  },
  {
    name: "OpenWeb Ninja (JSearch jobs)",
    url: "https://x402.openwebninja.com/jsearch/search-v2?query=software+engineer+jobs+in+austin",
    channel: "https://www.openwebninja.com/blog/x402-agentic-payments"
  },
  {
    name: "Browserbase (x402 endpoint)",
    url: "https://x402.browserbase.com/",
    channel: "https://docs.browserbase.com/integrations/x402/introduction"
  },
  {
    name: "Exa (search API)",
    url: "https://api.exa.ai/search",
    channel: "https://exa.ai/docs/integrations/payments/x402/quickstart"
  },
  {
    name: "x402engine · /api/crypto/history",
    url: "https://x402engine.app/api/crypto/history",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/crypto/markets",
    url: "https://x402engine.app/api/crypto/markets",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/crypto/price",
    url: "https://x402engine.app/api/crypto/price",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/crypto/search",
    url: "https://x402engine.app/api/crypto/search",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/crypto/trending",
    url: "https://x402engine.app/api/crypto/trending",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/ens/resolve",
    url: "https://x402engine.app/api/ens/resolve",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/ens/reverse",
    url: "https://x402engine.app/api/ens/reverse",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/ipfs/get",
    url: "https://x402engine.app/api/ipfs/get",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/token/metadata",
    url: "https://x402engine.app/api/token/metadata",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/travel/flights",
    url: "https://x402engine.app/api/travel/flights",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/travel/hotels",
    url: "https://x402engine.app/api/travel/hotels",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/web/scrape",
    url: "https://x402engine.app/api/web/scrape",
    channel: "https://x402engine.app"
  },
  {
    name: "x402engine · /api/web/screenshot",
    url: "https://x402engine.app/api/web/screenshot",
    channel: "https://x402engine.app"
  },
  {
    name: "MicroTap · /api/crypto-market",
    url: "https://x402tap.com/api/crypto-market",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/crypto-price",
    url: "https://x402tap.com/api/crypto-price",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/crypto-trending",
    url: "https://x402tap.com/api/crypto-trending",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/defi-chains",
    url: "https://x402tap.com/api/defi-chains",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/defi-tvl",
    url: "https://x402tap.com/api/defi-tvl",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/ens-resolve",
    url: "https://x402tap.com/api/ens-resolve",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/gas-price",
    url: "https://x402tap.com/api/gas-price",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/generate",
    url: "https://x402tap.com/api/generate",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/insights",
    url: "https://x402tap.com/api/insights",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/kalshi-market",
    url: "https://x402tap.com/api/kalshi-market",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/kalshi-markets",
    url: "https://x402tap.com/api/kalshi-markets",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/ping",
    url: "https://x402tap.com/api/ping",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/polymarket-market",
    url: "https://x402tap.com/api/polymarket-market",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/polymarket-markets",
    url: "https://x402tap.com/api/polymarket-markets",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/prediction-arb",
    url: "https://x402tap.com/api/prediction-arb",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/rpc",
    url: "https://x402tap.com/api/rpc",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/wallet-balance",
    url: "https://x402tap.com/api/wallet-balance",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/weather",
    url: "https://x402tap.com/api/weather",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /api/web-search",
    url: "https://x402tap.com/api/web-search",
    channel: "https://x402tap.com"
  },
  {
    name: "MicroTap · /protected",
    url: "https://x402tap.com/protected",
    channel: "https://x402tap.com"
  },
  {
    name: "PHION Agent Services · /v1/paid/attest",
    url: "https://phion.systems/v1/paid/attest",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/commercial/enrich",
    url: "https://phion.systems/v1/paid/commercial/enrich",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/commercial/inference",
    url: "https://phion.systems/v1/paid/commercial/inference",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/commercial/intelligence",
    url: "https://phion.systems/v1/paid/commercial/intelligence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/commercial/search",
    url: "https://phion.systems/v1/paid/commercial/search",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/fetch-evidence",
    url: "https://phion.systems/v1/paid/fetch-evidence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/inspect-agent",
    url: "https://phion.systems/v1/paid/inspect-agent",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/journeys/verify",
    url: "https://phion.systems/v1/paid/journeys/verify",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/mandates/reserve",
    url: "https://phion.systems/v1/paid/mandates/reserve",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/preflight-payment",
    url: "https://phion.systems/v1/paid/preflight-payment",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/asset-due-diligence",
    url: "https://phion.systems/v1/paid/rwa/asset-due-diligence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/compliance",
    url: "https://phion.systems/v1/paid/rwa/compliance",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/corporate-actions",
    url: "https://phion.systems/v1/paid/rwa/corporate-actions",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/nav-reserve",
    url: "https://phion.systems/v1/paid/rwa/nav-reserve",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/sanctions-screening-evidence",
    url: "https://phion.systems/v1/paid/rwa/sanctions-screening-evidence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/rwa/transaction-assurance",
    url: "https://phion.systems/v1/paid/rwa/transaction-assurance",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/schema-normalize",
    url: "https://phion.systems/v1/paid/schema-normalize",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/transaction-assurance",
    url: "https://phion.systems/v1/paid/transaction-assurance",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/transaction-recovery",
    url: "https://phion.systems/v1/paid/transaction-recovery",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/agent-budget-guard",
    url: "https://phion.systems/v1/paid/trust/agent-budget-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/agent-reputation-evidence",
    url: "https://phion.systems/v1/paid/trust/agent-reputation-evidence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/agent-task-handoff-receipt",
    url: "https://phion.systems/v1/paid/trust/agent-task-handoff-receipt",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/concurrency-guard",
    url: "https://phion.systems/v1/paid/trust/concurrency-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/context-provenance-labeler",
    url: "https://phion.systems/v1/paid/trust/context-provenance-labeler",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/counterparty-risk-preflight",
    url: "https://phion.systems/v1/paid/trust/counterparty-risk-preflight",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/data-egress-preflight",
    url: "https://phion.systems/v1/paid/trust/data-egress-preflight",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/delegation-scope-guard",
    url: "https://phion.systems/v1/paid/trust/delegation-scope-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/delivery-evidence",
    url: "https://phion.systems/v1/paid/trust/delivery-evidence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/duplicate-charge-detector",
    url: "https://phion.systems/v1/paid/trust/duplicate-charge-detector",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/human-approval-policy",
    url: "https://phion.systems/v1/paid/trust/human-approval-policy",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/idempotency-replay-guard",
    url: "https://phion.systems/v1/paid/trust/idempotency-replay-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/index-feed",
    url: "https://phion.systems/v1/paid/trust/index-feed",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/mcp-manifest-firewall",
    url: "https://phion.systems/v1/paid/trust/mcp-manifest-firewall",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/mcp-server-identity-evidence",
    url: "https://phion.systems/v1/paid/trust/mcp-server-identity-evidence",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/memory-write-guard",
    url: "https://phion.systems/v1/paid/trust/memory-write-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/oauth-token-audience-guard",
    url: "https://phion.systems/v1/paid/trust/oauth-token-audience-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/payment-receipt-reconciler",
    url: "https://phion.systems/v1/paid/trust/payment-receipt-reconciler",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/payment-route-selector",
    url: "https://phion.systems/v1/paid/trust/payment-route-selector",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/redirect-callback-validator",
    url: "https://phion.systems/v1/paid/trust/redirect-callback-validator",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/resource-cycle-guard",
    url: "https://phion.systems/v1/paid/trust/resource-cycle-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/secret-redaction-preflight",
    url: "https://phion.systems/v1/paid/trust/secret-redaction-preflight",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/service-sla-attestation",
    url: "https://phion.systems/v1/paid/trust/service-sla-attestation",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/signed-result-comparator",
    url: "https://phion.systems/v1/paid/trust/signed-result-comparator",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/source-backed-search",
    url: "https://phion.systems/v1/paid/trust/source-backed-search",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/subscription-spend-guard",
    url: "https://phion.systems/v1/paid/trust/subscription-spend-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/tool-call-policy-guard",
    url: "https://phion.systems/v1/paid/trust/tool-call-policy-guard",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/tool-capability-drift-monitor",
    url: "https://phion.systems/v1/paid/trust/tool-capability-drift-monitor",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/tool-output-firewall",
    url: "https://phion.systems/v1/paid/trust/tool-output-firewall",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/webhook-verifier",
    url: "https://phion.systems/v1/paid/trust/webhook-verifier",
    channel: "https://phion.systems"
  },
  {
    name: "PHION Agent Services · /v1/paid/trust/x402-quote-comparator",
    url: "https://phion.systems/v1/paid/trust/x402-quote-comparator",
    channel: "https://phion.systems"
  },
  {
    name: "anchor-x402 · /v1/anchor",
    url: "https://api.anchor-x402.com/v1/anchor",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/attest",
    url: "https://api.anchor-x402.com/v1/attest",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/aura",
    url: "https://api.anchor-x402.com/v1/aura",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/decode/calldata",
    url: "https://api.anchor-x402.com/v1/decode/calldata",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/decode/tx",
    url: "https://api.anchor-x402.com/v1/decode/tx",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/grade",
    url: "https://api.anchor-x402.com/v1/grade",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/intel/wallet",
    url: "https://api.anchor-x402.com/v1/intel/wallet",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/investigate",
    url: "https://api.anchor-x402.com/v1/investigate",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/oracle",
    url: "https://api.anchor-x402.com/v1/oracle",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/parse/datetime",
    url: "https://api.anchor-x402.com/v1/parse/datetime",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/price/token",
    url: "https://api.anchor-x402.com/v1/price/token",
    channel: "https://anchor-x402.com"
  },
  {
    name: "anchor-x402 · /v1/resolve/name",
    url: "https://api.anchor-x402.com/v1/resolve/name",
    channel: "https://anchor-x402.com"
  }
];
