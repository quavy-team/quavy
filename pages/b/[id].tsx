import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { GetStaticProps } from "next";
import Link from "next/link";
import { store } from "src/app";
import Layout from "src/layout";
import title from "title";

interface Props {
  name: string;
  data: Data;
}

interface Data {
  band: string | string[];
}

export default function Cancion({ name, data }: Props) {
  const { band } = data;
  return (
    <Layout>
      <h1>{title(name)}</h1>
      {typeof band === "string" ? (
        <h2>{title(band)}</h2>
      ) : (
        <h2>
          {band.map((band) => (
            <Link
              // href={"/b?" + band.toLowerCase().replace(/\s/, "+")}
              key={band}
              href={{
                pathname: "/b/",
                query: band.toLowerCase().replace(/\s/g, "+"),
              }}
            >
              {title(band)}
            </Link>
          ))}
        </h2>
      )}
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </Layout>
  );
}

export async function getStaticPaths() {
  const col = collection(store, "songs");
  const snap = await getDocs(col);
  const paths = snap.docs.map((doc) => {
    const id = doc.id.toLowerCase().replace(/\s/, "+");
    return { params: { id } };
  });
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params!;
  const document = doc(store, "songs/" + id);
  const snap = await getDoc(document);
  const name = snap.id;
  const data = snap.data() ?? null;
  // if (!data) return { redirect: "/404", props: {} };
  // return { props: { name, data } };
  return data
    ? { props: { name, data } }
    : { props: { name, data }, redirect: "/404" };
};
