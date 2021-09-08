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
  // const
  return (
    <Layout>
      <h1>{title(name)}</h1>

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

      {contents.map((content, key) => {
        // content.text.split() 
        // const R1 = /\|.+?\|/g;
        // const R2 = /\(\(.+?\)\)/g;
        // const A1 = content.text.match(R1);
        // const A2 = content.text.match(R2);
        // todo map |A| into <i>|A|</i>

        // const map = A2?.map((para) => {
        //   const [chord] = para.match(R1)!;
        //   const array = para.split(chord)
        //   console.log(array);
        //   const string = array[0] + <i>{chord}</i> + array[1]
        //   console.log(string);
        // });

        // const itals = A1?.map((ital, n) => <i key={n}> {ital} </i>);
        // const paras = A2?.map((para, n) => <p key={n}>{para} </p>);
        // console.log(A1, A2);
        // console.log(paras, itals);

        return (
          <section key={key}>
            <h3>
              {content.title} & {content.role}
            </h3>
            <div>{content.text}</div>
            <h4>{content.strum}</h4>
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
  // if (!data) return { redirect: "/404", props: {} };
  // return { props: { name, data } };
  return data
    ? { props: { name, data } }
    : { props: { name, data }, redirect: "/404" };
};
