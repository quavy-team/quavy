import { fetcher } from "@helpers"
import { useUser } from "@hooks"
import Web from "@layouts/web"
import { Loading, Text } from "@nextui-org/react"
import { Draft } from "@prisma"
import Link from "next/link"
import useSWR from "swr"

export default function Estudio() {
  // const { data, status } = useSession()
  const { user, loading } = useUser()
  const { data: docs = [] } = useSWR<Draft[]>(
    () => `api/drafts/filter/${user.id}`,
    fetcher
  )
  console.log(docs)
  // const [docs, $docs] = useState<Draft[]>([])

  // useEffect(() => {
  //   console.log(user)
  //   if (!user) return
  //   fetch(`/api/drafts?userId=${user.id}`)
  //     .then((res) => res.json())
  //     .then((docs) => {
  //       console.log(docs)
  //       $docs(docs)
  //     })
  // }, [user])

  if (loading) return <Loading />
  if (!user) return <Text h1>No estás logueado</Text>

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
