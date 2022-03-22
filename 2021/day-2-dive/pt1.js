require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/2/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data
}

const doTheThing = async () => {
  const input = await getInput()
  const moves = input.split("\n").map(str => {
    let [direction, distance] = str.split(" ")
    distance = +distance
    return { direction, distance }
  })

  let currentDepth = 0
  let currentHorizontal = 0
  for (const move of moves) {
    const { direction, distance } = move
    if (direction === "forward") {
      currentHorizontal += distance
    }
    if (direction === "up") {
      currentDepth -= distance
    }
    if (direction === "down") {
      currentDepth += distance
    }
  }
  return currentDepth * currentHorizontal
}

doTheThing().then(console.log)
