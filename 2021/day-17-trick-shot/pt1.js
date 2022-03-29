require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data: positionStr } = await axios.get(
    "https://adventofcode.com/2021/day/17/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return positionStr
}

const getPosition = positionStr => {
  positionStr = positionStr.split("x=")[1]
  const cols = positionStr
    .split(",")[0]
    .split("..")
    .map(s => +s)
  const rows = positionStr
    .split(", y=")[1]
    .split("..")
    .reverse()
    .map(s => +s)
    .map(n => Math.abs(n))
  return { rows, cols }
}

const getForwardStartingVelocity = cols => {
  for (let startingVelocity = 0; ; startingVelocity++) {
    let position = 0
    for (
      let forwardVelocity = startingVelocity;
      forwardVelocity >= 0;
      forwardVelocity--
    ) {
      position += forwardVelocity
    }
    if (position <= cols[1] && position >= cols[0]) {
      return startingVelocity
    }
  }
}

const getUpwardStartingVelocity = rows => {
  let maxStartingVelocity = 0
  for (let startingVelocity = 0; ; startingVelocity++) {
    let position = 0
    let upwardVelocity = startingVelocity
    while (position < -rows[1]) {
      position += upwardVelocity
      upwardVelocity--
    }
    position -= upwardVelocity
    if (position <= -rows[0] && position > -rows[1]) {
      maxStartingVelocity = Math.max(maxStartingVelocity, startingVelocity)
    } else if (maxStartingVelocity > 0) {
      return maxStartingVelocity
    }
  }
}

const getProbeCoords = ({ forward, upward, rows, cols }) => {
  const probeCoords = []
  let forwardVelocity = forward
  let upwardVelocity = upward
  let i = 0
  let j = 0
  while (i < rows[1] && j < cols[1]) {
    j += forwardVelocity
    i -= upwardVelocity
    probeCoords.push([i, j])
    forwardVelocity = Math.max(forwardVelocity - 1, 0)
    upwardVelocity -= 1
  }
  return probeCoords
}

const getRowsToAddOnTop = probeCoords =>
  probeCoords.reduce((max, cur) => Math.max(max, -cur[0]), 0)

const printMap = ({ rows, cols, probeCoords }) => {
  const arr = new Array(rows[1] + 1)
    .fill(null)
    .map(_ => new Array(cols[1] + 1).fill("."))
  arr[0][0] = "S"
  for (let i = rows[0]; i <= rows[1]; i++) {
    for (let j = cols[0]; j <= cols[1]; j++) {
      arr[i][j] = "T"
    }
  }

  const rowsToAddOnTop = getRowsToAddOnTop(probeCoords)

  for (let i = 0; i < rowsToAddOnTop; i++) {
    arr.unshift(new Array(cols[1] + 1).fill("."))
  }
  probeCoords = probeCoords.map(a => [a[0] + rowsToAddOnTop, a[1]])
  for (const [i, j] of probeCoords) {
    if (i >= arr.length || j >= arr[0].length) {
      break
    }
    arr[i][j] = "#"
  }
  console.log(arr.map(a => a.join("")).join("\n"))
}

const doTheThing = async getArr => {
  const positionStr = await getArr()
  const { rows, cols } = getPosition(positionStr)
  const forward = getForwardStartingVelocity(cols)
  const upward = getUpwardStartingVelocity(rows)
  const probeCoords = getProbeCoords({ forward, upward, rows, cols })
  printMap({ rows, cols, probeCoords })
  return getRowsToAddOnTop(probeCoords)
}

doTheThing(() => Promise.resolve("target area: x=20..30, y=-10..-5")).then(
  console.log
)

doTheThing(getInput).then(console.log)
