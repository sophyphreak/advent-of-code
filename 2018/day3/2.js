require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2018/day/3/input",
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
  arr = arr.map(s => {
    const [id, rest] = s.split(" @ ")
    const [coords, dim] = rest.split(": ")
    const [j, i] = coords.split(",").map(s => +s)
    const [l, w] = dim.split("x").map(s => +s)
    return { id, i, j, l, w }
  })
  const claims = new Set()
  const twoOrMore = new Set()
  for (const claim of arr) {
    const { i, j, l, w } = claim
    for (let index = i; index < i + w; index++) {
      for (let jndex = j; jndex < j + l; jndex++) {
        if (claims.has(c(index, jndex))) twoOrMore.add(c(index, jndex))
        claims.add(c(index, jndex))
      }
    }
  }
  for (const claim of arr) {
    const { id, i, j, l, w } = claim
    let overlapFound = false
    for (let index = i; index < i + w; index++) {
      for (let jndex = j; jndex < j + l; jndex++) {
        if (twoOrMore.has(c(index, jndex))) overlapFound = true
      }
    }
    if (!overlapFound) return id
  }
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `#1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === "#3", "1. expected #3 and got " + actual)
)

doTheThing(getInput).then(console.log)
