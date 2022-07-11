import { collection } from "@firebase/firestore/lite";
import { Card, Input, Text, useInput } from "@nextui-org/react";
import { getDocs } from "firebase/firestore/lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { store } from "src/app";
import Layout from "src/layout";
import { slug } from "src/utils";
import title from "title";
import { Props, SongProps } from "types/buscar";

function Song({ cancion, transition }: SongProps) {
  const [opacity, set] = useState(0);
  const { titulo, artistas } = cancion;
  const [artista] = artistas;
  const href = `${slug(artista)}/${slug(titulo)}`;
  useEffect(() => set(1), []);
  return (
    <Link href={href} >
      <a>
        <Card css={{ width: "fit-content", m: "$4" }} style={{ opacity, transition }}>
          <Text h5>{title(titulo)}</Text>
          <Text h6>{title(artistas.join(" & "))}</Text>
        </Card>
      </a>
    </Link>
  );
}

export default function Buscar({ canciones }: Props) {
  const { query } = useRouter();
  console.log(query);

  // const [key] = Object.keys(query);
  // const { bindings, value, setValue } = useInput(key ?? "");
  const { bindings, value, setValue } = useInput("");
  useEffect(() => console.table(canciones, ["title"]), [canciones]);
  // useEffect(() => setValue(key), [setValue, key]);

  return (
    <Layout>
      <Text h1>Buscar canciones</Text>
      <Input
        placeholder="buscar canciones"
        bordered
        color="primary"
        css={{ bg: "white" }}
        {...bindings}
      />

      {/* <ul key="list"> */}
      {canciones.map((cancion, n) => {
        const { titulo, artistas } = cancion;
        const content = titulo.concat(artistas.join());
        const matches = value ? slug(content).includes(slug(value)) : true;
        const transition = 250 * n + "ms";
        if (matches) return <Song key={`song:${n}`} cancion={cancion} transition={transition} />;
      })}
      {/* </ul> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const ref = collection(store, "artistas");
  const { docs } = await getDocs(ref);
  const artistas = docs.map((doc) => doc.id);
  const [canciones] = await Promise.all(
    artistas.map(async (artista) => {
      const ref = collection(store, "artistas", artista, "canciones");
      const { docs } = await getDocs(ref);
      return docs.map((doc) => doc.data());
    })
  );
  return { props: { canciones } };
}
