import { useUser } from "@hooks"
import {
  Avatar,
  Button,
  Modal,
  styled,
  Text,
  Tooltip,
  useModal,
} from "@nextui-org/react"
import NextLink from "next/link"
import {
  Gear,
  House,
  MagnifyingGlass,
  PenNib,
  SignIn,
  Sliders,
} from "phosphor-react"
import { useCallback } from "react"

export default function Web({ children }) {
  const { user } = useUser()
  const menu = useModal()
  const toggle = useCallback(() => menu.setVisible(!menu.visible), [menu])
  return (
    <>
      <Nav>
        <Link to="#" tooltip="Configuración" onClick={toggle}>
          <Gear size={24} />
        </Link>
        <Link to="/" tooltip="Home">
          <House size={24} />
        </Link>
        <Link to="/buscar/" tooltip="Buscar">
          <MagnifyingGlass size={24} />
        </Link>
        <Link to="/estudio/" tooltip="Estudio">
          <PenNib size={24} />
        </Link>
        <Link to="/acordes/" tooltip="Acordes">
          <Sliders size={24} />
        </Link>
        <Link to="/cuenta/" tooltip="Cuenta">
          {user ? (
            <Avatar
              src={user.image}
              text={user.name || user.email}
              size="sm"
              pointer
            />
          ) : (
            <SignIn size={24} />
          )}
        </Link>
      </Nav>
      <Main>{children}</Main>
      <Modal blur {...menu.bindings}>
        <Text h4>Configuracion</Text>
        {!!user || <Button>Iniciar Sesion</Button>}
        <Button></Button>
      </Modal>
    </>
  )
}

const Nav = styled("nav", {
  position: "fixed",
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,

  width: 60,

  d: "flex",
  fd: "column",
  ai: "center",

  color: "black",
  bg: "white",

  div: { size: 60, p: 12 },
  a: { size: 36, br: 6, dflex: "center", color: "inherit" },
  "a:hover": { bg: "$link" },
  "div:first-child": { mb: "auto" },
  "div:last-child": { mt: "auto" },

  "&::before": {
    content: "",
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: 0,

    width: 10,

    linearGradient: "$rainbow",
    filter: "blur(1rem)",
  },

  "&::after": {
    content: "",
    position: "absolute",
    zIndex: -1,
    top: 0,
    bottom: 0,
    right: 0,

    width: 60,

    bg: "white",
  },
})

const Link = ({ to, tooltip, children, ...props }) => (
  <Tooltip content={tooltip} placement="right">
    <NextLink href={to} passHref>
      <a {...props}>{children}</a>
    </NextLink>
  </Tooltip>
)

const Main = styled("main", {
  position: "fixed",
  oy: "auto",
  top: 0,
  bottom: 0,
  left: 60,
  right: 60,

  // bg: "#f5faff",

  p: "4rem",
  "scrollbar-width": "none",
})
