import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "src/layout";
import styles from "styles/Home.module.sass";

const Home: NextPage = () => {
  const verification = "ZZ5PyjP_GYDCeTkuTebsWOhQgdoiWH2XbJYpnxFueIk";
  return (
    <Layout className={styles.container}>
      <Head>
        <title>Welcome to Quavy App</title>
        <meta name="google-site-verification" content={verification} />
      </Head>
      <motion.h1 className={styles.title}>Welcome to Quavy App</motion.h1>
    </Layout>
  );
};

export default Home;
