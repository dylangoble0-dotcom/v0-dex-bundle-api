-- Cache tables for Neon database (high-volume data)
CREATE TABLE IF NOT EXISTS price_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_address TEXT NOT NULL,
  chain TEXT NOT NULL,
  price NUMERIC NOT NULL,
  cached_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  source TEXT,
  UNIQUE(token_address, chain)
);

CREATE INDEX idx_price_cache_lookup ON price_cache(token_address, chain, expires_at);

-- Token metadata cache
CREATE TABLE IF NOT EXISTS token_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_address TEXT NOT NULL,
  chain TEXT NOT NULL,
  symbol TEXT,
  name TEXT,
  decimals INTEGER,
  logo TEXT,
  cached_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  UNIQUE(token_address, chain)
);

CREATE INDEX idx_token_cache_lookup ON token_cache(token_address, chain, expires_at);

-- API analytics (high volume)
CREATE TABLE IF NOT EXISTS api_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  action TEXT,
  response_time_ms INTEGER,
  status_code INTEGER,
  timestamp BIGINT NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);

CREATE INDEX idx_analytics_user ON api_analytics(user_id, timestamp DESC);
CREATE INDEX idx_analytics_endpoint ON api_analytics(endpoint, timestamp DESC);
CREATE INDEX idx_analytics_timestamp ON api_analytics(timestamp DESC);

-- Quote cache for DEX aggregation
CREATE TABLE IF NOT EXISTS quote_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_token TEXT NOT NULL,
  to_token TEXT NOT NULL,
  amount TEXT NOT NULL,
  chain TEXT NOT NULL,
  quote_data JSONB NOT NULL,
  cached_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  UNIQUE(from_token, to_token, amount, chain)
);

CREATE INDEX idx_quote_cache_lookup ON quote_cache(from_token, to_token, amount, chain, expires_at);
