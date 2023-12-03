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
  return arr.reduce((acc, cur) => acc + +cur, 0)
}

doTheThing(() =>
  Promise.resolve(
    `+1
+1
+1`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 3, "1. expected 3 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `+1
+1
-2`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 0, "2. expected 0 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `-1
-2
-3`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === -6, "3. expected -6 and got " + actual)
)

doTheThing(getInput).then(console.log)
