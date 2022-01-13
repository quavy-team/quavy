type Ev = { target: { value: any } };
export {Bloque} from "types/canciones"

export interface Block {
  title?: string;
  role?: string;
  strum?: string;
  text?: string;
}

export interface Store {
  set: SetState<Store>;
  titulo?: string;
  artistas?: string[];
  bloques?: Bloque[];
  updateTitle: (e: Ev) => void;
  updateBand: (e: Ev, n: number) => void;
  updateBlock: (b: Bloque, n: number) => void;
  createBand: () => void;
  createBlock: () => void;
}
