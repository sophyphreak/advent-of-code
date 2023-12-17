require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/11/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.map(s => s.split(""))
  const blankRows = arr.reduce((acc, cur, i) => cur.includes("#") ? acc : acc.concat([i]), [])
  const blankCols = []
  for (let j = 0; j < arr[0].length; j++) {
    let colHasUni = false
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] === "#") {
        colHasUni = true
        break
      }
    }
    if (!colHasUni) {
      blankCols.push(j)
    }
  }
  for (const row of blankRows.reverse()) arr.splice(row, 0, new Array(arr[0].length).fill("."))
  for (const col of blankCols.reverse()) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].splice(col, 0, ".")
    }
  }
  const universes = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === "#") universes.push([i, j])
    }
  }
  let sum = 0
  const paths = []
  for (let i = 0; i < universes.length; i++) {
    for (let j = i + 1; j < universes.length; j++) {
      sum += Math.abs(universes[i][0] - universes[j][0]) + Math.abs(universes[i][1] - universes[j][1])
    }
  }
  // console.log(universes, paths)
  return sum
}

const bfs = (u1, u2) => {
  const q = [[...u1, 0]]
  const seen = new Set(c(...u1))
  while (q.length) {
    const [i, j, depth] = q.shift()
    if (i === u2[0] && j === u2[1]) return depth
    if (!seen.has(c(i + 1, j))) {
      seen.add(c(i + 1, j))
      q.push([i + 1, j, depth + 1])
    }
    if (!seen.has(c(i, j + 1))) {
      seen.add(c(i, j + 1))
      q.push([i, j + 1, depth + 1])
    }
    if (!seen.has(c(i - 1, j))) {
      seen.add(c(i - 1, j))
      q.push([i - 1, j, depth + 1])
    }
    if (!seen.has(c(i, j - 1))) {
      seen.add(c(i, j - 1))
      q.push([i, j - 1, depth + 1])
    }
  }
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 374, "1. expected 374 and got " + actual)
)

doTheThing(getInput).then(console.log)
