import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "endpoints-discovered.json");
const PAGE_SIZE = 100;

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  return res.json();
}

async function main() {
  // Página 1 para saber o total
  const first: any = await fetchJSON(
    `https://x402-list.com/api/v1/services?status=online&sort=uptime&limit=${PAGE_SIZE}`
  );
  const total = first?.meta?.total ?? first.data.length;
  console.log(`📦 Total de serviços online: ${total}`);

  const allServices: any[] = [...(first.data ?? [])];

  // Páginas restantes
  const totalPages = Math.ceil(total / PAGE_SIZE);
  for (let page = 2; page <= totalPages; page++) {
    try {
      const pageData: any = await fetchJSON(
        `https://x402-list.com/api/v1/services?status=online&sort=uptime&limit=${PAGE_SIZE}&page=${page}`
      );
      if (pageData?.data) allServices.push(...pageData.data);
      if (page % 10 === 0) console.log(`   página ${page}/${totalPages}…`);
    } catch (e) {
      console.log(`   ⚠️  falha na página ${page}:`, (e as Error).message);
    }
  }

  console.log(`🔎 Coletando endpoints detalhados de ${allServices.length} serviços…`);

  const endpoints: Array<{
    name: string;
    url: string;
    channel: string;
    source: string;
    service: string;
    priceUsd?: number;
  }> = [];

  for (const svc of allServices) {
    const slug = svc.slug;
    if (!slug) continue;
    try {
      const det: any = await fetchJSON(
        `https://x402-list.com/api/v1/services/${slug}?ref=probe`
      );
      const data = det?.data;
      if (!data?.endpoints) continue;

      const baseUrl = data.base_url?.replace(/\/$/, "");
      const website = data.website_url || `https://x402-list.com/services/${slug}`;
      const serviceName = data.name || slug;
      const priceUsd = data.min_price_usd;

      for (const ep of data.endpoints) {
        if (!ep.is_active) continue;
        const epPath = ep.path.startsWith("/") ? ep.path : `/${ep.path}`;
        const url = `${baseUrl}${epPath}`;
        endpoints.push({
          name: `${serviceName} · ${epPath}`,
          url,
          channel: website,
          source: "x402-list.com",
          service: serviceName,
          priceUsd,
        });
      }
    } catch (e) {
      // ignora erros individuais
    }
  }

  // Deduplica por URL
  const seen = new Set<string>();
  const unique = endpoints.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  fs.writeFileSync(OUT, JSON.stringify(unique, null, 2));
  console.log(
    `✅ ${unique.length} endpoints únicos descobertos (de ${allServices.length} serviços). Salvos em ${OUT}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
