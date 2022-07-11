import Image from "next/image";
import Link from "next/link";
// import Icon from "public/undraw_page_not_found.svg";
import Layout from "src/layout";

export default function $404() {
  return (
      <Layout center>
      <h1>Not Found</h1>
      <Image src="/undraw_page_not_found.svg" alt="image" layout="responsive" width={100} height={100} />
      {/* <Link href="/">Return Home</Link> */}
    </Layout>
  );
}
