import { collection, getDocs, getFirestore } from "@firebase/firestore/lite";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "src/layout";
import title from "title";

interface Props {
  map: string[];
}

export default function Buscar({ map }: Props) {
  const router = useRouter();
  const search = Object.keys(router.query)[0] ?? "";
  const [value, setValue] = useState(search);

  const variants = {
    visible: (custom: string) => ({
      opacity: custom.toLowerCase().includes(value.toLowerCase()) ? 1 : 0,
      // display: custom.toLowerCase().includes(value.toLowerCase())
      //   ? "block"
      //   : "none",
    }),
  };

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
            const href = "/b/" + id.trim().toLowerCase().replace(/\s/g, "_");
            return (
              id.toLowerCase().includes(value.toLowerCase()) && (
                <motion.li
                  layout="position"
                  key={id}
                  custom={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 * n }}
                  // animate="visible"
                  // variants={variants}
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
  let app: FirebaseApp;
  try {
    app = getApp();
  } catch {
    app = initializeApp({
      projectId: "songly-app",
      apiKey: "AIzaSyCX7S0DI914qrmCz77IRqVZj-AcSB5sdI4",
      authDomain: "songly-app.firebaseapp.com",
      storageBucket: "songly-app.appspot.com",
      messagingSenderId: "458151422818",
      appId: "1:458151422818:web:89cc96f51e90d2afa21a3b",
      measurementId: "G-Y6FLDCFD8E",
    });
  }

  const store = getFirestore(app);
  const col = collection(store, "songs");
  const snap = await getDocs(col);
  const map = snap.docs.map((doc) => doc.id);
  return { props: { map } };
}
