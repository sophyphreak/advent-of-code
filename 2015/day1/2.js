require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2015/day/1/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data
}

const doTheThing = async getString => {
  const s = await getString()
  let level = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === "(") level++
    else level--
    if (level === -1) return i + 1
  }
  return false
}

doTheThing(() => Promise.resolve(`)`)).then(console.log)

doTheThing(() => Promise.resolve(`()())`)).then(console.log)

doTheThing(getInput).then(console.log)
