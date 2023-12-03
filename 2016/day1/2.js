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
  const visited = new Set()
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
    let oldI = i
    let oldJ = j
    if (dir === "N") i -= n
    else if (dir === "E") j += n
    else if (dir === "S") i += n
    else j -= n

    if (oldI < i) {
      for (let idx = oldI; idx < i; idx++) {
        if (visited.has(c(idx, j))) return Math.abs(idx) + Math.abs(j)
        visited.add(c(idx, j))
      }
    }
    if (oldI > i) {
      for (let idx = oldI; idx > i; idx--) {
        if (visited.has(c(idx, j))) return Math.abs(idx) + Math.abs(j)
        visited.add(c(idx, j))
      }
    }
    if (oldJ < j) {
      for (let idx = oldJ; idx < j; idx++) {
        if (visited.has(c(i, idx))) return Math.abs(idx) + Math.abs(i)
        visited.add(c(i, idx))
      }
    }
    if (oldJ > j) {
      for (let idx = oldJ; idx > j; idx--) {
        if (visited.has(c(i, idx))) return Math.abs(idx) + Math.abs(i)
        visited.add(c(i, idx))
      }
    }
  }
  return false
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(`R8, R4, R4, R8`.split("\n").map(r => r.trim()))
).then(actual =>
  console.assert(actual === 4, "1. expected 4 and got " + actual)
)

// doTheThing(() =>
//   Promise.resolve(`R2, R2, R2`.split("\n").map(r => r.trim()))
// ).then(actual =>
//   console.assert(actual === 2, "2. expected 2 and got " + actual)
// )

// doTheThing(() =>
//   Promise.resolve(`R5, L5, R5, R3`.split("\n").map(r => r.trim()))
// ).then(actual =>
//   console.assert(actual === 12, "3. expected 12 and got " + actual)
// )

doTheThing(getInput).then(console.log)
