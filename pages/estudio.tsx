import { Loading, Text } from "@nextui-org/react"
import { Draft } from "@prisma/client"
import Web from "layouts/web"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Estudio() {
  const { data, status } = useSession()
  const [docs, setDocs] = useState<Draft[]>([])

  useEffect(() => {
    console.log(data)
    if (!data) return
     fetch(`/api/db/drafts?userId=${data.user.id}`).then(res => res.json()).then((docs) => {
       console.log(docs)
       
    })
  }, [data])

  if (!docs || status == "loading") return <Loading />

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
