import { tag } from "@helpers"
import { Button, Card, Container, Input, Row, Text } from "@nextui-org/react"
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
  const { email, ...data } = snapshot(state.data)
  signInWith("credentials", { ...data })
}

async function signUp() {
  const { email, username, password } = snapshot(state.data)

  const promise = axios.post("/api/users/create", {
    credentials: { create: { username, password } },
    email,
  })

  const [err, data] = await to(promise)
  console.log(err || data)
  if (!err) signIn()
}

function SignIn() {
  return (
    <Card variant="bordered">
      <Card.Header>
        <Text h1>Iniciar sesión</Text>
      </Card.Header>
      <Card.Body as="form">
        <Container fluid gap={1}>
          <Username />
          <Password />
          <Button flat onClick={signIn}>
            Sign In
          </Button>
          <Button light onPress={() => signInWith("google")}>
            Sign in with Google
          </Button>
        </Container>
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
      <Card.Header>
        <Text h1>Crear cuenta</Text>
      </Card.Header>
      <Card.Body as="form">
        <Username />
        <Email />
        <Password />
        <Button auto flat onClick={signUp}>
          Sign Up
        </Button>
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
    <Row>
      <Input
        aria-label="username"
        placeholder="username"
        value={username}
        onChange={update}
      />
    </Row>
  )
}

function Email() {
  const { email } = useSnapshot(state.data)
  return (
    <Row>
      <Input
        aria-label="email"
        placeholder="email"
        type="email"
        value={email}
        onChange={update`email`}
      />
    </Row>
  )
}

function Password() {
  const { password } = useSnapshot(state.data)
  return (
    <Row>
      <Input.Password
        aria-label="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={update`password`}
      />
    </Row>
  )
}
