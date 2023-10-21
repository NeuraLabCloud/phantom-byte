# Phantom Byte

Phantom Byte is a Cloud based logging service for software applications

## Setup

The project backend is powered by [Supabase](https://supabase.com/).

First you need to fill out the [.env](./example.env) file and rename it to `.env`. This file cant be `env.local` because
supabase config cant find it.

Also make sure docker is setup on the system. To run the database use the following command:

```shell
pnpm supabase start
```

## Production

In production the cloud instance is used for the database. To run the database use the following command. Production 
Env variables are used for the database and not these local ones.

To push local db changes to the cloud production instance use the following command:

```shell
pnpm supabase db push --password <password>
```