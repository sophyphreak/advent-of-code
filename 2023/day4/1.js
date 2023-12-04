require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/4/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()
  let score = 0
  for (const line of arr) {
    const [, numbers] = line.split(": ")
    const [card, myNumbers] = numbers
      .split(" | ")
      .map(s => s.trim())
      .map(s => s.split(/[ ]+/).map(s => +s))
    let current = 0
    for (const n of myNumbers) {
      if (card.includes(n)) current = current === 0 ? 1 : current * 2
    }
    score += current
  }
  return score
}

doTheThing(() =>
  Promise.resolve(
    `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 13, "1. expected 13 and got " + actual)
)

doTheThing(getInput).then(console.log)
