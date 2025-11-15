import { neon } from "@neondatabase/serverless";

const NEON_URL = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL;

if (!NEON_URL) {
  console.warn("[v0] Neon database URL not configured, caching disabled");
}

const sql = NEON_URL ? neon(NEON_URL) : null;

// Price cache functions
export async function getCachedPrice(tokenAddress: string, chain: string) {
  if (!sql) return null; // Return null if Neon not configured
  const now = Date.now();
  const result = await sql`
    SELECT price, source, cached_at
    FROM price_cache
    WHERE token_address = ${tokenAddress}
      AND chain = ${chain}
      AND expires_at > ${now}
    LIMIT 1
  `;
  return result[0];
}

export async function setCachedPrice(
  tokenAddress: string,
  chain: string,
  price: number,
  source: string,
  ttlSeconds: number = 30
) {
  if (!sql) return; // Return early if Neon not configured
  const now = Date.now();
  const expiresAt = now + ttlSeconds * 1000;

  await sql`
    INSERT INTO price_cache (token_address, chain, price, cached_at, expires_at, source)
    VALUES (${tokenAddress}, ${chain}, ${price}, ${now}, ${expiresAt}, ${source})
    ON CONFLICT (token_address, chain)
    DO UPDATE SET
      price = ${price},
      cached_at = ${now},
      expires_at = ${expiresAt},
      source = ${source}
  `;
}

// Token cache functions
export async function getCachedToken(tokenAddress: string, chain: string) {
  if (!sql) return null; // Return null if Neon not configured
  const now = Date.now();
  const result = await sql`
    SELECT symbol, name, decimals, logo
    FROM token_cache
    WHERE token_address = ${tokenAddress}
      AND chain = ${chain}
      AND expires_at > ${now}
    LIMIT 1
  `;
  return result[0];
}

export async function setCachedToken(
  tokenAddress: string,
  chain: string,
  metadata: { symbol: string; name: string; decimals: number; logo?: string },
  ttlSeconds: number = 300
) {
  if (!sql) return; // Return early if Neon not configured
  const now = Date.now();
  const expiresAt = now + ttlSeconds * 1000;

  await sql`
    INSERT INTO token_cache (token_address, chain, symbol, name, decimals, logo, cached_at, expires_at)
    VALUES (${tokenAddress}, ${chain}, ${metadata.symbol}, ${metadata.name}, ${metadata.decimals}, ${metadata.logo || null}, ${now}, ${expiresAt})
    ON CONFLICT (token_address, chain)
    DO UPDATE SET
      symbol = ${metadata.symbol},
      name = ${metadata.name},
      decimals = ${metadata.decimals},
      logo = ${metadata.logo || null},
      cached_at = ${now},
      expires_at = ${expiresAt}
  `;
}

// Analytics logging
export async function logApiAnalytics(data: {
  userId: string;
  endpoint: string;
  action?: string;
  responseTimeMs: number;
  statusCode: number;
  ipAddress?: string;
  userAgent?: string;
}) {
  if (!sql) return; // Return early if Neon not configured
  const now = Date.now();

  await sql`
    INSERT INTO api_analytics (user_id, endpoint, action, response_time_ms, status_code, timestamp, ip_address, user_agent)
    VALUES (${data.userId}, ${data.endpoint}, ${data.action || null}, ${data.responseTimeMs}, ${data.statusCode}, ${now}, ${data.ipAddress || null}, ${data.userAgent || null})
  `;
}

export async function getRecentAnalytics(limit: number = 100): Promise<any[]> {
  if (!sql) return []; // Return empty array if Neon not configured
  try {
    const results = await sql`
      SELECT user_id, endpoint, action, response_time_ms, status_code, timestamp
      FROM api_analytics
      ORDER BY timestamp DESC
      LIMIT ${limit}
    `;

    return results.map((row: any) => ({
      userId: row.user_id,
      endpoint: row.endpoint,
      action: row.action || 'unknown',
      responseTimeMs: row.response_time_ms,
      statusCode: row.status_code,
      createdAt: row.timestamp,
    }));
  } catch (error) {
    console.error("[v0] Failed to fetch analytics:", error);
    return [];
  }
}

// Quote cache functions
export async function getCachedQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  chain: string
) {
  if (!sql) return null; // Return null if Neon not configured
  const now = Date.now();
  const result = await sql`
    SELECT quote_data
    FROM quote_cache
    WHERE from_token = ${fromToken}
      AND to_token = ${toToken}
      AND amount = ${amount}
      AND chain = ${chain}
      AND expires_at > ${now}
    LIMIT 1
  `;
  return result[0]?.quote_data;
}

export async function setCachedQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  chain: string,
  quoteData: any,
  ttlSeconds: number = 10
) {
  if (!sql) return; // Return early if Neon not configured
  const now = Date.now();
  const expiresAt = now + ttlSeconds * 1000;

  await sql`
    INSERT INTO quote_cache (from_token, to_token, amount, chain, quote_data, cached_at, expires_at)
    VALUES (${fromToken}, ${toToken}, ${amount}, ${chain}, ${quoteData}, ${now}, ${expiresAt})
    ON CONFLICT (from_token, to_token, amount, chain)
    DO UPDATE SET
      quote_data = ${quoteData},
      cached_at = ${now},
      expires_at = ${expiresAt}
  `;
}
