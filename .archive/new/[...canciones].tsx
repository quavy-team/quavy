import { Card, CSS, Text } from "@nextui-org/react"
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite"
import { NextSeo } from "next-seo"
import NextLink from "next/link"
import { store } from "src/app"
import { slug } from "src/utils"
import type { Canción } from "./estudio/editor"
import type { GetStaticPaths } from "next/types"

const css: CSS = {
  span: {
    bg: "none",
    "&:hover": {
      bg: "#fede55",
    },
  },
}

export default function Canciones(props: { data: Canción }) {
  const { titulo, autores, acordes, bloques } = props.data
  const subtitulo = titulo + " por " + autores.join(", ")
  return (
    <>
      <NextSeo title={titulo} description={subtitulo} />
      <Text h1>{titulo}</Text>
      <Text h2>
        {autores.map((autor, key) => (
          <>
            {key == 1 && " ft. "}
            <NextLink key={`link ${key}`} href={`/${slug(autor)}`}>
              {autor}
            </NextLink>
          </>
        ))}
      </Text>
      <header>
        {acordes.map((acorde, key) => (
          <Text b key={`acorde ${key}`}>
            |{acorde}|
          </Text>
        ))}
      </header>
      {bloques.map((bloque, key) => {
        console.log(typeof bloque.html, bloque.html)
        // const __html = bloque.html.replace(/<code>/g, "<span>");
        const __html = bloque.html
          .replace(/<mark>/g, "<span>")
          .replace(/<.?p>/g, "")
        return (
          <Card key={`bloque ${key}`} as="section">
            <Text h4>
              {bloque.titulo} &amp; Parte {bloque.rol}
            </Text>
            <Text dangerouslySetInnerHTML={{ __html }} css={css} />
            <Text h5>{bloque.rasguido}</Text>
          </Card>
        )
      })}
    </>
  )
}

export async function getStaticProps({ params }) {
  const [autor, titulo] = params.canciones
  const ref = doc(store, "autores", autor, "canciones", titulo)
  const snap = await getDoc(ref)
  const data = snap.data()
  return { props: { data } }
}

export async function getStaticPaths() {
  const ref = collection(store, "autores")
  const { docs } = await getDocs(ref)
  const paths = await docs.reduce(async (promise, autor) => {
    const array = await promise
    const ref = collection(store, "autores", autor.id, "canciones")
    const { docs } = await getDocs(ref)
    const paths = docs.map((doc) => ({
      params: { canciones: [autor.id, doc.id] },
    }))
    return array.concat(paths)
  }, Promise.resolve([] as Array<{ params: { canciones: string[] } }>))
  return { paths, fallback: false }
}
