require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/10/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const [startRow, startCol] = arr.reduce((acc, row, i) => row.includes("S") ? [i, row.indexOf("S")] : acc, [null, null])
  const seen = new Set([c(startRow, startCol)])
  let i = null
  let j = null
  if (arr[startRow - 1][startCol] === "F" || arr[startRow - 1][startCol] === "7" || arr[startRow - 1][startCol] === "|") {
    i = startRow - 1
    j = startCol
  } else if (arr[startRow][startCol + 1] === "7" || arr[startRow][startCol + 1] === "-" || arr[startRow][startCol + 1] === "J") {
    i = startRow
    j = startCol + 1
  } else if (arr[startRow + 1][startCol] === "J" || arr[startRow + 1][startCol] === "|" || arr[startRow + 1][startCol] === "L") {
    i = startRow + 1
    j = startCol
  } else {
    i = startRow
    j = startCol - 1
  }
  let length = 0
  while (true) {
    const current = arr[i][j]
    seen.add(c(i, j))
    length++
    if (current === "F") {
      if (seen.has(c(i + 1, j))) j++
      else i++
    }
    else if (current === "7") {
      if (seen.has(c(i + 1, j))) j--
      else i++
    }
    else if (current === "J") {
      if (seen.has(c(i - 1, j))) j--
      else i--
    }
    else if (current === "L") {
      if (seen.has(c(i - 1, j))) j++
      else i--
    }
    else if (current === "-") {
      if (seen.has(c(i, j + 1))) j--
      else j++
    }
    else if (current === "|") {
      if (seen.has(c(i + 1, j))) i--
      else i++
    }
    else if (current === "S") {
      break
    }
  }
  return Math.floor(length / 2)
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `.....
    .S-7.
    .|.|.
    .L-J.
    .....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 4, "1. expected 4 and got " + actual)
)


doTheThing(() =>
  Promise.resolve(
    `..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 8, "2. expected 8 and got " + actual)
)

doTheThing(getInput).then(console.log)
