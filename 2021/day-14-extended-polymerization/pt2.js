require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/14/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const buildState = str => {
  const state = {}
  for (let i = 0; i < str.length - 1; i++) {
    state[str.slice(i, i + 2)] = 1
  }
  return state
}

const buildRules = arr => {
  const rules = {}
  for (const rule of arr) {
    const [key, value] = rule.split(" -> ")
    rules[key] = value
  }
  return rules
}

const executeStep = (state, rules) => {
  const newState = {}
  for (const pair in state) {
    const insertChar = rules[pair]
    if (!(`${pair[0]}${insertChar}` in newState)) {
      newState[`${pair[0]}${insertChar}`] = 0
    }
    newState[`${pair[0]}${insertChar}`] += state[pair]
    if (!(`${insertChar}${pair[1]}` in newState)) {
      newState[`${insertChar}${pair[1]}`] = 0
    }
    newState[`${insertChar}${pair[1]}`] += state[pair]
  }
  return newState
}

const countElementQuantities = (state, lastLetter) => {
  const counts = {}
  for (const pair in state) {
    if (!(pair[0] in counts)) {
      counts[pair[0]] = 0
    }
    counts[pair[0]] += state[pair]
    if (!(pair[1] in counts)) {
      counts[pair[1]] = 0
    }
    counts[pair[0]] += state[pair]
  }
  for (const char in counts) {
    counts[char] = Math.floor(counts[char] / 2) // round down for characters on the far left and right ends
  }
  counts[lastLetter]++
  console.log(counts)
  const mostCommonElementQuantity = Math.max(...Object.values(counts))
  const leastCommonElementQuantity = Math.min(...Object.values(counts))
  return { mostCommonElementQuantity, leastCommonElementQuantity }
}

const doTheThing = async (getArr, steps) => {
  const arr = await getArr()
  let state = buildState(arr[0])
  const rules = buildRules(arr.slice(2))
  for (let i = 0; i < steps; i++) {
    // console.log("Step:", i, "/", steps)
    state = executeStep(state, rules)
  }
  // console.log(state)
  const lastLetter = arr[0][arr[0].length - 1]
  const { mostCommonElementQuantity, leastCommonElementQuantity } =
    countElementQuantities(state, lastLetter)
  return mostCommonElementQuantity - leastCommonElementQuantity
}

doTheThing(
  () =>
    Promise.resolve([
      "NNCB",
      "",
      "CH -> B",
      "HH -> N",
      "CB -> H",
      "NH -> C",
      "HB -> C",
      "HC -> B",
      "HN -> C",
      "NN -> C",
      "BH -> H",
      "NC -> B",
      "NB -> B",
      "BN -> B",
      "BB -> N",
      "BC -> B",
      "CC -> N",
      "CN -> C",
    ]),
  40
).then(console.log)

doTheThing(getInput, 10).then(console.log)
