require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/13/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  let result = 0
  let current = []
  const answers = []
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    if (line === "" || i === arr.length - 1) {
      let i = 0
      let j = 1
      let found = false
      while (j < current.length) {
        const save = j
        while (current[i] === current[j]) {
          i--
          j++
          if (i < 0 || j === current.length) {
            result += 100 * save
            answers.push([save, "h"])
            found = true
            break
          }
        }
        i = save
        j = save + 1
        if (found) break
      }
      i = 0
      j = 1
      while (!found && j < current[0].length) {
        const save = j
        while (current.reduce((acc, cur) => acc + cur[i], "") === current.reduce((acc, cur) => acc + cur[j], "")) {
          i--
          j++
          if (i < 0 || j === current[0].length) {
            result += save
            answers.push([save, "v"])
            found = true
            break
          }
        }
        i = save
        j = save + 1
        if (found) break
      }
      current = []
      continue
    }
    current.push(line)
  }
  console.log(answers)
  return result
}


// doTheThing(() =>
//   Promise.resolve(
//     `#.##..##.
//     ..#.##.#.
//     ##......#
//     ##......#
//     ..#.##.#.
//     ..##..##.
//     #.#.##.#.

//     #...##..#
//     #....#..#
//     ..##..###
//     #####.##.
//     #####.##.
//     ..##..###
//     #....#..#`
//       .split("\n")
//       .map(r => r.trim())
//   )
// ).then(actual =>
//   console.assert(actual === 405, "1. expected 405 and got " + actual)
// )

doTheThing(getInput).then(console.log)
