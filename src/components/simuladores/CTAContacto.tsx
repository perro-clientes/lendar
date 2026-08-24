"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/site/CTAButton";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

type Accent = "solicitante" | "inversor";

const ACCENT_CLASSES: Record<Accent, { fondo: string; titulo: string }> = {
  solicitante: { fondo: "bg-solicitante-light", titulo: "text-solicitante-dark" },
  inversor: { fondo: "bg-inversor-light", titulo: "text-inversor-dark" },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Laxa a propósito: acepta +54, espacios, guiones y paréntesis.
const TELEFONO_REGEX = /^\+?[0-9\s()-]{7,20}$/;

interface DatosContacto {
  nombre: string;
  email: string;
  telefono: string;
}

const DATOS_INICIALES: DatosContacto = { nombre: "", email: "", telefono: "" };

interface CTAContactoProps {
  accent?: Accent;
}

export function CTAContacto({ accent = "solicitante" }: CTAContactoProps) {
  const [datos, setDatos] = useState<DatosContacto>(DATOS_INICIALES);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  function validarDatos(): string | null {
    if (!datos.nombre.trim()) {
      return "Ingresá tu nombre.";
    }
    const tieneEmail = Boolean(datos.email.trim());
    const tieneTelefono = Boolean(datos.telefono.trim());
    if (!tieneEmail && !tieneTelefono) {
      return "Dejanos tu email o tu teléfono para poder contactarte.";
    }
    if (tieneEmail && !EMAIL_REGEX.test(datos.email.trim())) {
      return "Ingresá un email válido.";
    }
    if (tieneTelefono && !TELEFONO_REGEX.test(datos.telefono.trim())) {
      return "Ingresá un teléfono válido.";
    }
    return null;
  }

  function handleContactoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorValidacion = validarDatos();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    // Futura etapa: POST /api/leads con contacto, simulación y origen (evento/vendedor).
    setEnviado(true);
  }

  function actualizarCampo(campo: keyof DatosContacto, valor: string) {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    setError(null);
  }

  if (enviado) {
    return (
      <section aria-live="polite" className={`rounded-2xl ${ACCENT_CLASSES[accent].fondo} p-6 text-center`}>
        <p className={`font-semibold ${ACCENT_CLASSES[accent].titulo}`}>¡Listo!</p>
        <p className="mt-1 text-sm text-text-secondary">Un asesor te va a contactar a la brevedad.</p>
      </section>
    );
  }

  return (
    <section className={`flex flex-col gap-4 rounded-2xl ${ACCENT_CLASSES[accent].fondo} p-5`}>
      <div className="text-center">
        <h4 className="font-semibold text-2xl font-serif max-w-xl m-auto">¿Querés que te contactemos para ampliarte la información?</h4>
        <p className="text-sm leading-relaxed text-text-secondary">
          Dejanos tus datos y un asesor te va a contactar por el medio que prefieras.
        </p>

      </div>

      <form onSubmit={handleContactoSubmit} noValidate className="flex flex-col gap-3">
        <Field label="Nombre">
          <Input
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={datos.nombre}
            onChange={(e) => actualizarCampo("nombre", e.target.value)}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={datos.email}
            onChange={(e) => actualizarCampo("email", e.target.value)}
          />
        </Field>
        <Field label="Teléfono">
          <Input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+54 341 555-0000"
            value={datos.telefono}
            onChange={(e) => actualizarCampo("telefono", e.target.value)}
          />
        </Field>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <CTAButton type="submit" variant={accent === "inversor" ? "solid-inversor" : "solid"} className="w-full">
          Quiero que me contacten
        </CTAButton>
      </form>
    </section>
  );
}
