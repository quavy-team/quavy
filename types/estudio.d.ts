type Ev = { target: { value: any } };

export interface Block {
  title?: string;
  role?: string;
  strum?: string;
  text?: string;
}

export interface Store {
  title?: string;
  bands?: string[];
  blocks?: Block[];
  updateTitle: (e: Ev) => void;
  updateBands: (e: Ev, n: number) => void;
  updateBlock: (b: Block, n: number) => void;
  createBand: () => void;
  createBlock: () => void;
  setAll: (title: string, bands: string[], blocks: Block[]) => void;
}
