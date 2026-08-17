export function ContactoHero() {
  return (
    <div className="relative text-white p-8 md:p-12 flex flex-col items-start gap-8">

      <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-wide">
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
        className="text-md font-medium underline hover:text-teal-dark transition-colors"
      >
        Ver lugares de firma Litoral
      </a>
    </div>
  );
}
