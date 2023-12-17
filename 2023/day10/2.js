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
  let arr = await getArr()
  const [startRow, startCol] = arr.reduce((acc, row, i) => row.includes("S") ? [i, row.indexOf("S")] : acc, [null, null])
  const q = []
  arr = arr.map(r => r.split(""))
  const seen = new Set([c(startRow, startCol)])
  const left = new Set()
  const right = new Set()
  let i = null
  let j = null
  if (arr?.[startRow - 1]?.[startCol] === "F" || arr?.[startRow - 1]?.[startCol] === "7" || arr?.[startRow - 1]?.[startCol] === "|") {
    i = startRow - 1
    j = startCol
    // if (!seen.has(c(i, j - 1))) left.add(c(i, j - 1))
    // if (!seen.has(c(i, j + 1))) right.add(c(i, j + 1))
  } else if (arr?.[startRow]?.[startCol + 1] === "7" || arr?.[startRow]?.[startCol + 1] === "-" || arr?.[startRow]?.[startCol + 1] === "J") {
    i = startRow
    j = startCol + 1
    // if (!seen.has(c(i - 1, j))) left.add(c(i - 1, j))
    // if (!seen.has(c(i + 1, j))) right.add(c(i + 1, j))
  } else if (arr?.[startRow + 1]?.[startCol] === "J" || arr?.[startRow + 1]?.[startCol] === "|" || arr?.[startRow + 1]?.[startCol] === "L") {
    i = startRow + 1
    j = startCol
    // if (!seen.has(c(i, j + 1))) left.add(c(i, j + 1))
    // if (!seen.has(c(i, j - 1))) right.add(c(i, j - 1))
  } else {
    i = startRow
    j = startCol - 1
    // if (!seen.has(c(i + 1, j))) left.add(c(i + 1, j))
    // if (!seen.has(c(i - 1, j))) right.add(c(i - 1, j))
  }
  q.push([i, j])
  const secondRow = i
  const secondCol = j
  while (true) {
    const current = arr[i][j]
    seen.add(c(i, j))
    if (current === "F") {
      arr[i][j] = "S"
      if (seen.has(c(i + 1, j))) {
        j++
      }
      else {
        i++
      }
    }
    else if (current === "7") {
      arr[i][j] = "S"

      if (seen.has(c(i + 1, j))) {
        j--
      }
      else {
        i++
      }
    }
    else if (current === "J") {
      arr[i][j] = "S"

      if (seen.has(c(i - 1, j))) {
        j--
      }
      else {
        i--
      }
    }
    else if (current === "L") {
      arr[i][j] = "S"

      if (seen.has(c(i - 1, j))) {
        j++
      }
      else {
        i--
      }
    }
    else if (current === "-") {
      arr[i][j] = "S"

      if (seen.has(c(i, j + 1))) {
        j--
      }
      else {
        j++
      }
    }
    else if (current === "|") {
      arr[i][j] = "S"

      if (seen.has(c(i + 1, j))) {
        i--
      }
      else {
        i++
      }
    }
    else if (current === "S") {
      break
    }
    q.push([i, j])
    seen.delete(c(startRow, startCol))
  }
  q.push([startRow, startCol])
  seen.add(c(startRow, startCol))
  i = startRow
  j = startCol
  const secondSeen = new Set([c(i, j)])
  while (q.length) {
    const [nextI, nextJ] = q.shift()
    if ((i - 1 === nextI) && (j === nextJ)) {
      if (!seen.has(c(i - 1, j - 1)) && arr?.[i - 1]?.[j - 1]) {
        left.add(c(i - 1, j - 1))
        arr[i - 1][j - 1] = "L"
      }
      if (!seen.has(c(i - 1, j + 1) && arr?.[i - 1]?.[j + 1])) {
        right.add(c(i - 1, j + 1))
        arr[i - 1][j + 1] = "R"
      }
    }
    if ((i === nextI) && (j + 1 === nextJ)) {
      if (!seen.has(c(i - 1, j + 1)) && arr?.[i - 1]?.[j + 1]) {
        left.add(c(i - 1, j + 1))
        arr[i - 1][j + 1] = "L"
      }
      if (!seen.has(c(i + 1, j + 1)) && arr?.[i + 1]?.[j + 1]) {
        right.add(c(i + 1, j + 1))
        arr[i + 1][j + 1] = "R"
      }
    }
    if ((i + 1 === nextI) && (j === nextJ)) {
      if (!seen.has(c(i + 1, j + 1) && arr?.[i + 1]?.[j + 1])) {
        left.add(c(i + 1, j + 1))
        arr[i + 1][j + 1] = "L"
      }
      if (!seen.has(c(i + 1, j - 1)) && arr?.[i + 1]?.[j - 1]) {
        right.add(c(i + 1, j - 1))
        arr[i + 1][j - 1] = "R"
      }
    }
    if ((i === nextI) && (j - 1 === nextJ)) {
      if (!seen.has(c(i + 1, j - 1) && arr?.[i + 1]?.[j - 1])) {
        left.add(c(i + 1, j - 1))
        arr[i + 1][j - 1] = "L"
      }
      if (!seen.has(c(i - 1, j - 1) && arr?.[i - 1]?.[j - 1])) {
        right.add(c(i - 1, j - 1))
        arr[i - 1][j - 1] = "R"
      }
    }
    i = nextI
    j = nextJ
    // if (i === startRow && j === startCol) break
    // if ((seen.has(c(i - 1, j)) && (!secondSeen.has(c(i - 1, j))))) {
    //   i--
    // } else if ((seen.has(c(i, j + 1)) && (!secondSeen.has(c(i, j + 1))))) {
    //   j++
    // } else if ((seen.has(c(i + 1, j)) && (!secondSeen.has(c(i + 1, j))))) {
    //   i++
    // } else {
    //   j--
    // }
    // secondSeen.add(c(i, j))
  }
  console.log(arr.map(r => r.join("")).join("\n"))
  console.log(right)
  // console.log("left:", left, "right:", right)
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 4, "1. expected 4 and got " + actual)
)


doTheThing(() =>
  Promise.resolve(
    `..........
    .S------7.
    .|F----7|.
    .||....||.
    .||....||.
    .|L-7F-J|.
    .|..||..|.
    .L--JL--J.
    ..........`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 4, "2. expected 4 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `.F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 8, "3. expected 8 and got " + actual)
)

doTheThing(() =>
  Promise.resolve(
    `FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 10, "4. expected 10 and got " + actual)
)

// doTheThing(getInput).then(console.log)
