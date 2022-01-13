// import "firebase/auth"
import * as next from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import * as react from "react";
import * as icons from "react-iconly";
import { auth, store } from "src/app";
import { slug } from "src/utils";
import styles from "styles/studio.module.sass";
import { Block, Bloque, Store } from "types/estudio";
import create from "zustand";

const useStore = create<Store>((set) => ({
  set,
  titulo: "",
  artistas: [],
  bloques: [],
  updateTitle: (e) => set({ titulo: e.target.value }),
  createBand: () => set(({ artistas }) => ({ artistas: artistas.concat("") })),
  updateBand: (ev, key, fresh = ev.target.value) =>
    set(({ artistas }) => ({
      artistas: artistas.map((stale, index) => {
        return index === key ? fresh : stale;
      }),
    })),
  createBlock: () =>
    set(({ bloques }) => ({
      bloques: bloques.concat({
        verso: "",
        rol: "",
        rasguido: "",
        texto: "",
      }),
    })),
  updateBlock: (fresh, key) =>
    set(({ bloques }) => ({
      bloques: bloques.map((stale, index) => {
        return index === key ? fresh : stale;
      }),
    })),
}));

export default function Studio() {
  const router = useRouter();
  const titulo = useStore((store) => store.titulo);
  const bloques = useStore((store) => store.bloques);
  const updateTitle = useStore((store) => store.updateTitle);
  const modal = next.useModal(false);

  react.useEffect(() => {
    modal.setVisible(!auth.currentUser);
  }, [auth.currentUser]);

  return (
    <>
      <next.Text h1>Quavy Studio !!</next.Text>
      <next.Input placeholder="titulo" underlined value={titulo} onChange={updateTitle} />
      <Artists />

      {bloques.map((block, n) => (
        <Block key={`block: ${n}`} block={block} number={n} />
      ))}

      <SideBar />
    </>
  );
}

function Block({ block, number }) {
  const updateBlock = useStore((store) => store.updateBlock);
  const titulo = next.useInput(block.titulo);
  const role = next.useInput(block.role);
  const strum = next.useInput(block.strum);
  const text = next.useInput(block.text);
  const [selection, setSelection] = react.useState({ start: 0, end: 0 });

  const bloque: Bloque = react.useMemo(
    () => ({
      verso: titulo.value,
      rol: role.value,
      texto: text.value,
      rasguido: strum.value,
    }),
    [titulo.value, role.value, strum.value, text.value]
  );

  react.useEffect(() => {
    updateBlock(bloque, number);
  }, [updateBlock, bloque, number]);

  return (
    <next.Card>
      <next.Card.Header
        css={{
          p: "var(--nextui-space-sm) var(--nextui-space-lg)",
          gap: 15,
        }}
      >
        <next.Input placeholder="numero" labelLeft="verso" {...titulo.bindings} />
        <next.Input placeholder="rol" labelLeft="&amp;" {...role.bindings} />
      </next.Card.Header>
      <next.Card.Body>
        <next.Textarea
          placeholder="contenido"
          {...text.bindings}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const string = getSelection().toString();
            if (!string) return;
            e.preventDefault();
            // const value = text.value.replace(string, `((${string}))`);
            const start = text.value.slice(0, selection.start);
            const slice = text.value.slice(selection.start, selection.end);
            const end = text.value.slice(selection.end);
            const value = "".concat(start, `((${slice}))`, end);
            text.setValue(value);
          }}
          onSelect={(e: any) =>
            setSelection({
              start: e.target.selectionStart,
              end: e.target.selectionEnd,
            })
          }
        />
      </next.Card.Body>
      <next.Card.Footer>
        <next.Input placeholder="rasguido" fullWidth {...strum.bindings} />
      </next.Card.Footer>
    </next.Card>
  );
}

function Artists() {
  const artistas = useStore((store) => store.artistas);
  const updateBand = useStore((store) => store.updateBand);
  const createBand = useStore((store) => store.createBand);
  return (
    <span>
      {artistas.map((band, n) => {
        return (
          <next.Input
            key={`band:${n}`}
            placeholder="banda o artista"
            underlined
            value={band}
            onChange={(e) => updateBand(e, n)}
          />
        );
      })}
      <next.Button auto onClick={createBand}>
        <icons.Plus />
      </next.Button>
    </span>
  );
}

function SideBar() {
  const [item, setItem] = react.useState(null);
  const titulo = useStore((store) => store.titulo);
  const artistas = useStore((store) => store.artistas);
  const bloques = useStore((store) => store.bloques);
  const set = useStore((store) => store.set);
  const createBlock = useStore((store) => store.createBlock);

  react.useEffect(() => {
    setItem(localStorage.getItem("songs"));
  }, []);

  const saveLocally = react.useCallback(() => {
    const item = localStorage.getItem("canciones");
    const song = JSON.stringify({ titulo, artistas, bloques });
    if (!item) return localStorage.setItem("canciones", JSON.stringify([song]));
    const array = Array.from(item);
    const index = array.indexOf(song);
    index ? (array[index] = song) : array.push(song);
    localStorage.setItem("canciones", JSON.stringify(array));
  }, [titulo, artistas, bloques]);

  const saveToDB = react.useCallback(async () => {
    if (!auth.currentUser) return;
    const [name] = artistas;
    const { email, uid } = auth.currentUser;
    const ref =
      email === "quavy.co@gmail.com"
        ? doc(store, "artistas", slug(name), "canciones", slug(titulo))
        : doc(store, "usuarios", uid, "canciones", slug(titulo));
    await setDoc(ref, { titulo, artistas: artistas || [], bloques: bloques || [] });
    if (email === "quavy.co@gmail.com") fetch(process.env.DEPLOY_HOOK);
  }, [titulo, artistas, bloques]);

  return (
    <aside className={styles.sidebar}>
      <next.Button auto onClick={createBlock}>
        Crear Bloque
      </next.Button>
      <next.Button auto onClick={saveLocally}>
        Guardar local
      </next.Button>
      <next.Button auto onClick={saveToDB}>
        Guardar en DB
      </next.Button>
      {/* CANCIONES GUARDADAS EN LOCALSTORAGE */}
      {item && (
        <li>
          {JSON.parse(item).map((string, n) => {
            const { titulo, artistas, bloques } = JSON.parse(string);
            return (
              <button key={`song:${n}`} onClick={() => set({ titulo, artistas, bloques })}>
                {titulo}
              </button>
            );
          })}
        </li>
      )}
    </aside>
  );
}
