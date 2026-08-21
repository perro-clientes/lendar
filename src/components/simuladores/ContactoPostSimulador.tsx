"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/site/CTAButton";
import { Input } from "@/components/ui/Input";
import type { MedioContacto } from "@/types/simulador";

interface MedioOpcion {
  valor: MedioContacto;
  label: string;
}

const MEDIOS: readonly MedioOpcion[] = [
  { valor: "email", label: "Email" },
  { valor: "telefono", label: "Teléfono" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Laxa a propósito: acepta +54, espacios, guiones y paréntesis.
const TELEFONO_REGEX = /^\+?[0-9\s()-]{7,20}$/;

export function ContactoPostSimulador() {
  const [medio, setMedio] = useState<MedioContacto>("email");
  const [contacto, setContacto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  function validarContacto(valor: string): boolean {
    const dato = valor.trim();
    if (medio === "email") {
      return EMAIL_REGEX.test(dato);
    }
    return TELEFONO_REGEX.test(dato);
  }

  function handleContactoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validarContacto(contacto)) {
      setError(medio === "email" ? "Ingresá un email válido." : "Ingresá un teléfono válido.");
      return;
    }
    // Futura etapa: POST /api/leads con contacto, simulación y origen (evento/vendedor).
    setEnviado(true);
  }

  function handleMedioChange(valor: MedioContacto) {
    setMedio(valor);
    setError(null);
  }

  if (enviado) {
    return (
      <section aria-live="polite" className="rounded-2xl bg-solicitante-light p-6 text-center">
        <p className="font-semibold text-solicitante-dark">¡Listo!</p>
        <p className="mt-1 text-sm text-text-secondary">
          Un asesor te va a contactar por {medio === "email" ? "email" : "teléfono"} a la brevedad.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-solicitante-light p-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        ¿Querés que te contactemos para ampliarte la información? Dejanos tus datos y un asesor te va a contactar por
        el medio que elijas.
      </p>
      <div role="group" aria-label="Medio de contacto preferido" className="grid grid-cols-2 gap-2">
        {MEDIOS.map(({ valor, label }) => (
          <button
            key={valor}
            type="button"
            aria-pressed={medio === valor}
            onClick={() => handleMedioChange(valor)}
            className={`h-12 rounded-xl border-2 font-semibold transition-colors ${
              medio === valor
                ? "border-solicitante bg-surface text-solicitante-dark"
                : "border-transparent bg-surface/60 text-text-muted hover:text-text-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={handleContactoSubmit} noValidate className="flex flex-col gap-3">
        <Input
          type={medio === "email" ? "email" : "tel"}
          inputMode={medio === "email" ? "email" : "tel"}
          autoComplete={medio === "email" ? "email" : "tel"}
          placeholder={medio === "email" ? "tu@email.com" : "+54 341 555-0000"}
          aria-label={medio === "email" ? "Email" : "Teléfono"}
          value={contacto}
          onChange={(e) => {
            setContacto(e.target.value);
            setError(null);
          }}
          className="focus:border-solicitante-dark"
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <CTAButton type="submit" className="w-full">
          Quiero que me contacten
        </CTAButton>
      </form>
    </section>
  );
}
