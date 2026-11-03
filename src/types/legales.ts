export interface FragmentoLegal {
  texto: string;
  negrita: boolean;
  href?: string;
}

export type BloqueLegal =
  | { tipo: "titulo"; nivel: 2 | 3; texto: string; id: string }
  | { tipo: "parrafo"; fragmentos: FragmentoLegal[] }
  | { tipo: "lista"; items: FragmentoLegal[][] };
