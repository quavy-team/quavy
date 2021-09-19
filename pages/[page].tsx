import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { store } from "src/app";
import Layout from "src/layout";
import title from "title";

interface Props {
  name: string;
  data: Data;
}

interface Data {
  band: string[];
  contents: Content[];
}

interface Content {
  title: string;
  role: string;
  strum: string;
  text: string;
}

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
          <Fragment key={key}>
            <Link
              href={{
                pathname: "/buscar/",
                query: band.toLowerCase().replace(/\s/g, "+"),
              }}
            >
              {title(band)}
            </Link>
            {key < band.length - 5 ? " & " : ""}
          </Fragment>
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
              {title} & {role}
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
  const snap = await getDocs(col);
  const paths = snap.docs.map((doc) => {
    const page = doc.id.trim().toLowerCase().replace(/\s/g, "_");
    return { params: { page } };
  });
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { page } = ctx.params!;
  const document = doc(store, "songs/" + page);
  const snap = await getDoc(document);
  const name = snap.id;
  const data = snap.data() ?? null;
  return data ? { props: { name, data } } : { props: { name, data }, redirect: "/404" };
};
