import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "endpoints-discovered.json");

async function main() {
  // Lista serviços online
  const listRes = await fetch(
    "https://x402-list.com/api/v1/services?status=online&sort=uptime&limit=60"
  );
  const list = (await listRes.json()) as { data: any[] };
  const services = list.data;

  const endpoints: Array<{
    name: string;
    url: string;
    channel: string;
    source: string;
  }> = [];

  for (const svc of services) {
    const slug = svc.slug;
    try {
      const detRes = await fetch(
        `https://x402-list.com/api/v1/services/${slug}?ref=probe`
      );
      const det = (await detRes.json()) as any;
      const data = det?.data;
      if (!data?.endpoints) continue;

      const baseUrl = data.base_url?.replace(/\/$/, "");
      const website = data.website_url || `https://x402-list.com/services/${slug}`;

      for (const ep of data.endpoints) {
        if (!ep.is_active) continue;
        const path = ep.path.startsWith("/") ? ep.path : `/${ep.path}`;
        const url = `${baseUrl}${path}`;
        endpoints.push({
          name: `${data.name} · ${ep.path}`,
          url,
          channel: website,
          source: "x402-list.com",
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
  console.log(`📦 ${unique.length} endpoints descobertos (de ${services.length} serviços). Salvos em ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
