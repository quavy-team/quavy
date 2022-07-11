import { useSession } from "next-auth/react"
import { useEffect } from "react"

export function useVoid(fn: Function) {
  useEffect(() => void fn(), [fn])
}

export function useUser() {
  const { data, status } = useSession()
  const { user } = data ?? {}
  const loading = status == "loading"
  return { user, loading }
}
