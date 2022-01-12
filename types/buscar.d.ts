import type {Block} from "types/estudio" 

export interface Cancion {
  titulo: string;
  artistas: string[];
  bloques: Block[];
}
export interface Props {
  canciones: Cancion[];
}

export interface SongProps {
  cancion: Cancion;
  transition: string;
}
