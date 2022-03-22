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
  const zerosCount = new Array(arr[0].length).fill(0)
  const onesCount = new Array(arr[0].length).fill(0)
  for (const binary of arr) {
    for (let i = 0; i < binary.length; i++) {
      if (+binary[i] === 0) {
        zerosCount[i]++
      } else {
        onesCount[i]++
      }
    }
  }
  let gammaRateStr = ""
  let epsilonRateStr = ""
  for (let i = 0; i < zerosCount.length; i++) {
    if (zerosCount[i] < onesCount[i]) {
      gammaRateStr += "1"
      epsilonRateStr += "0"
    } else {
      gammaRateStr += "0"
      epsilonRateStr += "1"
    }
  }
  const gammaRate = parseInt(gammaRateStr, 2)
  const epsilonRate = parseInt(epsilonRateStr, 2)

  return gammaRate * epsilonRate
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
