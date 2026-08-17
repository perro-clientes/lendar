import { CTAButton } from "./CTAButton";

const lugares = [
  {
    zona: "Santa Fe",
    escribania: "Culzoni & Zanetta",
    direccion: "San Martín 5252, Santa Fe",
    oficinas: "Santa Fe Capital, Fortaleza (Esperanza), Conquista (Reconquista)",
  },
  {
    zona: "Rafaela",
    escribania: "Epuliza",
    direccion: "Mitre 240, Rafaela",
    oficinas: "Confianza (Rafaela)",
  },
  {
    zona: "Rosario",
    escribania: "Alegre",
    direccion: "Córdoba 1439 Piso 2 Of 10, Rosario",
    oficinas: "Forum, Terra, Select, Colonial, Tendencia",
  },
  {
    zona: "Rosario",
    escribania: "Verónica Ferreyra",
    direccion: "San Martín 647 Piso 5, Rosario",
    oficinas: "Exclusive, Vip, Point",
  },
  {
    zona: "Paraná",
    escribania: "Quíndoz",
    direccion: "San Martín 338, Paraná",
    oficinas: "Por Más (Paraná)",
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
          <p className="text-lg text-text-muted">Contamos con escribanías de primer nivel en Santa Fe, Rosario y Paraná para realizar tus firmas.</p>
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
                <CTAButton variant="outline">Contactar</CTAButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
