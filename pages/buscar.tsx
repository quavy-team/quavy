import { collection, getDocs } from "@firebase/firestore/lite";
import { Card, Input, Text, useInput } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { store } from "src/app";
import Layout from "src/layout";
import { slug } from "src/utils";
import title from "title";
import { Block } from "types/estudio";

interface Song {
  title: string;
  bands: string[];
  blocks: Block[];
}
interface Props {
  docs: Song[];
}

function Song({ name, bands, transition }) {
  const [opacity, set] = useState(0);
  const href = "/canciones/" + slug(name);
  useEffect(() => set(1), []);
  return (
    <Link href={href} passHref>
      <Card css={{ width: "fit-content", m: "$4" }} style={{ opacity, transition }}>
        <Text h5>{title(name)}</Text>
        <Text h6>{title(bands.join(" & "))}</Text>
      </Card>
    </Link>
  );
}

export default function Buscar({ docs }: Props) {
  const { query } = useRouter();
  const [key] = Object.keys(query);
  const { bindings, value, setValue } = useInput(key ?? "");
  useEffect(() => console.table(docs, ["title"]), [docs]);
  useEffect(() => setValue(key), [setValue, key]);

  return (
    <Layout>
      <Text h1>Buscar canciones</Text>
      <Input
        placeholder="buscar canciones"
        bordered
        color="primary"
        css={{ bg: "white" }}
        {...bindings}
      />

      {/* <ul key="list"> */}
      {docs.map((doc, n) => { 
        const { title, bands } = doc;
        const content = title.concat(bands.join());
        const matches = value ? slug(content).includes(slug(value)) : true;
        const transition = 250 * n + "ms";
        if (matches) return <Song key={title} name={title} bands={bands} transition={transition} />;
      })}
      {/* </ul> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const col = collection(store, "songs");
  const { docs } = await getDocs(col);
  const data = docs.map((doc) => doc.data());
  return { props: { docs: data } };
}
