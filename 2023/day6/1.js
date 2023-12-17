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
  let [times, distances] = [arr[0], arr[1]]
  times = times.split(/[ ]+/).slice(1)
  distances = distances.split(/[ ]+/).slice(1)
  let memo = {}
  let product = 1

  for (let i = 0; i < times.length; i++) {
    let timesThatBeat = 0
    const time = times[i]
    const distance = distances[i]
    for (let j = 1; j < time; j++) {
      if (j * (time - j) > distance) timesThatBeat++
    }
    product *= timesThatBeat
  }

  return product
}


doTheThing(() =>
  Promise.resolve(
    `Time:      7  15   30
    Distance:  9  40  200`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 288, "1. expected 288 and got " + actual)
)


doTheThing(getInput).then(console.log)
