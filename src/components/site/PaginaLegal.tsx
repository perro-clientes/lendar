import type { BloqueLegal, FragmentoLegal } from "@/types/legales";

interface PaginaLegalProps {
  titulo: string;
  destacado: string;
  urlOficial: string;
  bloques: BloqueLegal[] | null;
}

function Fragmentos({ fragmentos }: { fragmentos: FragmentoLegal[] }) {
  return fragmentos.map(({ texto, negrita, href }, indice) => {
    const contenido = negrita ? <strong className="font-semibold text-text">{texto}</strong> : texto;
    return href ? (
      <a
        key={indice}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-violet-dark underline hover:text-violet"
      >
        {contenido}
      </a>
    ) : (
      <span key={indice}>{contenido}</span>
    );
  });
}

function Bloque({ bloque }: { bloque: BloqueLegal }) {
  if (bloque.tipo === "titulo" && bloque.nivel === 2) {
    return (
      <h2 id={bloque.id} className="mt-8 scroll-mt-24 font-serif text-xl leading-snug font-medium text-text first:mt-0 md:text-2xl">
        {bloque.texto}
      </h2>
    );
  }
  if (bloque.tipo === "titulo") {
    return (
      <h3 id={bloque.id} className="mt-4 scroll-mt-24 leading-snug font-semibold text-text">
        {bloque.texto}
      </h3>
    );
  }
  if (bloque.tipo === "lista") {
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5">
        {bloque.items.map((item, indice) => (
          <li key={indice}>
            <Fragmentos fragmentos={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <Fragmentos fragmentos={bloque.fragmentos} />
    </p>
  );
}

function ListaIndice({ titulos }: { titulos: Extract<BloqueLegal, { tipo: "titulo" }>[] }) {
  return (
    <ul className="flex flex-col gap-3 text-xs leading-snug text-text-muted">
      {titulos.map(({ id, texto }) => (
        <li key={id}>
          <a href={`#${id}`} className="transition-colors hover:text-violet-dark">
            {texto}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PaginaLegal({ titulo, destacado, urlOficial, bloques }: PaginaLegalProps) {
  const titulos = (bloques ?? []).filter(
    (bloque): bloque is Extract<BloqueLegal, { tipo: "titulo" }> =>
      bloque.tipo === "titulo" && bloque.nivel === 2,
  );

  return (
    <>
      <header className="bg-background py-14 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4">
          <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-text md:text-5xl">
            {titulo} <em className="font-normal">{destacado}</em>
          </h1>
          <p className="max-w-2xl leading-relaxed text-text-secondary">
            Texto vigente publicado por Lendar en{" "}
            <a href={urlOficial} target="_blank" rel="noopener noreferrer" className="text-violet-dark underline hover:text-violet">
              lendar.com.ar
            </a>
            .
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl items-start gap-10 grid-cols-[minmax(0,1fr)] px-4 py-12 md:py-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        {bloques ? (
          <>
            <details className="rounded-2xl bg-background p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-text">Índice</summary>
              <div className="mt-4">
                <ListaIndice titulos={titulos} />
              </div>
            </details>
            <nav aria-label="Índice" className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block">
              <ListaIndice titulos={titulos} />
            </nav>
            <article className="flex max-w-3xl flex-col gap-4 leading-relaxed text-text-secondary wrap-anywhere">
              {bloques.map((bloque, indice) => (
                <Bloque key={indice} bloque={bloque} />
              ))}
            </article>
          </>
        ) : (
          <p className="leading-relaxed text-text-secondary lg:col-span-2">
            No pudimos cargar este documento. Podés leerlo en{" "}
            <a href={urlOficial} target="_blank" rel="noopener noreferrer" className="text-violet-dark underline hover:text-violet">
              lendar.com.ar
            </a>
            .
          </p>
        )}
      </div>
    </>
  );
}
