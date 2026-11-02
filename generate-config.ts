import fs from "node:fs";
import path from "node:path";

const DISCOVERED = path.join(process.cwd(), "endpoints-discovered.json");
const OUT = path.join(process.cwd(), "probe", "config.ts");

function main() {
  const discovered: Array<{ name: string; url: string; channel: string }> =
    JSON.parse(fs.readFileSync(DISCOVERED, "utf8"));

  const seeds = [
    {
      name: "CoinMarketCap (dex search)",
      url: "https://pro-api.coinmarketcap.com/x402/v1/dex/search?q=bnb",
      channel:
        "https://coinmarketcap.com/api/documentation/ai-agent-hub/x402",
    },
    {
      name: "Financial Datasets (earnings)",
      url: "https://api.financialdatasets.ai/earnings?ticker=NVDA&limit=4",
      channel: "https://docs.financialdatasets.ai/x402",
    },
    {
      name: "OpenWeb Ninja (JSearch jobs)",
      url:
        "https://x402.openwebninja.com/jsearch/search-v2?query=software+engineer+jobs+in+austin",
      channel: "https://www.openwebninja.com/blog/x402-agentic-payments",
    },
    {
      name: "Browserbase (x402 endpoint)",
      url: "https://x402.browserbase.com/",
      channel: "https://docs.browserbase.com/integrations/x402/introduction",
    },
    {
      name: "Exa (search API)",
      url: "https://api.exa.ai/search",
      channel: "https://exa.ai/docs/integrations/payments/x402/quickstart",
    },
  ];

  const seen = new Set<string>();
  const all: Array<{ name: string; url: string; channel: string }> = [];
  const add = (e: { name: string; url: string; channel: string }) => {
    if (seen.has(e.url)) return;
    seen.add(e.url);
    all.push(e);
  };
  seeds.forEach(add);
  discovered.forEach(add);

  // Primeiros 100 endpoints para sondagem
  const top = all.slice(0, 100);

  const lines = top.map(
    (e) => `  {\n    name: ${JSON.stringify(e.name)},\n    url: ${JSON.stringify(e.url)},\n    channel: ${JSON.stringify(e.channel)}\n  }`
  );

  const content = `// Lista de endpoints x402 públicos a serem sondados.
// Cada entrada: { name, url, channel (canal documentado de contato do dono) }
// Gerado a partir do diretório x402-list.com (serviços online com pagamento pronto).
export const ENDPOINTS = [\n${lines.join(",\n")}\n];\n`;

  fs.writeFileSync(OUT, content);
  console.log(`✅ ${OUT} gerado com ${top.length} endpoints (de ${all.length} descobertos no total).`);
}

main();
