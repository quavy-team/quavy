import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "src/layout";
import styles from "styles/Home.module.sass";

const Home: NextPage = () => {
  return (
    <Layout className={styles.container}>
      <Head>
        <title>Welcome to Quavy App</title>
      </Head>
      <motion.h1 className={styles.title}>Welcome to Quavy App</motion.h1>
    </Layout>
  );
};

export default Home;
