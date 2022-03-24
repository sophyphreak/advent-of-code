require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/13/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const HORIZONTALLY = "HORIZONTALLY"
const VERTICALLY = "VERTICALLY"

const buildDots = arr =>
  arr
    .join(" ")
    .split("  ")[0]
    .split(" ")
    .map(s => s.split(",").reverse())

const buildFolds = arr =>
  arr
    .join(" ")
    .split("  ")[1]
    .split(" ")
    .filter(s => s !== "fold" && s !== "along")
    .map(s => s.split("="))
    .map(([direction, at]) => ({
      direction: direction === "x" ? HORIZONTALLY : VERTICALLY,
      at,
    }))

const getDimensions = folds => {
  let rowLength = -1
  let colLength = -1
  for (const fold of folds) {
    if (fold.direction === VERTICALLY) {
      colLength = fold.at * 2 + 1
      break
    }
  }
  for (const fold of folds) {
    if (fold.direction === HORIZONTALLY) {
      rowLength = fold.at * 2 + 1
      break
    }
  }
  return { rowLength, colLength }
}

const buildTransparentPaper = ({ dots, rowLength, colLength }) => {
  const paper = new Array(colLength)
    .fill(null)
    .map(_ => new Array(rowLength).fill(false))
  for (const [i, j] of dots) {
    paper[i][j] = true
  }
  return paper
}

const printPaper = paper =>
  console.log(
    paper.map(a => a.map(b => (b === true ? "#" : ".")).join("")).join("\n")
  )

const foldVertically = (paper, foldAt) => {
  for (let i = paper.length - 1; i > foldAt; i--) {
    for (let j = 0; j < paper[0].length; j++) {
      if (paper[i][j]) {
        const distanceAwayFromBottom = paper.length - 1 - i
        paper[distanceAwayFromBottom][j] = true
      }
    }
  }

  paper = paper.slice(0, foldAt)

  return paper
}

const foldHorizontally = (paper, foldAt) => {
  for (let i = 0; i < paper.length; i++) {
    for (let j = paper[0].length - 1; j > foldAt; j--) {
      if (paper[i][j]) {
        const distanceAwayFromRight = paper[0].length - 1 - j
        paper[i][distanceAwayFromRight] = true
      }
    }
  }

  for (let i = 0; i < paper.length; i++) {
    paper[i] = paper[i].slice(0, foldAt)
  }

  return paper
}

const countDots = paper =>
  paper.reduce(
    (count, row) =>
      count + row.reduce((count, space) => (space ? count + 1 : count), 0),
    0
  )

const doTheThing = async getArr => {
  const arr = await getArr()
  const dots = buildDots(arr)
  const folds = buildFolds(arr)
  const { rowLength, colLength } = getDimensions(folds)
  let paper = buildTransparentPaper({ dots, rowLength, colLength })
  for (const fold of folds) {
    if (fold.direction === VERTICALLY) {
      paper = foldVertically(paper, fold.at)
    } else {
      paper = foldHorizontally(paper, fold.at)
    }
  }
  printPaper(paper)
  const dotCount = countDots(paper)
  return dotCount
}

doTheThing(() =>
  Promise.resolve([
    "6,10",
    "0,14",
    "9,10",
    "0,3",
    "10,4",
    "4,11",
    "6,0",
    "6,12",
    "4,1",
    "0,13",
    "10,12",
    "3,4",
    "3,0",
    "8,4",
    "1,10",
    "2,14",
    "8,10",
    "9,0",
    "",
    "fold along y=7",
    "fold along x=5",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
