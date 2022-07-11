import { Grid, Input, Text } from "@nextui-org/react"
import { PrismaClient, Profile, Song } from "@prisma/client"
import { AnimatePresence, motion } from "framer-motion"
import Fuse from "fuse.js"
import Web from "layouts/web"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"

type Props = { songs: Data[] }
type Data = Song & { authors: Profile[] }

const Animatable = motion(Grid)

const animations = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
}

export default function Buscar({ songs }: Props) {
  const [matches, $matches] = useState(songs)
  const fuse = useMemo(
    () => new Fuse(songs, { keys: ["title", "authors.name"] }),
    [songs]
  )
  const search = useCallback(
    function (e) {
      const v = e.target.value as string
      $matches(v ? fuse.search(v).map((x) => x.item) : songs)
    },
    [songs, fuse]
  )

  return (
    <>
      <Text h1 css={{ textAlign: "center" }}>
        Buscar
      </Text>
      <Input
        type="search"
        placeholder="buscar canciones o autores"
        aria-label="buscar"
        size="lg"
        css={{ w: "100%" }}
        onChange={search}
      />
      <Grid.Container gap={1}>
        <AnimatePresence>
          {matches.map(({ title, id, authors }) => {
            const [author] = authors
            return (
              <Animatable
                layout
                key={id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                {...animations}>
                <Link href={id} passHref>
                  <Text blockquote>
                    <Text b>{title}</Text>
                    <br />
                    {authors.map((author) => (
                      <Text key={author.id} small>
                        @{author.name}{" "}
                      </Text>
                    ))}
                  </Text>
                </Link>
              </Animatable>
            )
          })}
        </AnimatePresence>
      </Grid.Container>
    </>
  )
}

Buscar.Layout = Web

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const options = { include: { authors: true } }
  const songs = await prisma.song.findMany(options)
  return { props: { songs } }
}
