import { collection, getDocs } from "@firebase/firestore/lite";
import { Card, Input, Text, useInput } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { store } from "src/app";
import Layout from "src/layout";
import { slug } from "src/utils";
import title from "title";

interface Props {
  ids: string[];
}

function Song({ id, transition }) {
  const [opacity, set] = useState(0);
  const href = "/canciones/" + slug(id);
  useEffect(() => set(1), []);
  return (
    <Card css={{ width: "fit-content", m: "$4" }} style={{ opacity, transition }}>
      <Link href={href}>{title(id)}</Link>
    </Card>
  );
}

export default function Buscar({ ids }: Props) {
  useEffect(() => console.table(ids), [ids]);
  const { query } = useRouter();
  const [key] = Object.keys(query);
  const search = useInput(key ?? "");

  return (
    <Layout>
      <Text h1>Buscar canciones</Text>
      <Input
        placeholder="buscar canciones"
        bordered
        color="primary"
        css={{bg: "white"}}
        {...search.bindings}
      />

      {/* <ul key="list"> */}
      {ids.map((id, n) => {
        const matches = slug(id).includes(slug(search.value));
        const transition = 250 * n + "ms";
        if (matches) return <Song key={id} id={id} transition={transition} />;
      })}
      {/* </ul> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const col = collection(store, "songs");
  const { docs } = await getDocs(col);
  const ids = docs.map((doc) => doc.id);
  return { props: { ids } };
}
