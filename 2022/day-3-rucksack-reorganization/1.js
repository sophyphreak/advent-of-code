require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/3/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const priorities =
  "~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const doTheThing = async getArr => {
  const arr = await getArr()
  const collectedLetters = []
  for (const sack of arr) {
    const set = new Set()
    for (let i = 0; i < sack.length; i++) {
      if (i < sack.length / 2) {
        set.add(sack[i])
      } else if (set.has(sack[i])) {
        collectedLetters.push(sack[i])
        break
      }
    }
  }
  return collectedLetters.reduce((acc, cur) => acc + priorities.indexOf(cur), 0)
}

doTheThing(() =>
  Promise.resolve([
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
