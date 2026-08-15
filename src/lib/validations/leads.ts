import { z } from "zod";

const trackingSchema = z
  .string()
  .trim()
  .min(1)
  .max(100);

export const contactoSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  telefono: z.string().trim().min(5).max(30).optional(),
  email: z.string().trim().email().max(120).optional(),
});

export const prestamoInputsSchema = z.object({
  monto: z.number().positive().max(1_000_000_000_000),
  plazoMeses: z.number().int().min(1).max(360),
  tasaAnual: z.number().min(0).max(100),
  comisionInicialPct: z.number().min(0).max(20).optional(),
  ivaPct: z.number().min(0).max(50).optional(),
});

export const prestamoResultadoSchema = z.object({
  cuotaMensual: z.number().nonnegative(),
  totalPagado: z.number().nonnegative(),
  totalIntereses: z.number().nonnegative(),
  totalComisiones: z.number().nonnegative(),
  totalIva: z.number().nonnegative(),
  costoTotal: z.number().nonnegative(),
});

export const inversionInputsSchema = z.object({
  capitalInicial: z.number().min(0).max(1_000_000_000_000),
  aporteMensual: z.number().min(0).max(100_000_000_000),
  plazoMeses: z.number().int().min(1).max(600),
  tasaAnual: z.number().min(0).max(100),
});

export const inversionResultadoSchema = z.object({
  montoFinal: z.number().nonnegative(),
  totalAportado: z.number().nonnegative(),
  interesesGanados: z.number().nonnegative(),
});

export const leadSchema = z.object({
  tipo: z.enum(["prestamo", "inversion"]),
  inputs: z.union([prestamoInputsSchema, inversionInputsSchema]),
  resultado: z.union([prestamoResultadoSchema, inversionResultadoSchema]),
  contacto: contactoSchema.optional().nullable(),
  evento: trackingSchema.optional().nullable(),
  vendedor: trackingSchema.optional().nullable(),
});

export type LeadDto = z.infer<typeof leadSchema>;
