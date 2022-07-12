import { Text } from "@nextui-org/react"
// import Web from "components/web/Layout"
import Web from "@layouts/web"
import Head from "next/head"
// import

const verification = "ZZ5PyjP_GYDCeTkuTebsWOhQgdoiWH2XbJYpnxFueIk"

const Home = () => (
  <>
    <Head>
      <title>Quabit</title>
      <meta name="google-site-verification" content={verification} />
    </Head>
    <Text h1>Quabit</Text>
  </>
)

Home.Layout = Web
export default Home
