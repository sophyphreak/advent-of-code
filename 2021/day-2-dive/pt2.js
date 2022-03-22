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

const doTheThing = async getInput => {
  const input = await getInput()
  const moves = input.split("\n").map(str => {
    let [direction, distance] = str.split(" ")
    distance = +distance
    return { direction, distance }
  })

  let currentDepth = 0
  let currentHorizontal = 0
  let currentAim = 0
  for (const move of moves) {
    const { direction, distance } = move
    if (direction === "forward") {
      currentHorizontal += distance
      currentDepth += currentAim * distance
    }
    if (direction === "up") {
      currentAim -= distance
    }
    if (direction === "down") {
      currentAim += distance
    }
  }
  console.log(currentDepth, currentHorizontal, currentAim)
  return currentDepth * currentHorizontal
}

doTheThing(() => "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2").then(
  console.log
)
doTheThing(getInput).then(console.log)
