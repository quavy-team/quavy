import * as next from "@nextui-org/react";
import * as lite from "firebase/firestore/lite";
import Link from "next/link";
import { store } from "src/app";
import { slug } from "src/utils";
import { Props } from "types/canciones";

export default function Cancion(props: Props) {
  const { titulo, artistas, bloques } = props;
  return (
    <>
      {/* TITULO */}
      <next.Text h1>{titulo}</next.Text>
      {/* ARTISTAS */}
      <next.Text h2>
        {artistas.map((artista, index) => (
          <>
            <Link key={artista} href={`/${slug(artista)}`} passHref>
              <next.Link
                css={{
                  display: "inline",
                  color: "#333",
                  "&:hover": { color: "$primary" },
                }}
              >
                {artista}
              </next.Link>
            </Link>
            {index !== artistas.length - 1 && " & "}
          </>
        ))}
      </next.Text>
      {/* BLOQUES */}
      {bloques.map((bloque, index) => {
        const { verso, rol, texto } = bloque;
        const reversos = /(\(\(.+?\)\))/g;
        const reacordes = /(\|.+?\|)/g;
        const versos = texto.split(reversos);
        console.log("array: ", versos);

        const text = versos.map((text, n) => {
          if (!text.trim()) return " ";
          const texto = text.replace("((", "").replace("))", "");
          const array = texto.split(reacordes);
          console.log(array);
          const txt = array.map((word) => {
            if (!reacordes.test(word)) return word;
            const key = `tooltip:${word}:${index}.${n}`;
            return (
              <next.Tooltip key={key} content={word} trigger="click">
                <next.Text b css={{ cursor: "pointer" }}>
                  {word}
                </next.Text>
              </next.Tooltip>
            );
          });
          return (
            <next.Text
              key={`texto:${index}.${n}`}
              span
              css={{
                transition: "250ms",
                backgroundImage: "linear-gradient(transparent 60%, transparent 40%)",
                "&:hover": {
                  backgroundImage: "linear-gradient(transparent 60%, $secondary 40%)",
                  b: { color: "$primary" },
                },
              }}
            >
              {txt}
            </next.Text>
          );
        });
        return (
          <next.Card key={`bloque: ${index}`} bordered shadow={false}>
            <next.Card.Header>
              <next.Text h4>
                Verso {verso} &amp; {rol}
              </next.Text>
            </next.Card.Header>
            <next.Card.Body>
              <next.Text>{text}</next.Text>
            </next.Card.Body>
            <next.Card.Footer css={{ justifyContent: "end" }}>
              <next.Text h6>RASGUIDO</next.Text>
            </next.Card.Footer>
          </next.Card>
        );
      })}
    </>
  );
}

export async function getStaticPaths() {
  const ref = lite.collection(store, "artistas");
  const { docs } = await lite.getDocs(ref);
  const artistas = docs.map((doc) => doc.id);

  const [canciones] = await Promise.all(
    artistas.map(async (artista) => {
      const ref = lite.collection(store, "artistas", artista, "canciones");
      const { docs } = await lite.getDocs(ref);
      return docs.map((doc) => doc.id);
    })
  );

  const paths = canciones.map((cancion, index) => {
    const artista = artistas[index];
    return { params: { canciones: [artista, cancion] } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const [artista, cancion] = params.canciones;
  const ref = lite.doc(store, "artistas", artista, "canciones", cancion);
  const snap = await lite.getDoc(ref);
  return { props: snap.data() };
}
