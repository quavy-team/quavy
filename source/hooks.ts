import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"

export function useVoid(fn: Function) {
  useEffect(() => void fn(), [fn])
}

export function useUser() {
  const { data, status } = useSession()
  const { user } = data ?? {}
  const loading = status == "loading"
  return { user, loading }
}

export const useToggle = (init = false) => {
  const [state, setState] = useState(init)
  const toggle = useCallback(() => setState((state) => !state), [])
  return [state, toggle]
}
