import { useUser } from "@hooks"
import {
  Avatar,
  Button,
  Modal,
  Text,
  useModal,
  Tooltip,
} from "@nextui-org/react"
import { Main, Nav } from "@styles"
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
  const { user, loading } = useUser()
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
        {!loading && !user && <Button>Iniciar Sesion</Button>}
        <Button></Button>
      </Modal>
    </>
  )
}

const Link = ({ to, tooltip, children, ...props }) => (
  <Tooltip content={tooltip} placement="right" trigger="hover">
  <NextLink href={to} passHref>
    <a {...props}>{children}</a>
  </NextLink>
   </Tooltip>
)
