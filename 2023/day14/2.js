require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/14/input",
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
  arr = arr.map(row => row.split(""))
  let cyclesFinished = 0
  const prevStates = [JSON.stringify(arr)]
  while (cyclesFinished < 1000000000) {
    // roll north
    for (let j = 0; j < arr[0].length; j++) {
      let lastOpen = 0
      for (let i = 0; i < arr.length; i++) {
        const current = arr[i][j]
        if (current === "O" && i === lastOpen) lastOpen++
        else if (current === "O") {
          arr[lastOpen][j] = "O"
          arr[i][j] = "."
          lastOpen++
        } else if (current === "#") {
          lastOpen = i + 1
        }
      }
    }
    // roll west
    for (let i = 0; i < arr.length; i++) {
      let lastOpen = 0
      for (let j = 0; j < arr[0].length; j++) {
        const current = arr[i][j]
        if (current === "O" && j === lastOpen) lastOpen++
        else if (current === "O") {
          arr[i][lastOpen] = "O"
          arr[i][j] = "."
          lastOpen++
        } else if (current === "#") {
          lastOpen = j + 1
        }
      }
    }
    // roll south
    for (let j = 0; j < arr[0].length; j++) {
      let lastOpen = arr.length - 1
      for (let i = arr.length - 1; i >= 0; i--) {
        const current = arr[i][j]
        if (current === "O" && i === lastOpen) lastOpen--
        else if (current === "O") {
          arr[lastOpen][j] = "O"
          arr[i][j] = "."
          lastOpen--
        } else if (current === "#") {
          lastOpen = i - 1
        }
      }
    }
    // roll east
    for (let i = 0; i < arr.length; i++) {
      let lastOpen = arr[0].length - 1
      for (let j = arr[0].length - 1; j >= 0; j--) {
        const current = arr[i][j]
        if (current === "O" && j === lastOpen) lastOpen--
        else if (current === "O") {
          arr[i][lastOpen] = "O"
          arr[i][j] = "."
          lastOpen--
        } else if (current === "#") {
          lastOpen = j - 1
        }
      }
    }
    const currentState = JSON.stringify(arr)
    if (prevStates.includes(currentState)) break
    prevStates.push(currentState)
    cyclesFinished++
  }
  const index = prevStates.indexOf(JSON.stringify(arr))
  const cycleSize = prevStates.length - index
  const targetInCycle = (1000000000 - index) % cycleSize
  arr = JSON.parse(prevStates[index + targetInCycle]) // 6 in sample
  // calculate load
  let totalLoad = 0
  const max = arr.length
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const current = arr[i][j]
      if (current === "O") totalLoad += max - i
    }
  }
  return totalLoad
}


doTheThing(() =>
  Promise.resolve(
    `O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 64, "1. expected 64 and got " + actual)
).then(_ => console.log("finished sample"))

doTheThing(getInput).then(console.log)
// 101991 - too low
