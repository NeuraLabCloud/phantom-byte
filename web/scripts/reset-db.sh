#!/usr/bin/env sh

pnpm supabase db reset
pnpm supabase gen types typescript --local > ./lib/schema.ts