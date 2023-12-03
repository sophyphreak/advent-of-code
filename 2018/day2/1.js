require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2018/day/2/input",
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
  let twos = 0
  let threes = 0
  for (const line of arr) {
    const counts = {}
    for (const c of line) counts[c] = (counts[c] ?? 0) + 1
    let hasTwo = false
    let hasThree = false
    for (const k in counts) {
      if (counts[k] === 2) hasTwo = true
      if (counts[k] === 3) hasThree = true
    }
    if (hasTwo) twos++
    if (hasThree) threes++
  }
  return twos * threes
}

doTheThing(() =>
  Promise.resolve(
    `abcdef
    bababc
    abbcde
    abcccd
    aabcdd
    abcdee
    ababab`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 12, "1. expected 12 and got " + actual)
)

doTheThing(getInput).then(console.log)
