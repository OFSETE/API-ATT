-- SQL de criação da tabela books para Supabase/Postgres
-- Execute no SQL editor do Supabase ou via migration
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  published_year integer,
  genre text,
  owner_id uuid,
  created_at timestamptz DEFAULT now()
);
