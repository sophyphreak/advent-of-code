require("dotenv").config()
const axios = require("axios").default
const getProbeCoords = require("./getProbeCoords")
const printMap = require("./printMap")
const getMaxUpwardVelocity = require("./getMaxUpwardVelocity")
const getMinForwardVelocity = require("./getMinForwardVelocity")

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

const checkIfLandsInTargetArea = ({ forward, upward, rows, cols }) => {
  let forwardVelocity = forward
  let upwardVelocity = upward
  let i = 0
  let j = 0
  while (i < rows[1] && j < cols[1]) {
    if (rows[0] <= i && i <= rows[1] && cols[0] <= j && j <= cols[1]) {
      return true
    }
    j += forwardVelocity
    i -= upwardVelocity
    forwardVelocity = Math.max(forwardVelocity - 1, 0)
    upwardVelocity -= 1
  }

  if (rows[0] <= i && i <= rows[1] && cols[0] <= j && j <= cols[1]) {
    return true
  }
  return false
}

const getEveryPossibleInitialVelocity = ({
  maxForwardVelocity,
  maxUpwardVelocity,
  minForwardVelocity,
  minUpwardVelocity,
  rows,
  cols,
}) => {
  const everyPossibleInitialVelocity = []
  for (
    let forward = minForwardVelocity;
    forward <= maxForwardVelocity;
    forward++
  ) {
    for (
      let upward = minUpwardVelocity;
      upward <= maxUpwardVelocity;
      upward++
    ) {
      if (checkIfLandsInTargetArea({ forward, upward, rows, cols })) {
        everyPossibleInitialVelocity.push([forward, upward])
      }
    }
  }
  return everyPossibleInitialVelocity
}

const doTheThing = async getArr => {
  const positionStr = await getArr()
  const { rows, cols } = getPosition(positionStr)
  const maxForwardVelocity = cols[1]
  const minForwardVelocity = getMinForwardVelocity(cols)
  const maxUpwardVelocity = getMaxUpwardVelocity(rows)
  const minUpwardVelocity = -rows[1]
  const everyPossibleInitialVelocity = getEveryPossibleInitialVelocity({
    maxForwardVelocity,
    maxUpwardVelocity,
    minForwardVelocity,
    minUpwardVelocity,
    rows,
    cols,
  })
  return everyPossibleInitialVelocity.length
}

doTheThing(() => Promise.resolve("target area: x=20..30, y=-10..-5")).then(
  console.log
)

doTheThing(getInput).then(console.log)
