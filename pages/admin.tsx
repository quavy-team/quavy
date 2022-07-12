import { Text } from "@nextui-org/react"
import { Draft, PrismaClient, Song } from "@prisma/client"
import Web from "@layouts/web"
import { useUser } from "@hooks"

interface Props {
  drafts: Draft[]
  songs: Song[]
}

export default function Admin({ drafts, songs }: Props) {
  const { user } = useUser()
  if (!user || !user.admin) return <Text>Access Denied</Text>

  return (
    <>
      <Text h1>Admin Dashboard</Text>
      <pre>
        {JSON.stringify(drafts, null, 2)}
        {JSON.stringify(songs, null, 2)}
      </pre>
    </>
  )
}

Admin.Layout = Web

export async function getServerSideProps() {
  const prisma = new PrismaClient()
  const drafts = await prisma.draft.findMany()
  const songs = await prisma.song.findMany()
  return { props: { drafts, songs } }
}
