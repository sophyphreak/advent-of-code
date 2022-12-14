require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/14/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const coord = (x, y) => `${x}_${y}`

const buildBlocked = arr => {
  const blocked = new Set()
  for (const rockFace of arr) {
    let prevX = null
    let prevY = null
    for (const xy of rockFace) {
      const x = xy[0]
      const y = xy[1]
      blocked.add(coord(x, y))
      if (prevX == null && prevY == null) {
        prevX = x
        prevY = y
        continue
      }
      while (prevX < x) {
        prevX++
        blocked.add(coord(prevX, prevY))
      }
      while (prevY < y) {
        prevY++
        blocked.add(coord(prevX, prevY))
      }
      while (prevX > x) {
        prevX--
        blocked.add(coord(prevX, prevY))
      }
      while (prevY > y) {
        prevY--
        blocked.add(coord(prevX, prevY))
      }
    }
  }
  return blocked
}

const findRestingPlace = (blocked, maxY) => {
  let x = 500
  let y = 0
  while (true) {
    if (y + 1 === maxY) {
      return coord(x, y)
    }

    if (!blocked.has(coord(x, y + 1))) {
      y++
      continue
    }
    if (!blocked.has(coord(x - 1, y + 1))) {
      x--
      y++
      continue
    }
    if (!blocked.has(coord(x + 1, y + 1))) {
      x++
      y++
      continue
    }

    return coord(x, y)
  }
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.map(a => a.split(" -> ").map(s => s.split(",").map(s => +s)))
  const maxY = arr.flat(1).reduce((acc, cur) => Math.max(acc, cur[1]), 0) + 2
  let blocked = buildBlocked(arr)

  let grainsOfSand = 0
  while (true) {
    grainsOfSand++
    const restingPlace = findRestingPlace(blocked, maxY)
    if (restingPlace === "500_0") {
      break
    }
    blocked.add(restingPlace)
  }
  return grainsOfSand
}

doTheThing(() =>
  Promise.resolve(
    `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
