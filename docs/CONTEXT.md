# CONTEXT — Lendar

> **Estado: Etapa de simuladores en progreso (2026-08-21)**
> Design system, sitio (Navbar/Footer/contacto) y simulador de préstamo implementados.

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
[x] Design system: paleta de colores (teal/violet) y tipografía (Plus Jakarta Sans + Roboto Serif)
[x] Componentes base: Navbar, Footer, CTAButton (con variante solid/outline)
[x] Página de contacto (/contacto) con formulario y sección "Lugares de firma"
[x] Simulador de préstamo (/simulador-prestamos): UI, cálculo puro y contacto post-simulador
[ ] Landing principal (pendiente)
[ ] Simulador de inversión
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
| react-icons | ^5.7 | Iconos de redes sociales (Font Awesome) |
| Supabase | latest | Solo Postgres; sin Auth en esta etapa |
| Vercel | — | Deploy; preview por PR |
| GitHub | — | Versionado, flujo por PR |
| pnpm | 10 | Package manager |

## 4. DESIGN SYSTEM

### 4.1 Fuentes

| Token | Fuente | Props |
|---|---|---|
| `--font-sans` | Plus Jakarta Sans | Pesos 200-800, variable |
| `--font-serif` | Roboto Serif | Variable (4 ejes: weight, width, opsz, grade) |

### 4.2 Colores de marca

| Token | Valor | Uso |
|---|---|---|
| `teal` | #55c3c4 | Primario / solicitante |
| `teal-light` | #e8f8f8 | Fondos suaves |
| `teal-lighter` | #c8eeee | Fondos muy suaves |
| `teal-dark` | #3eaaab | Hover |
| `violet` | #6f659d | Secundario / inversor |
| `violet-light` | #f0eef8 | Fondos suaves |
| `violet-lighter` | #d8d5f0 | Fondos muy suaves |
| `violet-dark` | #5a5280 | Hover |

### 4.3 Tokens semánticos

| Token | Alias |
|---|---|
| `solicitante` | `teal` |
| `solicitante-light` | `teal-light` |
| `solicitante-dark` | `teal-dark` |
| `inversor` | `violet` |
| `inversor-light` | `violet-light` |
| `inversor-dark` | `violet-dark` |

### 4.4 Neutros

| Token | Valor | Uso |
|---|---|---|
| `background` | #f4f5f7 | Fondo de página |
| `surface` | #ffffff | Superficies, cards |
| `border` | #e4e6ea | Bordes |
| `text` | #1a1d23 | Texto primario |
| `text-secondary` | #374151 | Texto secundario |
| `text-muted` | #6b7280 | Texto atenuado |
| `text-light` | #9ca3af | Texto muy leve |

## 5. VARIABLES DE ENTORNO

```
NEXT_PUBLIC_SUPABASE_URL          → público
NEXT_PUBLIC_SUPABASE_ANON_KEY     → público (reservado para uso futuro en cliente)
SUPABASE_SERVICE_ROLE_KEY         → server-only ⚠️
```

## 6. ARQUITECTURA Y ESTRUCTURA DE ARCHIVOS

```
src/
├── app/
│   ├── globals.css               → Theme de Tailwind (colores, fuentes)
│   ├── layout.tsx                → Layout global (Navbar + main + Footer)
│   ├── page.tsx                  → Landing principal (placeholder)
│   ├── contacto/
│   │   └── page.tsx              → Página de contacto
│   ├── simulador-prestamos/
│   │   └── page.tsx              → Página del simulador de préstamo
│   └── api/                      → (vacío, listo para endpoints)
├── components/
│   ├── site/                     → Componentes del sitio
│   │   ├── Navbar.tsx            → Navegación superior sticky
│   │   ├── Footer.tsx            → Pie de página con redes sociales
│   │   ├── CTAButton.tsx         → Botón CTA (variantes solid/outline)
│   │   ├── ContactoHero.tsx      → Columna izquierda de contacto
│   │   ├── ContactoForm.tsx      → Formulario de contacto
│   │   └── LugaresFirma.tsx      → Grid de cards de escribanías
│   ├── simuladores/              → Componentes del simulador de préstamo
│   │   ├── SimuladorPrestamo.tsx → UI principal (Client Component)
│   │   ├── TablaAmortizacion.tsx → Tabla mes a mes expandible (<details>)
│   │   └── ContactoPostSimulador.tsx → Formulario de contacto post-cuota (UI-only)
│   └── ui/                       → Primitivos genéricos (tokens neutros)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Field.tsx
│       ├── Input.tsx
│       └── Slider.tsx            → Extensible vía props accent/className
├── lib/
│   ├── supabase.ts               → Cliente server (service role)
│   └── calculos.ts               → Funciones financieras puras + constantes de negocio
├── types/
│   └── simulador.ts              → Tipos compartidos del simulador
└── public/
    ├── brand/                    → Logos y favicon
    │   ├── isologo-lendar.svg
    │   ├── isologo-lendar.png
    │   ├── lendar-favicon.svg
    │   └── lendar-favicon.png
    └── miscellaneous/
        └── bg-shape-v29.png      → Imagen de fondo para hero de contacto
supabase/
│   └── migrations/               → (vacío)
agents/                           → Subagentes del proyecto
docs/                             → PRD.md, CONTEXT.md y plan del simulador
```

## 7. COMPONENTES DEL SITIO

### 7.1 CTAButton (`components/site/CTAButton.tsx`)

Botón reutilizable con dos variantes:

| Variante | Estilo | Hover |
|---|---|---|
| `solid` (default) | `bg-teal text-white` | `hover:bg-teal-dark` |
| `outline` | `border-2 border-violet-dark text-violet-dark` | `hover:bg-violet-dark hover:text-white` |

Uso: `<CTAButton>Contacto</CTAButton>` o `<CTAButton variant="outline">Contactar</CTAButton>`

### 7.2 Navbar (`components/site/Navbar.tsx`)

- Sticky top, `z-50`, fondo `bg-surface`
- Logo izquierda (isologo-lendar.svg)
- CTA "Contacto" derecha → link a `/contacto`
- Links de secciones: placeholder (pendiente)

### 7.3 Footer (`components/site/Footer.tsx`)

- Logo + disclaimer legal
- Redes sociales: LinkedIn, Instagram (react-icons/fa)
- Copyright 2026 Lendar ® + crédito PERRO Agency

### 7.4 ContactoHero (`components/site/ContactoHero.tsx`)

- Columna izquierda de la página de contacto
- Imagen de fondo (`bg-shape-v29.png`) con overlay `violet-dark/80`
- Título "Contactate" (font-serif)
- Datos de contacto: Préstamos e Inversiones (whatsapp + email)
- Link scroll a "Lugares de firma Litoral"

### 7.5 ContactoForm (`components/site/ContactoForm.tsx`)

- Client Component (`"use client"`)
- Campos: nombre, apellido, email, mensaje (textarea), motivo (select nativo)
- Select motivos: préstamo, inversión, agente, institucional, prensa
- Validación cliente (requeridos + email formato)
- Al enviar: muestra confirmación "¡Gracias!"
- **Sin conexión a backend** (preparado para conectar POST después)

### 7.6 LugaresFirma (`components/site/LugaresFirma.tsx`)

- Grid responsive de cards (1 col → 2 md → 3 lg)
- 5 escribanías del Litoral (data hardcodeada)
- Cada card: zona, escribanía, dirección, oficinas RE/MAX, CTA outline "Contactar"

### 7.7 SimuladorPrestamo (`components/simuladores/SimuladorPrestamo.tsx`)

- Client Component (~135 líneas); compone Card, Field y Slider con tokens `solicitante`
- Inputs:
  - Valor real de propiedad a hipotecar: slider USD 30.000–500.000, step 5.000 (default 100.000)
  - Monto solicitado: slider min USD 10.000, max dinámico = 35% del valor de la propiedad, step 1.000 (default 35.000); se clampea si baja la propiedad
  - Plazo de devolución: 5 botones con TNA visible (9,5% / 10,5% / 11,5% / 12,5% / 13,5%; default 3 años)
  - Checkbox "Vivienda única y permanente": sin efecto en el cálculo (TODO Lendar)
- Card de resultado: cuota mensual estimada grande (capital + interés) + línea informativa de comisión inicial e IVA

### 7.8 TablaAmortizacion (`components/simuladores/TablaAmortizacion.tsx`)

- Acordeón nativo `<details>/<summary>`, sin JS extra
- Columnas: N°, amortización, interés, IVA, cuota total, saldo (post-cuota; última fila cierra en 0)
- Scroll horizontal en mobile, números tabulares con formatUSD

### 7.9 ContactoPostSimulador (`components/simuladores/ContactoPostSimulador.tsx`)

- Client Component debajo del resultado (antes de la tabla)
- Formulario: Nombre / Email / Teléfono (primitivos Field + Input)
- Validación cliente: nombre requerido; email o teléfono al menos uno, formato validado si vienen completos
- Submit sin backend: confirmación "¡Listo! Un asesor te va a contactar a la brevedad."
- `handleContactoSubmit` aislado: conectar POST /api/leads será un cambio acotado a esa función

### 7.10 Lógica de cálculo (`lib/calculos.ts`)

Funciones puras sin dependencias de UI; única fuente de verdad financiera.

| Constante | Valor | Nota |
|---|---|---|
| `COMISION_INICIAL_PCT` | 0.05 | Informativa, no afecta la cuota |
| `IVA_PCT` | 0.21 | TODO: confirmar concepto gravado con Lendar |
| `MONTO_MINIMO_USD` | 10000 | Mínimo de préstamo |
| `PORCENTAJE_MAXIMO_PROPIEDAD` | 0.35 | Tope monto / valor propiedad |
| `PLAZOS` | [{anios, tna} × 5] | Única fuente de tasas por plazo |

Funciones: `formatUSD` (Intl es-AR, USD sin decimales), `calcularCuotaPrestamo` (amortización francesa), `calcularAmortizacionPrestamo` (tabla mes a mes con cierre exacto), `calcularMontoMaximo`, `calcularComisionInicial`. Tipos compartidos en `types/simulador.ts`.

## 8. PÁGINAS EXISTENTES

| Ruta | Descripción |
|---|---|
| `/` | Landing principal (placeholder) |
| `/contacto` | Página de contacto con formulario y lugares de firma |
| `/simulador-prestamos` | Simulador de préstamo hipotecario |

## 9. DECISIONES TÉCNICAS Y DE PRODUCTO

```
[2026-08] DECISIÓN: Reset del proyecto a base mínima
          RAZÓN: Se adelantó la implementación sin tener clara la etapa 1. Se resetea para avanzar etapa por etapa.

[2026-08] DECISIÓN: Design system con tokens semánticos (solicitante/inversor)
          RAZÓN: Permite cambiar colores de marca sin modificar componentes; preparado para dualidad de audiencia.

[2026-08] DECISIÓN: Plus Jakarta Sans (sans) + Roboto Serif (serif) como fuentes de marca
          RAZÓN: Plus Jakarta Sans para UI y texto general; Roboto Serif para títulos y editorial.

[2026-08] DECISIÓN: Componentes site separados de ui/
          RAZÓN: Los componentes site son específicos del sitio (Navbar, Footer, etc.); ui/ contiene primitivos genéricos reutilizables.

[2026-08] DECISIÓN: CTAButton con variantes solid/outline
          RAZÓN: Un solo componente reutilizable para diferentes contextos (CTA principal, acciones secundarias).

[2026-08] DECISIÓN: react-icons/fa para iconos de redes sociales
          RAZÓN: lucide-react no tiene iconos de marcas; react-icons tiene todos los iconos de Font Awesome.

[2026-08] DECISIÓN: Formulario de contacto sin backend en esta etapa
          RAZÓN: El formulario se conectará a Supabase en una etapa aparte; por ahora solo muestra confirmación.

[2026-08] DECISIÓN: Select nativo para "Motivo del contacto"
          RAZÓN: Más ligero que un combobox con búsqueda; 5 opciones simples no justifican una librería externa.

[2026-08] DECISIÓN: pnpm como package manager
          RAZÓN: Velocidad de instalación, lockfile determinístico.

[2026-08] DECISIÓN: Todos los agentes tienen solo permiso de lectura
          RAZÓN: Las modificaciones las aprueba y ejecuta el humano.

[2026-08] DECISIÓN: Lógica financiera en funciones puras con constantes exportadas (lib/calculos.ts)
          RAZÓN: Única fuente de verdad, reutilizable para el simulador de inversión y testeable sin UI.

[2026-08] DECISIÓN: Simulador dividido en SimuladorPrestamo + TablaAmortizacion + ContactoPostSimulador
          RAZÓN: Respetar el máximo de 150 líneas por componente y permitir reuso de la tabla.

[2026-08] DECISIÓN: Normalizar primitivos ui/ a tokens neutros y extender Slider con prop accent
          RAZÓN: Los primitivos usaban zinc-* fuera del design system; ahora cada contexto pasa su accent (accent-solicitante).

[2026-08] DECISIÓN: Contacto post-simulador como formulario Nombre/Email/Teléfono UI-only
          RAZÓN: Captura directa de datos en eventos; el submit queda aislado para conectar /api/leads después.

[2026-08] DECISIÓN: Rangos de sliders: propiedad 30k–500k step 5k; monto min 10k con max dinámico 35%
          RAZÓN: El mínimo de propiedad garantiza que el 35% ≥ mínimo del préstamo y elimina el edge case max < min.

[2026-08] PENDIENTE: Efecto de "vivienda única y permanente", concepto gravado por el IVA y tratamiento de la comisión inicial
          RAZÓN: No inventar reglas de negocio; quedaron como TODO en código a confirmar con Lendar.
```

## 10. CONVENCIONES DE CÓDIGO

- TypeScript strict mode: sin `any`, sin `@ts-ignore` sin justificación
- Server Components por defecto; `"use client"` solo cuando sea estrictamente necesario (formularios con estado)
- Estilos: solo utilidades de Tailwind; theme en `globals.css` vía `@theme`; sin valores hardcodeados de color
- Componentes: un archivo por componente; máximo 150 líneas; si supera, dividir
- Errores: capturar siempre; nunca exponer mensajes técnicos de DB al frontend
- Export nombrado para componentes (no default export)

## 11. FUERA DEL ALCANCE DEL MVP

- Autenticación / registro de usuarios
- Flujo real de solicitud de lendar.com.ar
- Modo iframe/embed
- Variantes de landing por evento (futuro: `/eventos/[slug]`)
- Panel de administración de leads
- Notificaciones por email
- Pagos o integración bancaria
