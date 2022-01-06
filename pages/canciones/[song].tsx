/// <reference path="../../src/songs.d.ts" />
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { store } from "src/app";
import Layout from "src/layout";
import { slug } from "src/utils";
import title from "title";

export default function Cancion({ name, data }: Props) {
  const { band, contents } = data;
  console.log(band);

  return (
    <Layout>
      <Head>
        <title>{title(name)}</title>
      </Head>
      <h1>{title(name)}</h1>

      <h2>
        {band.map((band, key) => (
          <>
            <Link
              href={{
                pathname: "/buscar",
                query: band.toLowerCase().replace(/\s/g, "+"),
              }}
            >
              {title(band)}
            </Link>
            {key < band.length - 5 ? " & " : ""}
          </>
        ))}
      </h2>

      {contents.map((content, key) => {
        const { title, role, strum } = content;
        const sentences = content.text.match(/\(\(.+?\)\)/g)!;
        const text = sentences.map((sentence, n) => {
          const text = sentence.replace(/\(|\)/g, "");
          const [ital] = text.match(/\|.+?\|/g)!;
          const [before, after] = text.split(ital);
          return (
            <p key={n}>
              {before}
              <i>{ital}</i>
              {after}
            </p>
          );
        });

        return (
          <section key={key}>
            <h3>
              {title} &amp; {role}
            </h3>
            <div>{text}</div>
            <h4>{strum}</h4>
          </section>
        );
      })}

      <pre>{JSON.stringify(data, null, 1)}</pre>
    </Layout>
  );
}

export async function getStaticPaths() {
  const col = collection(store, "songs");
  const { docs } = await getDocs(col);
  const paths = docs.map((doc) => {
    const song = slug(doc.id);
    return { params: { song } };
  });
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { song } = params;
  const document = doc(store, "songs/" + song);
  const snap = await getDoc(document);
  const name = snap.id;
  const data = snap.data() ?? null;
  return data ? { props: { name, data } } : { props: { name, data }, redirect: "/404" };
};
