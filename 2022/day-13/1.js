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
  arr = arr.map(a => {
    if (!a) return null
    return JSON.parse(a)
  })
  let rightOrderIndeciesSum = 0
  for (let i = 0; i < arr.length; i += 3) {
    if (arrRightOrder(arr[i], arr[i + 1])) {
      rightOrderIndeciesSum += Math.floor(i / 3) + 1
    }
  }
  return rightOrderIndeciesSum
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
