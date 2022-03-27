require("dotenv").config()
const axios = require("axios").default
const fs = require("fs")
const path = require("path")
const rootDir = path.join(__dirname, ".")

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

const buildRules = arr => {
  const rules = {}
  for (const rule of arr) {
    const [key, value] = rule.split(" -> ")
    rules[key] = value
  }
  return rules
}

const savePolymer = (str, n = 0) => {
  fs.writeFileSync(`${rootDir}/old/${n}.txt`, str)
}

const linkedListToString = linkedList => {
  const arr = []
  let current = linkedList
  while (current != null) {
    arr.push(current.value)
    current = current.next
  }
  // console.log(arr.join(""))
  // console.log(arr.length)
  return arr.join("")
}

const stringToLinkedList = str => {
  const head = { value: str[0], next: null }
  let current = head
  for (let i = 1; i < str.length; i++) {
    const nextNode = { value: str[i], next: null }
    current.next = nextNode
    current = nextNode
  }
  return head
}

const updatePolymer = (polymer, rules) => {
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

const executeStep = rules => {
  const files = []
  fs.readdirSync(`${rootDir}/old/`).forEach(file => files.push(file))
  let currentSaveFileNumber = 0
  for (let i = 0; i < files.length; i++) {
    let str = fs.readFileSync(`${rootDir}/old/${i}.txt`, "utf-8")
    if (i < files.length - 1) {
      str += fs.readFileSync(`${rootDir}/old/${i + 1}.txt`, "utf-8")[0] // add first character of next chunk to end of this chunk
    }
    let polymer = stringToLinkedList(str)
    polymer = updatePolymer(polymer, rules)
    str = linkedListToString(polymer)
    if (i < files.length - 1) {
      str = str.slice(0, str.length - 1) // remove piece of next chunk that was added
    }
    if (str.length > 25000000) {
      fs.writeFileSync(
        `${rootDir}/new/${currentSaveFileNumber}.txt`,
        str.slice(0, str.length / 2)
      )
      fs.writeFileSync(
        `${rootDir}/new/${currentSaveFileNumber + 1}.txt`,
        str.slice(str.length / 2)
      )
      currentSaveFileNumber += 2
    } else {
      fs.writeFileSync(`${rootDir}/new/${currentSaveFileNumber}.txt`, str)
      currentSaveFileNumber++
    }
  }
  fs.rmSync(`${rootDir}/old/`, { recursive: true, force: true })
  fs.renameSync(`${rootDir}/new/`, `${rootDir}/old/`)
  fs.mkdirSync(`${rootDir}/new/`)
}

const countElementQuantities = () => {
  const files = []
  fs.readdirSync(`${rootDir}/old/`).forEach(file => files.push(file))
  let counts = {}
  for (let i = 0; i < files.length; i++) {
    let str = fs.readFileSync(`${rootDir}/old/${i}.txt`, "utf-8")
    for (const c of str) {
      if (!(c in counts)) {
        counts[c] = 0
      }
      counts[c]++
    }
  }
  const mostCommonElementQuantity = Math.max(...Object.values(counts))
  const leastCommonElementQuantity = Math.min(...Object.values(counts))
  return { mostCommonElementQuantity, leastCommonElementQuantity }
}

const doTheThing = async (getArr, steps) => {
  if (!fs.existsSync(`${rootDir}/old/`)) fs.mkdirSync(`${rootDir}/old/`)
  if (!fs.existsSync(`${rootDir}/new/`)) fs.mkdirSync(`${rootDir}/new/`)
  const arr = await getArr()
  const rules = buildRules(arr.slice(2))
  savePolymer(arr[0])
  for (let i = 0; i < steps; i++) {
    console.log("Step:", i, "/", steps)
    executeStep(rules)
  }
  const { mostCommonElementQuantity, leastCommonElementQuantity } =
    countElementQuantities()
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

// doTheThing(getInput, 40).then(console.log)
