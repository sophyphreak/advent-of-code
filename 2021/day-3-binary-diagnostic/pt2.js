require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/3/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()

  let oxygenArr = arr.slice()
  let index = 0
  while (oxygenArr.length > 1) {
    const [zeros, ones] = oxygenArr.reduce(
      (acc, cur) => {
        if (cur[index] === "1") {
          acc[1]++
          return acc
        } else {
          acc[0]++
          return acc
        }
      },
      [0, 0]
    )
    const more = zeros > ones ? "0" : "1" // if zeros are greater, 0; if 1's are greater or both are equal, 1
    oxygenArr = oxygenArr.filter(binary => binary[index] === more)
    index++
  }
  let oxygenGeneratorRatingStr = oxygenArr[0]

  let co2Arr = arr.slice()
  index = 0
  while (co2Arr.length > 1) {
    const [zeros, ones] = co2Arr.reduce(
      (acc, cur) => {
        if (cur[index] === "1") {
          acc[1]++
          return acc
        } else {
          acc[0]++
          return acc
        }
      },
      [0, 0]
    )
    const more = zeros > ones ? "1" : "0"
    co2Arr = co2Arr.filter(binary => binary[index] === more)
    index++
  }
  let co2ScrubberRatingStr = co2Arr[0]

  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingStr, 2)
  const co2ScrubberRating = parseInt(co2ScrubberRatingStr, 2)

  return oxygenGeneratorRating * co2ScrubberRating
}

doTheThing(() =>
  Promise.resolve([
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
