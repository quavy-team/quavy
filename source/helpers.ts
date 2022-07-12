// export function tag<T>(f: (x: string) => T) {
//   return ([x]: TemplateStringsArray) => f(x)
// }

export function tag<T>(f: (x: string) => T) {
  return ([x]: TemplateStringsArray) => f(x)
}

export function pluck<Key extends keyof R, R extends Record<Key, any>>(
  key: Key
) {
  return (record: R) => record[key]
}
