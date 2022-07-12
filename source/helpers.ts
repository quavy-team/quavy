// export function tag<T>(f: (x: string) => T) {
//   return ([x]: TemplateStringsArray) => f(x)
// }

export function fetcher(url: string) {
  return fetch(url).then(res => res.json())
}

export function tag<T>(f: (x: string) => T) {
  return ([x]: TemplateStringsArray) => f(x)
}

export function pluck<Key extends keyof R, R extends Record<Key, any>>(
  key: Key
) {
  return (record: R) => record[key]
}
