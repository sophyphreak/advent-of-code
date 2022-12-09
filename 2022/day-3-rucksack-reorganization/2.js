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

  let set1 = new Set()
  let set2 = new Set()
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 === 0) {
      set1 = new Set()
      set2 = new Set()
      for (const c of arr[i]) {
        set1.add(c)
      }
    }
    if (i % 3 === 1) {
      for (const c of arr[i]) {
        if (set1.has(c)) {
          set2.add(c)
        }
      }
    }
    if (i % 3 === 2) {
      for (const c of arr[i]) {
        if (set2.has(c)) {
          collectedLetters.push(c)
          break
        }
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
