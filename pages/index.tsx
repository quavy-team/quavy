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
        <title>Welcome to Songly App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.h1 className={styles.title}>Welcome to Songly App</motion.h1>
      <Link href="/b/" passHref>
        <motion.a layout layoutId="title">
          Buscar canciones
        </motion.a>
      </Link>
    </Layout>
  );
};

export default Home;
