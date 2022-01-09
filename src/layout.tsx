import { Button, Modal, Text, Tooltip, useModal } from "@nextui-org/react";
import NextLink from "next/link";
import * as react from "react";
import * as icons from "react-iconly";
import Main from "src/main";
import Nav from "src/nav";
import { slug } from "./utils";

type Props = {
  children: react.ReactNode;
  [key: string]: any;
};

export default function Layout({ children }: Props) {
  // const [desktop, setDesktop] = react.useState(false);
  const modal = useModal(false);
  // react.useEffect(() => {
  //   const installed = window.matchMedia("(display-mode: standalone)").matches;
  //   const { width, height } = window.screen;
  //   setDesktop(!!(width / height));
  // }, []);

  return (
    <>
      {/* {installed ?  : <header></header>} */}
      <NavBar openModal={() => modal.setVisible(true)} />
      <Menu bindings={modal.bindings} />
      <Main>{children}</Main>
    </>
  );
}

function NavBar({ openModal }) {
  return (
    <Nav>
      <NavLink href="#" Icon={icons.Setting} onClick={openModal}>
        Menu
      </NavLink>
      <NavLink href="/" Icon={icons.Home}>
        Home
      </NavLink>
      <NavLink href="/buscar/" Icon={icons.Search}>
        Buscar
      </NavLink>
      <NavLink href="/estudio/" Icon={icons.EditSquare}>
        Estudio
      </NavLink>
      <NavLink href="/acordes/" Icon={icons.Filter}>
        Acordes
      </NavLink>
      <NavLink href="/cuenta/" Icon={icons.Login}>
        Cuenta
      </NavLink>
    </Nav>
  );
}

function NavLink({ children, href, Icon, ...props }: any) {
  const [portrait, setPortrait] = react.useState(false);
  const [active, setActive] = react.useState(false);
  react.useEffect(() => {
    setPortrait(matchMedia("(orientation: portrait)").matches);
    const path = location.pathname.slice(1);
    setActive(path == slug(children) || (!path && children == "Home"));
  }, []);

  if (portrait)
    return (
        <NextLink href={href} passHref>
          <a style={{background: active ? "#fff3" : ""}} {...props}>
          <Icon set="bold" />

            {active && <Text color="white">{children}</Text>}
          </a>
        </NextLink>
    );
  return (
    <NextLink href={href}>
      <a {...props}>
        <Tooltip content={children} color="primary" placement="right">
          <Icon set="bold" />
        </Tooltip>
      </a>
    </NextLink>
  );
}

function Menu({ bindings }) {
  return (
    <Modal closeButton blur {...bindings}>
      <Modal.Header>
        <Text h4>Settings</Text>
      </Modal.Header>
      <Modal.Body>
        <Button>Cambiar color</Button>
        <Button>Tema oscuro</Button>
        <Button>Iniciar sesion</Button>
      </Modal.Body>
    </Modal>
  );
}
