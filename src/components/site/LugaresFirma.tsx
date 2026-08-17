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
    <section id="lugares-de-firma" className="bg-background py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-text mb-8">Lugares de firma Litoral</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="py-3 pr-4 font-semibold">Zona</th>
                <th className="py-3 pr-4 font-semibold">Escribanía</th>
                <th className="py-3 pr-4 font-semibold">Dirección</th>
                <th className="py-3 font-semibold">Oficinas RE/MAX</th>
              </tr>
            </thead>
            <tbody>
              {lugares.map((lugar, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="py-3 pr-4 text-text">{lugar.zona}</td>
                  <td className="py-3 pr-4 text-text font-medium">{lugar.escribania}</td>
                  <td className="py-3 pr-4 text-text-muted">{lugar.direccion}</td>
                  <td className="py-3 text-text-muted">{lugar.oficinas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
