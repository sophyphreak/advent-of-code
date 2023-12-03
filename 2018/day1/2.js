require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2018/day/1/input",
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
  let seen = new Set([0])
  let current = 0
  while (true) {
    for (const s of arr) {
      const n = +s
      current += n
      if (seen.has(current)) return current
      seen.add(current)
    }
  }
  throw new Error("Should be unreachable")
}

doTheThing(() =>
  Promise.resolve(
    `+1
-1`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 0, "1. expected 0 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `+3
+3
+4
-2
-4`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 10, "2. expected 10 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `-6
+3
+8
+5
-6`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 5, "3. expected 5 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `+7
    +7
    -2
    -7
    -4`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 14, "3. expected 14 and got " + actual)
)

doTheThing(getInput).then(console.log)
