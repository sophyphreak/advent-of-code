require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/4/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()
  let totalOverlaps = 0
  for (const pair of arr) {
    const [elfOne, elfTwo] = pair.split(",")
    const intervalOne = elfOne.split("-").map(s => +s)
    const intervalTwo = elfTwo.split("-").map(s => +s)
    if (intervalOne[0] <= intervalTwo[0] && intervalOne[1] >= intervalTwo[1]) {
      totalOverlaps++
    } else if (
      intervalOne[0] >= intervalTwo[0] &&
      intervalOne[1] <= intervalTwo[1]
    ) {
      totalOverlaps++
    }
  }
  return totalOverlaps
}

doTheThing(() =>
  Promise.resolve(
    `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`
      .split("\n")
      .map(s => s.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
// 463 - interval too high
