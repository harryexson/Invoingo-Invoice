-- SQLite migration 1. All identity-scoped reads/writes bind tenant server-side.
PRAGMA foreign_keys=ON;
PRAGMA journal_mode=WAL;
PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS miobot_workspace (
  tenant TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS miobot_records (
  tenant TEXT NOT NULL,
  kind TEXT NOT NULL,
  id TEXT NOT NULL,
  data TEXT NOT NULL,
  PRIMARY KEY (tenant, kind, id)
);
CREATE INDEX IF NOT EXISTS miobot_kind ON miobot_records(tenant, kind);
PRAGMA user_version=1;
