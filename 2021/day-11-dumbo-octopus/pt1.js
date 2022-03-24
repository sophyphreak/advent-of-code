require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/11/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const makeInitialOctopusMatrix = arr => arr.map(row => row.split(""))

// GLOBAL VARIABLES
let flashQueue = []
let enteredFlashQueue = new Set()

const coordsToString = (i, j) => `${i}_${j}`

const incrementOctopus = ({ i, j, octopusMatrix }) => {
  const current = ++octopusMatrix[i][j]
  if (current > 9 && !enteredFlashQueue.has(coordsToString(i, j))) {
    flashQueue.push([i, j])
    enteredFlashQueue.add(coordsToString(i, j))
  }
  return octopusMatrix
}

const incrementAllOctopuses = octopusMatrix => {
  for (let i = 0; i < octopusMatrix.length; i++) {
    for (let j = 0; j < octopusMatrix[0].length; j++) {
      octopusMatrix = incrementOctopus({
        j,
        i,
        octopusMatrix,
      })
    }
  }
  return octopusMatrix
}

const leftExists = j => j !== 0
const upExists = i => i !== 0
const rightExists = (j, octopusMatrix) => j !== octopusMatrix[0].length - 1
const downExists = (i, octopusMatrix) => i !== octopusMatrix.length - 1

const finishFlashQueue = octopusMatrix => {
  while (flashQueue.length) {
    const [i, j] = flashQueue.pop()
    const isLeft = leftExists(j)
    const isUp = upExists(i)
    const isRight = rightExists(j, octopusMatrix)
    const isDown = downExists(i, octopusMatrix)
    if (isLeft) {
      octopusMatrix = incrementOctopus({
        i,
        j: j - 1,
        octopusMatrix,
      })
    }
    if (isLeft && isUp) {
      octopusMatrix = incrementOctopus({
        i: i - 1,
        j: j - 1,
        octopusMatrix,
      })
    }
    if (isUp) {
      octopusMatrix = incrementOctopus({
        i: i - 1,
        j,
        octopusMatrix,
      })
    }
    if (isUp && isRight) {
      octopusMatrix = incrementOctopus({
        i: i - 1,
        j: j + 1,
        octopusMatrix,
      })
    }
    if (isRight) {
      octopusMatrix = incrementOctopus({
        i,
        j: j + 1,
        octopusMatrix,
      })
    }
    if (isRight && isDown) {
      octopusMatrix = incrementOctopus({
        i: i + 1,
        j: j + 1,
        octopusMatrix,
      })
    }
    if (isDown) {
      octopusMatrix = incrementOctopus({
        i: i + 1,
        j,
        octopusMatrix,
      })
    }
    if (isDown && isLeft) {
      octopusMatrix = incrementOctopus({
        i: i + 1,
        j: j - 1,
        octopusMatrix,
      })
    }
  }
  return octopusMatrix
}

const zeroAllFlashedOctopuses = octopusMatrix => {
  enteredFlashQueue.forEach(position => {
    const [i, j] = position.split("_").map(s => +s)
    octopusMatrix[i][j] = 0
  })
  return octopusMatrix
}

const incrementOctopuses = octopusMatrix => {
  flashQueue = [] // clear global variable
  enteredFlashQueue = new Set() // clear global variable
  octopusMatrix = incrementAllOctopuses(octopusMatrix)
  octopusMatrix = finishFlashQueue(octopusMatrix)
  const flashes = enteredFlashQueue.size
  octopusMatrix = zeroAllFlashedOctopuses(octopusMatrix)
  return { flashes, octopusMatrix }
}

const doTheThing = async (getArr, steps) => {
  const arr = await getArr()
  let octopusMatrix = makeInitialOctopusMatrix(arr)
  let totalFlashes = 0
  for (let i = 0; i < steps; i++) {
    let flashes = 0
    ;({ flashes, octopusMatrix } = incrementOctopuses(octopusMatrix))
    totalFlashes += flashes
  }
  return totalFlashes
}

doTheThing(
  () =>
    Promise.resolve([
      "5483143223",
      "2745854711",
      "5264556173",
      "6141336146",
      "6357385478",
      "4167524645",
      "2176841721",
      "6882881134",
      "4846848554",
      "5283751526",
    ]),
  100
).then(console.log)

doTheThing(getInput, 100).then(console.log)
