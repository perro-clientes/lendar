# CONTEXT — Lendar

> **Estado: Landings de audiencia completas (2026-08-24)**
> Design system, sitio (Navbar/Footer/contacto/home), landing de préstamos completa (marco legal, requisitos, proceso, beneficios, simulador + costos y honorarios, banner) y landing de inversiones.

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
[x] Componentes base: Navbar (con links + mobile menu), Footer, CTAButton (5 variantes + prop accent)
[x] Página de contacto (/contacto) con formulario y sección "Lugares de firma"
[x] Home con hero y CTAs por audiencia
[x] Simulador de préstamo: UI, cálculo puro, bloque Costos y Honorarios, contacto post-simulador
[x] Simulador de inversión: UI, cálculo puro y contacto post-simulador
[x] Landing /pedi-tu-prestamo completa: Hero → MarcoLegal → Requisitos → Proceso → Beneficios → Simulador → Banner
[x] Landing /inverti-en-lendar completa: Hero → MarcoLegal → Proceso → Simulador → Banner
[ ] Contenido adicional del home (más allá del hero)
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
| lucide-react | ^1.33 | Iconos outline (checks, proceso, beneficios, costos, menú) |
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

### 4.5 Criterios transversales

- **Títulos de sección**: siempre `font-serif` (Roboto Serif), bold, escala `text-3xl md:text-5xl` — criterio confirmado por diseño aunque alguna referencia pida sans.
- **Acentos como neutros de diferenciación**: dentro de la landing de préstamos, teal/violeta se usan alternados para distinguir categorías (card del inmueble en Requisitos, cards de Beneficios, header de Costos y Honorarios) **sin** referencia a la audiencia Inversor — patrón confirmado con el cliente.
- **CTA de landings sobre fondos de color**: primario = relleno blanco + texto `{accent}-dark`, hover `{accent}-light`; secundario outline = borde blanco + hover con relleno blanco y texto `{accent}-dark`. Las variantes `-white` de CTAButton replican exactamente estas animaciones.

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
│   ├── simulador-inversion/
│   │   └── page.tsx              → Página del simulador de inversión (destino de QR)
│   └── api/                      → (vacío, listo para endpoints)
├── components/
│   ├── site/                     → Componentes del sitio
│   │   ├── Navbar.tsx            → Navegación superior sticky
│   │   ├── NavLinks.tsx          → Links Préstamos/Inversiones con estado activo (Client)
│   │   ├── MobileMenu.tsx        → Menú hamburguesa mobile (Client)
│   │   ├── Footer.tsx            → Pie de página con redes sociales
│   │   ├── CTAButton.tsx         → Botón CTA (5 variantes + prop accent para variantes white)
│   │   ├── Hero.tsx              → Hero del home (degradé teal→violet, CTAs por audiencia)
│   │   ├── HeroSolicitante.tsx   → Hero landing préstamos (fondo teal + imagen, CTAs a #simulador/#marco-legal)
│   │   ├── HeroInversor.tsx      → Hero landing inversiones (fondo violet + imagen, CTAs ancla)
│   │   ├── MarcoLegal.tsx        → Sección marco legal (prop accent; copy por audiencia; id="marco-legal")
│   │   ├── Requisitos.tsx        → Sección requisitos (2 cards: solicitante/inmueble) — solo landing préstamos
│   │   ├── Proceso.tsx           → Sección proceso sticky-scroll (prop accent; copy por audiencia)
│   │   ├── Beneficios.tsx        → Sección beneficios (4 cards, íconos lucide) — solo landing préstamos
│   │   ├── Banner.tsx            → Banner CTA final de landings (prop accent)
│   │   ├── ContactoHero.tsx      → Columna izquierda de contacto
│   │   ├── ContactoForm.tsx      → Formulario de contacto
│   │   └── LugaresFirma.tsx      → Grid de cards de escribanías
│   ├── simuladores/              → Componentes de los simuladores
│   │   ├── SimuladorPrestamo.tsx → UI principal préstamo (Client; prop mostrarContacto)
│   │   ├── SimuladorInversion.tsx → UI principal inversión (Client; prop mostrarContacto)
│   │   ├── CostosHonorarios.tsx  → Bloque costos del simulador de préstamo (comisión en vivo + escribanía)
│   │   ├── TablaAmortizacion.tsx → Tabla mes a mes préstamo (siempre visible, scroll interno)
│   │   ├── TablaAmortizacionInversion.tsx → Tabla mes a mes inversión (sin IVA)
│   │   └── CTAContacto.tsx       → Formulario contacto compartido (accent solicitante/inversor)
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

Botón reutilizable con cinco variantes; las `-white` aceptan prop `accent` (`solicitante` | `inversor`) y replican las animaciones de los CTAs de las landings:

| Variante | Estilo | Hover |
|---|---|---|
| `solid` (default) | `bg-teal text-white` | `hover:bg-teal-dark` |
| `outline` | `border-2 border-violet-dark text-violet-dark` | `hover:bg-violet-dark hover:text-white` |
| `solid-inversor` | `bg-inversor text-white` | `hover:bg-inversor-dark` |
| `solid-white` + accent | `bg-surface text-{accent}-dark` | `hover:bg-{accent}-light` |
| `outline-white` + accent | `border-2 border-surface text-surface` | `hover:bg-surface hover:text-{accent}-dark` |

### 7.2 Navbar (`components/site/Navbar.tsx`)

- Sticky top, `z-50`, fondo `bg-surface`
- Logo izquierda (isologo-lendar.svg)
- Links centrales: Préstamos (`/pedi-tu-prestamo`) e Inversiones (`/inverti-en-lendar`) con estado activo según ruta (`NavLinks`, Client Component)
- Menú hamburguesa en mobile (`MobileMenu`, Client Component)
- CTA "Contacto" derecha → link a `/contacto`

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

### 7.7 Hero del home (`components/site/Hero.tsx`)

- Sección con degradé teal→violet, título serif "Mejores préstamos, juntos"
- Dos CTAs por audiencia: "Quiero pedir un préstamo" (`solid-white` accent solicitante → `/pedi-tu-prestamo`) y "Quiero invertir en Lendar" (`outline-white` accent inversor → `/inverti-en-lendar`)
- El contenido adicional del home queda pendiente

### 7.8 Heroes de landing (`HeroSolicitante.tsx` / `HeroInversor.tsx`)

- Fondo de color (teal-dark / violet-dark) con imagen `bg-shape-v29.png` + overlay 80%
- CTA primario blanco → `#simulador`; secundario outline → `#marco-legal` (anchor provisto por MarcoLegal)
- Estructura idéntica entre ambas audiencias; cambia copy y tokens

### 7.9 MarcoLegal (`components/site/MarcoLegal.tsx`)

- Prop `accent` (default `inversor`); gradiente, badge e íconos toman `{accent}-light/dark`
- Copy por audiencia vía mapa interno ("Tu préstamo/inversión, protegido por ley"); los 4 ítems legales son compartidos
- `id="marco-legal"` + `scroll-mt-[77px]`: destino del CTA secundario de los heroes
- Grid 2/3 columnas: texto izquierda, lista con checks lucide derecha

### 7.10 Requisitos (`components/site/Requisitos.tsx`) — solo landing préstamos

- Badge píldora teal; título serif "¿Qué necesito para pedir un Lendar?"
- Grid `lg:grid-cols-2`: Card 1 "Información del solicitante" (tokens solicitante) y Card 2 "Información del inmueble" (tokens violeta como neutro de categorización)
- Cada card: círculo numerado (`{accent}-dark`), degradé sutil, borde fino; listas con bullets simples (no checks)

### 7.11 Proceso (`components/site/Proceso.tsx`) — ex ProcesoInversor

- Prop `accent`; copy por audiencia vía mapa interno (5 pasos con título/subtítulo/descripción cada uno)
- Layout sticky-scroll: intro 35% sticky + pasos apilados 65% con z incremental (efecto de superposición al scrollear)
- Badge teal para solicitante; badge neutro (`bg-border`) para inversor
- Círculos numerados y subtítulos de paso en `{accent}-dark`

### 7.12 Beneficios (`components/site/Beneficios.tsx`) — solo landing préstamos

- Badge píldora violeta (distinto al teal de Requisitos, según referencia); título serif; bajada
- Grid `1 → sm:grid-cols-2 → lg:grid-cols-4`
- Cards `bg-surface` + borde + sombra suave; ícono lucide (`Home`, `Shield`, `KeyRound`, `TrendingUp`) sobre contenedor cuadrado `{accent}-light`, ícono `{accent}-dark`
- Acentos alternados teal/violeta card por card como diferenciación neutra (patrón del sistema en esta landing)

### 7.13 Banner (`components/site/Banner.tsx`) — ex BannerInversor

- Prop `accent`; copy por audiencia vía mapa interno; CTA a `/contacto`
- Contenedor redondeado con fondo `{accent}` + imagen bg-shape, CTA blanco con hover `{accent}-light`

### 7.14 SimuladorPrestamo (`components/simuladores/SimuladorPrestamo.tsx`)

- Client Component (~145 líneas); compone Card, Field y Slider con tokens `solicitante`
- Prop `mostrarContacto` (default `true`): la ruta dedicada lo muestra con formulario; la landing lo oculta (usa Banner final)
- Inputs:
  - Valor real de propiedad a hipotecar: slider USD 30.000–500.000, step 5.000 (default 100.000)
  - Monto solicitado: slider min USD 10.000, max dinámico = 35% del valor de la propiedad, step 1.000 (default 35.000); se clampea si baja la propiedad
  - Plazo de devolución: 5 botones con TNA visible (9,5% / 10,5% / 11,5% / 12,5% / 13,5%; default 3 años)
  - Checkbox "Vivienda única y permanente": sin efecto en el cálculo (TODO Lendar)
- Card de resultado: cuota mensual estimada grande (capital + interés) + línea informativa de comisión inicial **con IVA** e IVA sobre intereses en tabla
- Debajo de la tabla: bloque CostosHonorarios (ver 7.19)

### 7.15 TablaAmortizacion (`components/simuladores/TablaAmortizacion.tsx`)

- Card siempre visible (sin acordeón): ocupa el 100% del alto de su contenedor en desktop (`flex-1` + `min-h-0`)
- Scroll interno vertical (mobile acotado a `max-h-80`), scroll horizontal por min-width de tabla
- Columnas: N°, amortización, interés, IVA, cuota total, saldo (post-cuota; última fila cierra en 0)
- Números tabulares con formatUSD

### 7.16 CTAContacto (`components/simuladores/CTAContacto.tsx`)

- Client Component compartido por ambos simuladores; prop `accent`: `solicitante` (default) | `inversor`
- Formulario: Nombre / Email / Teléfono (primitivos Field + Input); fondo y confirmación toman el token del accent
- Submit usa variante `solid-inversor` cuando accent es `inversor`; `solid` (teal) en caso contrario
- Validación cliente: nombre requerido; email o teléfono al menos uno, formato validado si vienen completos
- Submit sin backend: confirmación "¡Listo! Un asesor te va a contactar a la brevedad."
- `handleContactoSubmit` aislado: conectar POST /api/leads será un cambio acotado a esa función

### 7.17 SimuladorInversion (`components/simuladores/SimuladorInversion.tsx`)

- Client Component (~185 líneas); compone Card, Field y Slider con tokens `inversor`
- Componente reutilizable: vive en la landing `/inverti-en-lendar` (con `mostrarContacto={false}`) y en la ruta dedicada `/simulador-inversion`; nunca en el home
- Inputs:
  - Monto a invertir: slider USD 10.000–500.000, step 1.000 (default 10.000; máximo TODO confirmar con Lendar)
  - Plazo de inversión: mismo selector de 5 botones que préstamo, con TNA visible
  - Formato de entrega del capital: Efectivo ("Llevás el dinero en efectivo al momento de la firma.") / Transferencia (copy TODO confirmar)
  - Formato de cobro de la cuota: Efectivo / Transferencia (copy efectivo validado; transferencia TODO confirmar)
- Card de resultado: cobro mensual estimado grande + leyenda "Calculado mediante Sistema Francés directo en dólares billete."
- Bloque Costos: Comisión Lendar ({COMISION_INVERSOR_PCT}% del monto invertido) — "Se paga por única vez, en efectivo, el día de la firma en la escribanía."

### 7.18 TablaAmortizacionInversion (`components/simuladores/TablaAmortizacionInversion.tsx`)

- Igual comportamiento que TablaAmortizacion (siempre visible, alto completo, scroll interno)
- Columnas: N°, amortización, interés, cuota total, saldo — **sin columna IVA** (confirmado en diseño de referencia)

### 7.19 CostosHonorarios (`components/simuladores/CostosHonorarios.tsx`) — dentro del simulador de préstamo

- Server Component; recibe `montoSolicitado` y recalcula la comisión en vivo con cada movimiento del slider
- Header: ícono Calculator (lucide) + título h3 "Costos y honorarios" en violeta (neutro de diferenciación, según referencia)
- Grid `[35fr_65fr]` desktop, apilado mobile, `items-stretch` para igualar alturas
- Card 1 (violeta): degradé surface→violet-light, borde violet-lighter; título "Comisión Lendar"; línea principal "**5%** + IVA sobre {monto}" con números bold; nota itálica; box anidado blanco con "Comisión total con IVA" + monto calculado bold violet-dark
- Card 2 (teal): mismo esquema con tokens teal; título "Costos de escribanía"; filas label/valor (compra con financiamiento 3,25%–5%; hipoteca sola 3%–6,5%, valores bold en text neutro); disclaimer itálico de orientatividad
- Ubicación: full-width debajo de la tabla de cuotas, encima del formulario de contacto

### 7.20 Lógica de cálculo (`lib/calculos.ts`)

Funciones puras sin dependencias de UI; única fuente de verdad financiera.

| Constante | Valor | Nota |
|---|---|---|
| `COMISION_INICIAL_PCT` | 0.05 | Comisión Lendar del solicitante; se informa **con IVA incluido** (`calcularComisionInicial` devuelve base × 1,21) — confirmado con referencia |
| `IVA_PCT` | 0.21 | TODO: confirmar concepto gravado con Lendar |
| `MONTO_MINIMO_USD` | 10000 | Mínimo de préstamo e inversión |
| `PORCENTAJE_MAXIMO_PROPIEDAD` | 0.35 | Tope monto / valor propiedad |
| `COMISION_INVERSOR_PCT` | 0.015 | Comisión Lendar del inversor; TODO: escalón Gold (>40k) |
| `PLAZOS` | [{anios, tna} × 5] | Única fuente de tasas por plazo (compartida préstamo/inversión) |

Funciones: `formatUSD` (Intl es-AR, USD sin decimales), `calcularCuotaFrancesa` (helper privado compartido), `calcularCuotaPrestamo` y `calcularCobroInversion` (amortización francesa), `calcularAmortizacionPrestamo` (tabla con IVA) y `calcularAmortizacionInversion` (tabla sin IVA, cierre exacto en 0), `calcularMontoMaximo`, `calcularComisionInicial`, `calcularComisionInversor`. Tipos compartidos en `types/simulador.ts`.

## 8. PÁGINAS EXISTENTES

| Ruta | Descripción |
|---|---|
| `/` | Home con hero y CTAs por audiencia (contenido adicional pendiente) |
| `/contacto` | Página de contacto con formulario y lugares de firma |
| `/pedi-tu-prestamo` | Landing del solicitante: Hero → MarcoLegal → Requisitos → Proceso → Beneficios → Simulador → Banner |
| `/inverti-en-lendar` | Landing del inversor: Hero → MarcoLegal → Proceso → Simulador → Banner |
| `/simulador-prestamos` | Simulador de préstamo standalone (con contacto incluido) |
| `/simulador-inversion` | Simulador de inversión standalone (destino de QR; sin links en Navbar) |

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

[2026-08] PENDIENTE: Efecto de "vivienda única y permanente" y concepto gravado por el IVA en la tabla de cuotas
          RAZÓN: No inventar reglas de negocio; quedaron como TODO en código a confirmar con Lendar.

[2026-08] DECISIÓN: Simulador de inversión como componente reutilizable con ruta dedicada (/simulador-inversion)
          RAZÓN: El mismo componente vivirá en la futura landing /inversores; la ruta dedicada es destino de QR del vendedor. Sin links en Navbar/Footer: acceso solo por link directo o QR.

[2026-08] DECISIÓN: Fórmula de amortización francesa en helper privado compartido (calcularCuotaFrancesa)
          RAZÓN: Préstamo e inversión usan el mismo sistema; una sola fuente de verdad matemática con funciones públicas por dominio.

[2026-08] DECISIÓN: Tabla de inversión sin columna IVA
          RAZÓN: Confirmado en el diseño de referencia; solo la tabla de préstamo detalla IVA.

[2026-08] DECISIÓN: Tablas de cuotas siempre visibles ocupando el alto del contenedor con scroll interno
          RAZÓN: Reemplaza el acordeón <details>; evita interacción extra en eventos y muestra el detalle sin clicks.

[2026-08] DECISIÓN: CTA de contacto post-simulador unificado en CTAContacto con prop accent
          RAZÓN: Ambos simuladores convergieron al mismo formulario Nombre/Email/Teléfono; un solo componente elimina duplicación y centraliza la futura conexión a /api/leads.

[2026-08] DECISIÓN: Variante solid-inversor en CTAButton
          RAZÓN: El contexto inversor necesita un botón primario violeta manteniendo el patrón sólido.

[2026-08] PENDIENTE: Máximo de inversión (hoy USD 500k por universo de simuladores), copy exacto de transferencias y escalón Inversor Gold (>40k)
          RAZÓN: No inventar reglas de negocio; quedaron como TODO en código a confirmar con Lendar.

[2026-08-24] DECISIÓN: Variantes solid-white/outline-white de CTAButton con prop accent, replicando las animaciones hover de los CTAs de landings
          RAZÓN: El home usaba hovers distintos (gris plano / overlay translúcido); un solo lenguaje de CTA en todo el sitio.

[2026-08-24] DECISIÓN: Componentes compartidos de landing generalizados con prop accent + mapa de copy interno (MarcoLegal, Proceso, Banner) en lugar de duplicar por audiencia
          RAZÓN: Las landings de préstamos e inversiones comparten estructura; una sola fuente evita divergencia y respeta el máx. de 150 líneas.

[2026-08-24] DECISIÓN: Teal/violeta como colores neutros de diferenciación dentro de la landing de préstamos (card inmueble, beneficios alternados, header costos)
          RAZÓN: Confirmado con el cliente; distingue categorías sin aludir a la audiencia Inversor.

[2026-08-24] DECISIÓN: Títulos de sección siempre font-serif, aunque referencias puntuales pidan sans
          RAZÓN: Consistencia tipográfica del sitio (MarcoLegal, Proceso, Beneficios, simuladores ya usaban serif).

[2026-08-24] DECISIÓN: Bloque "Costos y honorarios" dentro del simulador de préstamo, full-width sobre el formulario, sin acordeón
          RAZÓN: La comisión se calcula en vivo con el monto simulado; el acordeón se descartó para evitar interacción extra en eventos.

[2026-08-24] DECISIÓN: Comisión Lendar informada con IVA incluido (5% base × 1,21) — resuelve parte del pendiente de tratamiento de comisión
          RAZÓN: Verificado contra referencia del cliente (127k → 7.684); card de resultado actualizado para mostrar la misma cifra.
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
