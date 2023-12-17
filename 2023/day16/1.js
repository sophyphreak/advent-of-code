require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/16/input",
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
  const copy = arr.map(s => s.split("")).slice()
  const seen = new Set()
  const visited = new Set()
  const dfs = (i, j, dir) => {
    if (visited.has(t(i, j, dir))) {
      return
    }
    if (!(i < 0 || i >= arr.length || j < 0 || j >= arr[0].length)) {
      visited.add(t(i, j, dir))
      seen.add(c(i, j))
    }
    if (dir === "right") j++
    else if (dir === "down") i++
    else if (dir === "left") j--
    else i--
    if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length) {
      return
    }
    switch (copy[i][j]) {
      case "#":
        copy[i][j] = 2
        break
      default:
        copy[i][j] = "#"
    }
    const current = arr[i][j]
    if (dir === "right") {
      if (current === "." || current === "-") {
        dfs(i, j, dir)
      } else if (current === "/") {
        dfs(i, j, "up")
      } else if (current === "\\") {
        dfs(i, j, "down")
      } else {
        dfs(i, j, "up")
        dfs(i, j, "down")
      }
    } else if (dir === "down") {
      if (current === "." || current === "|") {
        dfs(i, j, dir)
      } else if (current === "/") {
        dfs(i, j, "left")
      } else if (current === "\\") {
        dfs(i, j, "right")
      } else {
        dfs(i, j, "left")
        dfs(i, j, "right")
      }
    } else if (dir === "left") {
      if (current === "." || current === "-") {
        dfs(i, j, dir)
      } else if (current === "/") {
        dfs(i, j, "down")
      } else if (current === "\\") {
        dfs(i, j, "up")
      } else {
        dfs(i, j, "up")
        dfs(i, j, "down")
      }
    } else {
      if (current === "." || current === "|") {
        dfs(i, j, dir)
      } else if (current === "/") {
        dfs(i, j, "right")
      } else if (current === "\\") {
        dfs(i, j, "left")
      } else {
        dfs(i, j, "left")
        dfs(i, j, "right")
      }
    }
  }
  dfs(0, -1, "right")
  // arr = arr.map(s => s.split(""))
  // for (const c of seen) {
  //   const [i, j] = c.split("_")
  //   arr[i][j] = "#"
  // }
  // console.log(arr.map(a => a.join("")).join("\n"))
  return seen.size
}

const c = (i, j) => `${i}_${j}`
const t = (i, j, dir) => `${i}_${j}_${dir}`

doTheThing(() =>
  Promise.resolve(
    String.raw`.|...\....
    |.-.\.....
    .....|-...
    ........|.
    ..........
    .........\
    ..../.\\..
    .-.-/..|..
    .|....-|.\
    ..//.|....`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 46, "1. expected 46 and got " + actual)
).then(_ => console.log("sample finished"))


doTheThing(getInput).then(console.log)
// 7440 - too low