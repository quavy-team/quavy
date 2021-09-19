import { motion } from "framer-motion";
import Link from "next/link";
import * as react from "react";
import icons from "src/icons";

type Props = {
  children: react.ReactNode;
  className?: string;
  center?: boolean;
  [key: string]: any;
};

export default function Layout({ children, className, center }: Props) {
  return (
    <>
      <NavBar />
      <Modal />
      <main className={`${className} ${center && "center"}`}>{children}</main>
    </>
  );

  function NavBar() {
    const [menuOpened, setMenuOpened] = react.useState(false);
    return (
      <motion.nav
        custom={menuOpened}
        animate={{ width: menuOpened ? 300 : 60 }}
        transition={{ when: "beforeChildren" }}
      >
        <MenuBtn
          Icon={menuOpened ? icons.Close : icons.Menu}
          onClick={() => setMenuOpened(!menuOpened)}
        />
        {menuOpened ? (
          <>
            <MenuBtn Icon={icons.Home}>Cambiar color</MenuBtn>
            <hr></hr>
            <motion.h2
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              Songly
            </motion.h2>
          </>
        ) : (
          <>
            <NavLink href="/" Icon={icons.Home}></NavLink>
            <NavLink href="/buscar/" Icon={icons.Search}></NavLink>
            {/* <NavLink href="/b/" Icon={icons.Duo}></NavLink> */}
            <NavLink href="/acordes/" Icon={icons.Chord}></NavLink>
            <NavLink href="/cuenta/" Icon={icons.LogIn}></NavLink>
          </>
        )}
      </motion.nav>
    );
  }

  function NavLink({ href, Icon }: any) {
    return (
      <Link href={href} passHref>
        <motion.a>
          <Icon />
        </motion.a>
      </Link>
    );
  }

  function MenuBtn({ children, Icon, ...props }: any) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        {...props}
      >
        <Icon />
        {children}
      </motion.button>
    );
  }

  function Modal(props: any) {
    const [_title, setTitle] = react.useState("");
    const {
      title,
      text = false,
      btn = false,
      btns = false,
      input = false,
      inputs = false,
    } = props;

    return (
      <motion.div>
        <h4>{title}</h4>
        {text && <p>{text}</p>}
        {btn && <button {...btn.props}>{btn.text}</button>}
        {btns &&
          btns.map((btn: any, n: number) => (
            <button key={n} {...btn.props}>
              {btn.text}
            </button>
          ))}
        {input && <input type="text" />}
        {inputs &&
          inputs.map((input: any, key: number) => (
            <input type="text" key={key} {...input.props} />
          ))}
      </motion.div>
    );
  }
}
