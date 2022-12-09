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
  // no movement
  if (
    Math.abs(currentHead[0] - currentTail[0]) <= 1 &&
    Math.abs(currentHead[1] - currentTail[1]) <= 1
  ) {
    return { currentHead, currentTail, been }
  }

  // diagonal
  if (currentHead[0] !== currentTail[0] && currentHead[1] !== currentTail[1]) {
    if (Math.abs(currentHead[0] - currentTail[0]) === 1) {
      currentTail[0] = currentHead[0]
      if (currentTail[1] < currentHead[1]) {
        currentTail[1]++
      } else {
        currentTail[1]--
      }
      been.add(coord(...currentTail))
    } else {
      currentTail[1] = currentHead[1]
      if (currentTail[0] < currentHead[0]) {
        currentTail[0]++
      } else {
        currentTail[0]--
      }
      been.add(coord(...currentTail))
    }
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

  return { currentTail, currentHead, been }
}

const doTheThing = async getArr => {
  let arr = await getArr()
  let currentHead = [0, 0]
  let currentTail = [0, 0]
  let been = new Set([coord(...currentTail)])
  for (const row of arr) {
    const [direction, distance] = row.split(" ").map(v => {
      if ("RLUD".includes(v)) return v
      return +v
    })
    if (direction === "U") {
      currentHead[0] -= distance
    }
    if (direction === "R") {
      currentHead[1] += distance
    }
    if (direction === "D") {
      currentHead[0] += distance
    }
    if (direction === "L") {
      currentHead[1] -= distance
    }
    ;({ currentHead, currentTail, been } = calculateHeadTail({
      currentHead,
      currentTail,
      been,
    }))
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

// doTheThing(() =>
//   Promise.resolve(
//     `R 5
//     U 8
//     L 8
//     D 3
//     R 17
//     D 10
//     L 25
//     U 20`
//       .split("\n")
//       .map(r => r.trim())
//   )
// ).then(console.log)

doTheThing(getInput).then(console.log)
