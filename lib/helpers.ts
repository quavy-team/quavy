export function tag<T>(f: (x: string) => T) {
  return ([x]: TemplateStringsArray) => f(x)
}
