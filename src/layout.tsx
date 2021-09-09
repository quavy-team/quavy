import * as outline from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import React, * as react from "react";
import icons from "src/icons"

type Props = {
  children: react.ReactNode;
  className?: string;
  center?: boolean;
};
export default function Layout({ children, className, center }: Props) {
  return (
    <>
      <NavBar />
      <main className={`${className} ${center && "center"}`}>{children}</main>
    </>
  );

  function NavBar() {
    return (
      // backgroundColor: "var(--light)"
      <motion.nav>
        {/* <motion.button onClick={() => {
        }}></motion.button> */}
        <NavLink href="#" Icon={icons.Menu}>
          Menu
        </NavLink>
        <NavLink href="#" Icon={icons.Home}>
          Home
        </NavLink>
        <NavLink href="/b/" Icon={icons.Search}>
          Buscar
        </NavLink>
        <NavLink href="/i/" Icon={icons.Info}>
          About
        </NavLink>
        <NavLink href="/c/" Icon={icons.User}>
          Cuenta
        </NavLink>
      </motion.nav>
    );
  }

  function NavLink({ href, Icon, children }: any) {
    return (
      <Link href={href}>
        <a>
          <Icon />
          <p>{children}</p>
        </a>
      </Link>
    );
  }
}
