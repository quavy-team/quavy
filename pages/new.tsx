// import "firebase/auth"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "src/app";
import Layout from "src/layout";
import styles from "styles/studio.module.sass"

export default function New() {
  const router = useRouter();
  useEffect(() => void !auth.currentUser && router.push("/c"));
  return <Studio />;
  function Studio() {
    const [title, setTitle] = useState("");
    const [band, setBand] = useState<string>("");
    const [parrafos, setParrafos] = useState([]);
    return (
      <Layout>
        <h1>Create new Song !!</h1>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="banda, separar por comas"
          value={band}
          onChange={(e) => setBand(e.target.value)}
            />
            
        {parrafos.map((text, n) => (
          <section key={n}>
            <input type="text" placeholder="titulo" />
            <input type="text" placeholder="rol" />
            <textarea cols={30} rows={10} value={text}></textarea>
          </section>
        ))}
            
        <aside className={styles.sidebar}>
          <button
            onClick={() => {
              setParrafos(parrafos.concat());
            }}
          >
            Crear Parrafo
          </button>
          {/* <button>Crear Banda</button> */}
          <button>Crear Rasguido</button>
        </aside>
      </Layout>
    );
  }
}
