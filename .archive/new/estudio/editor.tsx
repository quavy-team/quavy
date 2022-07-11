import { Button, Card, Grid, Input, Spacer } from "@nextui-org/react"
import { addDoc, collection, doc, setDoc } from "firebase/firestore/lite"
import dynamic from "next/dynamic"
import { Plus, X } from "phosphor-react"
import slug from "slug"
import firebase from "src/firebase"
import { handle } from "src/utils"
import Header from "styles/Header"
import { proxy, snapshot, useSnapshot } from "valtio"
import options from "src/acordes"

const Editor = dynamic(import("components/Tiptap"))

const BLOQUE = {
  titulo: "",
  rol: "",
  html: "",
  rasguido: "",
}

const store = proxy({
  titulo: "",
  autores: [""],
  acordes: [""],
  bloques: [BLOQUE],
})

export type Canción = typeof store

async function save() {
  // return console.log(snapshot(store));
  const { app, Auth, Firestore } = snapshot(firebase)
  const { currentUser: user } = Auth.getAuth(app)
  if (!user) return alert("Necesitas una cuenta para seguir")
  const db = Firestore.getFirestore(app)
  const [id] = user.email.split("@")
  const snap = snapshot(store)
  console.log(snap)

  if (id == "quavy.co") {
    const { titulo, autores } = snap
    const [autor] = autores
    const ref = doc(db, "autores", slug(autor), "canciones", slug(titulo))
    const [res, err] = await handle(setDoc(ref, snap))
    alert(err || "Publicada con éxito!")
    console.log(res, err)
  } else {
    const ref = collection(db, "usuarios", id, "canciones")
    const [res, err] = await handle(addDoc(ref, snap))
    alert(err || "Guardada con éxito!")
    console.log(res, err)
  }
}

export default function Nueva() {
  const { titulo } = useSnapshot(store)
  // TODO - auto save on localStorage

  return (
    <>
      {/* <Button auto onClick={() => store.undo()}>Undo</Button> */}
      {/* <Button auto onClick={() => store.redo()}>Redo</Button> */}
      <Button onClick={save}>Guardar</Button>
      <Spacer />
      <Card>
        <Grid.Container direction="column" gap={1}>
          <Grid>
            <Input
              placeholder="Titulo"
              aria-label={titulo || "Titulo"}
              value={titulo}
              onChange={(e) => (store.titulo = e.target.value)}
            />
          </Grid>
          <Autores />
        </Grid.Container>
      </Card>
      <Spacer />
      <Card>
        <Acordes />
      </Card>
      <Spacer />
      <Bloques />
    </>
  )
}

function Autores() {
  const { autores } = useSnapshot(store)
  return (
    // <Grid.Container direction="column" gap={1}>
    <>
      {autores.map((autor, key, { length }) => (
        <Grid key={`autor ${key}`} css={{ d: "flex" }}>
          <Input
            labelLeft={key == 1 ? "ft." : key ? "&" : ""}
            placeholder="Autor"
            aria-label={autor || "Autor"}
            value={autor}
            onChange={(e) => (store.autores[key] = e.target.value)}
          />
          {key == --length && (
            <Button.Group>
              <Button auto onClick={() => ++store.autores.length}>
                <Plus weight="bold" />
              </Button>
              {length && (
                <Button auto onClick={() => --store.autores.length}>
                  <X weight="bold" />
                </Button>
              )}
            </Button.Group>
          )}
        </Grid>
      ))}
    </>
    // </Grid.Container>
  )
}

function Acordes() {
  const { acordes } = useSnapshot(store)
  return (
    <Header>
      {acordes.map((acorde, key) => {
        const color = acorde
          ? options.includes(acorde)
            ? "success"
            : "error"
          : "primary"
        return (
          <Input
            key={`acorde ${key}`}
            placeholder="acorde"
            aria-label="acorde"
            list="acordes"
            bordered
            // color="primary"
            color={color}
            // width="100px"
            value={acorde}
            onChange={(e) => (store.acordes[key] = e.target.value)}
          />
        )
      })}
      <datalist id="acordes">
        {options.map((option, key) => (
          <option key={key} value={option} />
        ))}
      </datalist>
      <Button.Group>
        <Button auto onClick={() => ++store.acordes.length}>
          <Plus weight="bold" />
        </Button>
        {acordes.length > 1 && (
          <Button auto onClick={() => --store.acordes.length}>
            <X weight="bold" />
          </Button>
        )}
      </Button.Group>
    </Header>
  )
}

function Bloques() {
  const { bloques } = useSnapshot(store)
  function updateHTML(key) {
    return (html) => (store.bloques[key].html = html)
  }

  return (
    <Grid.Container direction="column" gap={1}>
      {bloques.map((bloque, key) => (
        // <Grid key={`bloque ${key}`}>
        <>
          <Card key={`bloque ${key}`}>
            <Grid.Container direction="column" gap={1}>
              {/* TITULO & PARTE */}
              <Grid.Container gap={1}>
                <Grid>
                  <Input
                    placeholder="titulo"
                    aria-label="titulo"
                    value={bloque.titulo}
                    onChange={(e) =>
                      (store.bloques[key].titulo = e.target.value)
                    }
                  />
                </Grid>
                <Grid>
                  <Input
                    labelLeft="Parte"
                    aria-label="parte"
                    value={bloque.rol}
                    onChange={(e) => (store.bloques[key].rol = e.target.value)}
                  />
                </Grid>
              </Grid.Container>
              <Grid>
                <Grid css={{ bg: "$accents0", br: "$base" }}>
                  <Editor callback={updateHTML(key)} />
                </Grid>
              </Grid>
              <Grid>
                <Input
                  labelLeft="Rasgueo"
                  aria-label="Rasgueo"
                  value={bloque.rasguido}
                  onChange={(e) =>
                    (store.bloques[key].rasguido = e.target.value)
                  }
                />
              </Grid>
            </Grid.Container>
          </Card>
          <Spacer />
        </>
        // </Grid>
      ))}
      {store.bloques.length > 1 && (
        <>
          <Button auto onClick={() => --store.bloques.length}>
            Eliminar Bloque
          </Button>
          <Spacer />
        </>
      )}
      <Button auto onClick={() => store.bloques.push({ ...BLOQUE })}>
        Nuevo Bloque
      </Button>
    </Grid.Container>
  )
}
