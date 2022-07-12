import { signOut, useSession } from "next-auth/react"
// import GoogleIcon from "public/icons/"
import {
  Button,
  Card,
  Input,
  Loading,
  Modal,
  Text,
  useModal
} from "@nextui-org/react"
import type * as Prisma from "@prisma/client"
// import Auth from "source/components/web/Auth"
import { Auth as Authenticate } from "@components/web"
import { useUser } from "@hooks"
import Web from "@layouts/web"
import { useEffect } from "react"
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

// const fetcher = (url) => axios.get(url).then(res => res.data)

export default function Cuenta() {
  const { name, submitting, songs } = useSnapshot(state)
  const { user, loading } = useUser()
  // const { songs, error } = useSWR(`/api/songs?userId=${user.id}`, fetcher)
  const nameModal = useModal()
  const verifyModal = useModal()
  console.log(songs)

  useEffect(() => {
    if (!user) return
    fetch(`/api/songs?userId=${user.id}`)
      .then((res) => res.json())
      .then((songs) => {
        console.log(songs)
        state.songs = songs
      })
  }, [user])

  // useVoid(async () => {
  //   if (!data) return
  //   const res = await fetch("/api/songs")
  //   state.songs = await res.json()
  // })

  if (loading) return <Loading />
  if (!user) return <Authenticate />

  return (
    <Card css={{ mx: "auto" }}>
      <Card.Header>
        <Text h1>Hola {user.name}</Text>
      </Card.Header>
      <Card.Body>
        <pre>{JSON.stringify(user, null, 2)}</pre>
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
        <Input labelPlaceholder="nombre" value={name} onChange={updateName} />
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

Cuenta.Layout = Web
