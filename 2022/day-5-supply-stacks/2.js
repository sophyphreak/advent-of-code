require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/5/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const findNumberRow = arr => {
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i]
    if (row.includes("1")) {
      return i
    }
  }
}

const buildStacks = (arr, numberRowIndex) => {
  const stacks = {}
  const numberRow = arr[numberRowIndex]
  for (let col = 0; col < numberRow.length; col++) {
    const unparsed = numberRow[col]
    const currentNumber = parseInt(unparsed, 10)
    if (currentNumber) {
      stacks[currentNumber] = []
      for (let row = numberRowIndex - 1; row >= 0; row--) {
        if (arr[row][col] === " " || arr[row][col] === "_" || !arr[row][col]) {
          break
        }
        stacks[currentNumber].push(arr[row][col])
      }
    }
  }
  return stacks
}

const buildOrders = (arr, startRowIndex) => {
  const orders = []
  for (let i = startRowIndex; i < arr.length; i++) {
    const row = arr[i]
    const [move, amount, from, start, to, end] = row
      .split(" ")
      .map(s => parseInt(s, 10))
    orders.push({ amount, start, end })
  }
  return orders
}

const buildFinalStacks = (stacks, orders) => {
  for (const order of orders) {
    const { amount, start, end } = order
    const crates = stacks[start].splice(stacks[start].length - amount, amount)
    // crates.reverse()
    stacks[end].push(...crates)
  }
  return stacks
}

const buildTopStacks = finalStacks => {
  let currentStack = 1
  let topStacks = ""
  while (currentStack in finalStacks) {
    topStacks += finalStacks[currentStack][finalStacks[currentStack].length - 1]
    currentStack++
  }
  return topStacks
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const numberRow = findNumberRow(arr)
  const stacks = buildStacks(arr, numberRow)
  const orders = buildOrders(arr, numberRow + 2)
  const finalStacks = buildFinalStacks(stacks, orders)
  const topStacks = buildTopStacks(finalStacks)
  return topStacks
}

doTheThing(() =>
  Promise.resolve(
    `__  [D]    
    [N] [C]    
    [Z] [M] [P]
    _1   2   3 
    
    move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2`
      .split("\n")
      .map(s => s.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
