require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2016/day/1/input",
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
  arr = arr[0].split(", ")
  let i = 0
  let j = 0
  let dir = "N"
  for (const s of arr) {
    const [d, n] = [s[0], +s.slice(1)]
    if (d === "R") {
      if (dir === "N") dir = "E"
      else if (dir === "E") dir = "S"
      else if (dir === "S") dir = "W"
      else dir = "N"
    } else {
      if (dir === "N") dir = "W"
      else if (dir === "W") dir = "S"
      else if (dir === "S") dir = "E"
      else dir = "N"
    }
    if (dir === "N") i -= n
    else if (dir === "E") j += n
    else if (dir === "S") i += n
    else j -= n
  }
  return Math.abs(i) + Math.abs(j)
}

doTheThing(() => Promise.resolve(`R2, L3`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 5, "1. expected 5 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(`R2, R2, R2`.split("\n").map(r => r.trim()))
).then(actual =>
  console.assert(actual === 2, "2. expected 2 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(`R5, L5, R5, R3`.split("\n").map(r => r.trim()))
).then(actual =>
  console.assert(actual === 12, "3. expected 12 and got " + actual)
)

doTheThing(getInput).then(console.log)
