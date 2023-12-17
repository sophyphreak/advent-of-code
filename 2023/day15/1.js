require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/15/input",
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
  arr = arr.join("").split(",")
  let total = 0
  for (const s of arr) {
    let current = 0
    for (const c of s) {
      current += c.charCodeAt(0)
      current *= 17
      current %= 256
    }
    total += current
  }
  return total
}


doTheThing(() =>
  Promise.resolve(
    `HASH`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 52, "1. expected 52 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 1320, "1. expected 1320 and got " + actual)
)

doTheThing(getInput).then(console.log)
