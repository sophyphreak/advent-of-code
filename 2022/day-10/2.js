require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/10/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let answerArr = []
  const answer = new Array(6).fill(null).map(_ => new Array(40).fill(null))
  let arr = await getArr()
  let cycle = 0
  let x = 1
  let sum = 0
  let addValue = null
  let cyclesWithAddValue = 0
  let index = -1
  let getNewOrder = true
  let order = null
  while (true) {
    cycle++
    // start of cycle
    if (getNewOrder) {
      index++
      if (index === arr.length) break
      order = arr[index]
      getNewOrder = false

      if (order === "noop") {
        getNewOrder = true
      } else {
        ;[addValue] = order
          .split(" ")
          .slice(1)
          .map(s => +s)
      }
    }

    // during cycle
    const position = (cycle - 1) % 40
    if (Math.abs(position - x) <= 1) {
      answerArr.push(true)
    } else {
      answerArr.push(false)
    }

    // cycle finishes
    if (cyclesWithAddValue) {
      x += addValue
      addValue = null
      cyclesWithAddValue = 0
      getNewOrder = true
    } else if (addValue) {
      cyclesWithAddValue++
    }
  }
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < answer[0].length; j++) {
      answer[i][j] = answerArr.shift()
    }
  }
  return answer.map(a => a.map(b => (b ? "#" : ".")).join("")).join("\n") + "\n"
}

// doTheThing(() =>
//   Promise.resolve(
//     `noop
//     addx 3
//     addx -5`
//       .split("\n")
//       .map(r => r.trim())
//   )
// ).then(console.log)

doTheThing(() =>
  Promise.resolve(
    `addx 15
    addx -11
    addx 6
    addx -3
    addx 5
    addx -1
    addx -8
    addx 13
    addx 4
    noop
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx 5
    addx -1
    addx -35
    addx 1
    addx 24
    addx -19
    addx 1
    addx 16
    addx -11
    noop
    noop
    addx 21
    addx -15
    noop
    noop
    addx -3
    addx 9
    addx 1
    addx -3
    addx 8
    addx 1
    addx 5
    noop
    noop
    noop
    noop
    noop
    addx -36
    noop
    addx 1
    addx 7
    noop
    noop
    noop
    addx 2
    addx 6
    noop
    noop
    noop
    noop
    noop
    addx 1
    noop
    noop
    addx 7
    addx 1
    noop
    addx -13
    addx 13
    addx 7
    noop
    addx 1
    addx -33
    noop
    noop
    noop
    addx 2
    noop
    noop
    noop
    addx 8
    noop
    addx -1
    addx 2
    addx 1
    noop
    addx 17
    addx -9
    addx 1
    addx 1
    addx -3
    addx 11
    noop
    noop
    addx 1
    noop
    addx 1
    noop
    noop
    addx -13
    addx -19
    addx 1
    addx 3
    addx 26
    addx -30
    addx 12
    addx -1
    addx 3
    addx 1
    noop
    noop
    noop
    addx -9
    addx 18
    addx 1
    addx 2
    noop
    noop
    addx 9
    noop
    noop
    noop
    addx -1
    addx 2
    addx -37
    addx 1
    addx 3
    noop
    addx 15
    addx -21
    addx 22
    addx -6
    addx 1
    noop
    addx 2
    addx 1
    noop
    addx -10
    noop
    noop
    addx 20
    addx 1
    addx 2
    addx 2
    addx -6
    addx -11
    noop
    noop
    noop`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)
doTheThing(getInput).then(console.log)
