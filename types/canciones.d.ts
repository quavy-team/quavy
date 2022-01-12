export interface Props {
  titulo: string;
  artistas: string[];
  bloques: Bloque[];
}

export interface Bloque {
  verso: string;
  rol: string;
  texto: string;
}
