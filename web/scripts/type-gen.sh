#!/bin/bash

# Should be ran from project root
pnpm supabase gen types typescript --local > ./src/lib/schema.ts