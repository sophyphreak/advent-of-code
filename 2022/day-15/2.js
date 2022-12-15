require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/15/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const buildSensors = arr => {
  const sensors = []
  for (const sensor of arr) {
    let [
      zensor,
      at,
      xEquals,
      yEquals,
      closest,
      beacon,
      is,
      at2,
      xEquals2,
      yEquals2,
    ] = sensor.split(" ")
    xEquals = +xEquals.slice(2, xEquals.length - 1)
    yEquals = +yEquals.slice(2, yEquals.length - 1)
    xEquals2 = +xEquals2.slice(2, xEquals2.length - 1)
    yEquals2 = +yEquals2.slice(2, yEquals2.length)
    sensors.push({
      pos: { x: xEquals, y: yEquals },
      beacon: { x: xEquals2, y: yEquals2 },
    })
  }
  for (const sensor of sensors) {
    let distance = 0
    let curX = sensor.pos.x
    let curY = sensor.pos.y
    while (curX < sensor.beacon.x) {
      distance++
      curX++
    }
    while (curX > sensor.beacon.x) {
      distance++
      curX--
    }
    while (curY < sensor.beacon.y) {
      distance++
      curY++
    }
    while (curY > sensor.beacon.y) {
      distance++
      curY--
    }
    sensor.distance = distance
  }
  return sensors
}

const coord = (x, y) => `${x}_${y}`

const buildCorners = sensors => {
  const allCorners = {}
  for (const s of sensors) {
    const corners = {
      left: [s.pos.x - s.distance, s.pos.y],
      right: [s.pos.x + s.distance, s.pos.y],
      top: [s.pos.x, s.pos.y - s.distance],
      bottom: [s.pos.x, s.pos.y + s.distance],
    }
    allCorners[coord(s.pos.x, s.pos.y)] = corners
  }
  return allCorners
}

const onTopOf = (c, yRow) => c[1] === yRow

const between = (coords, yRow) => {
  if (coords[0][1] <= yRow && yRow <= coords[1][1]) return true
  if (coords[0][1] >= yRow && yRow >= coords[1][1]) return true
  return false
}

const buildIntervals = (corners, yRow) => {
  const intervals = []
  for (const k in corners) {
    const c = corners[k]
    if (onTopOf(c.top, yRow)) {
      intervals.push([c.top[0], c.top[0]])
      continue
    }
    if (onTopOf(c.bottom, yRow)) {
      intervals.push([c.bottom[0], c.bottom[0]])
      continue
    }
    if (onTopOf(c.left, yRow)) {
      intervals.push([c.left[0], c.right[0]])
      continue
    }
    if (between([c.left, c.top], yRow)) {
      const diff = Math.abs(yRow - c.top[1])
      intervals.push([c.top[0] - diff, c.top[0] + diff])
      continue
    }
    if (between([c.left, c.bottom], yRow)) {
      const diff = Math.abs(yRow - c.bottom[1])
      intervals.push([c.bottom[0] - diff, c.bottom[0] + diff])
      continue
    }
  }
  return intervals
}

const mergeIntervals = (intervals, maxVal) => {
  intervals.sort((a, b) => a[0] - b[0])
  let i = 0

  while (i < intervals.length - 1) {
    const cur = intervals[i]
    const next = intervals[i + 1]
    if (cur[1] >= next[1]) {
      intervals.splice(i + 1, 1)
      continue
    }
    if (cur[1] >= next[0]) {
      intervals[i][1] = next[1]
      intervals.splice(i + 1, 1)
      continue
    }
    i++
  }
  intervals[0][0] = 0
  intervals[intervals.length - 1][1] = maxVal
  return intervals
}

const doTheThing = async (getArr, maxVal) => {
  let arr = await getArr()
  const sensors = buildSensors(arr)
  const corners = buildCorners(sensors)

  let x = -1
  let y = -1

  for (let i = 0; i <= maxVal; i++) {
    let intervals = buildIntervals(corners, i)
    intervals = mergeIntervals(intervals, maxVal)
    if (intervals.length === 2) {
      x = intervals[0][1] + 1
      y = i
      break
    }
  }

  return x * 4000000 + y
}

doTheThing(
  () =>
    Promise.resolve(
      `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
      Sensor at x=9, y=16: closest beacon is at x=10, y=16
      Sensor at x=13, y=2: closest beacon is at x=15, y=3
      Sensor at x=12, y=14: closest beacon is at x=10, y=16
      Sensor at x=10, y=20: closest beacon is at x=10, y=16
      Sensor at x=14, y=17: closest beacon is at x=10, y=16
      Sensor at x=8, y=7: closest beacon is at x=2, y=10
      Sensor at x=2, y=0: closest beacon is at x=2, y=10
      Sensor at x=0, y=11: closest beacon is at x=2, y=10
      Sensor at x=20, y=14: closest beacon is at x=25, y=17
      Sensor at x=17, y=20: closest beacon is at x=21, y=22
      Sensor at x=16, y=7: closest beacon is at x=15, y=3
      Sensor at x=14, y=3: closest beacon is at x=15, y=3
      Sensor at x=20, y=1: closest beacon is at x=15, y=3`
        .split("\n")
        .map(r => r.trim())
    ),
  20
).then(console.log)

doTheThing(getInput, 4000000).then(console.log)
