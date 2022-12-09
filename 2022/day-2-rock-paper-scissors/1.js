require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/2/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

// A === X === Rock     -> 1 pt
// B === Y === Paper    -> 2 pt
// C === Z === Scissors -> 3 pt

const doTheThing = async getArr => {
  const arr = await getArr()
  let totalScore = 0
  for (const g of arr) {
    const opp = g[0] === "A" ? "r" : g[0] === "B" ? "p" : "s"
    const self = g[2] === "X" ? "r" : g[2] === "Y" ? "p" : "s"
    switch (self) {
      case "r":
        totalScore += 1
        break
      case "p":
        totalScore += 2
        break
      case "s":
        totalScore += 3
        break
    }
    if (opp === self) {
      totalScore += 3
    }
    if (
      (opp === "r" && self === "p") ||
      (opp === "p" && self === "s") ||
      (opp === "s" && self === "r")
    ) {
      totalScore += 6
    }
  }

  return totalScore
}

doTheThing(() => Promise.resolve(["A Y", "B X", "C Z"])).then(console.log)

doTheThing(getInput).then(console.log)
