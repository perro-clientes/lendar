# Lendar — Product Requirements Document

> ⚠️ **DOCUMENTO DESACTUALIZADO — 2026-08-17**
> Este PRD refleja la etapa de MVP que fue reseteada. El proyecto fue reseteado a su base mínima.
> Se reescribirá cuando se defina la etapa 1. Ver `docs/CONTEXT.md` para el estado actual.

Cliente: Lendar (red RE/MAX Argentina)
Proyecto: Plataforma de préstamos hipotecarios P2P — etapa de simulación y captura de leads
Versión: 0.1 — 2026-08-14
Estado: **DESESTIMADO** — Reset a base mínima (2026-08-17)

---

## 1. CONTEXTO DEL PROYECTO

El problema:
- Acceder a un crédito hipotecario en Argentina pasa casi siempre por un banco: trámites largos, requisitos rígidos y tasas poco transparentes
- Hay capital ocioso buscando rendimiento que no encuentra una vía simple y segura para financiar hipotecas
- Los clientes de la red RE/MAX no tienen una alternativa de financiación colaborativa, sin intermediario bancario

Origen: Lendar es cliente de la agencia. Se arranca con una etapa chica: landing pages con herramientas de simulación (préstamo e inversión) para usar en eventos y muestras presenciales.

Mercado objetivo: Argentina, clientes de la red RE/MAX Argentina.

Diferencial clave: finanzas colaborativas (P2P) sin bancos, con origen de lead rastreable por evento/vendedor.

Contexto de uso real: un vendedor comparte un link/QR, el prospecto simula desde su celular en el momento, y el resultado queda registrado como lead con su origen.

## 2. OBJETIVOS DEL PRODUCTO

### 2.1 Objetivos principales
- Generar leads calificados a partir de la simulación de préstamo e inversión
- Dar al vendedor una herramienta simple de captura en eventos presenciales (link/QR)
- Registrar siempre el origen del lead (evento y/o vendedor) para medir la performance de cada canal
- Sentar la base de datos y lógica que el producto pueda reusar cuando escale al flujo real de lendar.com.ar

### 2.2 Indicadores de éxito de esta etapa
- Simulaciones completadas por evento: definido junto al cliente por evento
- Leads con datos de contacto: % del total de simulaciones
- Leads con origen (evento/vendedor) correctamente registrado: 100%
- Conversión de simulación a contacto dejado: medible por evento/vendedor

## 3. ALCANCE DEL MVP

### 3.1 Incluye

| Feature | Rol | Estado |
|---|---|---|
| Landing one-pager (`/`) | Ambos | [x] Implementada |
| Simulador de préstamo | Solicitante | [x] Implementado |
| Simulador de inversión | Inversor | [x] Implementado |
| Ruta dedicada `/simular-prestamo` (destino de QR) | Solicitante | [x] Implementada |
| Ruta dedicada `/simular-inversion` (destino de QR) | Inversor | [x] Implementada |
| Tracking por query params (`evento`, `vendedor`) | Sistema | [x] Implementado |
| Registro de leads en Supabase (`/api/leads`) | Sistema | [x] Implementado |
| Cálculo financiero en funciones puras (`lib/calculos.ts`) | Sistema | [x] Implementado |
| Validación de payload con Zod | Sistema | [x] Implementado |

### 3.2 Fuera de alcance del MVP
- Autenticación y registro de usuarios (no hay login en esta etapa)
- Flujo real de solicitud/simulación de lendar.com.ar
- Modo iframe/embed
- Variantes de landing por evento (se nombran de forma consistente pero no se scaffoldan)
- Panel de administración de leads
- Notificaciones por email
- Pagos o integración bancaria

## 4. MODELO OPERATIVO

El identificador central del lead es su origen (evento/vendedor), no el usuario:
- No existe cuenta de usuario: el prospecto entra directo al simulador desde el celular
- El vendedor arma un link/QR con `?evento=` y `?vendedor=` sin configuración extra
- Cada simulación se guarda con su origen y se puede medir el rendimiento de cada canal

Flujo de valor:
```
Vendedor genera link/QR con evento y vendedor
                      ↓
Prospecto abre el link desde el celular (rutas dedicadas)
                      ↓
Simula con sliders (cálculo local con lib/calculos.ts)
                      ↓
Completa contacto (opcional) y registra la simulación
                      ↓
POST /api/leads valida con Zod y guarda en Supabase
                      ↓
Lead con tipo, inputs, resultado, contacto y origen
```

## 5. ROLES DEL SISTEMA

### 5.1 Solicitante de crédito
Perfil: cliente de la red RE/MAX que quiere financiar la compra de una propiedad. Sin cuenta, entra desde link/QR.
Motivación inmediata: ver la cuota mensual con una simulación rápida desde el celular.
Motivación diferida: dejar sus datos para que un asesor lo contacte.
Acciones: simular préstamo (monto, plazo, tasa); ver cuota, total de intereses y costo total; dejar contacto (opcional).
Restricciones: sin panel, sin acceso a datos de otros leads.

### 5.2 Inversor
Perfil: persona con capital que busca rendimiento financiando hipotecas. Sin cuenta.
Motivación inmediata: ver cuánto puede llegar a ganar.
Motivación diferida: dejar sus datos para opciones de inversión.
Acciones: simular inversión (capital inicial, aporte mensual, plazo, tasa); ver monto final, total aportado e intereses; dejar contacto (opcional).
Restricciones: sin panel, sin acceso a datos de otros.

### 5.3 Vendedor RE/MAX (actor externo)
Perfil: vendedor que usa la herramienta en eventos y muestras presenciales. No accede al sistema.
Acciones: compartir link/QR con query params `evento` y `vendedor`.
Restricciones: su identidad viaja en los query params de los links que comparte.

## 6. FUNCIONALIDADES DETALLADAS

### 6.1 Landing one-pager (`/`)
- Muestra ambos simuladores en una sola página, sin duplicar lógica
- Preparado para un futuro toggle solicitante/inversor

### 6.2 Simulador de préstamo
- Inputs por slider: monto, plazo (años), tasa anual
- Constantes de negocio: `COMISION_INICIAL_PCT` (1.5%) e `IVA_PCT` (21%)
- Cálculo: amortización francesa en `lib/calculos.ts`
- Resultado: cuota mensual, total intereses, costo total (cuotas + comisión + IVA)
- Contacto opcional (nombre, teléfono, email)

### 6.3 Simulador de inversión
- Inputs por slider: capital inicial, aporte mensual, plazo (años), tasa anual
- Cálculo: interés compuesto mensual en `lib/calculos.ts`
- Resultado: total aportado, intereses ganados, monto final
- Contacto opcional

### 6.4 Rutas dedicadas de QR
- `/simular-prestamo` y `/simular-inversion`
- Capturan `evento` y `vendedor` de `searchParams` en el Server Component y los pasan al simulador como `tracking`

### 6.5 Endpoint de leads (`/api/leads`)
- `POST` público por diseño (los simuladores no tienen auth)
- Valida payload con schema Zod (`lib/validations/leads.ts`)
- Inserta con cliente server (service role, server-only)
- Respuestas: `201` ok, `400` datos inválidos, `500` error al guardar
- Nunca expone mensajes técnicos al frontend

## 7. ARQUITECTURA DEL SISTEMA

### 7.1 Stack tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| Framework | Next.js 16 (App Router) | Rutas, API route, Server/Client Components |
| Lenguaje | TypeScript | Strict mode |
| Base de datos | Supabase (PostgreSQL) | Solo Postgres para leads; sin Auth |
| Estilos | Tailwind CSS v4 | Theme vía `@theme` en CSS |
| Validación | Zod | Schemas de payload |
| Cliente DB | @supabase/supabase-js | Cliente server (service role) |
| Deploy | Vercel | CI/CD desde GitHub, preview por PR |
| Versionado | GitHub | Flujo por PR |

### 7.2 Modelo de datos

```
public.leads
├── id          uuid PK (gen_random_uuid)
├── tipo        text CHECK in ('prestamo', 'inversion')
├── inputs      jsonb
├── resultado   jsonb
├── contacto    jsonb nullable
├── evento      text nullable
├── vendedor    text nullable
└── created_at  timestamptz default now()
```

### 7.3 Estructura de rutas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing con ambos simuladores |
| `/simular-prestamo` | Público | Simulador de préstamo (destino de QR) |
| `/simular-inversion` | Público | Simulador de inversión (destino de QR) |
| `/api/leads` | Público (POST) | Guarda simulación/lead |

### 7.4 Seguridad y acceso

- Sin autenticación: simuladores y endpoint públicos por diseño (decisión documentada)
- El endpoint usa `SUPABASE_SERVICE_ROLE_KEY` solo server-side
- RLS habilitado en `leads`; `anon` solo puede INSERT
- Variables validadas al inicio en `lib/env.ts`
- Todo payload que llega a la DB pasa por schema Zod

## 8. FLUJOS DE USUARIO DETALLADOS

### Flujo A: Prospecto simula un préstamo desde un QR

```
1. Vendedor genera link /simular-prestamo?evento=expo-2026&vendedor=juan-perez
2. Prospecto abre el link desde el celular
3. El Server Component lee searchParams y pasa { evento, vendedor } al simulador
4. Prospecto ajusta sliders (monto, plazo, tasa)
5. El resultado se calcula en el cliente con lib/calculos.ts
6. Prospecto completa contacto (opcional) y registra
7. POST /api/leads valida el payload con Zod
8. El endpoint inserta en la tabla leads con service role key
9. El simulador muestra confirmación
```

Servicios consumidos: Supabase DB (insert vía API route)

### Flujo B: Prospecto simula una inversión desde la landing

```
1. Prospecto llega a la landing /
2. Ajusta sliders (capital inicial, aporte mensual, plazo, tasa)
3. Se calcula el valor futuro con lib/calculos.ts
4. Completa contacto (opcional) y registra la simulación
5. POST /api/leads (sin evento/vendedor si no venía en la URL)
6. Confirmación en pantalla
```

Servicios consumidos: Supabase DB (insert vía API route)

## 9. REGLAS DE NEGOCIO

1. Los simuladores son un único componente reutilizable (landing y rutas dedicadas)
2. Los cálculos financieros son funciones puras en `lib/calculos.ts`
3. El origen se captura al cargar la página y se guarda junto con la simulación
4. El contacto es opcional: sin nombre no se guarda el bloque `contacto`
5. Todo lo que entra a la DB pasa por Zod antes de tocar Supabase
6. Mobile-first real: un simulador por pantalla, tap-targets grandes, bundle liviano
7. Rangos de inputs definidos por slider y revalidados en el endpoint
8. Nombrado consistente de rutas de evento si mañana hay variantes

## 10. SUPUESTOS Y RESTRICCIONES

Supuestos:
- El uso real es 100% desde celular en contexto de evento (señal puede ser mala → bundle liviano)
- El vendedor comparte links/QR con los query params correctos
- No hace falta login: el prospecto no quiere crearse una cuenta para simular
- Tasa, comisión e IVA son constantes de negocio definidas por Lendar (configurables en el código)

Restricciones:
- Sin autenticación en esta etapa
- Sin modo iframe/embed
- Sin panel de leads
- Un solo simulador por pantalla

## 11. ROADMAP EVOLUTIVO

- **Corto plazo:** Toggle solicitante/inversor en la landing
- **Corto plazo:** Variantes de landing por evento (`/eventos/[slug]`)
- **Corto plazo:** Panel mínimo de consulta de leads por evento/vendedor
- **Mediano plazo:** Versión embebible (iframe) de los simuladores
- **Mediano plazo:** Integración con el flujo real de registro/simulación de lendar.com.ar
- **Largo plazo:** Cuentas de usuario (auth) para solicitantes e inversores
- **Largo plazo:** Proceso de solicitud de crédito e inversión real

## 12. GLOSARIO

| Término | Definición |
|---|---|
| Solicitante | Persona que simula un préstamo hipotecario |
| Inversor | Persona que simula una inversión para financiar hipotecas |
| Lead | Registro de una simulación (con o sin contacto) en la tabla `leads` |
| Simulador | Componente reutilizable que calcula el resultado de préstamo/inversión |
| Amortización francesa | Sistema de cuota fija donde cada cuota paga intereses y capital |
| Costo total | Cuotas pagadas + comisión inicial + IVA de la comisión |
| Valor futuro | Monto final de una inversión con interés compuesto mensual |
| Tracking | Conjunto `evento`/`vendedor` que identifica el origen del lead |
| RLS | Row Level Security — mecanismo de Supabase para controlar acceso a filas |
