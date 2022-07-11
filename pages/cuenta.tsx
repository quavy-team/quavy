import { signOut, useSession } from "next-auth/react"
// import GoogleIcon from "public/icons/"
import {
  Button,
  Card,
  Input,
  Loading,
  Modal,
  Text,
  useModal,
} from "@nextui-org/react"
import type * as Prisma from "@prisma/client"
// import Auth from "source/components/web/Auth"
import {Auth} from "@components/web"
import Web from "layouts/web"
import { useVoid } from "lib/hooks"
import { proxy, snapshot, useSnapshot } from "valtio"

const state = proxy({
  name: "",
  submitting: false,
  songs: [] as Prisma.Song[],
})

function updateName(e) {
  state.name = e.target.value
}

async function submitName() {
  const name = snapshot(state)
  const res = await fetch("/api/auth/name", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" },
  })
  const user: Prisma.User = await res.json()
  console.log(user)
}

export default function Cuenta() {
  const { data, status } = useSession()
  const { name, submitting, songs } = useSnapshot(state)
  const nameModal = useModal()
  const verifyModal = useModal()
  console.log(data, status)
  console.log(songs)

  useVoid(async () => {
    if (!data) return
    const res = await fetch("/api/songs")
    state.songs = await res.json()
  })

  switch (status) {
    case "loading":
      return <Loading />
    case "unauthenticated":
      return <Auth />
    default:
      return (
        <Card css={{mx: "auto"}}>
          <Card.Header>
          <Text h1>Hola {data.user.name}</Text>
          </Card.Header>
          <Card.Body>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button auto color="error" onPress={() => signOut()}>
            Sign out
          </Button>

          <Button auto onPress={() => nameModal.setVisible(true)}>
            Cambiar Nombre
          </Button>

          <Button auto onPress={() => verifyModal.setVisible(true)}>
            Verificar email
          </Button>
          </Card.Body>

          <Modal {...nameModal.bindings}>
            <h4>Cambiar nombre</h4>
            <Input
              labelPlaceholder="nombre"
              value={name}
              onChange={updateName}
            />
            <Button onPress={submitName}>
              {submitting ? <Loading /> : "Cambiar nombre"}
            </Button>
          </Modal>

          <Modal {...verifyModal.bindings}>
            <h4>Verificar email</h4>
            <h5>Elegir un proveedor</h5>

            {submitting ? <Loading /> : "Linkear cuenta"}
          </Modal>
        </Card>
      )
  }
}

Cuenta.Layout = Web
