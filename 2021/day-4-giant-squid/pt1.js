require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/4/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.split("\n")
}

const getBoards = arr => {
  const boards = []
  while (arr.length) {
    const rawBoard = arr.splice(0, 5)
    arr.shift() // remove empty row
    const board = []
    for (const rawRow of rawBoard) {
      const row = []
      const [a, b, , c, d, , e, f, , g, h, , i, j] = rawRow.split("")
      row.push(parseInt(a + b))
      row.push(parseInt(c + d))
      row.push(parseInt(e + f))
      row.push(parseInt(g + h))
      row.push(parseInt(i + j))
      board.push(row)
    }
    boards.push(board)
  }
  return boards
}

const getEmptyBoards = boards => {
  const markedBoards = []
  for (const _ of boards) {
    markedBoards.push(
      new Array(5).fill(null).map(row => new Array(5).fill(false))
    )
  }
  return markedBoards
}

const fillInBoards = ({ boards, markedBoards, pick }) => {
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    let numberFound = false
    for (let j = 0; j < board.length; j++) {
      const row = board[j]
      for (let k = 0; k < row.length; k++) {
        if (boards[i][j][k] === pick) {
          markedBoards[i][j][k] = true
          numberFound = true
          break
        }
      }
      if (numberFound) {
        break
      }
    }
  }
  return markedBoards
}

const checkIsHorizontalWinner = markedBoard => {
  for (const row of markedBoard) {
    for (let i = 0; i < row.length; i++) {
      const space = row[i]
      if (!space) {
        break
      }
      if (i === row.length - 1) {
        return true
      }
    }
  }
  return false
}

const checkIsVerticalWinner = markedBoard => {
  // assumes a square
  for (let colIndex = 0; colIndex < markedBoard.length; colIndex++) {
    for (let rowIndex = 0; rowIndex < markedBoard.length; rowIndex++) {
      const space = markedBoard[rowIndex][colIndex]
      if (!space) {
        break
      }
      if (rowIndex === markedBoard.length - 1) {
        return true
      }
    }
  }
  return false
}

// In this problem, diagonals don't count

// const checkIsDiagonalWinner = markedBoard => {
//   // assumes 5x5
//   if (
//     markedBoard[0][0] &&
//     markedBoard[1][1] &&
//     markedBoard[2][2] &&
//     markedBoard[3][3] &&
//     markedBoard[4][4]
//   )
//     return true
//   if (
//     markedBoard[0][4] &&
//     markedBoard[1][3] &&
//     markedBoard[2][2] &&
//     markedBoard[3][1] &&
//     markedBoard[4][0]
//   )
//     return true
//   return false
// }

const checkIsWinner = markedBoard => {
  if (checkIsHorizontalWinner(markedBoard)) return true
  if (checkIsVerticalWinner(markedBoard)) return true
  //   if (checkIsDiagonalWinner(markedBoard)) return true
  return false
}

const findWinnerBoard = markedBoards => {
  for (let index = 0; index < markedBoards.length; index++) {
    const markedBoard = markedBoards[index]
    const isWinner = checkIsWinner(markedBoard)
    if (isWinner) {
      return index
    }
  }
  return -1
}

const getWinner = ({ picks, boards, markedBoards }) => {
  for (const pick of picks) {
    markedBoards = fillInBoards({
      boards,
      pick,
      markedBoards: markedBoards.slice(),
    })
    const winnerBoardIndex = findWinnerBoard(markedBoards)
    if (winnerBoardIndex > -1) {
      return {
        pick,
        board: boards[winnerBoardIndex],
        markedBoard: markedBoards[winnerBoardIndex],
      }
    }
  }
}

const getFinalScore = ({ pick, board, markedBoard }) => {
  let sumOfUnmarkedNumbers = 0
  for (let i = 0; i < markedBoard.length; i++) {
    const row = markedBoard[i]
    for (let j = 0; j < row.length; j++) {
      if (!row[j]) {
        sumOfUnmarkedNumbers += board[i][j]
      }
    }
  }
  return sumOfUnmarkedNumbers * pick
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const picks = arr
    .shift()
    .split(",")
    .map(n => parseInt(n))
  arr.shift() // remove empty row

  const boards = getBoards(arr)
  const markedBoards = getEmptyBoards(boards)

  const winner = getWinner({ picks, boards, markedBoards })
  const finalScore = getFinalScore(winner)

  return finalScore
}

doTheThing(() =>
  Promise.resolve([
    "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
    "",
    "22 13 17 11  0",
    " 8  2 23  4 24",
    "21  9 14 16  7",
    " 6 10  3 18  5",
    " 1 12 20 15 19",
    "",
    " 3 15  0  2 22",
    " 9 18 13 17  5",
    "19  8  7 25 23",
    "20 11 10 24  4",
    "14 21 16 12  6",
    "",
    "14 21 17 24  4",
    "10 16 15  9 19",
    "18  8 23 26 20",
    "22 11 13  6  5",
    " 2  0 12  3  7",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
