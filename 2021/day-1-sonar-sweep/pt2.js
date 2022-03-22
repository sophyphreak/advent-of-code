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

  let previousWindowSum = arr[0] + arr[1] + arr[2]
  let currentWindowSum = previousWindowSum

  let increases = 0
  for (let i = 1; i < arr.length - 2; i++) {
    currentWindowSum -= arr[i - 1]
    currentWindowSum += arr[i + 2]
    if (previousWindowSum < currentWindowSum) {
      increases++
    }
    previousWindowSum = currentWindowSum
  }
  return increases
}

doTheThing().then(console.log)
