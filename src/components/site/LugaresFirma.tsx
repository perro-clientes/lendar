import { CTAButton } from "./CTAButton";

const ASUNTO_CONSULTA = encodeURIComponent("Consulta sobre crédito Lendar");

const lugares = [
  {
    zona: "Santa Fe",
    escribania: "Escribanía Culzoni & Zanetta",
    direccion: "San Martín 3262, Santa Fe",
    oficinas: "Santa Fe Capital, Fortaleza (Esperanza), Conquista (Reconquista)",
    email: "escribaniaculzoni@gmail.com",
  },
  {
    zona: "Rafaela",
    escribania: "Escribanía Eguiazu",
    direccion: "Moreno 240, Rafaela",
    oficinas: "Confianza (Rafaela)",
    email: "hipotecas@escribaniaeguiazu.com.ar",
  },
  {
    zona: "Rosario I",
    escribania: "Escribanía Alegre",
    direccion: "Córdoba 1438 Piso 2, Of. 01, Rosario",
    oficinas: "Forum, Terra, Select, Colonial, Tendencia, Flor",
    email: "escribaniaalegre@gmail.com",
  },
  {
    zona: "Rosario II",
    escribania: "Verónica Ferreyra",
    direccion: "San Martín 647, Piso 5, Rosario",
    oficinas: "Exclusivo, Vip",
    email: "escribanaferreyra@gmail.com",
  },
  {
    zona: "Paraná",
    escribania: "Escribanía Quinodoz",
    direccion: "San Martín 228, Paraná",
    oficinas: "Por Más (Paraná)",
    email: "escribaniaquinodoz@gmail.com",
  },
];

export function LugaresFirma() {
  return (
    <section id="lugares-de-firma" className="bg-background py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-4">
            Lugares de firma
          </h2>
          <p className="text-lg text-text-muted">Escribanías con las que trabajamos, según la oficina RE/MAX.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lugares.map((lugar, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {lugar.zona}
              </span>
              <h3 className="font-serif font-semibold text-2xl text-text">
                {lugar.escribania}
              </h3>
              <p className="text-sm text-text-muted">{lugar.direccion}</p>
              <p className="text-sm text-text-secondary">{lugar.oficinas}</p>
              <div className="mt-auto pt-4">
                <a href={`mailto:${lugar.email}?subject=${ASUNTO_CONSULTA}`}>
                  <CTAButton variant="outline">Contactar</CTAButton>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
