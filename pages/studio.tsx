// import "firebase/auth"
import { PlusIcon } from "@heroicons/react/outline";
import { doc, setDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, store } from "src/app";
import Layout from "src/layout";
import styles from "styles/studio.module.sass";

type ContentType = {
  title?: string;
  role?: string;
  strum?: string;
  text?: string;
};

export default function Studio() {
  const router = useRouter();
  useEffect(() => void !auth.currentUser && router.push("/c"));
  const [title, setTitle] = useState("");
  const [bands, setBand] = useState([""]);
  const [contents, setContents] = useState<ContentType[]>([]);

  // entries().then(console.log);

  return (
    <Layout>
      <h1>Quavy Studio !!</h1>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span>
        {/* {bands.map((band, key) => {
          const handleChange = (e: any) => setBand(((bands[key] = e.target.value), bands));
          return (
            <input key={key} type="text" placeholder="banda" value={band} onChange={handleChange} />
          );
        })} */}

        <input
        type="text"
        placeholder="banda"
        value={bands}
        onChange={(e) => {
          const value = e.target.value;
          const array = value.split(",");
          const map = array.map((s) => s.trim());
          setBand(map);
        }}
        />
        {/* <button onClick={() => setBand(bands.concat(""))}>
          <PlusIcon />
        </button> */}
      </span>
      {contents.map((content, key) => {
        return <Block content={content} key={key} />;

        function Block({ content }: { content: ContentType }) {
          const [title, setTitle] = useState(content.title);
          const [role, setRole] = useState(content.role);
          const [strum, setStrum] = useState(content.strum);
          const [text, setText] = useState(content.text);

          return (
            <form
              className={styles.block}
              onChange={() => {
                // const array = [...contents]
                // array[key] = { title, role, strum, text };
                // setContents(array)
                contents[key] = { title, role, strum, text };
              }}
            >
              <input
                type="text"
                placeholder="titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="rol"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <input
                type="text"
                placeholder="rasguido"
                value={strum}
                onChange={(e) => setStrum(e.target.value)}
              />
              <textarea
                // contentEditable
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => {
                  const node = e.target as HTMLTextAreaElement;
                  const text = node.value;
                  text && setText(text);
                }}
                onSelect={(e) => {
                  const area = e.target as HTMLTextAreaElement;
                  const { selectionStart, selectionEnd } = area;
                  const selection = area.value.slice(selectionStart, selectionEnd);
                  console.log(selection);
                  const stuff = "((" + selection + "))";
                  const text = area.value!.replace(selection, stuff);
                  console.log(text);

                  onkeydown = (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      area.value = text;
                      setText(text);
                    }
                  };
                }}
              />
            </form>
          );
        }
      })}

      <aside className={styles.sidebar}>
        <button onClick={() => setContents(contents.concat({}))}>Crear Bloque</button>
        <button
          onClick={() => {
            const songs = localStorage.getItem("songs");
            const song = { title, data: { band: bands, contents } };
            const string = JSON.stringify(song);
            // const object =
            songs
              ? (() => {
                  const array = Array.from(songs);
                  const boolean = array.includes(JSON.stringify(song));
                  const index = array.indexOf(string);
                  boolean ? (array[index] = string) : array.push(string);
                  localStorage.setItem("songs", JSON.stringify(array));
                })()
              : (() => {
                  localStorage.setItem("songs", JSON.stringify([string]));
                })();
          }}
        >
          Guardar local
        </button>
        <button
          onClick={() => {
            setDoc(doc(store, "songs/" + title), { band: bands, contents });
            if (process.env.DEPLOY_HOOK) fetch(process.env.DEPLOY_HOOK);
          }}
        >
          Guardar DB
        </button>
        {typeof localStorage !== "undefined"
          ? ((item) => {
              if (!item) return;
              const array = JSON.parse(item) as string[];
              return (
                <li>
                  {array.map((string, n) => {
                    const { title, data } = JSON.parse(string);
                    const { band, contents } = data;
                    return (
                      <button
                        key={n}
                        onClick={() => {
                          setTitle(title);
                          setBand(band);
                          setContents(contents);
                        }}
                      >
                        {title}
                      </button>
                    );
                  })}
                </li>
              );
            })(localStorage.getItem("songs"))
          : false}
      </aside>
    </Layout>
  );
}
