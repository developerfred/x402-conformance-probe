// Lista de endpoints x402 públicos a serem sondados.
// Cada entrada: { name, url, channel (canal documentado de contato do dono) }
// Os 5 primeiros são endpoints conhecidos/documentados; os demais vêm do
// diretório x402-list.com (serviços online com pagamento pronto).
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
    name: "Averray Verify · /verify/runs",
    url: "https://api.averray.com/verify/runs",
    channel: "https://averray.com/verify/"
  },
  {
    name: "sol-defi-desk · /v1/lending-reserve",
    url: "https://95.216.126.169.sslip.io/v1/lending-reserve",
    channel: "https://95.216.126.169.sslip.io/"
  },
  {
    name: "sol-defi-desk · /v1/token-check",
    url: "https://95.216.126.169.sslip.io/v1/token-check",
    channel: "https://95.216.126.169.sslip.io/"
  },
  {
    name: "sol-defi-desk · /v1/token-check/batch",
    url: "https://95.216.126.169.sslip.io/v1/token-check/batch",
    channel: "https://95.216.126.169.sslip.io/"
  },
  {
    name: "SolMachina · /v1/epoch",
    url: "https://api.solmachina.com/v1/epoch",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/kamino/markets",
    url: "https://api.solmachina.com/v1/kamino/markets",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/pretrade",
    url: "https://api.solmachina.com/v1/pretrade",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/priority-fee",
    url: "https://api.solmachina.com/v1/priority-fee",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/sgp-checkpoint",
    url: "https://api.solmachina.com/v1/sgp-checkpoint",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/tipfloor",
    url: "https://api.solmachina.com/v1/tipfloor",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/token-intel",
    url: "https://api.solmachina.com/v1/token-intel",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/token-risk",
    url: "https://api.solmachina.com/v1/token-risk",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/tx-inspect",
    url: "https://api.solmachina.com/v1/tx-inspect",
    channel: "https://api.solmachina.com"
  },
  {
    name: "SolMachina · /v1/wallet-scan",
    url: "https://api.solmachina.com/v1/wallet-scan",
    channel: "https://api.solmachina.com"
  },
  {
    name: "Qonoro Intelligence API · /v1/address/normalize",
    url: "https://api.qonoro.ai/v1/address/normalize",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/company/enrich",
    url: "https://api.qonoro.ai/v1/company/enrich",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/company/research",
    url: "https://api.qonoro.ai/v1/company/research",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/company/search",
    url: "https://api.qonoro.ai/v1/company/search",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/competitors/analyze",
    url: "https://api.qonoro.ai/v1/competitors/analyze",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/domain-resolver/resolve",
    url: "https://api.qonoro.ai/v1/domain-resolver/resolve",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/domain/intelligence",
    url: "https://api.qonoro.ai/v1/domain/intelligence",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/email/validate",
    url: "https://api.qonoro.ai/v1/email/validate",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/hiring-signals/find",
    url: "https://api.qonoro.ai/v1/hiring-signals/find",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/intent-signals/find",
    url: "https://api.qonoro.ai/v1/intent-signals/find",
    channel: "https://qonoro.ai"
  },
  {
    name: "Qonoro Intelligence API · /v1/job-changes/detect",
    url: "https://api.qonoro.ai/v1/job-changes/detect",
    channel: "https://qonoro.ai"
  }
];
