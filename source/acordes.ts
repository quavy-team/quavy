const acordes = ["A", "B", "C", "D", "E", "F", "G"]

// export default acordes.reduce((array, acorde) => {
//   return array.concat([
//     `${acorde}m`,
//     `${acorde}b`,
//     `${acorde}#`,
//     `${acorde}5`,
//     `${acorde}7`,
//     `${acorde}9`,
//   ])
// }, acordes)

export default acordes.flatMap((acorde) => [
  `${acorde}`,
  `${acorde}m`,
  `${acorde}b`,
  `${acorde}#`,
  `${acorde}5`,
  `${acorde}7`,
  `${acorde}9`,
])
