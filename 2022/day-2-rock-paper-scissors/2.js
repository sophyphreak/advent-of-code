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
    const result = g[2] === "X" ? "l" : g[2] === "Y" ? "d" : "w"
    let self = ""
    if (result === "l") {
      if (opp === "r") self = "s"
      if (opp === "p") self = "r"
      if (opp === "s") self = "p"
    }
    if (result === "d") self = opp
    if (result === "w") {
      if (opp === "r") self = "p"
      if (opp === "p") self = "s"
      if (opp === "s") self = "r"
    }
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
