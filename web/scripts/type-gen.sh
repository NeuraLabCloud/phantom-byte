#!/usr/bin/env sh

# Should be ran from project root
pnpm supabase gen types typescript --local > ./lib/supabase/database-types.ts