import { fetcher } from "@helpers"
import { useUser } from "@hooks"
import Web from "@layouts/web"
import { Button, Grid, Loading, Text, Link, Dropdown } from "@nextui-org/react"
import { Draft } from "@prisma"
import NextLink from "next/link"
import useSWR from "swr"

export default function Estudio() {
  // const { data, status } = useSession()
  const { user, loading } = useUser()
  const { data: docs = [] } = useSWR<Draft[]>(
    () => `api/drafts/filter/${user.id}`,
    fetcher
  )
  console.log(docs)

  if (loading) return <Loading />
  if (!user) return <Text h1>No estás logueado</Text>

  return (
    <>
      <Text h1>Estudio</Text>
      <NextLink href="editor" passHref>
        <Button color="success" shadow>
          Nueva Cancion
        </Button>
      </NextLink>
      <Dropdown>
        <Dropdown.Button flat>Sortear</Dropdown.Button>
        <Dropdown.Menu aria-label="Static Actions" selectionMode="single">
          <Dropdown.Item key="new">Alfabeticamente</Dropdown.Item>
          <Dropdown.Item key="copy">Ultimo guardado</Dropdown.Item>
          <Dropdown.Item key="edit">Ultimo creado</Dropdown.Item>
          {/* <Dropdown.Item key="delete" color="error">
            Delete file
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
      <Grid.Container gap={1}>
        {docs.map(({ id, title }) => (
          <Grid key={id}>
            <NextLink key={id} href={{ pathname: "editor", query: { id } }}>
              <Link block>{title}</Link>
            </NextLink>
          </Grid>
        ))}
      </Grid.Container>
    </>
  )
}

Estudio.Layout = Web
