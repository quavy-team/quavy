import "@fontsource/manrope/variable.css"
import "@fontsource/metropolis/700.css"
import { globalCss, NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
import light from "src/themes"

// const NextUI = dynamic(import("/components/provider"), { ssr: false })

const stylesheet = globalCss({
  ":is(h1, h2, h3, h4, h5, h6)": {
    fontFamily: "Metropolis",
  },
})

// type AppPropsWithLayout = AppProps & {
//   Component: NextPage & {
//     Layout?: ({ children }) => JSX.Element
//   }
// }

export default function App({ Component, pageProps }) {
  const { Layout = ({ children }) => children } = Component
  const { session, ...props } = pageProps
  stylesheet()

  return (
    // <ThemeProvider attribute="class" value={themes}>
    <SessionProvider session={session}>
      <NextUIProvider theme={light}>
        <Layout>
          <Component {...props} />
        </Layout>
      </NextUIProvider>
    </SessionProvider>
    // </ThemeProvider>
  )
}
