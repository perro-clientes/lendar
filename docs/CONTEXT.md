# CONTEXT — Lendar

## 1. DESCRIPCIÓN DEL PRODUCTO

Lendar es una plataforma argentina de préstamos hipotecarios P2P, exclusiva para clientes de la red RE/MAX Argentina. Conecta solicitantes de crédito con inversores sin intermediación bancaria (finanzas colaborativas).

En esta etapa el producto es una landing con simuladores (préstamo e inversión) que un vendedor de RE/MAX usa en eventos y muestras presenciales: comparte un link/QR, el prospecto simula desde su celular y el resultado queda registrado como lead con su origen (evento/vendedor).

Usuarios:
- **Solicitante de crédito**: simula un préstamo hipotecario y deja sus datos (opcional).
- **Inversor**: simula una inversión que financia hipotecas y deja sus datos (opcional).
- **Vendedor RE/MAX** (actor externo): comparte links/QR con `?evento=` y `?vendedor=`; no accede al sistema.

## 2. ESTADO ACTUAL DEL MVP

```
[x] Landing one-pager (/)
[x] Simulador de préstamo (reutilizable)
[x] Simulador de inversión (reutilizable)
[x] Ruta dedicada /simular-prestamo (destino de QR)
[x] Ruta dedicada /simular-inversion (destino de QR)
[x] Tracking por query params (evento, vendedor)
[x] Endpoint POST /api/leads
[x] Cálculo financiero en lib/calculos.ts (funciones puras)
[x] Validación de payload con Zod
[x] Migración SQL de la tabla leads
[ ] .env real de desarrollo (usar placeholders locales o los valores de Supabase)
[ ] Aplicar la migración en Supabase
```

## 3. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js (App Router) | 16.3 | Rutas, API route, Server/Client Components |
| TypeScript | ^5 | Strict mode |
| React | 19.2 | UI |
| Tailwind CSS | v4 | Utilities; theme vía `@theme` en `globals.css` (sin `tailwind.config.ts`) |
| Zod | latest | Validación de payloads en `lib/validations/leads.ts` |
| @supabase/supabase-js | latest | Cliente server (service role) para el endpoint |
| @next/third-parties | latest | GoogleAnalytics (GA4) |
| Supabase | latest | Solo Postgres (tabla `leads`); sin Auth en esta etapa |
| Vercel | — | Deploy; preview por PR |
| GitHub | — | Versionado, flujo por PR |
| pnpm | 10 | Package manager |

## 4. ESQUEMA DE BASE DE DATOS

Tabla `public.leads` (migración en `supabase/migrations/`):

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| tipo | text | `check (tipo in ('prestamo', 'inversion'))` |
| inputs | jsonb | Valores ingresados por el usuario |
| resultado | jsonb | Output calculado (cuota, totales, etc.) |
| contacto | jsonb | nullable — nombre/teléfono/email |
| evento | text | nullable — query param |
| vendedor | text | nullable — query param |
| created_at | timestamptz | default `now()` |

Índices: `leads_created_at_idx` (created_at desc), `leads_tipo_idx` (tipo), `leads_evento_idx` (evento).

RLS: habilitado. Política `leads_insert_anon`: INSERT para rol `anon` con `with check (true)`. Sin SELECT/UPDATE/DELETE para `anon`; `service_role` bypasea RLS (usado solo server-side).

## 5. ARQUITECTURA Y ESTRUCTURA DE ARCHIVOS

```
src/
├── app/
│   ├── page.tsx                    → Landing con ambos simuladores
│   ├── simular-prestamo/page.tsx   → Ruta dedicada (destino de QR), lee searchParams
│   ├── simular-inversion/page.tsx  → Ruta dedicada (destino de QR), lee searchParams
│   ├── api/leads/route.ts          → POST para guardar leads
│   ├── robots.ts                   → robots.txt (indexación)
│   └── sitemap.ts                  → sitemap.xml (indexación)
├── components/
│   ├── simuladores/                → SimuladorPrestamo.tsx, SimuladorInversion.tsx (reutilizables)
│   └── ui/                         → Slider.tsx, Button.tsx, Card.tsx, Input.tsx, Field.tsx
├── lib/
│   ├── calculos.ts                 → Funciones puras (amortización francesa, IVA, valor futuro, formato)
│   ├── validations/leads.ts        → Schemas Zod (leadSchema y subtipos)
│   ├── supabase.ts                 → crearClienteSupabaseServer() (service role)
│   ├── site.ts                     → siteUrl con fallback (SEO)
│   └── env.ts                      → Validación de publicEnv y serverEnv al inicio
└── types/
    └── simulador.ts                → Tipos compartidos (inputs/outputs/tracking/lead)
supabase/migrations/                → SQL de la tabla leads
agents/                             → Subagentes del proyecto
docs/                               → PRD.md y CONTEXT.md
```

## 6. FLUJOS DE USUARIO IMPLEMENTADOS

**Flujo A: Simulación de préstamo desde QR (con tracking)**
1. Vendedor comparte link `/simular-prestamo?evento=...&vendedor=...`
2. Server Component lee `searchParams` (Promise, se await) y pasa `tracking={{ evento, vendedor }}` al simulador
3. Prospecto ajusta sliders (monto, plazo en años, tasa)
4. Resultado calculado en cliente con `lib/calculos.ts` (amortización francesa)
5. Prospecto deja contacto (opcional) y registra
6. `POST /api/leads` valida con Zod e inserta con service role
7. Confirmación en pantalla

**Flujo B: Simulación de inversión desde la landing**
1. Prospecto ajusta sliders (capital inicial, aporte mensual, plazo, tasa)
2. Resultado con interés compuesto mensual desde `lib/calculos.ts`
3. Contacto opcional, registro vía `POST /api/leads` (sin tracking si no venía en la URL)
4. Confirmación en pantalla

## 7. ENDPOINTS

| Ruta | Método | Acceso | Qué hace | Tablas |
|---|---|---|---|---|
| `/api/leads` | POST | Público | Valida payload con Zod y guarda el lead | `leads` (insert) |

## 8. VARIABLES DE ENTORNO

```
NEXT_PUBLIC_SITE_URL              → público (dominio canónico; fallback a VERCEL_PROJECT_PRODUCTION_URL)
NEXT_PUBLIC_GA_ID                 → público (Measurement ID GA4, opcional; sin él no se carga GA)
NEXT_PUBLIC_SUPABASE_URL          → público
NEXT_PUBLIC_SUPABASE_ANON_KEY     → público (reservado para uso futuro en cliente)
SUPABASE_SERVICE_ROLE_KEY         → server-only ⚠️
```

## 9. DECISIONES TÉCNICAS Y DE PRODUCTO

```
[2026-08] DECISIÓN: Sin autenticación en esta etapa; los simuladores y el endpoint son públicos
          RAZÓN: El prospecto no quiere crearse una cuenta para simular; reduce fricción en eventos

[2026-08] DECISIÓN: El origen del lead (evento/vendedor) es el dato clave de tracking, no un usuario
          RAZÓN: Permite medir el rendimiento de cada canal sin sistema de cuentas

[2026-08] DECISIÓN: Los simuladores son un único componente reutilizable entre landing y rutas de QR
          RAZÓN: No duplicar lógica; una sola fuente de verdad para cada simulador

[2026-08] DECISIÓN: Los cálculos financieros viven en funciones puras separadas de la UI
          RAZÓN: Testeables y reusables si mañana se necesita versión embebible (iframe) o API pública

[2026-08] DECISIÓN: El endpoint de leads usa SUPABASE_SERVICE_ROLE_KEY server-side y RLS permite solo INSERT a anon
          RAZÓN: Sin auth, el endpoint es público por diseño; RLS limita lo que el mundo puede hacer con la tabla

[2026-08] DECISIÓN: La UI de los simuladores usa estado local (sliders) en vez de React Hook Form
          RAZÓN: Bundle liviano para uso mobile en eventos; la validación fuerte ocurre en el endpoint con Zod

[2026-08] DECISIÓN: pnpm como package manager
          RAZÓN: Velocidad de instalación, lockfile determinístico; reemplaza al npm inicial del scaffold

[2026-08] DECISIÓN: SEO por página con Metadata API (title 50-60, description 135-160, canonical sin query params)
          RAZÓN: Evita contenido duplicado por los query params de tracking y mejora el CTR en Google

[2026-08] DECISIÓN: Google Analytics 4 vía @next/third-parties (gtag.js), activo solo si NEXT_PUBLIC_GA_ID está seteada
          RAZÓN: Carga post-hydration (no bloquea el render); se puede habilitar/deshabilitar por entorno

[2026-08] DECISIÓN: Todos los agentes tienen solo permiso de lectura
          RAZÓN: Las modificaciones las aprueba y ejecuta el humano
```

## 10. CONVENCIONES DE CÓDIGO

- TypeScript strict mode: sin `any`, sin `@ts-ignore` sin justificación
- Server Components por defecto; `"use client"` solo cuando sea estrictamente necesario (simuladores)
- Páginas: los `searchParams` se leen en el Server Component (es una `Promise` que se await) y se pasan al componente
- Simuladores: un componente reutilizable por tipo, consumido por la landing y por las rutas dedicadas; nunca duplicar la lógica
- Cálculos: toda la matemática financiera en `lib/calculos.ts` como funciones puras, sin tocar la UI
- Validación: todo payload que llega a la DB pasa por los schemas de `lib/validations/leads.ts`
- Estilos: solo utilidades de Tailwind; theme en `globals.css` vía `@theme`; sin valores hardcodeados de color
- Componentes: un archivo por componente; máximo 150 líneas; si supera, dividir
- Errores: capturar siempre; nunca exponer mensajes técnicos de DB al frontend
- Mobile-first real: un simulador por pantalla, tap-targets grandes, bundle liviano

## 11. FUERA DEL ALCANCE DEL MVP

- Autenticación / registro de usuarios
- Flujo real de solicitud de lendar.com.ar
- Modo iframe/embed
- Variantes de landing por evento (futuro: `/eventos/[slug]`)
- Panel de administración de leads
- Notificaciones por email
- Pagos o integración bancaria
