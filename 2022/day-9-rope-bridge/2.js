require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/9/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const coord = (row, col) => `${row}_${col}`

const calculateHeadTail = ({ currentHead, currentTail, been }) => {
  while (
    Math.abs(currentHead[0] - currentTail[0]) > 1 ||
    Math.abs(currentHead[1] - currentTail[1]) > 1
  ) {
    // diagonal
    if (
      Math.abs(currentHead[0] - currentTail[0]) >= 1 &&
      Math.abs(currentHead[1] - currentTail[1]) >= 1
    ) {
      if (currentTail[0] < currentHead[0]) {
        currentTail[0]++
      } else {
        currentTail[0]--
      }
      if (currentTail[1] < currentHead[1]) {
        currentTail[1]++
      } else {
        currentTail[1]--
      }
      been.add(coord(...currentTail))
      continue
    }

    while (currentTail[0] < currentHead[0] - 1) {
      currentTail[0]++
      been.add(coord(...currentTail))
    }
    while (currentTail[0] > currentHead[0] + 1) {
      currentTail[0]--
      been.add(coord(...currentTail))
    }
    while (currentTail[1] < currentHead[1] - 1) {
      currentTail[1]++
      been.add(coord(...currentTail))
    }
    while (currentTail[1] > currentHead[1] + 1) {
      currentTail[1]--
      been.add(coord(...currentTail))
    }
  }

  return { currentTail, currentHead, been }
}

const printChain = chain => {
  const map = new Array(21).fill(0).map(_ => new Array(26).fill("."))
  for (let i = 0; i < 10; i++) {
    const rowIndex = chain[i][0]
    const colIndex = chain[i][1]
    if (map[rowIndex + 15][colIndex + 11] === ".")
      map[rowIndex + 15][colIndex + 11] = i === 0 ? "H" : `${i}`
  }
  console.log(map.map(a => a.join("")).join("\n"))
  console.log("")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  let currentChain = new Array(10).fill(0).map(_ => [0, 0])
  let been = new Set([coord(0, 0)])
  for (const row of arr) {
    let [direction, distance] = row.split(" ").map(v => {
      if ("RLUD".includes(v)) return v
      return +v
    })

    while (distance) {
      if (direction === "U") {
        currentChain[0][0]--
      }
      if (direction === "R") {
        currentChain[0][1]++
      }
      if (direction === "D") {
        currentChain[0][0]++
      }
      if (direction === "L") {
        currentChain[0][1]--
      }
      distance--

      for (let i = 0; i < 8; i++) {
        let currentHead = currentChain[i]
        let currentTail = currentChain[i + 1]
        ;({ currentHead, currentTail } = calculateHeadTail({
          currentHead,
          currentTail,
          been: new Set(),
        }))
        currentChain[i] = currentHead
        currentChain[i + 1] = currentTail
      }

      let currentHead = currentChain[8]
      let currentTail = currentChain[9]
      ;({ currentHead, currentTail, been } = calculateHeadTail({
        currentHead,
        currentTail,
        been,
      }))
      currentChain[8] = currentHead
      currentChain[9] = currentTail
    }
    // printChain(currentChain)
  }
  return been.size
}

doTheThing(() =>
  Promise.resolve(
    `R 4
    U 4
    L 3
    D 1
    R 4
    D 1
    L 5
    R 2`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(() =>
  Promise.resolve(
    `R 5
    U 8
    L 8
    D 3
    R 17
    D 10
    L 25
    U 20`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
