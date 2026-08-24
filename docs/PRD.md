# Lendar — Product Requirements Document

> **Versión: 0.5 — 2026-08-24**
> Estado: Landings de audiencia completas — home con hero, landing de préstamos (marco legal, requisitos, proceso, beneficios, simulador con costos y honorarios, banner) y landing de inversiones.

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
| Navbar con logo, links de landings y CTA "Contacto" | [x] Implementado |
| Footer con redes sociales y copyright | [x] Implementado |
| CTAButton reutilizable (5 variantes + accent en variantes white) | [x] Implementado |
| Home con hero y CTAs por audiencia | [x] Implementado |
| Página de contacto (`/contacto`) | [x] Implementada |
| ContactoHero con imagen de fondo | [x] Implementado |
| ContactoForm con validación cliente | [x] Implementado |
| Lugares de firma (cards responsive) | [x] Implementado |
| Supabase configurado (sin uso) | [x] Listo |
| Simulador de préstamo (`SimuladorPrestamo` + subcomponentes) | [x] Implementado |
| Bloque "Costos y honorarios" con comisión en vivo | [x] Implementado |
| Simulador de inversión (`SimuladorInversion` + subcomponentes) | [x] Implementado |
| Cálculo puro + constantes de negocio (`lib/calculos.ts`) | [x] Implementado |
| Ruta `/simulador-prestamos` | [x] Implementada |
| Ruta `/simulador-inversion` (destino de QR) | [x] Implementada |
| Landing `/pedi-tu-prestamo` completa (6 secciones + banner) | [x] Implementada |
| Landing `/inverti-en-lendar` completa | [x] Implementada |
| Componentes de landing compartidos con prop `accent` (MarcoLegal, Proceso, Banner) | [x] Implementados |
| Secciones Requisitos y Beneficios (landing préstamos) | [x] Implementadas |
| CTA de contacto compartido (`CTAContacto`, accent solicitante/inversor) | [x] Implementado |
| Tablas de cuotas siempre visibles con scroll interno | [x] Implementado |
| Primitivos ui/ normalizados a tokens neutros | [x] Implementado |

### 3.2 Pendiente

| Feature | Estado |
|---|---|
| Contenido adicional del home (más allá del hero) | [ ] Pendiente |
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
- Prop `mostrarContacto` (default `true`): visible en la ruta dedicada, oculto en la landing (ahí el cierre lo da el Banner)
- `CTAContacto` al pie del simulador: formulario Nombre / Email / Teléfono
- Validación cliente: nombre requerido; email o teléfono al menos uno, formato validado
- Confirmación sin backend: "¡Listo! Un asesor te va a contactar a la brevedad."

**Costos y honorarios (bloque dentro del simulador):**
- Ubicado full-width debajo de la tabla de cuotas, encima del formulario de contacto
- Header con ícono Calculator en violeta (neutro de diferenciación, según referencia)
- Card Comisión Lendar (violeta): "5% + IVA sobre {monto}" con el total calculado **en vivo** contra el slider (ej.: USD 127.000 → USD 7.684) en box anidado; nota "no se paga por separado: se suma al préstamo"
- Card Costos de escribanía (teal, estático): compra con financiamiento Lendar 3,25%–5% del valor del inmueble; hipoteca sola 3%–6,5% del monto del préstamo; disclaimer de valores orientativos
- Alturas parejeas (`items-stretch`) y degradés suaves surface→{accent}-light con borde de tono

### 6.5 Simulador de inversión (`/simulador-inversion`)

**Inputs:**
- Monto a invertir: slider USD 10.000–500.000, step 1.000 (máximo a confirmar con Lendar)
- Plazo de inversión: mismo selector de 5 botones que en préstamo — 1 año (9,5%) · 2 años (10,5%) · 3 años (11,5%) · 4 años (12,5%) · 5 años (13,5%)
- Formato de entrega del capital: Efectivo ("Llevás el dinero en efectivo al momento de la firma.") / Transferencia (copy a confirmar con Lendar)
- Formato de cobro de la cuota: Efectivo ("Te pagan la cuota mensual en efectivo en el domicilio que determines cercano al lugar de firma.") / Transferencia (copy a confirmar con Lendar)

**Resultado:**
- Cobro mensual estimado destacado en card, con leyenda "Calculado mediante Sistema Francés directo en dólares billete."
- Bloque Costos: Comisión Lendar (1,5% del monto invertido) — "Se paga por única vez, en efectivo, el día de la firma en la escribanía."
- Tabla mes a mes siempre visible (sin interacción): N° cuota, amortización, interés, cuota total, saldo post-cuota. **Sin columna IVA** (a diferencia de la tabla de préstamo)

**Contacto post-simulador:** mismo `CTAContacto` compartido con accent `inversor` y botón `solid-inversor`.

**Acceso:** el componente vive en la landing `/inverti-en-lendar` (con contacto oculto, cierre por Banner) y en la ruta dedicada `/simulador-inversion`, que sigue siendo destino de QR del vendedor (sin links directos en Navbar).

### 6.6 Landing "Pedí tu préstamo" (`/pedi-tu-prestamo`)

Landing completa del solicitante. Estructura: Hero → MarcoLegal → Requisitos → Proceso → Beneficios → Simulador → Banner.

- **Hero**: fondo teal con imagen bg-shape; CTAs "Simulá tu préstamo" (#simulador) y "Conocé el marco legal" (#marco-legal)
- **Marco legal** (accent solicitante): "Tu préstamo, protegido por ley" + 4 ítems legales con checks
- **Requisitos**: 2 cards — información del solicitante (teal) e información del inmueble (violeta como neutro de categorización); bullets simples
- **Proceso** (accent solicitante): 5 pasos sticky-scroll con copy propio de la solicitud
- **Beneficios**: 4 cards con íconos lucide y acentos alternados teal/violeta (Comprá Hoy, Operación Blindada, Avanzá con Certeza, Más Compradores)
- **Simulador**: mismo `SimuladorPrestamo` con contacto oculto
- **Banner** CTA final a `/contacto`: "¿Listo para pedir tu préstamo?"

### 6.7 Landing "Invertí en Lendar" (`/inverti-en-lendar`)

Estructura espejada: Hero → MarcoLegal → Proceso → Simulador → Banner.

- Mismos componentes compartidos con accent inversor; copy de proceso propio del rol inversor
- Simulador de inversión embebido con contacto oculto; Banner "¿Listo para empezar a invertir?" cierra hacia `/contacto`

> Patrón transversal: los componentes de landing (MarcoLegal, Proceso, Banner) se generalizaron con prop `accent` + mapa de copy interno para evitar duplicación por audiencia.

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
| `/` | Home con hero y CTAs por audiencia |
| `/contacto` | Página de contacto |
| `/pedi-tu-prestamo` | Landing del solicitante (6 secciones + banner) |
| `/inverti-en-lendar` | Landing del inversor |
| `/simulador-prestamos` | Simulador de préstamo standalone (con contacto) |
| `/simulador-inversion` | Simulador de inversión standalone (acceso por link/QR) |

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
1. Entra a /pedi-tu-prestamo (o /simulador-prestamos) desde link/QR o desde el Navbar
2. Navega las secciones y ajusta valor de propiedad, monto solicitado y plazo
3. Ve su cuota mensual estimada al instante + comisión Lendar con IVA calculada en vivo
4. Deja sus datos (nombre + email/teléfono) y/o mira la tabla de cuotas
5. Ve confirmación de contacto (UI-only)
```

**Servicios consumidos:** Ninguno aún (futuro: POST /api/leads con origen evento/vendedor)

### Flujo D: Prospecto simula una inversión

```
1. Entra a /inverti-en-lendar (o /simulador-inversion) desde link/QR o desde el Navbar
2. Navega las secciones y ajusta monto a invertir, plazo y formatos de entrega/cobro
3. Ve su cobro mensual estimado al instante
4. Deja sus datos (nombre + email/teléfono) y/o mira la tabla de cuotas
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
7. Las reglas pendientes de confirmación ("vivienda única y permanente", concepto gravado por el IVA en la tabla) van como TODO en código — nunca se inventan. La comisión Lendar del solicitante quedó confirmada: se informa con IVA incluido (5% base × 1,21)

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

- **Hecho:** Landing del solicitante (`/pedi-tu-prestamo`) y landing del inversor (`/inverti-en-lendar`)
- **Hecho:** Simulador de préstamo (`/simulador-prestamos`) con bloque Costos y Honorarios
- **Hecho:** Simulador de inversión (`/simulador-inversion`)
- **Corto plazo:** Contenido adicional del home (más allá del hero)
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
| Comisión Lendar | Cargo único del 1,5% del monto invertido; se paga en efectivo el día de la firma |
| Inversor Gold | Escalón documentado (1% para inversión > USD 40.000); pendiente confirmar si aplica al simulador |
| Formato de entrega/cobro | Modalidad Efectivo o Transferencia para entregar el capital y cobrar la cuota |
