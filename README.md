# Lendar

Plataforma argentina de préstamos hipotecarios P2P para clientes de la red RE/MAX Argentina. En esta etapa: landing pages con simuladores de préstamo e inversión para eventos presenciales, con registro de leads en Supabase.

## Stack

- Next.js 16 (App Router) + TypeScript strict — deploy en Vercel
- Tailwind CSS v4 (theme vía `@theme` en CSS)
- Supabase (Postgres, tabla `leads`; sin Auth por ahora)
- Zod (validación de payloads)

## Estructura

```
src/
├── app/                  → Páginas (/, /simular-prestamo, /simular-inversion) y /api/leads
├── components/
│   ├── simuladores/      → SimuladorPrestamo, SimuladorInversion (reutilizables)
│   └── ui/               → Slider, Button, Card, Input, Field
├── lib/                  → calculos.ts (funciones puras), validations/, supabase.ts, env.ts
└── types/                → Tipos compartidos de los simuladores
supabase/migrations/      → SQL de la tabla leads
agents/                   → Subagentes del proyecto
docs/                     → PRD.md y CONTEXT.md
```

## Setup

1. `pnpm install`
2. Configurar las variables de entorno (ver `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
3. Aplicar la migración de `supabase/migrations/` en el proyecto de Supabase (SQL editor o `supabase db push`)
4. `pnpm dev`

## Rutas de QR

Los simuladores aceptan tracking por query params:

```
/simular-prestamo?evento=expo-remax-2026&vendedor=juan-perez
/simular-inversion?evento=expo-remax-2026&vendedor=juan-perez
```

Los valores se guardan junto con el lead.
