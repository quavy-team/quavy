import { Button, Card, Input, SimpleColors, Text } from "@nextui-org/react"
import type { ChangeEventHandler } from "react"
import * as auth from "src/auth"
import fire from "src/fire"
import Mark from "src/Mark"
import { proxy, useSnapshot } from "valtio"

function withRegex(regex: RegExp) {
  return {
    value: "",
    status: "" as SimpleColors,
    error: "",
    focus: false,
    staleTimeout: undefined as NodeJS.Timeout,
    set timeout(timeout: NodeJS.Timeout) {
      clearTimeout(this.staleTimeout)
      this.staleTimeout = timeout
    },
    get valid() {
      return regex.test(this.value)
    },
  }
}

export const cuenta = proxy({
  isNew: false,
  displayName: "",
  // email: withRegex(/^\S+@\S+\.\S+$/g),
  email: {
    value: "",
    status: "" as SimpleColors,
    error: "",
    focus: false,
    staleTimeout: undefined as NodeJS.Timeout,
    set timeout(timeout: NodeJS.Timeout) {
      clearTimeout(this.staleTimeout)
      this.staleTimeout = timeout
    },
    get valid() {
      return /^\S+@\S+\.\S+$/g.test(this.value)
    },
  },
  // password: withRegex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g),
  password: {
    value: "",
    status: "" as SimpleColors,
    error: "",
    focus: false,
    staleTimeout: undefined as NodeJS.Timeout,
    set timeout(timeout: NodeJS.Timeout) {
      clearTimeout(this.staleTimeout)
      this.staleTimeout = timeout
    },
    get valid() {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
        this.value
      )
    },
  },
})

type Handler = ChangeEventHandler<HTMLInputElement>

function change(key: "email" | "password"): Handler {
  return (e) => {
    cuenta[key].value = e.target.value
    cuenta[key].focus = true
    cuenta[key].status = "default"
    cuenta[key].timeout = setTimeout(async () => {
      const { valid } = cuenta[key]
      cuenta[key].status = valid ? "success" : "error"
      cuenta[key].focus = false
    }, 1000)
  }
}

function willSignUp() {
  cuenta.isNew = true
}

function wontSignUp() {
  cuenta.isNew = false
}

export default function Cuenta() {
  const { currentUser } = useSnapshot(fire.auth) ?? {}
  const { isNew } = useSnapshot(cuenta)
  console.log("Cuenta", currentUser, isNew)

  if (currentUser && !currentUser.displayName) {
    return (
      <Card>
        <Card.Header>
          <Text h1>Como te llamas?</Text>
        </Card.Header>
        <Card.Body as="form" css={{ gap: 10 }}>
          <Username />
          <Button onClick={auth.updateName}>Confirmar</Button>
        </Card.Body>
      </Card>
    )
  }

  if (currentUser)
    return (
      <Card>
        <Text>
          Hola <Text color="gradient">{currentUser.displayName}</Text>
        </Text>
        <Button auto color="error" onClick={auth.signOut}>
          Cerrar sesión
        </Button>
      </Card>
    )

  if (isNew)
    return (
      <Card>
        <Card.Header>
          <Text h1>Crear Cuenta</Text>
        </Card.Header>
        <Card.Body as="form" css={{ gap: 10 }}>
          <Email />
          <Password />
          <Button onClick={auth.signUp}>Confirmar</Button>
        </Card.Body>
        <Card.Footer>
          <Text small>Ya tienes cuenta?</Text>
          <Button
            auto
            light
            color="primary"
            animated={false}
            onClick={wontSignUp}>
            Iniciar sesión
          </Button>
        </Card.Footer>
      </Card>
    )

  return (
    <Card>
      <Card.Header>
        <Text h1>Iniciar Sesión</Text>
      </Card.Header>
      <Card.Body as="form" css={{ gap: 10 }}>
        <Email />
        <Password />
        <Button onClick={auth.signIn}>Confirmar</Button>
        <Button flat onClick={auth.useGoogle}>
          Usar Google
        </Button>
      </Card.Body>
      <Card.Footer>
        <Text small>No tienes cuenta?</Text>
        <Button
          auto
          light
          color="primary"
          animated={false}
          onClick={willSignUp}>
          Crear cuenta
        </Button>
      </Card.Footer>
    </Card>
  )
}

function Email() {
  const { email } = useSnapshot(cuenta)
  return (
    <Input
      placeholder="email"
      aria-label="email"
      value={email.value}
      status={email.status}
      onChange={change("email")}
    />
  )
}

function Password() {
  const { password } = useSnapshot(cuenta)
  return (
    <Input.Password
      placeholder="contraseña"
      aria-label="contraseña"
      value={password.value}
      status={password.status}
      onChange={change("password")}
    />
  )
}

function Username() {
  const { displayName } = useSnapshot(cuenta)
  const change: Handler = (e) => (cuenta.displayName = e.target.value)
  return (
    <Input
      placeholder="username"
      aria-label="username"
      value={displayName}
      onChange={change}
    />
  )
}
