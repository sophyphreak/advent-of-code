require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/8/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const coord = (row, col) => `${row}_${col}`

const visibleAndUnseen = ({ i, j, seen, arr, visibleMap, lastHeight }) => {
  if (seen.has(coord(i, j))) {
    return false
  }
  if (i < 0 || i === arr.length || j < 0 || j === arr[0].length) {
    return false
  }
  if (visibleMap[i][j]) {
    return false
  }
  if (arr[i][j] <= lastHeight) {
    return false
  }
  return true
}

const buildVisibleMap = arr => {
  // const seen = new Set()
  // const queue = []
  const visibleMap = arr.map((r, i) =>
    r.slice().map((n, j) => {
      if (i === 0 || i === arr.length - 1 || j === 0 || j === r.length - 1) {
        return true
      }
      return false
    })
  )
  // while (queue.length) {
  //   const current = queue.shift()
  //   const [i, j] = current.split("_").map(n => +n)
  //   const lastHeight = arr[i][j]
  //   if (visibleAndUnseen({ i: i + 1, j, seen, arr, visibleMap, lastHeight })) {
  //     visibleMap[i + 1][j] = true
  //     queue.push(coord(i + 1, j))
  //     seen.add(coord(i + 1, j))
  //   }
  //   if (visibleAndUnseen({ i: i - 1, j, seen, arr, visibleMap, lastHeight })) {
  //     visibleMap[i - 1][j] = true
  //     queue.push(coord(i - 1, j))
  //     seen.add(coord(i - 1, j))
  //   }
  //   if (visibleAndUnseen({ i, j: j + 1, seen, arr, visibleMap, lastHeight })) {
  //     visibleMap[i][j + 1] = true
  //     queue.push(coord(i, j + 1))
  //     seen.add(coord(i, j + 1))
  //   }
  //   if (visibleAndUnseen({ i, j: j - 1, seen, arr, visibleMap, lastHeight })) {
  //     visibleMap[i][j - 1] = true
  //     queue.push(coord(i, j - 1))
  //     seen.add(coord(i, j - 1))
  //   }
  // }
  arr[0].forEach((height, j) => {
    let maxHeight = height
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] > maxHeight) {
        maxHeight = arr[i][j]
        visibleMap[i][j] = true
      }
    }
  })
  arr.at(-1).forEach((height, j) => {
    let maxHeight = height
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i][j] > maxHeight) {
        maxHeight = arr[i][j]
        visibleMap[i][j] = true
      }
    }
  })
  arr.forEach((_, i) => {
    maxHeight = arr[i][0]
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] > maxHeight) {
        maxHeight = arr[i][j]
        visibleMap[i][j] = true
      }
    }
  })
  for (let i = arr.length - 1; i >= 0; i--) {
    maxHeight = arr[i][arr.length - 1]
    for (let j = arr.length - 1; j >= 0; j--) {
      if (arr[i][j] > maxHeight) {
        maxHeight = arr[i][j]
        visibleMap[i][j] = true
      }
    }
  }
  return visibleMap
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.map(r => r.split("").map(n => +n))
  const visibleMap = buildVisibleMap(arr)
  return visibleMap.reduce((acc, cur) => {
    return (
      acc +
      cur.reduce((acc2, cur2) => {
        if (cur2) return acc2 + 1
        return acc2
      }, 0)
    )
  }, 0)
}

doTheThing(() =>
  Promise.resolve(
    `30373
    25512
    65332
    33549
    35390`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)

/* That's not the right answer. If you're stuck, make sure you're using the full input data; 
there are also some general tips on the about page, or you can ask for hints on the subreddit. 
Please wait one minute before trying again. (You guessed 637.) [Return to Day 8] */
