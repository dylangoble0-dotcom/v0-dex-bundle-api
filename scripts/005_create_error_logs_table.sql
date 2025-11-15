-- Create error logs table for AI monitoring
CREATE TABLE IF NOT EXISTS error_logs (
  id SERIAL PRIMARY KEY,
  endpoint TEXT NOT NULL,
  error_type TEXT NOT NULL,
  message TEXT NOT NULL,
  stack TEXT,
  fix_suggestion TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_error_logs_endpoint ON error_logs(endpoint);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_error_logs_resolved ON error_logs(resolved);
