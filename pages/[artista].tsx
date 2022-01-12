import { Link, Text } from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore/lite";
import NextLink from "next/link";
import { store } from "src/app";
import { slug } from "src/utils";
import title from "title";
import { Cancion } from "types/buscar";

interface Props {
  artista: string;
  canciones: Cancion[]
}

export default function Artista(props: Props) {
  const { artista, canciones } = props;
  return (
    <>
      <Text h1>{title(artista)}</Text>
      {canciones.map((cancion, n) => (
        <NextLink key={`cancion:${n}`} href={`${slug(artista)}/${slug(cancion.titulo)}`} passHref>
          <Link>{cancion.titulo}</Link>
        </NextLink>
      ))}
    </>
  );
}

export async function getStaticPaths() {
  const ref = collection(store, "artistas");
  const { docs } = await getDocs(ref);
  const ids = docs.map((doc) => doc.id);
  const paths = ids.map((artista) => ({ params: { artista } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { artista } = params;
  const ref = collection(store, "artistas", artista, "canciones");
  const { docs } = await getDocs(ref);
  const canciones = docs.map((doc) => doc.data());
  return {
    props: {
      artista,
      canciones,
    },
  };
}
