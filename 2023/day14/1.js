require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/14/input",
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
  let totalLoad = 0
  const max = arr[0].length
  for (let j = 0; j < arr[0].length; j++) {
    let lastOpen = 0
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i][j]
      if (current === "O") {
        totalLoad += max - lastOpen
        lastOpen++
      } else if (current === "#") {
        lastOpen = i + 1
      }
    }
  }
  return totalLoad
}


doTheThing(() =>
  Promise.resolve(
    `O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 136, "1. expected 136 and got " + actual)
)

doTheThing(getInput).then(console.log)
