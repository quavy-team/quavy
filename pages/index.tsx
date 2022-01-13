import { Text } from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const verification = "ZZ5PyjP_GYDCeTkuTebsWOhQgdoiWH2XbJYpnxFueIk";
  return (
    // <Layout className={styles.container}>
    <>
      <Head>
        <title>Welcome to Quavy App</title>
        <meta name="google-site-verification" content={verification} />
      </Head>
      <Text h1>Welcome to Quavy App</Text>
      </>
    // </Layout>
  );
};

export default Home;
