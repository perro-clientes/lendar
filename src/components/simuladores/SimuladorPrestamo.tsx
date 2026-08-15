"use client";

import { useMemo, useState } from "react";
import type { PrestamoInputs, Tracking } from "@/types/simulador";
import { calcularResumenPrestamo, formatearMoneda } from "@/lib/calculos";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";

const COMISION_INICIAL_PCT = 1.5;
const IVA_PCT = 21;

interface SimuladorPrestamoProps {
  tracking?: Tracking;
}

export function SimuladorPrestamo({ tracking }: SimuladorPrestamoProps) {
  const [monto, setMonto] = useState(150_000_000);
  const [plazoAnios, setPlazoAnios] = useState(20);
  const [tasaAnual, setTasaAnual] = useState(8.5);
  const [contacto, setContacto] = useState({ nombre: "", telefono: "", email: "" });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const inputs = useMemo<PrestamoInputs>(
    () => ({
      monto,
      plazoMeses: plazoAnios * 12,
      tasaAnual,
      comisionInicialPct: COMISION_INICIAL_PCT,
      ivaPct: IVA_PCT,
    }),
    [monto, plazoAnios, tasaAnual],
  );
  const resultado = useMemo(() => calcularResumenPrestamo(inputs), [inputs]);

  async function guardar() {
    setEstado("enviando");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "prestamo",
          inputs,
          resultado,
          contacto: contacto.nombre.trim() ? contacto : undefined,
          ...tracking,
        }),
      });
      setEstado(res.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "ok") {
    return (
      <Card>
        <p className="text-center text-sm text-zinc-600">
          Gracias, tu simulación quedó registrada. Un asesor se va a comunicar con vos.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Slider
        label="Monto"
        value={monto}
        min={10_000_000}
        max={500_000_000}
        step={1_000_000}
        onChange={setMonto}
        display={formatearMoneda(monto)}
      />
      <Slider
        label="Plazo"
        value={plazoAnios}
        min={5}
        max={30}
        step={1}
        onChange={setPlazoAnios}
        display={`${plazoAnios} años`}
      />
      <Slider
        label="Tasa anual"
        value={tasaAnual}
        min={0}
        max={30}
        step={0.25}
        onChange={setTasaAnual}
        display={`${tasaAnual.toFixed(2)}%`}
      />

      <Card>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-600">Cuota mensual</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.cuotaMensual)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-600">Total intereses</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.totalIntereses)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-600">Costo total</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.costoTotal)}
          </span>
        </div>
      </Card>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void guardar();
        }}
      >
        <Field label="Nombre">
          <Input
            value={contacto.nombre}
            onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
            placeholder="Tu nombre"
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Teléfono">
          <Input
            value={contacto.telefono}
            onChange={(e) => setContacto({ ...contacto, telefono: e.target.value })}
            placeholder="Tu teléfono"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
        <Field label="Email">
          <Input
            value={contacto.email}
            onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
            placeholder="Tu email"
            type="email"
            inputMode="email"
            autoComplete="email"
          />
        </Field>
        <Button type="submit" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Guardando..." : "Registrar simulación"}
        </Button>
        {estado === "error" && (
          <p className="text-center text-sm text-red-600">No se pudo guardar. Intentá de nuevo.</p>
        )}
      </form>
    </div>
  );
}
