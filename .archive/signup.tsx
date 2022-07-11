import { Button, FormElement, Input } from "@nextui-org/react"
import { signIn, useSession } from "next-auth/react"
import { ChangeEventHandler } from "react"
import { proxy, snapshot, useSnapshot } from "valtio"
import until from "zuwarten"

const state = proxy({
  email: "",
  username: "",
  password: "",
})

function updateState(of: string): ChangeEventHandler<FormElement> {
  return (e) => (state[of] = e.target.value)
}

async function submit() {
  const { username, email, password } = snapshot(state)
  const promise = fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
    headers: { "Content-Type": "application/json" },
  })
  const [res, err] = await until(promise)
  if (res.ok) signIn("credentials", { email, password })
  console.log(res, err, await res.json())
}

export default function SignUp() {
  const { data, status } = useSession()
  const { username, email, password } = useSnapshot(state)
  if (!data)
    return (
      <>
        <Input
          labelPlaceholder="username"
          value={username}
          onChange={updateState("username")}
        />
        <Input
          labelPlaceholder="email"
          value={email}
          onChange={updateState("email")}
        />
        <Input
          labelPlaceholder="password"
          value={password}
          onChange={updateState("password")}
        />
        <Button onClick={submit}>Sign Up</Button>
      </>
    )
  else
    return (
      <>
        <h1>Hello {data.user.name}</h1>
      </>
    )
}
