import * as solid from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import * as react from "react";

type Props = { children: react.ReactNode; className?: string, center?: boolean };
export default function Layout({ children, className, center }: Props) {
  return (
    <>
      <NavBar />
      <motion.main layout className={`${className} ${center && "center"}`}  >
        {children}
      </motion.main>
    </>
  );

  function NavBar() {
    const [hovered, setHovered] = react.useState(false);
    function NavLink({ href, Icon, children }: any) {
      // const variants = { hover: { color: "var(--link)" } };
      // variants={variants} whileHover="hover"
      return (
        <Link href={href}>
          <a>
            <Icon />
            <p>{children}</p>
            {/* <AnimatePresence>
              {hovered && (
                <motion.p
                  key={href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {children}
                </motion.p>
              )}
            </AnimatePresence> */}
          </a>
        </Link>
      );
    }

    return (
      // backgroundColor: "var(--light)"
      <motion.nav
        whileHover={{ width: "300px" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <NavLink href="#" Icon={solid.MenuIcon}>
          Menu
        </NavLink>
        <NavLink href="/" Icon={solid.HomeIcon}>
          Home
        </NavLink>
        <NavLink href="/b/" Icon={solid.SearchIcon}>
          Buscar
        </NavLink>
        <NavLink href="/i/" Icon={solid.InformationCircleIcon}>
          About
        </NavLink>
        <NavLink href="/c/" Icon={solid.UserIcon}>
          Cuenta
        </NavLink>
      </motion.nav>
    );
  }
}
