import { useUser } from "@hooks"
import { Loading, Text } from "@nextui-org/react"
import { Draft } from "@prisma/client"
import Web from "layouts/web"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Estudio() {
  // const { data, status } = useSession()
  const { user, loading } = useUser()
  const [docs, $docs] = useState<Draft[]>([])

  useEffect(() => {
    console.log(user)
    if (!user) return
    fetch(`/api/drafts?userId=${user.id}`)
      .then((res) => res.json())
      .then((docs) => {
        console.log(docs)
        $docs(docs)
      })
  }, [user])

  if (!docs || loading) return <Loading />

  return (
    <>
      <h1>Estudio</h1>
      <Link href="editor" passHref>
        <Text blockquote>Nueva Cancion</Text>
      </Link>
      {docs.map(({ id, title }) => (
        <Link key={id} href={{ pathname: "editor", query: { id } }}>
          {title}
        </Link>
      ))}
    </>
  )
}

Estudio.Layout = Web
