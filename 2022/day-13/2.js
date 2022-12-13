require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/13/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const arrRightOrder = (left, right) => {
  if (typeof left === "undefined" && typeof right === "undefined") {
    return null
  }
  if (typeof left === "undefined") {
    return true
  }
  if (typeof right === "undefined") {
    return false
  }

  if (typeof left === "number" && typeof right === "number") {
    if (left < right) {
      return true
    }
    if (left > right) {
      return false
    }
    if (left === right) {
      return null
    }
  }

  if (typeof left === "object" && typeof right === "object") {
    for (let i = 0; i < left.length; i++) {
      const curLeft = left[i]
      const curRight = right[i]
      const result = arrRightOrder(curLeft, curRight)
      if (typeof result === "boolean") {
        return result
      }
    }
    if (left.length < right.length) {
      return true
    }
    if (left.length > right.length) {
      return false
    }
  }

  if (typeof left === "object" && typeof right === "number") {
    const result = arrRightOrder(left, [right])
    if (typeof result === "boolean") {
      return result
    }
  }
  if (typeof left === "number" && typeof right === "object") {
    const result = arrRightOrder([left], right)
    if (typeof result === "boolean") {
      return result
    }
  }
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr
    .map(a => {
      if (!a) return null
      return JSON.parse(a)
    })
    .filter(a => a)
  arr.push([[2]])
  arr.push([[6]])
  arr.sort((a, b) => {
    if (arrRightOrder(a, b)) {
      return -1
    }
    return 1
  })
  let oneIndex = -1
  let twoIndex = -1
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i]
    if (JSON.stringify(a) === JSON.stringify([[2]])) {
      oneIndex = i + 1
    }
    if (JSON.stringify(a) === JSON.stringify([[6]])) {
      twoIndex = i + 1
    }
  }
  // console.log(oneIndex, twoIndex)
  return oneIndex * twoIndex
}

doTheThing(() =>
  Promise.resolve(
    `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
