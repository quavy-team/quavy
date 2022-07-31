import { useUser } from "@hooks"
import {
  Avatar,
  Button,
  Card,
  Modal,
  Text,
  Tooltip,
  useModal,
  Link as UiLink
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
        <Link to="#" tip="Configuración" onClick={toggle}>
          <Gear size={24} />
        </Link>
        <Link to="/" tip="Home">
          <House size={24} />
        </Link>
        <Link to="/buscar/" tip="Buscar">
          <MagnifyingGlass size={24} />
        </Link>
        <Link to="/estudio/" tip="Estudio">
          <PenNib size={24} />
        </Link>
        <Link to="/acordes/" tip="Acordes">
          <Sliders size={24} />
        </Link>
        <Link to="/cuenta/" tip="Cuenta">
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
        <Card>
          <Card.Header css={{ jc: "center" }}>
            <Text h4>Configuracion</Text>
          </Card.Header>
          <Card.Body css={{ pt: 0 }}>
            {!loading && !user && <Button>Iniciar Sesion</Button>}
            <Button flat>Cambiar tema</Button>
          </Card.Body>
        </Card>
      </Modal>
    </>
  )
}

const Link = ({ to, tip, children, ...props }) => (
  <Tooltip content={tip} placement="right">
    <NextLink href={to} passHref>
      {/* <UiLink block {...props}>{children}</UiLink> */}
      <a {...props}>{children}</a>
    </NextLink>
  </Tooltip>
)
