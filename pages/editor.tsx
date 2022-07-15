import Tiptap from "@components/Tiptap"
import { fetcher } from "@helpers"
import { useUser } from "@hooks"
import Web from "@layouts/web"
import {
  Button,
  Col,
  Container,
  Input,
  Loading,
  Row,
  Spacer,
  Text
} from "@nextui-org/react"
import to from "await-to-js"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback } from "react"
import useSWR from "swr"
import { proxy, snapshot, useSnapshot } from "valtio"

const state = proxy({
  title: "",
  authors: [""],
  chords: [],
  lyrics: [{ title: "", role: "", strum: {}, json: {} }],
})

function createWith(id) {
  return () => {
    const user = { connect: { id } }
    const data = snapshot(state)
    axios.post(`/api/drafts/create`, { user, ...data })
  }
}

function save(id) {
  return async () => {
    const data = snapshot(state)
    const promise = axios.post(`/api/drafts/update/${id}`, data)
    const [err, res] = await to(promise)
    console.log(err, res)
  }
}

type Data = typeof state & { id: string }

export default function Editor() {
  const { query: q } = useRouter()
  const { user, loading } = useUser()
  const { data } = useSWR<Data>(q.id && `/api/drafts/${q.id}`, fetcher)

  if (data) {
    state.title = data.title
    state.authors = data.authors
    state.chords = data.chords
    state.lyrics = data.lyrics
  }

  // useEffect(() => {
  //   if (!query.id) return
  //   axios(`/api/drafts/${query.id}`).then(update)
  // }, [query])

  if (loading) return <Loading />
  if (!user) return <Text>You must be logged in to edit a draft.</Text>

  return (
    <Container fluid>
      <Text h1>Editor de Canciones</Text>
      <Spacer />
      <Button onPress={data ? save(data.id) : createWith(user.id)}>
        Guardar
      </Button>
      <Button onPress={() => console.log(snapshot(state))}>Loggear</Button>
      <Spacer />
      <Titulo />
      <Spacer />
      <Autores />
      <Spacer />
      <Letras />
    </Container>
  )
}

Editor.Layout = Web

function Titulo() {
  const { title } = useSnapshot(state)
  const update = useCallback((e) => (state.title = e.target.value), [])
  return (
    <Input
      placeholder="titulo"
      aria-label="titulo"
      value={title}
      onChange={update}
    />
  )
}

function Autores() {
  const { authors } = useSnapshot(state)
  const update = useCallback(
    (i) => (e) => (state.authors[i] = e.target.value),
    []
  )

  return (
    <>
      {authors.map((author, key) => (
        <>
          <Input
            // key={`autor-${key}`}
            labelPlaceholder={!key && "autor principal"}
            // placeholder={!key ? "autor principal" : key == 1 ? "&" : "ft."}
            labelLeft={key ? (key == 1 ? "&" : "ft.") : null}
            aria-label="autor"
            value={author}
            onChange={update(key)}
          />
          <Button.Group>
            {!!key && (
              <Button auto onClick={() => --state.authors.length}>
                -
              </Button>
            )}
            {authors.length == ++key && (
              <Button auto onClick={() => ++state.authors.length}>
                +
              </Button>
            )}
          </Button.Group>
          <Spacer y={0.25} />
        </>
      ))}
    </>
  )
}

function Letras() {
  const { lyrics } = useSnapshot(state)
  const update = useCallback(
    (i, k) => (e) => (state.lyrics[i][k] = e.target.value),
    []
  )

  return (
    <>
      {lyrics.map((block, i) => (
        <Container fluid key={`bloque-${i}`} gap={0}>
          <Row>
            <Col>
              <Input
                placeholder="titulo"
                aria-label="titulo"
                value={block.title}
                css={{ w: "100%" }}
                onChange={update(i, "title")}
              />
            </Col>
            <Col>
              <Input
                placeholder="rol"
                aria-label="rol"
                value={block.role}
                css={{ w: "100%" }}
                onChange={update(i, "role")}
              />
            </Col>
          </Row>
          {/* <Row> */}
            {/* <Col> */}
              <Tiptap
                content={block.json}
                // callback={(json) => (state.lyrics[i].json = json)}
                onBlur={({ editor }) => {
                  state.lyrics[i].json = editor.getJSON()
                }}
              />
            {/* </Col> */}
          {/* </Row> */}
        </Container>
      ))}
      <Button onPress={() => ++state.lyrics.length}>Nuevo Bloque</Button>
    </>
  )
}
