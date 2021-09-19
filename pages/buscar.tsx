import { collection, getDocs } from "@firebase/firestore/lite";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { store } from "src/app";
import Layout from "src/layout";
import title from "title";

interface Props {
  map: string[];
}

export default function Buscar({ map }: Props) {
  const router = useRouter();
  const search = Object.keys(router.query)[0] ?? "";
  const [value, setValue] = useState(search);

  return (
    <Layout>
      <motion.h1>Buscar Canciones</motion.h1>
      <motion.input
        placeholder="buscar canciones"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></motion.input>

      <motion.ul key="list" layout>
        <AnimatePresence>
          {map.map((id, n) => {
            console.log(id, n);
            const href = id.trim().toLowerCase().replace(/\s/g, "_");
            return (
              id.toLowerCase().includes(value.toLowerCase()) && (
                <motion.li
                  layout="position"
                  key={id}
                  custom={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 * n }}
                >
                  <Link href={href}>{title(id)}</Link>
                </motion.li>
              )
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const col = collection(store, "songs");
  const { docs } = await getDocs(col);
  const map = docs.map((doc) => doc.id);
  return { props: { map } };
}
