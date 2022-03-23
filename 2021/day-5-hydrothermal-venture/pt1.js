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

const getMaxRowAndCol = ventLineSegments => {
  let maxRow = 0
  let maxCol = 0
  for (const lineSegment of ventLineSegments) {
    maxRow = Math.max(maxRow, lineSegment.from.row)
    maxRow = Math.max(maxRow, lineSegment.to.row)
    maxCol = Math.max(maxCol, lineSegment.from.col)
    maxCol = Math.max(maxCol, lineSegment.to.col)
  }
  return { maxRow, maxCol }
}

const getEmptyMap = ventLineSegments => {
  const { maxRow, maxCol } = getMaxRowAndCol(ventLineSegments)
  const map = new Array(maxRow + 1)
    .fill(undefined)
    .map(() => new Array(maxCol + 1).fill(0))
  return map
}

const fillHorizontally = ({ map, lineSegment, count2OrGreater }) => {
  let fillFrom, fillTo
  const row = lineSegment.from.row
  if (lineSegment.from.col < lineSegment.to.col) {
    fillFrom = lineSegment.from.col
    fillTo = lineSegment.to.col
  } else {
    fillFrom = lineSegment.to.col
    fillTo = lineSegment.from.col
  }
  for (let cur = fillFrom; cur <= fillTo; cur++) {
    map[row][cur]++
    if (map[row][cur] === 2) {
      count2OrGreater++
    }
  }
  return { map, count2OrGreater }
}

const fillVertically = ({ map, lineSegment, count2OrGreater }) => {
  let fillFrom, fillTo
  const col = lineSegment.from.col
  if (lineSegment.from.row < lineSegment.to.row) {
    fillFrom = lineSegment.from.row
    fillTo = lineSegment.to.row
  } else {
    fillFrom = lineSegment.to.row
    fillTo = lineSegment.from.row
  }
  for (let cur = fillFrom; cur <= fillTo; cur++) {
    map[cur][col]++
    if (map[cur][col] === 2) {
      count2OrGreater++
    }
  }
  return { map, count2OrGreater }
}

const get2OrGreaterCount = (map, ventLineSegments) => {
  let count2OrGreater = 0
  for (const lineSegment of ventLineSegments) {
    if (isHorizontal(lineSegment)) {
      ;({ map, count2OrGreater } = fillHorizontally({
        map,
        lineSegment,
        count2OrGreater,
      }))
    } else {
      ;({ map, count2OrGreater } = fillVertically({
        map,
        lineSegment,
        count2OrGreater,
      }))
    }
  }
  return count2OrGreater
}

const doTheThing = async getArr => {
  const arr = await getArr()
  let ventLineSegments = convertToUsable(arr)
  ventLineSegments = filterOutNonHorizontalVertical(ventLineSegments)
  const map = getEmptyMap(ventLineSegments)
  const count = get2OrGreaterCount(map, ventLineSegments)
  return count
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
