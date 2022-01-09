// import "firebase/auth"
import * as next from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as icons from "react-iconly";
import { store } from "src/app";
import Layout from "src/layout";
import { slug } from "src/utils";
import styles from "styles/studio.module.sass";
import { Block, Store } from "types/estudio";
import create from "zustand";

const useStore = create<Store>((set) => ({
  title: "",
  bands: [],
  blocks: [],
  updateTitle: (e) => set({ title: e.target.value }),
  createBand: () => set(({ bands }) => ({ bands: bands.concat("") })),
  updateBands: (ev, key, val = ev.target.value) =>
    set(({ bands }) => ({
      bands: bands.map((band, index) => {
        return index === key ? val : band;
      }),
    })),
  createBlock: () =>
    set(({ blocks }) => ({
      blocks: blocks.concat({
        title: "",
        role: "",
        strum: "",
        text: "",
      }),
    })),
  updateBlock: (fresh, key) =>
    set(({ blocks }) => ({
      blocks: blocks.map((stale, index) => {
        return index === key ? fresh : stale;
      }),
    })),
  setAll: (title, bands, blocks) => set({ title, bands, blocks }),
}));

export default function Studio() {
  const router = useRouter();
  const title = useStore((store) => store.title);
  const bands = useStore((store) => store.bands);
  const blocks = useStore((store) => store.blocks);
  const updateTitle = useStore((store) => store.updateTitle);
  const updateBands = useStore((store) => store.updateBands);
  const updateBlock = useStore((store) => store.updateBlock);
  const createBand = useStore((store) => store.createBand);

  useEffect(() => {
    // !auth.currentUser && router.push("/cuenta");
  }, [router]);

  return (
    <Layout>
      <next.Text h1>Quavy Studio !!</next.Text>
      <next.Input placeholder="title" underlined value={title} onChange={updateTitle} />
      <span>
        {bands.map((band, n) => {
          return (
            <next.Input
              key={`band:${n}`}
              placeholder="banda o artista"
              underlined
              value={band}
              onChange={(e) => updateBands(e, n)}
            />
          );
        })}
        <next.Button auto onClick={createBand}>
          <icons.Plus />
        </next.Button>
      </span>

      {blocks.map((block, n) => (
        <Block key={`block: ${n}`} updateBlock={updateBlock} block={block} number={n} />
      ))}

      <AsideBar />
    </Layout>
  );
}

function Block({ updateBlock, block, number }) {
  const title = next.useInput(block.title);
  const role = next.useInput(block.role);
  const strum = next.useInput(block.strum);
  const text = next.useInput(block.text);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const bloque: Block = useMemo(
    () => ({
      title: title.value,
      role: role.value,
      strum: strum.value,
      text: text.value,
    }),
    [title.value, role.value, strum.value, text.value]
  );

  useEffect(() => {
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
        <next.Input placeholder="numero" labelLeft="verso" {...title.bindings} />
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

function AsideBar() {
  const [item, setItem] = useState(null);
  const title = useStore((store) => store.title);
  const bands = useStore((store) => store.bands);
  const blocks = useStore((store) => store.blocks);
  const setAll = useStore((store) => store.setAll);
  const createBlock = useStore((store) => store.createBlock);

  useEffect(() => {
    setItem(localStorage.getItem("songs"));
  }, []);

  const saveLocally = useCallback(() => {
    const item = localStorage.getItem("songs");
    const song = JSON.stringify({ title, bands, blocks });
    if (!item) return localStorage.setItem("songs", JSON.stringify([song]));
    const array = Array.from(item);
    const index = array.indexOf(song);
    index ? (array[index] = song) : array.push(song);
    localStorage.setItem("songs", JSON.stringify(array));
  }, [title, bands, blocks]);

  const saveToDB = useCallback(() => {
    const names = bands.map((band) => band.split(" ")[0]);
    const id = slug(title) + "@" + slug(names.join("&"));
    setDoc(doc(store, "songs", id), { title, bands, blocks });
    // if (process.env.DEPLOY_HOOK) fetch(process.env.DEPLOY_HOOK);
  }, [title, bands, blocks]);

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
            const { title, bands, blocks } = JSON.parse(string);
            return (
              <button key={`song:${n}`} onClick={() => setAll(title, bands, blocks)}>
                {title}
              </button>
            );
          })}
        </li>
      )}
    </aside>
  );
}
