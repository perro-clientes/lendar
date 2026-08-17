# CONTEXT — Lendar

> **Estado: Pre-etapa 1 — Reset completado (2026-08-17)**
> El proyecto fue reseteado a su base mínima. No hay lógica de negocio, simuladores, ni captura de datos.

## 1. DESCRIPCIÓN DEL PRODUCTO

Lendar es una plataforma argentina de préstamos hipotecarios P2P, exclusiva para clientes de la red RE/MAX Argentina. Conecta solicitantes de crédito con inversores sin intermediación bancaria (finanzas colaborativas).

**Usuarios:**
- **Solicitante de crédito**: simula un préstamo hipotecario y deja sus datos (opcional).
- **Inversor**: simula una inversión que financia hipotecas y deja sus datos (opcional).
- **Vendedor RE/MAX** (actor externo): comparte links/QR con `?evento=` y `?vendedor=`; no accede al sistema.

## 2. ESTADO ACTUAL DEL PROYECTO

```
[x] Boilerplate de Next.js (App Router) funcionando
[x] Supabase instalado y configurado (cliente server en lib/supabase.ts)
[x] Variables de entorno de Supabase cargadas (.env.local y Vercel)
[ ] Contenido de landing (pendiente de definir etapa 1)
[ ] Simuladores
[ ] Endpoint de leads
[ ] Migración SQL
[ ] Google Analytics
```

## 3. STACK TECNOLÓGICO

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js (App Router) | 16.3 | Framework |
| TypeScript | ^5 | Strict mode |
| React | 19.2 | UI |
| Tailwind CSS | v4 | Utilities; theme vía `@theme` en `globals.css` |
| @supabase/supabase-js | latest | Cliente server (service role) |
| Supabase | latest | Solo Postgres; sin Auth en esta etapa |
| Vercel | — | Deploy; preview por PR |
| GitHub | — | Versionado, flujo por PR |
| pnpm | 10 | Package manager |

## 4. VARIABLES DE ENTORNO

```
NEXT_PUBLIC_SUPABASE_URL          → público
NEXT_PUBLIC_SUPABASE_ANON_KEY     → público (reservado para uso futuro en cliente)
SUPABASE_SERVICE_ROLE_KEY         → server-only ⚠️
```

## 5. ARQUITECTURA Y ESTRUCTURA DE ARCHIVOS

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                → Placeholder (sin contenido)
├── components/
│   └── ui/                     → Directorio vacío (listo para nuevos componentes)
├── lib/
│   └── supabase.ts             → Cliente server (service role)
supabase/
│   └── migrations/             → Directorio vacío (listo para migraciones)
agents/                         → Subagentes del proyecto
docs/                           → PRD.md y CONTEXT.md
```

## 6. VARIABLES DE ENTORNO REQUERIDAS

```
NEXT_PUBLIC_SUPABASE_URL          → público
NEXT_PUBLIC_SUPABASE_ANON_KEY     → público (reservado para uso futuro)
SUPABASE_SERVICE_ROLE_KEY         → server-only ⚠️
```

## 7. DECISIONES TÉCNICAS Y DE PRODUCTO

```
[2026-08] DECISIÓN: Reset del proyecto a base mínima
          RAZÓN: Se adelantó la implementación sin tener clara la etapa 1. Se resetea para avanzar etapa por etapa.

[2026-08] DECISIÓN: Supabase instalado pero sin uso todavía
          RAZÓN: Se va a necesitar para la etapa de leads, pero no se configura hasta que la etapa esté definida.

[2026-08] DECISIÓN: pnpm como package manager
          RAZÓN: Velocidad de instalación, lockfile determinístico.

[2026-08] DECISIÓN: Todos los agentes tienen solo permiso de lectura
          RAZÓN: Las modificaciones las aprueba y ejecuta el humano.
```

## 8. CONVENCIONES DE CÓDIGO

- TypeScript strict mode: sin `any`, sin `@ts-ignore` sin justificación
- Server Components por defecto; `"use client"` solo cuando sea estrictamente necesario
- Estilos: solo utilidades de Tailwind; theme en `globals.css` vía `@theme`; sin valores hardcodeados de color
- Componentes: un archivo por componente; máximo 150 líneas; si supera, dividir
- Errores: capturar siempre; nunca exponer mensajes técnicos de DB al frontend

## 9. FUERA DEL ALCANCE DEL MVP

- Autenticación / registro de usuarios
- Flujo real de solicitud de lendar.com.ar
- Modo iframe/embed
- Variantes de landing por evento (futuro: `/eventos/[slug]`)
- Panel de administración de leads
- Notificaciones por email
- Pagos o integración bancaria
