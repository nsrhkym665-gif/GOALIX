export default async (request) => {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return new Response(JSON.stringify({ error: "FOOTBALL_DATA_TOKEN is not configured" }), { status: 503, headers: { "content-type": "application/json; charset=utf-8" } });
  const incoming = new URL(request.url);
  const path = incoming.searchParams.get("path") || "";
  const endpoint = path.split("?")[0];
  const valid = endpoint === "/matches" || /^\/competitions\/(PL|PD|BL1|SA|FL1|CL|WC)\/standings$/.test(endpoint);
  if (!valid) return new Response(JSON.stringify({ error: "Endpoint not allowed" }), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  const upstreamUrl = new URL("https://api.football-data.org/v4" + endpoint);
  const embeddedQuery = path.includes("?") ? path.slice(path.indexOf("?") + 1) : "";
  if (embeddedQuery) new URLSearchParams(embeddedQuery).forEach((v, k) => upstreamUrl.searchParams.set(k, v));
  try {
    const upstream = await fetch(upstreamUrl, { headers: { "X-Auth-Token": token } });
    return new Response(await upstream.text(), { status: upstream.status, headers: { "content-type": upstream.headers.get("content-type") || "application/json; charset=utf-8", "cache-control": "no-store" } });
  } catch {
    return new Response(JSON.stringify({ error: "Upstream API request failed" }), { status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
};
