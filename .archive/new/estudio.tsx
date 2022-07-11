import { Link, Text } from "@nextui-org/react"
import { collection, getDocs } from "firebase/firestore/lite"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import firebase from "src/firebase"
import { proxy, useSnapshot, subscribe } from "valtio"
import state from "src/state"

const estudio = proxy({ docs: [] })

export default function Estudio() {
  const { docs } = useSnapshot(estudio)
  // const { user } = useSnapshot(state)
  const { store } = useSnapshot(firebase)

  // subscribe(state.user, async () => {
  //   if (!user) return 
  //   const [id] = user.email.split("@")
  //   const ref = collection(store, "usuarios", id, "canciones")
  //   const { docs } = await getDocs(ref)
  //   estudio.docs = docs.map((doc) => doc.data())
  // })
  // const router = useRouter();
  // const [docs, setDocs] = useState([]);
  // const { app, Auth, Firestore } = useSnapshot(firebase);
  // const auth = Auth.getAuth(app);
  // const store = Firestore.getFirestore(app);

  // auth.onAuthStateChanged(async (user) => {
  //   if (!user) return alert("Necesitas una cuenta para seguir");
  //   const [id] = user.email.split("@");
  //   const ref = collection(store, "usuarios", id, "canciones");
  //   const { docs } = await getDocs(ref);
  //   console.log(docs.map((doc) => doc.data()));
  //   setDocs(docs.map((doc) => doc.data()));
  // });

  // if (!user) return <Text>Necesitas una cuenta para seguir</Text>

  return (
    <>
      <Text>Loading studio</Text>
      <Link href="editor">Nueva Canción</Link>
      <pre>{JSON.stringify(docs, null, 1)}</pre>
    </>
  )
}
