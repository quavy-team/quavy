import { Aside, Header } from "@components/web"
import { Button, Card, Text } from "@nextui-org/react"
import { PrismaClient, Profile, Song } from "@prisma/client"
import type { JSONContent } from "@tiptap/react"
import Web from "@layouts/web"
import Link from "next/link"
import { Heart } from "phosphor-react"
import slug from "slug"

interface Data extends Song {
  authors: Profile[]
  lyrics: {
    title: string
    role: string
    strum: { [key: string]: string }
    json: JSONContent
  }[]
}

export default function Canción(song: Data) {
  console.log(song)
  return (
    <>
      <Text h1>{song.title}</Text>

      <Text h2>
        {song.authors.map(({ name }, i) => (
          <>
            <Link key={name} href={slug(name)}>
              {name}
            </Link>
            {++i != song.authors.length && ", "}
          </>
        ))}
      </Text>

      <Header>
        {Object.keys(song.chords).map((chord, i) => (
          <Text b key={chord + i}>
            {chord}
          </Text>
        ))}
      </Header>

      <Aside>
        <Button auto light icon={<Heart />} />
      </Aside>

      {song.lyrics.map((section, i) => (
        <Card key={`card:${i}`}>
          <Card.Body>
            {section.json.content.map((para, j) => (
              <p key={`${i}:${j}`}>
                {para.content.map((span, k) => {
                  if (!span.marks) return span.text
                  const end = para.content.findIndex(
                    (val, i) => i >= k && !val.marks
                  )
                  const nodes = para.content.splice(k, end - k)
                  return (
                    <span key={`${i}:${j}:${k}`}>
                      {nodes.map((node, m) => {
                        const types = node.marks.map((mark) => mark.type)
                        if (!types.includes("bold")) return node.text
                        return (
                          <strong key={`${i}:${j}:${k}:${m}`}>
                            {node.text}
                          </strong>
                        )
                      })}
                    </span>
                  )
                })}
              </p>
            ))}
          </Card.Body>
        </Card>
      ))}

      <pre>{JSON.stringify(song, null, 2)}</pre>
    </>
  )
}

Canción.Layout = Web

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient()
  const where = { id: params.canciones.join("/") }
  const include = { authors: true }
  return { props: await prisma.song.findUnique({ where, include }) }
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  const songs = await prisma.song.findMany({ select: { id: true } })
  const paths = songs.map((song) => ({
    params: { canciones: song.id.split("/") },
  }))
  return { paths, fallback: false }
}
