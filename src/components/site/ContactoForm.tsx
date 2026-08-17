"use client";

import { useState, type FormEvent } from "react";

export function ContactoForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex-1 bg-surface p-8 md:p-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-2">¡Gracias!</h2>
          <p className="text-text-muted">Te vamos a contactar a la brevedad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface p-8 md:p-12 flex items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="nombre" className="text-sm font-medium text-text-secondary">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="border-b border-border py-2 text-text focus:border-violet-dark outline-none transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="apellido" className="text-sm font-medium text-text-secondary">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              className="border-b border-border py-2 text-text focus:border-violet-dark outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-text-secondary">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border-b border-border py-2 text-text focus:border-violet-dark outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="mensaje" className="text-sm font-medium text-text-secondary">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            className="border-b border-border py-2 text-text focus:border-violet-dark outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="motivo" className="text-sm font-medium text-text-secondary">
            Motivo del contacto
          </label>
          <select
            id="motivo"
            name="motivo"
            required
            className="border-b border-border py-2 text-text focus:border-violet-dark outline-none transition-colors bg-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccioná un motivo
            </option>
            <option value="prestamo">Quiero un préstamo</option>
            <option value="inversion">Quiero invertir</option>
            <option value="agente">Soy agente</option>
            <option value="institucional">Institucional</option>
            <option value="prensa">Prensa</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-violet-dark px-8 py-3 text-sm font-bold uppercase text-white hover:opacity-90 transition-opacity cursor-pointer"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
