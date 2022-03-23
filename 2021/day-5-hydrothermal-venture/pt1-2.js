// this file is a second try since I was having bugs the first time.
// the problem turned out to be that I wasn't using `parseInt`, so
//  the > < symbols were comparing strings, which ended up in
//  undesired results.

require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/5/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.split("\n")
}

const convertToUsable = arr => {
  const ventLineSegments = []
  arr.pop() // remove empty string at the end
  for (const str of arr) {
    const [start, end] = str.split(" -> ")
    const [startX, startY] = start.split(",")
    const [endX, endY] = end.split(",")
    ventLineSegments.push({
      from: {
        row: parseInt(startY),
        col: parseInt(startX),
      },
      to: { row: parseInt(endY), col: parseInt(endX) },
    })
  }
  return ventLineSegments
}

const isHorizontal = lineSegment => lineSegment.from.row === lineSegment.to.row

const filterOutNonHorizontalVertical = ventLineSegments => {
  const filteredLineSegments = ventLineSegments.filter(lineSegment => {
    if (isHorizontal(lineSegment)) {
      return true
    }
    if (lineSegment.from.col === lineSegment.to.col) {
      return true
    }
    return false
  })
  return filteredLineSegments
}

const startsWithFrom = ventLineSegments => {
  for (const lineSegment of ventLineSegments) {
    if (
      lineSegment.from.col > lineSegment.to.col ||
      lineSegment.from.row > lineSegment.to.row
    ) {
      const temp = lineSegment.from
      lineSegment.from = lineSegment.to
      lineSegment.to = temp
    }
  }
  return ventLineSegments
}

const addPoints = (lineSegment, points) => {
  if (lineSegment.from.row === lineSegment.to.row) {
    const row = lineSegment.from.row
    for (let cur = lineSegment.from.col; cur <= lineSegment.to.col; cur++) {
      if (!points.hasOwnProperty(`(${row}, ${cur})`)) {
        points[`(${row}, ${cur})`] = 0
      }
      points[`(${row}, ${cur})`]++
    }
  } else {
    const col = lineSegment.from.col
    for (let cur = lineSegment.from.row; cur <= lineSegment.to.row; cur++) {
      if (!points.hasOwnProperty(`(${cur}, ${col})`)) {
        points[`(${cur}, ${col})`] = 0
      }
      points[`(${cur}, ${col})`]++
    }
  }
  return points
}

const getPoints = ventLineSegments => {
  let points = {}
  for (const lineSegment of ventLineSegments) {
    points = addPoints(lineSegment, points)
  }
  return points
}

const getGreaterThan2 = points => {
  let count = 0
  for (const point in points) {
    if (points[point] > 1) {
      count++
    }
  }
  return count
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const ventLineSegments = convertToUsable(arr)
  const filteredLineSegments = filterOutNonHorizontalVertical(ventLineSegments)
  const standardizedLineSegments = startsWithFrom(filteredLineSegments)
  const points = getPoints(standardizedLineSegments)
  return getGreaterThan2(points)
}

doTheThing(() =>
  Promise.resolve([
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
