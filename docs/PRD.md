# Lendar — Product Requirements Document

> **Versión: 0.3 — 2026-08-21**
> Estado: Etapa de simuladores en progreso — design system, página de contacto y simulador de préstamo implementados.

Cliente: Lendar (red RE/MAX Argentina)
Proyecto: Plataforma de préstamos hipotecarios P2P

---

## 1. CONTEXTO DEL PROYECTO

**El problema:**
- Acceder a un crédito hipotecario en Argentina pasa casi siempre por un banco: trámites largos, requisitos rígidos y tasas poco transparentes
- Hay capital ocioso buscando rendimiento que no encuentra una vía simple y segura para financiar hipotecas
- Los clientes de la red RE/MAX no tienen una alternativa de financiación colaborativa, sin intermediario bancario

**Origen:** Lendar es cliente de la agencia. Se arranca con una etapa chica: sitio web con información y herramientas de simulación (préstamo e inversión) para usar en eventos y muestras presenciales.

**Mercado objetivo:** Argentina, clientes de la red RE/MAX Argentina.

**Diferencial clave:** Finanzas colaborativas (P2P) sin bancos, con origen de lead rastreable por evento/vendedor.

## 2. OBJETIVOS DEL PRODUCTO

### 2.1 Objetivos principales
- Dar a conocer la propuesta de valor de Lendar a clientes RE/MAX
- Generar leads calificados a partir de consultas y simulaciones
- Dar al vendedor una herramienta simple de captura en eventos presenciales (link/QR)
- Registrar siempre el origen del lead (evento y/o vendedor) para medir la performance de cada canal

### 2.2 Indicadores de éxito
- Consultas recibidas vía formulario de contacto
- Leads con datos de contacto: % del total de visitas
- Leads con origen (evento/vendedor) correctamente registrado: 100%
- Conversión de visita a contacto dejado: medible por evento/vendedor

## 3. ALCANCE ACTUAL

### 3.1 Implementado

| Feature | Estado |
|---|---|
| Design system (colores, tipografía, tokens) | [x] Implementado |
| Navbar con logo y CTA "Contacto" | [x] Implementado |
| Footer con redes sociales y copyright | [x] Implementado |
| CTAButton reutilizable (solid/outline) | [x] Implementado |
| Página de contacto (`/contacto`) | [x] Implementada |
| ContactoHero con imagen de fondo | [x] Implementado |
| ContactoForm con validación cliente | [x] Implementado |
| Lugares de firma (cards responsive) | [x] Implementado |
| Supabase configurado (sin uso) | [x] Listo |
| Simulador de préstamo (`SimuladorPrestamo` + subcomponentes) | [x] Implementado |
| Cálculo puro + constantes de negocio (`lib/calculos.ts`) | [x] Implementado |
| Ruta `/simulador-prestamos` | [x] Implementada |
| Contacto post-simulador (formulario, UI-only) | [x] Implementado |
| Primitivos ui/ normalizados a tokens neutros | [x] Implementado |

### 3.2 Pendiente

| Feature | Estado |
|---|---|
| Landing principal (`/`) | [ ] Pendiente |
| Simulador de inversión | [ ] Pendiente |
| Tracking por query params | [ ] Pendiente |
| Endpoint de leads (`/api/leads`) | [ ] Pendiente |
| Migración SQL de la tabla leads | [ ] Pendiente |
| Google Analytics | [ ] Pendiente |

### 3.3 Fuera de alcance

- Autenticación y registro de usuarios (no hay login en esta etapa)
- Flujo real de solicitud/simulación de lendar.com.ar
- Modo iframe/embed
- Variantes de landing por evento (se nombran de forma consistente pero no se scaffoldan)
- Panel de administración de leads
- Notificaciones por email
- Pagos o integración bancaria

## 4. MODELO OPERATIVO

El identificador central del lead es su origen (evento/vendedor), no el usuario:
- No existe cuenta de usuario: el prospecto entra directo al sitio desde el celular
- El vendedor arma un link/QR con `?evento=` y `?vendedor=` sin configuración extra
- Cada consulta/guardado se guarda con su origen y se puede medir el rendimiento de cada canal

**Flujo de valor (futuro):**
```
Vendedor genera link/QR con evento y vendedor
                      ↓
Prospecto abre el link desde el celular
                      ↓
Simula préstamo o inversión
                      ↓
Completa contacto (opcional) y registra
                      ↓
POST /api/leads guarda en Supabase
                      ↓
Lead con tipo, inputs, resultado, contacto y origen
```

## 5. ROLES DEL SISTEMA

### 5.1 Solicitante de crédito
**Perfil:** Cliente de la red RE/MAX que quiere financiar la compra de una propiedad. Sin cuenta, entra desde link/QR.
**Motivación inmediata:** Ver cuánto pagaría de cuota por mes con una simulación rápida desde el celular.
**Motivación diferida:** Dejar sus datos para que un asesor lo contacte con el préstamo real.

### 5.2 Inversor
**Perfil:** Persona con capital que busca un rendimiento financiando hipotecas. Sin cuenta.
**Motivación inmediata:** Ver cuánto puede llegar a ganar invirtiendo de forma mensual.
**Motivación diferida:** Dejar sus datos para que lo contacten con opciones de inversión.

### 5.3 Vendedor RE/MAX (actor externo)
**Perfil:** Vendedor de la red RE/MAX que usa la herramienta en eventos y muestras presenciales. No tiene acceso al sistema.
**Acciones:** Compartir link/QR con query params `evento` y `vendedor`.

## 6. FUNCIONALIDADES IMPLEMENTADAS

### 6.1 Página de contacto (`/contacto`)
- Layout dividido 50/50 (desktop) / apilado (mobile)
- Columna izquierda: imagen de fondo con overlay violet, título, datos de contacto
- Columna derecha: formulario con validación cliente
- Sección "Lugares de firma Litoral" con grid de cards responsive

### 6.2 Formulario de contacto
- Campos: nombre, apellido, email, mensaje (opcional), motivo (select)
- Motivos: préstamo, inversión, agente, institucional, prensa
- Validación cliente: requeridos + formato email
- Al enviar: muestra confirmación "¡Gracias!"
- **Sin conexión a backend** (preparado para conectar POST después)

### 6.3 Lugares de firma
- 5 escribanías del Litoral (data hardcodeada)
- Grid responsive: 1 col → 2 md → 3 lg
- Cada card: zona, escribanía, dirección, oficinas RE/MAX, CTA outline

### 6.4 Simulador de préstamo (`/simulador-prestamos`)

**Inputs:**
- Valor real de propiedad a hipotecar: slider USD 30.000–500.000, step 5.000
- Monto solicitado: slider min USD 10.000, max dinámico = 35% del valor de la propiedad, step 1.000 (se clampea si baja la propiedad)
- Plazo de devolución: 5 botones con TNA visible — 1 año (9,5%) · 2 años (10,5%) · 3 años (11,5%) · 4 años (12,5%) · 5 años (13,5%)
- Checkbox "Vivienda única y permanente": sin efecto en el cálculo (pendiente Lendar)

**Resultado:**
- Amortización francesa: cuota fija mensual (capital + interés) destacada en card
- Comisión inicial (5%) mostrada como línea informativa; IVA (21% sobre interés) detallado en la tabla
- Tabla mes a mes expandible: N° cuota, amortización, interés, IVA, cuota total, saldo post-cuota

**Contacto post-simulador (UI-only):**
- Formulario Nombre / Email / Teléfono debajo de la cuota, antes de la tabla
- Validación cliente: nombre requerido; email o teléfono al menos uno, formato validado
- Confirmación sin backend: "¡Listo! Un asesor te va a contactar a la brevedad."

## 7. ARQUITECTURA DEL SISTEMA

### 7.1 Stack tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| Framework | Next.js 16 (App Router) | Rutas, Server/Client Components |
| Lenguaje | TypeScript | Strict mode |
| Estilos | Tailwind CSS v4 | Theme vía `@theme` en CSS |
| Iconos | react-icons/fa | Iconos de redes sociales |
| Base de datos | Supabase (PostgreSQL) | Solo Postgres; sin Auth (preparado) |
| Deploy | Vercel | CI/CD desde GitHub, preview por PR |
| Versionado | GitHub | Flujo por PR |
| Package manager | pnpm 10 | Lockfile determinístico |

### 7.2 Design system

**Fuentes:**
- `font-sans`: Plus Jakarta Sans (200-800, variable)
- `font-serif`: Roboto Serif (variable, 4 ejes)

**Colores:**
- Primario (solicitante): teal (#55c3c4)
- Secundario (inversor): violet (#6f659d)
- Neutros: background (#f4f5f7), surface (#ffffff), border (#e4e6ea)

### 7.3 Estructura de rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing principal (placeholder) |
| `/contacto` | Página de contacto |
| `/simulador-prestamos` | Simulador de préstamo |

### 7.4 Seguridad y acceso

- Sin autenticación: sitio público por diseño
- Supabase configurado pero sin uso (service role solo server-side)
- Variables sensibles en `.env.local` (no commiteadas)

## 8. FLUJOS DE USUARIO

### Flujo A: Prospecto contacta vía formulario

```
1. Prospecto llega a /contacto
2. Ve datos de contacto en columna izquierda
3. Completa formulario (nombre, apellido, email, motivo)
4. Envía formulario
5. Ve confirmación "¡Gracias!"
```

**Servicios consumidos:** Ninguno (sin backend aún)

### Flujo B: Prospecto ve lugares de firma

```
1. Prospecto hace click en "Ver lugares de firma Litoral"
2. Scroll suave hacia la sección
3. Ve grid de 5 escribanías
4. Puede ver dirección y oficinas asociadas
```

### Flujo C: Prospecto simula un préstamo

```
1. Entra a /simulador-prestamos desde link/QR (origen evento/vendedor: futuro)
2. Ajusta valor de propiedad, monto solicitado y plazo
3. Ve su cuota mensual estimada al instante
4. Deja sus datos (nombre + email/teléfono) y/o expande la tabla de cuotas
5. Ve confirmación de contacto (UI-only)
```

**Servicios consumidos:** Ninguno aún (futuro: POST /api/leads con origen evento/vendedor)

## 9. REGLAS DE NEGOCIO

1. Los colores de marca se usan vía tokens de Tailwind (nunca hex hardcodeado)
2. Los componentes site están separados de los primitivos ui/
3. El formulario es Client Component por manejo de estado
4. La data de lugares de firma está hardcodeada (pendiente de confirmar con cliente)
5. Mobile-first: un layout responsive que se adapta a cada dispositivo
6. La lógica financiera vive en funciones puras con constantes exportadas (única fuente de verdad); sin números sueltos en la UI
7. Las reglas pendientes de confirmación ("vivienda única y permanente", concepto gravado por el IVA, comisión inicial) van como TODO en código — nunca se inventan

## 10. SUPUESTOS Y RESTRICCIONES

**Supuestos:**
- El uso real es 100% desde celular en contexto de evento (señal puede ser mala → bundle liviano)
- El vendedor comparte links/QR con los query params correctos
- No hace falta login: el prospecto no quiere crearse una cuenta para simular

**Restricciones:**
- Sin autenticación en esta etapa
- Sin modo iframe/embed
- Sin panel de leads
- Formulario sin conexión a backend

## 11. ROADMAP EVOLUTIVO

- **Corto plazo:** Landing principal con contenido
- **Hecho:** Simulador de préstamo (`/simulador-prestamos`)
- **Corto plazo:** Simulador de inversión
- **Corto plazo:** Tracking por query params (evento/vendedor)
- **Corto plazo:** Endpoint de leads y migración SQL
- **Mediano plazo:** Panel mínimo de consulta de leads por evento/vendedor
- **Mediano plazo:** Integración con el flujo real de lendar.com.ar
- **Largo plazo:** Cuentas de usuario (auth) para solicitantes e inversores
- **Largo plazo:** Proceso de solicitud de crédito e inversión real

## 12. GLOSARIO

| Término | Definición |
|---|---|
| Solicitante | Persona que simula un préstamo hipotecario |
| Inversor | Persona que simula una inversión para financiar hipotecas |
| Lead | Registro de una consulta o simulación en la base de datos |
| Simulador | Componente que calcula el resultado de préstamo/inversión |
| Amortización francesa | Sistema de cuota fija donde cada cuota paga intereses y capital |
| Valor futuro | Monto final de una inversión con interés compuesto mensual |
| Tracking | Conjunto `evento`/`vendedor` que identifica el origen del lead |
| CTA | Call to Action — botón o enlace que invita a una acción |
| TNA | Tasa Nominal Anual — se divide por 12 para obtener la tasa mensual |
| Comisión inicial | Cargo único del 5% del monto solicitado (hoy solo informativa) |
