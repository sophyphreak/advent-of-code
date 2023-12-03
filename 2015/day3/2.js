require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2015/day/3/input",
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
  const s = arr[0]
  let i = 0
  let j = 0
  let k = 0
  let m = 0
  const visited = new Set([c(0, 0)])
  for (let index = 0; index < s.length; index++) {
    const d = s[index]
    if (index % 2) {
      if (d === ">") j++
      else if (d === "v") i++
      else if (d === "<") j--
      else if (d === "^") i--
      visited.add(c(i, j))
    } else {
      if (d === ">") m++
      else if (d === "v") k++
      else if (d === "<") m--
      else if (d === "^") k--
      visited.add(c(k, m))
    }
  }
  return visited.size
}

const c = (i, j) => `${i}_${j}`

doTheThing(() => Promise.resolve(`^v`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 3, "1. expected 3 and got " + actual)
)

doTheThing(() => Promise.resolve(`^>v<`.split("\n").map(r => r.trim()))).then(
  actual => console.assert(actual === 3, "2. expected 3 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(`^v^v^v^v^v`.split("\n").map(r => r.trim()))
).then(actual =>
  console.assert(actual === 11, "3. expected 11 and got " + actual)
)

doTheThing(getInput).then(console.log)
