import { PrismaClient } from "@prisma/client"
import Web from "@layouts/web"

export default function Perfil({ profile }) {
  return (
    <>
      <h1>Perfil</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  )
}

Perfil.Layout = Web

export async function getStaticProps({ params: { perfil: id } }) {
  const prisma = new PrismaClient()
  const profile = await prisma.profile.findUnique({ where: { id } })
  return { props: { profile } }
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  const profiles = await prisma.profile.findMany()
  const paths = profiles.map(({ id }) => ({ params: { perfil: id } }))
  return { paths, fallback: false }
}
