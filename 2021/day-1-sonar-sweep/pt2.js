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
  const depths = input.split("\n").map(str => +str)

  let previousWindowSum = depths[0] + depths[1] + depths[2]
  let currentWindowSum = previousWindowSum

  let increases = 0
  for (let i = 1; i < depths.length - 2; i++) {
    currentWindowSum -= depths[i - 1]
    currentWindowSum += depths[i + 2]
    if (previousWindowSum < currentWindowSum) {
      increases++
    }
    previousWindowSum = currentWindowSum
  }
  return increases
}

doTheThing().then(console.log)
