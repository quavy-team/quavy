// import "firebase/auth"
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
  const [band, setBand] = useState([""]);
  const [contents, setContents] = useState<ContentType[]>([]);
  // const [onTipClick, setOnTipClick] = useState<any>();
  // const tooltip = createRef<HTMLSpanElement>();
  // const controls = useAnimation();
  return (
    <Layout>
      <h1>Songly Studio !!</h1>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="banda"
        value={band}
        onChange={(e) => {
          const value = e.target.value;
          const array = value.split(",");
          const map = array.map((s) => s.trim());
          setBand(map);
        }}
      />
      {/* <motion.span
        className={styles.tooltip}
        layout
        animate={controls}
        ref={tooltip}
        onClick={onTipClick}
      >
        agregar
      </motion.span> */}
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
                  // const sel = document.getSelection();
                  // if (sel) {
                  //   const rng = sel.getRangeAt(0);
                  //   const string = rng.toString();
                  //   const stuff = "((" + string + "))";
                  //   const area = e.target as HTMLElement;
                  //   const text = area.textContent!.replace(string, stuff);
                  //   onkeydown = (e) => {
                  //     if (e.key === "Enter") {
                  //       e.preventDefault();
                  //       area.textContent = text;
                  //     }
                  //   };
                  // } else {
                  const area = e.target as HTMLTextAreaElement;
                  const { selectionStart, selectionEnd } = area;
                  const selection = area.value.slice(
                    selectionStart,
                    selectionEnd
                  );
                  console.log(selection);
                  const stuff = "((" + selection + "))";
                  const text = area.value!.replace(selection, stuff);
                  console.log(text);

                  onkeydown = (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      area.value = text;
                      setText(text)
                      // setText(text);
                    }
                  };
                  // }
                  //   console.log(sel);
                  //   const { x, y } = rng.getBoundingClientRect();
                  //   const area = e.target as HTMLElement;
                  //   console.log(tooltip.current);
                  //   controls.start({ x, y: y - 50 });
                  //   setOnTipClick(() => {
                  //     area.textContent = area.textContent!.replace(
                  //       string,
                  //       stuff
                  //     );
                  //   });
                }}
              />
            </form>
          );
        }
      })}

      <aside className={styles.sidebar}>
        <button onClick={() => setContents(contents.concat({}))}>
          Crear Bloque
        </button>
        <button
          onClick={() =>
            setDoc(doc(store, "songs/" + title), { band, contents })
          }
        >
          Guardar DB
        </button>
      </aside>
    </Layout>
  );
}
