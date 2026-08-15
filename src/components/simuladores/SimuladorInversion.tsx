"use client";

import { useMemo, useState } from "react";
import type { InversionInputs, Tracking } from "@/types/simulador";
import { calcularResumenInversion, formatearMoneda } from "@/lib/calculos";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";

interface SimuladorInversionProps {
  tracking?: Tracking;
}

export function SimuladorInversion({ tracking }: SimuladorInversionProps) {
  const [capitalInicial, setCapitalInicial] = useState(10_000_000);
  const [aporteMensual, setAporteMensual] = useState(1_000_000);
  const [plazoAnios, setPlazoAnios] = useState(10);
  const [tasaAnual, setTasaAnual] = useState(10);
  const [contacto, setContacto] = useState({ nombre: "", telefono: "", email: "" });
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const inputs = useMemo<InversionInputs>(
    () => ({
      capitalInicial,
      aporteMensual,
      plazoMeses: plazoAnios * 12,
      tasaAnual,
    }),
    [capitalInicial, aporteMensual, plazoAnios, tasaAnual],
  );
  const resultado = useMemo(() => calcularResumenInversion(inputs), [inputs]);

  async function guardar() {
    setEstado("enviando");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "inversion",
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
        label="Capital inicial"
        value={capitalInicial}
        min={0}
        max={100_000_000}
        step={500_000}
        onChange={setCapitalInicial}
        display={formatearMoneda(capitalInicial)}
      />
      <Slider
        label="Aporte mensual"
        value={aporteMensual}
        min={0}
        max={5_000_000}
        step={50_000}
        onChange={setAporteMensual}
        display={formatearMoneda(aporteMensual)}
      />
      <Slider
        label="Plazo"
        value={plazoAnios}
        min={1}
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
          <span className="text-sm text-zinc-600">Total aportado</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.totalAportado)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-600">Intereses ganados</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.interesesGanados)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-zinc-600">Monto final</span>
          <span className="font-semibold tabular-nums text-zinc-900">
            {formatearMoneda(resultado.montoFinal)}
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
