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

const buildPolymer = str => {
  const polymerHead = { value: str[0], next: null }
  let currentNode = polymerHead
  for (let i = 1; i < str.length; i++) {
    currentNode.next = { value: str[i], next: null }
    currentNode = currentNode.next
  }
  return polymerHead
}

const buildRules = arr => {
  const rules = {}
  for (const rule of arr) {
    const [key, value] = rule.split(" -> ")
    rules[key] = value
  }
  return rules
}

const executeStep = (polymer, rules) => {
  let current = polymer
  while (current.next != null) {
    if (!rules[`${current.value}${current.next.value}`] in rules) {
      throw new Error()
    }
    const newNode = {
      value: rules[`${current.value}${current.next.value}`],
      next: current.next,
    }
    current.next = newNode
    current = newNode.next
  }
  return polymer
}

const countElementQuantities = polymer => {
  const counts = {}
  let current = polymer
  while (current != null) {
    if (!(current.value in counts)) {
      counts[current.value] = 0
    }
    counts[current.value]++
    current = current.next
  }
  const mostCommonElementQuantity = Math.max(...Object.values(counts))
  const leastCommonElementQuantity = Math.min(...Object.values(counts))
  return { mostCommonElementQuantity, leastCommonElementQuantity }
}

const doTheThing = async (getArr, steps) => {
  const arr = await getArr()
  let polymer = buildPolymer(arr[0])
  const rules = buildRules(arr.slice(2))
  for (let i = 0; i < steps; i++) {
    polymer = executeStep(polymer, rules)
  }
  const { mostCommonElementQuantity, leastCommonElementQuantity } =
    countElementQuantities(polymer)
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
  10
).then(console.log)

doTheThing(getInput, 10).then(console.log)
