import { FiMessageSquare } from "react-icons/fi";

export function ContactoHero() {
  return (
    <div className="relative flex-1 bg-violet-dark text-white p-8 md:p-12 flex flex-col gap-8">
      <FiMessageSquare className="text-5xl" />

      <h1 className="text-5xl font-bold uppercase tracking-wide">
        Contactate
      </h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Préstamos</h2>
          <p>Whatsapp: (11) 4166-6056</p>
          <p>Email: prestamos@lendar.com.ar</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Inversiones</h2>
          <p>Whatsapp: (11) 4025-1448</p>
          <p>Email: inversiones@lendar.com.ar</p>
        </div>
      </div>

      <a
        href="#lugares-de-firma"
        className="text-sm font-medium underline hover:text-teal-light transition-colors mt-auto"
      >
        Ver lugares de firma Litoral
      </a>
    </div>
  );
}
