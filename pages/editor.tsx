import Tiptap from "@components/Tiptap"
import { fetcher } from "@helpers"
import { useUser } from "@hooks"
import Web from "@layouts/web"
import {
  Button,
  Col,
  Container,
  Dropdown,
  Input,
  Loading,
  Popover,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react"
import { JSONContent } from "@tiptap/react"
import to from "await-to-js"
import axios from "axios"
import { useRouter } from "next/router"
import { useCallback } from "react"
import useSWR from "swr"
import { proxy, snapshot, useSnapshot } from "valtio"

const section = {
  title: "",
  role: "",
  strum: {},
  json: {} as JSONContent,
}

const state = proxy({
  title: "",
  authors: [""],
  chords: [],
  lyrics: [section],
})

type Data = typeof state & { id: string }

export default function Editor() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading } = useUser()
  const { data } = useSWR<Data>(id && `/api/drafts/${id}`, fetcher)

  const save = useCallback(async () => {
    const promise = axios.post(`/api/drafts/update/${id}`, {
      user: { connect: { id: user.id } },
      ...snapshot(state),
    })
    const [err, res] = await to(promise)
    console.log(err, res)
  }, [id, user])

  const create = useCallback(async () => {
    const promise = axios.post("/api/drafts/create", {
      user: { connect: { id: user.id } },
      ...snapshot(state),
    })
    const [err, res] = await to(promise)
    if (res) router.replace(res.data.id)
    console.log(err, res)
  }, [router, user])

  const del = useCallback(async () => {
    const promise = axios.get(`/api/drafts/delete/${id}`)
    const [err, res] = await to(promise)
    console.log(err, res)
  }, [id])

  const copy = useCallback(async () => {
    const promise = navigator.clipboard.writeText(router.asPath)
    const [err, res] = await to(promise)
    if (err) alert("Error")
    else alert("Copiado")
    console.log(res, err)
  }, [router])

  const handleDropdown = useCallback(
    function (key) {
      if (key == "save") id ? save() : create()
      if (key == "copy") copy()
      if (key == "delete") del()
    },
    [id, save, create, copy, del]
  )

  if (data) {
    state.title = data.title
    state.authors = data.authors
    state.chords = data.chords
    state.lyrics = data.lyrics
  }

  if (loading) return <Loading />
  if (!user) return <Text>You must be logged in to edit a draft.</Text>

  return (
    <Container fluid>
      <Text h1>Editor de Canciones</Text>
      <Spacer />
      <Dropdown>
        <Dropdown.Button flat>Opciones</Dropdown.Button>
        <Dropdown.Menu aria-label="Opciones" onAction={handleDropdown}>
          <Dropdown.Item key="save">Guardar</Dropdown.Item>
          <Dropdown.Item key="copy">Copiar link</Dropdown.Item>
          {id && (
            <Dropdown.Item key="delete" color="error">
              Eliminar
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Spacer y={2} />
      <Titulo />
      <Spacer y={2} />
      <Autores />
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
      labelPlaceholder="Titulo"
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
            labelPlaceholder={!key && "Autor principal"}
            // placeholder={!key ? "autor principal" : key == 1 ? "&" : "ft."}
            labelLeft={key ? (key == 1 ? "&" : "ft.") : null}
            aria-label="autor"
            value={author}
            onChange={update(key)}
          />
          <Button.Group>
            {!!key && (
              <Button auto flat onClick={() => --state.authors.length}>
                -
              </Button>
            )}
            {authors.length == ++key && (
              <Button auto flat onClick={() => ++state.authors.length}>
                +
              </Button>
            )}
          </Button.Group>
          <Spacer y={0.5} />
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
          <Tiptap
            content={block.json as JSONContent}
            onBlur={({ editor }) => (state.lyrics[i].json = editor.getJSON())}
          />
        </Container>
      ))}
      <Button onPress={() => state.lyrics.push(section)}>Nuevo Bloque</Button>
    </>
  )
}
