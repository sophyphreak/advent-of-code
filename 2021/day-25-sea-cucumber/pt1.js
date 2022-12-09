const fs = require("fs")
const moveSouthFacing = require("./moveSouthFacing")
const moveEastFacing = require("./moveEastFacing")

const getInput = async () => {
  try {
    return fs
      .readFileSync("./day-25-sea-cucumber/input.txt", "utf-8")
      .split("\r\n")
      .map(s => s.split(""))
  } catch (e) {
    console.error(e)
  }
}

const doTheThing = async getArr => {
  let arr = await getArr()
  // console.log(arr.map(a => a.join("") + "\n").join(""))
  let moves = 0
  while (true) {
    console.log(moves)
    ;({ arr, willMoveCountEast } = moveEastFacing(arr))
    ;({ arr, willMoveCountSouth } = moveSouthFacing(arr))
    moves++
    if (!willMoveCountEast && !willMoveCountSouth) {
      break
    }
  }
  // console.log(arr.map(a => a.join("") + "\n").join(""))
  return moves
}

// doTheThing(() =>
//   Promise.resolve(
//     `...>...
//     .......
//     ......>
//     v.....>
//     ......>
//     .......
//     ..vvv..`
//       .split("\n")
//       .map(s => s.trim().split(""))
//   )
// ).then(console.log)

doTheThing(() =>
  Promise.resolve(
    `v...>>.vv>
  .vv>>.vv..
  >>.>v>...v
  >>v>>.>.v.
  v>v.vv.v..
  >.>>..v...
  .vv..>.>v.
  v.v..>>v.v
  ....v..v.>`
      .split("\n")
      .map(s => s.trim().split(""))
  )
).then(console.log)

doTheThing(getInput).then(console.log)
