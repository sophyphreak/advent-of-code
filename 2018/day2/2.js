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
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      const b = arr[j]
      let common = ""
      for (let k = 0; k < a.length; k++) if (a[k] === b[k]) common += a[k]
      if (common.length === a.length - 1) return common
    }
  }
  throw new Error("Should be impossible")
}

doTheThing(() =>
  Promise.resolve(
    `abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === "fgij", "1. expected fgij and got " + actual)
)

doTheThing(getInput).then(console.log)
