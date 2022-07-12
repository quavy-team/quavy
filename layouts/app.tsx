import { Avatar, Button, styled } from "@nextui-org/react"
import { useVoid } from "@hooks"
import { useSession } from "next-auth/react"
import NextLink from "next/link"
import { HouseSimple, SignIn } from "phosphor-react"
import { useState } from "react"

export default function App({ children }) {
  const { data, status } = useSession()
  const [installed, setInstalled] = useState(false)

  useVoid(async () => {
    setInstalled(matchMedia("(display-mode: standalone)").matches)
  })

  return (
    <>
      <Header>
        {installed || <Install />}
        <Link
          to="/"
          Icon={
            data
              ? () => <Avatar src={data.user.image} alt={data.user.name} />
              : SignIn
          }
        />
      </Header>
      <Main>{children}</Main>
      <Nav>
        <Link to="/" Icon={HouseSimple} />
        <Link to="/" Icon={HouseSimple} />
        <Link to="/" Icon={HouseSimple} />
      </Nav>
    </>
  )
}

const download = () => {}

const Install = () => {
  return <Button onClick={download}>Download</Button>
}

const Link = ({ to, Icon }) => (
  <NextLink href={to}>
    <a>
      <Icon />
    </a>
  </NextLink>
)

const Header = styled("header", {
  position: "fixed",
  inset: "0 0 auto",

  h: 60,
  px: 12,

  d: "flex",
  ai: "center",
  jc: "space-between",
})

const Main = styled("main", {
  position: "fixed",
  inset: 0,
  top: 60,
  bottom: 60,
})

const Nav = styled("nav", {
  position: "fixed",
  inset: "auto 30px 30px",

  height: 60,
  br: 12,

  color: "white",
  bg: "$accent",

  d: "flex",
  ai: "center",
  jc: "space-evenly"
})
