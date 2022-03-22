require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/1/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data
}

const doTheThing = async () => {
  const input = await getInput()
  const arr = input.split("\n").map(str => +str)

  let increases = 0
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      increases++
    }
  }
  return increases
}

doTheThing().then(console.log)
