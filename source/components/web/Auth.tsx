import { tag } from "@helpers"
import { Button, Card, Grid, Input, Text } from "@nextui-org/react"
import to from "await-to-js"
import axios from "axios"
import { signIn as signInWith } from "next-auth/react"
import { useCallback } from "react"
import { proxy, snapshot, useSnapshot } from "valtio"

interface Event {
  target: { value: string }
}

const state = proxy({
  isNew: false,
  loading: false,
  error: "",
  data: {
    email: "",
    username: "",
    password: "",
  },
})

const update = tag((k) => (e) => (state.data[k] = e.target.value))

export default function Auth() {
  const { isNew } = useSnapshot(state)
  return isNew ? <SignUp /> : <SignIn />
}

async function signIn() {
  const { username, password } = snapshot(state.data)
  signInWith("credentials", { username, password })
}

async function signUp() {
  const { email, username, password } = snapshot(state.data)

  const promise = axios.post("/api/users/create", {
    credentials: { create: { username, password } },
    email,
  })

  const [err, data] = await to(promise)
  console.log(err || data)
  if (!err) signInWith("credentials", { username, password })
}

function SignIn() {
  return (
    <Card variant="bordered">
      <Card.Header>
        <Text h1>Iniciar sesión</Text>
      </Card.Header>
      <Card.Body as="form">
        <Grid.Container gap={1}>
          <Username />
          <Password />
          <Button flat onClick={signIn}>
            Sign In
          </Button>
          <Button light onPress={() => signInWith("google")}>
            Sign in with Google
          </Button>
        </Grid.Container>
      </Card.Body>
      <Card.Footer>
        <Text small>
          Eres nuevo ?
          {/* <Text color="" onClick={() => (state.isNew = true)}>
            Sign Up
          </Text> */}
        </Text>
        <Button auto light onClick={() => (state.isNew = true)}>
          <Text small>Sign Up</Text>
        </Button>
      </Card.Footer>
    </Card>
  )
}

function SignUp() {
  return (
    <Card variant="bordered">
      {/* <Card.Header> */}
      {/* </Card.Header> */}
      <Card.Body>
        <Text h1>Crear cuenta</Text>
        <Grid.Container as="form" gap={1}>
          <Username />
          <Email />
          <Password />
          <Button auto flat onClick={signUp}>
            Sign Up
          </Button>
        </Grid.Container>
      </Card.Body>
    </Card>
  )
}

function Username() {
  const { username } = useSnapshot(state.data)
  const update = useCallback(
    (e: Event) => (state.data.username = e.target.value.toLowerCase()),
    []
  )
  return (
    <Grid>
      <Input
        aria-label="username"
        placeholder="username"
        value={username}
        onChange={update}
      />
    </Grid>
  )
}

function Email() {
  const { email } = useSnapshot(state.data)
  return (
    <Grid>
      <Input
        aria-label="email"
        placeholder="email"
        type="email"
        value={email}
        onChange={update`email`}
      />
    </Grid>
  )
}

function Password() {
  const { password } = useSnapshot(state.data)
  return (
    <Grid>
      <Input.Password
        aria-label="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={update`password`}
      />
    </Grid>
  )
}
