require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/6/input",
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
  let [time, distance] = [arr[0], arr[1]]
  time = time.split(/[ ]+/).slice(1).join("")
  distance = distance.split(/[ ]+/).slice(1).join("")
  let timesThatBeat = 0
  for (let j = 1; j < time; j++) {
    if (j * (time - j) > distance) timesThatBeat++
  }
  return timesThatBeat
}


doTheThing(() =>
  Promise.resolve(
    `Time:      7  15   30
    Distance:  9  40  200`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 71503, "1. expected 71503 and got " + actual)
)


doTheThing(getInput).then(console.log)
